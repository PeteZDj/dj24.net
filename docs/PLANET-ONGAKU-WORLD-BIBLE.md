# Planet Ongaku — World Bible & Production Plan

> **Status:** Working draft / discussion capture. Decisions taken so far are marked ✅ and mirrored
> into [`CANON-NOTES.md`](CANON-NOTES.md); everything still open is collected in
> [§17 Open Decisions](#17--open-decisions).
> This document captures the full design conversation about expanding Planet Ongaku from a
> war-story wiki into a **living fictional universe** told through music, games and cinematics.

**Related docs:** [`README.md`](README.md) (knowledge-base map) · [`CANON-NOTES.md`](CANON-NOTES.md)
(canon decisions) · [`lore/03-factions.md`](lore/03-factions.md) (existing factions) ·
[`../content/game/`](../content/game/) (DJ24 XD design bible)

---

## Table of contents

1. [The core idea — the mix is the soundtrack](#1--the-core-idea--the-mix-is-the-soundtrack)
2. [Genres become story types](#2--genres-become-story-types)
3. [Ongaku needs ordinary life](#3--ongaku-needs-ordinary-life)
4. [Organisations are the backbone](#4--organisations-are-the-backbone)
5. [The Hip Hop Mafia](#5--the-hip-hop-mafia)
6. [The R&B layer — Velvet Records](#6--the-rb-layer--velvet-records)
7. [Sick 52 — keeping them distinct](#7--sick-52--keeping-them-distinct)
8. [NexaGen — scale it up](#8--nexagen--scale-it-up)
9. [The Tower Group — media empire](#9--the-tower-group)
10. [Military & political factions](#10--military--political-factions)
11. [Civilian institutions](#11--civilian-institutions)
12. [The relationship matrix](#12--the-relationship-matrix)
13. [Geography — build the atlas first](#13--geography--build-the-atlas-first)
14. [The 3D world — architecture, not one big scene](#14--the-3d-world--architecture-not-one-big-scene)
15. [Procedural city generation](#15--procedural-city-generation)
16. [Production roadmap](#16--production-roadmap)
17. [Open decisions](#17--open-decisions)

---

## 1 · The core idea — the mix is the soundtrack

The single biggest creative decision in this conversation. We are moving **away** from:

> DJ24 arrives → crowd cheers → DJ performs → generic 3D crowd dances.

That framing caps the visual universe and becomes repetitive within a handful of releases.
Instead:

> **Every DJ24 mix is the soundtrack to an event happening somewhere on Planet Ongaku.**

So *Attack on Trolley* is not DJ24 performing at a venue called Trolley. It is an **actual event in
the universe** — an assault, infiltration or siege of Trolley — and the mix scores that story.

### How an episode opens

A short audio drama establishes the situation, then the music takes over as the emotional narrator:

```
[Aircraft engines. Warning alarms. Radio interference.]

  "Trolley defence grid just went offline."
  "That wasn't us."
  "Then somebody else is already inside."

[MUSIC BEGINS]
```

You do **not** need another fifteen minutes of dialogue. The music is the storytelling.

### Consequences of this decision

- **DJ24 does not have to physically appear in every story.** He is the lens, not always the subject.
- The mix stops being a performance and becomes a **broadcast from inside the world**.
- Any location, any character, any genre becomes a legitimate subject for a release.
- Visual output (cinematics, stills, shorts) has a *reason* to exist — it is showing you the event
  the music is scoring.

---

## 2 · Genres become story types

This solves the "the universe cannot always be under attack" problem. Each genre owns a different
**register of story**, which means endless material without endless warfare.

| Genre | Story register | Example premises |
| --- | --- | --- |
| **EDM / Drum & Bass / hard electronic** | Spectacle, action, scale | *Attack on Trolley* · *Siege of Skyport 9* · *Escape from Neon District* · *The Last Transmission* · chases, heists, invasions, racing |
| **Hip-hop** | Street, criminal, cultural | A 2 AM drive across the city · meeting a Hip Hop Mafia lieutenant at a restaurant · an underground rap battle · someone owes money · a record deal negotiated · police watching a warehouse · two crews fighting over a district · someone gets out of prison |
| **R&B** | Personal, intimate, romantic | Meeting an ex at a rooftop restaurant · discovering a partner has been lying · driving home after an argument · waiting at an airport for someone who never arrives · a famous singer secretly dating someone from an enemy organisation · wandering the city all night after a breakup |
| **Afrobeats / Amapiano / House** | Life, celebration, culture | Nightlife, fashion, beaches, road trips, festivals, restaurants, holidays, house parties, university life, celebrity culture, weddings, neighbourhood events |

**The pattern:** you are effectively building a **fictional television universe told through DJ
mixes**. Genre selects the camera lens; the world stays constant underneath.

> A 60-minute R&B mix becomes the soundtrack to one character's worst night.
> A 60-minute DnB mix becomes the soundtrack to a fortress falling.
> Same city. Same week. Different lens.

---

## 3 · Ongaku needs ordinary life

An important expansion of the existing lore. Right now nearly every named character is a
soldier, hero, villain or commander. For the genre-as-story-type model to work, **characters need
lives**.

People on Planet Ongaku should also:

- Work at NexaGen on weekdays
- Own a restaurant
- Play professional football
- Produce music
- Work as a journalist
- Run a nightclub
- Be studying at university
- Race cars illegally
- Have a spouse and children
- Be secretly sleeping with someone from a rival organisation
- Go golfing on Sunday

### Why this matters

When the Sick 52 attack something, we are watching it happen **to people whose ordinary lives we
have already seen**. That is substantially more affecting than watching anonymous soldiers.

This is also what makes the R&B and Afrobeats registers possible at all — they need a world with
restaurants, rooftops, airports and neighbourhoods, not just battlefields.

**Design rule:** every major character gets a *civilian column* — a job, a home district, a
relationship, and a routine — even if they are primarily a fighter.

---

## 4 · Organisations are the backbone

The structural principle for everything that follows:

> **Create institutions first, characters second.**

Inventing random characters and later trying to connect them produces a thin world. Creating
institutions produces a world where characters arrive pre-connected, because they already have an
employer, a rival, a debt or a loyalty.

**Target: roughly 8–12 major organisations for Planet Ongaku.**

### The proposed roster of majors

| # | Organisation | Type | Status |
| --- | --- | --- | --- |
| 1 | **DJ24** | Elite guardian army | ✅ Exists in canon |
| 2 | **The Sick 52** | Radical antagonist network | ✅ Exists in canon |
| 3 | **Harmony Council** | Governing authority | ✅ Exists in canon |
| 4 | **NexaGen Harmonics** | Technology conglomerate | ✅ Exists — **needs major expansion** (§8) |
| 5 | **The Komedians** | Interdimensional invaders | ✅ Exists in canon |
| 6 | **The Hip Hop Mafia** | Underground criminal / cultural | 🆕 **New** (§5) |
| 7 | **The Tower Group** | Entertainment & media empire | 🆕 **New** (§9) |
| 8 | **Ongaku Defence Force** | Conventional military | 🆕 **New** (§10) |
| 9 | **Aero Command** | Air & space defence | 🆕 **New** (§10) |
| 10 | **The Vanguard** | Elite special operations | 🆕 **New** (§10) |
| 11 | **Planetary Security Directorate** | Intelligence / counterterrorism | 🆕 **New** (§10) |

**Eleven majors.** R&B deliberately does *not* get its own organisation — it lives inside the Tower
Group as **Velvet Records** (§6), which keeps the count down and makes the media empire load-bearing.

Below the majors sit the **civilian institutions** (§11) — leagues, transit, universities,
airlines, labels, restaurants — which do not need heavy lore, only names that get reused.

---

## 5 · The Hip Hop Mafia

The headline new organisation. An **old underground institution that grew out of Planet Ongaku's
own music industry** — not simply "hip-hop bad guys".

### Core positioning

> **The Hip Hop Mafia wants money and influence. The Sick 52 want change and destruction.**
> That distinction is the whole reason both can exist.

They are the **cultural-criminal** layer of the universe: the organisation that sits where music,
money, territory and street life overlap. Aesthetically they are the natural home for every
hip-hop mix we release.

### What they control

- Music venues
- Nightclubs
- Illegal substances — **but only through two of the five imprints** (see below)
- Street racing
- Gambling
- Underground performances and battle circuits
- Protection rackets
- Black-market entertainment (bootlegs, unlicensed broadcasts, banned recordings)
- Artists and promoters — contracts, bookings, and who is allowed to perform where

### The moral ambiguity (this is the important part)

Not everybody associated with them is evil, and that is deliberate:

- Some artists work with them because they are **the only organisation willing to finance
  underground music** under the Single Beat System.
- Some neighbourhoods **respect them** because they fund local businesses, keep the lights on, and
  settle disputes the authorities ignore.
- Some members are second-generation — born into it, not recruited.

This ambiguity is what makes them better antagonists than a straightforwardly evil crime syndicate,
and it gives hip-hop mixes emotional range beyond menace.

### Three tiers of culpability ✅ *decided*

**Not everyone in the Hip Hop Mafia is actually a criminal.** This is structural, not a disclaimer —
membership is a spectrum, and which tier a character sits in *is* their story:

| Tier | Who they are | Culpability |
| --- | --- | --- |
| **Made** | The Board, the imprint capos, the enforcers and crews | Actual criminals. They chose this |
| **Signed** | Artists, producers, promoters, DJs under contract | **Not criminals.** Leveraged, indebted, protected. Many just wanted a record deal |
| **Affiliated** | Local businesses, venue owners, neighbourhoods, families | Benefit from the money and look away. Some genuinely do not know |

A character can move between tiers, and that movement is a plot. *Freq Kid* is **Signed** and
terrified of becoming **Made**. That is her entire arc.

### The drug trade — a cell, not an institution ✅ *decided*

This is the resolution to the Black Noise conflict, and it is deliberately narrow on **both** sides.

> **Only a few Sick 52 members manufacture it. Only some of the Hip Hop Mafia distribute it.**

Neither organisation is "the drug faction." The trade is a **small, disowned operation running
through both**, and that is far more interesting than either group owning it outright.

#### On the Sick 52 side — "The Pressing Plant"

A cell of a **handful of members**, not the 52. They cook pure **Black Noise** and consider it an
ideological weapon — a tool for *awakening* people out of the Single Beat System.

- **Black Vinyl (#9)** — memory corruption; runs the cell. The name is the pun with teeth: he
  presses records and he presses product, in the same building.
- **Static Prophet (#4)** — supplies the distortion formula. Believes the visions are prophecy.
- **One or two Tier V Mutated Prototypes** — the experimental tier is the natural lab.

**Red Silence does not sanction it.** He tolerates it because it funds the war — and that tolerance
is a crack in the Sick 52's ideological purity that the rest of the 52 can feel. Several members
consider the Pressing Plant a betrayal of everything the exile was for.

> This also feeds an existing open canon slot: the **new Sick 52 leader who rises in Season 3**
> could rise on Pressing Plant money.

#### On the Hip Hop Mafia side — the "cut side"

The Mafia buys pure Black Noise wholesale and **cuts it into a recreational street product**
("Static Cut") sold for profit. But only two imprints touch it:

| Imprint | Position on Static Cut |
| --- | --- |
| **Redline** (Chrome) | **Moves it.** Harbour District logistics, hidden in vehicle freight |
| **Ghost Ink** (The Pen) | **Profits from it** indirectly — leverage, protection, who gets told what |
| **Velvet Static** (Silk) | **Refuses.** Keeps it out of her clubs — she says it kills the music, and she is right |
| **Deep Crates** (Crate) | **Refuses.** Old-school; guns yes, product no |
| **Clean Count** (Ledger) | **Compromised.** Publicly clean, quietly launders it through royalties |

- **Blackout**, the chief enforcer, refuses any order involving the drug side. Deeply religious.
  This will eventually cost him.
- **Mama Kade** insists the community fund is clean money. **Ledger quietly mixes it.** She may not
  know. She may have decided not to find out.

#### Why this version is better

The Sick 52 despise the Mafia for **commercialising the revolution**. The Mafia thinks the Sick 52
are lunatics who happen to be good chemists. Same substance, opposite purposes — and a **civil war
inside each organisation** about whether to be in the business at all.

That single decision generates more story than the drug trade itself ever would.

### Naming convention (a proposed design rule)

Each faction should be identifiable by how its members are *named*:

| Faction | Naming style | Why |
| --- | --- | --- |
| **DJ24** | Sound-tech codenames — Sync, Crossfade, Sidechain | They are an army; the person is subordinate to the function |
| **Sick 52** | Ominous titles — Red Silence, Bass Phantom, Crescendo Wraith | They are myth; they have shed their human names |
| **Hip Hop Mafia** | **Street alias + real name** — Marcus "Grand Verse" Otieno | They are **people**. They have mothers, districts and birth certificates |

That third convention is doing real work: it instantly signals that this faction belongs to the
*ordinary life* layer of the world (§3), not the mythic layer.

### The Made Deck — their own 52

The Mafia's **Made** tier is dealt as a **deck of 52 (+2 Jokers)**, mirroring the Sick Deck but
built on territory, guns and cars rather than sound mutation. **A♠ is the boss of all bosses.**

Full roster, house compositions, stat block and the Commission:
**[`HIP-HOP-MAFIA-DECK.md`](HIP-HOP-MAFIA-DECK.md)**.

In-world, **the Mafia's deck came first** — the underworld has counted itself in cards for
generations, and the Sick 52 dealt themselves as a deck in mockery of the streets. The Chairman
considers the Sick Deck plagiarism, which gives the two organisations a personal grievance on top
of a business one.

### Structure — a crime family shaped like a record label

The Mafia is organised as a **record company crossed with a crime family**. The music-business
vocabulary *is* the criminal hierarchy — which is exactly why they have survived legally for so long.

```
THE BOARD          — the Chairman + the Consigliere. Strategy, money, judgement.
   │
THE IMPRINTS       — five "labels", each a capo running a territory & a racket.
   │
THE CREWS          — street-level operators, signed under an imprint.
   │
THE ROSTER         — artists, promoters, DJs. Not criminals. Leveraged, indebted, protected.
```

**"Getting signed"** means being brought into the organisation. **"Dropped"** means what you think
it means. **Royalties** flow both ways — the Mafia takes points off artists, and artists take
protection in return.

### The roster — proposed characters

> All names below are **first-draft proposals** for discussion. Nothing is locked. Ages, districts
> and relationships are suggestions to make them feel like residents rather than archetypes.

#### The Board

| Alias | Name | Role | Notes |
| --- | --- | --- | --- |
| **"Grand Verse"** | Marcus Otieno | **The Chairman** | 60s. Was a genuinely great MC before he was a boss — that is why artists still respect him. Owns *Verse Holdings*, a legitimate publishing company. Believes he is preserving hip-hop, not exploiting it. Golfs on Sundays. |
| **"Mama Kade"** | Rosaline Kade | **The Consigliere** | 70s. Runs the books and the community fund. The reason Southside tolerates them. Everyone's aunt; nobody's friend. Has never been arrested. |
| **"8-Bar"** | Tunde Adeyemi | **The Underboss** | 40s. Street operations. Named for how long he gives you to explain yourself. The most likely successor and the most likely coup. |

#### The Five Imprints (capos)

| Alias | Name | Imprint & territory | Racket |
| --- | --- | --- | --- |
| **"Silk"** | Nadia Silk | *Velvet Static* — Neon District | Nightclubs, venues, door control, who gets booked |
| **"Ledger"** | Emeka Duru | *Clean Count* — Central District | Laundering through royalties, publishing and touring receipts |
| **"Crate"** | Bobby Crate | *Deep Crates* — Old Quarter | Weapons and contraband moved through a record shop; the archive |
| **"Chrome"** | Dae-Sun Pak | *Redline* — Harbour District | Street racing, chop shops, diverted NexaGen vehicle tech |
| **"The Pen"** | Isiah Poole | *Ghost Ink* — everywhere | Intelligence and blackmail. He ghostwrote half the planet's biggest records — so he knows every secret anyone ever put in a bar |

#### The Crews & the Roster

| Alias | Name | Role | Notes |
| --- | --- | --- | --- |
| **"Blackout"** | Kwame Sesay | Chief enforcer | Kills the sound before he kills you. Deeply religious. Hates the drug side of the business. |
| **"Tapes"** | Yusuf Bello | Smuggler / logistics | Moves product disguised as cassette and vinyl stock. Charming, unreliable, indispensable. |
| **"Reverend"** | Ezra Nkomo | Fixer / negotiator | Handles disputes with other organisations. Officially a chaplain at a Southside community centre — which is true. |
| **"Freq Kid"** | Amara Nwosu | Signed artist, 19 | The prodigy. Genuinely brilliant, genuinely trapped. **Our POV character into this world** — the one whose life the audience actually follows. |
| **"Static Cut"** | — | *Not a person* | The Mafia's street-cut version of the drug (see §17) |

**Casting note:** *Freq Kid* is the most important character on this list. The Chairman gives the
organisation weight, but a 19-year-old with talent, a contract and no exit is what makes a hip-hop
mix into a *story*.

### Story premises this unlocks immediately

- Freq Kid's debut is being held hostage until she signs an extension.
- Chrome is diverting NexaGen vehicle tech; NexaGen has noticed.
- The Pen has a recording that would destroy a Harmony Council member — and he is deciding what
  it is worth.
- Two crews are fighting over a district and the Board has to choose a side.
- Blackout refuses an order involving the drug trade.
- A media conglomerate documentary crew wants access, and the Chairman is vain enough to say yes.

---

## 6 · The R&B layer — Velvet Records

✅ *Decided: R&B does **not** get its own organisation. It lives inside the media conglomerate as its
flagship prestige label.* One fewer institution to maintain, and it makes the media empire (§9)
immediately load-bearing rather than abstract.

**Velvet Records** — the crown-jewel R&B and soul imprint of **Tower Sound**, itself a division of
**The Tower Group** (§9).

- The most prestigious contract on the planet. Signing to Velvet *means* something.
- Publicly glamorous, privately vicious. No violence here — **leverage**. Options, exclusivity
  clauses, masters ownership, and who gets the November release slot.
- Home turf: **Rose City** (already canon as the romantic-ballad district) plus **Rose Hill** in the
  capital.

### The Velvet Room

The flavour of the parked "elite society" idea survives as a **place** rather than an organisation:
the **Velvet Room** is the members-only supper club *owned by the label*, with a room in every major
city. Same function, no extra faction to track.

This is where R&B stories physically happen — the rooftop restaurant, the deal, the affair, the
public reconciliation staged for the cameras. Every premise from §2 now has an address and a
recurring set of faces.

**Why this is better than a separate society:** a label can **own** you. A social club can only
exclude you. Contracts are a far stronger engine for R&B drama than membership is — and it puts
your R&B characters and your media empire in the same building.

---

## 7 · Sick 52 — keeping them distinct

With the Hip Hop Mafia added, the Sick 52 must be pushed **further from conventional crime**, not
closer. They should be a **radical movement and antagonist network** dedicated to disrupting
Ongaku's musical order.

| | **Hip Hop Mafia** | **Sick 52** |
| --- | --- | --- |
| **Wants** | Money and influence | Change, destruction, ideological transformation |
| **Operates** | Territory, business, contracts | Cells, infiltration, recruitment |
| **Scale** | City districts | Planetary and existential |
| **Negotiable?** | Yes — everything has a price | No — they are not in it for a price |
| **Members** | Have families, jobs, home districts | Have shed their names |

**Whatever the eventual lore around the 52 cards becomes, they represent something much larger and
more dangerous than the Hip Hop Mafia.** The Mafia can be bargained with. The Sick 52 cannot.

✅ **The Black Noise conflict is resolved** (§5). Existing lore
([`lore/03-factions.md`](lore/03-factions.md)) has the Sick 52 controlling the post-collapse
underground and distributing **Black Noise**. The resolution keeps that true but makes it **narrow**:
only a small cell — the **Pressing Plant** — manufactures it, Red Silence merely tolerates it as
funding, and much of the 52 consider it a betrayal of the exile. The Sick 52 as a whole remain
ideological, not commercial.

---

## 8 · NexaGen — scale it up

NexaGen is currently a music-weapons company. It should become **enormous** — a technology
conglomerate spanning:

- Artificial intelligence
- Robotics
- Communications
- Transportation
- Energy
- Medical technology
- Weapons contracts
- Consumer electronics
- Space technology

### Why this matters more than it sounds

A conglomerate this broad can appear in **every genre register** without contrivance:

| Genre | NexaGen's role |
| --- | --- |
| R&B | A character works there. Their partner works there. The breakup happens in the lobby. |
| Hip-hop | A character steals something from them. Chrome diverts their vehicle tech. |
| EDM / action | A military faction buys their drones. A Sick 52 cell targets their research facility. |
| Racing | Illegal modification of NexaGen vehicles is the entire scene. |

NexaGen becomes one of the **connective tissues** of the universe — the thing that lets a personal
story and a war story share a set.

### Divisions

| Division | Business | Story use |
| --- | --- | --- |
| **NexaGen Sound** | The original music-weapons and AI-artist arm | The existing canon lives here |
| **NexaGen Intelligence** | AI, data, the Synth line | Project Harmonia, Synth-09 |
| **NexaGen Motion** | Vehicles, transport, aviation systems | Chrome's Redline steals from here |
| **NexaGen Power** | Planetary energy and grid infrastructure | Blackouts as a political weapon |
| **NexaGen Life** | Medical technology, prosthetics, implants | Where mutation research hides |
| **NexaGen Defence** | Weapons contracts | Sells to the ODF and Aero Command |
| **NexaGen Consumer** | Phones, audio, wearables | The reason ordinary people own NexaGen products |
| **NexaGen Orbital** | Space technology and launch | Long-horizon galactic storylines |
| **Blue Line Security** | Its own private armed division | A standing political scandal |

### The people

**Retained from existing canon:** Lysander Coda (CEO), Synth-09, Unit Omega, Project Harmonia.
The expansion adds the civilian and commercial layer around them:

| Name | Role | Notes |
| --- | --- | --- |
| **Lysander Coda** | CEO | ✅ Canon. "Organic music is obsolete." |
| **Synth-09** | The unstable perfect AI musician | ✅ Canon |
| **Unit Omega** | Mass-produced enforcer | ✅ Canon |
| **Halvard Renn** | Chief Operating Officer | The one who actually runs the company while Coda pursues Harmonia. Bored, competent, dangerous |
| **Dr. Ines Abara** | Head of NexaGen Life | Believes she is curing people. Her research is the mutation programme and she has not been told |
| **Colonel Tam Vasse** | Director, Blue Line Security | Ex-ODF. Commands a private army with no oversight and knows exactly what that is worth |
| **Joss Karume** | Mid-level analyst, NexaGen Sound | **Our ordinary-life POV.** Works there Monday to Friday. Dating someone from a rival organisation. This is the R&B character |
| **Priya Solence** | Whistleblower | Found something in the Life division archives. Now deciding who to give it to — the press, the PSD, or the highest bidder |

**Casting note:** *Joss Karume* is the most valuable name on this list. Coda gives NexaGen menace,
but an ordinary employee with a commute, a badge and a complicated relationship is what turns a
corporate monolith into a place where R&B stories can happen (§3).

---

## 9 · The Tower Group

✅ *Decided.* The planet's dominant entertainment and media empire — **The Tower Group**.

The name hooks directly into the canon **Sound Towers**: the media empire and the Harmony Council's
control apparatus are **physically intertwined**, broadcasting from the same infrastructure that
enforces the Single Beat System. That is not a coincidence in-world, and people know it.

Do not treat it as a television station. It owns the culture.

### Divisions

| Division | Business |
| --- | --- |
| **Tower Broadcasting** | The TV networks |
| **Tower Stream** | Streaming platform |
| **24 Radio** | Music and urban radio — **the station that carries the mixes** |
| **OBC News** | News division (the old Ongaku Broadcasting Corporation, acquired and kept as a trusted brand) |
| **Tower Sound** | Music labels — including **Velvet Records** (§6) |
| **Tower Pictures** | Film studios |
| **Tower Sports** | Sports broadcasting; holds the Premier Ongaku League and Grand Prix rights |
| **Tower Print** | Celebrity magazines and press |
| **Tower Live** | Concert promotion and venues |
| **Tower Ads** | Advertising — the profit engine nobody talks about |

### Why this is the highest-leverage new organisation

It lets **DJ24 exist inside the universe through media**. Your audio intros stop breaking the fourth
wall and become in-world broadcasts:

> *"You're listening to 24 Radio…"*

> *"We interrupt tonight's broadcast with reports of explosions near Trolley…"*

The mix is no longer a product *about* the world. It is **a transmission from within it**.

### The 24 Hour — your framing device

**24 Radio's overnight slot is called *The 24 Hour*.** It runs from midnight, it plays the mixes,
and it is hosted by a voice the whole planet knows and nobody has ever seen.

That show *is* the release format. Every mix you put out is an episode of it. The host's between-
track talk is where the audio drama lives, the news bulletins are where world events land, and the
callers are where ordinary life leaks in.

### The people

| Name | Role | Notes |
| --- | --- | --- |
| **Solomon Vey — "Midnight"** | Host of *The 24 Hour*, 24 Radio | The most recognisable voice on Ongaku. Face never shown. Plays the mixes, reads the bulletins, takes the calls. **The audience's narrator** |
| **Corinne Achebe-Ward** | Group Chairman, The Tower Group | Third generation. Inherited a broadcaster and built an empire. Dines with the Harmony Council and despises them |
| **Dov Marchetti** | President, Tower Sound / Velvet Records | Signs the R&B stars. Charming, ruinous. Holds the contracts that drive half the personal stories |
| **Naima Oyelaran** | Lead anchor, OBC News | The face of the official version of events. Increasingly aware that she is reading approved copy |
| **Gideon Falk** | Investigative journalist, OBC News | Working the Hip Hop Mafia story. Tower's music division would very much prefer he did not |
| **"Auntie Pat" — Patience Mubiru** | Overnight switchboard, 24 Radio | Screens the calls on *The 24 Hour*. Knows more about what is really happening on Ongaku than the PSD does |

### The hypocrisy that makes it work

Tower's news division **publicly condemns the Hip Hop Mafia** while Tower Sound **quietly profits
from artists connected to them**. Gideon Falk is investigating a story that his own employer's music
arm is financially invested in burying. Corinne knows. Dov knows. Neither will say it out loud.

That single internal contradiction will generate stories for years.

---

## 10 · Military & political factions

Do not create one generic "Planet Ongaku military". Several bodies with overlapping jurisdictions
create political complexity for free.

| Faction | Role | Story flavour |
| --- | --- | --- |
| **Ongaku Defence Force (ODF)** | Conventional planetary military | Mass, bureaucracy, scale |
| **Aero Command** | Aviation, space and air defence | Connects naturally to the aircraft-heavy EDM concepts — *Attack on Trolley*, *Siege of Skyport 9* |
| **The Vanguard** | Elite special operations | **Small recurring cast**, not thousands of anonymous soldiers. This is where audiences form attachments |
| **Planetary Security Directorate (PSD)** | Intelligence and counterterrorism | CIA / MI6-type stories: surveillance, infiltration, deniability |

### Ongaku Defence Force (ODF)

The conventional military. Enormous, slow, politically entangled, and dependent on NexaGen for most
of its hardware.

| Name | Role | Notes |
| --- | --- | --- |
| **Marshal Adaeze Kroon** | Supreme Commander, ODF | Career officer. Publicly loyal to the Harmony Council, privately building leverage against it |
| **General Bode Ferris** | Chief of Ground Forces | Believes the ODF should have absorbed DJ24 decades ago. Resents them openly |
| **Quartermaster Elias Tunde** | Procurement | Signs the NexaGen contracts. Every corruption story starts at his desk |

### Aero Command

Aviation, orbital defence and the Skyports. **The natural home of your aircraft-heavy EDM stories.**
*Attack on Trolley* and *Siege of Skyport 9* are Aero Command incidents.

| Name | Role | Notes |
| --- | --- | --- |
| **Air Marshal Kestrel Vann** | Commander, Aero Command | Flew combat before she commanded it. The one senior officer the Vanguard actually respects |
| **Wing Captain Idris Moyo** | Skyport 9 station commander | On duty the night the defence grid goes offline |
| **"Rook" — Lt. Sana Delacroix** | Interceptor pilot | Recurring. Young, gifted, insubordinate |

### The Vanguard

Elite special operations. **Keep this small — six named operators, not an army.** This is where the
audience forms attachments, so these people must be recurring, specific, and killable.

| Name | Callsign | Role |
| --- | --- | --- |
| **Maj. Ovie Ranse** | *Anvil* | Team lead. Steady, tired, decent |
| **Sgt. Halima Baz** | *Needle* | Breacher and demolitions |
| **Cpl. Teo Vance** | *Cricket* | Comms and signals — the one who hears things first |
| **Lt. Ada Nkemdi** | *Verity* | Intelligence liaison, seconded from the PSD and not entirely trusted |
| **Spc. Ruben Oso** | *Choir* | Sniper. Barely speaks |
| **CWO Jae-Min Suh** | *Ladder* | Pilot and extraction |

### Planetary Security Directorate (PSD)

Intelligence and counterterrorism. The Sick 52 file is theirs, which means the PSD is the
organisation most likely to be **already infiltrated**.

| Name | Role | Notes |
| --- | --- | --- |
| **Director Wren Calloway** | Director-General | Runs the Sick 52 counter-programme. Has approved things she will never be able to justify |
| **"The Registrar" — Osei Blankson** | Head of Records | Decides what officially happened. Effectively edits history |
| **Agent Mira Sote** | Deep-cover operative | Embedded inside the Hip Hop Mafia's Signed tier. Has been under so long her cover life is now her real one |

### Plus the non-state forces

- **Private military contractors** — deniable, purchasable, morally convenient.
- **Blue Line Security** — NexaGen's own armed division (§8). A corporation with a standing army is
  a permanent political scandal.
- **National / continental militaries** — individual continents field their own forces.
- **DJ24 answers to none of them** — already canon, and precisely the friction that makes the
  political layer work. Four state forces with overlapping jurisdictions, plus a corporate army,
  plus an elite unit accountable to nobody.

### The jurisdictional friction

The point of having four bodies instead of one is that **they compete**. When Trolley goes dark:
Aero Command owns the airspace, the ODF owns the ground, the PSD owns the intelligence, the
Vanguard is already inside, and DJ24 did not ask permission. Nobody is in charge, and everybody is
briefing against everybody else by morning.

That is political complexity for free, and it costs one table to set up.

---

## 11 · Civilian institutions

This is what stops Planet Ongaku feeling like a game map and starts making it feel like somewhere
people live. **These do not need lore documents.** Most need only a name and a location.

| Category | Examples |
| --- | --- |
| Sport | **Ongaku Grand Prix** (motorsport) · **Premier Ongaku League** (football) |
| Transit | **Metro Transit Authority** (trains, buses) |
| Education | **Ongaku University** · the Royal Music School (already canon in DJ24 XD) |
| Aviation | **SkyOngaku** or a rival commercial carrier |
| Finance | Banks, exchanges, lenders |
| Food & retail | Restaurant chains, cafés, corner shops |
| Fashion | Fashion houses, streetwear labels |
| Music | Record labels (mostly owned by the media conglomerate) |
| Hospitality | Hotels |
| Industry | Car manufacturers |
| News | Newspapers and outlets (mostly owned by the conglomerate) |

> **The rule that makes this work:** some of these exist only because a character needed somewhere
> to buy coffee. **But once you have named that café, keep it.** Three mixes later, another
> character meets somebody there. That is how fictional worlds acquire history.

**These are now named and built out** — restaurant chains, car marques, gun makers, leagues,
transit, universities, airlines, banks, fashion houses, hotels and press — together with the
**Civilian Column** system that gives every character a job, a home, a routine, a vice and a secret:
**[`ONGAKU-CIVILIAN-LIFE.md`](ONGAKU-CIVILIAN-LIFE.md)**.

---

## 12 · The relationship matrix

Before inventing dozens of factions, define **how every major organisation relates to every other**.
This is where stories start writing themselves.

| Relationship | Nature |
| --- | --- |
| **Hip Hop Mafia ↔ Sick 52** | Hostile — but two imprints buy Black Noise from the Pressing Plant cell (§5). Both organisations are internally split about it |
| **Hip Hop Mafia ↔ NexaGen** | Chrome's Redline steals and diverts NexaGen Motion technology |
| **Hip Hop Mafia ↔ Tower Group** | Tower's news arm condemns them while Tower Sound quietly profits from artists connected to them |
| **Hip Hop Mafia ↔ PSD** | Agent Mira Sote is embedded in their Signed tier and has been under too long |
| **NexaGen ↔ Harmony Council** | Major defence contractor with deep political influence |
| **NexaGen ↔ military** | All four state forces depend on NexaGen hardware — and resent it |
| **NexaGen ↔ Tower Group** | Tower's biggest advertiser. Which shapes what OBC News reports |
| **Tower Group ↔ Harmony Council** | Access traded against censorship. They broadcast from Council Sound Towers |
| **Tower Group ↔ Velvet Records artists** | Ownership. Contracts, masters, and release slots are the leverage |
| **Sick 52 ↔ everyone** | Infiltration, ideological recruitment, destabilisation |
| **Sick 52 ↔ Sick 52** | Internal — Red Silence tolerates the Pressing Plant to fund the war; much of the 52 consider it a betrayal |
| **Military ↔ military** | ODF, Aero Command, the PSD and the Vanguard compete for jurisdiction and brief against each other |
| **DJ24 ↔ all of the above** | Answers to none of them; tolerated because it is needed |

### Why this is the highest-leverage part of the whole bible

It changes the creative question you ask yourself. You stop asking:

> ❌ *"What should this hip-hop mix show?"*

And start asking:

> ✅ **"What's happening between the Hip Hop Mafia and NexaGen tonight?"**

And suddenly you have your mix.

---

## 13 · Geography — build the atlas first

Before modelling anything spherical, define the geography **conceptually**.

```
5–7 continents
    ↓
20–40 significant cities
    ↓
each city has 5–15 recognised districts
    ↓
each district has landmarks
```

**Do not physically build all of this.** The atlas is a writing tool first and a build target second.

### Reconciling with existing canon

Ongaku already has genre megacities in the wiki — **Classic City, Electric City, Rock City, Blue
City, Pop City, Urban City, Cloud City, Rose City**, plus the Komedian territories (Hall of
Laughter, Joke City, Clown Country). The new atlas should **absorb these as the major cities**,
not replace them:

| Existing city | Becomes | Owning organisation |
| --- | --- | --- |
| **Urban City** — Hip-Hop Heartland | Hip Hop Mafia home turf | The Board sits here |
| **Rose City** — Romantic Ballad District | Velvet Records' seat | R&B story register |
| **Electric City** — Neon Pulse Metropolis | EDM / action register | NexaGen presence |
| **Classic City** — Conservatory Capital | Harmony Council authority | The Sacred Conservatory |
| **Ongaku Prime** | Capital — government, corporate, media | Council + NexaGen + The Tower Group |

### The capital city, district by district

Conceptually ~100–200 km². Choosing a district should immediately suggest a story:

| District | Character | Suggests |
| --- | --- | --- |
| **Central District** | Corporations, government, NexaGen HQ | Corporate thrillers, political stories |
| **Neon District** | Entertainment, nightlife | Club stories, Silk's territory |
| **Old Quarter** | Historic neighbourhoods, markets, cafés | Slice-of-life, Crate's record shop |
| **Southside** | Hip Hop Mafia influence | Street stories, the community fund, Freq Kid's home |
| **Harbour District** | Shipping, warehouses, organised crime | Smuggling, Chrome's Redline, police surveillance |
| **University District** | Students, young characters | Coming-of-age, Afrobeats/house register |
| **Skyport** | Airports, aviation, logistics | Departures, arrivals, R&B goodbyes, Aero Command |
| **Trolley** | Fortress / strategic site adjacent to the city | The EDM spectacle register — *Attack on Trolley* |
| **Rose Hill** *(proposed)* | Affluent, hillside, restaurants | Velvet Circle, rooftop scenes, old money |

---

## 14 · The 3D world — architecture, not one big scene

An important correction to earlier thinking:

> **One continuous world does NOT mean one Unity scene.**

You want **one perceived world**, with **streamed pieces** underneath it.

```
PLANET ONGAKU
│
├── Persistent World Systems
│   ├── Time
│   ├── Weather
│   ├── Characters
│   ├── Traffic
│   ├── World State
│   └── Streaming
│
├── Continent 01
│   ├── Region
│   │   ├── City
│   │   │   ├── District A
│   │   │   ├── District B
│   │   │   └── District C
│   │   └── Countryside
│   └── ...
│
└── Continent 02
```

The persistent systems live at the top and never unload. Geography streams in and out beneath them.

### The experience this produces

A character can leave their apartment → get into a car → drive out of the city → reach an airport →
fly somewhere else — with streaming happening invisibly underneath. That is the GTA / Just Cause
world feel, and it is achievable without a single monolithic scene.

**Engine note:** the existing DJ24 Unity project is **Unity 6000.4.8f1**, living in a git-ignored
`game/` folder with tracked reference material in [`docs/game/`](game/). World data can be exported
into it through the same pipeline already used for roster data
(`node scripts/export-game-data.mjs`).

---

## 15 · Procedural city generation

The single biggest time-saver available. Instead of modelling Planet Ongaku, **build rules that
generate Planet Ongaku**.

### Tooling

| Tool | Use |
| --- | --- |
| **CityEngine** | Rule-based urban layout — the classic choice for this |
| **Houdini** | Procedural everything; strongest for bespoke pipelines |
| **Blender Geometry Nodes** | Free, capable, integrates with existing Blender work |
| **Unity asset-store tooling** | Road networks, terrain, splines |
| **Editor scripting + CLI agents** | AI-assisted population and modification of content |

### The generation chain

```
roads → blocks → lots → buildings → vegetation → street furniture → traffic infrastructure
```

### The division of labour that matters

> **Procedural = ordinary. Hand-crafted = important.**

Let the generator sketch the first draft, then hand-build only the things audiences actually
remember:

- Nexagen Tower
- Trolley Fortress
- The Hip Hop Mafia's nightclub
- DJ24 headquarters
- Skyport 9
- The major stadium
- The famous bridge
- Central train station

**For Planet Ongaku, do not build a city — build a city generator.** Define the rules, let the
software draft, then customise the landmarks that carry the story. That combines the speed of a
city-sim with the control of hand modelling and the flexibility of AI tooling.

---

## 16 · Production roadmap

| Phase | Goal | Detail |
| --- | --- | --- |
| **1 — Asset consolidation** | One organised master project | Bring the Maya models, existing Unity content, characters, vehicles, buildings and old DJ24 assets into a single project. Standardise naming, materials, scale, prefabs and LODs |
| **2 — World bible** | Define before generating | Continents, primary city, districts, corporations, factions, major characters, history. **This document is the start of Phase 2** |
| **3 — First district** | One genuinely excellent district | Built with the procedural pipeline **plus** hand-crafted landmarks. Prove the pipeline on a small footprint |
| **4 — Living systems** | Make it inhabited | Traffic, pedestrians, day/night, weather, shops, interiors, ambient audio, NPC routines |
| **5 — Story system** | Make it narrative | Characters + organisations + relationships + locations + world events, as data |
| **6 — First cinematic** | Prove the concept | **Attack on Trolley** as the prototype |

### The Phase 6 prototype, and its opposite

Build *Attack on Trolley* first:

```
audio drama → establishing shots → the incident → soundtrack begins → cinematic narrative → conclusion
```

Then build something **completely opposite**: an **R&B night-drive story** in the same city.

> **If both work inside the same city, you have proven the entire concept.**

That is the real test — not whether the action piece looks good, but whether the same world can
hold a siege and a breakup.

---

## 17 · Open decisions

### ✅ Decided in this session

| Decision | Resolution |
| --- | --- |
| **Who controls the drugs** | **Cell-level on both sides.** Only a few Sick 52 members manufacture (the **Pressing Plant** — Black Vinyl, Static Prophet, Tier V prototypes); only two of the Mafia's five imprints distribute (**Redline** and **Ghost Ink**). Red Silence tolerates it as funding; Silk, Crate and Blackout refuse it outright. See §5 |
| **Not everyone in the Mafia is a criminal** | Formalised as **three tiers of culpability** — Made / Signed / Affiliated. Movement between tiers is a plot. See §5 |
| **Media conglomerate name** | **The Tower Group**, with **24 Radio** as its urban station, **OBC News** as its acquired news brand, and ***The 24 Hour*** as the overnight show that carries the mixes. See §9 |
| **Does R&B get its own organisation** | **No.** R&B is **Velvet Records**, the flagship prestige label inside Tower Sound. The *Velvet Room* survives as the label-owned members' club. See §6 |

### Still open

Questions that still need a creator decision before any of this becomes canon.

### Decision 1 — The "Hip Hop Mafia" name collision

`docs/source/the-dj-24.md` already uses **"Hip Hop Mafia"** as the Hour 06 entry in an early
genre-named DJ24 roster pass (that pass is archived, not live — the live Hour 06 is **Striker**).
Options: keep the name for the new faction and note the archived usage as superseded; or rename one
of them.

### Decision 2 — Where do these factions live on the site?

The existing site has five factions with pages under `content/factions/` and entries in
`src/contentLoader.js` (`factionsData`). Do the new organisations become full faction pages, a new
"Organisations" section, or wiki pages only until the lore firms up?

### Decision 3 — Canonical relationship to DJ24 XD

The game's *Z Story* already has a crime/come-up layer (D-Boys, trap houses, the Deck of 52). Is
the **Hip Hop Mafia the organisation behind the D-Boys**, a rival to them, or a later-era
institution entirely? Resolving this links the game and the mixes into one continuity.

---

## Appendix — what changed in this conversation

| Before | After |
| --- | --- |
| Mixes are DJ24 performances | Mixes are **soundtracks to in-world events** |
| One genre, one mood | **Genre selects the story register** |
| Characters are soldiers and villains | Characters have **jobs, homes and relationships** |
| Characters invented first | **Institutions invented first** |
| 5 factions | **11 major organisations + civilian institutions** |
| NexaGen is a music-weapons firm | NexaGen is a **planet-spanning tech conglomerate, nine divisions** |
| No media layer | **The Tower Group** — a media empire that makes the mixes in-world broadcasts |
| Drugs belong to one faction | A **cell inside two factions**, disowned by both |
| "Build the city" | **"Build the city generator"** |
| One big Unity scene | **One perceived world, streamed underneath** |

---

*Draft captured from creator discussion. Nothing in this document is canon until reflected in
[`CANON-NOTES.md`](CANON-NOTES.md).*
