// Sanity check for the procedural generator: run with `node scripts/check-map.mjs`
import { generatePlanet, generateCity, placeMembers, WORLD_W, WORLD_H } from '../src/mapGenerator.js';
import { madeDeckAll } from '../src/madeDeckData.js';

const fakeSick = Array.from({ length: 52 }, (_, i) => ({ name: `S${i}`, cardLabel: `${i}`, title: 't' }));

for (const seed of ['NEON-GRID-2481', 'BASS-DROP-1111', 'VOID-TIDE-9021']) {
  const t0 = Date.now();
  const p = generatePlanet(seed);
  const land = p.biome.reduce((a, b) => a + (p.biomeKeys[b] !== 'deep' && p.biomeKeys[b] !== 'ocean' && p.biomeKeys[b] !== 'shallow' ? 1 : 0), 0);
  console.log(`${seed} planet: ${p.cities.length} cities, ${p.routes.length} routes, land ${(land / (p.GW * p.GH) * 100).toFixed(1)}%, ${Date.now() - t0}ms`);
  if (p.cities.length < 14) console.error('  !! too few cities placed');

  const t1 = Date.now();
  const c = generateCity(seed, 'Ongaku Prime');
  const counts = {};
  let water = 0;
  for (let i = 0; i < c.cellDistrict.length; i++) {
    if (c.water[i]) water++;
    const k = c.cellDistrict[i];
    if (k >= 0) counts[c.districts[k].key] = (counts[c.districts[k].key] || 0) + 1;
  }
  console.log(`  city: ${c.blocks.length} blocks, ${c.roads.streets.length} streets, ${c.pois.length} POIs, water ${(water / (c.GW * c.GH) * 100).toFixed(1)}%, ${Date.now() - t1}ms`);
  console.log('  district cells:', Object.entries(counts).map(([k, v]) => `${k}=${v}`).join(' '));
  for (const d of c.districts) {
    if (!counts[d.key]) console.error(`  !! district "${d.key}" has zero land cells`);
  }

  const mem = placeMembers(c, madeDeckAll, fakeSick);
  const off = mem.filter((m) => m.x < 0 || m.y < 0 || m.x > WORLD_W || m.y > WORLD_H);
  console.log(`  members: ${mem.length} placed, ${off.length} off-canvas`);
  const unplaced = madeDeckAll.filter((p2) => !c.districts.some((d) => d.name === p2.district));
  if (unplaced.length) console.error('  !! unknown districts:', unplaced.map((u) => u.district));
}
