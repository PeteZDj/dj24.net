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
  cityContains, citySectorAt, isLandAt, CANON_PLACES,
} from './mapGenerator.js';

/* ---------------------------------------------------------- places -- */

// type maps onto the map legend groups; icon is what the pin shows.
export const PLACE_KINDS = {
  tower: { type: 'landmark', icon: '🏢', label: 'Tower' },
  museum: { type: 'landmark', icon: '🏛️', label: 'Museum' },
  gallery: { type: 'landmark', icon: '🖼️', label: 'Gallery' },
  monument: { type: 'landmark', icon: '🗿', label: 'Monument' },
  restaurant: { type: 'food', icon: '🍽️', label: 'Restaurant' },
  cafe: { type: 'food', icon: '☕', label: 'Café' },
  market: { type: 'food', icon: '🛒', label: 'Market' },
  bar: { type: 'venue', icon: '🍸', label: 'Bar' },
  club: { type: 'venue', icon: '🎧', label: 'Club' },
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
  core: ['tower', 'tower', 'bank', 'bank', 'hotel', 'restaurant', 'restaurant', 'cafe', 'museum', 'gallery', 'theatre', 'station', 'mall', 'police', 'library'],
  nightlife: ['club', 'club', 'bar', 'bar', 'restaurant', 'restaurant', 'cafe', 'studio', 'cinema', 'theatre', 'arena', 'hotel', 'gallery'],
  old: ['museum', 'museum', 'gallery', 'cafe', 'cafe', 'restaurant', 'market', 'library', 'theatre', 'hotel', 'monument'],
  residential: ['cafe', 'restaurant', 'school', 'school', 'market', 'garden', 'bar', 'hospital', 'police', 'library', 'garage'],
  wealth: ['restaurant', 'restaurant', 'cafe', 'gallery', 'hotel', 'garden', 'museum', 'school', 'bank'],
  campus: ['university', 'university', 'library', 'cafe', 'cafe', 'bar', 'stadium', 'school', 'museum', 'garden', 'hospital'],
  harbour: ['warehouse', 'warehouse', 'works', 'ferry', 'bar', 'restaurant', 'market', 'garage', 'station', 'cafe'],
  industry: ['works', 'works', 'warehouse', 'warehouse', 'garage', 'cafe', 'station', 'airfield'],
  green: ['garden', 'garden', 'cafe', 'stadium', 'school', 'restaurant', 'museum'],
  military: ['barracks', 'barracks', 'warehouse', 'airfield', 'garage', 'hospital'],
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

function roleOf(name, index, dens) {
  if (CANON_ROLE[name]) return CANON_ROLE[name];
  if (/Docks|Wharf|Quay/i.test(name)) return 'harbour';
  if (/Yards|Mills|Works/i.test(name)) return 'industry';
  if (/Heights|Hill/i.test(name)) return 'wealth';
  if (/Park|Green|Gardens/i.test(name)) return 'green';
  if (index === 0) return 'core';
  return dens > 0.72 ? 'nightlife' : 'residential';
}

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
};

/* ----------------------------------------------------------- names -- */

const SURNAMES = ['Kade', 'Moretti', 'Duvall', 'Verrado', 'Halcyon', 'Meridian', 'Vantage', 'Harlow', 'Bellamy', 'Osei', 'Nakamura', 'Achebe', 'Vega', 'Marlow', 'Dunbar', 'Sable', 'Okafor', 'Ferris', 'Lindqvist', 'Rossi', 'Adeyemi', 'Toure', 'Barros', 'Sinclair', 'Mwangi', 'Petrov'];
const ADJECTIVES = ['Golden', 'Copper', 'Ivory', 'Crimson', 'Velvet', 'Silver', 'Blue', 'Old', 'Bright', 'Quiet', 'Little', 'Grand', 'Iron', 'Amber', 'Northern'];
const NOUNS = ['Lantern', 'Anchor', 'Sparrow', 'Kettle', 'Fox', 'Chord', 'Needle', 'Orchid', 'Compass', 'Drum', 'Whistle', 'Crown', 'Bell', 'Pelican', 'Thistle'];
const ABSTRACTS = ['Sound', 'Rhythm', 'Migration', 'Industry', 'the Republic', 'Broadcast', 'Everyday Life', 'Modern Art', 'Transport', 'the Sea'];
const STREETWORDS = ['Street', 'Avenue', 'Row', 'Lane', 'Walk', 'Square', 'Gate', 'Wharf', 'Yard', 'Terrace', 'Parade', 'Crescent'];
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
    const role = roleOf(sec.name || '', i, sec.dens);
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
    const pressure = quarter.role === 'core' ? 1 : quarter.role === 'industry' || quarter.role === 'harbour' ? 0.45 : 0.75;
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
      }
    }
  }

  /* ---- places ---- */
  const pois = [];
  const want = Math.max(4, Math.min(120, Math.round(openBlocks.length / 14)));
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
  if (openBlocks.length) {
    const q0 = quarters[0];
    usedNames.set(`${city.name} Civic Hall`, 1);
    pois.push({
      x: city.x, y: city.y, kind: 'townhall',
      type: 'civic', icon: '🏛️',
      name: `${city.name} Civic Hall`,
      note: `Civic hall · ${q0.name}`,
      quarter: q0.name,
    });
  }

  seedCanonPlaces(city, quarters, openBlocks, rng, pois, usedBlocks, usedNames);

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
    parks,
    pois,
    buildings: Float32Array.from(buildings),
    tall: Uint8Array.from(tall),
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
const BUILD = {
  satellite: { fill: 'rgba(196,189,175,.88)', tall: 'rgba(238,233,222,.92)', edge: 'rgba(24,20,14,.35)', park: 'rgba(84,126,70,.72)', tint: 0.085 },
  map: { fill: '#d7d1c5', tall: '#c6bdad', edge: 'rgba(132,124,110,.55)', park: '#cfe3bd', tint: 0.14 },
  terrain: { fill: 'rgba(206,196,177,.95)', tall: 'rgba(188,176,153,.97)', edge: 'rgba(132,122,104,.5)', park: '#c4daae', tint: 0.12 },
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

  if (layers.buildings === false) return;

  const q = detail.buildings;
  const tall = detail.tall;
  // Two passes so the whole city is two fill calls rather than thousands.
  for (let pass = 0; pass < 2; pass++) {
    ctx.beginPath();
    for (let i = 0, b = 0; i < q.length; i += 8, b++) {
      if ((tall[b] === 1) !== (pass === 1)) continue;
      ctx.moveTo(q[i], q[i + 1]);
      ctx.lineTo(q[i + 2], q[i + 3]);
      ctx.lineTo(q[i + 4], q[i + 5]);
      ctx.lineTo(q[i + 6], q[i + 7]);
      ctx.closePath();
    }
    ctx.fillStyle = pass === 1 ? B.tall : B.fill;
    ctx.fill();
    // Outlines only once a footprint is big enough for one to mean anything.
    if (city.radius * scale > 900) {
      ctx.strokeStyle = B.edge;
      ctx.lineWidth = lw(0.5);
      ctx.stroke();
    }
  }
}
