# DJ24 XD — Organization Report

**Date:** 2026-06-12 · **Scope of this turn:** (1) fix the site's missing images, and (2) turn the
"DJ24 XD" brain-dump into an organized, playable 101-episode campaign with its own pages and design
docs.

---

## Part 1 — The "missing images" mystery (solved)

**Your instinct was right: the images existed before.** Here is exactly what happened and what I did.

- The site is served through **Cloudflare** (DNS for `dj24.net` → `104.21.19.42` / `172.67.185.52`),
  with **this IIS box as the origin** (confirmed via live IIS access logs showing Cloudflare edge
  IPs). So what deploys here *is* what the internet sees.
- The portraits were committed in the **initial commit** (`147affb`) — **177 images**:
  `cities (24)`, `dj24 (31)`, `extended (22)`, `harmony-council (7)`, `logos (17)`, `sick52 (76)`.
- They were later deleted in commit **`4586cc2` "Remove large image files to reduce repo size."**
- After the earlier `robocopy /MIR` accident wiped the working tree, we **re-cloned from GitHub** —
  which restored the repo *as of HEAD*, i.e. **without** the deleted images. Only the 16 comic
  images survived (they'd been force-added later). Everything else 404'd → "all images missing."

**Fix applied this turn:**
1. **Restored all 177 images** from history (`git checkout 147affb -- public/images/...`).
2. **Deployed them live** to the IIS web root (verified: `Sick52- Red Silence.png` and
   `Dj24 - AfroG.png` now return `200 image/png`).
3. Will **back them up to OneDrive** so a future wipe can't lose them again.

**Recovery command (save this):**
```powershell
git checkout 147affb -- public/images/cities public/images/dj24 public/images/extended public/images/harmony-council public/images/logos public/images/sick52
```

**Decision:** the images are **not re-committed to git** (that's what bloated the repo and caused the
`4586cc2` cleanup). Instead they live in `public/images`, deploy with each build, are backed up to
OneDrive, and remain recoverable from history. *If you'd rather track them in git (simplest, but
re-bloats the repo), say the word and I'll force-add them.*

---

## Part 2 — How your notes were organized

Your brain-dump mixed **story**, **mechanics**, **cast**, **world**, and **mission lists**. I split
it into 6 design docs + this report, and built it into the live site.

| Your raw notes | Where it now lives |
| --- | --- |
| PeteZDj premise, "Royal music school," dad shot on TV, 2-yr scholarship, Kid→Grievous→Z, the 437→101 cut, the Komedians/"human limitations"/snakes/HQ meta-war, the fiction disclaimer | **[01-story-bible.md](01-story-bible.md)** |
| The crew (Blake, Ted, Banda, Marko, Michelle, Kyenks, Jasmine, David), the NPC archetype list (bouncers, promoters, dealers, fans, crew…), the villains, shōnen-protagonist note, tie-in to existing DJ24/Sick 52 | **[02-protagonist-and-cast.md](02-protagonist-and-cast.md)** |
| Watch-Dogs-Legion switching, Naruto DJ battles + "jack the beats," sneaking/Pusha P, hangover→class (Bully), afterparty hopping, shots/smoke, dream colour-shift, sports list, street racing, skating, help-a-friend business, taxi/uber, the song-themed Kenya fight | **[03-gameplay-and-mechanics.md](03-gameplay-and-mechanics.md)** |
| The chess venue tiers (Pawn→King + Castle) and the "8 houses" | **[04-build-your-city.md](04-build-your-city.md)** |
| Suit→region map (Flower=Africa, Hearts=Asia/Europe, Diamonds=Middle East, Spades=Ongaku Prime), "give your loved one a flower," scaling payouts, start-small-then-tour | **[05-world-and-regions.md](05-world-and-regions.md)** |
| Your numbered story outline (Letter from Sister, Kyenks, Mom, D-Boys, the house parties, the shooting, SWAT switch, Box box box, Ciani/Jasmine loft, DJ UV, Casablanca/MDD, spin the bottle…) + the full pilot beat sheet + the Boothman/Billionaire-X path | **[06-episode-guide.md](06-episode-guide.md)** + `src/missionsData.js` |

### Key creative decisions (so you can correct me)
1. **101 episodes, 5 acts:** Prologue (9) → Flowers (23) → Hearts (23) → Diamonds (23) → Spades (23).
2. **Act order = home-first** (per your pick): Prologue → Flowers → Hearts → Diamonds → Spades.
3. **The pilot** became the 9-episode **Prologue** almost beat-for-beat (rave/CPR cold-open → coding
   → Blake's call → plug → street race → bouncer/Banda → club/jack-the-beats/fights → take the decks
   → faded sunrise → the broadcast/murder → #1 set + funeral + letter → fly out).
4. **Your story outline 1–28** became the **Flowers** act (the African come-up: D-Boys, the house
   parties, the shooting, the SWAT character-switch, Box box box, Ciani loft, Casablanca).
5. **"Give her a flower"** is the romance beat in **Hearts** (Ep 38).
6. **Billionaire X** = the **Diamonds** act (Shazam-CEO archetype, the betrayal, the takeover).
7. **The villain turn** (General Grievous → Z → Regicide) is the **Spades** act, fused with your
   Komedian meta-war and the existing DJ24/Sick 52 factions so the game uses our current characters.
8. **GTA-San-Andreas fidelity:** every episode has a giver, location/area, **scaling reward**,
   unlocked items, "featuring" cast, and objectives — exactly like your gtabase reference.

---

## Part 3 — What shipped on the site

- **`/missions`** now **leads with the 101-episode campaign** (grouped into the 5 acts with arc key
  art and scaling reward tiers). The **Sick 52 bounty war** moved to a section below it.
- **Each episode has its own page** at `/missions/ep0NN-title` — GTA-style: key art, synopsis,
  walkthrough (full prose for the Prologue), **Mission Objectives**, a **Mission Info** box (giver,
  location, area, region, reward, unlocked items, featuring), and **prev/next** navigation.
- **Data backbone:** `src/missionsData.js` (single source of truth: acts + 101 episodes + helpers).
- **Key art generated:** `public/images/game/` — `game-cover` + 5 arc headers.

---

## Part 4 — Open questions / your call
1. **Act order** — keep home-first, or use your literal "Hearts → Flower → Diamond → Spades"? (Acts
   are modular; re-sequencing is quick.)
2. **Depth** — right now the **Prologue** has full walkthrough prose and all 101 have synopsis +
   objectives + info. Want me to write full walkthroughs for **all** 101 next?
3. **Character art for the game cast** — Pete, Michelle, Billionaire X, the Politician don't have
   portraits yet (the restored art covers the existing DJ24/Sick 52 universe). Want me to generate them?
4. **Git tracking for images** — keep them deploy-only + OneDrive backup (current), or commit them?
5. **The other arcs** (Soundman, Factor C, Dj Strange, Everyone's-a-DJ) — fold in as **New Game+**
   seasons later?
