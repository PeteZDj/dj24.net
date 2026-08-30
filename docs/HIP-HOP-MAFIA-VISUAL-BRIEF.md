# Hip Hop Mafia — Visual Development Brief

> **Status:** Prompts ready to generate. **Blocked** on the Higgsfield connector (see bottom).
> Characters: [`HIP-HOP-MAFIA-DECK.md`](HIP-HOP-MAFIA-DECK.md) · Locations:
> [`ONGAKU-CIVILIAN-LIFE.md`](ONGAKU-CIVILIAN-LIFE.md)

---

## ⚠️ Direction corrected — match the existing house style

An earlier version of this brief proposed a photographic, cinematic look for the Mafia. **That was
wrong.** After reviewing the actual artwork in `public/images/`, the new characters must match what
is already there.

### What the existing art actually looks like

Reviewed `dj24/Dj24 - Crossfade.png`, `sick52/*.png` and `cities/blue_city_1.png`:

**Characters** — 1:1 square. **Full body, head to toe, centred.** Clean anime / manga cel-shaded
illustration with semi-realistic proportions and soft gradient shading. Standing, composed, facing
camera or slightly angled. Detailed costume with a signature prop or gear. Background is either a
soft studio gradient (Sick 52) or a split/dramatic environment (DJ24). A glowing signature motif —
waveform lines, neon rings — is common. Small sparkle glyph bottom-right.

**Locations** — wide 16:9. Painterly-anime cityscape, night, rain-slick streets, heavy practical
neon signage with readable lettering, atmospheric haze and steam, deep blues and purples with
saturated neon accents, small silhouetted figures for scale.

### The house style anchor

Prepend to **every** Hip Hop Mafia character prompt:

```
Full-body anime character illustration for "DJ24: War of Sound", matching a clean cel-shaded
manga style with semi-realistic proportions and soft gradient shading. Square 1:1 composition,
character centred, head to toe, standing and composed, facing viewer. Detailed modern streetwear
and tailoring, crisp linework, rich but controlled colour, subtle rim lighting. Smooth studio
gradient background in deep slate blue-grey. Confident still pose. High detail on fabric, jewellery
and face. No text, no speech bubbles, no watermark, no logo.
```

**Faction difference is in the CONTENT, not the rendering.** DJ24 and the Sick 52 carry sonic gear
and glowing waveforms. The Mafia carry **money, tailoring, gold and cars** — same art style,
different world. Where DJ24 has a glowing speaker-staff, the Mafia has a gold chain and a good coat.

### Mafia visual rules

- **No sound powers.** No waveform auras, no shockwave rings. That motif belongs to the mythic factions.
- **One gold object each** — chain, ring, tooth, watch, lighter. Never more than one.
- **Tailoring over armour.** Money that does not need to announce itself.
- **Guns holstered or absent.** Never brandished. The threat is implied.
- **Wide age range** — 20 to 70s. A family business, not a squad.
- **House colour** appears in the palette: ♠ black/gold · ♣ green/black · ♥ magenta/ivory · ♦ blue/silver.

### Enforce the rules as an explicit prompt tail

Stating the Mafia rules as prose in the brief is not enough — the model will drift toward glowing
effects and extra jewellery unless told not to. Append this after each character description, with
the palette swapped for the character's house:

```
[House] palette. Tailoring rather than armour, no weapon visible, exactly one gold object,
no glowing auras and no waveform or shockwave effects.
```

This was added for character 1 and is what held the look. For Blackout (2♠, silver crucifix and
deliberately no gold) drop the "exactly one gold object" clause and say **no gold at all**.

---

## Batch 1 — 10 characters

Generate in this order. Each prompt = house style anchor + the text below.

**1. Marcus "Grand Verse" Cole — A♠, The Chairman**
> Black man in his sixties, close-cropped grey hair, neat grey beard, heavy-set and dignified.
> Long charcoal overcoat over a dark open-collar shirt, single thick gold ring. Hands clasped in
> front. Calm, patient, unmistakably the most powerful man in the room. Warm gold accent lighting.

**2. Amara "Freq Kid" Nwosu — Signed artist, 19**
> Young Black woman, nineteen, box braids, oversized vintage bomber jacket over a hoodie, baggy
> jeans, chunky trainers, headphones around her neck, one small gold hoop. Notebook held against her
> chest. Caught between defiance and fear. Slightly smaller framing than the others — she is not one
> of them yet. Cool cyan accent lighting.

**3. Nadia "Silk" Silk — A♥, Boss of Hearts**
> Black woman, mid-thirties, sharp features, long straight dark hair, gold hoop earrings. Tailored
> ivory trouser suit, no shirt beneath the jacket, gold anklet. Arms loosely crossed. Poised, cold,
> in total control. Magenta and warm amber accent lighting.

**4. Malik "Bishop" Rawls — A♣, Boss of Clubs**
> Black man, late forties, shaved head, thick beard flecked grey, powerful build. Dark green
> military-cut overcoat over a black roll-neck, heavy gold chain, engraved sidearm holstered and
> visible at the hip. Feet planted. Green and black palette, hard side lighting.

**5. Salvatore "Saint Sal" Moretti — A♦, Boss of Diamonds**
> White man, sixties, silver hair swept back, narrow face, immaculate. Perfectly tailored midnight-blue
> three-piece suit, silver tie pin, gold pocket watch chain. Hands in pockets. Quiet, patrician,
> untouchable. Cool blue and silver palette.

**6. Rosaline "Mama Kade" Kade — 🃏 The Consigliere**
> Black woman in her seventies, silver hair pinned up, gold-rimmed glasses on a chain. Immaculate
> deep-green wool coat over a patterned dress, single gold brooch, sensible shoes. Handbag held in
> both hands. Kind face, unreadable eyes. Warm domestic gold lighting.

**7. Isiah "The Pen" Poole — 🃏 Ghost Ink, intelligence**
> Black man, forties, slight build, immaculate locs tied back, thin gold-rimmed glasses. Long dark
> coat over a black turtleneck, notebook in one hand, pen in the other. Watchful, quiet, faintly
> amused. Deep red and shadow palette.

**8. Kenneth "Blackout" Sayles — 2♠, Chief enforcer**
> Very tall heavily built Black man, late thirties, shaved head, thick beard, scarred knuckles.
> Plain black bomber jacket, dark jeans, boots, small silver crucifix at the throat, no gold. Hands
> loose at his sides. Deeply tired, visibly at war with himself. Harsh overhead light, deep shadow.

**9. Dae-Sun "Chrome" Pak — J♦, Redline garage**
> Korean man, early thirties, bleached hair, tattooed neck, oil-stained hands. Open mechanic's
> coverall tied at the waist over a white vest, thick gold chain, driving gloves tucked in pocket.
> Grinning, weight on one hip. Electric blue and orange garage lighting.

**10. Yolanda "Mercy" Reyes — Q♣, product routes**
> Latina woman, late thirties, hair scraped back tight, hard eyes, small scar through one eyebrow.
> Deliberately plain dark jacket, jeans, no jewellery except one thin gold chain. Arms folded.
> Utterly unremarkable by design — she is the one you would never pick out of a crowd. Muted green palette.

---

## Batch 2 — 10 locations

Wide **16:9**, painterly-anime cityscape, matching `cities/*.png`. Prepend:

```
Wide cinematic 16:9 painterly anime environment illustration for "DJ24: War of Sound" on Planet
Ongaku. Detailed neon signage with readable lettering, rain-slick reflective streets, atmospheric
haze and steam, deep blue and purple base palette with saturated neon accents, small silhouetted
figures for scale, dramatic perspective. Rich illustrated detail, no text overlay, no watermark.
```

1. **Vantaggio's** — exterior of a 60-year-old steakhouse in the Old Quarter at night. Warm gold
   window glow, an understated vintage sign, two black cars parked outside, rain, a doorman. The
   most important address in the criminal world, and it looks like nothing.
2. **Vantaggio's back room** — interior. One long table set for six, dark wood panelling, low warm
   lamps, a crate by the door for the guns, no windows. Empty, waiting.
3. **Southside at night** — residential blocks, corner store neon, basketball court under floodlight,
   apartment stoops, washing lines, warm human light against cold blue night. Freq Kid's neighbourhood.
4. **The Neon District** — Silk's territory. Towering club frontages, magenta and gold signage,
   queues behind velvet rope, rain, limousines, spotlights sweeping the sky.
5. **Ma Kade's** — a soul food restaurant on a Southside corner. Warm yellow interior glow through
   steamed windows, hand-painted sign, full tables visible inside, an old man sweeping the step.
6. **Skillet & Static** — 24-hour diner interior at 3am. Chrome counter, red vinyl booths, fluorescent
   and neon mix, almost empty, one occupied booth at the back, rain on the window.
7. **Redline Garage** — Chrome's Harbour District workshop at night. Modified cars on lifts, sparks,
   tool walls, roller doors open to a wet street, electric blue and orange work lighting.
8. **The Harbour District** — shipping containers, gantry cranes, freight, sodium lights in fog,
   black water, a lone car with headlights on. Where product moves.
9. **Central District skyline** — glass corporate towers at dusk, the NexaGen tower dominating,
   elevated highways, transit trains, cold blue and silver. Where Diamonds house does business.
10. **Vinyl & Crates record shop** — narrow interior packed floor-to-ceiling with record crates,
    warm tungsten light, dust in the air, a beaded curtain to a back room, hand-written section cards.

---

## Once generated

- Characters → `public/images/factions/hip-hop-mafia/`
- Locations → `public/images/locations/`
- Both are under the git-ignored `public/images/**` (see `CANON-NOTES.md` asset notes)
- Keep the exact prompt with each image, matching the `imagePrompt` convention in `src/comicsData.js`

---

## ✅ Higgsfield — unblocked, but use the right connector

The blocker is cleared. One thing to know before generating, because it wasted three sessions:

**There are two Higgsfield connectors registered, and only one works.** Installing the Higgsfield
plugin adds `plugin-higgsfield-higgsfield` alongside the pre-existing user-level `user-higgsfield`.
The plugin connector still returns *"Your Higgsfield session has expired"* — underneath, a bare
`401` on `GET /mcp/workspaces` — even immediately after `mcp_auth` reports success. The user-level
connector authenticates fine against the same account.

**Use `user-higgsfield`.** If a session reports the expired-session error, it is on the wrong
connector; switching is the fix, not re-authenticating.

Working setup as of the first successful run:

- Workspace `a0167cdd-9099-4222-875e-d47b57fae332`, private, `max` plan, ~1005 credits
- Model `nano_banana_pro` at **2 credits per image** — good prompt adherence on the cel-shaded
  house style, holds the "no waveform / one gold object" negatives
- Preflight any new prompt shape with `get_cost: true`, which submits no job and spends nothing
- 20 images across both batches is roughly 40 credits, so cost is not a constraint here
- For the remaining 19, use `generate_image_batch` — the prompts all differ, so batching is
  correct and avoids 19 round-trips

### Progress

- [x] **1. Marcus "Grand Verse" Cole** → `public/images/factions/hip-hop-mafia/marcus-grand-verse-cole.png`
- [x] **2. Amara "Freq Kid" Nwosu** → `amara-freq-kid-nwosu.png`
- [x] **3. Nadia "Silk" Silk** → `nadia-silk-silk.png`
- [x] **4. Malik "Bishop" Rawls** → `malik-bishop-rawls.png`
- [x] **5. Salvatore "Saint Sal" Moretti** → `salvatore-saint-sal-moretti.png`
- [x] **6. Rosaline "Mama Kade" Kade** → `rosaline-mama-kade.png`
- [x] **7. Isiah "The Pen" Poole** → `isiah-the-pen-poole.png`
- [x] **8. Kenneth "Blackout" Sayles** → `kenneth-blackout-sayles.png`
- [x] **9. Dae-Sun "Chrome" Pak** → `dae-sun-chrome-pak.png`
- [x] **10. Yolanda "Mercy" Reyes** → `yolanda-mercy-reyes.png`
- [x] Faction + restaurant logos → `public/images/logos/logo_hip_hop_mafia.png` (+ Vantaggio's, Ma Kade's, Skillet & Static, Velvet Room)
- [ ] Batch 2 locations (cityscapes)
