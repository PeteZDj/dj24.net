// Renders the planet with terrain AND vectors (roads, city footprints,
// labels) at several zooms, so the atlas can be eyeballed without a browser.
// Uses the same label engine the app does, so what lands here is what the
// canvas shows.
// Run: node scripts/render-atlas.mjs [seed]
import fs from 'node:fs';
import path from 'node:path';
import { createCanvas, ImageData } from '@napi-rs/canvas';
import { generatePlanet, rasterizeTerrain, drawPlanetVectors, WORLD_W, WORLD_H } from '../src/mapGenerator.js';
import { drawPlanetLabels } from '../src/mapLabels.js';
import { buildCityDetail, drawCityDetail, placeCrew } from '../src/cityDetail.js';
import { madeDeckAll } from '../src/madeDeckData.js';

const seed = process.argv[2] || 'NEON-GRID-2481';
const outDir = path.join(process.cwd(), 'tmp-preview');
fs.mkdirSync(outDir, { recursive: true });

console.time('generatePlanet');
const planet = generatePlanet(seed);
console.timeEnd('generatePlanet');
console.log(`cities=${planet.cities.length} routes=${planet.routes.length} regions=${planet.regions.length}`);
console.log('ferries:', planet.routes.filter((r) => r.ferry).length);
console.log('classes:', planet.routes.reduce((a, r) => { a[r.cls] = (a[r.cls] || 0) + 1; return a; }, {}));
const crew = placeCrew(planet, madeDeckAll, Array.from({ length: 52 }, (_, i) => ({ name: 'Sick ' + (i + 1), cardLabel: String(i + 1) })));
console.log('regions:', planet.regions.map((r) => `${r.kind}:${r.name}`).join(' | '));

function render(file, rect, W, H, style, octaves) {
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');

  const buf = new Uint8ClampedArray(W * H * 4);
  rasterizeTerrain(buf, planet, rect, W, H, style, octaves);
  ctx.putImageData(new ImageData(buf, W, H), 0, 0);

  const z = W / rect.w;

  // Same streaming rule the page uses: build a model for any settlement close
  // enough to be worth one.
  const details = new Map();
  for (const c of planet.cities) {
    if (c.radius * z < 150) continue;
    details.set(c.name, buildCityDetail(planet, c));
  }
  const detailed = new Set(details.keys());
  const layers = { districts: true, roads: true, buildings: true, rivers: true, pois: true, made: true, sick: true, labels: true };

  ctx.save();
  ctx.scale(z, z);
  ctx.translate(-rect.x, -rect.y);
  drawPlanetVectors(ctx, planet, style, z, { roads: false, detailed });
  for (const c of planet.cities) {
    const det = details.get(c.name);
    if (det) drawCityDetail(ctx, c, det, style, z, layers);
  }
  drawPlanetVectors(ctx, planet, style, z, { rivers: false, cities: false, roads: true });
  ctx.restore();

  // Markers and text in screen space, exactly as the app draws them.
  const stats = drawPlanetLabels(ctx, planet, style, { ox: -rect.x * z, oy: -rect.y * z, z, W, H }, { details, crew, layers });

  fs.writeFileSync(path.join(outDir, file), canvas.toBuffer('image/png'));
  console.log(`wrote ${file}  labels ${stats.placed} placed / ${stats.dropped} dropped${stats.dropped ? ': ' + stats.droppedText.join(', ') : ''}`);
}

const W = 1400;
const H = Math.round((W * WORLD_H) / WORLD_W);

for (const style of ['satellite', 'map', 'terrain']) {
  render(`atlas-${style}.png`, { x: 0, y: 0, w: WORLD_W, h: WORLD_H }, W, H, style, 3);
}

// Zoom ladder onto the capital, which is what the user actually does.
const cap = planet.cities.find((c) => c.kind === 'capital') || planet.cities[0];
console.log(`capital ${cap.name} radius=${cap.radius?.toFixed(1)} coastal=${cap.coastal} radials=${cap.radials?.length} streets=${cap.streets?.length}`);
for (const [tag, factor, oct] of [['region', 8, 5], ['metro', 26, 7], ['city', 70, 9]]) {
  const rw = WORLD_W / factor;
  const rh = (rw * H) / W;
  render(`atlas-zoom-${tag}.png`, { x: cap.x - rw / 2, y: cap.y - rh / 2, w: rw, h: rh }, W, H, 'map', oct);
  render(`atlas-zoom-${tag}-sat.png`, { x: cap.x - rw / 2, y: cap.y - rh / 2, w: rw, h: rh }, W, H, 'satellite', oct);
}
