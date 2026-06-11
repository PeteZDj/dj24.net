# DJ24: The Sick 52 — Game Integration Kit

This folder is the **tracked reference** for the Unity game. The actual Unity project
lives in the repo's `game/` folder, which is **git-ignored** (Unity projects are huge and
machine-specific). Everything here is the source of truth that gets copied into `game/`.

> Web design doc: [`content/wiki/dj24-the-sick-52.md`](../../content/wiki/dj24-the-sick-52.md)
> · Live pages: `/wiki/dj24-the-sick-52`, `/missions`, `/sick-deck`

## Layout

```
docs/game/
├── README.md            ← this file
├── data/                ← JSON exported from the website (the single source of truth)
│   ├── cards.json           52 cards, flat (JsonUtility-friendly)
│   ├── sick52-deck.json     52 cards grouped by house
│   ├── dj24-branches.json   the 4 DJ24 branches + members
│   ├── missions.json        the campaign spine
│   ├── bounties.json        per-card bounty (city, difficulty, reward)
│   └── cities.json          Ongaku city list
└── unity/Scripts/       ← C# scripts (drop into Assets/DJ24/Scripts)
    ├── Core/    GameEnums, GameModels (DTOs), GameDatabase, JsonHelper
    ├── Systems/ DeckManager, MissionManager, BranchLoadout
    ├── Combat/  BeatClock, StanceController, SoundCombatant
    └── GameBootstrap.cs
```

## Regenerating the data

The JSON is generated from `src/contentLoader.js` so it can never drift from the site:

```bash
node scripts/export-game-data.mjs
```

It writes to `docs/game/data/` (tracked) and, if a `game/` folder exists, to
`game/Assets/DJ24/Data/` as well.

## Using it in Unity (6000.4.8f1)

1. Paste / open your Unity project in the repo's `game/` folder.
2. Copy `unity/Scripts` → `game/Assets/DJ24/Scripts` and `data/*.json` → `game/Assets/DJ24/Data`.
   (The exporter already drops the JSON into `game/Assets/DJ24/Data` for you.)
3. In Unity: **Create → DJ24 → Game Database**. Drag the JSON TextAssets into its fields.
4. Make an empty GameObject, add **GameBootstrap** (it auto-adds DeckManager,
   MissionManager, BranchLoadout), assign the GameDatabase, press **Play**.
5. The Console prints the branches, the campaign and a simulated house-hunt — proof the
   whole data → systems pipeline works.

## The mechanics (what the scripts model)

- **Deck-of-52 ladder** (`DeckManager`) — hunt a house from the **10 → Ace**; lower cards
  are bodyguards that must fall before the Ace can be engaged.
- **DJ24 branches** (`BranchLoadout`) — Army / Navy / Airforce / Space Force; each counters
  one house for a damage bonus.
- **Bass/Treble combat** (`StanceController` + `BeatClock`) — two stances with house
  affinities; transitioning *on the beat* primes a combo multiplier.
- **Missions & wallet** (`MissionManager`) — campaign completion + bounty payouts.
- **Combatants** (`SoundCombatant`) — HP entities whose toughness scales from card strength.
