// =====================================================================
// PLANET ONGAKU — CITY DETAIL (the close-range LOD tier)
//
// The planet already knows every settlement's sprawl outline, its quarters
// and the block grid inside them. This module takes that same geometry and
// subdivides it one level further — blocks into lots, lots into building
// footprints — then names the places that sit on them: restaurants, museums,
// stations, clubs, warehouses.
//
// Nothing here invents a second world. Every coordinate is in planet world
// space, so a city you zoomed into is the same city you saw as a smudge from
// orbit, with the same coastline, the same quarters and the same roads.
//
// It is built on demand and cached by the page, which is what makes the map
// one continuous surface instead of two maps bolted together.
// =====================================================================

import {
  mulberry32, seedFromString, makeNoise, DISTRICTS,
  cityContains, citySectorAt, isLandAt, CANON_PLACES, CORPORATIONS,
} from './mapGenerator.js';

/* ---------------------------------------------------------- places -- */

// type maps onto the map legend groups; icon is what the pin shows.
export const PLACE_KINDS = {
  tower: { type: 'landmark', icon: '🏢', label: 'Tower' },
  museum: { type: 'landmark', icon: '🏛️', label: 'Museum' },
  gallery: { type: 'landmark', icon: '🖼️', label: 'Gallery' },
  monument: { type: 'landmark', icon: '🗿', label: 'Monument' },
  square: { type: 'park', icon: '⛲', label: 'Square' },
  circuit: { type: 'landmark', icon: '🏁', label: 'Race circuit' },
  industryhq: { type: 'front', icon: '⛏️', label: 'Industrial site' },
  restaurant: { type: 'food', icon: '🍽️', label: 'Restaurant' },
  cafe: { type: 'food', icon: '☕', label: 'Café' },
  market: { type: 'food', icon: '🛒', label: 'Market' },
  shop: { type: 'food', icon: '🏪', label: 'Village shop' },
  pub: { type: 'venue', icon: '🍺', label: 'Pub' },
  chapel: { type: 'civic', icon: '⛪', label: 'Chapel' },
  postoffice: { type: 'civic', icon: '📮', label: 'Post office' },
  canteen: { type: 'food', icon: '🍲', label: 'Canteen' },
  surgery: { type: 'civic', icon: '🩺', label: 'Surgery' },
  bar: { type: 'venue', icon: '🍸', label: 'Bar' },
  club: { type: 'venue', icon: '🎧', label: 'Nightclub' },
  stripclub: { type: 'venue', icon: '💋', label: 'Adult club' },
  concert: { type: 'venue', icon: '🎫', label: 'Concert hall' },
  livehouse: { type: 'venue', icon: '🎸', label: 'Live music venue' },
  casino: { type: 'venue', icon: '🎰', label: 'Casino' },
  studio: { type: 'venue', icon: '🎚️', label: 'Recording studio' },
  theatre: { type: 'venue', icon: '🎭', label: 'Theatre' },
  cinema: { type: 'venue', icon: '🎬', label: 'Cinema' },
  arena: { type: 'venue', icon: '🎤', label: 'Arena' },
  library: { type: 'civic', icon: '📚', label: 'Library' },
  school: { type: 'civic', icon: '🎓', label: 'School' },
  university: { type: 'civic', icon: '🎓', label: 'University' },
  hospital: { type: 'civic', icon: '🏥', label: 'Hospital' },
  police: { type: 'civic', icon: '🚓', label: 'Police station' },
  bank: { type: 'civic', icon: '🏦', label: 'Bank' },
  hotel: { type: 'civic', icon: '🏨', label: 'Hotel' },
  mall: { type: 'civic', icon: '🛍️', label: 'Shopping centre' },
  townhall: { type: 'civic', icon: '🏛️', label: 'Civic hall' },
  stadium: { type: 'park', icon: '🏟️', label: 'Stadium' },
  garden: { type: 'park', icon: '🌳', label: 'Gardens' },
  station: { type: 'transit', icon: '🚉', label: 'Station' },
  ferry: { type: 'transit', icon: '⛴️', label: 'Ferry terminal' },
  airfield: { type: 'transit', icon: '🛫', label: 'Airfield' },
  warehouse: { type: 'front', icon: '📦', label: 'Warehouse' },
  works: { type: 'front', icon: '🏭', label: 'Works' },
  garage: { type: 'front', icon: '🔧', label: 'Garage' },
  barracks: { type: 'military', icon: '🛡️', label: 'Barracks' },
};

// Weighted by repetition — a quarter's character is just which places keep
// turning up in it.
const ROLE_MIX = {
  core: ['tower', 'tower', 'bank', 'bank', 'hotel', 'restaurant', 'restaurant', 'cafe', 'museum', 'gallery', 'theatre', 'concert', 'casino', 'station', 'mall', 'police', 'library'],
  nightlife: ['club', 'club', 'club', 'bar', 'bar', 'bar', 'livehouse', 'livehouse', 'stripclub', 'concert', 'casino', 'restaurant', 'restaurant', 'cafe', 'studio', 'cinema', 'theatre', 'arena', 'hotel', 'gallery'],
  old: ['museum', 'museum', 'gallery', 'cafe', 'cafe', 'restaurant', 'market', 'library', 'theatre', 'hotel', 'monument'],
  residential: ['cafe', 'restaurant', 'school', 'school', 'market', 'garden', 'bar', 'hospital', 'police', 'library', 'garage'],
  wealth: ['restaurant', 'restaurant', 'cafe', 'gallery', 'hotel', 'garden', 'museum', 'school', 'bank'],
  campus: ['university', 'university', 'library', 'cafe', 'cafe', 'bar', 'stadium', 'school', 'museum', 'garden', 'hospital'],
  harbour: ['warehouse', 'warehouse', 'works', 'ferry', 'bar', 'bar', 'stripclub', 'livehouse', 'restaurant', 'market', 'garage', 'station', 'cafe'],
  industry: ['works', 'works', 'warehouse', 'warehouse', 'garage', 'cafe', 'station', 'airfield'],
  green: ['garden', 'garden', 'cafe', 'stadium', 'school', 'restaurant', 'museum'],
  military: ['barracks', 'barracks', 'warehouse', 'airfield', 'garage', 'hospital'],
  rural: ['shop', 'pub', 'pub', 'chapel', 'school', 'garage', 'postoffice', 'cafe', 'surgery', 'market'],
  remote: ['canteen', 'garage', 'shop'],
};

// A quarter's name is the strongest signal of what it is, so read the role
// off the name first and fall back to how dense the sector was built.
const CANON_ROLE = {
  'Central District': 'core', Downtown: 'core',
  'Neon District': 'nightlife',
  'Old Quarter': 'old',
  Southside: 'residential',
  'Harbour District': 'harbour',
  'University District': 'campus',
  'Rose Hill': 'wealth', 'The Heights': 'wealth',
  Skyport: 'industry', Trolley: 'military',
};

function roleOf(name, index, dens, kind) {
  // Tier first: a one-quarter village would otherwise inherit the downtown
  // mix and end up with a casino and a museum of modern art.
  if (kind === 'outpost') return 'remote';
  if (kind === 'village') return 'rural';
  if (CANON_ROLE[name]) return CANON_ROLE[name];
  if (/Docks|Wharf|Quay/i.test(name)) return 'harbour';
  if (/Yards|Mills|Works/i.test(name)) return 'industry';
  if (/Heights|Hill/i.test(name)) return 'wealth';
  if (/Park|Green|Gardens/i.test(name)) return 'green';
  if (index === 0) return 'core';
  return dens > 0.72 ? 'nightlife' : 'residential';
}

const SMALL = new Set(['village', 'outpost']);

const QUARTER_BLURB = {
  core: 'Offices, banks and the civic buildings everyone photographs.',
  nightlife: 'Clubs, late restaurants and the noise that comes with them.',
  old: 'The oldest streets in the city. Markets, museums and narrow blocks.',
  residential: 'Where most of the city actually lives. Schools, corner shops, quiet.',
  wealth: 'Money that arrived a while ago. Big lots, small crowds.',
  campus: 'Students, sports grounds and cheap food that never closes.',
  harbour: 'Cranes, warehouses and everything that arrives by water.',
  industry: 'Works, yards and freight. Loud by day, empty by night.',
  green: 'Parkland and low density on the edge of the built-up area.',
  military: 'Restricted. Fenced, gated and not on most maps.',
  rural: 'A village. One shop, one pub, and everyone knows whose car that is.',
  remote: 'An outpost. However many people it takes to keep the thing running.',
};

/* ----------------------------------------------------------- names -- */

const SURNAMES = ['Kade', 'Moretti', 'Duvall', 'Verrado', 'Halcyon', 'Meridian', 'Vantage', 'Harlow', 'Bellamy', 'Osei', 'Nakamura', 'Achebe', 'Vega', 'Marlow', 'Dunbar', 'Sable', 'Okafor', 'Ferris', 'Lindqvist', 'Rossi', 'Adeyemi', 'Toure', 'Barros', 'Sinclair', 'Mwangi', 'Petrov', 'Aterno', 'Bhatt', 'Calloway', 'Delacroix', 'Enright', 'Faraday', 'Gilliam', 'Haruki', 'Ibarra', 'Jourdain', 'Kwabena', 'Lasseter', 'Maitland', 'Nsua', 'Ortega', 'Prentice', 'Quintero', 'Radcliffe', 'Sanderson', 'Tavares', 'Ueno', 'Villiers', 'Whitlock', 'Ximenes', 'Yusuf', 'Zabala', 'Amari', 'Boateng', 'Castellan', 'Devereux', 'Espinoza', 'Fontaine', 'Grieves', 'Hollis', 'Idowu', 'Jansen', 'Kilbride', 'Lombardi', 'Mensah', 'Novak', 'Okonjo', 'Pemberton'];
const ADJECTIVES = ['Golden', 'Copper', 'Ivory', 'Crimson', 'Velvet', 'Silver', 'Blue', 'Old', 'Bright', 'Quiet', 'Little', 'Grand', 'Iron', 'Amber', 'Northern', 'Eastern', 'Western', 'Southern', 'Upper', 'Lower', 'Royal', 'Emerald', 'Scarlet', 'Cobalt', 'Rusted', 'Painted', 'Hollow', 'Broken', 'Twelve', 'Half', 'Midnight', 'Morning', 'Marble', 'Brass', 'Slate'];
const NOUNS = ['Lantern', 'Anchor', 'Sparrow', 'Kettle', 'Fox', 'Chord', 'Needle', 'Orchid', 'Compass', 'Drum', 'Whistle', 'Crown', 'Bell', 'Pelican', 'Thistle', 'Harp', 'Cymbal', 'Reed', 'Kestrel', 'Heron', 'Otter', 'Beacon', 'Lattice', 'Ember', 'Cinder', 'Quarry', 'Furnace', 'Rope', 'Sail', 'Mast', 'Prism', 'Echo', 'Bassline', 'Vinyl', 'Metronome', 'Tuning Fork', 'Sixteenth', 'Coda', 'Refrain'];
const ABSTRACTS = ['Sound', 'Rhythm', 'Migration', 'Industry', 'the Republic', 'Broadcast', 'Everyday Life', 'Modern Art', 'Transport', 'the Sea'];
const STREETWORDS = ['Street', 'Avenue', 'Row', 'Lane', 'Walk', 'Square', 'Gate', 'Wharf', 'Yard', 'Terrace', 'Parade', 'Crescent', 'Rise', 'Vale', 'Mews', 'Close', 'Broadway', 'Embankment', 'Approach', 'Passage'];
const FOODWORDS = ['Kitchen', 'Grill', 'Table', 'Rooms', 'Canteen', 'Bistro', 'Diner', 'Bar & Grill'];

const pick = (rng, arr) => arr[(rng() * arr.length) | 0];

function placeName(kind, rng, quarter, cityName) {
  const s = () => pick(rng, SURNAMES);
  const a = () => pick(rng, ADJECTIVES);
  const n = () => pick(rng, NOUNS);
  switch (kind) {
    case 'restaurant':
      return rng() < 0.4 ? `${s()}'s ${pick(rng, FOODWORDS)}`
        : rng() < 0.5 ? `The ${a()} ${n()}` : `${n()} & ${n()}`;
    case 'cafe':
      return rng() < 0.5 ? `Café ${s()}` : `The ${a()} ${n()}`;
    case 'bar':
      return rng() < 0.5 ? `The ${a()} ${n()}` : `${s()}'s`;
    case 'stripclub': return rng() < 0.5 ? `The ${a()} ${n()}` : `${n()} Room`;
    case 'casino': return rng() < 0.5 ? `The ${a()} ${n()} Casino` : `${s()} Rooms`;
    case 'concert': return rng() < 0.5 ? `${s()} Concert Hall` : `The ${a()} Hall`;
    case 'livehouse': return rng() < 0.5 ? `The ${a()} ${n()}` : `${s()}'s Live Room`;
    case 'shop': return rng() < 0.5 ? `${s()}'s Stores` : `The ${quarter} Shop`;
    case 'pub': return rng() < 0.5 ? `The ${a()} ${n()}` : `The ${n()} & ${n()}`;
    case 'chapel': return rng() < 0.5 ? `${quarter} Chapel` : `The Chapel of the ${a()} ${n()}`;
    case 'postoffice': return `${quarter} Post Office`;
    case 'canteen': return rng() < 0.5 ? `The Canteen` : `${s()}'s Canteen`;
    case 'club':
      return rng() < 0.45 ? `${a().toUpperCase()}` : rng() < 0.6 ? `Club ${n()}` : `The ${n()} Room`;
    case 'studio':
      return `${s()} ${rng() < 0.5 ? 'Sound' : 'Recording'}`;
    case 'theatre': return `The ${s()} Theatre`;
    case 'cinema': return `${a()} Picture House`;
    case 'arena': return `${quarter} Arena`;
    case 'museum':
      return rng() < 0.5 ? `${s()} Museum` : `Museum of ${pick(rng, ABSTRACTS)}`;
    case 'gallery': return rng() < 0.5 ? `${s()} Gallery` : `The ${a()} Collection`;
    case 'monument': return `The ${a()} ${n()}`;
    case 'surgery': return rng() < 0.5 ? `${quarter} Surgery` : `${s()} Surgery`;
    case 'library': return rng() < 0.5 ? `${quarter} Library` : `${s()} Library`;
    case 'school': return `${s()} ${rng() < 0.5 ? 'School' : 'Academy'}`;
    case 'university': return `${cityName} University`;
    case 'hospital': return `${s()} Hospital`;
    case 'police': return rng() < 0.5 ? `${quarter} Police Station` : `${s()} ${pick(rng, STREETWORDS)} Station House`;
    case 'bank': return `${s()} Bank`;
    case 'hotel': return rng() < 0.5 ? `The ${s()} Hotel` : `Hotel ${n()}`;
    case 'mall': return rng() < 0.5 ? `The ${a()} Arcade` : `${s()} Exchange`;
    case 'townhall': return `${cityName} Civic Hall`;
    case 'stadium': return `${s()} Stadium`;
    case 'garden': return rng() < 0.3 ? `${a()} ${n()} Park` : `${s()} ${rng() < 0.5 ? 'Gardens' : 'Park'}`;
    case 'station': return rng() < 0.4 ? `${quarter} Station` : `${s()} ${pick(rng, STREETWORDS)} Station`;
    case 'ferry': return `${cityName} Ferry Terminal`;
    case 'airfield': return `${cityName} Airfield`;
    case 'warehouse': return `${s()} ${rng() < 0.5 ? 'Warehousing' : 'Freight'}`;
    case 'works': return `${s()} ${rng() < 0.5 ? 'Works' : 'Pressing Plant'}`;
    case 'garage': return `${s()} Garage`;
    case 'barracks': return `${quarter} Barracks`;
    case 'tower': return `${s()} Tower`;
    default: return `${s()} ${pick(rng, STREETWORDS)}`;
  }
}

const SQUARE_WORDS = ['Square', 'Plaza', 'Circus', 'Market Place', 'Green'];
const MONUMENT_WORDS = ['Column', 'Memorial', 'Obelisk', 'Fountain', 'Arch', 'Statue', 'Cenotaph'];

function squareLabel(rng, cityName) {
  return rng() < 0.45
    ? `${cityName.split(' ')[0]} ${pick(rng, SQUARE_WORDS)}`
    : `${pick(rng, SURNAMES)} ${pick(rng, SQUARE_WORDS)}`;
}

// Monuments name the thing a place decided to remember about itself.
function monumentName(rng, city) {
  const word = pick(rng, MONUMENT_WORDS);
  if (city.kind === 'capital') return `The Harmony ${word}`;
  return rng() < 0.5 ? `The ${pick(rng, SURNAMES)} ${word}` : `${city.name} ${word}`;
}

/* ------------------------------------------------- building tenants */

// What a footprint is, by the character of the quarter it stands in. Weighted
// by repetition like the place mixes above. Every building gets one, which is
// what lets the map name almost all of them at street level instead of
// labelling a handful of pins and leaving the rest anonymous.
const USE_MIX = {
  core: ['office', 'office', 'office', 'office', 'apartments', 'apartments', 'hotel', 'retail', 'retail', 'bank', 'chambers', 'chambers', 'parking'],
  nightlife: ['club', 'bar', 'restaurant', 'apartments', 'apartments', 'studio', 'retail', 'hotel'],
  old: ['apartments', 'retail', 'cafe', 'workshop', 'townhouse', 'townhouse', 'chambers'],
  residential: ['apartments', 'house', 'house', 'house', 'retail', 'workshop', 'surgery'],
  wealth: ['villa', 'villa', 'apartments', 'retail', 'chambers'],
  campus: ['faculty', 'halls', 'apartments', 'library', 'sports', 'cafe'],
  harbour: ['warehouse', 'warehouse', 'shed', 'works', 'coldstore', 'chandlery', 'office'],
  industry: ['works', 'warehouse', 'depot', 'plant', 'yard', 'office'],
  green: ['house', 'pavilion', 'glasshouse', 'villa'],
  military: ['barracks', 'hangar', 'store', 'workshop'],
  rural: ['house', 'house', 'house', 'cottage', 'cottage', 'barn', 'shopfront', 'workshop'],
  remote: ['hut', 'hut', 'store', 'workshop'],
};

const USE_KEYS = Object.keys(USE_MIX).reduce((acc, role) => {
  for (const u of USE_MIX[role]) if (!acc.includes(u)) acc.push(u);
  return acc;
}, []);

export const USE_LABEL = {
  office: 'Offices', apartments: 'Apartments', hotel: 'Hotel', retail: 'Shops',
  bank: 'Bank', chambers: 'Chambers', parking: 'Car park', club: 'Club',
  bar: 'Bar', restaurant: 'Restaurant', studio: 'Studio', cafe: 'Café',
  workshop: 'Workshop', townhouse: 'Townhouses', house: 'House', villa: 'Villa',
  surgery: 'Surgery', faculty: 'Faculty', halls: 'Halls of residence',
  library: 'Library', sports: 'Sports hall', warehouse: 'Warehouse',
  shed: 'Transit shed', works: 'Works', coldstore: 'Cold store',
  chandlery: 'Chandlery', depot: 'Depot', plant: 'Plant', yard: 'Yard',
  pavilion: 'Pavilion', glasshouse: 'Glasshouse', barracks: 'Barracks',
  hangar: 'Hangar', store: 'Stores', cottage: 'Cottage', barn: 'Barn',
  shopfront: 'Shop', hut: 'Cabin',
};

const FIRMWORDS = ['Holdings', 'Group', 'Industries', 'Works', 'Trading', 'Freight', 'Supply', 'Engineering', 'Fabrication', 'Logistics'];
const BLOCKWORDS = ['Court', 'Mansions', 'House', 'Buildings', 'Terrace', 'Chambers', 'Place', 'Point', 'Wharf', 'Yard'];

// Names are derived, not stored: a capital has thousands of footprints and
// only a few hundred are ever on screen at a size worth reading. Seeding off
// the city name and the building index keeps them stable anyway.
export function buildingInfo(cityName, index, use) {
  const rng = mulberry32(seedFromString(`${cityName}::b${index}`));
  const s = () => pick(rng, SURNAMES);
  const a = () => pick(rng, ADJECTIVES);
  const n = () => pick(rng, NOUNS);
  const num = () => 1 + ((rng() * 240) | 0);
  let name;
  switch (use) {
    case 'office': name = rng() < 0.45 ? `${s()} House` : rng() < 0.6 ? `${s()} ${pick(rng, FIRMWORDS)}` : `${num()} ${s()} ${pick(rng, STREETWORDS)}`; break;
    case 'chambers': name = `${s()} Chambers`; break;
    case 'bank': name = `${s()} Bank`; break;
    case 'hotel': name = rng() < 0.5 ? `The ${s()} Hotel` : `Hotel ${n()}`; break;
    case 'apartments': name = rng() < 0.5 ? `${s()} ${pick(rng, BLOCKWORDS)}` : `${a()} ${n()} Apartments`; break;
    case 'townhouse': name = `${num()}–${num() + 6} ${s()} ${pick(rng, STREETWORDS)}`; break;
    case 'house': name = `${num()} ${s()} ${pick(rng, STREETWORDS)}`; break;
    case 'villa': name = rng() < 0.5 ? `${s()} Lodge` : `The ${a()} ${n()}`; break;
    case 'retail': name = rng() < 0.5 ? `${s()}'s` : `${a()} ${n()} Stores`; break;
    case 'cafe': name = `Café ${s()}`; break;
    case 'restaurant': name = rng() < 0.5 ? `${s()}'s Table` : `The ${a()} ${n()}`; break;
    case 'bar': name = `The ${a()} ${n()}`; break;
    case 'club': name = rng() < 0.5 ? `Club ${n()}` : a().toUpperCase(); break;
    case 'studio': name = `${s()} Sound`; break;
    case 'workshop': name = `${s()} ${rng() < 0.5 ? 'Repairs' : 'Workshop'}`; break;
    case 'surgery': name = `${s()} Surgery`; break;
    case 'faculty': name = `${pick(rng, ABSTRACTS)} Faculty`; break;
    case 'halls': name = `${s()} Hall`; break;
    case 'library': name = `${s()} Library`; break;
    case 'sports': name = `${s()} Sports Hall`; break;
    case 'warehouse': name = rng() < 0.4 ? `Unit ${num()}` : `${s()} ${pick(rng, FIRMWORDS)}`; break;
    case 'shed': name = `Transit Shed ${1 + ((rng() * 12) | 0)}`; break;
    case 'coldstore': name = `${s()} Cold Store`; break;
    case 'chandlery': name = `${s()} Chandlery`; break;
    case 'works': name = `${s()} Works`; break;
    case 'plant': name = `${s()} ${rng() < 0.5 ? 'Plant' : 'Refinery'}`; break;
    case 'depot': name = `${s()} Depot`; break;
    case 'yard': name = `${s()} Yard`; break;
    case 'parking': name = `${s()} ${pick(rng, STREETWORDS)} Car Park`; break;
    case 'pavilion': name = `${s()} Pavilion`; break;
    case 'glasshouse': name = `${s()} Glasshouse`; break;
    case 'barracks': name = `${s()} Block`; break;
    case 'cottage': name = rng() < 0.5 ? `${num()} ${s()} ${pick(rng, STREETWORDS)}` : `${a()} ${n()} Cottage`; break;
    case 'barn': name = `${s()} Barn`; break;
    case 'shopfront': name = rng() < 0.5 ? `${s()}'s` : `The ${a()} ${n()}`; break;
    case 'hut': name = `Cabin ${1 + ((rng() * 14) | 0)}`; break;
    case 'hangar': name = `Hangar ${1 + ((rng() * 9) | 0)}`; break;
    case 'store': name = `Stores ${1 + ((rng() * 9) | 0)}`; break;
    default: name = `${s()} Building`;
  }
  return { name, use, label: USE_LABEL[use] || 'Building' };
}

/* ------------------------------------------------------- the build -- */

const QUARTER_META = Object.fromEntries(DISTRICTS.map((d) => [d.name, d]));
const FALLBACK_COLORS = ['#38BDF8', '#E879F9', '#FBBF24', '#F59E0B', '#22D3EE', '#34D399', '#FB7185', '#818CF8', '#A3E635', '#F87171'];

// Blocks are stored as four world-space corners; a lot is a bilinear slice of
// that quad, which keeps every building parallel to the street it fronts even
// where the block is a trapezoid.
function lotCorners(q, o, u0, v0, u1, v1, out) {
  const x0 = q[o];
  const y0 = q[o + 1];
  const x1 = q[o + 2];
  const y1 = q[o + 3];
  const x2 = q[o + 4];
  const y2 = q[o + 5];
  const x3 = q[o + 6];
  const y3 = q[o + 7];
  const at = (u, v) => {
    const ax = x0 + (x1 - x0) * u;
    const ay = y0 + (y1 - y0) * u;
    const bx = x3 + (x2 - x3) * u;
    const by = y3 + (y2 - y3) * u;
    return [ax + (bx - ax) * v, ay + (by - ay) * v];
  };
  const [ax, ay] = at(u0, v0);
  const [bx, by] = at(u1, v0);
  const [cx, cy] = at(u1, v1);
  const [dx, dy] = at(u0, v1);
  out.push(ax, ay, bx, by, cx, cy, dx, dy);
}

export function buildCityDetail(planet, city) {
  const rng = mulberry32(seedFromString(`${planet.seed}::detail::${city.name}`));
  const nC = makeNoise(rng);
  const R = city.radius;
  const q = city.quads;
  const blocks = q ? q.length / 8 : 0;

  /* ---- quarters: the sectors, traced into polygons that tile the city ---- */
  const quarters = city.sectors.map((sec, i) => {
    const meta = QUARTER_META[sec.name];
    const role = roleOf(sec.name || '', i, sec.dens, city.kind);
    const RAYS = 40;
    const poly = [];
    for (let a = 0; a < RAYS; a++) {
      const ang = (a / RAYS) * Math.PI * 2;
      const ca = Math.cos(ang);
      const sa = Math.sin(ang);
      let r = 0;
      for (let step = R * 0.02; step <= R * 1.4; step += R * 0.02) {
        const x = sec.lx + ca * step;
        const y = sec.ly + sa * step;
        if (!cityContains(city, x, y) || citySectorAt(city, x, y) !== i) break;
        r = step;
      }
      poly.push({ x: sec.lx + ca * r, y: sec.ly + sa * r });
    }
    return {
      i, name: sec.name || `Quarter ${i + 1}`, role,
      color: meta?.color || FALLBACK_COLORS[i % FALLBACK_COLORS.length],
      blurb: meta?.blurb || QUARTER_BLURB[role],
      stories: meta?.stories || '',
      x: sec.lx, y: sec.ly, poly,
    };
  });

  /* ---- blocks -> parks, lots, buildings ---- */
  const buildings = [];
  const tall = [];
  // Roof tone per footprint. Real blocks are never one flat colour, and three
  // buckets is enough to stop a district reading as a single painted shape.
  const tone = [];
  const use = [];
  const parks = [];
  const openBlocks = [];

  for (let b = 0; b < blocks; b++) {
    const o = b * 8;
    const cx = (q[o] + q[o + 2] + q[o + 4] + q[o + 6]) / 4;
    const cy = (q[o + 1] + q[o + 3] + q[o + 5] + q[o + 7]) / 4;

    // The coarse outline was clipped against a coarse coastline. At this range
    // the raster draws a much finer one, so re-check against what is actually
    // being painted underneath.
    if (!isLandAt(planet, cx, cy, 6)) continue;

    const qi = citySectorAt(city, cx, cy);
    const quarter = quarters[qi];
    const dc = Math.hypot(cx - city.x, cy - city.y) / R;
    const green = quarter.role === 'green' || quarter.role === 'campus' || quarter.role === 'wealth';

    // Some blocks are never built on: squares, parks, yards, car parks.
    if (rng() < (green ? 0.17 : 0.06) + dc * 0.05) {
      const poly = [];
      const rad = Math.hypot(q[o + 4] - q[o], q[o + 5] - q[o + 1]) * 0.42;
      for (let a = 0; a < 14; a++) {
        const ang = (a / 14) * Math.PI * 2;
        const rr = rad * (0.78 + nC(Math.cos(ang) * 2 + b, Math.sin(ang) * 2) * 0.35);
        poly.push({ x: cx + Math.cos(ang) * rr, y: cy + Math.sin(ang) * rr });
      }
      parks.push({ x: cx, y: cy, r: rad, poly, quarter: qi });
      continue;
    }

    openBlocks.push({ b, o, x: cx, y: cy, qi, dc });

    // Denser, more central blocks are cut into more and smaller lots.
    const pressure = quarter.role === 'core' ? 1
      : quarter.role === 'remote' ? 0.15
      : quarter.role === 'rural' ? 0.3
      : quarter.role === 'industry' || quarter.role === 'harbour' ? 0.45 : 0.75;
    const density = Math.max(0.25, pressure * (1.15 - dc * 0.5));
    const n = density > 0.85 ? 3 : density > 0.55 ? 2 : 1;
    const isTall = (quarter.role === 'core' && dc < 0.45) || (quarter.role === 'wealth' && rng() < 0.25);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        // Gaps: not every lot is built, and no two neighbours share a wall.
        if (rng() > 0.88) continue;
        const g = 0.06 + rng() * 0.06;
        const u0 = i / n + g / 2;
        const u1 = (i + 1) / n - g / 2;
        const v0 = j / n + g / 2;
        const v1 = (j + 1) / n - g / 2;
        lotCorners(q, o, u0, v0, u1, v1, buildings);
        tall.push(isTall && rng() < 0.6 ? 1 : 0);
        tone.push((rng() * 3) | 0);
        use.push(USE_KEYS.indexOf(pick(rng, USE_MIX[quarter.role] || USE_MIX.residential)));
      }
    }
  }

  /* ---- places ---- */
  const pois = [];
  const floor = city.kind === 'outpost' ? 2 : city.kind === 'village' ? 5 : 4;
  const ceiling = city.kind === 'outpost' ? 5 : city.kind === 'village' ? 10 : 120;
  const want = Math.max(floor, Math.min(ceiling, Math.round(openBlocks.length / 14)));
  const usedBlocks = new Set();
  // Two hotels can share a street, but not a name. Names are re-rolled a few
  // times and then numbered, the way a chain would be.
  const usedNames = new Map();
  const uniqueName = (base) => {
    const n = usedNames.get(base) || 0;
    usedNames.set(base, n + 1);
    return n === 0 ? base : `${base} (${n + 1})`;
  };

  // One landmark that is unambiguously the middle of the place, first so it
  // owns its name.
  if (openBlocks.length && city.kind !== 'outpost') {
    const q0 = quarters[0];
    usedNames.set(`${city.name} ${SMALL.has(city.kind) ? 'Village Hall' : 'Civic Hall'}`, 1);
    pois.push({
      x: city.x, y: city.y, kind: 'townhall',
      type: 'civic', icon: '🏛️',
      name: `${city.name} ${SMALL.has(city.kind) ? 'Village Hall' : 'Civic Hall'}`,
      note: `${SMALL.has(city.kind) ? 'Village hall' : 'Civic hall'} · ${q0.name}`,
      quarter: q0.name,
    });
  }

  // The square. Every settlement worth the name has one open public space at
  // its middle, and a monument on it that the place is measured from.
  let square = null;
  if (city.kind !== 'outpost') {
    let best = -1;
    let bd = Infinity;
    for (let i = 0; i < openBlocks.length; i++) {
      const d = Math.hypot(openBlocks[i].x - city.x, openBlocks[i].y - city.y);
      if (d < bd) { bd = d; best = i; }
    }
    if (best >= 0) {
      usedBlocks.add(best);
      const blk = openBlocks[best];
      const rad = R * (city.kind === 'capital' ? 0.045 : city.kind === 'mega' ? 0.055 : 0.09);
      const poly = [];
      for (let a = 0; a < 18; a++) {
        const ang = (a / 18) * Math.PI * 2;
        const rr = rad * (0.9 + nC(Math.cos(ang) * 3, Math.sin(ang) * 3) * 0.16);
        poly.push({ x: blk.x + Math.cos(ang) * rr, y: blk.y + Math.sin(ang) * rr });
      }
      const squareName = city.name === 'Ongaku Prime' ? 'Harmony Square' : `${squareLabel(rng, city.name)}`;
      square = { x: blk.x, y: blk.y, r: rad, poly, name: squareName };
      usedNames.set(squareName, 1);
      pois.push({
        x: blk.x, y: blk.y, kind: 'monument', landmark: true,
        type: 'landmark', icon: '\u{1F5FF}',
        name: monumentName(rng, city),
        note: `The monument on ${squareName}. Everything in ${city.name} is measured from here.`,
        quarter: quarters[citySectorAt(city, blk.x, blk.y)].name,
      });
    }
  }

  // Why the place is here at all. For a mine or a fishing quay this is the
  // only building on the map anybody actually visits.
  if (city.purpose && openBlocks.length) {
    let best = -1;
    let bd = Infinity;
    for (let i = 0; i < openBlocks.length; i++) {
      if (usedBlocks.has(i)) continue;
      const d = Math.hypot(openBlocks[i].x - city.x, openBlocks[i].y - city.y);
      if (d < bd) { bd = d; best = i; }
    }
    if (best >= 0) {
      usedBlocks.add(best);
      const op = city.purpose.operator;
      const label = city.purpose.site || city.purpose.label;
      const name = op ? `${op.split(' ')[0]} ${label}` : `${city.name.split(' ')[0]} ${label}`;
      usedNames.set(name, 1);
      pois.push({
        x: openBlocks[best].x, y: openBlocks[best].y,
        kind: 'industryhq', purpose: true,
        type: city.purpose.tier === 'outpost' ? 'front' : 'civic',
        icon: city.purpose.icon, name,
        note: op ? `${city.purpose.blurb} Operated by ${op}.` : city.purpose.blurb,
        quarter: quarters[0].name,
      });
    }
  }

  seedCanonPlaces(city, quarters, openBlocks, rng, pois, usedBlocks, usedNames);
  seedHeadOffices(city, quarters, openBlocks, rng, pois, usedBlocks, usedNames);

  // Canon places are additional to the generated ones, not instead of them:
  // the capital should still have restaurants nobody has written about.
  const target = pois.length + want;
  let guard = 0;
  while (pois.length < target && guard++ < want * 40 && openBlocks.length) {
    const pickIdx = (rng() * openBlocks.length) | 0;
    if (usedBlocks.has(pickIdx)) continue;
    const blk = openBlocks[pickIdx];
    // Places want elbow room, otherwise a street reads as a wall of pins.
    if (pois.some((p) => Math.hypot(p.x - blk.x, p.y - blk.y) < R * 0.035)) continue;
    usedBlocks.add(pickIdx);
    const quarter = quarters[blk.qi];
    const kind = pick(rng, ROLE_MIX[quarter.role] || ROLE_MIX.residential);
    const meta = PLACE_KINDS[kind];
    if (!meta) continue;
    let name = placeName(kind, rng, quarter.name, city.name);
    for (let t = 0; t < 4 && usedNames.has(name); t++) name = placeName(kind, rng, quarter.name, city.name);
    pois.push({
      x: blk.x, y: blk.y, kind,
      type: meta.type, icon: meta.icon,
      name: uniqueName(name),
      note: `${meta.label} · ${quarter.name}`,
      quarter: quarter.name,
    });
  }

  return {
    name: city.name,
    quarters,
    square,
    parks,
    pois,
    buildings: Float32Array.from(buildings),
    tall: Uint8Array.from(tall),
    tone: Uint8Array.from(tone),
    use: Uint8Array.from(use),
    useKeys: USE_KEYS,
    stats: { blocks, buildings: tall.length, parks: parks.length, places: pois.length },
  };
}


/* -------------------------------------------------- canon placement */

const DKEY_TO_QUARTER = Object.fromEntries(DISTRICTS.map((d) => [d.key, d.name]));

// Ongaku Prime and Trolley are written, not generated. Their canon places are
// laid onto real blocks in the quarter they belong to, so the capital reads
// the same on the map as it does in the wiki.
function seedCanonPlaces(city, quarters, openBlocks, rng, pois, usedBlocks, usedNames) {
  const mine = CANON_PLACES.filter((p) => {
    const quarter = DKEY_TO_QUARTER[p.d];
    if (city.name === 'Trolley') return p.d === 'trolley';
    if (city.name !== 'Ongaku Prime') return false;
    return p.d !== 'trolley' && quarters.some((q) => q.name === quarter);
  });

  for (const def of mine) {
    const wanted = DKEY_TO_QUARTER[def.d];
    const qi = Math.max(0, quarters.findIndex((q) => q.name === wanted));
    // Nearest free block to the quarter centre, jittered so the canon places
    // do not stack up on one crossroads.
    const jx = quarters[qi].x + (rng() - 0.5) * city.radius * 0.5;
    const jy = quarters[qi].y + (rng() - 0.5) * city.radius * 0.5;
    // Prefer a block in the right quarter, but a thinly built outlying
    // quarter must not cost the map a canon landmark — fall back to the
    // nearest free block anywhere.
    let best = -1;
    let bd = Infinity;
    let anyBest = -1;
    let anyD = Infinity;
    for (let i = 0; i < openBlocks.length; i++) {
      if (usedBlocks.has(i)) continue;
      const blk = openBlocks[i];
      const d = Math.hypot(blk.x - jx, blk.y - jy);
      if (d < anyD) { anyD = d; anyBest = i; }
      if (blk.qi !== qi) continue;
      if (d < bd) { bd = d; best = i; }
    }
    if (best < 0) best = anyBest;
    if (best < 0) continue;
    usedBlocks.add(best);
    usedNames.set(def.name, 1);
    const blk = openBlocks[best];
    pois.push({
      x: blk.x, y: blk.y, kind: 'canon', canon: true,
      type: def.type, icon: def.icon, name: def.name, note: def.note,
      quarter: quarters[qi].name,
    });
  }
}

// Head offices. A corporation with a tower somewhere real is worth more to a
// story than one that only exists in a wiki paragraph.
function seedHeadOffices(city, quarters, openBlocks, rng, pois, usedBlocks, usedNames) {
  for (const co of CORPORATIONS) {
    if (co.hq !== city.name) continue;
    let qi = quarters.findIndex((q) => q.role === co.role);
    if (qi < 0) qi = 0;
    const jx = quarters[qi].x + (rng() - 0.5) * city.radius * 0.4;
    const jy = quarters[qi].y + (rng() - 0.5) * city.radius * 0.4;
    let best = -1;
    let bd = Infinity;
    for (let i = 0; i < openBlocks.length; i++) {
      if (usedBlocks.has(i)) continue;
      const d = Math.hypot(openBlocks[i].x - jx, openBlocks[i].y - jy);
      if (d < bd) { bd = d; best = i; }
    }
    if (best < 0) continue;
    usedBlocks.add(best);
    const name = co.short + " HQ";
    usedNames.set(name, 1);
    pois.push({
      x: openBlocks[best].x, y: openBlocks[best].y,
      kind: 'hq', hq: true, corp: co.name,
      type: 'landmark', icon: co.icon, name,
      note: co.blurb,
      quarter: quarters[qi].name,
    });
  }
}

/* ------------------------------------------------------------ crew -- */

// The Made Deck live in the capital's quarters; the Sick 52 hold cells in the
// countryside around it. Both sit in planet coordinates like everything else,
// so they simply appear as you fly down into Ongaku Prime.
export function placeCrew(planet, madeList, sickList) {
  const home = planet.cities.find((c) => c.name === 'Ongaku Prime') || planet.cities[0];
  if (!home || !home.sectors) return [];
  const rng = mulberry32(seedFromString(`${planet.seed}::crew`));
  const R = home.radius;
  const out = [];

  for (const p of madeList) {
    let qi = home.sectors.findIndex((s) => s.name === p.district);
    if (qi < 0) qi = 0;
    const sec = home.sectors[qi];
    let x = sec.lx;
    let y = sec.ly;
    for (let t = 0; t < 80; t++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * R * 0.42;
      const tx = sec.lx + Math.cos(a) * r;
      const ty = sec.ly + Math.sin(a) * r;
      if (cityContains(home, tx, ty) && citySectorAt(home, tx, ty) === qi && isLandAt(planet, tx, ty, 6)) {
        x = tx;
        y = ty;
        break;
      }
    }
    out.push({
      kind: 'made', x, y,
      label: p.alias,
      card: `${p.card}${p.suit === 'spades' ? '♠' : p.suit === 'hearts' ? '♥' : p.suit === 'clubs' ? '♣' : '♦'}`,
      data: p,
    });
  }

  // Cells of five or six, outside the built-up area — the Sick 52 do not keep
  // addresses in the city.
  const cells = [];
  for (let c = 0; c < 9; c++) {
    for (let t = 0; t < 500; t++) {
      const a = rng() * Math.PI * 2;
      const r = R * (1.4 + rng() * 2.2);
      const x = home.x + Math.cos(a) * r;
      const y = home.y + Math.sin(a) * r;
      if (!isLandAt(planet, x, y, 6)) continue;
      if (planet.cities.some((o) => cityContains(o, x, y))) continue;
      if (cells.some((q) => Math.hypot(q.x - x, q.y - y) < R * 0.55)) continue;
      cells.push({ x, y });
      break;
    }
  }
  if (!cells.length) cells.push({ x: home.x + R * 2, y: home.y });

  sickList.forEach((s, i) => {
    const base = cells[i % cells.length];
    let x = base.x;
    let y = base.y;
    for (let t = 0; t < 40; t++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * R * 0.22;
      const tx = base.x + Math.cos(a) * r;
      const ty = base.y + Math.sin(a) * r;
      if (!isLandAt(planet, tx, ty, 6)) continue;
      x = tx;
      y = ty;
      break;
    }
    out.push({ kind: 'sick', x, y, label: s.name, card: s.cardLabel || '', cell: i % cells.length, data: s });
  });

  return out;
}

/* ---------------------------------------------------------- render -- */

// Building colours per basemap style. Deliberately low contrast: at this zoom
// the roads and the labels are the content, and a city of high-contrast boxes
// reads as noise.
// Three roof tones per style rather than one flat fill, plus a shadow colour.
// Aerial imagery is never uniform: concrete, tile and metal roofs sit side by
// side, and it is that variation — not outlines — that makes a block read as
// buildings rather than as a texture.
const BUILD = {
  satellite: {
    tones: ['rgba(188,180,166,.92)', 'rgba(206,198,183,.92)', 'rgba(168,158,143,.92)'],
    tall: 'rgba(238,233,222,.94)',
    edge: 'rgba(24,20,14,.35)', shadow: 'rgba(10,14,22,.38)',
    park: 'rgba(84,126,70,.72)', plaza: 'rgba(214,206,190,.9)', tint: 0.085,
  },
  map: {
    tones: ['#d9d3c7', '#e0dad0', '#cfc8ba'],
    tall: '#c6bdad',
    edge: 'rgba(132,124,110,.55)', shadow: 'rgba(120,112,98,.22)',
    park: '#cfe3bd', plaza: '#e8e2d4', tint: 0.14,
  },
  terrain: {
    tones: ['rgba(208,198,179,.95)', 'rgba(218,209,192,.95)', 'rgba(194,182,161,.95)'],
    tall: 'rgba(186,173,150,.97)',
    edge: 'rgba(132,122,104,.5)', shadow: 'rgba(90,80,64,.28)',
    park: '#c4daae', plaza: '#e0d8c6', tint: 0.12,
  },
};

const tracePoly = (ctx, poly) => {
  ctx.moveTo(poly[0].x, poly[0].y);
  for (let i = 1; i < poly.length; i++) ctx.lineTo(poly[i].x, poly[i].y);
  ctx.closePath();
};

export function drawCityDetail(ctx, city, detail, styleKey, scale, layers = {}) {
  const B = BUILD[styleKey] || BUILD.satellite;
  const lw = (px) => px / Math.max(0.02, scale);

  if (layers.districts !== false) {
    // The tint is how a quarter reads before its buildings do. Once the
    // footprints are drawing it becomes noise, so it fades out under them.
    const fade = Math.max(0, Math.min(1, (1400 - city.radius * scale) / 700));
    if (fade <= 0.01) { /* fully built up: the buildings carry it */ } else {
    ctx.globalAlpha = B.tint * fade;
    for (const q of detail.quarters) {
      if (q.poly.length < 3) continue;
      ctx.beginPath();
      tracePoly(ctx, q.poly);
      ctx.fillStyle = q.color;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    }
  }

  ctx.fillStyle = B.park;
  ctx.beginPath();
  for (const p of detail.parks) tracePoly(ctx, p.poly);
  ctx.fill();

  // The square is paved, not planted — it reads as civic space rather than
  // as one more park.
  if (detail.square) {
    ctx.beginPath();
    tracePoly(ctx, detail.square.poly);
    ctx.fillStyle = B.plaza;
    ctx.fill();
    ctx.strokeStyle = B.edge;
    ctx.lineWidth = lw(0.8);
    ctx.stroke();
  }

  if (layers.buildings === false) return;

  const q = detail.buildings;
  const tall = detail.tall;
  const tone = detail.tone;

  // One path per tone, so the whole city is four fills rather than thousands.
  const path = (test) => {
    ctx.beginPath();
    for (let i = 0, b = 0; i < q.length; i += 8, b++) {
      if (!test(b)) continue;
      ctx.moveTo(q[i], q[i + 1]);
      ctx.lineTo(q[i + 2], q[i + 3]);
      ctx.lineTo(q[i + 4], q[i + 5]);
      ctx.lineTo(q[i + 6], q[i + 7]);
      ctx.closePath();
    }
  };

  // Towers throw a shadow to the south-east, matching the hillshading's
  // north-west light. It is the cheapest way to make height read on a flat
  // map, and it is what tells you where the downtown is at a glance.
  const drop = city.radius * 0.010;
  if (city.radius * scale > 260) {
    ctx.save();
    ctx.translate(drop, drop);
    path((b) => tall[b] === 1);
    ctx.fillStyle = B.shadow;
    ctx.fill();
    ctx.restore();
  }

  for (let t = 0; t < 3; t++) {
    path((b) => tall[b] !== 1 && (tone ? tone[b] : 0) === t);
    ctx.fillStyle = B.tones[t];
    ctx.fill();
    if (city.radius * scale > 900) {
      ctx.strokeStyle = B.edge;
      ctx.lineWidth = lw(0.5);
      ctx.stroke();
    }
  }

  path((b) => tall[b] === 1);
  ctx.fillStyle = B.tall;
  ctx.fill();
  if (city.radius * scale > 900) {
    ctx.strokeStyle = B.edge;
    ctx.lineWidth = lw(0.5);
    ctx.stroke();
  }
}