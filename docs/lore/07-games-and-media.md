# 07 · Games & Media

> Sources: `source/17-the-dj24-game-universe-timeline-game-design.md`,
> `source/16-games-from-dj24-franchise.md`, `source/12-game-djbattle-1-...md`,
> `source/dj-battle-2025-update.md`, `source/11-...webcomic...`, `source/20-...webcomic-preview...`,
> `source/14-...weekly-radio-show...`, `source/11-dj-battle-radio-show-mix-concept-idea.md`,
> `source/27-...official-dj-mixes-for-character-fights.md`, `source/57-planet-ongaku-stages-...md`.

## The 5-Game Franchise (one connected timeline)

| Game | Era | Genre / Focus |
| --- | --- | --- |
| **DJ Battle** | Low-Res (Pre-HD) | Tactical rhythm combat, fighting, dojo-building, tournaments. Pure sound combat, genre-based styles. Ends when the LFO destabilizes and Scientifica tech arrives. |
| **DJ VIP** | Early-HD | Narrative social sim; fame, corruption, industry politics; early cyber-enhancements. Ends with the Council imposing the SBS. |
| **DJ24** | XD (start, ~10 lifecycles after HD) | Open-world cyberpunk RPG; city-building + real-time sound combat; first interdimensional breaches. The flagship. |
| **DJ24: The Sick 52** | Mid-XD | Squad-based tactical sound combat + city-control warfare; play as DJ24 **or** the Sick 52. |
| **Planet Ongaku** | Post-XD / Galactic | Space 4X: exploration, diplomacy, music-based civilization management. |

> **DJ Battle (2025 update)** — `source/dj-battle-2025-update.md` is the largest single design doc
> (~25k chars) and the most detailed game-design reference; treat it as the deep-dive for DJ Battle's
> story flow and systems.

## DJ24: The Sick 52 — the Deck-of-52 build (NEW)

`DJ24: The Sick 52` is the franchise's **most-wanted bounty game**, built on the
[Deck of 52](../../content/wiki/the-sick-deck.md) system. Live pages: `/wiki/dj24-the-sick-52`,
`/missions`, `/sick-deck`.

**Core loop:** pick a Sick 52 house (suit) → work its ladder from the **10 → Ace** (lower cards are
the higher cards' bodyguards) → field the DJ24 branch that counters that house → liberate the city.

**Two organizational axes — keep them distinct:**

- **Sick 52 → 4 Houses (suits):** Spades (High Command), Clubs (War Conductors), Diamonds (Elemental
  Corps), Hearts (Dissonant Choir). These are the *enemy* divisions. *Not* military branches.
- **DJ24 → 4 Branches:** **Space Force** (reality/time, counters ♠), **Army** (ground/percussion,
  counters ♣), **Navy** (sub-bass/flow, counters ♦), **Airforce** (speed/mind, counters ♥). 6
  guardians each (24 total). This is the *player's* force structure and sits beside the 6 strength
  squads (which rank authority, not doctrine).

**Combat:** two-stance (BASS area-control / TREBLE single-target); transitioning *on the beat* primes
a combo multiplier — Sync's alignment and Crossfade's mixing become literal mechanics.

**Missions:** a hand-authored campaign spine (`missions.json`) + one repeatable bounty per card
(`bounties.json`, city + difficulty + reward). The Joker (Komedian) is a wildcard outside the deck.

### Game integration kit
The data + Unity scripts live in `docs/game/` (tracked); the Unity project itself lives in the repo's
git-ignored `game/` folder. JSON is generated from `src/contentLoader.js` via
`node scripts/export-game-data.mjs`, so the game can never drift from the website. Target engine:
**Unity 6000.4.8f1**.

## Stages & Arenas

`source/57-planet-ongaku-stages-...md` lists **57 Planet Ongaku stages** intended to be turned into
3D points / handed to an AI for level generation. This is the master location list for game levels
(complements the site's city pages: Classic, Electric, Rock, Blue, Pop, Urban, Cloud, Rose, Hall of
Laughter, Joke City, Clown Country, Intro: The Dream).

## Media experience

- **FREQ: The War of Sound (Radio Show)** — a serialized weekly podcast/radio show mixing EDM,
  anime-style narration, and immersive soundscapes that simulate DJ24 vs. Sick 52 battles.
  Strategy/format: `source/14-...weekly-radio-show...`, `source/11-dj-battle-radio-show-mix-concept-idea.md`.
- **Webcomic** — ongoing bi-weekly visual storytelling that complements the radio show; creation plan
  and the first 5–10 preview pages: `source/11-...webcomic...`, `source/20-...webcomic-preview...`.
  - **Now live on the site.** Season 1 = **4 arcs / 50 chapters** (The First Drop, The Echo Revolt,
    The Silence War, The Final Remix). Data + full panel scripts in `src/comicsData.js`; pages
    `ComicsIndex` (`/comics`) and `ComicReader` (`/comics/:slug`). Chapters **1–4 are fully scripted**
    (panel-by-panel) with cohesive AI cover + splash art in `public/images/comics/` (git-ignored like
    all art). Ch.1 "The First Drop" is adapted verbatim from `source/20-...webcomic-preview...`;
    Ch.2–4 extend it from canon (DJ24 command spire, the 24 Hours, bass/treble training, the deck of 52
    first hunt). Faction-colored speech bubbles, SFX and captions render the action.
- **Official character-fight DJ mixes** — each major fight gets a bespoke mix defining its sound:
  `source/27-...official-dj-mixes-for-character-fights.md`.
- **Dual content strategy** — balancing the radio show and the comic: `source/13-balancing-the-dj-show-comic-...md`.

## Design & reference notes

- **Combat & military strategy:** `source/19-evolving-dj24-...full-combat-military-strategy.md`.
- **Cyberpunk × Naruto blend** (visual/tone target): `source/25-blending-cyberpunk-naruto-...md`.
- **Character designs (FREQ):** `source/21-character-designs-for-freq-the-war-of-sound.md`.
- **Races of Planet Ongaku:** `source/1-races-of-planet-ongaku.md`.
- **Reference / inspirations from other stories:** `source/10-reference-what-other-stories-use.md`.
