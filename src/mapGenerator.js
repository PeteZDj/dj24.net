// =====================================================================
// PLANET ONGAKU — PROCEDURAL WORLD & CITY GENERATOR (v2)
//
// Planet is a raster terrain engine: a continuous elevation field with
// hillshading, latitude-driven climate bands (ice, tundra, taiga, forest,
// grassland, savanna, desert), rivers traced by steepest descent, and three
// cartographic styles (Satellite / Map / Terrain).
//
// City is fully vector so it stays crisp at any zoom: organic district
// polygons, a five-tier road hierarchy drawn with casings, parks, woodland,
// rivers, coastline and per-block building footprints.
//
// Everything is seeded: the same seed always rebuilds the same world.
// Design notes: docs/PLANET-ONGAKU-WORLD-BIBLE.md
// =====================================================================

export const WORLD_W = 4096;
export const WORLD_H = 2560;

// Sea level in normalised height units. Everything keys off this.
const SEA = 0.0;

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
  const a = ['NEON', 'BASS', 'ECHO', 'DUSK', 'IRON', 'GOLD', 'VOID', 'RIFT', 'HAZE', 'CROWN', 'STATIC', 'VELVET', 'AMBER', 'ONYX'];
  const b = ['GRID', 'DROP', 'CITY', 'WIRE', 'TIDE', 'SPIRE', 'CHORD', 'REIGN', 'PULSE', 'BLOCK', 'DELTA', 'REACH'];
  const r = Math.floor(Math.random() * 9000) + 1000;
  return `${a[Math.floor(Math.random() * a.length)]}-${b[Math.floor(Math.random() * b.length)]}-${r}`;
}

/* -------------------------------------------------------------- NOISE */

export function makeNoise(rng) {
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
  const at = (ix, iy) => grad[(perm[ix & 255] + (iy & 255)) & 255];

  return function noise2(x, y) {
    const x0 = Math.floor(x);
    const y0 = Math.floor(y);
    const fx = fade(x - x0);
    const fy = fade(y - y0);
    const a = at(x0, y0);
    const b = at(x0 + 1, y0);
    const c = at(x0, y0 + 1);
    const d = at(x0 + 1, y0 + 1);
    const top = a + (b - a) * fx;
    const bot = c + (d - c) * fx;
    return top + (bot - top) * fy;
  };
}

// Ridged noise gives mountain chains rather than rolling blobs.
function ridge(noise, x, y) {
  return 1 - Math.abs(noise(x, y)) * 2;
}

const BASE_FX = 4.0;
const BASE_FY = 2.7;
const GAIN = 0.5;

function baseOctaves(noise, nx, ny, octaves) {
  let amp = 1;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += noise(nx * BASE_FX * freq, ny * BASE_FY * freq) * amp;
    norm += amp;
    amp *= GAIN;
    freq *= 2;
  }
  return sum / norm;
}

// Octaves beyond what the field grid stores. Adds coastline crinkle and
// surface texture when the viewport is re-rendered at high zoom.
function detailOctaves(noise, nx, ny, from, to) {
  let sum = 0;
  let amp = Math.pow(GAIN, from);
  let freq = Math.pow(2, from);
  for (let i = from; i < to; i++) {
    sum += noise(nx * BASE_FX * freq, ny * BASE_FY * freq) * amp;
    amp *= GAIN;
    freq *= 2;
  }
  return sum;
}

const FIELD_OCT = 7;

// Detail added per-pixel beyond the stored field. Kept small: it is surface
// texture and coastline crinkle, not landform.
const DETAIL_AMP = 0.55;

/* ------------------------------------------------------- PALETTES */

// [r,g,b] triples. Kept as arrays so hillshade can multiply them cheaply.
const PALETTES = {
  satellite: {
    abyss: [6, 20, 40], ocean: [12, 48, 84], shelf: [22, 88, 134], surf: [46, 130, 168],
    beach: [214, 199, 156], desert: [212, 179, 118], dune: [226, 199, 143],
    scrub: [166, 154, 102], savanna: [168, 155, 84], grass: [122, 148, 69],
    steppe: [154, 152, 96], woodland: [95, 127, 62], forest: [63, 102, 51],
    jungle: [44, 82, 40], taiga: [58, 91, 69], tundra: [138, 141, 120],
    ice: [230, 238, 242], rock: [125, 115, 100], snow: [240, 244, 247],
    shadeMin: 0.55, shadeMax: 1.35, jitter: 1, shore: [236, 226, 196], water: '#0d3459', deepWater: '#06142a',
    river: '#2a7fb8', road: '#fbe9bd', roadCase: 'rgba(14,11,6,.82)',
    label: '#ffffff', labelGeo: '#e6eefa', labelWater: 'rgba(179,214,255,.92)', labelHalo: 'rgba(4,10,20,.92)', ui: '#f8fafc',
    urban: 'rgba(158,150,138,.74)', urbanCore: 'rgba(216,207,191,.62)',
    urbanCoreFade: 'rgba(216,207,191,0)',
    urbanEdge: 'rgba(64,58,48,.55)', block: 'rgba(208,200,186,.66)', quay: '#8d8579',
    apron: 'rgba(120,118,112,.55)', runway: '#4a4844', runwayMark: 'rgba(255,255,255,.7)',
    track: '#3f3d3a', infield: 'rgba(96,116,74,.5)',
    wall: 'rgba(112,104,92,.95)', wallEvil: 'rgba(24,10,14,.95)',
    field: 'rgba(150,168,96,.5)', fieldLine: 'rgba(96,110,60,.45)', ruralRoof: 'rgba(196,188,172,.95)', farmTrack: 'rgba(150,138,116,.75)',
  },
  // Deliberately flat: land is one cream, vegetation one green, water one
  // blue. Biome nuance is the Terrain style's job — this is the layer you
  // switch to when you want roads, districts and labels to carry the map.
  map: {
    abyss: [164, 201, 228], ocean: [170, 205, 231], shelf: [178, 211, 235], surf: [186, 217, 239],
    // Flat, but not featureless. A game atlas differentiates farmland from
    // scrub from desert with a handful of clearly separated fills; the old
    // palette collapsed all four into the same cream and left the continent
    // looking bleached.
    beach: [239, 228, 199], desert: [240, 226, 191], dune: [244, 232, 200],
    scrub: [235, 230, 202], savanna: [231, 229, 196], grass: [219, 232, 200],
    steppe: [232, 229, 210], woodland: [203, 225, 187], forest: [182, 212, 166],
    jungle: [166, 202, 152], taiga: [204, 224, 199], tundra: [240, 241, 236],
    ice: [253, 254, 255], rock: [232, 228, 220], snow: [255, 255, 255],
    shadeMin: 0.99, shadeMax: 1.01, jitter: 0.22, shore: [126, 158, 182], water: '#aacde7', deepWater: '#9ac2e0',
    river: '#8fbfe0', road: '#ffffff', roadCase: '#39424f',
    label: '#3c4043', labelGeo: '#6f7276', labelWater: '#7ba7cc', labelHalo: 'rgba(255,255,255,.95)', ui: '#202124',
    urban: 'rgba(233,229,223,.95)', urbanCore: 'rgba(223,218,210,.75)',
    urbanCoreFade: 'rgba(223,218,210,0)',
    urbanEdge: 'rgba(203,197,188,.9)', block: 'rgba(214,208,199,.85)', quay: '#cfc8bd',
    apron: '#e3e0d8', runway: '#b9b4a9', runwayMark: 'rgba(255,255,255,.85)',
    track: '#9c968b', infield: '#dce7cd',
    wall: '#9a9188', wallEvil: '#3b1f26',
    field: '#dfe7c4', fieldLine: 'rgba(150,166,118,.55)', ruralRoof: '#cdc6b8', farmTrack: '#c9c1ae',
  },
  terrain: {
    abyss: [120, 168, 200], ocean: [141, 186, 214], shelf: [163, 202, 226], surf: [182, 216, 236],
    beach: [232, 222, 188], desert: [226, 205, 156], dune: [235, 219, 176],
    scrub: [212, 205, 158], savanna: [206, 200, 140], grass: [176, 197, 137],
    steppe: [200, 199, 150], woodland: [150, 180, 122], forest: [122, 158, 106],
    jungle: [104, 143, 96], taiga: [146, 174, 140], tundra: [206, 203, 186],
    ice: [246, 250, 252], rock: [188, 173, 150], snow: [252, 252, 252],
    shadeMin: 0.7, shadeMax: 1.22, jitter: 0.8, shore: [140, 164, 178], water: '#8dbad6', deepWater: '#78a8c8',
    river: '#5a9ec4', road: '#ffffff', roadCase: '#6d6555',
    label: '#33413d', labelGeo: '#4a5a54', labelWater: '#5d92b5', labelHalo: 'rgba(255,255,255,.92)', ui: '#1f2937',
    urban: 'rgba(208,200,188,.85)', urbanCore: 'rgba(196,187,173,.6)',
    urbanCoreFade: 'rgba(196,187,173,0)',
    urbanEdge: 'rgba(156,146,130,.8)', block: 'rgba(188,179,165,.75)', quay: '#b3a894',
    apron: 'rgba(190,182,166,.7)', runway: '#8c857a', runwayMark: 'rgba(255,255,255,.75)',
    track: '#7b736a', infield: 'rgba(150,175,120,.55)',
    wall: 'rgba(126,116,102,.95)', wallEvil: 'rgba(48,22,28,.95)',
    field: 'rgba(186,198,140,.6)', fieldLine: 'rgba(130,146,90,.5)', ruralRoof: 'rgba(200,190,170,.95)', farmTrack: 'rgba(160,148,126,.8)',
  },
};

export const MAP_STYLES = [
  { key: 'satellite', label: 'Satellite' },
  { key: 'map', label: 'Map' },
  { key: 'terrain', label: 'Terrain' },
];

export function palette(style) {
  return PALETTES[style] || PALETTES.satellite;
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
  { name: 'Cloud City', kind: 'mega', faction: 'neutral', desc: 'Sky-high electronic paradise built along the ridgelines.' },
  { name: 'Hall of Laughter', kind: 'hostile', faction: 'komedian', desc: 'Komedian territory. Reality is unreliable here.' },
  { name: 'Joke City', kind: 'hostile', faction: 'komedian', desc: 'Absurdist reality zone.' },
  { name: 'Clown Country', kind: 'hostile', faction: 'komedian', desc: 'Comedic chaos realm.' },
  { name: 'Skyport 9', kind: 'military', faction: 'military', desc: 'Aero Command station. Siege site.' },
  { name: 'Trolley', kind: 'fortress', faction: 'military', desc: 'Fortress installation. The defence grid.' },
  { name: 'Port Sonora', kind: 'port', faction: 'mafia', desc: 'Shipping and smuggling. Clubs house routes run through here.' },
  { name: 'Vantage Bay', kind: 'port', faction: 'neutral', desc: 'Coastal town. Quiet, and everybody likes it that way.' },
  { name: 'Kade Valley', kind: 'town', faction: 'mafia', desc: 'Farming region funded by the Kade Community Trust.' },
  { name: 'Northreach', kind: 'town', faction: 'neutral', desc: 'Cold northern outpost. Mining and long silences.' },
  { name: 'Ashfall', kind: 'town', faction: 'neutral', desc: 'Desert refinery town. Nobody moves here on purpose.' },
  { name: 'Meridian Falls', kind: 'town', faction: 'council', desc: 'River town built where three valleys meet.' },
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

export const BIOME_LEGEND = [
  { key: 'ocean', label: 'Ocean & shelf' },
  { key: 'beach', label: 'Coast' },
  { key: 'desert', label: 'Desert' },
  { key: 'savanna', label: 'Savanna & scrub' },
  { key: 'grass', label: 'Grassland' },
  { key: 'woodland', label: 'Woodland' },
  { key: 'forest', label: 'Forest' },
  { key: 'jungle', label: 'Rainforest' },
  { key: 'taiga', label: 'Taiga' },
  { key: 'tundra', label: 'Tundra' },
  { key: 'rock', label: 'Mountains' },
  { key: 'snow', label: 'Snow & ice' },
];

const FIELD_GW = 1536;
const FIELD_GH = 960;

// A named sub-stream of the world seed. Phases that use one are insulated
// from every other phase's draw count.
function stream(seedStr, name) {
  return mulberry32(seedFromString(`${seedStr}::${name}`));
}

export function generatePlanet(seedStr) {
  const seed = seedFromString(seedStr);
  const rng = mulberry32(seed);
  const nH = makeNoise(rng);
  const nR = makeNoise(rng);
  const nM = makeNoise(rng);
  const nW = makeNoise(rng);

  const GW = FIELD_GW;
  const GH = FIELD_GH;
  const hf = new Float32Array(GW * GH);
  const mf = new Float32Array(GW * GH);

  // Domain warp offsets. Warping the sample coordinates before evaluating the
  // height field is what stops continents looking like noise blobs — it gives
  // the sinuous peninsulas, bays and mountain arcs real coastlines have.
  const warpA = rng() * 100;
  const warpB = rng() * 100;

  let minH = Infinity;
  let maxH = -Infinity;

  for (let gy = 0; gy < GH; gy++) {
    const ny = gy / (GH - 1);
    for (let gx = 0; gx < GW; gx++) {
      const nx = gx / (GW - 1);
      const i = gy * GW + gx;

      const wx = nx + nW(nx * 2.6 + warpA, ny * 2.6) * 0.16;
      const wy = ny + nW(nx * 2.6, ny * 2.6 + warpB) * 0.16;

      let h = baseOctaves(nH, wx, wy, FIELD_OCT);

      // Ridged component, masked to ground that is already high, builds
      // mountain chains along the continental spines instead of everywhere.
      // Saturating mask: once a sample is comfortably inland the ridge shape
      // itself drives the height, which is what produces chains and valleys
      // rather than one broad dome per landmass.
      const mask = Math.min(1, Math.max(0, (h + 0.04) * 4.5));
      // Frequencies are stretched in x so ranges run as long chains rather
      // than clustering into round massifs.
      const r = ridge(nR, wx * 6.5, wy * 2.4) * 0.55
        + ridge(nR, wx * 13.0, wy * 5.0) * 0.24
        + ridge(nR, wx * 26.0, wy * 10.0) * 0.11;
      h += mask * Math.max(0, r) * 0.60;

      // Frame falloff keeps the atlas from clipping land at the border, but
      // noisy so the edge of the map is not a visible oval.
      const dx = (nx - 0.5) * 2;
      const dy = (ny - 0.5) * 2;
      const edge = Math.sqrt(dx * dx * 0.82 + dy * dy * 1.02) + nW(nx * 3, ny * 3 + 40) * 0.08;
      h -= Math.max(0, edge - 0.66) * 2.2;
      h += 0.012;

      hf[i] = h;
      if (h < minH) minH = h;
      if (h > maxH) maxH = h;

      // Moisture: noise, plus a dry subtropical belt and a wet equator, so
      // deserts, savanna and rainforest land in plausible latitude bands.
      const lat = Math.abs(ny - 0.5) * 2;
      const dryBelt = Math.exp(-Math.pow((lat - 0.40) / 0.17, 2));
      const wetEq = Math.exp(-Math.pow(lat / 0.22, 2));
      let m = baseOctaves(nM, wx * 1.9, wy * 1.9, 4) * 0.6 + 0.5;
      m = m * 0.72 + 0.15 + wetEq * 0.28 - dryBelt * 0.36;
      mf[i] = Math.max(0, Math.min(1, m));
    }
  }

  // Normalise so land runs 0..1 above sea level and ocean runs -1..0 below it.
  // Every downstream threshold (snow line, tree line, shelf depth) can then be
  // written as a plain fraction instead of a magic number.
  const upScale = 1 / Math.max(1e-6, maxH - SEA);
  const downScale = 1 / Math.max(1e-6, SEA - minH);
  for (let i = 0; i < hf.length; i++) {
    // The exponent biases land toward lowland, so high ground is confined to
    // ridgelines instead of spreading into continent-sized snow plateaus.
    hf[i] = hf[i] > SEA ? Math.pow((hf[i] - SEA) * upScale, 1.7) : (hf[i] - SEA) * downScale;
  }

  const hAt = (gx, gy) => hf[Math.max(0, Math.min(GH - 1, gy)) * GW + Math.max(0, Math.min(GW - 1, gx))];

  // ---- rivers: steepest descent from high ground to the sea ----
  const rivers = [];
  const lakes = [];
  for (let attempt = 0; attempt < 900 && rivers.length < 46; attempt++) {
    const sx = 4 + Math.floor(rng() * (GW - 8));
    const sy = 4 + Math.floor(rng() * (GH - 8));
    if (hAt(sx, sy) < 0.20) continue;

    const path = [];
    let cx = sx;
    let cy = sy;
    let guard = 0;
    while (guard++ < 900) {
      path.push({ x: (cx / (GW - 1)) * WORLD_W, y: (cy / (GH - 1)) * WORLD_H });
      const here = hAt(cx, cy);
      if (here <= SEA) break;
      let bx = cx;
      let by = cy;
      let bh = here;
      for (let oy = -1; oy <= 1; oy++) {
        for (let ox = -1; ox <= 1; ox++) {
          if (!ox && !oy) continue;
          // Small noise nudge stops rivers running in straight diagonals.
          const hv = hAt(cx + ox, cy + oy) + nW(cx * 0.4 + ox, cy * 0.4 + oy) * 0.004;
          if (hv < bh) { bh = hv; bx = cx + ox; by = cy + oy; }
        }
      }
      if (bx === cx && by === cy) {
        if (path.length > 14) lakes.push({ x: path[path.length - 1].x, y: path[path.length - 1].y, r: 6 + rng() * 14 });
        break;
      }
      cx = bx;
      cy = by;
    }
    if (path.length > 26) rivers.push(path);
  }

  // ---- city placement ----
  const isLandG = (gx, gy) => hAt(gx, gy) > SEA + 0.004;
  const isCoastG = (gx, gy) => {
    if (!isLandG(gx, gy)) return false;
    for (let d = 2; d <= 5; d++) {
      if (!isLandG(gx + d, gy) || !isLandG(gx - d, gy) || !isLandG(gx, gy + d) || !isLandG(gx, gy - d)) return true;
    }
    return false;
  };

  const cities = [];
  const minDist = 230;
  for (const spec of CANON_CITIES) {
    const wantsCoast = ['port', 'capital', 'mega'].includes(spec.kind);
    let best = null;
    let bestScore = -Infinity;
    for (let tries = 0; tries < 2500; tries++) {
      const gx = 8 + Math.floor(rng() * (GW - 16));
      const gy = 8 + Math.floor(rng() * (GH - 16));
      if (!isLandG(gx, gy)) continue;
      const h = hAt(gx, gy);
      if (h > 0.44) continue;
      const px = (gx / (GW - 1)) * WORLD_W;
      const py = (gy / (GH - 1)) * WORLD_H;
      let ok = true;
      for (const c of cities) {
        if (Math.hypot(c.x - px, c.y - py) < minDist) { ok = false; break; }
      }
      if (!ok) continue;

      let score = rng() * 0.4;
      if (wantsCoast && isCoastG(gx, gy)) score += 3;
      if (spec.name === 'Cloud City' && h > 0.30) score += 2.5;
      if (spec.name === 'Northreach' && gy < GH * 0.22) score += 2.5;
      if (spec.name === 'Ashfall' && mf[gy * GW + gx] < 0.30) score += 2.5;
      if (spec.kind === 'town' && !isCoastG(gx, gy)) score += 0.8;
      if (score > bestScore) { bestScore = score; best = { px, py, gx, gy, h }; }
      if (bestScore > 3) break;
    }
    if (best) {
      const lat = Math.abs(best.gy / (GH - 1) - 0.5) * 2;
      const moist = mf[best.gy * GW + best.gx];
      cities.push({
        ...spec,
        x: best.px,
        y: best.py,
        elev: Math.round(best.h * 4200),
        climate: climateOf(lat, moist, best.h),
        pop: Math.round((spec.kind === 'capital' ? 18 : spec.kind === 'mega' ? 9 : 2) * (0.7 + rng() * 0.7) * 1000000),
      });
    }
  }

  // ---- villages and outposts ----
  //
  // The canon settlements are the ones stories happen in. Between them the
  // planet needs somewhere for everyone else to live, or the countryside reads
  // as empty scenery with motorways drawn across it.
  const rngMinor = stream(seedStr, 'minor');
  const planet0 = { GW, GH, hf, cities };
  const usedPlaceNames = new Set(cities.map((c) => c.name));
  const minorAt = (kind, minGap, tries, test) => {
    for (let t = 0; t < tries; t++) {
      const gx = 6 + Math.floor(rngMinor() * (GW - 12));
      const gy = 6 + Math.floor(rngMinor() * (GH - 12));
      if (!isLandG(gx, gy)) continue;
      const h = hAt(gx, gy);
      if (test && !test(gx, gy, h)) continue;
      const px = (gx / (GW - 1)) * WORLD_W;
      const py = (gy / (GH - 1)) * WORLD_H;
      if (cities.some((c) => Math.hypot(c.x - px, c.y - py) < (c.kind === 'village' || c.kind === 'outpost' ? minGap : minGap * 1.7))) continue;
      const lat = Math.abs(gy / (GH - 1) - 0.5) * 2;
      const moist = mf[gy * GW + gx];
      const coastal = isCoastG(gx, gy);
      const purpose = pickPurpose(rngMinor, kind, h, moist, coastal);
      // Two villages with the same name is the sort of thing that reads as a bug
      // even on a planet with ninety settlements, so re-roll until it is unique.
      let name = '';
      for (let n = 0; n < 24; n++) {
        name = `${makeName(rngMinor)} ${purpose.suffix[(rngMinor() * purpose.suffix.length) | 0]}`;
        if (!usedPlaceNames.has(name)) break;
      }
      if (usedPlaceNames.has(name)) continue;
      usedPlaceNames.add(name);
      return {
        name,
        kind,
        faction: 'neutral',
        purpose,
        desc: purpose.blurb,
        x: px, y: py,
        elev: Math.round(h * 4200),
        climate: climateOf(lat, moist, h),
        pop: Math.round((kind === 'village' ? 2600 : 140) * (0.4 + rngMinor() * 1.5)),
      };
    }
    return null;
  };

  for (let i = 0; i < 46; i++) {
    // Every third village wants the coast. Left to chance, a random land point
    // is almost never on a shoreline and the planet ends up with no fishing.
    const wantCoast = i % 3 === 0;
    const v = minorAt('village', 68, 500, (gx, gy, h) => h < 0.36 && (!wantCoast || isCoastG(gx, gy)));
    if (v) cities.push(v);
  }
  for (const k of buildCastles(planet0, stream(seedStr, 'castles'), hAt, (gx, gy) => mf[gy * GW + gx])) {
    if (usedPlaceNames.has(k.name)) continue;
    usedPlaceNames.add(k.name);
    cities.push(k);
  }

  for (let i = 0; i < 26; i++) {
    // Outposts go where nobody would put a village and no road already goes:
    // high ground, deserts, and a long way inland. That is what makes them
    // outposts rather than suburbs.
    const o = minorAt('outpost', 50, 700, (gx, gy, h) => {
      if (!(h > 0.34 || mf[gy * GW + gx] < 0.26)) return false;
      for (let d = 3; d <= 9; d += 3) {
        if (!isLandG(gx + d, gy) || !isLandG(gx - d, gy) || !isLandG(gx, gy + d) || !isLandG(gx, gy - d)) return false;
      }
      return true;
    });
    if (o) cities.push(o);
  }

  const planet = {
    kind: 'planet', seed: seedStr, GW, GH, hf, mf,
    noiseH: nH, noiseR: nR,
    cities, rivers, lakes,
  };

  // Roads are routed over the finished terrain, then the cities are grown
  // around the bearings those roads arrive on, so highways run into the
  // street network instead of stopping at a marker.
  const net = generateRoadNetwork(planet);
  planet.routes = net.routes;
  buildFootprints(planet, seedStr, nW, net.bearings);
  planet.circuits = buildCircuits(planet, stream(seedStr, 'circuits'), nW);
  finishRoadNetwork(planet);
  planet.cells = buildCells(planet, stream(seedStr, 'cells'));
  planet.rural = buildCountryside(planet, stream(seedStr, 'rural'));
  planet.regions = detectRegions(planet, seedStr);
  planet.corpSites = buildCorpSites(planet, stream(seedStr, 'corps'));

  return planet;
}

// Nowhere exists for no reason. Every village and outpost gets the thing that
// put it there, and that reason drives its name, its description and the one
// facility on its map — which is usually the only building anyone visits.
//
// `needs` gates placement against the terrain: a fishing village on a desert
// plateau is the kind of detail that makes a generated world feel fake.
const SETTLEMENT_PURPOSE = [
  { key: 'mine', tier: 'outpost', w: 3.2, label: 'Mine', site: 'Mine', operator: 'The Tower Group', icon: '⛏️',
    suffix: ['Shaft', 'Seam', 'Workings', 'Cut', 'Lode'],
    blurb: 'A working mine. The shaft came first, the huts came after, and nobody pretends otherwise.',
    needs: (h) => h > 0.34 },
  { key: 'quarry', tier: 'outpost', w: 2, label: 'Quarry', site: 'Quarry', operator: 'The Tower Group', icon: '🪨',
    suffix: ['Quarry', 'Pit', 'Face', 'Scar'],
    blurb: 'A stone quarry. Half the motorways on this continent came out of this hole.',
    needs: (h) => h > 0.3 },
  { key: 'geothermal', tier: 'outpost', w: 1, label: 'Geothermal station', site: 'Geothermal Station', operator: 'Onoska Energy', icon: '⚡',
    suffix: ['Vent', 'Station', 'Wells', 'Field'],
    blurb: 'A geothermal tap feeding the grid. Three engineers, one road, and a fence nobody argues with.',
    needs: (h) => h > 0.36 },
  { key: 'relay', tier: 'outpost', w: 0.7, label: 'Relay mast', site: 'Relay', operator: 'The Tower Group', icon: '📶',
    suffix: ['Relay', 'Signal', 'Mast', 'Repeater'],
    blurb: 'A Frequency Grid relay. On a clear night you can hear it in your fillings.',
    needs: (h) => h > 0.33 },
  { key: 'salt', tier: 'outpost', w: 1.4, label: 'Salt works', site: 'Salt Works', operator: 'The Tower Group', icon: '🧂',
    suffix: ['Flats', 'Pans', 'Works'],
    blurb: 'Salt pans. Nothing grows, nothing rots, and everything tastes of it.',
    needs: (h, moist) => moist < 0.24 },
  { key: 'refuel', tier: 'outpost', w: 0.6, label: 'Fuel stop', site: 'Fuel Stop', operator: 'SkyOngaku', icon: '⛽',
    suffix: ['Halt', 'Stop', 'Waypoint', 'Crossing'],
    blurb: 'Fuel, a canteen and somewhere to sleep. It exists because the next one is four hours away.',
    needs: () => true },
  { key: 'watch', tier: 'outpost', w: 0.6, label: 'Border post', site: 'Border Post', operator: null, icon: '🛡️',
    suffix: ['Watch', 'Post', 'Lookout', 'Gate'],
    blurb: 'A border post. Officially a customs point, and everybody knows what that means.',
    needs: (h) => h > 0.3 },
  { key: 'research', tier: 'outpost', w: 0.6, label: 'Research station', site: 'Field Station', operator: 'NexaGen Harmonics', icon: '🔬',
    suffix: ['Station', 'Field Post', 'Observatory'],
    blurb: 'A NexaGen field station. The published work is about acoustics. So is the unpublished work.',
    needs: () => true },

  { key: 'fishing', tier: 'village', w: 1, label: 'Fishing village', site: 'Quay', operator: null, icon: '🐟',
    suffix: ['Quay', 'Landing', 'Cove', 'Strand', 'Haven'],
    blurb: 'A fishing village. The boats go out before the road wakes up.',
    needs: (h, moist, coastal) => coastal },
  { key: 'lake', tier: 'village', w: 1, label: 'Lake village', site: 'Boathouse', operator: null, icon: '🛶',
    suffix: ['Mere', 'Water', 'Shore', 'Reach'],
    blurb: 'Built along the water on stilts and stubbornness. Everything arrives by boat.',
    needs: (h, moist) => moist > 0.6 },
  { key: 'farming', tier: 'village', w: 1, label: 'Farming village', site: 'Grain Store', operator: null, icon: '🌾',
    suffix: ['Fields', 'Furlong', 'Grange', 'Barrow', 'Green'],
    blurb: 'Farmland and a grain store. The whole village turns out for harvest and for funerals.',
    needs: (h, moist) => moist > 0.32 && h < 0.3 },
  { key: 'mill', tier: 'village', w: 1, label: 'Mill village', site: 'Mill', operator: null, icon: '🏭',
    suffix: ['Mill', 'Wheel', 'Race', 'Ford'],
    blurb: 'A mill, a bridge and the houses that grew around them, in that order.',
    needs: (h, moist) => moist > 0.4 },
  { key: 'orchard', tier: 'village', w: 1, label: 'Orchard village', site: 'Cider Press', operator: null, icon: '🍏',
    suffix: ['Orchard', 'Grove', 'Vale', 'Combe'],
    blurb: 'Orchards on the terraces. The cider is the only export anybody cares about.',
    needs: (h, moist) => moist > 0.45 },
  { key: 'market', tier: 'village', w: 0.3, label: 'Market village', site: 'Market Cross', operator: null, icon: '🛒',
    suffix: ['Cross', 'Market', 'Bridge', 'Bend'],
    blurb: 'A market village on a junction. Busy one day a week and asleep the other six.',
    needs: () => true },
  { key: 'timber', tier: 'village', w: 1, label: 'Logging village', site: 'Sawmill', operator: 'Bastion Grade', icon: '🪵',
    suffix: ['Cut', 'Stand', 'Hollow', 'Camp'],
    blurb: 'A logging camp that stopped being temporary about sixty years ago.',
    needs: (h, moist) => moist > 0.55 },
];

function pickPurpose(rng, tier, h, moist, coastal) {
  const pool = SETTLEMENT_PURPOSE.filter((p) => p.tier === tier && p.needs(h, moist, coastal));
  const use = pool.length ? pool : SETTLEMENT_PURPOSE.filter((p) => p.tier === tier);
  // Weighted, because the catch-all reasons (a market, a fuel stop) would
  // otherwise be half the planet.
  let total = 0;
  for (const p of use) total += p.w;
  let r = rng() * total;
  for (const p of use) { r -= p.w; if (r <= 0) return p; }
  return use[use.length - 1];
}

/* ------------------------------------------------- NAMED GEOGRAPHY */

// The landmasses have names in the world bible, so they are not left to the
// name generator. Largest first.
export const CANON_CONTINENTS = ['Yunkai', 'Belkai', 'Ongara', 'Vantessa', 'Karuun'];

const NAME_PARTS = {
  a: ['Ka', 'Ono', 'Sel', 'Var', 'Mor', 'Tan', 'Ish', 'Bel', 'Dro', 'Yun', 'Ashe', 'Kor', 'Vel', 'Ryo', 'Ambe', 'Sura'],
  b: ['van', 'dara', 'mere', 'thal', 'ora', 'ska', 'gun', 'ratu', 'lune', 'sei', 'wari', 'nova', 'kai', 'dun'],
};

function makeName(rng) {
  const a = NAME_PARTS.a[Math.floor(rng() * NAME_PARTS.a.length)];
  const b = NAME_PARTS.b[Math.floor(rng() * NAME_PARTS.b.length)];
  return a + b;
}

// Multi-source BFS inward from the edge of a component; the last cell reached
// is the one furthest from any boundary, which is where a label belongs.
function interiorPoint(cells, test, CW, CH) {
  const member = new Set(cells);
  let frontier = [];
  for (const n of cells) {
    const nx = n % CW;
    const ny = (n / CW) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const ax = nx + dx;
      const ay = ny + dy;
      if (ax < 0 || ay < 0 || ax >= CW || ay >= CH || !test(ax, ay)) { frontier.push(n); break; }
    }
  }
  if (!frontier.length) return cells[(cells.length / 2) | 0];

  const visited = new Set(frontier);
  let last = frontier[0];
  while (frontier.length) {
    const next = [];
    for (const n of frontier) {
      last = n;
      const nx = n % CW;
      const ny = (n / CW) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const ax = nx + dx;
        const ay = ny + dy;
        if (ax < 0 || ay < 0 || ax >= CW || ay >= CH) continue;
        const ai = ay * CW + ax;
        if (visited.has(ai) || !member.has(ai)) continue;
        visited.add(ai);
        next.push(ai);
      }
    }
    frontier = next;
  }
  return last;
}

// Flood fill over a coarse grid to find the map's real features, so the atlas
// can name what it actually generated rather than sprinkling labels at random.
function detectRegions(planet, seedStr) {
  const { GW, GH, hf, mf } = planet;
  const CW = 256;
  const CH = 160;
  const at = (x, y) => {
    const gx = Math.min(GW - 1, Math.round((x / (CW - 1)) * (GW - 1)));
    const gy = Math.min(GH - 1, Math.round((y / (CH - 1)) * (GH - 1)));
    return gy * GW + gx;
  };

  const toWorld = (x, y) => ({ x: (x / (CW - 1)) * WORLD_W, y: (y / (CH - 1)) * WORLD_H });

  function components(test, minSize) {
    const seen = new Uint8Array(CW * CH);
    const found = [];
    const stack = [];
    for (let y = 0; y < CH; y++) {
      for (let x = 0; x < CW; x++) {
        const i = y * CW + x;
        if (seen[i] || !test(x, y)) continue;
        stack.length = 0;
        stack.push(i);
        seen[i] = 1;
        const cells = [];
        while (stack.length) {
          const n = stack.pop();
          const nx = n % CW;
          const ny = (n / CW) | 0;
          cells.push(n);
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const ax = nx + dx;
            const ay = ny + dy;
            if (ax < 0 || ay < 0 || ax >= CW || ay >= CH) continue;
            const ai = ay * CW + ax;
            if (seen[ai] || !test(ax, ay)) continue;
            seen[ai] = 1;
            stack.push(ai);
          }
        }
        if (cells.length >= minSize) {
          // Anchor at the most interior cell, not the centroid: an ocean that
          // wraps around a continent has its centroid on dry land.
          const anchor = interiorPoint(cells, test, CW, CH);
          const c = toWorld(anchor % CW, (anchor / CW) | 0);
          // The extent lets the label engine re-anchor the name inside the
          // visible part of the feature once the centroid pans off screen.
          let bx0 = CW;
          let by0 = CH;
          let bx1 = 0;
          let by1 = 0;
          for (const n of cells) {
            const nx = n % CW;
            const ny = (n / CW) | 0;
            if (nx < bx0) bx0 = nx;
            if (nx > bx1) bx1 = nx;
            if (ny < by0) by0 = ny;
            if (ny > by1) by1 = ny;
          }
          const a = toWorld(bx0, by0);
          const b = toWorld(bx1, by1);
          found.push({ x: c.x, y: c.y, size: cells.length, bbox: { x0: a.x, y0: a.y, x1: b.x, y1: b.y } });
        }
      }
    }
    return found.sort((a, b) => b.size - a.size);
  }

  const isLand = (x, y) => hf[at(x, y)] > 0.002;
  const isWater = (x, y) => hf[at(x, y)] <= 0.002;
  const isHigh = (x, y) => hf[at(x, y)] > 0.42;
  const isDry = (x, y) => {
    const i = at(x, y);
    return hf[i] > 0.002 && hf[i] < 0.35 && mf[i] < 0.22;
  };
  const isWood = (x, y) => {
    const i = at(x, y);
    return hf[i] > 0.002 && hf[i] < 0.42 && mf[i] > 0.62;
  };

  // Names are seeded from where the feature is, not from a shared sequence, so
  // a range in the same place keeps its name however much else about the world
  // changes around it.
  const taken = new Set();
  const nameAt = (r, suffix) => {
    for (let salt = 0; salt < 40; salt++) {
      const g = mulberry32(seedFromString(`${seedStr}::geo::${Math.round(r.x)}:${Math.round(r.y)}:${salt}`));
      const n = suffix ? `${makeName(g)} ${suffix}` : makeName(g);
      if (!taken.has(n)) { taken.add(n); return n; }
    }
    return suffix ? `${makeName(mulberry32(r.x | 0))} ${suffix}` : makeName(mulberry32(r.x | 0));
  };

  // Continents are canon, not generated. The main landmass of Planet Ongaku
  // is Yunkai in every world; the smaller ones take the rest of the list in
  // size order and fall back to generated names beyond it.
  const continents = components(isLand, 900).slice(0, 5)
    .map((r, i) => ({ ...r, name: CANON_CONTINENTS[i] || nameAt(r), kind: 'continent' }));
  const oceans = components(isWater, 2600).slice(0, 4)
    .map((r, i) => ({ ...r, name: i === 0 ? `The ${nameAt(r)} Ocean` : `${nameAt(r)} Sea`, kind: 'ocean' }));
  const ranges = components(isHigh, 90).slice(0, 6)
    .map((r) => ({ ...r, name: nameAt(r, 'Range'), kind: 'range' }));
  const deserts = components(isDry, 150).slice(0, 4)
    .map((r) => ({ ...r, name: nameAt(r, 'Desert'), kind: 'desert' }));
  const forests = components(isWood, 220).slice(0, 4)
    .map((r) => ({ ...r, name: nameAt(r, 'Forest'), kind: 'forest' }));

  return [...oceans, ...continents, ...ranges, ...deserts, ...forests];
}

/* ------------------------------------------------- ROAD NETWORK (A*) */

// Routing runs on a coarse grid rather than the full field: 64k nodes is
// plenty to make roads follow terrain, and keeps a whole network under 200ms.
const RGW = 320;
const RGH = 200;

function buildRoutingGrid(planet) {
  const { GW, GH, hf } = planet;
  const h = new Float32Array(RGW * RGH);
  for (let y = 0; y < RGH; y++) {
    const sy = Math.min(GH - 1, Math.round((y / (RGH - 1)) * (GH - 1)));
    for (let x = 0; x < RGW; x++) {
      const sx = Math.min(GW - 1, Math.round((x / (RGW - 1)) * (GW - 1)));
      h[y * RGW + x] = hf[sy * GW + sx];
    }
  }
  return h;
}

// Binary min-heap over (priority, node). Flat arrays because this is the hot
// loop of the whole generator.
function makeHeap() {
  const pri = [];
  const node = [];
  return {
    get size() { return node.length; },
    push(p, n) {
      pri.push(p);
      node.push(n);
      let i = node.length - 1;
      while (i > 0) {
        const par = (i - 1) >> 1;
        if (pri[par] <= pri[i]) break;
        [pri[par], pri[i]] = [pri[i], pri[par]];
        [node[par], node[i]] = [node[i], node[par]];
        i = par;
      }
    },
    pop() {
      const top = node[0];
      const lastP = pri.pop();
      const lastN = node.pop();
      if (node.length) {
        pri[0] = lastP;
        node[0] = lastN;
        let i = 0;
        for (;;) {
          const l = i * 2 + 1;
          const r = l + 1;
          let s = i;
          if (l < node.length && pri[l] < pri[s]) s = l;
          if (r < node.length && pri[r] < pri[s]) s = r;
          if (s === i) break;
          [pri[s], pri[i]] = [pri[i], pri[s]];
          [node[s], node[i]] = [node[i], node[s]];
          i = s;
        }
      }
      return top;
    },
  };
}

const NEIGHBOURS = [
  [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
  [1, 1, 1.414], [1, -1, 1.414], [-1, 1, 1.414], [-1, -1, 1.414],
];

// Cost of entering a cell. Water is passable but very expensive, so a route
// will bridge a narrow strait and refuse to cross an ocean. Slope dominates
// everything else, which is what makes roads seek valleys and passes.
function enterCost(h, used, from, to, diag) {
  const ht = h[to];
  let base = 1;
  if (ht <= 0) base += 260;
  else base += ht * 7;
  // Slope dominates: this is what sends a road up a valley to a pass rather
  // than straight over the ridge. Too high and every route hugs the coast.
  const slope = Math.abs(ht - h[from]) * 560;
  const corridor = used[to] ? 0.42 : 1;
  return (base + slope) * diag * corridor;
}

function aStar(h, used, start, goal) {
  const N = RGW * RGH;
  const g = new Float32Array(N).fill(Infinity);
  const came = new Int32Array(N).fill(-1);
  const closed = new Uint8Array(N);
  const gx = goal % RGW;
  const gy = (goal / RGW) | 0;

  const heap = makeHeap();
  g[start] = 0;
  heap.push(0, start);

  let guard = 0;
  while (heap.size && guard++ < 400000) {
    const cur = heap.pop();
    if (cur === goal) break;
    if (closed[cur]) continue;
    closed[cur] = 1;

    const cx = cur % RGW;
    const cy = (cur / RGW) | 0;
    for (const [dx, dy, dd] of NEIGHBOURS) {
      const nx = cx + dx;
      const ny = cy + dy;
      if (nx < 0 || ny < 0 || nx >= RGW || ny >= RGH) continue;
      const nb = ny * RGW + nx;
      if (closed[nb]) continue;
      const ng = g[cur] + enterCost(h, used, cur, nb, dd);
      if (ng >= g[nb]) continue;
      g[nb] = ng;
      came[nb] = cur;
      // Octile heuristic, scaled by the cheapest possible step.
      const ax = Math.abs(nx - gx);
      const ay = Math.abs(ny - gy);
      const hcost = (ax + ay) + (1.414 - 2) * Math.min(ax, ay);
      heap.push(ng + hcost, nb);
    }
  }

  if (came[goal] < 0 && goal !== start) return null;
  const path = [];
  let n = goal;
  while (n >= 0) {
    path.push(n);
    if (n === start) break;
    n = came[n];
  }
  return path.reverse();
}

// Chaikin corner-cutting: turns the staircase A* returns into a road.
function smoothPath(pts, iterations = 3) {
  let out = pts;
  for (let it = 0; it < iterations; it++) {
    const next = [out[0]];
    for (let i = 0; i < out.length - 1; i++) {
      const a = out[i];
      const b = out[i + 1];
      next.push({ x: a.x * 0.75 + b.x * 0.25, y: a.y * 0.75 + b.y * 0.25 });
      next.push({ x: a.x * 0.25 + b.x * 0.75, y: a.y * 0.25 + b.y * 0.75 });
    }
    next.push(out[out.length - 1]);
    out = next;
  }
  return out;
}

function generateRoadNetwork(planet) {
  const h = buildRoutingGrid(planet);
  const used = new Uint8Array(RGW * RGH);
  const cities = planet.cities;
  const idxOf = (c) => {
    const gx = Math.max(0, Math.min(RGW - 1, Math.round((c.x / WORLD_W) * (RGW - 1))));
    const gy = Math.max(0, Math.min(RGH - 1, Math.round((c.y / WORLD_H) * (RGH - 1))));
    return gy * RGW + gx;
  };
  const toWorld = (n) => ({
    x: ((n % RGW) / (RGW - 1)) * WORLD_W,
    y: (((n / RGW) | 0) / (RGH - 1)) * WORLD_H,
  });

  // Villages and outposts are not part of the trunk network; they hang off it.
  // Building the trunk from the canon settlements only, then feeding the minor
  // ones in, is also what keeps the A* cost down.
  const MAJOR = (c) => c.kind !== 'village' && c.kind !== 'outpost';
  const majors = cities.filter(MAJOR);
  const rank = (c) => (c.kind === 'capital' ? 3 : c.kind === 'mega' ? 2 : 1);

  // Minimum spanning tree guarantees every city is reachable; the extra
  // nearest-neighbour links stop the network being a pure tree.
  const n = majors.length;
  const pairs = new Set();
  const inTree = new Array(n).fill(false);
  const best = new Array(n).fill(Infinity);
  const bestFrom = new Array(n).fill(-1);
  inTree[0] = true;
  for (let i = 1; i < n; i++) {
    best[i] = Math.hypot(cities[i].x - cities[0].x, cities[i].y - cities[0].y);
    bestFrom[i] = 0;
  }
  for (let step = 1; step < n; step++) {
    let pick = -1;
    for (let i = 0; i < n; i++) if (!inTree[i] && (pick < 0 || best[i] < best[pick])) pick = i;
    if (pick < 0) break;
    inTree[pick] = true;
    pairs.add(pick < bestFrom[pick] ? `${pick},${bestFrom[pick]}` : `${bestFrom[pick]},${pick}`);
    for (let i = 0; i < n; i++) {
      if (inTree[i]) continue;
      const d = Math.hypot(majors[i].x - majors[pick].x, majors[i].y - majors[pick].y);
      if (d < best[i]) { best[i] = d; bestFrom[i] = pick; }
    }
  }
  majors.forEach((c, i) => {
    const near = majors
      .map((o, j) => ({ j, d: Math.hypot(o.x - c.x, o.y - c.y) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, rank(c) === 3 ? 4 : rank(c) === 2 ? 3 : 2);
    for (const e of near) pairs.add(i < e.j ? `${i},${e.j}` : `${e.j},${i}`);
  });

  // Trunk routes first, so the important corridors get laid down and the
  // minor roads then merge into them rather than the other way round.
  const ordered = [...pairs]
    .map((k) => k.split(',').map(Number))
    .sort((p, q) => (rank(majors[q[0]]) + rank(majors[q[1]])) - (rank(majors[p[0]]) + rank(majors[p[1]])));

  const routes = [];
  const bearings = new Map();
  const bearingOf = (c) => { let b = bearings.get(c); if (!b) bearings.set(c, (b = [])); return b; };

  for (const [i, j] of ordered) {
    const a = idxOf(majors[i]);
    const b = idxOf(majors[j]);
    if (a === b) continue;
    const path = aStar(h, used, a, b);
    if (!path || path.length < 2) continue;

    let water = 0;
    for (const p of path) if (h[p] <= 0) water++;
    const ferry = water > 14 || water > path.length * 0.3;

    if (!ferry) for (const p of path) used[p] = 1;

    const world = path.map(toWorld);
    // Snap to the real endpoints. The routing grid is coarse — a node can sit
    // 13 world units from the place it stands for, which is a village-sized
    // gap between the road and the thing it was drawn to reach.
    world[0] = { x: majors[i].x, y: majors[i].y };
    world[world.length - 1] = { x: majors[j].x, y: majors[j].y };
    const combined = rank(majors[i]) + rank(majors[j]);
    routes.push({
      a: majors[i], b: majors[j],
      pts: ferry ? [world[0], world[world.length - 1]] : smoothPath(world),
      ferry,
      cls: combined >= 5 ? 'motorway' : combined >= 3 ? 'highway' : 'road',
    });

    if (!ferry) {
      // Bearing the route leaves each city on, so the city's own radial roads
      // can be aligned to meet it.
      const k = Math.min(world.length - 1, 6);
      bearingOf(majors[i]).push(Math.atan2(world[k].y - world[0].y, world[k].x - world[0].x));
      const e = world.length - 1;
      const k2 = Math.max(0, e - 6);
      bearingOf(majors[j]).push(Math.atan2(world[k2].y - world[e].y, world[k2].x - world[e].x));
    }
  }


  // Now feed the villages and outposts in. A lane goes to whichever is nearer:
  // the closest settlement, or the closest point on a road that already exists.
  // That second case is what stops minor roads running halfway across a
  // continent to a village nobody has heard of — real ones join the main road.
  const junctions = [];
  for (const r of routes) {
    if (r.ferry) continue;
    for (let i = 2; i < r.pts.length - 2; i += 3) junctions.push(r.pts[i]);
  }

  for (const c of cities) {
    if (MAJOR(c)) continue;
    let target = null;
    let bestD = Infinity;
    for (const o of cities) {
      if (o === c || (!MAJOR(o) && o.kind !== 'village')) continue;
      const d = Math.hypot(o.x - c.x, o.y - c.y);
      if (d < bestD) { bestD = d; target = { x: o.x, y: o.y }; }
    }
    for (const j of junctions) {
      const d = Math.hypot(j.x - c.x, j.y - c.y) * 1.15;
      if (d < bestD) { bestD = d; target = j; }
    }
    if (!target || bestD > 700) continue;

    const path = aStar(h, used, idxOf(c), idxOf(target));
    if (!path || path.length < 2) continue;
    let water = 0;
    for (const p of path) if (h[p] <= 0) water++;
    if (water > 6) continue;
    for (const p of path) used[p] = 1;
    const world = path.map(toWorld);
    // Same snap, and it matters far more here: this is why lanes were ending
    // in open country a few hundred metres short of the road they join.
    world[0] = { x: c.x, y: c.y };
    world[world.length - 1] = { x: target.x, y: target.y };
    routes.push({ a: c, b: target, pts: smoothPath(world), ferry: false, cls: 'lane' });
    const k = Math.min(world.length - 1, 5);
    bearingOf(c).push(Math.atan2(world[k].y - world[0].y, world[k].x - world[0].x));
  }

  return { routes, bearings };
}

/* ------------------------------------------------------------ CASTLES */

// Castles are older than everything else on the map and were built where they
// could be defended, which is why they are on high ground and nowhere near the
// motorways. One of them is not a ruin.
const CASTLE_SUFFIX = ['Keep', 'Castle', 'Hold', 'Bastion', 'Citadel'];

function buildCastles(planet, rng, hAt, mfAt) {
  const { GW, GH, hf } = planet;
  const out = [];
  const isLandG = (gx, gy) => hf[Math.max(0, Math.min(GH - 1, gy)) * GW + Math.max(0, Math.min(GW - 1, gx))] > SEA + 0.004;

  // The Sick 52 stronghold goes in the middle of the driest, emptiest ground
  // the planet has. That is the whole point of it.
  let worst = null;
  for (let t = 0; t < 4000; t++) {
    const gx = 10 + Math.floor(rng() * (GW - 20));
    const gy = 10 + Math.floor(rng() * (GH - 20));
    if (!isLandG(gx, gy)) continue;
    const h = hAt(gx, gy);
    const moist = mfAt(gx, gy);
    if (h > 0.34 || moist > 0.2) continue;
    const px = (gx / (GW - 1)) * WORLD_W;
    const py = (gy / (GH - 1)) * WORLD_H;
    // Score on how far it is from anyone at all.
    let lonely = Infinity;
    for (const c of planet.cities) lonely = Math.min(lonely, Math.hypot(c.x - px, c.y - py));
    if (!worst || lonely > worst.lonely) worst = { px, py, gx, gy, h, moist, lonely };
    if (lonely > 420) break;
  }
  if (worst) {
    out.push({
      name: 'The Last Chord', kind: 'castle', faction: 'sick52', evilHold: true,
      desc: 'The Sick 52 stronghold. Black walls in open desert, a hundred kilometres from anyone who could hear it. Final Drop holds court here and the Founding Dissonants keep the gates.',
      x: worst.px, y: worst.py,
      elev: Math.round(worst.h * 4200),
      climate: 'arid',
      pop: 400,
    });
  }

  // A handful of ordinary castles, well apart and up in the hills.
  for (let i = 0; i < 5; i++) {
    for (let t = 0; t < 600; t++) {
      const gx = 8 + Math.floor(rng() * (GW - 16));
      const gy = 8 + Math.floor(rng() * (GH - 16));
      if (!isLandG(gx, gy)) continue;
      const h = hAt(gx, gy);
      if (h < 0.26) continue;
      const px = (gx / (GW - 1)) * WORLD_W;
      const py = (gy / (GH - 1)) * WORLD_H;
      if (planet.cities.some((c) => Math.hypot(c.x - px, c.y - py) < 120)) continue;
      if (out.some((c) => Math.hypot(c.x - px, c.y - py) < 600)) continue;
      out.push({
        name: `${makeName(rng)} ${CASTLE_SUFFIX[(rng() * CASTLE_SUFFIX.length) | 0]}`,
        kind: 'castle', faction: 'neutral',
        desc: 'A castle on the high ground, built when the high ground was the argument. A garrison, a chapel, and a village that grew up against the walls.',
        x: px, y: py,
        elev: Math.round(h * 4200),
        climate: climateOf(Math.abs(gy / (GH - 1) - 0.5) * 2, mfAt(gx, gy), h),
        pop: 900 + Math.round(rng() * 2600),
      });
      break;
    }
  }
  return out;
}

// The Sick 52 work in cells, and a cell is a place: a compound of four or five
// buildings off a track, well outside anywhere with a police station. Before
// this they were dots on open grass, which is exactly what a safe house is not.
function buildCells(planet, rng) {
  const home = planet.cities.find((c) => c.name === 'Ongaku Prime') || planet.cities[0];
  if (!home) return [];
  const R = home.radius;
  const out = [];

  const nearestRoad = (x, y) => {
    let best = null;
    let bd = Infinity;
    for (const r of planet.routes) {
      if (r.ferry) continue;
      for (const pt of r.pts) {
        const d = Math.hypot(pt.x - x, pt.y - y);
        if (d < bd) { bd = d; best = pt; }
      }
    }
    return best && bd < 90 ? best : null;
  };

  for (let c = 0; c < 8; c++) {
    for (let t = 0; t < 600; t++) {
      const a = rng() * Math.PI * 2;
      const r = R * (1.5 + rng() * 2.4);
      const x = home.x + Math.cos(a) * r;
      const y = home.y + Math.sin(a) * r;
      if (!isLandAt(planet, x, y, 6)) continue;
      if (planet.cities.some((o) => cityContains(o, x, y))) continue;
      if (out.some((q) => Math.hypot(q.x - x, q.y - y) < R * 0.6)) continue;

      const ang = rng() * Math.PI;
      const ux = Math.cos(ang);
      const uy = Math.sin(ang);
      const buildings = [];
      const n = 4 + ((rng() * 3) | 0);
      for (let i = 0; i < n; i++) {
        const along = (i - (n - 1) / 2) * 3.2;
        const side = (i % 2 ? 1 : -1) * (1.6 + rng() * 1.2);
        buildings.push({
          x: x + ux * along - uy * side,
          y: y + uy * along + ux * side,
          ang: ang + (rng() - 0.5) * 0.3,
          w: 1.6 + rng() * 1.6,
          h: 1.1 + rng() * 1.0,
        });
      }
      out.push({ x, y, ang, buildings, road: nearestRoad(x, y) });
      break;
    }
  }
  return out;
}

/* --------------------------------------------------------- COUNTRYSIDE */

// Everything between the settlements. Before this the world outside a sprawl
// polygon was empty green, which is why cities looked like they had been cut
// out with scissors and why a safe house in open country was a dot on grass.
//
// Rural development follows roads, because that is where it goes: a farm needs
// its produce moved, a homestead needs a lane, and a fuel stop needs traffic.
// So all of it is placed by walking the network rather than by scattering.

const SERVICE_KINDS = [
  { key: 'fuel', icon: '⛽', label: 'Fuel stop', w: 3, names: ['Services', 'Fuel', 'Filling Station'] },
  { key: 'diner', icon: '🍳', label: 'Roadside diner', w: 2.4, names: ['Diner', 'Roadhouse', 'Truck Stop'] },
  { key: 'store', icon: '🏪', label: 'Convenience store', w: 3, names: ['Stores', 'General Store', 'Provisions'] },
  { key: 'motel', icon: '🛏️', label: 'Motel', w: 1.6, names: ['Motel', 'Rest', 'Lodge'] },
  { key: 'garage', icon: '🔧', label: 'Repair shop', w: 1.4, names: ['Garage', 'Auto Repairs', 'Tyres'] },
  { key: 'layby', icon: '🅿️', label: 'Layby', w: 1.2, names: ['Layby', 'Rest Area', 'Viewpoint'] },
  { key: 'weigh', icon: '⚖️', label: 'Weighbridge', w: 0.7, names: ['Weighbridge', 'Checkpoint'] },
];

const FARM_WORDS = ['Farm', 'Farmstead', 'Fields', 'Acres', 'Holding', 'Grange', 'Meadows', 'Pasture'];
const HOME_WORDS = ['Cottage', 'House', 'Croft', 'Lodge', 'Barn', 'Steading'];

function buildCountryside(planet, rng) {
  const { GW, GH, hf, mf } = planet;
  const at = (x, y) => {
    const gx = Math.max(0, Math.min(GW - 1, Math.round((x / WORLD_W) * (GW - 1))));
    const gy = Math.max(0, Math.min(GH - 1, Math.round((y / WORLD_H) * (GH - 1))));
    return gy * GW + gx;
  };
  const dry = (x, y) => hf[at(x, y)] > 0.004;
  const green = (x, y) => mf[at(x, y)] > 0.34 && hf[at(x, y)] < 0.34;
  const inTown = (x, y, pad = 1) => planet.cities.some((c) => Math.hypot(c.x - x, c.y - y) < c.radius * pad);

  const services = [];
  const homesteads = [];
  const farms = [];
  const books = { service: [], home: [] };
  const clear = (book, x, y, gap) => {
    for (const q of books[book]) if (Math.hypot(q.x - x, q.y - y) < gap) return false;
    books[book].push({ x, y });
    return true;
  };

  const pickService = () => {
    let total = 0;
    for (const k of SERVICE_KINDS) total += k.w;
    let r = rng() * total;
    for (const k of SERVICE_KINDS) { r -= k.w; if (r <= 0) return k; }
    return SERVICE_KINDS[0];
  };

  for (const r of planet.routes) {
    if (r.ferry || r.pts.length < 4) continue;
    const trunk = r.cls === 'motorway' || r.cls === 'highway';
    const minor = r.cls === 'lane' || r.cls === 'access';

    // Walk the polyline at a fixed step so spacing is in world units rather
    // than in however many vertices the router happened to emit, carrying the
    // remainder across segment boundaries.
    const STEP = 4.5;
    let since = STEP;
    for (let i = 1; i < r.pts.length; i++) {
      const a = r.pts[i - 1];
      const b = r.pts[i];
      const seg = Math.hypot(b.x - a.x, b.y - a.y);
      if (seg < 0.001) continue;
      const ux = (b.x - a.x) / seg;
      const uy = (b.y - a.y) / seg;
      const nx = -uy;
      const ny = ux;

      let pos = 0;
      for (;;) {
        const need = STEP - since;
        if (pos + need > seg) { since += seg - pos; break; }
        pos += need;
        since = 0;

        const x = a.x + ux * pos;
        const y = a.y + uy * pos;
        if (!dry(x, y) || inTown(x, y, 1.12)) continue;

        // Services: only on roads with traffic, and well apart.
        if (!minor && rng() < 0.06) {
          const side = rng() < 0.5 ? 1 : -1;
          const sx = x + nx * side * (3.5 + rng() * 2);
          const sy = y + ny * side * (3.5 + rng() * 2);
          if (dry(sx, sy) && clear('service', sx, sy, trunk ? 55 : 38)) {
            const kind = pickService();
            services.push({
              x: sx, y: sy, ang: Math.atan2(uy, ux), kind: kind.key,
              icon: kind.icon, label: kind.label,
              name: `${makeName(rng)} ${kind.names[(rng() * kind.names.length) | 0]}`,
              on: r.ref || null,
            });
          }
        }

        // Homesteads: a house set back from the road, more of them on lanes.
        if (rng() < (minor ? 0.3 : 0.14)) {
          const side = rng() < 0.5 ? 1 : -1;
          const off = 3 + rng() * 7;
          const hx = x + nx * side * off;
          const hy = y + ny * side * off;
          if (dry(hx, hy) && !inTown(hx, hy, 1.05) && clear('home', hx, hy, 7)) {
            homesteads.push({
              x: hx, y: hy, ang: Math.atan2(uy, ux) + (rng() - 0.5) * 0.5,
              w: 1.1 + rng() * 1.4, h: 0.8 + rng() * 1.0,
              // A track back to the road, so nothing out here is unreachable.
              tx: x, ty: y,
              name: `${makeName(rng)} ${HOME_WORDS[(rng() * HOME_WORDS.length) | 0]}`,
            });

            // Farms want green ground and a house to belong to.
            if (green(hx, hy) && rng() < 0.75) {
              const fw = 6 + rng() * 12;
              const fh = 5 + rng() * 9;
              const fang = Math.atan2(uy, ux) + (rng() - 0.5) * 0.6;
              const fx = hx + nx * side * (fh * 0.6 + 2);
              const fy = hy + ny * side * (fh * 0.6 + 2);
              if (dry(fx, fy) && !inTown(fx, fy, 1.05)) {
                farms.push({
                  x: fx, y: fy, ang: fang, w: fw, h: fh,
                  rows: 3 + ((rng() * 4) | 0),
                  name: `${makeName(rng)} ${FARM_WORDS[(rng() * FARM_WORDS.length) | 0]}`,
                });
              }
            }
          }
        }
      }
    }
  }

  return { services, homesteads, farms };
}

/* ------------------------------------------------------ RACE CIRCUITS */

// Two on the planet, no more. Motorsport is a fixture on Ongaku — the season
// finale is a seasonal-mix generator all by itself — but a circuit is a
// landmark, and a landmark stops being one when there are twelve of them.
const CIRCUIT_SUFFIX = ['Speedway', 'Circuit', 'Raceway', 'Motor Park'];

function buildCircuits(planet, rng, nC) {
  const hosts = planet.cities
    .filter((c) => c.kind === 'capital' || c.kind === 'mega')
    .sort((a, b) => b.pop - a.pop);
  const circuits = [];

  for (const host of hosts) {
    if (circuits.length >= 2) break;
    // Keep them apart: two circuits on the same stretch of coast is one
    // circuit and a car park.
    if (circuits.some((k) => Math.hypot(k.x - host.x, k.y - host.y) < 900)) continue;

    let placed = null;
    for (let t = 0; t < 60; t++) {
      const a = rng() * Math.PI * 2;
      const d = host.radius * (1.6 + rng() * 1.2);
      const cx = host.x + Math.cos(a) * d;
      const cy = host.y + Math.sin(a) * d;
      const r = host.radius * 0.5;
      // The whole lap has to be on land, which is most of the work.
      let ok = true;
      for (let k = 0; k < 24; k++) {
        const th = (k / 24) * Math.PI * 2;
        if (!isLandAt(planet, cx + Math.cos(th) * r * 1.15, cy + Math.sin(th) * r * 0.8, 5)) { ok = false; break; }
      }
      if (!ok) continue;
      placed = { cx, cy, r };
      break;
    }
    if (!placed) continue;

    // A road course rather than an oval: the lap radius is modulated by noise,
    // which gives long straights, a hairpin and a couple of sweepers.
    const pts = [];
    const N = 96;
    for (let k = 0; k <= N; k++) {
      const th = (k / N) * Math.PI * 2;
      const wob = 0.72 + (nC(Math.cos(th) * 1.7 + circuits.length * 11, Math.sin(th) * 1.7) * 0.5 + 0.5) * 0.62;
      pts.push({
        x: placed.cx + Math.cos(th) * placed.r * 1.18 * wob,
        y: placed.cy + Math.sin(th) * placed.r * 0.82 * wob,
      });
    }
    circuits.push({
      x: placed.cx, y: placed.cy, r: placed.r, pts,
      host: host.name,
      name: `${host.name.replace(/ City$/, '')} ${CIRCUIT_SUFFIX[(rng() * CIRCUIT_SUFFIX.length) | 0]}`,
      // Halcyon's "marketing budget" has to race somewhere.
      operator: 'Halcyon Motors',
    });
  }
  return circuits;
}

/* ------------------------------------------------ ACCESS & NUMBERING */

// Runs after the footprints, because an airport, a quay and a circuit are all
// places you drive to and none of them exist until then. Then the whole
// network is numbered, which is the difference between a map with roads on it
// and a road map.
function finishRoadNetwork(planet) {
  const routes = planet.routes;
  const h = buildRoutingGrid(planet);
  const used = new Uint8Array(RGW * RGH);
  const idxOf = (c) => {
    const gx = Math.max(0, Math.min(RGW - 1, Math.round((c.x / WORLD_W) * (RGW - 1))));
    const gy = Math.max(0, Math.min(RGH - 1, Math.round((c.y / WORLD_H) * (RGH - 1))));
    return gy * RGW + gx;
  };
  const toWorld = (i) => ({
    x: ((i % RGW) / (RGW - 1)) * WORLD_W,
    y: (((i / RGW) | 0) / (RGH - 1)) * WORLD_H,
  });

  // Existing roads are cheap to travel along, so a spur joins the network and
  // runs beside it rather than cutting its own line across country.
  for (const r of routes) {
    if (r.ferry) continue;
    for (const pt of r.pts) used[idxOf(pt)] = 1;
  }

  const nearestOnNetwork = (x, y) => {
    let best = null;
    let bd = Infinity;
    for (const r of routes) {
      if (r.ferry) continue;
      for (const pt of r.pts) {
        const d = Math.hypot(pt.x - x, pt.y - y);
        if (d < bd) { bd = d; best = pt; }
      }
    }
    return best ? { pt: best, d: bd } : null;
  };

  const spur = (from, to, cls, name) => {
    if (!from || !to) return;
    const a = idxOf(from);
    const b = idxOf(to);
    if (a === b) {
      // Close enough that the routing grid cannot tell them apart: two points
      // still make a road, and it is the right road.
      routes.push({ a: from, b: to, pts: [{ x: from.x, y: from.y }, { x: to.x, y: to.y }], ferry: false, cls, name });
      return;
    }
    const path = aStar(h, used, a, b);
    if (!path || path.length < 2) return;
    let water = 0;
    for (const q of path) if (h[q] <= 0) water++;
    if (water > 3) return;
    for (const q of path) used[q] = 1;
    const world = path.map(toWorld);
    world[0] = { x: from.x, y: from.y };
    world[world.length - 1] = { x: to.x, y: to.y };
    routes.push({ a: from, b: to, pts: smoothPath(world), ferry: false, cls, name });
  };

  for (const c of planet.cities) {
    if (c.airport) {
      const near = nearestOnNetwork(c.airport.x, c.airport.y);
      const toCity = Math.hypot(c.airport.x - c.x, c.airport.y - c.y);
      const target = near && near.d < toCity ? near.pt : c;
      spur(c.airport, target, 'access', `${c.airport.name} approach`);
    }
    if (c.port) spur(c.port, c, 'access', `${c.port.name} approach`);
  }
  for (const k of planet.circuits || []) {
    const near = nearestOnNetwork(k.x, k.y);
    if (near) spur(k, near.pt, 'access', `${k.name} approach`);
  }

  /* ---- designations ---- */

  const length = (r) => {
    let t = 0;
    for (let i = 1; i < r.pts.length; i++) t += Math.hypot(r.pts[i].x - r.pts[i - 1].x, r.pts[i].y - r.pts[i - 1].y);
    return t;
  };
  const PREFIX = { motorway: 'M', highway: 'H', road: 'R' };
  const counters = { M: 0, H: 0, R: 0 };
  for (const cls of ['motorway', 'highway', 'road']) {
    // Longest first, so M1 is the road that crosses the continent rather than
    // whichever one happened to be routed first.
    const set = routes.filter((r) => r.cls === cls && !r.ferry).sort((x, y) => length(y) - length(x));
    for (const r of set) {
      const pre = PREFIX[cls];
      counters[pre] += 1;
      r.ref = `${pre}${counters[pre]}`;
      r.len = length(r);
      r.corridor = `${r.a.name} — ${r.b.name}`;
    }
  }
  for (const r of routes) {
    if (r.ferry) { r.ref = 'Ferry'; r.corridor = `${r.a.name} — ${r.b.name}`; r.len = length(r); }
    else if (!r.ref) r.len = length(r);
  }
}

/* ------------------------------------------------- CITY FOOTPRINTS */

const CITY_RADIUS = { capital: 64, mega: 48, hostile: 32, port: 27, military: 21, fortress: 16, town: 15, village: 4.6, outpost: 1.05, castle: 3.2 };

// Every city on the planet gets a real urban area: sprawl clipped to the
// coastline, a ring road, radial roads aligned to the highways arriving from
// out of town, a street grid and a block texture. It is the same roads ->
// blocks pipeline as the district view, just at atlas scale.
const QUARTER_SUFFIX = ['Quarter', 'Heights', 'Row', 'Flats', 'Gate', 'Yards', 'Bank', 'Cross', 'Reach', 'Mills', 'Park', 'End'];

// Zooming into a city on the planet map should show quarters, not an
// unlabelled grid. The capital reuses the canon district names so the planet
// view and the dedicated city view agree with each other.
function nameQuarters(c, rng) {
  const secs = c.sectors;
  if (!secs) return;

  if (c.kind === 'capital') {
    const canon = DISTRICTS.map((d) => d.name);
    secs.forEach((s, i) => { s.name = canon[i % canon.length]; });
  } else {
    secs.forEach((s, i) => {
      s.name = i === 0
        ? (c.kind === 'town' || c.kind === 'village' || c.kind === 'outpost' || c.kind === 'castle' ? c.name : 'Downtown')
        : `${makeName(rng)} ${QUARTER_SUFFIX[(rng() * QUARTER_SUFFIX.length) | 0]}`;
    });
  }

  // The waterfront quarter should be the one actually on the water.
  if (c.port && secs.length > 2) {
    let best = 1;
    let bd = Infinity;
    for (let i = 1; i < secs.length; i++) {
      const d = Math.hypot(secs[i].x - c.port.x, secs[i].y - c.port.y);
      if (d < bd) { bd = d; best = i; }
    }
    const harbour = c.kind === 'capital' ? 'Harbour District' : `${makeName(rng)} Docks`;
    // The canon list already contains a Harbour District, so hand its name to
    // whichever sector is actually on the water and swap, never duplicate.
    const dup = secs.findIndex((s) => s.name === harbour);
    if (dup >= 0) secs[dup].name = secs[best].name;
    secs[best].name = harbour;
  }
}

function buildFootprints(planet, seedStr, nC, bearings) {
  const { GW, GH, hf } = planet;
  const landAt = (x, y) => {
    const gx = Math.max(0, Math.min(GW - 1, Math.round((x / WORLD_W) * (GW - 1))));
    const gy = Math.max(0, Math.min(GH - 1, Math.round((y / WORLD_H) * (GH - 1))));
    return hf[gy * GW + gx] > 0.0015;
  };

  planet.cities.forEach((c, ci) => {
    const rng = mulberry32(seedFromString(`${seedStr}::shape::${c.name}`));
    const R = (CITY_RADIUS[c.kind] || 22) * (0.85 + rng() * 0.3);
    c.radius = R;

    // Sprawl outline, stopped by the coast so waterfront cities sit on their
    // bay instead of floating over it. Stepped finely, because a coarse ray
    // walk leaves the polygon cutting corners across the water.
    const poly = [];
    const RAYS = 96;
    let coastHits = 0;
    for (let a = 0; a < RAYS; a++) {
      const ang = (a / RAYS) * Math.PI * 2;
      const ca = Math.cos(ang);
      const sa = Math.sin(ang);
      let r = R * (0.66 + (nC(ca * 2.4 + ci * 9, sa * 2.4) * 0.5 + 0.5) * 0.62);
      const inc = R * 0.025;
      for (let step = inc; step <= r; step += inc) {
        if (!landAt(c.x + ca * step, c.y + sa * step)) {
          r = Math.max(R * 0.06, step - inc);
          coastHits++;
          break;
        }
      }
      poly.push({ x: c.x + ca * r, y: c.y + sa * r, r, ang });
    }
    c.poly = poly.map((p) => ({ x: p.x, y: p.y }));
    // Kept so the outline can be point-tested later without the polygon:
    // the detail builder needs the same O(1) containment test this does.
    c.rays = Float32Array.from(poly.map((p) => p.r));
    c.RAYS = RAYS;
    c.coastal = coastHits > 3;

    // The outline is a radial function of angle, so containment is a lookup
    // rather than a 96-vertex polygon test. Street and block generation calls
    // this tens of thousands of times per city, so O(1) matters here.
    const rays = Float32Array.from(poly.map((p) => p.r));
    const TAU = Math.PI * 2;
    const inCity = (x, y) => {
      const dx = x - c.x;
      const dy = y - c.y;
      const d = Math.hypot(dx, dy);
      if (d > R * 1.5) return false;
      let a = Math.atan2(dy, dx);
      if (a < 0) a += TAU;
      const t = (a / TAU) * RAYS;
      const i = Math.floor(t) % RAYS;
      const f = t - Math.floor(t);
      return d <= rays[i] + (rays[(i + 1) % RAYS] - rays[i]) * f;
    };

    // Sectors: a downtown plus outlying quarters, each with its own street
    // angle and density. Without them every city renders as one uniform
    // lattice, which is what makes procedural cities look fake.
    const nSec = c.kind === 'capital' ? 9 : c.kind === 'mega' ? 6 : c.kind === 'town' ? 2 : c.kind === 'village' || c.kind === 'outpost' ? 1 : c.kind === 'castle' ? 1 : 3;
    const sectors = [{ x: c.x, y: c.y, w: 1.3, dens: 1, ang: rng() * Math.PI }];
    for (let s = 1; s < nSec; s++) {
      const a = (s / (nSec - 1)) * Math.PI * 2 + rng() * 0.7;
      const d = R * (0.42 + rng() * 0.4);
      sectors.push({
        x: c.x + Math.cos(a) * d,
        y: c.y + Math.sin(a) * d,
        w: 0.8 + rng() * 0.35,
        dens: 0.45 + rng() * 0.5,
        ang: rng() * Math.PI,
      });
    }
    const sectorAt = (x, y) => {
      let best = 0;
      let bd = Infinity;
      for (let s = 0; s < sectors.length; s++) {
        const d = Math.hypot(x - sectors[s].x, y - sectors[s].y) / sectors[s].w;
        if (d < bd) { bd = d; best = s; }
      }
      return best;
    };
    // A sector seed can land in the bay — harmless for street generation,
    // which tests the outline anyway, but a quarter name floating in the water
    // looks broken. Walk each anchor back towards downtown until it is inside
    // the sprawl and on land.
    for (const s of sectors) {
      s.lx = s.x;
      s.ly = s.y;
      if (inCity(s.x, s.y) && landAt(s.x, s.y)) continue;
      for (let t = 0.12; t <= 1.001; t += 0.08) {
        const bx = s.x + (c.x - s.x) * t;
        const by = s.y + (c.y - s.y) * t;
        if (inCity(bx, by) && landAt(bx, by)) { s.lx = bx; s.ly = by; break; }
      }
    }
    c.sectors = sectors;

    // Ring road, pulled inside the sprawl edge.
    const ring = [];
    for (let a = 0; a < RAYS; a += 2) {
      const p = poly[a];
      const rr = Math.min(p.r * 0.62, R * 0.55);
      ring.push({ x: c.x + Math.cos(p.ang) * rr, y: c.y + Math.sin(p.ang) * rr });
    }
    c.ring = ring;

    // Radials: one per arriving highway, topped up so the city never looks
    // lopsided, each stopping at the edge of the built-up area.
    const angs = [...(bearings.get(c) || [])];
    const want = c.kind === 'capital' ? 8 : c.kind === 'mega' ? 6 : c.kind === 'village' ? 2 : c.kind === 'outpost' ? 1 : c.kind === 'castle' ? 2 : 4;
    let guard = 0;
    while (angs.length < want && guard++ < 60) {
      const cand = rng() * Math.PI * 2;
      if (angs.every((a) => Math.abs(Math.atan2(Math.sin(cand - a), Math.cos(cand - a))) > 0.55)) angs.push(cand);
    }
    c.radials = angs.map((a) => {
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      let r = R * 0.2;
      for (let step = R * 0.1; step <= R * 1.3; step += R * 0.04) {
        const x = c.x + ca * step;
        const y = c.y + sa * step;
        if (!inCity(x, y) || !landAt(x, y)) break;
        r = step;
      }
      const pts = [];
      for (let t = 0; t <= 10; t++) {
        const d = (r * t) / 10;
        const wob = nC(a * 5 + ci, d * 0.02) * R * 0.05;
        pts.push({ x: c.x + ca * d - sa * wob, y: c.y + sa * d + ca * wob });
      }
      return pts;
    });

    // Street grid and block texture per sector, revealed only at high zoom.
    // Density falls off toward the edge so the sprawl frays out rather than
    // ending on a hard line.
    const streets = [];
    const quads = [];
    sectors.forEach((sec, si) => {
      const ux = Math.cos(sec.ang);
      const uy = Math.sin(sec.ang);
      const reach = R * (si === 0 ? 0.8 : 0.65);
      const step = R / (c.kind === 'capital' ? 24 : c.kind === 'mega' ? 19 : c.kind === 'outpost' ? 2 : c.kind === 'village' ? 5 : c.kind === 'castle' ? 4 : 12);
      const owns = (x, y) => inCity(x, y) && sectorAt(x, y) === si;

      for (let dir = 0; dir < 2; dir++) {
        const dx = dir ? -uy : ux;
        const dy = dir ? ux : uy;
        const px = dir ? ux : -uy;
        const py = dir ? uy : ux;
        for (let s = -reach; s <= reach; s += step) {
          let run = null;
          for (let t = -reach; t <= reach; t += step * 0.3) {
            const x = sec.x + px * s + dx * t;
            const y = sec.y + py * s + dy * t;
            if (owns(x, y)) {
              if (!run) run = [];
              run.push({ x, y });
            } else if (run) {
              if (run.length > 2) streets.push(run);
              run = null;
            }
          }
          if (run && run.length > 2) streets.push(run);
        }
      }

      for (let a = -reach; a <= reach; a += step) {
        for (let b = -reach; b <= reach; b += step) {
          const bx = sec.x + ux * (a + step / 2) - uy * (b + step / 2);
          const by = sec.y + uy * (a + step / 2) + ux * (b + step / 2);
          if (!owns(bx, by)) continue;
          const falloff = 1 - Math.hypot(bx - c.x, by - c.y) / (R * 1.15);
          if (rng() > sec.dens * (0.35 + falloff * 0.8)) continue;
          const inset = step * (0.09 + rng() * 0.05);
          const x0 = a + inset;
          const y0 = b + inset;
          const x1 = a + step - inset;
          const y1 = b + step - inset;
          const push = (px0, py0, px1, py1) => quads.push(
            sec.x + ux * px0 - uy * py0, sec.y + uy * px0 + ux * py0,
            sec.x + ux * px1 - uy * py0, sec.y + uy * px1 + ux * py0,
            sec.x + ux * px1 - uy * py1, sec.y + uy * px1 + ux * py1,
            sec.x + ux * px0 - uy * py1, sec.y + uy * px0 + ux * py1
          );
          // Split some cells so block sizes vary; a perfectly even lattice is
          // the clearest tell that a city was generated rather than grown.
          const split = rng();
          if (split < 0.28) {
            const m = y0 + (y1 - y0) * (0.38 + rng() * 0.24);
            push(x0, y0, x1, m - step * 0.05);
            push(x0, m + step * 0.05, x1, y1);
          } else if (split < 0.5) {
            const m = x0 + (x1 - x0) * (0.38 + rng() * 0.24);
            push(x0, y0, m - step * 0.05, y1);
            push(m + step * 0.05, y0, x1, y1);
          } else {
            push(x0, y0, x1, y1);
          }
        }
      }
    });
    // Outskirts. Blocks continue past the outline at falling density, each
    // aligned to whichever quarter it is nearest, so the grid does not simply
    // stop along a line.
    {
      const fringeStep = R / (c.kind === 'capital' ? 20 : c.kind === 'mega' ? 16 : 9);
      const outer = R * 1.42;
      for (let fx = -outer; fx <= outer; fx += fringeStep) {
        for (let fy = -outer; fy <= outer; fy += fringeStep) {
          const bx = c.x + fx;
          const by = c.y + fy;
          const d = Math.hypot(fx, fy);
          if (d > outer || inCity(bx, by) || !landAt(bx, by)) continue;
          // Falls to nothing at the outer limit, so there is no second edge.
          const t = Math.max(0, 1 - (d - R * 0.9) / (outer - R * 0.9));
          if (rng() > t ** 1.35 * 0.9) continue;
          const si = sectorAt(bx, by);
          const ang = sectors[si].ang;
          const ux = Math.cos(ang);
          const uy = Math.sin(ang);
          const half = fringeStep * (0.2 + rng() * 0.16);
          quads.push(
            bx + ux * -half - uy * -half, by + uy * -half + ux * -half,
            bx + ux * half - uy * -half, by + uy * half + ux * -half,
            bx + ux * half - uy * half, by + uy * half + ux * half,
            bx + ux * -half - uy * half, by + uy * -half + ux * half,
          );
        }
      }
    }

    c.streets = streets;
    c.quads = Float32Array.from(quads);

    // Re-anchor each quarter on the middle of the area it actually got built
    // on. The seed point is only a Voronoi site: outlying sectors often end up
    // half in the sea, and an anchor pulled back toward downtown drags the
    // quarter's label — and everyone living in it — into the city centre.
    {
      const sx = new Float64Array(sectors.length);
      const sy = new Float64Array(sectors.length);
      const sn = new Uint32Array(sectors.length);
      for (let i = 0; i < quads.length; i += 8) {
        const bx = (quads[i] + quads[i + 2] + quads[i + 4] + quads[i + 6]) / 4;
        const by = (quads[i + 1] + quads[i + 3] + quads[i + 5] + quads[i + 7]) / 4;
        const si = sectorAt(bx, by);
        sx[si] += bx;
        sy[si] += by;
        sn[si]++;
      }
      sectors.forEach((sec, i) => {
        if (sn[i] < 4) return;
        sec.lx = sx[i] / sn[i];
        sec.ly = sy[i] / sn[i];
      });
    }

    // Port: a working harbour on the seaward side rather than a single quay —
    // a main wharf with finger piers off it, which is what makes a waterfront
    // read as industry instead of as a line on the water.
    if (c.coastal) {
      let seaAng = 0;
      let shortest = Infinity;
      for (const p of poly) if (p.r < shortest) { shortest = p.r; seaAng = p.ang; }
      const ca = Math.cos(seaAng);
      const sa = Math.sin(seaAng);
      const bx = c.x + ca * shortest * 0.98;
      const by = c.y + sa * shortest * 0.98;
      const wharfLen = R * (c.kind === 'capital' ? 0.42 : c.kind === 'mega' ? 0.34 : 0.24);
      const piers = [];
      const nP = c.kind === 'capital' ? 5 : c.kind === 'mega' ? 4 : c.kind === 'port' ? 4 : 2;
      for (let i = 0; i < nP; i++) {
        const t = (i - (nP - 1) / 2) * (wharfLen / Math.max(1, nP - 1)) * 1.5;
        const px = bx - sa * t;
        const py = by + ca * t;
        const len = R * (0.10 + rng() * 0.10);
        piers.push({ x: px, y: py, x2: px + ca * len, y2: py + sa * len });
      }
      c.port = {
        x: bx, y: by, ang: seaAng, len: wharfLen, piers,
        name: `${c.name} ${c.kind === 'port' || c.kind === 'capital' ? 'Docks' : 'Harbour'}`,
      };
    }

    // Airfield: flat ground just outside the built-up edge, aligned to the
    // prevailing wind rather than to the street grid, like a real one.
    if (['capital', 'mega', 'port', 'military', 'town'].includes(c.kind)) {
      const runwayAng = rng() * Math.PI;
      for (let t = 0; t < 40; t++) {
        const a = rng() * Math.PI * 2;
        const d = R * (1.15 + rng() * 0.55);
        const ax = c.x + Math.cos(a) * d;
        const ay = c.y + Math.sin(a) * d;
        if (!landAt(ax, ay)) continue;
        const rl = R * (c.kind === 'capital' ? 0.55 : c.kind === 'mega' ? 0.42 : 0.3);
        const ux = Math.cos(runwayAng);
        const uy = Math.sin(runwayAng);
        // The whole apron has to be on land, not just the runway ends: an
        // airfield half in the sea is the most obvious tell on the map.
        const vx = -uy;
        const vy = ux;
        const aw = rl * 1.15;
        const ah = rl * (c.kind === 'capital' ? 0.31 : 0.2);
        let dry = true;
        for (const [su, sv] of [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
          if (!landAt(ax + ux * aw * su + vx * ah * sv, ay + uy * aw * su + vy * ah * sv)) { dry = false; break; }
        }
        if (!dry) continue;
        // And it must not be sitting on the city it serves.
        if (inCity(ax, ay)) continue;
        const runways = [];
        const nR = c.kind === 'capital' ? 2 : 1;
        for (let i = 0; i < nR; i++) {
          const off = (i - (nR - 1) / 2) * R * 0.16;
          runways.push({
            x1: ax + ux * -rl - uy * off, y1: ay + uy * -rl + ux * off,
            x2: ax + ux * rl - uy * off, y2: ay + uy * rl + ux * off,
          });
        }
        c.airport = {
          x: ax, y: ay, ang: runwayAng, r: rl, runways,
          name: c.kind === 'military' ? `${c.name} Airbase` : `${c.name} ${c.kind === 'capital' ? 'International' : 'Airport'}`,
        };
        break;
      }
    }

    nameQuarters(c, rng);
  });
}

function climateOf(lat, moist, h) {
  if (lat > 0.86 || h > 0.46) return 'polar';
  if (lat > 0.66) return 'cold';
  if (moist < 0.26) return 'arid';
  if (lat < 0.26 && moist > 0.55) return 'tropical';
  return 'temperate';
}

/* --------------------------------------------------- TERRAIN RASTER */

// Renders any world rectangle into an RGBA buffer. Used both for the
// whole-world base layer and for re-rendering just the viewport at high
// zoom, which is what makes zooming stay sharp instead of blurring.
export function rasterizeTerrain(out, planet, rect, W, H, styleKey, extraOctaves = 3) {
  const P = palette(styleKey);
  const { GW, GH, hf, mf, noiseH } = planet;

  // Pass 1: heights (one extra row/column so hillshade has neighbours).
  const HW = W + 1;
  const HH = H + 1;
  const heights = new Float32Array(HW * HH);
  const tone = new Float32Array(HW * HH);
  const moist = new Float32Array(HW * HH);

  const stepX = rect.w / W;
  const stepY = rect.h / H;

  for (let py = 0; py < HH; py++) {
    const wy = rect.y + py * stepY;
    const ny = wy / WORLD_H;
    const fy = Math.max(0, Math.min(GH - 1.001, ny * (GH - 1)));
    const iy = fy | 0;
    const ty = fy - iy;
    for (let px = 0; px < HW; px++) {
      const wx = rect.x + px * stepX;
      const nx = wx / WORLD_W;
      const fx = Math.max(0, Math.min(GW - 1.001, nx * (GW - 1)));
      const ix = fx | 0;
      const tx = fx - ix;

      const r0 = iy * GW + ix;
      const r1 = r0 + GW;
      const h00 = hf[r0];
      const h10 = hf[r0 + 1];
      const h01 = hf[r1];
      const h11 = hf[r1 + 1];
      let h = (h00 + (h10 - h00) * tx) + ((h01 + (h11 - h01) * tx) - (h00 + (h10 - h00) * tx)) * ty;

      const smooth = h;
      if (extraOctaves > 0) {
        h += detailOctaves(noiseH, nx, ny, FIELD_OCT, FIELD_OCT + extraOctaves) * DETAIL_AMP;
      }

      const m00 = mf[r0];
      const m10 = mf[r0 + 1];
      const m01 = mf[r1];
      const m11 = mf[r1 + 1];
      const mt = (m00 + (m10 - m00) * tx) + ((m01 + (m11 - m01) * tx) - (m00 + (m10 - m00) * tx)) * ty;

      const k = py * HW + px;
      heights[k] = h;
      // Colour follows the smooth field, mostly. A little of the detail is kept
      // so the ground is not dead flat, but not enough to read as noise.
      tone[k] = smooth + (h - smooth) * 0.22;
      moist[k] = mt;
    }
  }

  // Pass 2: colour + hillshade.
  //
  // Gradients are taken per world unit rather than per pixel, so the relief
  // reads the same whether the whole planet or one valley is on screen.
  // RELIEF converts that slope into the O(1) range a surface normal needs.
  const RELIEF = 900;
  const gx = RELIEF / stepX;
  const gy = RELIEF / stepY;
  const shadeRange = P.shadeMax - P.shadeMin;
  const J = P.jitter ?? 1;

  // Light from the north-west at roughly 45 degrees — the convention every
  // printed atlas uses, and the one that reads as "raised" rather than "sunken".
  const LX = -0.5;
  const LY = -0.5;
  const LZ = 0.7071;

  for (let py = 0; py < H; py++) {
    const wy = rect.y + py * stepY;
    const lat = Math.abs(wy / WORLD_H - 0.5) * 2;
    for (let px = 0; px < W; px++) {
      const k = py * HW + px;
      const h = heights[k];
      const o = (py * W + px) * 4;

      if (h <= SEA) {
        // Continuous depth ramp — discrete bands read as contour rings.
        const d = -h;
        let a;
        let b;
        let t;
        if (d < 0.05) { a = P.surf; b = P.shelf; t = d / 0.05; }
        else if (d < 0.24) { a = P.shelf; b = P.ocean; t = (d - 0.05) / 0.19; }
        else { a = P.ocean; b = P.abyss; t = Math.min(1, (d - 0.24) / 0.5); }
        out[o] = a[0] + (b[0] - a[0]) * t;
        out[o + 1] = a[1] + (b[1] - a[1]) * t;
        out[o + 2] = a[2] + (b[2] - a[2]) * t;
        out[o + 3] = 255;
        continue;
      }

      const dzdx = (heights[k + 1] - h) * gx;
      const dzdy = (heights[k + HW] - h) * gy;
      const inv = 1 / Math.sqrt(dzdx * dzdx + dzdy * dzdy + 1);
      const dot = (-dzdx * LX - dzdy * LY + LZ) * inv;
      let shade = P.shadeMin + shadeRange * Math.max(0, Math.min(1, (dot - 0.30) / 0.55));

      // Break biome edges with high-frequency noise so bands blend into each
      // other instead of meeting along a hard contour line.
      const jitter = noiseH(nxOf(rect, px, stepX) * 90, nyOf(rect, py, stepY) * 90) * 0.055 * J;
      // A touch of the same noise in the shading keeps large single-biome
      // areas from looking like flat paint at high zoom.
      shade *= 1 + jitter * 0.55;
      const m = moist[k] + jitter;
      const hc = tone[k];
      // Temperature falls with latitude and with altitude.
      const temp = Math.max(0, Math.min(1, (1 - lat * 1.05) - Math.max(0, hc - 0.18) * 1.15 + jitter * 0.5));

      // Mottling the elevation used for colour breaks the snow line and the
      // tree line into a ragged edge instead of a clean contour.
      const hv = hc + jitter * 1.4;

      let col;
      if (h < 0.006) col = P.beach;
      else if (hv > 0.86) col = P.snow;
      else if (hv > 0.44) col = temp < 0.26 ? P.snow : P.rock;
      else if (temp < 0.10) col = P.ice;
      else if (temp < 0.22) col = P.tundra;
      else if (temp < 0.40) col = m > 0.44 ? P.taiga : P.steppe;
      else if (temp < 0.66) col = m > 0.60 ? P.forest : m > 0.42 ? P.woodland : m > 0.25 ? P.grass : P.steppe;
      else if (m > 0.66) col = P.jungle;
      else if (m > 0.47) col = P.forest;
      else if (m > 0.31) col = P.savanna;
      else if (m > 0.18) col = P.scrub;
      else col = J > 0.5 && ((px + py) & 7) < 3 ? P.dune : P.desert;

      // One pixel of shoreline wherever land touches water. A coast that is
      // only the place two fills happen to meet never reads as a coast.
      if (P.shore
        && (heights[k + 1] <= SEA || heights[k + HW] <= SEA
          || (px > 0 && heights[k - 1] <= SEA) || (py > 0 && heights[k - HW] <= SEA))) {
        col = P.shore;
        shade = 1;
      }

      out[o] = Math.min(255, col[0] * shade);
      out[o + 1] = Math.min(255, col[1] * shade);
      out[o + 2] = Math.min(255, col[2] * shade);
      out[o + 3] = 255;
    }
  }
}

function nxOf(rect, px, stepX) { return (rect.x + px * stepX) / WORLD_W; }
function nyOf(rect, py, stepY) { return (rect.y + py * stepY) / WORLD_H; }

/* ---------------------------------------------- PLANET VECTOR LAYERS */

export function drawPlanetVectors(ctx, planet, styleKey, scale, opts = {}) {
  const P = palette(styleKey);
  // As in drawCity: divide by scale so strokes keep a constant screen weight.
  const lw = (screenPx) => screenPx / Math.max(0.02, scale);

  if (opts.rivers !== false) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = P.river;
    for (const path of planet.rivers) {
      // Rivers widen downstream.
      for (let seg = 0; seg < 3; seg++) {
        const from = Math.floor((path.length * seg) / 3);
        const to = Math.min(path.length, Math.floor((path.length * (seg + 1)) / 3) + 1);
        if (to - from < 2) continue;
        ctx.lineWidth = lw(0.7 + seg * 0.8);
        ctx.beginPath();
        ctx.moveTo(path[from].x, path[from].y);
        for (let i = from + 1; i < to; i++) ctx.lineTo(path[i].x, path[i].y);
        ctx.stroke();
      }
    }
    for (const l of planet.lakes) {
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.r, 0, Math.PI * 2);
      ctx.fillStyle = P.water;
      ctx.fill();
    }
  }

  const trace = (pts) => {
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
  };

  // ---- urban footprints, under the roads so highways read as running in ----
  if (opts.cities !== false) {
    ctx.lineJoin = 'round';
    for (const c of planet.cities) {
      if (!c.poly) continue;
      // Below this the sprawl is a couple of pixels wide; the marker carries it.
      if (c.radius * scale < 2.4) continue;

      ctx.beginPath();
      ctx.moveTo(c.poly[0].x, c.poly[0].y);
      for (let i = 1; i < c.poly.length; i++) ctx.lineTo(c.poly[i].x, c.poly[i].y);
      ctx.closePath();
      // Once buildings have streamed in they are the built-up area. Keeping the
      // flat sprawl fill at full strength leaves bald grey patches wherever the
      // density falls off, and a hard city limit where the map should fray.
      const built = opts.detailed && opts.detailed.has(c.name);
      ctx.globalAlpha = built ? 0.45 : 1;
      ctx.fillStyle = P.urban;
      ctx.fill();
      ctx.globalAlpha = 1;
      // The silhouette carries the city when it is small; once blocks are
      // visible they define the edge and an outline just looks drawn on.
      if (c.radius * scale < 200) {
        ctx.strokeStyle = P.urbanEdge;
        ctx.lineWidth = lw(0.6);
        ctx.stroke();
      }

      // Denser core, faded out so it reads as density rather than a disc.
      const g = ctx.createRadialGradient(c.x, c.y, c.radius * 0.08, c.x, c.y, c.radius * 0.72);
      g.addColorStop(0, P.urbanCore);
      g.addColorStop(1, P.urbanCoreFade);
      ctx.globalAlpha = built ? 0.4 : 1;
      ctx.fillStyle = g;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Block texture only once a block would be more than a pixel across —
      // and only until the streamed detail tier takes over, which draws the
      // same blocks subdivided into individual buildings.
      // Block texture as soon as a block is about a pixel across. This is the
      // tier that stops a city being a smudge long before its buildings load.
      if (c.quads && c.radius * scale > 55 && !(opts.detailed && opts.detailed.has(c.name))) {
        ctx.fillStyle = P.block;
        ctx.beginPath();
        for (let i = 0; i < c.quads.length; i += 8) {
          ctx.moveTo(c.quads[i], c.quads[i + 1]);
          ctx.lineTo(c.quads[i + 2], c.quads[i + 3]);
          ctx.lineTo(c.quads[i + 4], c.quads[i + 5]);
          ctx.lineTo(c.quads[i + 6], c.quads[i + 7]);
          ctx.closePath();
        }
        ctx.fill();
      }

      // Castles read as walls and towers rather than as a small town. The
      // Sick 52 stronghold is drawn in the same shape and a different colour,
      // because it is the same kind of thing and it is not on your side.
      if (c.kind === 'castle' && c.radius * scale > 6) {
        const wall = c.evilHold ? P.wallEvil : P.wall;
        ctx.beginPath();
        ctx.moveTo(c.poly[0].x, c.poly[0].y);
        for (let i = 1; i < c.poly.length; i++) ctx.lineTo(c.poly[i].x, c.poly[i].y);
        ctx.closePath();
        ctx.strokeStyle = wall;
        ctx.lineWidth = lw(Math.min(7, Math.max(1.6, c.radius * scale * 0.05)));
        ctx.lineJoin = 'round';
        ctx.stroke();
        if (c.radius * scale > 30) {
          ctx.fillStyle = wall;
          const step = Math.max(4, Math.floor(c.poly.length / 8));
          ctx.beginPath();
          for (let i = 0; i < c.poly.length; i += step) {
            ctx.moveTo(c.poly[i].x, c.poly[i].y);
            ctx.arc(c.poly[i].x, c.poly[i].y, c.radius * 0.09, 0, Math.PI * 2);
          }
          ctx.fill();
        }
      }

      if (c.port && c.radius * scale > 26) {
        ctx.lineCap = 'butt';
        ctx.strokeStyle = P.quay;
        // Main wharf along the shore, then the finger piers off it.
        ctx.lineWidth = lw(3.4);
        ctx.beginPath();
        ctx.moveTo(c.port.x - Math.sin(c.port.ang) * c.port.len, c.port.y + Math.cos(c.port.ang) * c.port.len);
        ctx.lineTo(c.port.x + Math.sin(c.port.ang) * c.port.len, c.port.y - Math.cos(c.port.ang) * c.port.len);
        ctx.stroke();
        if (c.radius * scale > 90) {
          ctx.lineWidth = lw(2.2);
          ctx.beginPath();
          for (const pr of c.port.piers) {
            ctx.moveTo(pr.x, pr.y);
            ctx.lineTo(pr.x2, pr.y2);
          }
          ctx.stroke();
        }
        ctx.lineCap = 'round';
      }

      // Airfield: apron, then runways with centreline markings.
      if (c.airport && c.radius * scale > 40) {
        const ap = c.airport;
        // The apron follows the runways. A circle of tarmac in a forest is the
        // single most obvious tell that a map was generated rather than drawn.
        const aw = ap.r * 2.2;
        const ah = ap.r * (ap.runways.length > 1 ? 0.58 : 0.36);
        ctx.save();
        ctx.translate(ap.x, ap.y);
        ctx.rotate(ap.ang);
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(-aw / 2, -ah / 2, aw, ah, ap.r * 0.14);
        else ctx.rect(-aw / 2, -ah / 2, aw, ah);
        ctx.fillStyle = P.apron;
        ctx.fill();
        ctx.restore();
        ctx.lineCap = 'butt';
        ctx.strokeStyle = P.runway;
        ctx.lineWidth = lw(Math.min(9, Math.max(2.5, ap.r * scale * 0.09)));
        ctx.beginPath();
        for (const r of ap.runways) {
          ctx.moveTo(r.x1, r.y1);
          ctx.lineTo(r.x2, r.y2);
        }
        ctx.stroke();
        if (c.radius * scale > 220) {
          ctx.save();
          ctx.setLineDash([lw(7), lw(7)]);
          ctx.strokeStyle = P.runwayMark;
          ctx.lineWidth = lw(1);
          ctx.beginPath();
          for (const r of ap.runways) {
            ctx.moveTo(r.x1, r.y1);
            ctx.lineTo(r.x2, r.y2);
          }
          ctx.stroke();
          ctx.restore();
        }
        ctx.lineCap = 'round';
      }
    }
  }


  // ---- countryside: fields, homesteads and the tracks that serve them ----
  //
  // Everything here follows the road network, so it appears exactly where the
  // eye expects development and nowhere else. Gated on zoom because at planet
  // scale it is four hundred invisible rectangles.
  if (planet.rural && opts.rural !== false && scale > 0.55) {
    const R = planet.rural;

    ctx.fillStyle = P.field;
    ctx.strokeStyle = P.fieldLine;
    ctx.lineWidth = lw(0.6);
    for (const f of R.farms) {
      const ca = Math.cos(f.ang);
      const sa = Math.sin(f.ang);
      const hw = f.w / 2;
      const hh = f.h / 2;
      ctx.beginPath();
      ctx.moveTo(f.x + ca * -hw - sa * -hh, f.y + sa * -hw + ca * -hh);
      ctx.lineTo(f.x + ca * hw - sa * -hh, f.y + sa * hw + ca * -hh);
      ctx.lineTo(f.x + ca * hw - sa * hh, f.y + sa * hw + ca * hh);
      ctx.lineTo(f.x + ca * -hw - sa * hh, f.y + sa * -hw + ca * hh);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Ploughed rows, once one would be more than a pixel across.
      if (scale > 2.2) {
        ctx.beginPath();
        for (let i = 1; i < f.rows; i++) {
          const t = -hh + (f.h * i) / f.rows;
          ctx.moveTo(f.x + ca * -hw - sa * t, f.y + sa * -hw + ca * t);
          ctx.lineTo(f.x + ca * hw - sa * t, f.y + sa * hw + ca * t);
        }
        ctx.stroke();
      }
    }

    // Tracks first, then the buildings that sit at the end of them.
    ctx.strokeStyle = P.farmTrack;
    ctx.lineWidth = lw(1.3);
    ctx.beginPath();
    for (const h of R.homesteads) {
      ctx.moveTo(h.tx, h.ty);
      ctx.lineTo(h.x, h.y);
    }
    ctx.stroke();

    ctx.fillStyle = P.ruralRoof;
    ctx.strokeStyle = P.urbanEdge;
    ctx.lineWidth = lw(0.5);
    ctx.beginPath();
    for (const h of R.homesteads) {
      const ca = Math.cos(h.ang);
      const sa = Math.sin(h.ang);
      const hw = h.w / 2;
      const hh = h.h / 2;
      ctx.moveTo(h.x + ca * -hw - sa * -hh, h.y + sa * -hw + ca * -hh);
      ctx.lineTo(h.x + ca * hw - sa * -hh, h.y + sa * hw + ca * -hh);
      ctx.lineTo(h.x + ca * hw - sa * hh, h.y + sa * hw + ca * hh);
      ctx.lineTo(h.x + ca * -hw - sa * hh, h.y + sa * -hw + ca * hh);
      ctx.closePath();
    }
    ctx.fill();
    if (scale > 3) ctx.stroke();

    // Safe houses: a track in, and buildings at the end of it.
    if (planet.cells) {
      ctx.strokeStyle = P.farmTrack;
      ctx.lineWidth = lw(1.1);
      ctx.beginPath();
      for (const cl of planet.cells) {
        if (!cl.road) continue;
        ctx.moveTo(cl.road.x, cl.road.y);
        ctx.lineTo(cl.x, cl.y);
      }
      ctx.stroke();

      ctx.fillStyle = P.ruralRoof;
      ctx.beginPath();
      for (const cl of planet.cells) {
        for (const b of cl.buildings) {
          const ca = Math.cos(b.ang);
          const sa = Math.sin(b.ang);
          const hw = b.w / 2;
          const hh = b.h / 2;
          ctx.moveTo(b.x + ca * -hw - sa * -hh, b.y + sa * -hw + ca * -hh);
          ctx.lineTo(b.x + ca * hw - sa * -hh, b.y + sa * hw + ca * -hh);
          ctx.lineTo(b.x + ca * hw - sa * hh, b.y + sa * hw + ca * hh);
          ctx.lineTo(b.x + ca * -hw - sa * hh, b.y + sa * -hw + ca * hh);
          ctx.closePath();
        }
      }
      ctx.fill();
    }

    // A service is a forecourt and a building on it.
    for (const sv of R.services) {
      ctx.beginPath();
      ctx.arc(sv.x, sv.y, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = P.apron;
      ctx.fill();
      ctx.beginPath();
      ctx.rect(sv.x - 0.9, sv.y - 0.7, 1.8, 1.4);
      ctx.fillStyle = P.ruralRoof;
      ctx.fill();
    }
  }

  if (opts.roads !== false) {
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Local streets sit under the through-routes and appear last.
    for (const c of planet.cities) {
      if (!c.streets || c.radius * scale < 110) continue;
      // Local streets carry the city at close range, so they get a casing
      // once they are wide enough for one to read.
      // Streets are cased as soon as the casing would be more than a pixel,
      // which is much earlier than it used to be: an uncased street grid is a
      // sheet of graph paper, a cased one is a city.
      const cased = c.radius * scale > 150;
      if (cased) {
        ctx.strokeStyle = P.roadCase;
        ctx.lineWidth = lw(3.0);
        for (const s of c.streets) { trace(s); ctx.stroke(); }
      }
      ctx.strokeStyle = P.road;
      ctx.lineWidth = lw(cased ? 1.8 : 1.0);
      for (const s of c.streets) { trace(s); ctx.stroke(); }
    }

    // One casing pass then one fill pass across city roads and intercity
    // routes together, so a highway and the radial it becomes are one line.
    // Wider than a city map would draw them: at planet zoom these lines are
    // the only thing showing how the world is connected, so they have to hold
    // up against terrain rather than disappear into it.
    // Casing then fill. The gap between the two numbers is the visible dark
    // edge, and it is what makes a junction look like a junction.
    const WIDTH = {
      motorway: [11.5, 6.6], highway: [8.0, 4.4], road: [5.4, 2.8],
      lane: [3.4, 1.5], access: [3.6, 1.6], ring: [6.2, 3.4], radial: [5.6, 3.0],
    };
    for (const pass of [0, 1]) {
      ctx.strokeStyle = pass === 0 ? P.roadCase : P.road;

      for (const c of planet.cities) {
        if (!c.ring || c.radius * scale < 26) continue;
        ctx.lineWidth = lw(WIDTH.ring[pass]);
        ctx.beginPath();
        ctx.moveTo(c.ring[0].x, c.ring[0].y);
        for (let i = 1; i < c.ring.length; i++) ctx.lineTo(c.ring[i].x, c.ring[i].y);
        ctx.closePath();
        ctx.stroke();
        ctx.lineWidth = lw(WIDTH.radial[pass]);
        for (const r of c.radials) { trace(r); ctx.stroke(); }
      }

      for (const r of planet.routes) {
        if (r.ferry) {
          if (pass === 0) continue;
          ctx.save();
          ctx.setLineDash([lw(5), lw(6)]);
          ctx.strokeStyle = styleKey === 'satellite' ? 'rgba(160,205,255,.45)' : 'rgba(90,140,180,.55)';
          ctx.lineWidth = lw(1.4);
          trace(r.pts);
          ctx.stroke();
          ctx.restore();
          continue;
        }

        if (r.cls === 'lane' && scale < 0.55) continue;
        if (r.cls === 'access' && scale < 0.4) continue;
        ctx.lineWidth = lw(WIDTH[r.cls][pass]);
        trace(r.pts);
        ctx.stroke();
      }
    }

    // Race circuits: infield, then the track, then the racing line. Drawn with
    // the roads because that is what a circuit is.
    if (planet.circuits) {
      for (const k of planet.circuits) {
        if (k.r * scale < 6) continue;
        ctx.beginPath();
        ctx.moveTo(k.pts[0].x, k.pts[0].y);
        for (let i = 1; i < k.pts.length; i++) ctx.lineTo(k.pts[i].x, k.pts[i].y);
        ctx.closePath();
        ctx.fillStyle = P.infield;
        ctx.fill();
        ctx.strokeStyle = P.roadCase;
        ctx.lineWidth = lw(7.5);
        ctx.stroke();
        ctx.strokeStyle = P.track;
        ctx.lineWidth = lw(5);
        ctx.stroke();
        if (k.r * scale > 80) {
          ctx.save();
          ctx.setLineDash([lw(6), lw(9)]);
          ctx.strokeStyle = P.runwayMark;
          ctx.lineWidth = lw(0.9);
          ctx.stroke();
          ctx.restore();
        }
      }
    }

    // A median down the interstates, once they are wide enough to have one.
    // Nothing says trunk route like a road that is visibly two carriageways.
    if (scale > 0.9) {
      ctx.strokeStyle = P.roadCase;
      ctx.lineWidth = lw(1.0);
      for (const r of planet.routes) {
        if (r.ferry || r.cls !== 'motorway') continue;
        trace(r.pts);
        ctx.stroke();
      }
    }
  }
}

/* --------------------------------------------------------------- CITY */

export const DISTRICTS = [
  { key: 'central', name: 'Central District', color: '#38BDF8', faction: 'nexagen', ax: 0.00, ay: -0.02, r: 1.0, density: 1.0, tall: true,
    blurb: 'Government, finance, corporate towers and NexaGen HQ.', stories: 'Corporate thrillers, political manoeuvring, white-collar crime.' },
  { key: 'neon', name: 'Neon District', color: '#E879F9', faction: 'mafia', ax: 0.23, ay: -0.15, r: 0.95, density: 0.92,
    blurb: 'Entertainment, clubs, restaurants and celebrity culture.', stories: 'Nightlife, promotion wars, Hearts house business.' },
  { key: 'oldquarter', name: 'Old Quarter', color: '#FBBF24', faction: 'neutral', ax: -0.25, ay: -0.13, r: 0.9, density: 0.95, organic: true,
    blurb: 'Historic architecture, markets, cafés and cultural landmarks.', stories: "Slice-of-life, the Commission's steakhouse, quiet meetings." },
  { key: 'southside', name: 'Southside', color: '#F59E0B', faction: 'mafia', ax: -0.20, ay: 0.24, r: 1.05, density: 0.85,
    blurb: 'Street culture, underground venues, Hip Hop Mafia heartland.', stories: 'Come-up stories, the community fund, Freq Kid.' },
  { key: 'harbour', name: 'Harbour District', color: '#22D3EE', faction: 'mafia', ax: 0.31, ay: 0.25, r: 1.0, density: 0.6,
    blurb: 'Shipping, warehouses, smuggling and heavy industry.', stories: 'Product routes, container heists, police surveillance.' },
  { key: 'university', name: 'University District', color: '#34D399', faction: 'neutral', ax: -0.41, ay: 0.02, r: 0.85, density: 0.55, green: 0.5,
    blurb: 'Students, sports, parties and everyday life.', stories: 'Coming-of-age, house parties, Afrobeats and house register.' },
  { key: 'rosehill', name: 'Rose Hill', color: '#FB7185', faction: 'tower', ax: 0.03, ay: -0.32, r: 0.8, density: 0.45, green: 0.45,
    blurb: 'Affluent hillside. Restaurants, old money, Velvet Records.', stories: 'R&B, affairs, rooftop dinners, quiet ruin.' },
  { key: 'heights', name: 'The Heights', color: '#818CF8', faction: 'mafia', ax: 0.41, ay: -0.33, r: 0.75, density: 0.35, green: 0.55, tall: true,
    blurb: 'Gated wealth above the city. Where the bosses actually live.', stories: 'Family drama, succession, the Chairman at home.' },
  { key: 'skyport', name: 'Skyport', color: '#A3E635', faction: 'military', ax: 0.53, ay: 0.02, r: 0.9, density: 0.3, runway: true,
    blurb: 'Airport, cargo, aviation, military and civilian overlap.', stories: 'Departures, arrivals, Aero Command, goodbyes.' },
  { key: 'trolley', name: 'Trolley', color: '#F87171', faction: 'military', ax: -0.53, ay: -0.34, r: 0.7, density: 0.22, fortress: true,
    blurb: 'Fortress installation outside the city. The defence grid.', stories: 'The EDM spectacle register — Attack on Trolley.' },
];

// The hand-written places that make the capital and Trolley themselves.
// Everything else on the planet is generated; these are canon.
export const CANON_PLACES = [
  { name: 'NexaGen Tower', type: 'landmark', d: 'central', icon: '🏢', note: 'HQ of the planet-spanning conglomerate.' },
  { name: 'The Ongaku Exchange', type: 'civic', d: 'central', icon: '🏦', note: 'Stock exchange.' },
  { name: 'Meridian Bank', type: 'civic', d: 'central', icon: '🏦', note: 'Everyone has an account here.' },
  { name: 'Tower Group HQ', type: 'landmark', d: 'central', icon: '📡', note: '24 Radio, OBC News, Tower Sound.' },
  { name: 'Verrado Bianco', type: 'food', d: 'central', icon: '🍽️', note: 'Where Diamonds house does business in daylight.' },
  { name: 'Bao Down', type: 'food', d: 'central', icon: '🥟', note: 'Where the Central District has lunch.' },
  { name: 'Central Station', type: 'transit', d: 'central', icon: '🚉', note: 'Every line meets here.' },

  { name: 'Velvet Static', type: 'venue', d: 'neon', icon: '🎤', note: "Silk's flagship club." },
  { name: 'Sable Arena', type: 'landmark', d: 'neon', icon: '🏟️', note: 'The biggest indoor venue on the planet.' },
  { name: 'Halo Coffee', type: 'food', d: 'neon', icon: '☕', note: 'The default somewhere-to-buy-coffee.' },
  { name: 'Tempo Burger', type: 'food', d: 'neon', icon: '🍔', note: 'What every child grows up on.' },
  { name: 'Domino Presents', type: 'front', d: 'neon', icon: '🎟️', note: "Domino's promotion office." },

  { name: "Vantaggio's", type: 'landmark', d: 'oldquarter', icon: '🥩', note: 'The Commission meets in the back room, first Sunday of the month.' },
  { name: 'Deep Crates', type: 'venue', d: 'oldquarter', icon: '💿', note: "Bobby Crate's record shop. Contraband in the back." },
  { name: 'The Meridian Hotel', type: 'civic', d: 'oldquarter', icon: '🛎️', note: 'Deals get done in the lobby bar.' },
  { name: 'Old Quarter Market', type: 'civic', d: 'oldquarter', icon: '🧺', note: 'Six centuries of trading.' },
  { name: 'Cathedral of the Chord', type: 'landmark', d: 'oldquarter', icon: '⛪', note: 'The Sacred Conservatory keeps a seat here.' },

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
  { name: 'Ferry Terminal', type: 'transit', d: 'harbour', icon: '⛴️', note: 'Hourly to Port Sonora.' },

  { name: 'Ongaku University', type: 'civic', d: 'university', icon: '🎓', note: 'The big public university.' },
  { name: 'Cornerstone Pizza', type: 'food', d: 'university', icon: '🍕', note: 'Late-night student food.' },
  { name: 'The Wire & Barrel', type: 'food', d: 'university', icon: '🍺', note: 'Where ODF servicemen drink.' },
  { name: 'Premier League Ground', type: 'landmark', d: 'university', icon: '⚽', note: 'The fixture that divides the capital.' },
  { name: 'Botanical Gardens', type: 'park', d: 'university', icon: '🌳', note: 'Free on Sundays.' },

  { name: 'The Velvet Room', type: 'venue', d: 'rosehill', icon: '🥂', note: 'Members-only supper club, owned by Velvet Records.' },
  { name: 'Ateliér Nsua', type: 'civic', d: 'rosehill', icon: '👗', note: 'Fashion house. Dresses the Velvet artists.' },
  { name: 'Nyala Grill', type: 'food', d: 'rosehill', icon: '🍲', note: 'Family-run. Not a chain and proud of it.' },

  { name: "The Chairman's House", type: 'landmark', d: 'heights', icon: '🏛️', note: 'Marcus Cole lives alone. Golf on Sundays.' },
  { name: 'Moretti Holdings', type: 'front', d: 'heights', icon: '💼', note: "Saint Sal's legitimate empire." },
  { name: 'Heights Country Club', type: 'park', d: 'heights', icon: '⛳', note: 'The waiting list is the point.' },

  { name: 'Skyport Terminal', type: 'landmark', d: 'skyport', icon: '✈️', note: 'Departures, arrivals, and everyone who never came back.' },
  { name: 'Aero Command Field', type: 'military', d: 'skyport', icon: '🛩️', note: 'Military and civilian overlap.' },
  { name: 'SkyOngaku Cargo', type: 'civic', d: 'skyport', icon: '📦', note: 'Flag carrier freight.' },

  { name: 'Trolley Fortress', type: 'military', d: 'trolley', icon: '🏰', note: 'The defence grid. Went offline once.' },
  { name: 'Grid Relay Station', type: 'military', d: 'trolley', icon: '📶', note: 'Frequency Grid infrastructure.' },
];


// Three corporations, planet-spanning, each with buildings in most settlements
// on the map. Three and not twelve on purpose: a corporation is only worth the
// name if you keep running into it, and you cannot keep running into twelve.
//
// `sites` is what each one builds and where it will build it. Head office
// first, then the tiers it operates in. Full write-up: docs/ONGAKU-INDUSTRY.md
export const CORPORATIONS = [
  {
    name: 'NexaGen Harmonics', short: 'NexaGen', icon: '🏢', color: '#0EA5E9',
    hq: 'Ongaku Prime', hqSite: 'NexaGen Tower',
    blurb: 'The conglomerate. AI, robotics, transport, energy, medical, defence. If it has a chip in it, NexaGen owns the patent or the factory.',
    sites: [
      { kind: 'mega', name: 'NexaGen Tower', role: 'core', type: 'landmark', icon: '🏢' },
      { kind: 'town', name: 'NexaGen Works', role: 'industry', type: 'front', icon: '🏭' },
      { kind: 'port', name: 'NexaGen Freight Terminal', role: 'harbour', type: 'front', icon: '📦' },
      { kind: 'village', name: 'NexaGen Depot', role: 'rural', type: 'front', icon: '📦', chance: 0.25 },
      { kind: 'outpost', name: 'NexaGen Field Station', role: 'remote', type: 'front', icon: '🔬', chance: 0.3 },
    ],
  },
  {
    name: 'The Tower Group', short: 'Tower Group', icon: '📡', color: '#A855F7',
    hq: 'Pop City', hqSite: 'Tower Group HQ',
    blurb: '24 Radio, OBC News, Tower Sound — and Tower Extraction, the mining arm nobody puts on the letterhead. A broadcaster needs rare earth for its transmitters, so it bought the mountains it comes out of.',
    sites: [
      { kind: 'capital', name: 'Tower Group Broadcasting House', role: 'core', type: 'landmark', icon: '📡' },
      { kind: 'mega', name: '24 Radio Studios', role: 'nightlife', type: 'venue', icon: '📻' },
      { kind: 'town', name: 'Tower Group Relay', role: 'core', type: 'transit', icon: '📶' },
      { kind: 'village', name: 'Tower Group Exchange', role: 'rural', type: 'civic', icon: '📻', chance: 0.35 },
      { kind: 'outpost', name: 'Tower Extraction', role: 'remote', type: 'front', icon: '⛏️', chance: 1 },
    ],
  },
  {
    name: 'SkyOngaku', short: 'SkyOngaku', icon: '🛫', color: '#F59E0B',
    hq: 'Skyport 9', hqSite: 'SkyOngaku Operations',
    blurb: 'The flag carrier. Passenger, cargo and the charter fleet half the Commission travels on. Every airfield on the planet is theirs or leased from them.',
    sites: [
      { kind: 'capital', name: 'SkyOngaku Cargo', role: 'industry', type: 'transit', icon: '📦' },
      { kind: 'mega', name: 'SkyOngaku Terminal', role: 'industry', type: 'transit', icon: '🛫' },
      { kind: 'port', name: 'SkyOngaku Air Freight', role: 'harbour', type: 'transit', icon: '🛫' },
      { kind: 'town', name: 'SkyOngaku Desk', role: 'core', type: 'transit', icon: '🛫' },
      { kind: 'outpost', name: 'SkyOngaku Fuel Stop', role: 'remote', type: 'transit', icon: '⛽', chance: 0.35 },
    ],
  },
];

// Everything else that has a name on the planet is a firm, not a corporation.
// They still operate sites and put their name on buildings; they just do not
// get a row in the index.
export const FIRMS = [
  { name: 'Bastion Grade', short: 'Bastion', kind: 'construction', blurb: 'Heavy civil engineering. Motorways, bridges, sea walls and the Trolley perimeter, built by people who used to be soldiers.' },
  { name: 'Merano & Sable', short: 'Merano & Sable', kind: 'construction', blurb: 'Commercial developers. Towers, arenas and most of the Neon District skyline; their subcontractor list is where the Commission money goes in clean.' },
  { name: 'Korrat Steel', short: 'Korrat', kind: 'industry', blurb: 'Steel, plate and shipbuilding.' },
  { name: 'Onoska Energy', short: 'Onoska', kind: 'energy', blurb: 'Generation and grid. Runs the Frequency Grid relays under contract.' },
  { name: 'Halcyon Motors', short: 'Halcyon', kind: 'industry', blurb: 'Vehicles, and a street-racing division that is officially a marketing budget.' },
  { name: 'Duvall Pressing', short: 'Duvall', kind: 'industry', blurb: 'Vinyl and disc pressing. Three shifts, two of them on the books.' },
  { name: 'Verrado Freight', short: 'Verrado', kind: 'logistics', blurb: 'Containers, warehousing and customs brokerage.' },
  { name: 'Meridian Bank', short: 'Meridian', kind: 'finance', blurb: 'The oldest bank on the planet.' },
  { name: 'Velvet Records', short: 'Velvet', kind: 'media', blurb: 'The prestige label.' },
];

// Which corporation has what, where. Resolved once per world so the index can
// list every site without any city model having to be streamed in first.
function buildCorpSites(planet, rng) {
  const out = [];
  for (const co of CORPORATIONS) {
    for (const c of planet.cities) {
      if (c.name === co.hq) {
        out.push({ corp: co.name, short: co.short, city: c.name, name: co.hqSite, role: 'core', type: 'landmark', icon: co.icon, hq: true });
        continue;
      }
      const spec = co.sites.find((sp) => sp.kind === c.kind);
      if (!spec) continue;
      if (spec.chance !== undefined && rng() > spec.chance) continue;
      out.push({ corp: co.name, short: co.short, city: c.name, name: spec.name, role: spec.role, type: spec.type, icon: spec.icon });
    }
  }
  return out;
}

/* ------------------------------------------------ WORLD SAMPLING API */

// The elevation the terrain raster would draw at this exact point, including
// the detail octaves it adds when zoomed in. City geometry tests land and
// water through this, so blocks never end up standing in the sea that the
// raster is drawing underneath them.
export function heightAt(planet, wx, wy, extraOctaves = 6) {
  const { GW, GH, hf, noiseH } = planet;
  const nx = wx / WORLD_W;
  const ny = wy / WORLD_H;
  const fx = Math.max(0, Math.min(GW - 1.001, nx * (GW - 1)));
  const fy = Math.max(0, Math.min(GH - 1.001, ny * (GH - 1)));
  const ix = fx | 0;
  const iy = fy | 0;
  const tx = fx - ix;
  const ty = fy - iy;
  const r0 = iy * GW + ix;
  const r1 = r0 + GW;
  const top = hf[r0] + (hf[r0 + 1] - hf[r0]) * tx;
  const bot = hf[r1] + (hf[r1 + 1] - hf[r1]) * tx;
  let h = top + (bot - top) * ty;
  if (extraOctaves > 0) h += detailOctaves(noiseH, nx, ny, FIELD_OCT, FIELD_OCT + extraOctaves) * DETAIL_AMP;
  return h;
}

export function isLandAt(planet, wx, wy, extraOctaves = 6) {
  return heightAt(planet, wx, wy, extraOctaves) > SEA;
}

// Containment against a settlement's sprawl outline. The outline is stored as
// a radius per bearing, so this is a lookup rather than a polygon crossing
// test — it runs tens of thousands of times while a city is being detailed.
export function cityContains(c, x, y) {
  if (!c.rays) return false;
  const dx = x - c.x;
  const dy = y - c.y;
  const d = Math.hypot(dx, dy);
  if (d > c.radius * 1.5) return false;
  let a = Math.atan2(dy, dx);
  if (a < 0) a += Math.PI * 2;
  const t = (a / (Math.PI * 2)) * c.RAYS;
  const i = Math.floor(t) % c.RAYS;
  const f = t - Math.floor(t);
  return d <= c.rays[i] + (c.rays[(i + 1) % c.RAYS] - c.rays[i]) * f;
}

export function citySectorAt(c, x, y) {
  let best = 0;
  let bd = Infinity;
  for (let s = 0; s < c.sectors.length; s++) {
    const d = Math.hypot(x - c.sectors[s].x, y - c.sectors[s].y) / c.sectors[s].w;
    if (d < bd) { bd = d; best = s; }
  }
  return best;
}
