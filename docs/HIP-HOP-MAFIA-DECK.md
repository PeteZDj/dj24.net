# The Made Deck — The Hip Hop Mafia's 52

> **Status:** Proposal for creator review. Nothing here is canon yet.
> Organisation background in [`PLANET-ONGAKU-WORLD-BIBLE.md`](PLANET-ONGAKU-WORLD-BIBLE.md) §5 ·
> Art direction in [`HIP-HOP-MAFIA-VISUAL-BRIEF.md`](HIP-HOP-MAFIA-VISUAL-BRIEF.md)

---

## First: how many Sick 52 members?

**Fifty-two. That number is already locked and should not change.**

The Sick 52 roster is fully canonical and matched across source → lore → code: 52 members in
5 tiers (12 / 12 / 12 / 8 / 8), dealt into **4 houses of 13** with **A♠ = Final Drop** as the
strongest card. It is live at [`/sick-deck`](../content/wiki/the-sick-deck.md) and wired into
`sick52Suits` / `sick52Deck` in `src/contentLoader.js`.

So this document is **not** a change to the Sick 52. It gives the **Hip Hop Mafia its own deck** —
a deliberate mirror, which needs an in-world reason to exist. Here it is:

> **The Mafia's deck came first.** It is an old street ranking that predates the exile — the
> underworld has counted itself in cards for generations. When the Sick 52 were erased and needed
> to become symbols, they **dealt themselves as a deck in mockery of the streets** — taking the
> Mafia's ranking system and claiming it for something bigger than money.
>
> The Mafia has never forgiven them for it. To the Chairman, the Sick Deck is **plagiarism**.

That single detail does a lot of work: it explains the mirror, it gives the two organisations a
personal grievance beyond business, and it is exactly the kind of grudge a music organisation
would hold.

### Telling the two decks apart

| | **The Sick Deck** (52) | **The Made Deck** (52 + 2) |
| --- | --- | --- |
| What they are | Mutated sound-warlords | **People.** Criminals with families |
| Weapons | Sonic mutation powers | **Guns.** Real ones |
| Transport | They do not need any | **Cars.** Very expensive ones |
| Jokers | The Komedians — external threat | **Two of their own** — Consigliere & Intelligence |
| Houses mean | Internal divisions of nature | **Territory, business and bloodline** |
| Total cards | 52 exactly | **54** — a full deck with jokers |
| Stat block | HP / ATK / SP.ATK / SPD | **Muscle / Money / Reach / Heat / Loyalty / Wheels** |

---

## How the Made Deck works

- **4 Houses (suits)** of **13 cards** = 52 made members, **+2 Jokers** = 54.
- **Rank ladder matches the Sick Deck convention** (so the site can reuse `RANK_ORDER`):
  `A` strongest → `K` → `Q` → `J` → then pips `2` (strong) → `10` (weakest).
- **Aces are the four bosses.** **A♠ is the boss of all bosses.**
- **Kings** = underbosses · **Queens** = the house's money or product authority · **Jacks** = enforcers/fixers.
- **Every Queen is female** — kept deliberately consistent with the Sick Deck convention.
- **Jokers sit outside the houses** and answer only to the Commission.

### Who is *not* in the deck

The deck is the **Made** tier only (world bible §5). **Signed** artists and **Affiliated**
businesses are not cards. This matters — the single best story hook in the whole organisation is
that **Freq Kid is not in the deck and they want to give her a seat.**

All **52 seats are filled**. Freq Kid sits deliberately outside them.

---

## The stat block

The Sick 52 use combat stats (`characterStats.json` — HP, ATK, SP.ATK). **The Mafia should not.**
They are not fighters, they are a business. Proposed six-stat block:

| Stat | Range | Meaning |
| --- | --- | --- |
| **Muscle** | 1–100 | Capacity and appetite for violence |
| **Money** | 1–100 | Earning power — what they bring the table each month |
| **Reach** | 1–100 | Influence: who they can call, who owes them |
| **Heat** | 1–100 | Law-enforcement attention. **High is bad** — a liability, not a flex |
| **Loyalty** | 1–100 | How solid they are. **Low = flip risk.** The single most important number |
| **Wheels** | 1–100 | Driving, transport, escape |

Plus four flavour fields on every card: **Gun · Car · Front** (their legitimate business) ·
**Civilian life** (see the ordinary-life system in
[`ONGAKU-CIVILIAN-LIFE.md`](ONGAKU-CIVILIAN-LIFE.md)).

> **Design note:** *Loyalty* is the stat that makes this a crime story rather than a fight game.
> A 90-Muscle enforcer with 40 Loyalty is far more dangerous to the family than to its enemies.

---

## House composition — and how ethnicity works here

You asked for the black suits to be predominantly people of colour and Americanised, with the red
suits around 25%. **I have built that in through territory and history rather than as a quota**,
because that is how real crime organisations actually formed — along neighbourhood, immigration and
community lines. Each house's makeup is a consequence of *where it came from*, which makes it
worldbuilding instead of sorting.

| House | Origin & territory | Composition |
| --- | --- | --- |
| **♠ Spades** | The founding house. Southside & Urban City. Grew directly out of the hip-hop scene | **~90% Black American.** The one exception is a 70-year-old record-shop man who has been there since the beginning |
| **♣ Clubs** | The corner house. Harbour District & Eastside. Formed from the block crews | **~85% Black & Latino American.** Youngest, most volatile |
| **♥ Hearts** | The nightlife house. Neon District & Rose Hill. Old club and hospitality money | **~25% people of colour** — including its boss, which matters |
| **♦ Diamonds** | The money house. Central District & the Heights. Old immigrant finance families | **~25% people of colour** |

Note that **Hearts is run by a Black woman inside a predominantly white house**. Silk being part of
her own house's minority is not decoration — it is why she had to be twice as good, why the old
guard resent her, and why she keeps the drug trade out of her clubs when others will not.

---

## ♠ SPADES — The Founders' House

**Business:** artists, labels, venues, publishing, the culture itself.
**Territory:** Southside (capital), Urban City.
**Colour:** black / gold. **Standing:** the throne. The other three houses defer.

| Card | Alias | Name | Role | Gun | Car | Front |
| --- | --- | --- | --- | --- | --- | --- |
| **A♠** | **Grand Verse** | Marcus Cole | **The Chairman — boss of all bosses** | Nickel .45, unfired in 20 years | '68 Kestrel Continental, restored | Verse Holdings (publishing) |
| **K♠** | **8-Bar** | Terrence Boyd | Underboss. Street operations | Colt sidearm | Black Kestrel Wraith | Boyd & Sons barbershops |
| **Q♠** | **Ladysoul** | Delores Cole | The Chairman's sister. Owns the masters | Derringer in a clutch | Kestrel saloon, driven for her | Ladysoul Records |
| **J♠** | **Reverend** | Ezra Boone | Fixer. Negotiates with other organisations | Does not carry | Modest Bantam estate | Southside Community Centre chaplaincy |
| 2♠ | **Blackout** | Kenneth Sayles | Chief enforcer. Refuses drug work | Carries, rarely draws | Wolfe coupé, black | Gym owner |
| 3♠ | **Crate** | Bobby Crate | The archive. Contraband through the record shop | Shotgun under the counter | 40-year-old Bantam van | Deep Crates record shop |
| 4♠ | **Tapes** | Julius Bell | Smuggling and logistics | Whatever is nearest | Sakata tuner, loud | Vending & jukebox route |
| 5♠ | **Deacon** | Otis Pryor | Runs the community fund's legitimate side | None | Bantam sedan | Kade Community Trust |
| 6♠ | **Two-Track** | Andre Mims | Studio owner. Launders through session fees | Pistol in the console | Verrado, used | Two-Track Studios |
| 7♠ | **Sable** | Cornell Whitfield | Venue control and door rights | Sidearm | Kestrel SUV | Sable Live (promotions) |
| 8♠ | **Pressman** | Ray Duvall | Bootlegs and black-market pressing | Sidearm | Panel van | Duvall Pressing Plant |
| 9♠ | **Cousin June** | June Ellery Cole | The Chairman's driver and confidant | Under the seat | Whatever the Chairman is in | None — family |
| 10♠ | **Half-Step** | Darius Pryor | Producer. Made last year — Deacon's nephew | New, never fired | Leased Verrado he cannot afford | Beat production credits |

> **Why 10♠ matters:** Darius took the audition seat Freq Kid is being offered now, and it has
> already cost him — the debt, the car, the people who call him at 3am. He is the cautionary example
> standing directly in her path. All 52 seats are filled; **Freq Kid remains deliberately outside the
> deck** as a Signed artist, which is the point of her arc.

---

## ♣ CLUBS — The Corner House

**Business:** corners, protection, gambling, and the **Static Cut** distribution (world bible §5).
**Territory:** Harbour District, Eastside.
**Colour:** green / black. **Standing:** the muscle. Feared and slightly distrusted by the others.

| Card | Alias | Name | Role | Gun | Car | Front |
| --- | --- | --- | --- | --- | --- | --- |
| **A♣** | **Bishop** | Malik Rawls | **Boss of Clubs.** Runs every corner east of the river | Engraved sidearm | Armoured Kestrel | Rawls Security Services |
| **K♣** | **Ox** | Hector Delgado | Underboss. Enforcement | Heavy revolver | Wolfe pickup, lifted | Haulage company |
| **Q♣** | **Mercy** | Yolanda Reyes | Product routes. Called Mercy because she shows none | Compact, always on her | Bantam, deliberately forgettable | Laundromat chain |
| **J♣** | **Trigga** | Devon Hollis | Enforcer | Two, always | Sakata, stolen and re-plated | None |
| 2♣ | **Cutty** | Rashad Vance | Head of Static Cut distribution | Sidearm | Kestrel SUV, blacked out | Car wash |
| 3♣ | **Pistola** | Luis Marrero | Corner captain, Harbour | Sidearm | Verrado, financed | Bodega |
| 4♣ | **Deuce** | Tyrone Bankhead | Gambling and dice houses | Sidearm | Wolfe muscle car | Pool hall |
| 5♣ | **Smoke** | Omar Tillman | Protection collections | Sidearm | Bantam | Barber chair at Boyd & Sons |
| 6♣ | **Vico** | Javier Ocampo | Docks and containers | Shotgun | Flatbed | Freight brokerage |
| 7♣ | **Lil Nine** | Curtis Pace | Corner captain, Eastside | Sidearm | Sakata hatch | None |
| 8♣ | **Switchblade** | Nia Carter | Debt collection. The one they send first | Blade before gun | Sakata coupé | Nail salon |
| 9♣ | **Manny Ice** | Emmanuel Duran | Fencing stolen goods | Sidearm | Van | Pawn shop |
| 10♣ | **Baby K** | Kadeem Foster | Youngest made member, 20. Recently promoted | New, unfired | Leased Sakata | None — still lives at home |

---

## ♥ HEARTS — The Velvet House

**Business:** nightclubs, promotion, hospitality, celebrity access, the door.
**Territory:** Neon District, Rose Hill.
**Colour:** magenta / ivory. **Standing:** the glamour and the launder-friendly cash.

| Card | Alias | Name | Role | Gun | Car | Front |
| --- | --- | --- | --- | --- | --- | --- |
| **A♥** | **Silk** | Nadia Silk | **Boss of Hearts.** Keeps Static Cut out of her rooms | Small, in the jacket | White Verrado | Velvet Static (venue group) |
| **K♥** | **Velour** | Viktor Amsel | Underboss. Old nightclub money, resents her | Antique pistol, decorative | Vintage Kestrel | Amsel Hospitality |
| **Q♥** | **Countess** | Colette Bauer | Hospitality, escorts, discretion | None — has people | Chauffeured | Boutique hotel group |
| **J♥** | **Domino** | Dominic Sarris | Promoter. Books the rooms | Carries when travelling | Verrado convertible | Domino Presents |
| 2♥ | **Applause** | Lena Hoffmann | Ticketing and the door take | None | Kestrel coupé | Ticketing platform |
| 3♥ | **Fitzy** | Fitz O'Rourke | Bar supply and liquor routes | Under the bar | Delivery truck | Beverage distributor |
| 4♥ | **Cherry** | Marisol Vega | Talent liaison. Knows every artist's habits | Compact | Sakata convertible | Artist management |
| 5♥ | **Ghost Light** | Anders Holm | Venue security | Sidearm | Bantam SUV | Security firm |
| 6♥ | **Tiara** | Talia Brennan | Celebrity access and guest lists | None | Town car | PR agency |
| 7♥ | **Sundown** | Sonny Castellane | After-hours rooms | Sidearm | Verrado | Late-licence bars |
| 8♥ | **Roulette** | Ruthie Kaplan | Private gaming rooms | None | Kestrel | Casino floor lease |
| 9♥ | **Encore** | Isaiah Grant | Festival and tour promotion | None | Tour bus | Encore Touring |
| 10♥ | **Last Call** | Pia Novak | Neon District street-level fixer | Compact | Scooter | Diner franchise |

---

## ♦ DIAMONDS — The Count House

**Business:** laundering, finance, luxury goods, cars, jewellery, real estate.
**Territory:** Central District, the Heights.
**Colour:** blue / silver. **Standing:** the quietest, the richest, the hardest to prosecute.

| Card | Alias | Name | Role | Gun | Car | Front |
| --- | --- | --- | --- | --- | --- | --- |
| **A♦** | **Saint Sal** | Salvatore Moretti | **Boss of Diamonds.** The family's money | Never carries | Armoured Kestrel limousine | Moretti Holdings |
| **K♦** | **Ledger** | Emeka Duru | Underboss. Laundering through royalties | None | Ordinary navy Bantam | Accountancy practice |
| **Q♦** | **The Jeweller** | Irina Vasilenko | Precious metals, stones, and moving value | Small, in the safe | Verrado | Vasilenko Fine Jewellery |
| **J♦** | **Chrome** | Dae-Sun Pak | Street racing, chop shops, diverted NexaGen Motion tech | Under the dash | Whatever he built this month | Redline Garage |
| 2♦ | **Two Watches** | Gino Fanelli | Loansharking | Sidearm | Kestrel coupé | Watch dealership |
| 3♦ | **Paper** | Arkady Lem | Forged documents and identities | None | Bantam | Print shop |
| 4♦ | **Marble** | Nikos Stavrou | Construction and property | Sidearm | Wolfe pickup | Stavrou Build |
| 5♦ | **Bee** | Bernadette Ricci | Bank relationships | None | Kestrel saloon | Private bank board seat |
| 6♦ | **Titles** | Tommy Pisani | Car titles, plates, registration fraud | Sidearm | Rotates constantly | DMV-adjacent brokerage |
| 7♦ | **Jade** | Wen Liu | Overseas transfers and shipping | None | Chauffeured | Import/export |
| 8♦ | **Foreclosure** | Frank Bianchi | Distressed property acquisition | Sidearm | Kestrel SUV | Estate agency |
| 9♦ | **Deposit** | Mira Kozel | Cash handling and counting houses | Compact | Armoured van | Cash-in-transit firm |
| 10♦ | **Loose Change** | Aldo Serafini | Vending, parking, coin businesses | None | Bantam van | Parking group |

---

## 🃏 The Jokers

Outside the houses. They answer to the Commission, not to any boss — which is exactly why nobody
fully trusts them.

| Card | Alias | Name | Role |
| --- | --- | --- | --- |
| 🃏 **Black Joker** | **Mama Kade** | Rosaline Kade | **The Consigliere.** Runs the books and the community fund. Everyone's aunt, nobody's friend. Never been arrested |
| 🃏 **Red Joker** | **The Pen** | Isiah Poole | **Ghost Ink — intelligence.** Ghostwrote half the planet's biggest records, so he knows every secret anyone ever put in a bar |

---

## The Commission

**The four Aces and the two Jokers meet.** This is the top of the organisation and it should be one
of the recurring set-pieces of the whole universe — six people at one table deciding what happens to
a city.

| | |
| --- | --- |
| **Members** | A♠ Grand Verse (chairs) · A♣ Bishop · A♥ Silk · A♦ Saint Sal · 🃏 Mama Kade · 🃏 The Pen |
| **Where** | **Vantaggio's**, a 60-year-old steakhouse in the Old Quarter. Back room, one long table. See [`ONGAKU-CIVILIAN-LIFE.md`](ONGAKU-CIVILIAN-LIFE.md) |
| **When** | The first Sunday of the month. Has not been missed in 31 years |
| **Rules** | No phones. No guns at the table — they go in a crate by the door, and **Crate** himself keeps it. No underbosses. No business discussed before the food |
| **Votes** | Four Aces vote. Jokers advise and do not vote. **Grand Verse breaks ties**, which is what "boss of all bosses" actually means in practice |

### The standing agenda — and where the drama lives

1. **The Cut question.** Clubs and Diamonds profit from Static Cut. Spades and Hearts want out.
   Grand Verse has been breaking this tie the same way for three years and Bishop is tired of it.
2. **The empty seat.** 10♠ has been vacant for eleven months. Filling it is a Commission vote.
3. **The Tower problem.** A journalist (Gideon Falk, world bible §9) is working the story.
4. **The Sick 52 supply line.** Nobody wants to say out loud that they buy from the Pressing Plant.

> **Why this table is your best recurring scene:** every hip-hop mix can open here. Six people, a
> steakhouse back room, one decision. You do not need an action sequence to generate tension when
> the four most powerful people in the city disagree about one thing and have to eat dinner first.

---

## Story mode — why there are two decks

**This is the reason the mirror exists.** In story mode the player can take down *both* decks, but
they are **completely different kinds of campaign**:

| | **The Made Deck** (Hip Hop Mafia) | **The Sick Deck** (Sick 52) |
| --- | --- | --- |
| Mission type | **Police / crime procedural** | **War / military** |
| Player role | Law enforcement, investigation, undercover | Soldier, DJ24 operative |
| How you take a card | **Build a case.** Surveillance, wires, informants, raids, arrests | **Defeat them.** Combat, bounty hunting |
| Failure state | The case collapses, they walk, your informant dies | You lose the fight |
| Verticality | Work up from soldiers who flip on their capos | Fight up the most-wanted ladder |
| Tone | *The Wire*, *GTA* police missions, heist procedural | Anime battle spectacle |
| Ends with | **A♠ Grand Verse in an interview room** | **A♠ Final Drop in a boss fight** |

### Why this works mechanically

The **Loyalty** stat is the entire police campaign. You do not beat the Made Deck by shooting it —
you find the low-Loyalty cards and **flip them**. A 10♣ with Loyalty 35 is your way into a Jack,
and a Jack is your way into an Ace. **Heat** works the other way: pressure a card and their Heat
climbs until their own house cuts them loose to protect itself.

That means every card needs a *relationship* to the cards above it, and taking down the Mafia
becomes a puzzle about people rather than a fight. The Sick Deck stays a fight.

### The two ladders can cross

The best missions are the ones where both decks touch:

- A police case against **Cutty (2♣)** leads to the **Pressing Plant** — and suddenly a crime story
  becomes a Sick 52 story.
- **Blackout (2♠)** wants out. He is the highest-value flip in the game and he will only talk to
  someone who understands why.
- Taking down **Chrome (J♦)** cripples the illegal racing economy and hands NexaGen Motion a win.

---

## Stat lines — all 52

Format: **MUS** Muscle · **MON** Money · **REA** Reach · **HEA** Heat *(high = wanted)* ·
**LOY** Loyalty *(low = flip risk)* · **WHL** Wheels

### ♠ Spades

| Card | Who | MUS | MON | REA | HEA | LOY | WHL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A♠ | Grand Verse | 40 | 95 | 99 | 30 | 95 | 30 |
| K♠ | 8-Bar | 85 | 78 | 82 | 55 | 70 | 60 |
| Q♠ | Ladysoul | 20 | 92 | 85 | 20 | 96 | 25 |
| J♠ | Reverend | 15 | 55 | 90 | 15 | 88 | 40 |
| 2♠ | Blackout | 96 | 45 | 60 | 45 | **38** | 55 |
| 3♠ | Crate | 30 | 50 | 75 | 25 | 98 | 35 |
| 4♠ | Tapes | 45 | 62 | 70 | 65 | **42** | 88 |
| 5♠ | Deacon | 20 | 58 | 72 | 12 | 90 | 35 |
| 6♠ | Two-Track | 30 | 70 | 65 | 35 | 75 | 45 |
| 7♠ | Sable | 55 | 74 | 68 | 40 | 72 | 50 |
| 8♠ | Pressman | 40 | 60 | 50 | 50 | 68 | 45 |
| 9♠ | Cousin June | 50 | 40 | 55 | 20 | 99 | 92 |
| 10♠ | Half-Step | 25 | 48 | 45 | 55 | **35** | 50 |

### ♣ Clubs

| Card | Who | MUS | MON | REA | HEA | LOY | WHL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A♣ | Bishop | 88 | 85 | 88 | 70 | 85 | 60 |
| K♣ | Ox | 95 | 62 | 65 | 72 | 80 | 65 |
| Q♣ | Mercy | 70 | 80 | 75 | 60 | 82 | 70 |
| J♣ | Trigga | 92 | 40 | 45 | 85 | 65 | 68 |
| 2♣ | Cutty | 65 | 82 | 70 | 78 | 60 | 62 |
| 3♣ | Pistola | 78 | 50 | 52 | 68 | 62 | 60 |
| 4♣ | Deuce | 60 | 68 | 58 | 55 | 70 | 50 |
| 5♣ | Smoke | 72 | 45 | 48 | 62 | 58 | 55 |
| 6♣ | Vico | 68 | 58 | 60 | 50 | 66 | 72 |
| 7♣ | Lil Nine | 75 | 38 | 40 | 70 | **45** | 58 |
| 8♣ | Switchblade | 90 | 44 | 50 | 66 | 74 | 52 |
| 9♣ | Manny Ice | 45 | 55 | 62 | 58 | **40** | 48 |
| 10♣ | Baby K | 55 | 25 | 30 | 45 | **28** | 62 |

### ♥ Hearts

| Card | Who | MUS | MON | REA | HEA | LOY | WHL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A♥ | Silk | 35 | 90 | 92 | 28 | 90 | 55 |
| K♥ | Velour | 30 | 82 | 78 | 30 | **48** | 40 |
| Q♥ | Countess | 15 | 78 | 88 | 22 | 70 | 30 |
| J♥ | Domino | 45 | 72 | 80 | 42 | 68 | 60 |
| 2♥ | Applause | 20 | 70 | 60 | 25 | 75 | 40 |
| 3♥ | Fitzy | 50 | 60 | 55 | 38 | 72 | 65 |
| 4♥ | Cherry | 25 | 62 | 82 | 30 | 58 | 55 |
| 5♥ | Ghost Light | 80 | 48 | 45 | 35 | 78 | 50 |
| 6♥ | Tiara | 10 | 58 | 85 | 18 | 55 | 35 |
| 7♥ | Sundown | 55 | 65 | 58 | 48 | 62 | 52 |
| 8♥ | Roulette | 20 | 76 | 62 | 40 | 66 | 30 |
| 9♥ | Encore | 25 | 74 | 70 | 22 | 80 | 45 |
| 10♥ | Last Call | 40 | 42 | 65 | 32 | **44** | 70 |

### ♦ Diamonds

| Card | Who | MUS | MON | REA | HEA | LOY | WHL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A♦ | Saint Sal | 25 | 99 | 94 | 22 | 92 | 35 |
| K♦ | Ledger | 10 | 96 | 80 | 18 | 85 | 30 |
| Q♦ | The Jeweller | 20 | 90 | 76 | 26 | 78 | 40 |
| J♦ | Chrome | 60 | 70 | 66 | 62 | 72 | **99** |
| 2♦ | Two Watches | 70 | 78 | 62 | 52 | 68 | 48 |
| 3♦ | Paper | 15 | 65 | 74 | 45 | **46** | 35 |
| 4♦ | Marble | 65 | 80 | 70 | 30 | 76 | 50 |
| 5♦ | Bee | 10 | 88 | 82 | 15 | 80 | 30 |
| 6♦ | Titles | 30 | 62 | 58 | 55 | **42** | 85 |
| 7♦ | Jade | 15 | 86 | 78 | 24 | 74 | 30 |
| 8♦ | Foreclosure | 45 | 74 | 64 | 35 | 70 | 45 |
| 9♦ | Deposit | 35 | 72 | 55 | 40 | 82 | 68 |
| 10♦ | Loose Change | 25 | 50 | 48 | 20 | 75 | 55 |

### 🃏 Jokers

| Card | Who | MUS | MON | REA | HEA | LOY | WHL |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 🃏 | Mama Kade | 10 | 88 | 97 | **5** | 99 | 25 |
| 🃏 | The Pen | 20 | 70 | **99** | 30 | **50** | 40 |

**The flip list** — bolded Loyalty values are your police campaign's entry points. **Baby K (28)**,
**Half-Step (35)** and **Blackout (38)** are the three softest cards in the deck, and each one leads
somewhere very different.

---

## What I still need from you

| Question | Options |
| --- | --- |
| **Deck name** | **The Made Deck** (proposed), or something else — "The Real Deck", "The Fifty-Two Hands" |
| **Two Jokers or none** | 54 cards with Jokers (recommended — distinguishes it from the Sick Deck), or a clean 52 |
| **Ship it to the site?** | These 54 could get a `/made-deck` board mirroring `/sick-deck`, reusing the existing card components |
