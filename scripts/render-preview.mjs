// Renders the planet terrain to PNGs so the generator can be eyeballed
// without a browser. Run: node scripts/render-preview.mjs [seed]
import zlib from 'node:zlib';
import fs from 'node:fs';
import path from 'node:path';
import { generatePlanet, rasterizeTerrain, WORLD_W, WORLD_H, MAP_STYLES } from '../src/mapGenerator.js';

/* ---- minimal PNG writer ---- */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function writePNG(file, w, h, rgba) {
  const stride = w * 4;
  const raw = Buffer.alloc((stride + 1) * h);
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0;
    Buffer.from(rgba.buffer, rgba.byteOffset + y * stride, stride).copy(raw, y * (stride + 1) + 1);
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  fs.writeFileSync(file, Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 6 })),
    chunk('IEND', Buffer.alloc(0)),
  ]));
}

/* ---- render ---- */
const seed = process.argv[2] || 'NEON-GRID-2481';
const outDir = path.join(process.cwd(), 'tmp-preview');
fs.mkdirSync(outDir, { recursive: true });

console.time('generatePlanet');
const planet = generatePlanet(seed);
console.timeEnd('generatePlanet');
console.log(`cities=${planet.cities.length} rivers=${planet.rivers.length} lakes=${planet.lakes.length}`);
console.log('climates:', [...new Set(planet.cities.map((c) => c.climate))].join(', '));

const W = 1280;
const H = Math.round((W * WORLD_H) / WORLD_W);

for (const s of MAP_STYLES) {
  const buf = new Uint8ClampedArray(W * H * 4);
  const t0 = Date.now();
  rasterizeTerrain(buf, planet, { x: 0, y: 0, w: WORLD_W, h: WORLD_H }, W, H, s.key, 3);
  const ms = Date.now() - t0;
  writePNG(path.join(outDir, `planet-${s.key}.png`), W, H, buf);
  console.log(`${s.key}: ${W}x${H} in ${ms}ms`);
}

// Zoomed viewport render, the path used when the user zooms in.
{
  const c = planet.cities[0];
  const rw = WORLD_W / 10;
  const rh = (rw * H) / W;
  const buf = new Uint8ClampedArray(W * H * 4);
  const t0 = Date.now();
  rasterizeTerrain(buf, planet, { x: c.x - rw / 2, y: c.y - rh / 2, w: rw, h: rh }, W, H, 'satellite', 6);
  console.log(`zoom detail render: ${Date.now() - t0}ms around ${c.name}`);
  writePNG(path.join(outDir, 'planet-zoom.png'), W, H, buf);
}

// Full-size base render, to check the cost the browser will actually pay.
{
  const BW = 2048;
  const BH = Math.round((BW * WORLD_H) / WORLD_W);
  const buf = new Uint8ClampedArray(BW * BH * 4);
  const t0 = Date.now();
  rasterizeTerrain(buf, planet, { x: 0, y: 0, w: WORLD_W, h: WORLD_H }, BW, BH, 'satellite', 3);
  console.log(`base render ${BW}x${BH}: ${Date.now() - t0}ms`);
}

console.log('wrote', outDir);
