# DJ24 XD — Game Design Docs

This folder organizes the **DJ24 XD** brain-dump into structured design docs. DJ24 XD is a
create-your-own-character **music RPG** set on **Planet Ongaku**, told over **101 episodes**
in which the hero slowly becomes the saga's villain.

> **Fiction disclaimer (canon):** *The story, events and characters in this game are works of
> fiction that are entirely made up. Any resemblance to any stories, events or persons living or
> dead is entirely coincidental.*

## Index

| Doc | What's in it |
| --- | --- |
| [01-story-bible.md](01-story-bible.md) | Premise, themes, the villain descent (Kid → General Grievous → Z), the meta-war (Musicians vs Komedians), tone. |
| [02-protagonist-and-cast.md](02-protagonist-and-cast.md) | Pete (the player), the crew, the antagonists, NPC archetypes, and how existing DJ24 / Sick 52 characters plug in. |
| [03-gameplay-and-mechanics.md](03-gameplay-and-mechanics.md) | Core loop, play-as-anyone, DJ battles, nightlife, sneaking/dealing, hangover-to-class, sports, combat. |
| [04-build-your-city.md](04-build-your-city.md) | The chess-piece venue system (Pawn → King + Castle) and the 8 cribs. |
| [05-world-and-regions.md](05-world-and-regions.md) | The four suits → four regions, Ongaku Prime, the map, and the scaling economy. |
| [06-episode-guide.md](06-episode-guide.md) | The full 101-episode list, grouped by act, with one-liners and reward tiers. |
| [DJ24-XD-ORGANIZATION-REPORT.md](DJ24-XD-ORGANIZATION-REPORT.md) | **The single report** — how the raw notes were organized this turn, decisions made, and open questions. |

## Where it lives on the site

The campaign is playable as data at **`/missions`** (the campaign leads the page; the Sick 52 bounty
war sits below it). Every episode has its own page at **`/missions/ep001-…`**, GTA-style, with
objectives, a mission-info box, and prev/next navigation. The episode data is the single source of
truth in [`src/missionsData.js`](../../src/missionsData.js).

## Key art

`public/images/game/` — `game-cover.png` plus one header per act
(`arc-prologue`, `arc-flowers`, `arc-hearts`, `arc-diamonds`, `arc-spades`).
