# DJ24: War of Sound — Project Knowledge Base

This is the structured, verifiable knowledge base for the **DJ24: War of Sound** universe
created by **petezdj**. It exists so that anyone (human or AI) can understand the project
deeply, quickly, and consistently.

## How this knowledge base is organized

```
docs/
├── README.md            <- you are here (the map)
├── CANON-NOTES.md       <- canon status, decisions, and source-vs-site discrepancies
├── lore/                <- the STRUCTURED canon (dissected + cross-referenced)
│   ├── 01-world-and-science.md   World of Ongaku, Frequency Grid, SBS, the science of sound
│   ├── 02-the-galaxy.md          The 14 single-craft planets
│   ├── 03-factions.md            DJ24, Sick 52, Harmony Council, NexaGen, Komedians
│   ├── 04-dj24-roster.md         The 24 active guardians (+ squads + extended cast)
│   ├── 05-sick52-roster.md       The canonical 52 across 5 tiers (matches the live site)
│   ├── 06-timeline-and-seasons.md  Eras (Pre-Rhythm → Galactic) + Seasons 1–4
│   └── 07-games-and-media.md     The 5-game franchise + radio show + webcomic
└── source/              <- RAW ARCHIVE: faithful Markdown conversions of the original
                            Evernote lore pages (the verifiable source of truth)
```

## Reading order (for a newcomer)

1. **[Universe at a glance](#universe-at-a-glance)** (below)
2. `lore/01-world-and-science.md` — what Ongaku is and how sound-power works
3. `lore/03-factions.md` — who's who
4. `lore/06-timeline-and-seasons.md` — when things happen and the story
5. `lore/04-dj24-roster.md` + `lore/05-sick52-roster.md` — the two main rosters
6. `lore/02-the-galaxy.md` + `lore/07-games-and-media.md` — the wider world & products

## Universe at a glance

- **Franchise:** DJ24: War of Sound — a multimedia universe (anime, video games, manga/comics,
  the *FREQ* radio show). Tagline energy: *"In a world where music is power, who controls the sound?"*
- **Setting:** **Planet Ongaku**, the music capital of the galaxy, where **music is infrastructure** —
  sound runs energy, architecture, travel, communication, combat, and reality itself.
- **The engine of reality:** the **Frequency Grid**, a planetary system that stabilized reality and
  hid Ongaku from the galaxy — until it collapsed (end of Season 1), exposing Ongaku to
  interstellar and interdimensional war.
- **The control system:** the **Single Beat System (SBS)**, enforced by the **Harmony Council**,
  which dictates what music is permitted.
- **The hero:** **Sync**, "the Syncopate" — born able to break/remix the beat via **Extra-Dimensional
  Frequencies (XDF)**, the awakening of a legend the SBS was built to prevent.
- **The core conflict layers:** Harmony Council (control) · NexaGen Harmonics (corporate
  weaponization) · the Sick 52 (vengeful exiles) · the Komedians (interdimensional invaders) ·
  the Rival (Sync's personal enemy).

## Verifiability

Every structured doc in `lore/` cites the originating file(s) in `source/`. When the structured
canon and the live website (`src/`, `content/`) disagree, it is recorded in `CANON-NOTES.md`
rather than silently resolved. The Sick 52 roster in `lore/05-sick52-roster.md` is the **canonical
52** and is kept in lockstep with `src/contentLoader.js`.

## Live site mapping (where lore becomes code)

| Lore | Lives in code at |
| --- | --- |
| Sick 52 roster + bios + images | `src/contentLoader.js` (`sick52MemberData`, `sick52Images`) |
| DJ24 roster + squads | `src/contentLoader.js` (`dj24Roster`, `dj24Groups`) |
| Factions | `src/contentLoader.js` (`factionsData`), `content/factions/*.md` |
| Cities / wiki pages | `content/wiki/*.md`, `content/cities` routes |
| Character art | `public/images/**` (git-ignored; recoverable from initial commit) |

_Last structured: 2026-06-11. Source archive: 27 documents converted from Evernote HTML._
