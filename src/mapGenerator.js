// =====================================================================
// PLANET ONGAKU — PROCEDURAL WORLD & CITY GENERATOR
//
// Two generators sharing one seeded RNG:
//   generatePlanet(seed) -> continents, oceans, biomes, cities, faction zones
//   generateCity(seed, cityName) -> districts, roads, blocks, POIs, members
//
// Everything is deterministic: the same seed always produces the same world,
// so a map can be shared or reproduced from its seed string alone.
// Design notes: docs/PLANET-ONGAKU-WORLD-BIBLE.md §13-15
// =====================================================================

export const WORLD_W = 2600;
export const WORLD_H = 1700;

/* ---------------------------------------------------------------- RNG */

export function mulberry32(a) {
  return function rand() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seedFromString(str) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function randomSeedWord() {
  const a = ['NEON', 'BASS', 'ECHO', 'DUSK', 'IRON', 'GOLD', 'VOID', 'RIFT', 'HAZE', 'CROWN', 'STATIC', 'VELVET'];
  const b = ['GRID', 'DROP', 'CITY', 'WIRE', 'TIDE', 'SPIRE', 'CHORD', 'REIGN', 'PULSE', 'BLOCK'];
  const r = Math.floor(Math.random() * 9000) + 1000;
  return `${a[Math.floor(Math.random() * a.length)]}-${b[Math.floor(Math.random() * b.length)]}-${r}`;
}

/* -------------------------------------------------------------- NOISE */

function makeNoise(rng) {
  const N = 256;
  const grad = new Float32Array(N);
  const perm = new Uint8Array(N * 2);
  for (let i = 0; i < N; i++) {
    grad[i] = rng() * 2 - 1;
    perm[i] = i;
  }
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const t = perm[i];
    perm[i] = perm[j];
    perm[j] = t;
  }
  for (let i = 0; i < N; i++) perm[i + N] = perm[i];

  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (x, y, t) => x + (y - x) * t;
  const at = (ix, iy) => grad[(perm[ix & 255] + (iy & 255)) & 255];

  return function noise2(x, y) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = fade(x - x0);
    const fy = fade(y - y0);
    return lerp(
      lerp(at(x0, y0), at(x0 + 1, y0), fx),
      lerp(at(x0, y0 + 1), at(x0 + 1, y0 + 1), fx),
      fy
    );
  };
}

function fbm(noise, x, y, octaves = 5, lac = 2, gain = 0.5) {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += noise(x * freq, y * freq) * amp;
    norm += amp;
    amp *= gain;
    freq *= lac;
  }
  return sum / norm;
}

/* ------------------------------------------------------------- PLANET */

export const CANON_CITIES = [
  { name: 'Ongaku Prime', kind: 'capital', faction: 'council', desc: 'The capital. Government, corporate towers and the Harmony Council.' },
  { name: 'Urban City', kind: 'mega', faction: 'mafia', desc: 'Hip-Hop Heartland. Home turf of the Hip Hop Mafia.' },
  { name: 'Electric City', kind: 'mega', faction: 'nexagen', desc: 'Neon Pulse Metropolis. Electronic music and NexaGen industry.' },
  { name: 'Classic City', kind: 'mega', faction: 'council', desc: 'The Conservatory Capital. Seat of the Sacred Conservatory.' },
  { name: 'Rock City', kind: 'mega', faction: 'neutral', desc: 'Amplified Stronghold. The Crimson Amplified Order.' },
  { name: 'Blue City', kind: 'mega', faction: 'neutral', desc: 'Jazz Quarter Haven. Smooth improvisation district.' },
  { name: 'Pop City', kind: 'mega', faction: 'tower', desc: 'Commercial paradise. The Tower Group broadcasts from here.' },
  { name: 'Rose City', kind: 'mega', faction: 'tower', desc: 'Romantic ballad district. Velvet Records territory.' },
  { name: 'Cloud City', kind: 'mega', faction: 'neutral', desc: 'Sky-high electronic paradise.' },
  { name: 'Hall of Laughter', kind: 'hostile', faction: 'komedian', desc: 'Komedian territory. Reality is unreliable here.' },
  { name: 'Joke City', kind: 'hostile', faction: 'komedian', desc: 'Absurdist reality zone.' },
  { name: 'Clown Country', kind: 'hostile', faction: 'komedian', desc: 'Comedic chaos realm.' },
  { name: 'Skyport 9', kind: 'military', faction: 'military', desc: 'Aero Command station. Siege site.' },
  { name: 'Trolley', kind: 'fortress', faction: 'military', desc: 'Fortress installation. The defence grid.' },
  { name: 'Port Sonora', kind: 'port', faction: 'mafia', desc: 'Shipping and smuggling. Clubs house routes run through here.' },
  { name: 'Vantage Bay', kind: 'town', faction: 'neutral', desc: 'Coastal town. Quiet, and everybody likes it that way.' },
  { name: 'Kade Valley', kind: 'town', faction: 'mafia', desc: 'Farming region funded by the Kade Community Trust.' },
  { name: 'Northreach', kind: 'town', faction: 'neutral', desc: 'Cold northern outpost. Mining and long silences.' },
];

export const FACTIONS = {
  council: { name: 'Harmony Council', color: '#F59E0B', icon: '🏛️' },
  mafia: { name: 'Hip Hop Mafia', color: '#D4AF37', icon: '🃏' },
  sick52: { name: 'The Sick 52', color: '#DC2626', icon: '💀' },
  nexagen: { name: 'NexaGen Harmonics', color: '#0EA5E9', icon: '🏢' },
  tower: { name: 'The Tower Group', color: '#A855F7', icon: '📡' },
  military: { name: 'Military / Aero Command', color: '#10B981', icon: '🛡️' },
  komedian: { name: 'The Komedians', color: '#EC4899', icon: '🤡' },
  neutral: { name: 'Unaligned', color: '#94A3B8', icon: '○' },
};

const BIOMES = {
  deep: '#0b2545',
  ocean: '#12406b',
  shallow: '#1d6a94',
  sand: '#d9c79a',
  plain: '#5f8f52',
  forest: '#3d6b3f',
  hill: '#7d7a4c',
  mountain: '#7b6f63',
  snow: '#e8eef2',
};

export function generatePlanet(seedStr) {
  const seed = seedFromString(seedStr);
  const rng = mulberry32(seed);
  const nH = makeNoise(rng);
  const nM = makeNoise(rng);

  const CELL = 10;
  const GW = Math.ceil(WORLD_W / CELL);
  const GH = Math.ceil(WORLD_H / CELL);
  const height = new Float32Array(GW * GH);
  const biome = new Uint8Array(GW * GH);
  const biomeKeys = Object.keys(BIOMES);

  for (let y = 0; y < GH; y++) {
    for (let x = 0; x < GW; x++) {
      const nx = x / GW;
      const ny = y / GH;
      let h = fbm(nH, nx * 4.2, ny * 3.0, 6);
      // Push the frame toward ocean so continents read as continents.
      const dx = (nx - 0.5) * 2;
      const dy = (ny - 0.5) * 2;
      const edge = Math.sqrt(dx * dx * 0.85 + dy * dy);
      h -= Math.max(0, edge - 0.55) * 1.6;
      h += 0.06;

      const moist = fbm(nM, nx * 6, ny * 5, 4);
      const idx = y * GW + x;
      height[idx] = h;

      let b;
      if (h < -0.16) b = 'deep';
      else if (h < -0.05) b = 'ocean';
      else if (h < 0.0) b = 'shallow';
      else if (h < 0.02) b = 'sand';
      else if (h > 0.34) b = 'snow';
      else if (h > 0.24) b = 'mountain';
      else if (h > 0.15) b = 'hill';
      else if (moist > 0.05) b = 'forest';
      else b = 'plain';
      biome[idx] = biomeKeys.indexOf(b);
    }
  }

  const isLand = (gx, gy) => {
    if (gx < 0 || gy < 0 || gx >= GW || gy >= GH) return false;
    return height[gy * GW + gx] > 0.005;
  };
  const isCoast = (gx, gy) => {
    if (!isLand(gx, gy)) return false;
    for (let d = 2; d <= 4; d++) {
      if (!isLand(gx + d, gy) || !isLand(gx - d, gy) || !isLand(gx, gy + d) || !isLand(gx, gy - d)) return true;
    }
    return false;
  };

  // Place cities on land with spacing; coastal kinds prefer the coast.
  const cities = [];
  const minDist = 165;
  for (const spec of CANON_CITIES) {
    const wantsCoast = ['port', 'capital', 'mega'].includes(spec.kind);
    let best = null;
    let bestScore = -Infinity;
    for (let tries = 0; tries < 900; tries++) {
      const gx = 6 + Math.floor(rng() * (GW - 12));
      const gy = 6 + Math.floor(rng() * (GH - 12));
      if (!isLand(gx, gy)) continue;
      const px = gx * CELL;
      const py = gy * CELL;
      let ok = true;
      for (const c of cities) {
        if (Math.hypot(c.x - px, c.y - py) < minDist) { ok = false; break; }
      }
      if (!ok) continue;
      let score = rng() * 0.5;
      if (wantsCoast && isCoast(gx, gy)) score += 3;
      if (spec.kind === 'town' && !isCoast(gx, gy)) score += 1;
      if (score > bestScore) { bestScore = score; best = { px, py }; }
      if (bestScore > 3) break;
    }
    if (best) {
      cities.push({
        ...spec,
        x: best.px,
        y: best.py,
        pop: Math.round((spec.kind === 'capital' ? 18 : spec.kind === 'mega' ? 9 : 2) * (0.7 + rng() * 0.7) * 1000000),
      });
    }
  }

  // Road/route network: connect each city to its two nearest neighbours.
  const routes = [];
  cities.forEach((c, i) => {
    const others = cities
      .map((o, j) => ({ o, j, d: Math.hypot(o.x - c.x, o.y - c.y) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const e of others) {
      const key = i < e.j ? `${i}-${e.j}` : `${e.j}-${i}`;
      if (!routes.some((r) => r.key === key)) {
        routes.push({ key, a: c, b: e.o, sea: !isLand(Math.floor(((c.x + e.o.x) / 2) / CELL), Math.floor(((c.y + e.o.y) / 2) / CELL)) });
      }
    }
  });

  return { kind: 'planet', seed: seedStr, CELL, GW, GH, height, biome, biomeKeys, BIOMES, cities, routes };
}

export function renderPlanetBase(ctx, p) {
  const { CELL, GW, GH, biome, biomeKeys } = p;
  ctx.fillStyle = BIOMES.deep;
  ctx.fillRect(0, 0, WORLD_W, WORLD_H);

  for (let y = 0; y < GH; y++) {
    for (let x = 0; x < GW; x++) {
      ctx.fillStyle = BIOMES[biomeKeys[biome[y * GW + x]]];
      ctx.fillRect(x * CELL, y * CELL, CELL + 1, CELL + 1);
    }
  }

  // Coastline
  ctx.strokeStyle = 'rgba(6,20,35,0.55)';
  ctx.lineWidth = 2;
  const land = (x, y) => {
    if (x < 0 || y < 0 || x >= GW || y >= GH) return false;
    const b = biomeKeys[biome[y * GW + x]];
    return b !== 'deep' && b !== 'ocean' && b !== 'shallow';
  };
  ctx.beginPath();
  for (let y = 0; y < GH; y++) {
    for (let x = 0; x < GW; x++) {
      if (!land(x, y)) continue;
      if (!land(x + 1, y)) { ctx.moveTo((x + 1) * CELL, y * CELL); ctx.lineTo((x + 1) * CELL, (y + 1) * CELL); }
      if (!land(x - 1, y)) { ctx.moveTo(x * CELL, y * CELL); ctx.lineTo(x * CELL, (y + 1) * CELL); }
      if (!land(x, y + 1)) { ctx.moveTo(x * CELL, (y + 1) * CELL); ctx.lineTo((x + 1) * CELL, (y + 1) * CELL); }
      if (!land(x, y - 1)) { ctx.moveTo(x * CELL, y * CELL); ctx.lineTo((x + 1) * CELL, y * CELL); }
    }
  }
  ctx.stroke();
}

/* --------------------------------------------------------------- CITY */

export const DISTRICTS = [
  { key: 'central', name: 'Central District', color: '#38BDF8', faction: 'nexagen', ax: 0.00, ay: -0.02, r: 1.0,
    blurb: 'Government, finance, corporate towers and NexaGen HQ.', stories: 'Corporate thrillers, political manoeuvring, white-collar crime.' },
  { key: 'neon', name: 'Neon District', color: '#E879F9', faction: 'mafia', ax: 0.22, ay: -0.16, r: 0.95,
    blurb: 'Entertainment, clubs, restaurants and celebrity culture.', stories: 'Nightlife, promotion wars, Hearts house business.' },
  { key: 'oldquarter', name: 'Old Quarter', color: '#FBBF24', faction: 'neutral', ax: -0.24, ay: -0.14, r: 0.9,
    blurb: 'Historic architecture, markets, cafés and cultural landmarks.', stories: "Slice-of-life, the Commission's steakhouse, quiet meetings." },
  { key: 'southside', name: 'Southside', color: '#F59E0B', faction: 'mafia', ax: -0.20, ay: 0.24, r: 1.05,
    blurb: 'Street culture, underground venues, Hip Hop Mafia heartland.', stories: 'Come-up stories, the community fund, Freq Kid.' },
  { key: 'harbour', name: 'Harbour District', color: '#22D3EE', faction: 'mafia', ax: 0.30, ay: 0.26, r: 1.0,
    blurb: 'Shipping, warehouses, smuggling and heavy industry.', stories: 'Product routes, container heists, police surveillance.' },
  { key: 'university', name: 'University District', color: '#34D399', faction: 'neutral', ax: -0.40, ay: 0.02, r: 0.85,
    blurb: 'Students, sports, parties and everyday life.', stories: 'Coming-of-age, house parties, Afrobeats and house register.' },
  { key: 'rosehill', name: 'Rose Hill', color: '#FB7185', faction: 'tower', ax: 0.04, ay: -0.32, r: 0.8,
    blurb: 'Affluent hillside. Restaurants, old money, Velvet Records.', stories: 'R&B, affairs, rooftop dinners, quiet ruin.' },
  { key: 'heights', name: 'The Heights', color: '#818CF8', faction: 'mafia', ax: 0.40, ay: -0.34, r: 0.75,
    blurb: 'Gated wealth above the city. Where the bosses actually live.', stories: 'Family drama, succession, the Chairman at home.' },
  { key: 'skyport', name: 'Skyport', color: '#A3E635', faction: 'military', ax: 0.52, ay: 0.02, r: 0.9,
    blurb: 'Airport, cargo, aviation, military and civilian overlap.', stories: 'Departures, arrivals, Aero Command, goodbyes.' },
  { key: 'trolley', name: 'Trolley', color: '#F87171', faction: 'military', ax: -0.52, ay: -0.34, r: 0.7,
    blurb: 'Fortress installation outside the city. The defence grid.', stories: 'The EDM spectacle register — Attack on Trolley.' },
];

// Landmarks and everyday institutions, from ONGAKU-CIVILIAN-LIFE.md
const POI_DEFS = [
  { name: 'NexaGen Tower', type: 'landmark', d: 'central', icon: '🏢', note: 'HQ of the planet-spanning conglomerate.' },
  { name: 'The Ongaku Exchange', type: 'civic', d: 'central', icon: '🏦', note: 'Stock exchange.' },
  { name: 'Meridian Bank', type: 'civic', d: 'central', icon: '🏦', note: 'Everyone has an account here.' },
  { name: 'Tower Group HQ', type: 'landmark', d: 'central', icon: '📡', note: '24 Radio, OBC News, Tower Sound.' },
  { name: 'Verrado Bianco', type: 'food', d: 'central', icon: '🍽️', note: 'Where Diamonds house does business in daylight.' },
  { name: 'Bao Down', type: 'food', d: 'central', icon: '🥟', note: 'Where the Central District has lunch.' },

  { name: 'Velvet Static', type: 'venue', d: 'neon', icon: '🎤', note: "Silk's flagship club." },
  { name: 'The Velvet Room', type: 'venue', d: 'rosehill', icon: '🥂', note: 'Members-only supper club, owned by Velvet Records.' },
  { name: 'Sable Arena', type: 'landmark', d: 'neon', icon: '🏟️', note: 'The biggest indoor venue on the planet.' },
  { name: 'Halo Coffee', type: 'food', d: 'neon', icon: '☕', note: 'The default somewhere-to-buy-coffee.' },
  { name: 'Tempo Burger', type: 'food', d: 'neon', icon: '🍔', note: 'What every child grows up on.' },

  { name: "Vantaggio's", type: 'landmark', d: 'oldquarter', icon: '🥩', note: 'The Commission meets in the back room, first Sunday of the month.' },
  { name: 'Deep Crates', type: 'venue', d: 'oldquarter', icon: '💿', note: "Bobby Crate's record shop. Contraband in the back." },
  { name: 'The Meridian Hotel', type: 'civic', d: 'oldquarter', icon: '🛎️', note: 'Deals get done in the lobby bar.' },
  { name: 'Old Quarter Market', type: 'civic', d: 'oldquarter', icon: '🧺', note: 'Six centuries of trading.' },

  { name: "Ma Kade's", type: 'food', d: 'southside', icon: '🍗', note: 'Soul food. Feeds the neighbourhood and launders the money.' },
  { name: 'Sugar Hill Chicken', type: 'food', d: 'southside', icon: '🍗', note: 'Went national. The neighbourhood is bitter about it.' },
  { name: 'Boyd & Sons', type: 'front', d: 'southside', icon: '💈', note: "8-Bar's barbershop chain." },
  { name: 'Two-Track Studios', type: 'venue', d: 'southside', icon: '🎛️', note: 'Launders through session fees.' },
  { name: 'The Southside Echo', type: 'civic', d: 'southside', icon: '📰', note: 'Independent paper. Permanently near bankruptcy.' },
  { name: 'Southside Community Centre', type: 'civic', d: 'southside', icon: '⛪', note: "Reverend's chaplaincy. Genuinely a chaplaincy." },

  { name: 'Redline Garage', type: 'front', d: 'harbour', icon: '🔧', note: "Chrome's chop shop and racing base." },
  { name: 'Skillet & Static', type: 'food', d: 'harbour', icon: '🍳', note: "24-hour diner. The Pen's booth is at the back." },
  { name: 'Duvall Pressing Plant', type: 'front', d: 'harbour', icon: '🏭', note: 'Bootlegs and black-market pressing.' },
  { name: 'Container Yards', type: 'civic', d: 'harbour', icon: '⚓', note: 'Where product moves.' },

  { name: 'Ongaku University', type: 'civic', d: 'university', icon: '🎓', note: 'The big public university.' },
  { name: 'Cornerstone Pizza', type: 'food', d: 'university', icon: '🍕', note: 'Late-night student food.' },
  { name: 'The Wire & Barrel', type: 'food', d: 'university', icon: '🍺', note: 'Where ODF servicemen drink.' },
  { name: 'Premier League Ground', type: 'landmark', d: 'university', icon: '⚽', note: 'The fixture that divides the capital.' },

  { name: 'Ateliér Nsua', type: 'civic', d: 'rosehill', icon: '👗', note: 'Fashion house. Dresses the Velvet artists.' },
  { name: 'Nyala Grill', type: 'food', d: 'rosehill', icon: '🍲', note: 'Family-run. Not a chain and proud of it.' },

  { name: "The Chairman's House", type: 'landmark', d: 'heights', icon: '🏛️', note: 'Marcus Cole lives alone. Golf on Sundays.' },
  { name: 'Moretti Holdings', type: 'front', d: 'heights', icon: '💼', note: "Saint Sal's legitimate empire." },

  { name: 'Skyport Terminal', type: 'landmark', d: 'skyport', icon: '✈️', note: 'Departures, arrivals, and everyone who never came back.' },
  { name: 'Aero Command Field', type: 'military', d: 'skyport', icon: '🛩️', note: 'Military and civilian overlap.' },
  { name: 'SkyOngaku Cargo', type: 'civic', d: 'skyport', icon: '📦', note: 'Flag carrier freight.' },

  { name: 'Trolley Fortress', type: 'military', d: 'trolley', icon: '🏰', note: 'The defence grid. Went offline once.' },
  { name: 'Grid Relay Station', type: 'military', d: 'trolley', icon: '📶', note: 'Frequency Grid infrastructure.' },
];

export function generateCity(seedStr, cityName = 'Ongaku Prime') {
  const seed = seedFromString(`${seedStr}::${cityName}`);
  const rng = mulberry32(seed);
  const nW = makeNoise(rng);

  const cx = WORLD_W / 2;
  const cy = WORLD_H / 2;
  const spread = Math.min(WORLD_W, WORLD_H) * 0.78;

  // District seed points
  const districts = DISTRICTS.map((d) => ({
    ...d,
    x: cx + d.ax * spread + (rng() - 0.5) * 60,
    y: cy + d.ay * spread * 1.05 + (rng() - 0.5) * 60,
    weight: d.r,
  }));

  // Water: a bay pushing in from the lower-right, behind the Harbour.
  const CELL = 10;
  const GW = Math.ceil(WORLD_W / CELL);
  const GH = Math.ceil(WORLD_H / CELL);
  const cellDistrict = new Int8Array(GW * GH).fill(-1);
  const water = new Uint8Array(GW * GH);

  for (let gy = 0; gy < GH; gy++) {
    for (let gx = 0; gx < GW; gx++) {
      const px = gx * CELL;
      const py = gy * CELL;
      const i = gy * GW + gx;

      // Coastline sweeps in from the lower right so the Harbour district
      // actually sits on water rather than under it.
      const bayEdge =
        WORLD_H * 0.90 + fbm(nW, gx * 0.02, gy * 0.02, 3) * 200 - (px / WORLD_W) * 380;
      if (py > bayEdge) { water[i] = 1; continue; }

      let bestD = -1;
      let bestScore = Infinity;
      for (let k = 0; k < districts.length; k++) {
        const d = districts[k];
        const dist = Math.hypot(px - d.x, py - d.y) / d.weight;
        if (dist < bestScore) { bestScore = dist; bestD = k; }
      }
      // Beyond the outskirts it is countryside, not city.
      cellDistrict[i] = bestScore < spread * 0.30 ? bestD : -1;
    }
  }

  // Road network
  const roads = { arterials: [], ring: [], streets: [] };
  const centralIdx = districts.findIndex((d) => d.key === 'central');
  const hub = districts[centralIdx];
  districts.forEach((d, i) => {
    if (i === centralIdx) return;
    roads.arterials.push({ x1: hub.x, y1: hub.y, x2: d.x, y2: d.y });
  });
  const ringR = spread * 0.20;
  const ringPts = [];
  for (let a = 0; a <= 64; a++) {
    const t = (a / 64) * Math.PI * 2;
    const rr = ringR * (0.9 + fbm(nW, Math.cos(t) * 2, Math.sin(t) * 2, 2) * 0.35);
    ringPts.push({ x: hub.x + Math.cos(t) * rr, y: hub.y + Math.sin(t) * rr * 0.85 });
  }
  roads.ring = ringPts;

  // Local street grid per district, clipped to that district's cells
  const inDistrict = (px, py, k) => {
    const gx = Math.floor(px / CELL);
    const gy = Math.floor(py / CELL);
    if (gx < 0 || gy < 0 || gx >= GW || gy >= GH) return false;
    return cellDistrict[gy * GW + gx] === k;
  };
  districts.forEach((d, k) => {
    const ang = rng() * Math.PI;
    const step = d.key === 'central' ? 20 : d.key === 'southside' || d.key === 'oldquarter' ? 26 : 34;
    const reach = spread * 0.18 * d.weight;
    for (let s = -reach; s <= reach; s += step) {
      for (const dir of [0, 1]) {
        const a = ang + (dir ? Math.PI / 2 : 0);
        const ox = Math.cos(a + Math.PI / 2) * s;
        const oy = Math.sin(a + Math.PI / 2) * s;
        let start = null;
        for (let t = -reach; t <= reach; t += 8) {
          const px = d.x + ox + Math.cos(a) * t;
          const py = d.y + oy + Math.sin(a) * t;
          const ok = inDistrict(px, py, k);
          if (ok && !start) start = { x: px, y: py };
          else if (!ok && start) {
            const ex = d.x + ox + Math.cos(a) * (t - 8);
            const ey = d.y + oy + Math.sin(a) * (t - 8);
            if (Math.hypot(ex - start.x, ey - start.y) > 26) roads.streets.push({ x1: start.x, y1: start.y, x2: ex, y2: ey });
            start = null;
          }
        }
        if (start) {
          const ex = d.x + ox + Math.cos(a) * reach;
          const ey = d.y + oy + Math.sin(a) * reach;
          if (Math.hypot(ex - start.x, ey - start.y) > 26) roads.streets.push({ x1: start.x, y1: start.y, x2: ex, y2: ey });
        }
      }
    }
  });

  // Buildings
  const blocks = [];
  districts.forEach((d, k) => {
    const density = d.key === 'central' ? 900 : d.key === 'trolley' ? 120 : d.key === 'skyport' ? 200 : 520;
    const reach = spread * 0.17 * d.weight;
    for (let i = 0; i < density; i++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * reach;
      const px = d.x + Math.cos(a) * r;
      const py = d.y + Math.sin(a) * r;
      if (!inDistrict(px, py, k)) continue;
      const tall = d.key === 'central' || d.key === 'heights';
      const w = 6 + rng() * (tall ? 16 : 12);
      const h = 6 + rng() * (tall ? 16 : 12);
      blocks.push({ x: px, y: py, w, h, c: d.color, tall: tall && rng() > 0.6 });
    }
  });

  // POIs placed inside their district
  const pois = POI_DEFS.map((p) => {
    const k = districts.findIndex((d) => d.key === p.d);
    const d = districts[k];
    let px = d.x;
    let py = d.y;
    for (let t = 0; t < 60; t++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * spread * 0.14 * d.weight;
      const tx = d.x + Math.cos(a) * r;
      const ty = d.y + Math.sin(a) * r;
      if (inDistrict(tx, ty, k)) { px = tx; py = ty; break; }
    }
    return { ...p, x: px, y: py, district: d.name };
  });

  return {
    kind: 'city', seed: seedStr, cityName, CELL, GW, GH,
    cellDistrict, water, districts, roads, blocks, pois,
    spread, center: { x: cx, y: cy },
    inDistrict,
  };
}

export function renderCityBase(ctx, c) {
  const { CELL, GW, GH, cellDistrict, water, districts, roads, blocks } = c;

  ctx.fillStyle = '#0a1120';
  ctx.fillRect(0, 0, WORLD_W, WORLD_H);

  // countryside + water + district tint
  for (let gy = 0; gy < GH; gy++) {
    for (let gx = 0; gx < GW; gx++) {
      const i = gy * GW + gx;
      let fill;
      if (water[i]) fill = '#0d3350';
      else {
        const k = cellDistrict[i];
        if (k < 0) fill = '#16241c';
        else fill = districts[k].color;
      }
      ctx.globalAlpha = water[i] || cellDistrict[i] < 0 ? 1 : 0.16;
      ctx.fillStyle = fill;
      ctx.fillRect(gx * CELL, gy * CELL, CELL + 1, CELL + 1);
    }
  }
  ctx.globalAlpha = 1;

  // district borders
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  for (let gy = 1; gy < GH - 1; gy++) {
    for (let gx = 1; gx < GW - 1; gx++) {
      const k = cellDistrict[gy * GW + gx];
      if (k < 0) continue;
      if (cellDistrict[gy * GW + gx + 1] !== k) { ctx.moveTo((gx + 1) * CELL, gy * CELL); ctx.lineTo((gx + 1) * CELL, (gy + 1) * CELL); }
      if (cellDistrict[(gy + 1) * GW + gx] !== k) { ctx.moveTo(gx * CELL, (gy + 1) * CELL); ctx.lineTo((gx + 1) * CELL, (gy + 1) * CELL); }
    }
  }
  ctx.strokeStyle = 'rgba(226,232,240,0.30)';
  ctx.stroke();

  // streets
  ctx.strokeStyle = 'rgba(203,213,225,0.20)';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  for (const s of roads.streets) { ctx.moveTo(s.x1, s.y1); ctx.lineTo(s.x2, s.y2); }
  ctx.stroke();

  // buildings
  for (const b of blocks) {
    ctx.fillStyle = b.c;
    ctx.globalAlpha = b.tall ? 0.85 : 0.5;
    ctx.fillRect(b.x, b.y, b.w, b.h);
  }
  ctx.globalAlpha = 1;

  // ring road
  ctx.strokeStyle = 'rgba(250,204,21,0.55)';
  ctx.lineWidth = 5;
  ctx.beginPath();
  roads.ring.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
  ctx.closePath();
  ctx.stroke();

  // arterials
  ctx.strokeStyle = 'rgba(248,250,252,0.42)';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  for (const a of roads.arterials) { ctx.moveTo(a.x1, a.y1); ctx.lineTo(a.x2, a.y2); }
  ctx.stroke();
  ctx.strokeStyle = 'rgba(15,23,42,0.5)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  for (const a of roads.arterials) { ctx.moveTo(a.x1, a.y1); ctx.lineTo(a.x2, a.y2); }
  ctx.stroke();
}

/* ------------------------------------------------- MEMBER PLACEMENT */

export function placeMembers(city, madeList, sickList) {
  const rng = mulberry32(seedFromString(`${city.seed}::members::${city.cityName}`));
  const out = [];

  for (const p of madeList) {
    const k = city.districts.findIndex((d) => d.name === p.district);
    const d = city.districts[k >= 0 ? k : 0];
    let x = d.x;
    let y = d.y;
    for (let t = 0; t < 50; t++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * city.spread * 0.13 * d.weight;
      const tx = d.x + Math.cos(a) * r;
      const ty = d.y + Math.sin(a) * r;
      if (city.inDistrict(tx, ty, k >= 0 ? k : 0)) { x = tx; y = ty; break; }
    }
    out.push({
      kind: 'made', x, y,
      label: p.alias,
      card: `${p.card}${p.suit === 'spades' ? '♠' : p.suit === 'hearts' ? '♥' : p.suit === 'clubs' ? '♣' : '♦'}`,
      color: '#D4AF37',
      data: p,
    });
  }

  // Sick 52 cells hide in the margins: countryside, harbour and Trolley edges.
  const edgeDistricts = ['harbour', 'trolley', 'oldquarter', 'university'];
  for (const s of sickList) {
    const dk = edgeDistricts[Math.floor(rng() * edgeDistricts.length)];
    const k = city.districts.findIndex((d) => d.key === dk);
    const d = city.districts[k];
    const a = rng() * Math.PI * 2;
    const r = city.spread * (0.17 + rng() * 0.09) * d.weight;
    out.push({
      kind: 'sick', x: d.x + Math.cos(a) * r, y: d.y + Math.sin(a) * r,
      label: s.name, card: s.cardLabel || '', color: '#DC2626', data: s,
    });
  }

  return out;
}
