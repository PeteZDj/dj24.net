// Exports the canonical DJ24 / Sick-52 game data to JSON for the Unity project.
//
// The website's data lives in src/contentLoader.js. That file has exactly one
// Vite-only line (import.meta.glob). We neutralize it so plain Node can import
// the module, then call the existing getters so the JSON can never drift from
// what the site shows.
//
// Run:  node scripts/export-game-data.mjs
// Writes to:  docs/game/data/  (tracked)  and  game/Assets/DJ24/Data/  (if game/ exists)

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// --- load contentLoader.js in a Node-safe way ---
const srcPath = path.join(root, 'src', 'contentLoader.js');
const src = fs.readFileSync(srcPath, 'utf8');
const patched = src.replace(
  /const markdownModules = import\.meta\.glob[^;]*;/,
  'const markdownModules = {};'
);
const tmp = path.join(__dirname, '.contentLoader.node.mjs');
fs.writeFileSync(tmp, patched);

let mod;
try {
  mod = await import(pathToFileURL(tmp).href);
} finally {
  fs.rmSync(tmp, { force: true });
}

const {
  getSick52ByHouse,
  getDJ24ByBranch,
  getStoryMissions,
  getBounties,
  ongakuCities,
  sick52Suits,
} = mod;

// strip image URL helpers down to plain relative paths the game can resolve
const slimMember = (m) => ({
  slug: m.slug,
  name: m.name,
  title: m.title || null,
  role: m.role || null,
  tier: m.tier || null,
  suit: m.suit,
  card: m.card,
  cardLabel: m.cardLabel,
  cardValue: m.cardValue,
  image: m.image || null,
});

const deck = {
  suits: sick52Suits,
  houses: Object.fromEntries(
    Object.entries(getSick52ByHouse()).map(([k, h]) => [
      k,
      {
        key: h.key, name: h.name, symbol: h.symbol, color: h.color,
        house: h.house, branch: h.branch, desc: h.desc,
        members: h.members.map(slimMember),
      },
    ])
  ),
};

const branches = getDJ24ByBranch().map((b) => ({
  key: b.key, name: b.name, icon: b.icon, color: b.color,
  domain: b.domain, desc: b.desc, counters: b.counters,
  members: b.members.map((m) => ({
    slug: m.slug, name: m.name, hour: m.hour, role: m.role,
    squad: m.squad, image: m.image || null,
  })),
}));

const missions = getStoryMissions().map((m) => ({
  id: m.id, act: m.act, no: m.no, title: m.title, boss: m.boss,
  city: m.city, cityName: m.cityInfo?.name || null,
  branch: m.branch, objective: m.objective, brief: m.brief, reward: m.reward,
  targets: m.targetMembers.map((t) => ({ slug: t.slug, name: t.name, cardLabel: t.cardLabel })),
}));

const bounties = Object.fromEntries(
  Object.entries(getBounties()).map(([k, h]) => [
    k,
    {
      house: h.house, symbol: h.symbol, color: h.color,
      counterBranch: h.counterBranch?.key || null,
      bounties: h.bounties.map((b) => ({
        ...slimMember(b),
        city: b.city.slug, cityName: b.city.name,
        difficulty: b.difficulty.key, reward: b.reward, order: b.order,
      })),
    },
  ])
);

const cities = Object.values(ongakuCities);

// Flat 52-card list (friendly to Unity's JsonUtility, which can't parse dictionaries).
const cards = Object.values(deck.houses).flatMap((h) =>
  h.members.map((m) => ({
    ...slimMember(m),
    houseKey: h.key,
    houseName: h.house,
    suitSymbol: h.symbol,
    suitColor: h.color,
  }))
);

const payload = {
  deck: { file: 'sick52-deck.json', data: deck },
  cards: { file: 'cards.json', data: cards },
  branches: { file: 'dj24-branches.json', data: branches },
  missions: { file: 'missions.json', data: missions },
  bounties: { file: 'bounties.json', data: bounties },
  cities: { file: 'cities.json', data: cities },
};

const targets = [path.join(root, 'docs', 'game', 'data')];
const unityData = path.join(root, 'game', 'Assets', 'DJ24', 'Data');
if (fs.existsSync(path.join(root, 'game'))) targets.push(unityData);

for (const dir of targets) {
  fs.mkdirSync(dir, { recursive: true });
  for (const { file, data } of Object.values(payload)) {
    fs.writeFileSync(path.join(dir, file), JSON.stringify(data, null, 2) + '\n');
  }
  console.log('wrote', Object.values(payload).length, 'files ->', path.relative(root, dir));
}

console.log('done.');
