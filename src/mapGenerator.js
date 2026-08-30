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
    shadeMin: 0.55, shadeMax: 1.35, water: '#0d3459', deepWater: '#06142a',
    river: '#2a7fb8', road: 'rgba(255,231,175,.85)', roadCase: 'rgba(20,14,4,.55)',
    label: '#ffffff', labelHalo: 'rgba(4,10,20,.92)', ui: '#f8fafc',
  },
  // Deliberately flat: land is one cream, vegetation one green, water one
  // blue. Biome nuance is the Terrain style's job — this is the layer you
  // switch to when you want roads, districts and labels to carry the map.
  map: {
    abyss: [164, 201, 228], ocean: [170, 205, 231], shelf: [178, 211, 235], surf: [186, 217, 239],
    beach: [240, 234, 219], desert: [245, 235, 212], dune: [245, 235, 212],
    scrub: [242, 239, 233], savanna: [242, 239, 233], grass: [242, 239, 233],
    steppe: [242, 239, 233], woodland: [214, 232, 200], forest: [200, 224, 184],
    jungle: [196, 221, 180], taiga: [214, 232, 205], tundra: [244, 244, 241],
    ice: [253, 254, 255], rock: [232, 228, 220], snow: [255, 255, 255],
    shadeMin: 0.975, shadeMax: 1.025, water: '#aacde7', deepWater: '#9ac2e0',
    river: '#8fbfe0', road: '#ffffff', roadCase: '#d4d0c8',
    label: '#3c4043', labelHalo: 'rgba(255,255,255,.95)', ui: '#202124',
  },
  terrain: {
    abyss: [120, 168, 200], ocean: [141, 186, 214], shelf: [163, 202, 226], surf: [182, 216, 236],
    beach: [232, 222, 188], desert: [226, 205, 156], dune: [235, 219, 176],
    scrub: [212, 205, 158], savanna: [206, 200, 140], grass: [176, 197, 137],
    steppe: [200, 199, 150], woodland: [150, 180, 122], forest: [122, 158, 106],
    jungle: [104, 143, 96], taiga: [146, 174, 140], tundra: [206, 203, 186],
    ice: [246, 250, 252], rock: [188, 173, 150], snow: [252, 252, 252],
    shadeMin: 0.7, shadeMax: 1.22, water: '#8dbad6', deepWater: '#78a8c8',
    river: '#5a9ec4', road: 'rgba(255,255,255,.9)', roadCase: 'rgba(140,130,110,.7)',
    label: '#33413d', labelHalo: 'rgba(255,255,255,.92)', ui: '#1f2937',
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

  // ---- motorways between cities ----
  const routes = [];
  cities.forEach((c, i) => {
    const others = cities
      .map((o, j) => ({ o, j, d: Math.hypot(o.x - c.x, o.y - c.y) }))
      .filter((e) => e.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2);
    for (const e of others) {
      const key = i < e.j ? `${i}-${e.j}` : `${e.j}-${i}`;
      if (routes.some((r) => r.key === key)) continue;
      // Curve the route slightly so the network doesn't look like a diagram.
      const mx = (c.x + e.o.x) / 2 + (rng() - 0.5) * e.d * 0.18;
      const my = (c.y + e.o.y) / 2 + (rng() - 0.5) * e.d * 0.18;
      const gx = Math.round((mx / WORLD_W) * (GW - 1));
      const gy = Math.round((my / WORLD_H) * (GH - 1));
      routes.push({ key, a: c, b: e.o, mx, my, sea: !isLandG(gx, gy) });
    }
  });

  return {
    kind: 'planet', seed: seedStr, GW, GH, hf, mf,
    noiseH: nH, noiseR: nR,
    cities, routes, rivers, lakes,
  };
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
      const jitter = noiseH(nxOf(rect, px, stepX) * 90, nyOf(rect, py, stepY) * 90) * 0.055;
      // A touch of the same noise in the shading keeps large single-biome
      // areas from looking like flat paint at high zoom.
      shade *= 1 + jitter * 0.55;
      const m = moist[k] + jitter;
      // Temperature falls with latitude and with altitude.
      const temp = Math.max(0, Math.min(1, (1 - lat * 1.05) - Math.max(0, h - 0.18) * 1.15 + jitter * 0.5));

      // Mottling the elevation used for colour breaks the snow line and the
      // tree line into a ragged edge instead of a clean contour.
      const hv = h + jitter * 1.4;

      let col;
      if (h < 0.002) col = P.beach;
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
      else col = ((px + py) & 7) < 3 ? P.dune : P.desert;

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

  if (opts.roads !== false) {
    ctx.lineCap = 'round';
    for (const pass of ['case', 'fill']) {
      ctx.strokeStyle = pass === 'case' ? P.roadCase : P.road;
      for (const r of planet.routes) {
        if (r.sea) {
          if (pass === 'case') continue;
          ctx.save();
          ctx.setLineDash([lw(5), lw(6)]);
          ctx.strokeStyle = styleKey === 'satellite' ? 'rgba(160,205,255,.45)' : 'rgba(90,140,180,.55)';
          ctx.lineWidth = lw(1.4);
          ctx.beginPath();
          ctx.moveTo(r.a.x, r.a.y);
          ctx.quadraticCurveTo(r.mx, r.my, r.b.x, r.b.y);
          ctx.stroke();
          ctx.restore();
          continue;
        }
        ctx.lineWidth = lw(pass === 'case' ? 4.2 : 2.2);
        ctx.beginPath();
        ctx.moveTo(r.a.x, r.a.y);
        ctx.quadraticCurveTo(r.mx, r.my, r.b.x, r.b.y);
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

const POI_DEFS = [
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

const CLIMATE_GROUND = {
  temperate: { satellite: '#4a6b3c', map: '#eef1e6', terrain: '#cfd9b8', veg: 1.0, vegColor: '#33562f' },
  arid: { satellite: '#9c8350', map: '#f6ead0', terrain: '#e2cd9e', veg: 0.25, vegColor: '#6d7440' },
  tropical: { satellite: '#3c6135', map: '#e8f0e0', terrain: '#bdd2ab', veg: 1.35, vegColor: '#265225' },
  cold: { satellite: '#5b6a5c', map: '#eef0ee', terrain: '#cfd6cb', veg: 0.7, vegColor: '#2f4a3c' },
  polar: { satellite: '#b9c6cc', map: '#f7fafc', terrain: '#e4ecef', veg: 0.15, vegColor: '#4a5f58' },
};

function pointInPoly(px, py, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const yi = poly[i].y;
    const xj = poly[j].x;
    const yj = poly[j].y;
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function generateCity(seedStr, cityName = 'Ongaku Prime', climate = 'temperate') {
  const seed = seedFromString(`${seedStr}::${cityName}`);
  const rng = mulberry32(seed);
  const nC = makeNoise(rng);

  const cx = WORLD_W / 2;
  const cy = WORLD_H / 2;
  const spread = Math.min(WORLD_W, WORLD_H) * 0.80;

  const districts = DISTRICTS.map((d) => ({
    ...d,
    x: cx + d.ax * spread * 1.35 + (rng() - 0.5) * 70,
    y: cy + d.ay * spread * 1.15 + (rng() - 0.5) * 70,
    weight: d.r,
  }));

  // ---- coastline: a bay sweeping in from the lower right ----
  const coast = [];
  const COAST_N = 120;
  for (let i = 0; i <= COAST_N; i++) {
    const t = i / COAST_N;
    const x = t * WORLD_W;
    const y = WORLD_H * 0.90 + nC(t * 4, 11.3) * 220 - (x / WORLD_W) * WORLD_H * 0.20;
    coast.push({ x, y });
  }
  const coastPoly = [...coast, { x: WORLD_W, y: WORLD_H + 40 }, { x: 0, y: WORLD_H + 40 }];
  const coastYAt = (x) => {
    const t = Math.max(0, Math.min(0.9999, x / WORLD_W)) * COAST_N;
    const i = t | 0;
    const f = t - i;
    return coast[i].y + (coast[Math.min(COAST_N, i + 1)].y - coast[i].y) * f;
  };
  const isWater = (x, y) => y > coastYAt(x);

  // ---- district polygons: Voronoi boundary traced per ray, then softened ----
  const RAYS = 72;
  for (let k = 0; k < districts.length; k++) {
    const d = districts[k];
    // Districts grow until they meet a neighbour or the water, so the city is
    // continuous. Trolley is capped because it is a fortress outside the city,
    // not a neighbourhood of it.
    const maxR = spread * (d.fortress ? 0.13 : 0.52) * d.weight;
    const poly = [];
    for (let a = 0; a < RAYS; a++) {
      const ang = (a / RAYS) * Math.PI * 2;
      const ca = Math.cos(ang);
      const sa = Math.sin(ang);
      let r = maxR;
      for (let step = 12; step <= maxR; step += 12) {
        const px = d.x + ca * step;
        const py = d.y + sa * step;
        if (isWater(px, py)) { r = step - 12; break; }
        let nearest = k;
        let nd = Infinity;
        for (let j = 0; j < districts.length; j++) {
          const o = districts[j];
          const dd = Math.hypot(px - o.x, py - o.y) / o.weight;
          if (dd < nd) { nd = dd; nearest = j; }
        }
        if (nearest !== k) { r = step - 12; break; }
      }
      const wobble = d.organic ? 0.72 + nC(ca * 3 + k * 7, sa * 3) * 0.5 : 0.84 + nC(ca * 2 + k * 7, sa * 2) * 0.3;
      poly.push({ x: d.x + ca * r * wobble, y: d.y + sa * r * wobble });
    }
    d.poly = poly;
    d.radius = maxR;

    // Bounding box and true area of the finished polygon. Street spacing and
    // building counts key off these so every district ends up with a
    // consistent urban density regardless of how big the Voronoi cell grew.
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    let area2 = 0;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const p = poly[i];
      if (p.x < x0) x0 = p.x;
      if (p.y < y0) y0 = p.y;
      if (p.x > x1) x1 = p.x;
      if (p.y > y1) y1 = p.y;
      area2 += poly[j].x * p.y - p.x * poly[j].y;
    }
    d.bbox = { x0, y0, x1, y1 };
    d.area = Math.abs(area2) / 2;
  }

  const districtAt = (x, y) => {
    for (let k = 0; k < districts.length; k++) if (pointInPoly(x, y, districts[k].poly)) return k;
    return -1;
  };

  // ---- river through the city, ending at the coast ----
  const river = [];
  {
    let x = WORLD_W * 0.06;
    let y = WORLD_H * 0.10;
    const tx = cx + spread * 0.30;
    for (let i = 0; i <= 90; i++) {
      const t = i / 90;
      const bx = x + (tx - x) * t;
      const by = y + (coastYAt(bx) + 30 - y) * (t * t * 0.7 + t * 0.3);
      river.push({ x: bx + nC(t * 6, 3.1) * 190, y: by + nC(t * 6, 8.7) * 130 });
    }
  }

  // Distance to the river, so nothing gets built in it. Sampled against the
  // polyline directly — it is only ~90 points and the check runs a few
  // thousand times during generation.
  const riverDist = (x, y) => {
    let best = Infinity;
    for (let i = 0; i < river.length - 1; i++) {
      const a = river[i];
      const b = river[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len2 = dx * dx + dy * dy;
      let t = len2 ? ((x - a.x) * dx + (y - a.y) * dy) / len2 : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const d = Math.hypot(x - (a.x + dx * t), y - (a.y + dy * t));
      if (d < best) best = d;
    }
    return best;
  };
  const RIVER_BANK = 62;

  // ---- roads ----
  const hub = districts.find((d) => d.key === 'central');
  const roads = { motorway: [], arterials: [], collectors: [], streets: [] };

  const ringR = spread * 0.30;
  for (let a = 0; a <= 96; a++) {
    const t = (a / 96) * Math.PI * 2;
    const rr = ringR * (0.92 + nC(Math.cos(t) * 2.2, Math.sin(t) * 2.2) * 0.3);
    const px = hub.x + Math.cos(t) * rr;
    const py = hub.y + Math.sin(t) * rr * 0.86;
    roads.motorway.push({ x: px, y: py, water: isWater(px, py) });
  }

  // Arterials start from a ring around the centre rather than a single point,
  // so the inner city gets a junction pattern instead of a nine-road star.
  for (const d of districts) {
    if (d.key === 'central') continue;
    const ang = Math.atan2(d.y - hub.y, d.x - hub.x);
    const startR = 90 + rng() * 120;
    const sx = hub.x + Math.cos(ang) * startR;
    const sy = hub.y + Math.sin(ang) * startR;
    const mx = (sx + d.x) / 2 + (rng() - 0.5) * 220;
    const my = (sy + d.y) / 2 + (rng() - 0.5) * 220;
    const pts = [];
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const it = 1 - t;
      pts.push({
        x: it * it * sx + 2 * it * t * mx + t * t * d.x,
        y: it * it * sy + 2 * it * t * my + t * t * d.y,
      });
    }
    roads.arterials.push(pts);
  }

  // Collectors ring each district and connect it to its nearest neighbour.
  districts.forEach((d, k) => {
    let bestJ = -1;
    let bestD = Infinity;
    districts.forEach((o, j) => {
      if (j === k) return;
      const dd = Math.hypot(o.x - d.x, o.y - d.y);
      if (dd < bestD) { bestD = dd; bestJ = j; }
    });
    if (bestJ > k) {
      const o = districts[bestJ];
      roads.collectors.push([{ x: d.x, y: d.y }, { x: (d.x + o.x) / 2 + (rng() - 0.5) * 120, y: (d.y + o.y) / 2 + (rng() - 0.5) * 120 }, { x: o.x, y: o.y }]);
    }
  });

  // Each district gets one street orientation and one block size, shared by
  // the street grid and the buildings, so the two actually line up.
  districts.forEach((d) => {
    d.ang = rng() * Math.PI;
    const base = d.key === 'central' ? 74 : d.organic ? 84 : d.key === 'southside' ? 92 : 120;
    d.step = base / Math.max(0.4, d.density);
    // Sweep across the polygon's own extent rather than the uncapped Voronoi
    // radius, so no time is spent testing points nowhere near the district.
    d.reach = Math.hypot(d.bbox.x1 - d.bbox.x0, d.bbox.y1 - d.bbox.y0) * 0.55;
  });

  districts.forEach((d, k) => {
    if (d.fortress) return;
    for (let dir = 0; dir < 2; dir++) {
      const a = d.ang + (dir ? Math.PI / 2 : 0);
      const ca = Math.cos(a);
      const sa = Math.sin(a);
      const px = Math.cos(a + Math.PI / 2);
      const py = Math.sin(a + Math.PI / 2);
      for (let s = -d.reach; s <= d.reach; s += d.step) {
        // The Old Quarter's streets bend; everywhere else is a grid.
        const bend = d.organic ? 14 : 0;
        let run = null;
        for (let t = -d.reach; t <= d.reach; t += 10) {
          const bx = d.x + px * s + ca * t + (bend ? nC(t * 0.02, s * 0.02) * bend : 0);
          const by = d.y + py * s + sa * t + (bend ? nC(t * 0.02 + 9, s * 0.02) * bend : 0);
          const ok = pointInPoly(bx, by, d.poly);
          if (ok) {
            if (!run) run = [];
            run.push({ x: bx, y: by });
          } else if (run) {
            if (run.length > 3) roads.streets.push({ pts: run, k });
            run = null;
          }
        }
        if (run && run.length > 3) roads.streets.push({ pts: run, k });
      }
    }
  });

  // ---- parks, woodland, buildings ----
  const parks = [];
  districts.forEach((d, k) => {
    const n = d.green ? 3 : d.key === 'central' ? 1 : 2;
    for (let i = 0; i < n; i++) {
      let px = d.x;
      let py = d.y;
      let found = false;
      for (let t = 0; t < 40; t++) {
        const a = rng() * Math.PI * 2;
        const r = Math.sqrt(rng()) * d.radius * 0.7;
        px = d.x + Math.cos(a) * r;
        py = d.y + Math.sin(a) * r;
        if (pointInPoly(px, py, d.poly)) { found = true; break; }
      }
      if (!found || riverDist(px, py) < RIVER_BANK) continue;
      const rad = (18 + rng() * 46) * (d.green ? 1.5 : 1);
      const poly = [];
      for (let a = 0; a < 20; a++) {
        const ang = (a / 20) * Math.PI * 2;
        const rr = rad * (0.7 + nC(Math.cos(ang) * 2 + i * 5 + k, Math.sin(ang) * 2) * 0.5);
        poly.push({ x: px + Math.cos(ang) * rr, y: py + Math.sin(ang) * rr });
      }
      parks.push({ x: px, y: py, r: rad, poly, district: k });
    }
  });

  // Woodland fills the countryside between districts. Trees are grown in
  // clusters rather than sprinkled uniformly, otherwise the countryside reads
  // as confetti instead of forest.
  const cg = CLIMATE_GROUND[climate] || CLIMATE_GROUND.temperate;
  const woods = [];
  const clusters = Math.round(150 * cg.veg);
  for (let c = 0; c < clusters * 5 && woods.length < clusters * 26; c++) {
    const ox = rng() * WORLD_W;
    const oy = rng() * WORLD_H;
    if (isWater(ox, oy) || districtAt(ox, oy) >= 0) continue;
    if (nC(ox * 0.0011, oy * 0.0011) < -0.06) continue;
    const spreadR = 60 + rng() * 190;
    const n = 14 + Math.floor(rng() * 26);
    for (let i = 0; i < n; i++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * spreadR;
      const x = ox + Math.cos(a) * r;
      const y = oy + Math.sin(a) * r;
      if (x < 0 || y < 0 || x > WORLD_W || y > WORLD_H) continue;
      if (isWater(x, y) || districtAt(x, y) >= 0) continue;
      woods.push({ x, y, r: 9 + rng() * 20 });
    }
  }

  // roads -> blocks -> lots -> buildings.
  //
  // Buildings are laid out inside the cells the street grid creates, then
  // subdivided into lots, so footprints front onto streets and back onto each
  // other the way real blocks do. Quads are stored pre-rotated as flat
  // coordinates: one path per district draws thousands of them in one call.
  const buildings = [];
  districts.forEach((d, k) => {
    if (d.fortress) return;
    const ux = Math.cos(d.ang);
    const uy = Math.sin(d.ang);
    const vx = -uy;
    const vy = ux;
    const step = d.step;
    const setback = step * 0.17;
    const inner = step - setback * 2;
    const districtParks = parks.filter((p) => p.district === k);
    const quads = [];
    const tallFlags = [];

    for (let a = -d.reach; a <= d.reach; a += step) {
      for (let b = -d.reach; b <= d.reach; b += step) {
        const ca = a + step / 2;
        const cb = b + step / 2;
        const wx = d.x + ux * ca + vx * cb;
        const wy = d.y + uy * ca + vy * cb;
        if (!pointInPoly(wx, wy, d.poly)) continue;
        if (riverDist(wx, wy) < RIVER_BANK + step * 0.4) continue;
        if (districtParks.some((p) => Math.hypot(p.x - wx, p.y - wy) < p.r + step * 0.3)) continue;

        // Subdivide the block into lots. Denser districts pack more, smaller
        // lots into the same block.
        const lots = d.density > 0.8 ? 2 + Math.floor(rng() * 3) : 1 + Math.floor(rng() * 2);
        const lotSize = inner / lots;
        for (let li = 0; li < lots; li++) {
          for (let lj = 0; lj < lots; lj++) {
            if (rng() > 0.86) continue; // gaps: yards, car parks, empty lots
            const gap = lotSize * (0.10 + rng() * 0.14);
            const la = a + setback + li * lotSize + gap / 2;
            const lb = b + setback + lj * lotSize + gap / 2;
            const w = lotSize - gap;
            const h = lotSize - gap;
            const x0 = la;
            const y0 = lb;
            const x1 = la + w;
            const y1 = lb + h;
            quads.push(
              d.x + ux * x0 + vx * y0, d.y + uy * x0 + vy * y0,
              d.x + ux * x1 + vx * y0, d.y + uy * x1 + vy * y0,
              d.x + ux * x1 + vx * y1, d.y + uy * x1 + vy * y1,
              d.x + ux * x0 + vx * y1, d.y + uy * x0 + vy * y1
            );
            tallFlags.push(d.tall && rng() > 0.55 ? 1 : 0);
          }
        }
      }
    }
    buildings.push({ district: k, color: d.color, quads: Float32Array.from(quads), tall: Uint8Array.from(tallFlags) });
  });

  // ---- POIs ----
  const pois = POI_DEFS.map((p) => {
    const k = districts.findIndex((d) => d.key === p.d);
    const d = districts[k];
    let px = d.x;
    let py = d.y;
    for (let t = 0; t < 80; t++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * d.radius * 0.85;
      const tx = d.x + Math.cos(a) * r;
      const ty = d.y + Math.sin(a) * r;
      if (pointInPoly(tx, ty, d.poly)) { px = tx; py = ty; break; }
    }
    return { ...p, x: px, y: py, district: d.name };
  });

  // Runways for the Skyport district.
  const runways = [];
  {
    const sp = districts.find((d) => d.key === 'skyport');
    const a = rng() * Math.PI;
    const len = Math.min(sp.bbox.x1 - sp.bbox.x0, sp.bbox.y1 - sp.bbox.y0) * 0.34;
    for (let i = 0; i < 2; i++) {
      const off = (i - 0.5) * 90;
      runways.push({
        x1: sp.x + Math.cos(a) * -len + Math.cos(a + Math.PI / 2) * off,
        y1: sp.y + Math.sin(a) * -len + Math.sin(a + Math.PI / 2) * off,
        x2: sp.x + Math.cos(a) * len + Math.cos(a + Math.PI / 2) * off,
        y2: sp.y + Math.sin(a) * len + Math.sin(a + Math.PI / 2) * off,
      });
    }
  }

  return {
    kind: 'city', seed: seedStr, cityName, climate,
    districts, districtAt, pointInPoly, isWater,
    coastPoly, river, roads, parks, woods, buildings, pois, runways,
    spread, center: { x: cx, y: cy },
  };
}

/* ------------------------------------------------------ CITY RENDER */

// Fully vector, drawn under the camera transform, so the city stays sharp at
// every zoom level. `lod` is world-units-per-screen-pixel scale (higher = more
// zoomed in) and gates which layers are worth drawing.
export function drawCity(ctx, city, styleKey, scale, layers) {
  const P = palette(styleKey);
  const cg = CLIMATE_GROUND[city.climate] || CLIMATE_GROUND.temperate;
  const ground = cg[styleKey] || cg.satellite;

  ctx.fillStyle = ground;
  ctx.fillRect(0, 0, WORLD_W, WORLD_H);

  // Woodland
  if (scale > 0.12) {
    ctx.fillStyle = styleKey === 'map' ? '#cfe3bd' : cg.vegColor;
    ctx.globalAlpha = styleKey === 'map' ? 0.9 : 0.55;
    for (const w of city.woods) {
      ctx.beginPath();
      ctx.arc(w.x, w.y, w.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Water
  ctx.fillStyle = P.water;
  ctx.beginPath();
  city.coastPoly.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = P.water;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  for (let seg = 0; seg < 3; seg++) {
    const from = Math.floor((city.river.length * seg) / 3);
    const to = Math.min(city.river.length, Math.floor((city.river.length * (seg + 1)) / 3) + 1);
    if (to - from < 2) continue;
    ctx.lineWidth = 22 + seg * 20;
    ctx.beginPath();
    ctx.moveTo(city.river[from].x, city.river[from].y);
    // Curve through the midpoints so a widened river doesn't show the
    // corners of its own polyline.
    for (let i = from + 1; i < to - 1; i++) {
      const a = city.river[i];
      const b = city.river[i + 1];
      ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2);
    }
    ctx.lineTo(city.river[to - 1].x, city.river[to - 1].y);
    ctx.stroke();
  }

  // District fills
  if (layers.districts) {
    for (const d of city.districts) {
      ctx.beginPath();
      d.poly.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.closePath();
      ctx.fillStyle = d.color;
      // Territory tint fades out as you zoom in, handing the view over to
      // streets and buildings rather than washing them in colour.
      const fade = Math.max(0.22, Math.min(1, 1.5 - scale));
      ctx.globalAlpha = (styleKey === 'map' ? 0.12 : 0.20) * fade;
      ctx.fill();
      ctx.globalAlpha = 1;
      const px = 1 / Math.max(0.02, scale);
      ctx.strokeStyle = styleKey === 'map' ? 'rgba(120,130,145,.5)' : 'rgba(226,232,240,.42)';
      ctx.lineWidth = 1.6 * px;
      ctx.setLineDash([7 * px, 6 * px]);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }

  // Parks
  ctx.fillStyle = styleKey === 'map' ? '#c3e0ac' : '#3f6b3a';
  for (const p of city.parks) {
    ctx.beginPath();
    p.poly.forEach((q, i) => (i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y)));
    ctx.closePath();
    ctx.fill();
  }

  // Runways
  ctx.strokeStyle = styleKey === 'map' ? '#d8d5cf' : '#4a4a52';
  ctx.lineWidth = 14;
  ctx.lineCap = 'butt';
  for (const r of city.runways) {
    ctx.beginPath();
    ctx.moveTo(r.x1, r.y1);
    ctx.lineTo(r.x2, r.y2);
    ctx.stroke();
  }

  // Individual buildings only appear once you're close enough for them to
  // mean something — the same threshold behaviour a slippy map uses.
  if (layers.buildings !== false && scale > 0.45) {
    for (const group of city.buildings) {
      const q = group.quads;
      // Low blocks first, then the towers, so tall buildings read on top.
      for (let pass = 0; pass < 2; pass++) {
        ctx.beginPath();
        let any = false;
        for (let i = 0, b = 0; i < q.length; i += 8, b++) {
          if (group.tall[b] !== pass) continue;
          any = true;
          ctx.moveTo(q[i], q[i + 1]);
          ctx.lineTo(q[i + 2], q[i + 3]);
          ctx.lineTo(q[i + 4], q[i + 5]);
          ctx.lineTo(q[i + 6], q[i + 7]);
          ctx.closePath();
        }
        if (!any) continue;
        if (styleKey === 'map') {
          ctx.fillStyle = pass ? '#cfc7b8' : '#ded7cb';
          ctx.globalAlpha = 1;
        } else {
          ctx.fillStyle = group.color;
          ctx.globalAlpha = pass ? 0.85 : 0.5;
        }
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  // Road hierarchy, drawn casing-first so junctions merge like a real map.
  //
  // The canvas is already scaled by `scale`, so a stroke of N world units
  // paints N*scale screen pixels. Dividing by scale gives roads a constant
  // on-screen weight at every zoom level, which is what makes them read as
  // roads rather than hairlines when zoomed out.
  const lw = (screenPx) => screenPx / Math.max(0.02, scale);
  const drawPath = (pts, closed) => {
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    if (closed) ctx.closePath();
    ctx.stroke();
  };

  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (layers.roads !== false) {
    if (scale > 0.12) {
      ctx.strokeStyle = P.roadCase;
      ctx.lineWidth = lw(4.6);
      for (const s of city.roads.streets) drawPath(s.pts);
      ctx.strokeStyle = P.road;
      ctx.lineWidth = lw(3);
      ctx.globalAlpha = 0.95;
      for (const s of city.roads.streets) drawPath(s.pts);
      ctx.globalAlpha = 1;
    }

    ctx.strokeStyle = P.roadCase;
    ctx.lineWidth = lw(5);
    for (const c of city.roads.collectors) drawPath(c);
    ctx.strokeStyle = P.road;
    ctx.lineWidth = lw(3.2);
    for (const c of city.roads.collectors) drawPath(c);

    ctx.strokeStyle = P.roadCase;
    ctx.lineWidth = lw(5.4);
    for (const a of city.roads.arterials) drawPath(a);
    ctx.strokeStyle = styleKey === 'map' ? '#fdf6e3' : P.road;
    ctx.lineWidth = lw(3.4);
    for (const a of city.roads.arterials) drawPath(a);

    // Motorway: skip the stretch that would run through the bay.
    const land = city.roads.motorway.filter((p) => !p.water);
    ctx.strokeStyle = styleKey === 'map' ? '#e8a33d' : 'rgba(30,20,6,.6)';
    ctx.lineWidth = lw(10);
    drawPath(land);
    ctx.strokeStyle = styleKey === 'map' ? '#fcd34d' : '#facc15';
    ctx.lineWidth = lw(6.5);
    drawPath(land);
  }
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
    for (let t = 0; t < 60; t++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * d.radius * 0.8;
      const tx = d.x + Math.cos(a) * r;
      const ty = d.y + Math.sin(a) * r;
      if (city.pointInPoly(tx, ty, d.poly)) { x = tx; y = ty; break; }
    }
    out.push({
      kind: 'made', x, y,
      label: p.alias,
      card: `${p.card}${p.suit === 'spades' ? '♠' : p.suit === 'hearts' ? '♥' : p.suit === 'clubs' ? '♣' : '♦'}`,
      data: p,
    });
  }

  // Sick 52 hold the margins outside the districts, and they operate in cells:
  // a handful of safe houses with several members each, not 52 lone dots.
  const cellCount = 9;
  const cells = [];
  for (let c = 0; c < cellCount; c++) {
    for (let t = 0; t < 400; t++) {
      const x = WORLD_W * (0.05 + rng() * 0.9);
      const y = WORLD_H * (0.05 + rng() * 0.9);
      if (city.isWater(x, y) || city.districtAt(x, y) >= 0) continue;
      if (cells.some((p) => Math.hypot(p.x - x, p.y - y) < 420)) continue;
      cells.push({ x, y });
      break;
    }
  }
  if (!cells.length) cells.push({ x: WORLD_W * 0.1, y: WORLD_H * 0.1 });

  sickList.forEach((s, i) => {
    const base = cells[i % cells.length];
    let x = base.x;
    let y = base.y;
    for (let t = 0; t < 40; t++) {
      const a = rng() * Math.PI * 2;
      const r = Math.sqrt(rng()) * 150;
      const tx = base.x + Math.cos(a) * r;
      const ty = base.y + Math.sin(a) * r;
      if (city.isWater(tx, ty) || city.districtAt(tx, ty) >= 0) continue;
      x = tx;
      y = ty;
      break;
    }
    out.push({ kind: 'sick', x, y, label: s.name, card: s.cardLabel || '', cell: i % cells.length, data: s });
  });

  return out;
}
