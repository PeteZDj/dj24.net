// =====================================================================
// PLANET ONGAKU — LABEL ENGINE
//
// Every name on the map goes through this. Candidates are measured, tried
// against a ranked list of anchor positions around their feature, and dropped
// outright when nothing fits. Dropping is the point: a map that draws every
// name is unreadable, and a map that draws the important names in the right
// places reads like an atlas.
//
// Placement runs in screen space, so text keeps a constant size at every zoom
// and the same code serves the interactive canvas, the PNG export and the
// headless atlas renderer.
// =====================================================================

import { palette, FACTIONS, WORLD_W, WORLD_H } from './mapGenerator.js';
import { buildingInfo } from './cityDetail.js';

const TAU = Math.PI * 2;
const LABEL_FONT = 'Outfit, "Segoe UI", system-ui, sans-serif';

// Unit offsets around a point feature. Order is cartographic preference:
// right of the dot first, then left, then above/below, then the diagonals.
const POINT_ANCHORS = [
  [1, 0], [-1, 0], [0, -1], [0, 1],
  [0.74, -0.74], [-0.74, -0.74], [0.74, 0.74], [-0.74, 0.74],
];

// Area labels want to sit on their centroid, but will walk a short ladder of
// offsets (in ems) before giving up, which is usually enough to dodge a POI
// pin sitting in the middle of a district.
const AREA_NUDGES = [
  [0, 0], [0, -1.35], [0, 1.35], [-1.1, 0], [1.1, 0],
  [0, -2.7], [0, 2.7], [-1.1, -1.35], [1.1, -1.35], [-1.1, 1.35], [1.1, 1.35],
];

export function makeLabeller(ctx, W, H, opts = {}) {
  const pad = opts.pad ?? 2;
  const margin = opts.margin ?? 4;
  // A uniform hash keeps collision tests near-constant as label count grows.
  const CELL = 88;
  const grid = new Map();
  const queue = [];

  const eachCell = (r, fn) => {
    const x0 = Math.floor(r.x0 / CELL);
    const x1 = Math.floor(r.x1 / CELL);
    const y0 = Math.floor(r.y0 / CELL);
    const y1 = Math.floor(r.y1 / CELL);
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) fn(`${x}:${y}`);
  };

  const hits = (r) => {
    let bad = false;
    eachCell(r, (key) => {
      if (bad) return;
      const bucket = grid.get(key);
      if (!bucket) return;
      for (const o of bucket) {
        if (r.x0 - pad < o.x1 && r.x1 + pad > o.x0 && r.y0 - pad < o.y1 && r.y1 + pad > o.y0) {
          bad = true;
          return;
        }
      }
    });
    return bad;
  };

  const insert = (r) => {
    eachCell(r, (key) => {
      let bucket = grid.get(key);
      if (!bucket) grid.set(key, (bucket = []));
      bucket.push(r);
    });
  };

  // Canvas font parsing only accepts hundreds; an in-between weight is not
  // rejected loudly, it silently measures to nonsense and the label vanishes.
  const fontOf = (it) => {
    const w = Math.max(100, Math.min(900, Math.round((it.weight || 600) / 100) * 100));
    return `${it.italic ? 'italic ' : ''}${w} ${it.size}px ${LABEL_FONT}`;
  };

  const widthOf = (it) => {
    ctx.font = fontOf(it);
    const w = ctx.measureText(it.text).width;
    return it.tracking ? w + it.tracking * Math.max(0, it.text.length - 1) : w;
  };

  function place(it) {
    const w = widthOf(it);
    // Cap height plus descender is a close enough box, and avoids the wildly
    // inconsistent actualBoundingBox values across canvas implementations.
    const asc = it.size * 0.76;
    const desc = it.size * 0.24;
    const h = asc + desc;
    const cands = [];

    if (it.area) {
      for (const [nx, ny] of AREA_NUDGES) {
        cands.push({ x0: it.x - w / 2 + nx * it.size, y0: it.y - h / 2 + ny * it.size });
      }
      // A feature with a known extent can slide its name anywhere inside it,
      // nearest position first. This is what keeps mountain ranges and deserts
      // on the map in a crowded hemisphere instead of being dropped.
      if (it.spread) {
        const sp = it.spread;
        const pts = [];
        for (let iy = 0; iy < 3; iy++) {
          for (let ix = 0; ix < 5; ix++) {
            const px = sp.x0 + ((ix + 0.5) / 5) * (sp.x1 - sp.x0);
            const py = sp.y0 + ((iy + 0.5) / 3) * (sp.y1 - sp.y0);
            pts.push([px, py, (px - it.x) ** 2 + (py - it.y) ** 2]);
          }
        }
        pts.sort((a, b) => a[2] - b[2]);
        for (const [px, py] of pts) cands.push({ x0: px - w / 2, y0: py - h / 2 });
      }
    } else {
      const gap = (it.gap ?? 4) + (it.r || 0);
      for (const [dx, dy] of POINT_ANCHORS) {
        const cx = it.x + dx * gap + (dx > 0 ? w / 2 : dx < 0 ? -w / 2 : 0);
        const cy = it.y + dy * gap + (dy > 0 ? h / 2 : dy < 0 ? -h / 2 : 0);
        cands.push({ x0: cx - w / 2, y0: cy - h / 2 });
      }
    }

    for (const c of cands) {
      let { x0, y0 } = c;
      if (it.clamp) {
        // Big geography names stay on screen rather than vanishing when their
        // centroid drifts past the edge — an ocean has no better anchor.
        if (w < W - margin * 2) x0 = Math.max(margin, Math.min(W - margin - w, x0));
        if (h < H - margin * 2) y0 = Math.max(margin, Math.min(H - margin - h, y0));
      }
      const r = { x0, y0, x1: x0 + w, y1: y0 + h };
      if (r.x0 < margin || r.y0 < margin || r.x1 > W - margin || r.y1 > H - margin) continue;
      // A name that has been allowed to wander must still land on the thing it
      // names — an ocean label sliding onto the continent is worse than none.
      if (it.valid && !it.valid((r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2)) continue;
      if (hits(r)) continue;
      insert(r);
      return { x0: r.x0, y0: r.y0, baseline: r.y0 + asc, w, h };
    }
    return null;
  }

  function run(it, box, stroke) {
    if (!it.tracking) {
      if (stroke) ctx.strokeText(it.text, box.x0, box.baseline);
      else ctx.fillText(it.text, box.x0, box.baseline);
      return;
    }
    let x = box.x0;
    for (const ch of it.text) {
      if (stroke) ctx.strokeText(ch, x, box.baseline);
      else ctx.fillText(ch, x, box.baseline);
      x += ctx.measureText(ch).width + it.tracking;
    }
  }

  function paint(it, box) {
    ctx.font = fontOf(it);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    ctx.lineWidth = it.haloWidth ?? Math.max(2.5, it.size / 3.2);
    ctx.strokeStyle = it.halo;
    run(it, box, true);
    ctx.fillStyle = it.color;
    run(it, box, false);
  }

  const early = [];
  const earlyDropped = [];

  return {
    // Markers, pins and anything else text must not sit on top of.
    reserve(x0, y0, x1, y1) { insert({ x0, y0, x1, y1 }); },
    // Claims its box straight away, ahead of any marker reserved later. The
    // title of whatever you are looking at has to win outright — it cannot be
    // outbid by a restaurant pin that happened to be registered first.
    addFirst(item) {
      if (!item.text) return false;
      const box = place(item);
      if (box) early.push([item, box]);
      else earlyDropped.push(item.text);
      return !!box;
    },
    reserveCircle(x, y, r) { insert({ x0: x - r, y0: y - r, x1: x + r, y1: y + r }); },
    // For callers that place their own marks and want to avoid stacking them.
    circleFree(x, y, r) { return !hits({ x0: x - r, y0: y - r, x1: x + r, y1: y + r }); },
    add(item) { if (item.text) queue.push(item); },
    // Places every queued label highest priority first, then paints. Painting
    // is a second pass so no halo can bite into a neighbour's glyphs.
    flush() {
      queue.sort((a, b) => (b.priority || 0) - (a.priority || 0));
      const placed = [];
      const dropped = [];
      for (const it of queue) {
        const box = place(it);
        if (box) placed.push([it, box]);
        else dropped.push(it.text);
      }
      for (const [it, box] of early) paint(it, box);
      for (const [it, box] of placed) paint(it, box);
      const total = placed.length + early.length;
      const missed = [...earlyDropped, ...dropped];
      queue.length = 0;
      early.length = 0;
      earlyDropped.length = 0;
      return { placed: total, dropped: missed.length, droppedText: missed };
    },
  };
}

/* ----------------------------------------------------- place pins -- */

export const POI_TYPES = {
  landmark: { label: 'Landmarks', color: '#FBBF24' },
  venue: { label: 'Venues & studios', color: '#E879F9' },
  food: { label: 'Restaurants & cafés', color: '#FB923C' },
  front: { label: 'Mafia fronts', color: '#D4AF37' },
  civic: { label: 'Civic & institutions', color: '#38BDF8' },
  transit: { label: 'Transit', color: '#60A5FA' },
  park: { label: 'Parks & recreation', color: '#4ADE80' },
  military: { label: 'Military', color: '#34D399' },
};

// Which pins survive when a street cannot hold them all. Landmarks are what
// you would print on a tourist map, so they go first.
const PIN_RANK = { landmark: 8, transit: 6, venue: 4, civic: 3, front: 2, military: 2, park: 1, food: 0 };

/* ------------------------------------------------ PLANET LABEL LAYER */

// Size and weight per settlement class, the marker radius, and the zoom below
// which the place is not worth drawing at all.
const CITY_LABEL = {
  capital: { size: 15.0, weight: 800, priority: 100, minZoom: 0, dot: 8.0, ring: true },
  mega: { size: 13.5, weight: 700, priority: 88, minZoom: 0, dot: 6.5 },
  fortress: { size: 12.0, weight: 700, priority: 84, minZoom: 0.15, dot: 5.5, square: true },
  military: { size: 12.0, weight: 700, priority: 82, minZoom: 0.15, dot: 5.5, square: true },
  hostile: { size: 12.0, weight: 600, priority: 80, minZoom: 0.15, dot: 5.5 },
  port: { size: 12.0, weight: 600, priority: 78, minZoom: 0.15, dot: 5.5 },
  town: { size: 11.0, weight: 600, priority: 72, minZoom: 0.26, dot: 4.0, hollow: true },
  // Villages and outposts only appear once you are looking at a region rather
  // than a planet. Drawn at world scale they bury the geography.
  // A castle is a landmark long before it is a settlement, so it shows up at
  // the same zoom as a town even though almost nobody lives there.
  castle: { size: 11.5, weight: 700, priority: 76, minZoom: 0.2, dot: 5.0, square: true },
  village: { size: 10.0, weight: 600, priority: 46, minZoom: 0.62, dot: 3.2, hollow: true },
  outpost: { size: 9.5, weight: 500, priority: 38, minZoom: 1.4, dot: 2.4, hollow: true },
};

const REGION_LABEL = {
  continent: { size: 26, weight: 700, tracking: 9.0, caps: true, priority: 68, maxZoom: 1.1, tone: 'geo' },
  ocean: { size: 21, weight: 500, tracking: 4.5, italic: true, priority: 64, maxZoom: 2.0, tone: 'water' },
  range: { size: 15, weight: 600, tracking: 1.2, italic: true, priority: 60, maxZoom: 7, tone: 'geo' },
  desert: { size: 15, weight: 600, tracking: 1.2, italic: true, priority: 58, maxZoom: 7, tone: 'geo' },
  forest: { size: 14, weight: 600, tracking: 1.0, italic: true, priority: 56, maxZoom: 7, tone: 'geo' },
};

// Geography names grow a little as you zoom in, so a mountain range does not
// read as a footnote once you are inside it. The growth is deliberately slow.
function geoZoomScale(z) {
  return Math.max(0.9, Math.min(1.5, (Math.max(z, 0.05) / 0.3) ** 0.17));
}

export function drawPlanetLabels(ctx, planet, styleKey, view, opts = {}) {
  const { ox, oy, z, W, H } = view;
  const k = opts.sizeScale || 1;
  const P = palette(styleKey);
  const L = makeLabeller(ctx, W, H, { pad: 2, margin: opts.margin ?? 4 });
  const details = opts.details;
  const layers = opts.layers || {};

  // Sea/land test in screen space, straight off the elevation field.
  const isSea = (sx, sy) => {
    const gx = Math.max(0, Math.min(planet.GW - 1, Math.round((((sx - ox) / z) / WORLD_W) * (planet.GW - 1))));
    const gy = Math.max(0, Math.min(planet.GH - 1, Math.round((((sy - oy) / z) / WORLD_H) * (planet.GH - 1))));
    return planet.hf[gy * planet.GW + gx] <= 0.002;
  };
  const isLand = (sx, sy) => !isSea(sx, sy);

  // Markers become obstacles before any text is placed, so a name is never
  // allowed to sit on a dot — the dot is the thing being named.
  const marks = [];
  for (const c of planet.cities) {
    const st = CITY_LABEL[c.kind] || CITY_LABEL.town;
    if (z < st.minZoom) continue;
    const x = c.x * z + ox;
    const y = c.y * z + oy;
    // A city whose centre has panned off screen can still fill it, so the
    // sprawl radius counts towards visibility, not just the centre point.
    const rr = (c.radius || 0) * z;
    if (x < -80 - rr || y < -60 - rr || x > W + 80 + rr || y > H + 60 + rr) continue;
    // Once the footprint fills the screen the streets carry the city, and the
    // dot is just something sitting on top of them.
    const showDot = rr < 46 * k;
    const r = showDot ? st.dot * k : 0;
    marks.push({ c, st, x, y, r, showDot });
    if (showDot) L.reserveCircle(x, y, r + 3 * k);
  }

  for (const m of marks) {
    if (!m.showDot) continue;
    const f = FACTIONS[m.c.faction] || FACTIONS.neutral;
    const r = m.r;
    ctx.lineWidth = 2 * k;
    ctx.beginPath();
    if (m.st.square) ctx.rect(m.x - r, m.y - r, r * 2, r * 2);
    else ctx.arc(m.x, m.y, r, 0, TAU);
    ctx.fillStyle = m.st.hollow ? P.labelHalo : f.color;
    ctx.fill();
    ctx.strokeStyle = m.st.hollow ? f.color : P.labelHalo;
    ctx.stroke();
    if (m.st.ring) {
      ctx.beginPath();
      ctx.arc(m.x, m.y, Math.max(1, r - 3.4 * k), 0, TAU);
      ctx.fillStyle = P.labelHalo;
      ctx.fill();
    }
  }

  // Titles claim their space before anything else is reserved: a city you have
  // flown down into must always be named, whatever is on its streets.
  if (opts.labels !== false) {
    for (const m of marks) {
      if (m.showDot) continue;
      const reach = m.c.radius * z * 0.55;
      L.addFirst({
        text: m.c.name, area: true, clamp: true, x: m.x, y: m.y,
        size: m.st.size * k * 1.5, weight: m.st.weight, tracking: 2.5 * k,
        color: P.label, halo: P.labelHalo, priority: m.st.priority,
        valid: planet.hf ? isLand : null,
        spread: { x0: m.x - reach, y0: m.y - reach, x1: m.x + reach, y1: m.y + reach },
      });
    }
  }

  // Quarter names are structural too, so they claim their space alongside the
  // city title rather than competing with the places inside them.
  if (opts.labels !== false) {
    for (const m of marks) {
      // Quarters appear only once a quarter is a real area on screen, which is
      // the same moment the block texture starts to read.
      if (!m.c.sectors || m.c.radius * z < 170 * k) continue;
      const det = details && details.get(m.c.name);
      for (const s of m.c.sectors) {
        if (!s.name) continue;
        const sx = (s.lx ?? s.x) * z + ox;
        const sy = (s.ly ?? s.y) * z + oy;
        if (sx < -60 || sy < -40 || sx > W + 60 || sy > H + 40) continue;
        // Once the quarter is tinted with its own colour the label takes it,
        // so the name and the territory read as the same thing.
        const tint = det && det.quarters.find((q) => q.name === s.name);
        // Let the name move around inside its own quarter rather than lose
        // its slot to whatever pin happens to sit on the middle of it.
        const reach = m.c.radius * z * 0.28;
        L.addFirst({
          text: s.name.toUpperCase(), area: true, x: sx, y: sy,
          spread: { x0: sx - reach, y0: sy - reach, x1: sx + reach, y1: sy + reach },
          valid: planet.hf ? isLand : null,
          size: 12.5 * k, weight: 700, tracking: 1.4 * k,
          color: tint && styleKey !== 'map' ? tint.color : P.labelGeo,
          halo: P.labelHalo, priority: 74,
        });
      }
    }
  }

  /* ---- streamed detail: places and crew, both drawn as pins ---- */
  const pins = [];
  if (details && layers.pois !== false) {
    const pinR = 10 * k;
    for (const m of marks) {
      const det = details.get(m.c.name);
      if (!det || m.c.radius * z < (opts.poiZoom ?? 190)) continue;
      // Canon landmarks claim their space first, so what survives the thinning
      // as you pull back is the stuff that matters.
      const sorted = [...det.pois].sort((a, b) => (b.canon ? 1 : 0) - (a.canon ? 1 : 0) + (PIN_RANK[b.type] || 0) - (PIN_RANK[a.type] || 0));
      for (const poi of sorted) {
        if (opts.placeTypes && opts.placeTypes[poi.type] === false) continue;
        const x = poi.x * z + ox;
        const y = poi.y * z + oy;
        if (x < -40 || y < -40 || x > W + 40 || y > H + 40) continue;
        // Pins thin themselves out rather than piling up: the ones that fit
        // are drawn, the rest wait until you are closer.
        if (!L.circleFree(x, y, pinR)) continue;
        L.reserveCircle(x, y, pinR + 1);
        pins.push({ poi, x, y });
      }
    }
  }

  const crew = [];
  if (opts.crew && opts.crew.length) {
    const cr = 8 * k;
    for (const mem of opts.crew) {
      if (mem.kind === 'made' && layers.made === false) continue;
      if (mem.kind === 'sick' && layers.sick === false) continue;
      // The seven at the stronghold are the point of the stronghold, so they
      // appear as soon as it is worth looking at rather than at street zoom.
      if (z < (mem.hold ? 1.6 : opts.crewZoom ?? 8)) continue;
      let x = mem.x * z + ox;
      let y = mem.y * z + oy;
      if (x < -30 || y < -30 || x > W + 30 || y > H + 30) continue;
      // A Sick 52 cell is five or six people in one safe house; walk them out
      // along a short spiral so the cell reads as a cell.
      if (!L.circleFree(x, y, cr)) {
        let ok = false;
        for (let t = 1; t <= 10; t++) {
          const a = t * 2.4;
          const nx = x + Math.cos(a) * cr * 1.9 * Math.sqrt(t);
          const ny = y + Math.sin(a) * cr * 1.9 * Math.sqrt(t);
          if (L.circleFree(nx, ny, cr)) { x = nx; y = ny; ok = true; break; }
        }
        if (!ok) continue;
      }
      L.reserveCircle(x, y, cr);
      crew.push({ mem, x, y });
    }
  }

  for (const p of pins) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 10 * k, 0, TAU);
    ctx.fillStyle = styleKey === 'satellite' ? 'rgba(2,6,16,0.85)' : '#ffffff';
    ctx.fill();
    ctx.strokeStyle = POI_TYPES[p.poi.type]?.color || '#ffffff';
    ctx.lineWidth = 2 * k;
    ctx.stroke();
    ctx.font = `${11 * k}px system-ui, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = styleKey === 'satellite' ? '#ffffff' : '#111111';
    ctx.fillText(p.poi.icon, p.x, p.y + 0.5 * k);
    ctx.textBaseline = 'alphabetic';
  }

  for (const c of crew) {
    ctx.beginPath();
    ctx.arc(c.x, c.y, 8 * k, 0, TAU);
    ctx.fillStyle = c.mem.kind === 'made' ? '#D4AF37' : '#DC2626';
    ctx.fill();
    ctx.strokeStyle = '#0b1220';
    ctx.lineWidth = 1.5 * k;
    ctx.stroke();
    ctx.font = `700 ${8 * k}px ${LABEL_FONT}`;
    ctx.fillStyle = '#0b1220';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(c.mem.card.slice(0, 3), c.x, c.y + 0.5 * k);
    ctx.textBaseline = 'alphabetic';
  }

  if (opts.labels === false) return { placed: 0, dropped: 0 };

  for (const p of pins) {
    L.add({
      text: p.poi.name, x: p.x, y: p.y, r: 10 * k, gap: 4 * k,
      size: 11 * k, weight: 600, color: P.label, halo: P.labelHalo,
      priority: (p.poi.canon ? 52 : 44) + (PIN_RANK[p.poi.type] || 0),
    });
  }

  for (const c of crew) {
    L.add({
      text: c.mem.label, x: c.x, y: c.y, r: 8 * k, gap: 4 * k,
      size: 10.5 * k, weight: 700,
      color: c.mem.kind === 'made' ? '#b8860b' : '#b91c1c',
      halo: P.labelHalo,
      priority: c.mem.kind === 'made' ? 40 : 34,
    });
  }

  for (const m of marks) {
    // Cities big enough to be a title were placed above, ahead of the pins;
    // what is left here is the ordinary pin-and-name treatment.
    if (m.showDot) {
      L.add({
        text: m.c.name, x: m.x, y: m.y, r: m.r, gap: 5 * k,
        size: m.st.size * k, weight: m.st.weight,
        color: P.label, halo: P.labelHalo, priority: m.st.priority,
      });
    }

  }

  // Route shields. A numbered network is the difference between a map with
  // roads drawn on it and a road map you could navigate by, and a shield is
  // the only label that is allowed to sit on top of the thing it names.
  if (layers.roads !== false && planet.routes) {
    const SHIELD = {
      motorway: { minZoom: 0.22, w: 30, h: 17, size: 10.5, fill: '#1f4b8f', text: '#ffffff', edge: 'rgba(255,255,255,.85)' },
      highway: { minZoom: 0.5, w: 26, h: 15, size: 9.5, fill: '#ffffff', text: '#25303f', edge: 'rgba(40,50,64,.6)' },
      road: { minZoom: 1.3, w: 23, h: 13.5, size: 8.5, fill: '#f1efe9', text: '#4a5260', edge: 'rgba(74,82,96,.5)' },
    };
    for (const r of planet.routes) {
      const sh = SHIELD[r.cls];
      if (!sh || !r.ref || z < sh.minZoom) continue;

      // Anchor on the middle of the part of the route that is actually on
      // screen, so a shield never ends up marking a road you cannot see.
      let lo = -1;
      let hi = -1;
      for (let i = 0; i < r.pts.length; i++) {
        const px = r.pts[i].x * z + ox;
        const py = r.pts[i].y * z + oy;
        if (px < 0 || py < 0 || px > W || py > H) continue;
        if (lo < 0) lo = i;
        hi = i;
      }
      if (lo < 0 || hi - lo < 2) continue;
      const mid = r.pts[(lo + hi) >> 1];
      const mx = mid.x * z + ox;
      const my = mid.y * z + oy;

      const hw = (sh.w * k) / 2;
      const hh = (sh.h * k) / 2;
      if (!L.circleFree(mx, my, Math.max(hw, hh) + 2)) continue;
      L.reserve(mx - hw, my - hh, mx + hw, my + hh);

      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(mx - hw, my - hh, hw * 2, hh * 2, 3.5 * k);
      else ctx.rect(mx - hw, my - hh, hw * 2, hh * 2);
      ctx.fillStyle = sh.fill;
      ctx.fill();
      ctx.strokeStyle = sh.edge;
      ctx.lineWidth = 1.4 * k;
      ctx.stroke();
      ctx.font = `800 ${sh.size * k}px ${LABEL_FONT}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = sh.text;
      ctx.fillText(r.ref, mx, my + 0.5 * k);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    }
  }

  // Playable sites. Drawn as diamonds so they never read as another café: a
  // level marker is production data sitting on top of the world, not part of
  // it, and it should look like it.
  if (opts.levels && layers.levels !== false) {
    for (const lv of opts.levels) {
      const x = lv.x * z + ox;
      const y = lv.y * z + oy;
      if (x < -40 || y < -40 || x > W + 40 || y > H + 40) continue;
      const r = 11 * k;
      if (!L.circleFree(x, y, r)) continue;
      L.reserveCircle(x, y, r + 1);

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.rect(-r * 0.72, -r * 0.72, r * 1.44, r * 1.44);
      ctx.fillStyle = styleKey === 'satellite' ? 'rgba(2,6,16,0.9)' : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = lv.color;
      ctx.lineWidth = 2.4 * k;
      ctx.stroke();
      ctx.restore();

      ctx.font = `${10 * k}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = styleKey === 'satellite' ? '#ffffff' : '#111111';
      ctx.fillText(lv.icon, x, y + 0.5 * k);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';

      if (opts.labels !== false) {
        L.add({
          text: lv.name, x, y, r, gap: 4 * k,
          size: 11.5 * k, weight: 700, color: P.label, halo: P.labelHalo,
          priority: 86,
        });
      }
    }
  }

  // Race circuits are landmarks, so they get a pin and a name of their own
  // rather than waiting for a city model to stream in around them.
  if (planet.circuits && layers.pois !== false && (!opts.placeTypes || opts.placeTypes.landmark !== false)) {
    for (const ck of planet.circuits) {
      if (ck.r * z < 7) continue;
      const x = ck.x * z + ox;
      const y = ck.y * z + oy;
      if (x < -40 || y < -40 || x > W + 40 || y > H + 40) continue;
      const pr = 10 * k;
      if (!L.circleFree(x, y, pr)) continue;
      L.reserveCircle(x, y, pr + 1);
      ctx.beginPath();
      ctx.arc(x, y, pr, 0, TAU);
      ctx.fillStyle = styleKey === 'satellite' ? 'rgba(2,6,16,0.85)' : '#ffffff';
      ctx.fill();
      ctx.strokeStyle = POI_TYPES.landmark.color;
      ctx.lineWidth = 2 * k;
      ctx.stroke();
      ctx.font = `${11 * k}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = styleKey === 'satellite' ? '#ffffff' : '#111111';
      ctx.fillText('\u{1F3C1}', x, y + 0.5 * k);
      ctx.textBaseline = 'alphabetic';
      if (opts.labels !== false) {
        L.add({
          text: ck.name, x, y, r: pr, gap: 4 * k,
          size: 11.5 * k, weight: 700, color: P.label, halo: P.labelHalo,
          priority: 58,
        });
      }
    }
  }

  // Tenants. Once a footprint is big enough on screen to read a name inside
  // it, it gets one — which is the difference between a street of grey boxes
  // and a street you can walk down. The engine drops whatever does not fit, so
  // the density sorts itself out as you zoom.
  if (details && layers.tenants !== false && opts.labels !== false) {
    const cands = [];
    for (const m of marks) {
      const det = details.get(m.c.name);
      if (!det || !det.use) continue;
      const q = det.buildings;
      for (let i = 0, b = 0; i < q.length; i += 8, b++) {
        const bx = ((q[i] + q[i + 2] + q[i + 4] + q[i + 6]) / 4) * z + ox;
        const by = ((q[i + 1] + q[i + 3] + q[i + 5] + q[i + 7]) / 4) * z + oy;
        if (bx < -50 || by < -30 || bx > W + 50 || by > H + 30) continue;
        const wpx = Math.hypot(q[i + 2] - q[i], q[i + 3] - q[i + 1]) * z;
        const hpx = Math.hypot(q[i + 6] - q[i], q[i + 7] - q[i + 1]) * z;
        const span = Math.min(wpx, hpx);
        if (span < (opts.tenantSpan ?? 22)) continue;
        cands.push({ city: m.c.name, b, x: bx, y: by, span, tall: det.tall[b] === 1, use: det.useKeys[det.use[b]] });
      }
    }
    // Biggest first, and capped: past a few hundred the rest would be dropped
    // on collision anyway and only cost measuring time.
    cands.sort((a, b) => b.span - a.span);
    for (const c of cands.slice(0, 420)) {
      const info = buildingInfo(c.city, c.b, c.use);
      L.add({
        text: info.name, x: c.x, y: c.y, area: true,
        size: 9.5 * k, weight: c.tall ? 600 : 500,
        color: P.labelGeo, halo: P.labelHalo,
        priority: 6 + (c.tall ? 3 : 0),
      });
    }
  }

  const gz = geoZoomScale(z);
  for (const rg of planet.regions) {
    const st = REGION_LABEL[rg.kind];
    if (!st || z > st.maxZoom) continue;
    let x = rg.x * z + ox;
    let y = rg.y * z + oy;

    // A range wider than the screen still deserves its name. When the true
    // anchor pans out of view, re-anchor to the middle of whatever part of the
    // feature is still visible, and only give up when nothing is.
    if (rg.bbox && (x < 0 || y < 0 || x > W || y > H)) {
      const vx0 = Math.max(rg.bbox.x0 * z + ox, 0);
      const vy0 = Math.max(rg.bbox.y0 * z + oy, 0);
      const vx1 = Math.min(rg.bbox.x1 * z + ox, W);
      const vy1 = Math.min(rg.bbox.y1 * z + oy, H);
      if (vx1 - vx0 < W * 0.18 || vy1 - vy0 < H * 0.14) continue;
      x = (vx0 + vx1) / 2;
      y = (vy0 + vy1) / 2;
    } else if (x < -W * 0.4 || y < -H * 0.4 || x > W * 1.4 || y > H * 1.4) {
      continue;
    }

    // Let the name wander over part of its own extent, but not so far that it
    // ends up naming somewhere else.
    let spread = null;
    if (rg.bbox) {
      const bw = (rg.bbox.x1 - rg.bbox.x0) * z * 0.35;
      const bh = (rg.bbox.y1 - rg.bbox.y0) * z * 0.35;
      spread = {
        x0: Math.max(x - bw, rg.bbox.x0 * z + ox),
        y0: Math.max(y - bh, rg.bbox.y0 * z + oy),
        x1: Math.min(x + bw, rg.bbox.x1 * z + ox),
        y1: Math.min(y + bh, rg.bbox.y1 * z + oy),
      };
    }

    L.add({
      text: st.caps ? rg.name.toUpperCase() : rg.name,
      area: true, clamp: true, spread, x, y,
      valid: planet.hf ? (st.tone === 'water' ? isSea : isLand) : null,
      size: st.size * gz * k, weight: st.weight, italic: st.italic,
      tracking: (st.tracking || 0) * gz * k,
      color: st.tone === 'water' ? P.labelWater : P.labelGeo,
      halo: P.labelHalo, priority: st.priority,
    });
  }

  return L.flush();
}
