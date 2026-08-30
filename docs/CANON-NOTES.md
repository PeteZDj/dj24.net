# Canon Notes — Status, Decisions & Discrepancies

This file records where the **source archive** (`docs/source/`), the **structured lore**
(`docs/lore/`), and the **live site** (`src/`, `content/`) agree or disagree, plus deliberate
decisions. It is the "verifiable" layer: nothing is silently reconciled.

## ✅ Resolved / canonical

- **Sick 52 roster** — Now fully canonical and matched across source ↔ lore ↔ code. All 52 members,
  correct 5-tier structure (12 / 12 / 12 / 8 / 8), each mapped to existing artwork.
  Source: `source/who-are-the-sick-52.md`.
- **Final Drop (#52)** — Placed in **Tier V (Mutated Prototypes)** as the ultimate mutation / final
  boss, per the source. (Previously mis-placed in Tier I.)
- **Hollow Aria (#6)** — Display name is "Hollow Aria"; slug `hollow-aria`; artwork file is the
  legacy `Sick52 - Void Vocalist.png`. The old slug `void-vocalist` now redirects via `wikiLinkMap`.
- **DJ24 squads** — The 24 are grouped into six strength-ordered squads of four on the roster page.
- **The Rival = General 24** — Creator decision: Sync's true rival is **General 24** (same-side rivalry,
  Naruto/Sasuke style). The separate "Champion of Ongaku Prime" rival concept is folded into him; Drez
  stays the chaotic Maverick foil. Reflected in `content/characters/sync.md`, `general-24.md`, lore `03`.
- **Guardian aliases** — Clear alt-names from the source's earlier roster passes are attached as
  `alias` on `dj24Roster` (shown as "Also known as", and resolvable as wiki links). See lore `04`.
- **Deck of 52 (Sick 52)** — The 52 are dealt into **4 houses (suits)** of 13. Card-strength ladder is
  inverted (`10` weakest → `A` strongest); every Queen is female; **A♠ = Final Drop**. Houses are
  *enemy internal divisions*, **not** military branches. See `content/wiki/the-sick-deck.md`,
  `sick52Suits` / `sick52Deck` in code, and the `/sick-deck` page.
- **DJ24 military branches** — Creator decision: **Army / Navy / Airforce / Space Force belong to
  DJ24, not the Sick 52.** They are a *combat-doctrine* axis (6 guardians each) parallel to the 6
  strength squads, and each counters one Sick 52 house: Space Force→♠, Army→♣, Navy→♦, Airforce→♥.
  Defined in `dj24Branches` / `dj24BranchMap`; shown on `/missions` and the game page.
- **The game = `DJ24: The Sick 52`** — chosen as the Deck-of-52 bounty game (it already stars the Sick
  52, Mid-XD era). Design doc `content/wiki/dj24-the-sick-52.md`; missions live data on `/missions`
  (`storyMissions` campaign + per-card `getBounties()` tied to cities + difficulty + reward).
- **Black Noise / the drug trade** — Creator decision: the trade is **cell-level, not
  institutional**. On the Sick 52 side only a small cell (**"The Pressing Plant"** — Black Vinyl,
  Static Prophet, plus Tier V prototypes) manufactures it; **Red Silence does not sanction it** and
  tolerates it purely as war funding, which much of the 52 regard as a betrayal. On the Hip Hop
  Mafia side only **two of five imprints** (Redline, Ghost Ink) touch it; Velvet Static and Deep
  Crates refuse it, and Clean Count launders it while claiming otherwise. The Sick 52 stay
  ideological; the Mafia stays commercial. See `PLANET-ONGAKU-WORLD-BIBLE.md` §5.
- **Hip Hop Mafia membership** — Creator decision: **not everyone in the Hip Hop Mafia is a
  criminal.** Formalised as three tiers — **Made** (actual criminals), **Signed** (artists under
  contract; leveraged, not criminal), **Affiliated** (businesses and neighbourhoods that benefit and
  look away). Movement between tiers is a story engine.
- **Media conglomerate = The Tower Group** — Creator decision. Divisions include **24 Radio** (urban
  station), **OBC News** (acquired news brand), **Tower Sound** (labels), Tower Broadcasting,
  Stream, Pictures, Sports, Print, Live, Ads. The name ties the media empire to the canon **Sound
  Towers**, so broadcasting and Harmony Council control share infrastructure. The overnight show
  ***The 24 Hour*** is the in-world framing device that carries the DJ mixes.
- **R&B = Velvet Records, not a separate faction** — Creator decision: R&B does **not** get its own
  organisation. It is the flagship prestige label inside Tower Sound; the **Velvet Room** is a
  label-owned members' club. Keeps the major-organisation count at **11**.
- **Game folder** — The Unity project lives in repo `game/` and is **git-ignored**; the tracked
  reference (data export + C# scripts + integration guide) lives in `docs/game/`. JSON is generated
  from `src/contentLoader.js` via `node scripts/export-game-data.mjs`. Engine: **Unity 6000.4.8f1**.

## ⚠️ Known multi-version areas (need a creator decision)

### 1. DJ24 roster has several iterations in the source
`source/the-dj-24.md` contains **at least three** roster passes:
- **Canonical hour roster** (used by the site): General 24, Sync, Molly, Ninja Nagazaki, Nova,
  Striker, King J, Maya, MasterBass, Crossfade, SubZ, 4Serj, GhostLoop, Breakline, Afterimage,
  Mr Genge, LiquidB, Backspin, Sidechain, Distort, Moombah, d.O.P, WBoy, AfroG.
- **A variant pass** with different Hour assignments (e.g., Hour 03 "Rez / Echo Assassin", Hour 04
  "Veyra / Sonic Knight", Hour 07 "Drez / Unchained Beat", plus Pulsewarden, PhaseLace, SubZeroHz,
  Midday Prime, LowPass, Overtone, FadeOut, NullMeter, NightSignal, Last Drop).
- **An early genre-named pass** (Moombah, Hip Hop Mafia, AmaPiano, Lofi, Disco Grindin,
  "Cocaine in My Brain" → renamed **NeuroRush**, Liquid Bandit, 6 Side, Afrohouse, etc.).
- **Decision taken (updated):** keep the canonical hour roster live; the clearly-matching alt-names
  are now attached as **aliases** (see lore `04`). The early **genre-coded** pass remains archived and
  is a candidate for the future 54-reserve roster.

### 2. Name collisions
- **Veyra** appears as both **Grand Composer Veyra** (Harmony Council) and **Veyra "Sonic Knight"**
  (a DJ24 duelist in one roster pass). Site uses Veyra for the Council. _Needs disambiguation._
- **Drez** is the **Mavericks** leader on-site, and also appeared as a candidate **Rival** name in
  `source/7-...villains...`. **Resolved:** the Rival role is **General 24**; Drez stays the Maverick foil.
- **SubZ** (site) = "SubG" / "SubZeroHz" in source variants. Treated as the same guardian (Hour 11).

### 3. Sick 52 — extra lore beyond the 52
`src/contentLoader.js` still contains `previousSick52MemberData`, an **archive** of older/expanded
character backstories (e.g., Frost Echo variants, plus non-canonical concepts like Blight Beat,
Gravity Groove, Vertigo Vibrato, Déjà-Vu Drop, Hysteria Hook, Paranoia Pulse, Schism Solo,
Magma Mezzo, Crystal Coda, Aero Aria, Patient Zero, etc.). These are **not** part of the canonical 52
and are not rendered as roster members — kept only as a writing reference. _Open question: promote any
to "reserves," or move to a dedicated lore appendix?_

### 4. Cities vs. Planets
The site ships **12 Ongaku city pages**; `source/57-...stages...` describes **57 stages**, and
`source/4-...planets...` describes **14 galaxy planets**. These are three different granularities
(districts ⊂ planet ⊂ galaxy) and are intentionally distinct.

### 5. Two decks of 52 (Sick Deck vs. the Made Deck)
The **Sick 52 roster stays at exactly 52** — canonical, 4 houses of 13, A♠ = Final Drop, live at
`/sick-deck`. The proposed **Hip Hop Mafia "Made Deck"** (see
[`HIP-HOP-MAFIA-DECK.md`](HIP-HOP-MAFIA-DECK.md)) is a **deliberate mirror**: 52 made members in 4
houses **+2 Jokers** (Consigliere and Intelligence), ranked by the same ladder so the site can reuse
`SICK52_RANK_ORDER`. In-world justification: **the Mafia's deck came first**; the Sick 52 dealt
themselves as a deck in mockery of the streets, and the Chairman regards it as plagiarism.
_Open: whether 10♠ stays vacant as Freq Kid's seat, whether the Jokers exist, and whether this ships
as a `/made-deck` page._

### 6. "Hip Hop Mafia" name collision
`source/the-dj-24.md` uses **"Hip Hop Mafia"** as the **Hour 06** entry in the archived genre-named
DJ24 roster pass (the live Hour 06 is **Striker**). If the name is taken for the new criminal
organisation, the archived usage should be explicitly marked superseded. _Needs a decision._

## 🗂️ Asset notes

- Character art lives in `public/images/**` and is **git-ignored**; it is recoverable from the
  initial commit (`git checkout <initial> -- public/images`). 177 images currently on disk.
- Sick 52 art filenames carry legacy quirks (typos / trailing spaces), e.g. `Sic52 - Harmony Eater.png`,
  `Sick52 Nocture Prime.png`, `Sick52 - Crecendo Wraith.png`. The code maps the clean slug → the exact
  on-disk filename, so do **not** rename the files without updating `sick52Images`.

## 🔭 Open expansion slots (explicitly unfinished in canon)

- The **54 DJ24 reserves** (referenced, not yet rostered).
- The **new Sick 52 leader** who rises in Season 3 (more dangerous than Red Silence).
- The **Rival's** final identity and backstory.
- District-control map (Sick 52 vs. Harmony Council) suggested in `source/who-are-the-sick-52.md`.
