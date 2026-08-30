// Renders the city view to PNGs so the vector layers can be eyeballed
// without a browser. Run: node scripts/render-city.mjs [seed] [city]
import fs from 'node:fs';
import path from 'node:path';
import { createCanvas } from '@napi-rs/canvas';
import { generateCity, drawCity, placeMembers, WORLD_W, WORLD_H, MAP_STYLES } from '../src/mapGenerator.js';
import { madeDeckAll } from '../src/madeDeckData.js';

const seed = process.argv[2] || 'NEON-GRID-2481';
const cityName = process.argv[3] || 'Ongaku Prime';
const outDir = path.join(process.cwd(), 'tmp-preview');
fs.mkdirSync(outDir, { recursive: true });

console.time('generateCity');
const city = generateCity(seed, cityName, 'temperate');
console.timeEnd('generateCity');
const buildingCount = city.buildings.reduce((a, g) => a + g.quads.length / 8, 0);
console.log(`districts=${city.districts.length} streets=${city.roads.streets.length} buildings=${buildingCount} parks=${city.parks.length} woods=${city.woods.length} pois=${city.pois.length}`);

const fakeSick = Array.from({ length: 52 }, (_, i) => ({ name: `Sick ${i}`, cardLabel: `${i}` }));
const members = placeMembers(city, madeDeckAll, fakeSick);
console.log(`members=${members.length}`);

const layers = { districts: true, roads: true, buildings: true };

function render(file, W, rect, styleKey) {
  const H = Math.round((W * rect.h) / rect.w);
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext('2d');
  const scale = W / rect.w;
  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(-rect.x, -rect.y);
  const t0 = Date.now();
  drawCity(ctx, city, styleKey, scale, layers);
  ctx.restore();

  // District labels, drawn in screen space like the app does.
  for (const d of city.districts) {
    const x = (d.x - rect.x) * scale;
    const y = (d.y - rect.y) * scale;
    if (x < 0 || y < 0 || x > W || y > H) continue;
    ctx.font = '700 15px sans-serif';
    ctx.textAlign = 'center';
    ctx.lineWidth = 5;
    ctx.strokeStyle = 'rgba(2,6,16,.9)';
    ctx.strokeText(d.name.toUpperCase(), x, y);
    ctx.fillStyle = d.color;
    ctx.fillText(d.name.toUpperCase(), x, y);
  }
  for (const m of members) {
    const x = (m.x - rect.x) * scale;
    const y = (m.y - rect.y) * scale;
    if (x < 0 || y < 0 || x > W || y > H) continue;
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = m.kind === 'made' ? '#D4AF37' : '#DC2626';
    ctx.fill();
  }

  fs.writeFileSync(path.join(outDir, file), canvas.toBuffer('image/png'));
  console.log(`${file}: ${W}x${H} draw ${Date.now() - t0}ms`);
}

const full = { x: 0, y: 0, w: WORLD_W, h: WORLD_H };
for (const s of MAP_STYLES) render(`city-${s.key}.png`, 1280, full, s.key);

// Zoomed into the Central District, the level where streets and blocks matter.
const c = city.districts.find((d) => d.key === 'central');
const rw = WORLD_W / 6;
render('city-zoom.png', 1280, { x: c.x - rw / 2, y: c.y - (rw * 0.625) / 2, w: rw, h: rw * 0.625 }, 'satellite');
render('city-zoom-map.png', 1280, { x: c.x - rw / 2, y: c.y - (rw * 0.625) / 2, w: rw, h: rw * 0.625 }, 'map');

console.log('wrote', outDir);
