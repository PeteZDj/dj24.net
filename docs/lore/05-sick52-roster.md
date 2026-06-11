# 05 · The Sick 52 — Canonical Roster

> Source of truth: `source/who-are-the-sick-52.md` (the official lineup).
> This file is kept **in lockstep with** `src/contentLoader.js` (`sick52MemberData` / `sick52Images`).
> Tagline: *The Exiled Maestros. The Mutated Sound. The Dissonant Choir.*

The 52 are organized into **five thematic tiers** so they read like a real mythic enemy roster
(Akatsuki / Espada / Phantom Troupe). They are listed in rank order (1 = oldest/strongest).

## Tier I — The Founding Dissonants (1–12)
*The original ideological rebels. The oldest and most powerful. Endgame bosses. (Black + Red)*

| # | Name | Title / Power |
| --- | --- | --- |
| 1 | **Red Silence** | Founder, Master of Frequency Suppression |
| 2 | **Bass Phantom** | Living Sub-Bass Titan |
| 3 | **Echo Requiem** | Reflection & Sound Cloning |
| 4 | **Static Prophet** | Distortion Seer |
| 5 | **Tremor King** | Seismic Beat Manipulator |
| 6 | **Hollow Aria** | Void Vocalist |
| 7 | **Pulse Tyrant** | Heartbeat Control |
| 8 | **Rift Cadence** | Reality Skip via Rhythm |
| 9 | **Black Vinyl** | Memory Corruption |
| 10 | **Crescendo Wraith** | Power Scaling Through Conflict |
| 11 | **Sonic Vicar** | Religious Manipulator of Sound Doctrine |
| 12 | **Nocturne Prime** | Night-Frequency Specialist |

## Tier II — The War Conductors (13–24)
*Elite field generals; specialized combat mutants. Major arc villains. (Black + Emerald)*

| # | Name | Power |
| --- | --- | --- |
| 13 | **Breakbeat Marauder** | Broken-beat raid commander |
| 14 | **Acid Reverie** | Acid / solvent sound |
| 15 | **Trap Revenant** | Sonic snares & traps |
| 16 | **Drumline Juggernaut** | Marching percussion wall |
| 17 | **Feedback Executioner** | Weaponized feedback |
| 18 | **Melody Hex** | Cursed, mind-looping melodies |
| 19 | **Overdrive Apostle** | Distortion-saint overload |
| 20 | **Glitch Monarch** | Corrupted-sound stutter/skip |
| 21 | **Harmony Eater** | Devours harmony/resonance |
| 22 | **Downbeat Reaper** | Strikes only on the downbeat |
| 23 | **Sync Destroyer** | Anti-Sync; severs synchronization |
| 24 | **Chorus Tyrant** | Supreme War Conductor / Field Marshal |

## Tier III — The Elemental Etudes (25–36)
*Each tied to one elemental sound mutation. Regional boss arcs. (Black + Cobalt Blue)*

| # | Name | Element |
| --- | --- | --- |
| 25 | **Blaze Riff** | Fire |
| 26 | **Stone Resonance** | Stone |
| 27 | **Tidal Lament** | Water |
| 28 | **Iron Tempo** | Metal |
| 29 | **Thunder Dropper** | Gravity / sub-atomic |
| 30 | **Frost Echo** | Ice |
| 31 | **Sand Shuffle** | Sand |
| 32 | **Toxic Vibrato** | Poison |
| 33 | **Storm Sustain** | Lightning |
| 34 | **Ember Pulse** | Magma |
| 35 | **Mist Cadence** | Gas / vapor |
| 36 | **Void Tremolo** | Void / dark |

## Tier IV — The Psychological Choir (37–44)
*Mind-based sound manipulators. Darker story arcs. (Black + White)*

| # | Name | Power |
| --- | --- | --- |
| 37 | **Lullaby Widow** | Induced Sleep Paralysis |
| 38 | **Panic Symphony** | Induces Fear Frequencies |
| 39 | **Memory Static** | Alters Recollections |
| 40 | **Mirage Anthem** | Illusion Projection |
| 41 | **Grief Sonata** | Emotional Drain |
| 42 | **Rage Cantata** | Induces Berserk States |
| 43 | **Whisper Choir** | Mass Suggestion |
| 44 | **Silence Bishop** | Area-Wide Sound Nullification |

## Tier V — The Mutated Prototypes (45–52)
*Experimental evolutions; unstable, extremely dangerous. (Black + Violet)*

| # | Name | Power |
| --- | --- | --- |
| 45 | **Split Tempo** | Dual-Body Combatant |
| 46 | **Frequency Parasite** | Feeds on music energy |
| 47 | **Harmonic Abomination** | Multi-genre hybrid |
| 48 | **Pulse Devourer** | Absorbs DJ attacks |
| 49 | **Dead Air Revenant** | Erases sound zones |
| 50 | **Reverb Titan** | Amplifies all damage |
| 51 | **Static Hydra** | Multi-headed echo form |
| 52 | **Final Drop** | The Ultimate Mutation (final boss) |

> **Final Drop** is canonically either the original ultimate Sick 52 leader **or** NexaGen's perfected
> fusion weapon. The site currently frames him as the transcendent "Demon of the Abyss" final boss.

## Design guidance (from the source)

Do **not** treat all 52 equally. Intended distribution of narrative weight:
**5–8 main arc villains · 10 recurring elites · 20 regional bosses · 14 special-mechanic enemies.**
"Hierarchy = storytelling power."

## Implementation status

- ✅ All 52 implemented in `src/contentLoader.js` with correct ranks/tiers.
- ✅ All 52 mapped to existing artwork in `public/images/sick52/` (filenames have legacy quirks, e.g.
  `Sic52 - Harmony Eater.png`, `Sick52 Nocture Prime.png`).
- Slug note: **Hollow Aria** uses slug `hollow-aria` (art file is `Sick52 - Void Vocalist.png`).
