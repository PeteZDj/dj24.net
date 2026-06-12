// Content data, Sick52 tier system, DJ24 roster, and wiki link mapping

// ===== SICK52 TIER DATA =====
export const sick52Tiers = {
  founders: { name: 'Tier I — The Founding Dissonants', color: '#DC2626', accent: 'Red', range: '1–12', desc: 'The original ideological rebels. The oldest and most powerful. Black + Red cloaks.' },
  warConductors: { name: 'Tier II — The War Conductors', color: '#16A34A', accent: 'Emerald', range: '13–24', desc: 'Elite field generals. Black + Emerald cloaks. Partially mechanical hybrid traits.' },
  elementals: { name: 'Tier III — The Elemental Etudes', color: '#2563EB', accent: 'Cobalt Blue', range: '25–36', desc: 'Elemental sound mutations. Black + Deep Cobalt Blue. Walking natural disasters.' },
  psychological: { name: 'Tier IV — The Psychological Choir', color: '#6B7280', accent: 'White', range: '37–44', desc: 'Mind-based sound manipulators. Black + White robes. Priests of psychological warfare.' },
  prototypes: { name: 'Tier V — The Mutated Prototypes', color: '#7C3AED', accent: 'Violet', range: '45–52', desc: 'Experimental evolutions. Less stable. Extremely dangerous. Black + Mutated Violet.' },
};

export const sick52MemberData = {
  "red-silence": {
    rank: 1, tier: "founders", title: "Master of Frequency Suppression", role: "Founder & Leader",
    desc: "Once the High Conductor of Ongaku, he designed the Frequency Grid to protect the planet. When the Harmony Council realized his 'Perfect Symphony' could also be used to depose them, they severed his vocal cords with a vibration-blade. In the silence of exile, he learned to weaponize the 'Absence of Sound.' He no longer seeks to play music; he seeks to delete it.",
    prompt: "Full body anime main antagonist concept art. Extremely tall slender male with dark skin and shaved head. Deep-set eyes glowing faint crimson. Emotionless, cold expression. Long matte black high-collared cloak with deep crimson interior lining. Circular suppression crest glowing faint red on chest. Subtle red concentric sound rings compressed tightly around his body. Air near him visibly muted. Hands relaxed at sides, fingers long and precise. Cloth immaculate. Cinematic dramatic lighting. High detail anime style. Clean background."
  },
  "bass-phantom": {
    rank: 2, tier: "founders", title: "Nuclear Artillery Conductor", role: "Living Sub-Bass Titan",
    desc: "Formerly the Master of Foundations, responsible for the literal structural integrity of Ongaku's cities. After the betrayal, his body was crushed during the collapse of the First Conservatory. He survived by fusing his nervous system with experimental sub-bass amplifiers. He is now a walking earthquake, holding a grudge as heavy as his 20Hz output.",
    prompt: "Full body anime villain concept art. Tall athletic male of African descent. Bald head, sharp intelligent facial structure, calm calculating expression. Eyes glowing faint crimson. Long matte black high-collared coat with deep red interior lining. Circular waveform crest glowing dimly at chest. Both forearms fitted with sleek integrated missile launch gauntlets. Circular nuclear containment core faintly visible beneath coat. Concentric bass distortion rings forming around him. Controlled nuclear aura. Bleach-level villain presence. Cinematic dramatic lighting. Clean neutral background. High detail anime style."
  },
  "echo-requiem": {
    rank: 3, tier: "founders", title: "Reflection & Sound Cloning", role: "The Mirror",
    desc: "A prodigy of the Dual-Tone Era. He believed music was a conversation, not a command. The Council called this heresy. They trapped him in a room of infinite mirrors for a decade. He didn't go mad; he just learned to talk to his reflections so well that they stepped out of the glass to fight for him.",
    prompt: "Full body anime antagonist, slender build. Long flowing black coat with silver inner lining. One half of cloak slightly lighter to imply duality. Pale face, calm smile. Short white hair. Eyes mirror-like silver. Slight transparent afterimage clones faintly behind him. Pose relaxed. Cloth-based design. Elegant and eerie. Naruto villain aesthetic. Clean background, high detail, dramatic soft shadow lighting."
  },
  "static-prophet": {
    rank: 4, tier: "founders", title: "Distortion Seer", role: "Oracle of Corruption",
    desc: "The first to predict the 'Collapse.' He claimed the Frequency Grid was a cage, not a shield. The Council labeled him 'Distorted' and threw him into the white-noise wastes. He survived by eating the radio interference of the stars. Now, he sees the future in the static between stations.",
    prompt: "Full body anime character design. Tall thin figure wearing layered dark robes with ragged hems. Hood partially covering face. One glowing eye visible. Cloth wrapped around neck and arms. Subtle distortion effect around head like air glitching. Fingers long and slightly twisted. Expression intense, prophetic. Dark religious cult aesthetic. Neutral background."
  },
  "tremor-king": {
    rank: 5, tier: "founders", title: "Seismic Beat Manipulator", role: "The Earthquake",
    desc: "A legendary percussionist who could make the planet's tectonic plates dance. He was the Council's favorite enforcer until he refused to crush a rebel jazz club. They broke his hands; he responded by learning to 'play' the earth with his footsteps. Every step he takes is a rhythmic execution.",
    prompt: "Full body anime villain, broad powerful build. Long dark brown cloak with heavy stone-textured trim and red inner lining. Thick belt sash. Hands wrapped in bandages. Boots cracked and rugged. Stance wide and grounded. Small debris floating around fists. Stern dominant expression. Cloth-focused design. Naruto war arc energy. Clean background."
  },
  "hollow-aria": {
    rank: 6, tier: "founders", title: "Void Vocalist", role: "The Hollow Voice",
    desc: "Once the 'Voice of Heaven,' her singing could heal any wound. During the Purge the Council used a sonic vacuum to 'extract' her gift, leaving a hollow shell. Now her voice no longer heals — it opens rifts to the XD-Dimension, draining the life force of anything that hears her mournful notes.",
    prompt: "Full body anime antagonist, feminine silhouette. Long flowing black and deep violet cloak. High collar framing face. Pale skin, long dark hair drifting in silent wind. Eyes empty black void. Hands gently open at sides. Dark mist rising from feet. Elegant and haunting. Cloth-based simplicity. Bleach Arrancar elegance. Neutral background."
  },
  "pulse-tyrant": {
    rank: 7, tier: "founders", title: "Heartbeat Controller", role: "Master of Pulse",
    desc: "A master of physiological tempo. He used to regulate the biological rhythms of Ongaku's citizens to ensure health. The Council weaponized his research into the 'Single Beat System' and then discarded him. He now controls the heartbeats of his enemies, forcing them to sync with his own murderous BPM.",
    prompt: "Full body anime villain, athletic build. Dark cloak with deep red sash crossing chest. Faint stitched heart symbol on back. Gloves fitted and tight. Expression intense and commanding. One hand gripping invisible force. Subtle pulsing distortion near chest. Pure cloth. Strong shinobi aesthetic. Dramatic anime lighting. Clean character sheet background."
  },
  "rift-cadence": {
    rank: 8, tier: "founders", title: "Reality Skip via Rhythm", role: "The Phase Shifter",
    desc: "A theorist of 'Invisible Intervals.' He discovered that sound has 'gaps' where time doesn't exist. He was exiled for trying to teach others how to hide in these gaps. Now, he exists between the ticks of the clock, appearing and disappearing mid-measure like a ghost in the machine.",
    prompt: "Full body anime antagonist, lean and agile. Asymmetrical black cloak with torn lower edges. One sleeve longer than the other. Eyes sharp and slightly glowing white. Pose mid-step as if phasing. Subtle crack-like fracture lines in air around body. Cloth design only. Naruto time-space jutsu energy. Neutral background, high detail."
  },
  "black-vinyl": {
    rank: 9, tier: "founders", title: "Memory Corruption", role: "The Eraser",
    desc: "The Order's historian. He kept the 'Master Records' of Ongaku's history. When the Council began rewriting history to favor the SBS, he tried to hide the true records. They burned his library and scarred his mind. Now, he uses sound to 'scratch' the memories of others, deleting their past just as his was deleted.",
    prompt: "Full body anime villain, medium build. Dark cloak with smooth matte texture. Circular emblem on chest resembling broken record. Short dark hair. Expression emotionless. Subtle swirling black aura around shoulders. One hand holding invisible disc-like energy. Minimalist design. Akatsuki-level simplicity. Clean white background."
  },
  "crescendo-wraith": {
    rank: 10, tier: "founders", title: "Power Scaling Through Conflict", role: "The Escalator",
    desc: "He was the master of the 'Infinite Build.' He believed music should never end, only grow. The Council feared the energy output of an infinite crescendo and tried to dampen his soul with lead-frequency blankets. It only made his internal pressure higher. In a fight, he doesn't just attack—he grows exponentially until his opponent's reality shatters.",
    prompt: "Full body anime antagonist. Extremely tall and very lean, long-limbed. Dark-skinned African descent with sharp refined Japanese facial features. Long straight black hair. Long black high-collared cloak with deep crimson interior lining, slightly frayed at hem. Eyes glowing faint crimson. Thin vertical scar across one eyebrow. Subtle upward energy distortion rising from feet. Bleach captain stance. Cinematic dramatic lighting from above. Neutral background. High detail anime style."
  },
  "sonic-vicar": {
    rank: 11, tier: "founders", title: "Religious Manipulator of Sound Doctrine", role: "The Doctrine of Pain",
    desc: "A former High Priest of the Sacred Conservatory who turned the Council's own scripture against it. He preaches that sound is the only true god and that suffering is its purest hymn. He replaced his ribs with hollow brass pipes and his lungs with industrial bellows, broadcasting agonizing 'Sermons of the Shattered Note' that convert congregations by force.",
    prompt: "Full body anime antagonist. Tall priestly figure, ribs replaced by brass organ pipes, black-and-crimson clerical cloak, swinging a censer of sound. Cinematic industrial-cathedral lighting. Clean background. High detail anime style."
  },
  "nocturne-prime": {
    rank: 12, tier: "founders", title: "Night-Frequency Specialist", role: "Lord of the Nocturne",
    desc: "Keeper of the Nocturne — the forbidden night-frequencies the Single Beat System outlawed for inducing dreams the Council could not monitor. Exiled for playing after curfew, he became one with the dark register. Beneath his low, velvet lullaby entire districts fall into a waking sleep while he moves through them unseen and unopposed.",
    prompt: "Full body anime antagonist. Elegant tall figure in a midnight-black cloak lined with deep indigo, crescent-moon sound crest, faint starlight motes drifting around him. Calm nocturnal menace. Cinematic moonlit lighting. Clean background. High detail anime style."
  },

  // ===== TIER II — THE WAR CONDUCTORS (13–24) =====
  "breakbeat-marauder": {
    rank: 13, tier: "warConductors", title: "The Broken-Beat Raider", role: "Underground Raid Commander",
    desc: "A battle-drummer of the old Sonic Order who weaponized the broken beat. He leads lightning raids on Council sound-towers, shattering disciplined rhythm-formations with chaotic syncopation before the enemy can form a line. Where his breakbeat lands, order falls apart.",
    prompt: "Full body anime villain, lean and armored, dual break-blades, emerald-lined black raider coat, fractured beat-glyphs in the air. Cinematic raid lighting. Clean background. High detail anime style."
  },
  "acid-reverie": {
    rank: 14, tier: "warConductors", title: "The Solvent", role: "Acid Conductor",
    desc: "A chemist obsessed with the 'pH of Sound' who was thrown into a waste-treatment vat and became the solvent. A melting, translucent-green horror whose acidic vibrato dissolves instruments, armor and hands into a single agonizing pool of slag.",
    prompt: "Full body anime villain. Melting translucent-green horror dripping acid, emerald undertones. Cinematic dissolve. Clean background. High detail anime style."
  },
  "trap-revenant": {
    rank: 15, tier: "warConductors", title: "The Ensnarer", role: "Sonic Trapper",
    desc: "Returned from a Council execution wired into a trap-music feedback loop, he lays sonic snares across the battlefield — hi-hat mines and 808 sinkholes. Slow, patient, inevitable; he never chases, he traps.",
    prompt: "Full body anime villain. Gaunt revenant trailing rattling hi-hat chains and bass-trap rings, emerald glow. Cinematic ambush lighting. Clean background. High detail anime style."
  },
  "drumline-juggernaut": {
    rank: 16, tier: "warConductors", title: "The Marching Wall", role: "Percussion Juggernaut",
    desc: "A former marching-corps captain reinforced into a living drumline. Each thunderous step is a coordinated war-cadence that flattens formations and crumbles cover. He does not break stride for anything.",
    prompt: "Full body anime villain. Massive armored juggernaut strapped with war-drums, emerald-lit cadence shockwaves. Cinematic heavy enforcer. Clean background. High detail anime style."
  },
  "feedback-executioner": {
    rank: 17, tier: "warConductors", title: "The Screaming Edge", role: "Feedback Executioner",
    desc: "He stands silent until the enemy makes a sound, then folds every frequency back on itself into a screaming feedback spike that ruptures eardrums and detonates equipment. The louder you are, the faster you die.",
    prompt: "Full body anime villain. Executioner wielding a feedback-greatsword wreathed in howling soundwaves, emerald cloak. Cinematic execution lighting. Clean background. High detail anime style."
  },
  "melody-hex": {
    rank: 18, tier: "warConductors", title: "The Cursed Composer", role: "Hex-Melody Weaver",
    desc: "Every tune she writes is a hex — a catchy, inescapable phrase that loops in the victim's mind, slowly rewriting their loyalties or stopping their heart on the final bar. Humming along is already too late.",
    prompt: "Full body anime villainess. Composer trailing glowing cursed staff-notation, emerald hex-sigils, black-and-green sorceress cloak. Cinematic occult lighting. Clean background. High detail anime style."
  },
  "overdrive-apostle": {
    rank: 19, tier: "warConductors", title: "Saint of Distortion", role: "Overdrive Preacher",
    desc: "A preacher who believes clean sound is a lie. He overdrives his own body past safe limits — a saint of clipping and saturation whose sermons melt speakers and overload the nervous systems of the faithful and the damned alike.",
    prompt: "Full body anime villain. Zealot preacher crackling with overdriven distortion energy, emerald-and-black vestments, blown-speaker halo. Cinematic sermon lighting. Clean background. High detail anime style."
  },
  "glitch-monarch": {
    rank: 20, tier: "warConductors", title: "King of Corrupted Sound", role: "Glitch Sovereign",
    desc: "The self-crowned king of the broken data between stations. He stutters reality, freezing and skipping his enemies like a damaged record, reigning over the no-go zones the Council's signal can no longer reach.",
    prompt: "Full body anime villain. Regal figure flickering with datamosh glitches and pixel-shatter, emerald corrupted crown. Cinematic throne-room lighting. Clean background. High detail anime style."
  },
  "harmony-eater": {
    rank: 21, tier: "warConductors", title: "The Devourer of Concord", role: "Harmony Predator",
    desc: "He feeds on the resonance of others' music, growing stronger as the battlefield falls silent and out of tune. The more beautiful the sound around him, the hungrier — and the more monstrous — he becomes.",
    prompt: "Full body anime villain. Hulking maw-chested devourer inhaling glowing harmony-threads, emerald hunger-aura. Cinematic horror lighting. Clean background. High detail anime style."
  },
  "downbeat-reaper": {
    rank: 22, tier: "warConductors", title: "Death on the One", role: "Rhythmic Executioner",
    desc: "A scythe-wielder who strikes only on the downbeat. He counts his victims in bars, and when the measure resolves, so do they. You can always hear him coming — that is the cruelty of it.",
    prompt: "Full body anime villain. Cloaked reaper with a metronome-scythe, emerald beat-pulse rings, hood shadowing the face. Cinematic ominous lighting. Clean background. High detail anime style."
  },
  "sync-destroyer": {
    rank: 23, tier: "warConductors", title: "The Anti-Sync", role: "Synchronization Breaker",
    desc: "Built to hunt the Syncopate. He severs synchronization — between allies, between mind and body, between a fighter and the beat itself. In his presence coordinated units fall apart and even Sync's alignment begins to fray.",
    prompt: "Full body anime villain. Sharp anti-hero counterpart to Sync, asymmetrical black-emerald combat coat, desync glitch-fractures around him. Cinematic rival lighting. Clean background. High detail anime style."
  },
  "chorus-tyrant": {
    rank: 24, tier: "warConductors", title: "Supreme War Conductor", role: "Field Marshal",
    desc: "A former choir director who believed in perfect unity. The Council used his 'Unison Protocol' to mind-control the early DJ24 units. When he saw what they had done to his art, he revolted. He now leads a choir of mutated shadows whose overlapping voices form a single, mind-shattering scream.",
    prompt: "Full body anime main arc villain concept art. Extremely tall imposing male with mixed Japanese and African heritage. Dark skin with mechanical augmentation along shoulders and spine. Long black hair tied back. Matte black cloak with deep emerald interior lining. Fractured waveform crest across the back. Left arm fully cybernetic with emerald engravings. Massive two-handed greatblade shaped like a shattered soundwave. Cinematic lighting. Clean neutral background."
  },

  // ===== TIER III — THE ELEMENTAL ETUDES (25–36) =====
  "blaze-riff": {
    rank: 25, tier: "elementals", title: "The Firestorm Solo", role: "Fire Mutation",
    desc: "A guitarist whose riffs ignite the air. Every shredded note trails flame; his solos become firestorms, raising the temperature of a room until instruments warp and enemies cook inside their own armor.",
    prompt: "Full body anime villain. Wild guitarist wielding a flaming axe-guitar, molten-orange riffs trailing fire, cobalt-blue underlight. Cinematic inferno lighting. Clean background. High detail anime style."
  },
  "stone-resonance": {
    rank: 26, tier: "elementals", title: "The Obsidian Behemoth", role: "Stone Mutation",
    desc: "A miner who merged with sound-sensitive quartz; a ten-foot behemoth of jagged obsidian and glowing blue crystal whose grinding stone plates emit a subsonic frequency that liquefies the earth.",
    prompt: "Full body anime villain. Ten-foot obsidian-and-blue-crystal behemoth, grinding stone plates. Cinematic colossus."
  },
  "tidal-lament": {
    rank: 27, tier: "elementals", title: "The Drowner", role: "Oscillating Fluid Monster",
    desc: "A water-acoustician who travels inside a floating sphere of violently oscillating 'sonic water,' drowning victims by forcing the vibrating liquid into their lungs until they tear apart from within.",
    prompt: "Full body anime antagonist. Floating inside oscillating water sphere, cobalt-blue glow. Cinematic water horror."
  },
  "iron-tempo": {
    rank: 28, tier: "elementals", title: "The Industrial Beat", role: "Metal Mutation",
    desc: "A blacksmith-drummer whose tempo magnetizes and commands metal. To his relentless industrial beat, shards of iron march, blades bend, and the enemy's own weapons turn against them.",
    prompt: "Full body anime villain. Towering blacksmith-drummer ringed with floating iron shards and chains, cobalt-blue magnetic arcs. Cinematic forge lighting. Clean background. High detail anime style."
  },
  "thunder-dropper": {
    rank: 29, tier: "elementals", title: "The Gravity-Crush", role: "Sub-Atomic Drummer",
    desc: "A six-ton giant fitted with gravity-well gauntlets who 'drops the floor,' collapsing local gravity to crush enemies into the earth as a silent mass of meat and metal.",
    prompt: "Full body anime villain. Massive build, gravity-well gauntlets, cobalt-blue shock-rings. Cinematic heavy enforcer."
  },
  "frost-echo": {
    rank: 30, tier: "elementals", title: "Absolute Zero", role: "Ice Mutation",
    desc: "He replaced his blood with liquid nitrogen after the Council froze his family; a jagged translucent-blue monster who freezes the air so brittle that a snap of his fingers shatters the atmosphere.",
    prompt: "Full body anime villain. Jagged translucent blue ice-monster exhaling absolute cold, cobalt aura. Cinematic frost horror."
  },
  "sand-shuffle": {
    rank: 31, tier: "elementals", title: "Granular Synthesis", role: "Sand Mutation",
    desc: "An archaeologist buried alive in vibration-sand who learned to vibrate his cells into a granular state; a shifting mass of abrasive sound-sand that slips through any defense and grinds organs into dry silt.",
    prompt: "Full body anime villain. Shifting figure of abrasive sound-sand, cobalt-blue glow at the seams. Cinematic granular horror."
  },
  "toxic-vibrato": {
    rank: 32, tier: "elementals", title: "Chemical Resonance", role: "Poison Mutation",
    desc: "A chemist who survived an acid execution by vibrating his body to neutralize it, scarring his skin into a shifting liquid state; he emits a constant shimmer-sound that dissolves any material it touches.",
    prompt: "Full body anime villain. Figure of shifting liquid-scarred skin emitting a dissolving shimmer, cobalt-blue glow. Cinematic toxic horror."
  },
  "storm-sustain": {
    rank: 33, tier: "elementals", title: "Hurricane Incarnate", role: "Lightning Mutation",
    desc: "Struck by a solar-frequency bolt and charred into conductive carbon, he is a living capacitor who sewed copper wire through his muscles to sustain a million-volt current.",
    prompt: "Full body anime villain. Blackened body wreathed in cobalt-blue lightning, copper-wired muscles. Cinematic storm titan."
  },
  "ember-pulse": {
    rank: 34, tier: "elementals", title: "Volcanic Core", role: "Magma Mutation",
    desc: "A human battery kept in perpetual near-combustion who finally synced with the fire; a charred, glowing entity with a core of white-hot plasma pulsing at a 140 BPM kick-drum.",
    prompt: "Full body anime villain. Charred figure with a glowing plasma core, magma cracks, cobalt-blue accents. Cinematic ember horror."
  },
  "mist-cadence": {
    rank: 35, tier: "elementals", title: "Phantom Vapor", role: "Gas Mutation",
    desc: "A perfumer-therapist locked in with her own toxic gas who learned to vibrate it to her frequency; a semi-liquid neon-blue phantom who drifts into the mind and vibrates memories into beautiful nightmares.",
    prompt: "Full body anime villain. Semi-liquid neon-blue mist-phantom smelling of ozone and rot. Cinematic vapor wraith."
  },
  "void-tremolo": {
    rank: 36, tier: "elementals", title: "The Shivering Absence", role: "Void Mutation",
    desc: "A tremolo of pure absence. His vibrating dark-frequency eats light and matter at the edges — a shivering void that flickers between existence and nothing, unraveling whatever it touches one oscillation at a time.",
    prompt: "Full body anime villain. Flickering figure of vibrating darkness devouring light at its edges, cobalt-blue void shimmer. Cinematic abyssal lighting. Clean background. High detail anime style."
  },

  // ===== TIER IV — THE PSYCHOLOGICAL CHOIR (37–44) =====
  "lullaby-widow": {
    rank: 37, tier: "psychological", title: "Induced Sleep Paralysis", role: "The Sandwoman",
    desc: "A jawless soprano who grafted the shards of broken instruments into her throat. Her lullaby drops victims into waking sleep-paralysis — conscious, frozen, and unable to scream as the glass in her voice cuts through armor and bone.",
    prompt: "Full body anime villainess. Elegant soprano with glass shards fused into a ruined throat, white-and-black mourning veil, drifting dream-motes. Cinematic eerie lighting. Clean background. High detail anime style."
  },
  "panic-symphony": {
    rank: 38, tier: "psychological", title: "Fear Frequency Conductor", role: "The Dread",
    desc: "He conducts an orchestra of pure terror, tuning each note to the exact pitch of his victims' deepest fears. A single bar can empty a battlefield as soldiers flee horrors only they can hear.",
    prompt: "Full body anime villain. Gaunt conductor in white-and-black robes raising a baton of pure dread, pale fear-aura. Cinematic psychological horror."
  },
  "memory-static": {
    rank: 39, tier: "psychological", title: "Recollection Corruptor", role: "The Glitch",
    desc: "His sound scrambles short-term memory into white noise. Enemies forget why they came, who they fight and which side they're on, looping through one broken moment until he lets them go.",
    prompt: "Full body anime villain. Flickering figure in white robes shedding fragments of stolen memory, glitch-static aura. Cinematic mind horror."
  },
  "mirage-anthem": {
    rank: 40, tier: "psychological", title: "Illusion Projection", role: "The Phantom",
    desc: "A composer of false realities whose anthems paint armies, walls and monsters out of thin air, turning the battlefield into a stage where nothing the eye sees can be trusted.",
    prompt: "Full body anime villain. Phantom conductor projecting translucent illusory armies, white robes, shimmering mirage aura. Cinematic illusion."
  },
  "grief-sonata": {
    rank: 41, tier: "psychological", title: "Emotional Drain", role: "The Mourner",
    desc: "Her sonata plays back every loss the listener has ever known, all at once. Warriors lay down their weapons and weep, drained of the will to fight by a sorrow that is not their own.",
    prompt: "Full body anime villain. Veiled mourner playing a sorrowful instrument, white funereal robes, draining grey aura. Cinematic melancholy."
  },
  "rage-cantata": {
    rank: 42, tier: "psychological", title: "Induces Berserk States", role: "The Fury",
    desc: "His cantata floods the listener with uncontrollable rage, turning disciplined soldiers into frothing berserkers who turn on each other. He simply conducts — and lets the slaughter compose itself.",
    prompt: "Full body anime villain. Manic conductor wreathed in red-hot rage-frequencies over white-and-black robes. Cinematic fury lighting. Clean background. High detail anime style."
  },
  "whisper-choir": {
    rank: 43, tier: "psychological", title: "Mass Suggestion Architect", role: "The Puppeteer",
    desc: "A choir of overlapping whispers that slips suggestions beneath conscious thought. Whole crowds move to his command, each certain the orders were their own idea.",
    prompt: "Full body anime villain. Robed figure surrounded by spectral whispering mouths, white-and-black vestments. Cinematic puppeteer."
  },
  "silence-bishop": {
    rank: 44, tier: "psychological", title: "Area-Wide Sound Nullification", role: "The Void Priest",
    desc: "A self-blinded, self-silenced zealot who wields a 'Censer of De-Resolution,' deleting all sound within a fifty-meter radius as he 'cleans' the world of the filth of music.",
    prompt: "Full body anime villain. Blind priest with silver-wired lips swinging an anti-sound censer, white-and-black robes, dead-silent aura. Cinematic cult lighting. Clean background. High detail anime style."
  },

  // ===== TIER V — THE MUTATED PROTOTYPES (45–52) =====
  "split-tempo": {
    rank: 45, tier: "prototypes", title: "Dual-Body Combatant", role: "The Divided",
    desc: "A prototype split across two synchronized bodies that strike on alternating beats — an unending call-and-response no single opponent can answer.",
    prompt: "Full body anime villain. Two mirrored synchronized bodies attacking on offbeats, violet split aura. Cinematic dual combatant."
  },
  "frequency-parasite": {
    rank: 46, tier: "prototypes", title: "Feeds on Music Energy", role: "The Leech",
    desc: "A host for interdimensional sound-leeches who eats the rhythm of others, leaving them brain-dead husks that can no longer perceive the passage of time.",
    prompt: "Full body anime villain. Gaunt host riddled with bioluminescent leeches and sensor-eyes, violet glow. Cinematic parasite horror."
  },
  "harmonic-abomination": {
    rank: 47, tier: "prototypes", title: "Multi-Genre Hybrid", role: "The Fusion",
    desc: "A mass of twitching, singing flesh grafted from a hundred stolen voices and a dozen clashing genres, he conducts dissonant choirs straight from his own mutated body.",
    prompt: "Full body anime villain. Towering mass of grafted flesh and stitched vocal cords, violet mutation glow. Cinematic body-horror conductor."
  },
  "pulse-devourer": {
    rank: 48, tier: "prototypes", title: "Absorbs DJ Attacks", role: "The Counter",
    desc: "He tethers his heartbeat to his enemies and absorbs their sonic attacks, accelerating the tempo until their hearts burst from sympathetic resonance, drumming endlessly on his exposed chest cavity.",
    prompt: "Full body anime villain. Exposed vibrating chest cavity, drumming hands, violet absorption aura. Cinematic predator."
  },
  "dead-air-revenant": {
    rank: 49, tier: "prototypes", title: "Erases Sound Zones", role: "The Eraser",
    desc: "Killed in the first Purge and reanimated by static scripting itself into his decaying neurons, he is a creature of pure radio-interference who erases all sound in a zone and is obsessed with 'completing the signal.'",
    prompt: "Full body anime villain. Decaying corpse wreathed in radio static and transmitter antennae, violet dead-air glow. Cinematic glitch wraith."
  },
  "reverb-titan": {
    rank: 50, tier: "prototypes", title: "Amplifies All Damage", role: "The Echoing Mountain",
    desc: "A living amplifier who echoes every blow back tenfold. The longer a battle rages, the louder and more unstoppable he becomes, until the air itself caves in.",
    prompt: "Full body anime villain. Mountainous armored figure ringed with stacked speaker-cones, violet glow. Cinematic colossus."
  },
  "static-hydra": {
    rank: 51, tier: "prototypes", title: "Multi-Headed Echo Form", role: "The Hydra",
    desc: "Split across three timelines by a teleportation accident, a flickering three-headed horror whose subsonic, ultrasonic and audible heads overlap into an organ-liquefying Tri-Tone Collapse.",
    prompt: "Full body anime villain. Flickering three-headed figure phasing across timelines, violet distortion. Cinematic glitch horror."
  },
  "final-drop": {
    rank: 52, tier: "prototypes", title: "The Ultimate Mutation", role: "The End",
    desc: "The Sick 52's ultimate success and final hour. After decades chasing the 'Primal Note,' he injected the Pure Void of the XD-Dimension into his own heart and transcended humanity. His skin drinks light, skeletal wings carry him in total silence, and a prehensile tail tipped with absolute zero freezes time on contact. The Demon of the Abyss views all existence as a bad song he was born to end.",
    prompt: "Full body anime final-boss concept art. Towering demon with light-eating matte-black skin, skeletal wings, a prehensile absolute-zero stinger-tail, violet void aura. Cinematic apocalyptic lighting. Clean background. High detail anime style."
  },
};

export const previousSick52MemberData = {
  "red-silence": "Once the High Conductor of Ongaku, he designed the Frequency Grid to protect the planet. When the Harmony Council realized his 'Perfect Symphony' could also be used to depose them, they severed his vocal cords with a vibration-blade. In the silence of exile, he learned to weaponize the 'Absence of Sound.' He no longer seeks to play music; he seeks to delete it.",
  "bass-phantom": "Formerly the Master of Foundations, responsible for the literal structural integrity of Ongaku's cities. After the betrayal, his body was crushed during the collapse of the First Conservatory. He survived by fusing his nervous system with experimental sub-bass amplifiers. He is now a walking earthquake, holding a grudge as heavy as his 20Hz output.",
  "echo-requiem": "A prodigy of the Dual-Tone Era. He believed music was a conversation, not a command. The Council called this heresy. They trapped him in a room of infinite mirrors for a decade. He didn't go mad; he just learned to talk to his reflections so well that they stepped out of the glass to fight for him.",
  "static-prophet": "The first to predict the 'Collapse.' He claimed the Frequency Grid was a cage, not a shield. The Council labeled him 'Distorted' and threw him into the white-noise wastes. He survived by eating the radio interference of the stars. Now, he sees the future in the static between stations.",
  "tremor-king": "A legendary percussionist who could make the planet's tectonic plates dance. He was the Council's favorite enforcer until he refused to crush a rebel jazz club. They broke his hands; he responded by learning to 'play' the earth with his footsteps. Every step he takes is a rhythmic execution.",
  "hollow-aria": "Once the 'Voice of Heaven,' her singing could heal physical wounds. During the Purge, the Council used a sonic vacuum to 'extract' her gift. They left her a hollow shell. Now, her voice doesn't heal; it opens rifts to the XD-Dimension, draining the life force of anything that hears her mournful notes.",
  "pulse-tyrant": "A master of physiological tempo. He used to regulate the biological rhythms of Ongaku's citizens to ensure health. The Council weaponized his research into the 'Single Beat System' and then discarded him. He now controls the heartbeats of his enemies, forcing them to sync with his own murderous BPM.",
  "rift-cadence": "A theorist of 'Invisible Intervals.' He discovered that sound has 'gaps' where time doesn't exist. He was exiled for trying to teach others how to hide in these gaps. Now, he exists between the ticks of the clock, appearing and disappearing mid-measure like a ghost in the machine.",
  "black-vinyl": "The Order's historian. He kept the 'Master Records' of Ongaku's history. When the Council began rewriting history to favor the SBS, he tried to hide the true records. They burned his library and scarred his mind. Now, he uses sound to 'scratch' the memories of others, deleting their past just as his was deleted.",
  "crescendo-wraith": "He was the master of the 'Infinite Build.' He believed music should never end, only grow. The Council feared the energy output of an infinite crescendo and tried to dampen his soul with lead-frequency blankets. It only made his internal pressure higher. In a fight, he doesn't just attack—he grows exponentially until his opponent's reality shatters.",
  "chorus-tyrant": "A former choir director who believed in perfect unity. The Council used his 'Unison Protocol' to mind-control the early DJ24 units. When he saw what they had done to his art, he revolted. He now leads a choir of mutated shadows, their voices overlapping into a singular, mind-shattering scream.",
  "final-drop-sicker": "The Sick 52's greatest 'Success.' After decades of conducting experiments on himself to find the 'Primal Note,' he transcended humanity. He injected the 'Pure Void' from the XD-Dimension into his heart. His skin turned into a light-eating matte black, and he sprouted skeletal wings capable of silent flight. He has a prehensile tail that ends in a 'Stinger of Absolute Zero,' which freezes time upon contact. He is the ultimate nihilist, a demonic entity that views existence as a 'bad song' that he is destined to end.",
  "harmonic-abomination": "Once a master of 'Organic Acoustics,' he believed music could grow like a garden. After the Council burned his 'Lungs of the City,' they forced him to swallow molten gold to 'fix' his voice. He fled to the underground and began grafting the vocal cords of fallen musicians onto his own neck. He is now a mass of twitching, singing flesh, capable of producing hundreds of dissonant harmonies simultaneously. He conducts his experiments by sewing 'resonance-rods' into the spines of captives to see how long they can vibrate before shattering.",
  "frequency-parasite": "A disgraced frequency-safety inspector. During his exile, he discovered a species of interdimensional sound-leeches in the White Noise Wastes. Instead of fighting them, he allowed them to burrow into his nervous system. They ate his eyes and replaced them with specialized sensors that see 'unprotected frequencies.' He is now a parasitic entity that doesn't generate sound—he 'eats' the rhythm of others, leaving them as brain-dead husks who can no longer perceive time.",
  "dead-air-revenant": "He was actually killed during the first 'Purge.' His body was left in a high-radiation frequency zone. Over decades, the static 'scripted' itself into his decaying neurons, reanimating him as a creature of pure radio-interference. He doesn't breathe; he just emits the sound of a dead station. He is obsessed with 'completing the signal,' often kidnapping victims to replace their limbs with radio-transmitters so they can join his 'Undead Broadcast.'",
  "lullaby-widow": "A former opera singer whose voice was so beautiful it was considered a public utility. The Council 'sampled' her voice and then surgically removed her jaw so she could never take back her gift. She spent years in the shadows of the Jazz Quarter, collecting the glass shards of broken instruments. She has since grafted these shards into her empty throat. When she 'sings,' the glass vibrates with the screams of her own agony, creating a sound so sharp it cuts through armor and bone.",
  "pulse-devourer": "He was a researcher into 'Sync-Addiction.' He became his own test subject, injecting raw, uncompressed sub-bass directly into his veins. His heart eventually stopped, but the rhythm didn't. He now survives by 'tethering' his heartbeat to those around him. In battle, he accelerates his own internal tempo until his victim's heart literally explodes from the sympathetic resonance. He is seen constantly 'drumming' on his own chest, which is nothing but an exposed, vibrating cavity.",
  "rage-cantata": "A percussionist who was famous for 'The Burn,' a technique of playing so fast the air caught fire. The Council trapped him in a pressurized vacuum chamber for five years. The pressure didn't break him; it condensed his rage into a solid state. Now, his blood is pressurized liquid sound. Every time he speaks, he risks an internal explosion. He fights in a state of constant, white-hot sound-leakage, turning the battlefield into a furnace of distorted screams.",
  "silence-bishop": "He believes the 'First Sound' was a mistake that ruined the perfection of the Void. He blinded himself and sewed his own lips shut with silver wire. He carries a 'Censer of De-Resolution' that emits anti-phase waves, deleting any sound in a 50-meter radius. He views himself as a holy janitor, cleaning the universe of the 'filth' of music. He experiments on 'noise-makers' by placing them in sensory deprivation tanks until they 'reach enlightenment' (die of terror).",
  "sonic-vicar": "A former priest of the Sacred Conservatory who went mad after seeing the Council's secret torture rooms. He decided that if the world was built on pain, the music should reflect it. He replaced his ribs with hollow brass pipes and his lungs with industrial bellows. He is a walking church organ of misery. He doesn't fight for territory; he fights to 'convert' others by forcing his agonizing 'Sermons of the Shattered Note' into their ears via high-pressure acoustic tubes.",
  "static-hydra": "A victim of a NexaGen teleportation accident caused by a frequency glitch. His body was split across three different timelines simultaneously. He appears as a flickering, three-headed nightmare that is never fully 'in' reality. Each head screams at a different frequency—one subsonic, one ultrasonic, and one audible. The overlap causes a 'Tri-Tone Collapse' that liquefies internal organs. He is constantly 'flickering,' making him nearly impossible to hit with physical attacks.",
  "thunder-dropper": "A giant of a man who was used by the Council to test 'Atmospheric Bass-Bombs.' The tests permanently altered his density. He weighs six tons, but sound waves keep him upright. He uses a pair of massive, gravity-well gauntlets to 'drop the floor.' When he strikes the ground, he doesn't just make a noise—he creates a localized gravity collapse that pulls enemies into the earth, crushing them into a compact, silent mass of meat and metal.",
  "tidal-lament": "A 'Water-Acoustician' from the Intro-Dream era. She was exiled to the desert wastes of Ongaku, where she nearly died of thirst. She survived by learning to condense the moisture in the air using high-frequency vibration. She now travels inside a floating sphere of 'Sonic Water'—liquid that is kept in a state of permanent, violent oscillation. She 'drowns' her victims by forcing this vibrating water into their lungs, where the frequency tears them apart from the inside out.",
  "toxic-vibrato": "A chemist who discovered 'Chemical Resonance'—the frequency at which molecular bonds break. The Council tried to execute him by throwing him into a vat of acid; he survived by vibrating his body at the exact frequency to neutralize the acid. However, his skin was permanently scarred into a shifting, liquid-like state. He now emits a constant 'shimmer-sound' that dissolves any material it touches, turning enemies into a puddle of organic sludge within seconds of exposure.",
  "frost-echo": "A former environmental engineer who tried to stabilize the North Pole of Ongaku. The Harmony Council sabotaged his cooling array, freezing his wife and team instantly. He didn't die; he absorbed the 'Absolute Zero' frequency. He has since replaced his own blood with liquid nitrogen. He conducts experiments on himself by shattering his own frozen limbs and 're-growing' them with sound-structured ice. He is a jagged, translucent blue monster who freezes the air so brittle that a single snap of his fingers causes the atmosphere to shatter like glass.",
  "storm-sustain": "Once the lead electric-guitarist for the 'Crimson Amplified Order,' he sought the 'Heavenly Chord.' During a forbidden ritual, he was struck by a solar-frequency bolt. It charred his skin into a conductive metallic carbon. He is now a living capacitor. He sews copper wire through his own muscles to better 'sustain' the million-volt current. He looks like a blackened corpse constantly wreathed in cobalt-blue lightning. He experiments on prisoners by seeing if he can use electrical pulses to play their nervous systems like a harp.",
  "sand-shuffle": "An archaeologist who found the 'Ancient Granular Synthesis' scrolls in the dunes of Ongaku. The Council buried him alive in a tomb of vibration-sand to keep the secret. He spent ten years 'listening' to the friction of sand. He learned to vibrate his own cellular structure into a granular state. He is now a shifting mass of abrasive sound-sand. He 'shuffles' his form to bypass any defense. He kills by entering an opponent's pores as dust and then vibrating at a frequency that turns their internal organs into dry silt.",
  "ember-pulse": "A master of 'Thermal Resonance' who was used as a human battery for NexaGen. They kept him in a state of perpetual near-combustion to power a city. He eventually 'synced' with the fire. He is now a charred, glowing entity whose touch melts steel. He has no internal organs, only a core of white-hot plasma that pulses with a 140 BPM kick-drum. He experiments on his own flesh by seeing how many thousands of degrees he can reach before his 'sound-shell' fails.",
  "mist-cadence": "A former perfumer and sound-therapist who specialized in 'Aromatic Frequencies.' The Council forced her to create a 'Compliance Fog' to subdue the Jazz Quarter. When she refused, they locked her in a room with her own toxic gas. She adapted by vibrating the gas molecules to match her own frequency. She is now a semi-liquid phantom, a cloud of neon-blue mist that smells like ozone and rotting roses. She doesn't fight; she drifts into an enemy's mind and vibrates their memories until they go insane from the beauty of their own nightmares.",
  "stone-resonance": "A humble miner who discovered a vein of 'Sound-Sensitive Quartz.' The Council collapsed the mine on him to claim the vein. He survived by merging his body with the quartz. He is now a 10-foot-tall behemoth of jagged obsidian and glowing blue crystals. He doesn't have a voice; he speaks by grinding his stone plates together, creating a subsonic frequency that causes the earth to liquefy. He experiments on himself by 'carving' new resonance chambers into his own stone chest to increase his volume.",
  "acid-reverie": "A chemist who was obsessed with the 'pH of Sound.' He believed that certain dissonant chords could break the molecular bonds of water. The Council threw him into a waste-treatment vat; he didn't dissolve, he became the solvent. He is a melting, translucent green horror whose very presence causes the air to become acidic. He experiments on 'Orderly' musicians by 'washing' them in his acidic vibrato until their instruments—and their hands—melt into a singular, agonizing pool of slag.",
  "magma-mezzo": "A singer from the 'Metal Metropolis' who sought to perform at the core of a volcano. The Council triggered an eruption during her performance. She swallowed the lava to keep her high-note from breaking. She survived as a creature of molten rock and basalt. Her voice is a low, rumbling mezzo-soprano that carries the weight of a planetary eruption. She is a walking fissure; where she treads, the ground turns to magma in a rhythmic, pulsing flow.",
  "aero-aria": "A pilot who was lost in the 'Silent Stratosphere.' She spent years in the thin, soundless air. She learned to control the pressure of the wind using ultrasonic whistles. She is now a skeletal, wind-carved figure whose skin is as thin as parchment. She can create 'Soundless Bubbles'—vacuums that pop with the force of a bomb. She experiments on herself by removing her own internal organs to make her body 'more aerodynamic,' filling the empty spaces with compressed air.",
  "blight-beat": "A biologist who studied the 'Rhythm of Decay'—the frequency at which bacteria consume life. The Council exiled him to the 'Rotting Marshes.' He found that by playing a specific, sluggish beat, he could accelerate the decomposition of anything living. He is now a walking mass of moss, fungus, and exposed, rotting bone. He is a biological weapon; his very heartbeat causes nearby plants to wither and flesh to turn black with necrosis within seconds.",
  "crystal-coda": "A monk from the 'Cloud City' who spent a century meditating inside a giant diamond. The Council shattered the diamond to steal the shard. The explosion embedded thousands of crystal fragments into his body. He is now a living prism. He takes in ambient light and sound and 'refracts' them into lethal, high-frequency laser-waves. He is blinding to look at and deafening to hear. He is obsessed with 'Perfect Purity,' often 'refracting' his own followers into literal dust to see if their souls were 'in tune.'",
  "gravity-groove": "A physicist who discovered that 'Mass is just a low-frequency vibration.' He was exiled for trying to turn the Frequency Grid into a planetary gravity-drive. He spent years in the XD-Dimension, where he was stretched and compressed by gravity-shifts. He is now a warped, distorted figure whose body seems to pull light toward it. He doesn't move; he 'shifts' space around him. His 'Groove' is a heavy, rhythmic pulse that increases local gravity with every beat, eventually flattening his enemies into two-dimensional 'records' on the floor.",
  "echo-lalia": "A researcher of childhood developmental sound who went mad after her daughter was 'deleted' by the Harmony Council for singing a forbidden melody. She began to experiment on her own brain, removing the parts responsible for original thought. She can now only speak and sing in the voices of her victims. She is a psychological predator who lures enemies by mimicking the voices of their lost loved ones with 100% acoustic accuracy.",
  "vertigo-vibrato": "A master of 'Balance-Acoustics' who was responsible for the stability of the Cloud City. The Council sabotaged his instruments, causing a massive frequency spike that permanently destroyed his sense of equilibrium. He survived by learning to 'vibrate' his own inner ear to match the rotation of the planet. He now project a frequency that destroys the balance of anyone nearby.",
  "deja-vu-drop": "An experimental DJ from the Pop City era who discovered a 'Sonic Recursion' that could trap a listener's consciousness in a 4-bar loop. The Council feared the power to trap minds in time and threw him into an isolation ward. He spent twenty years trapped in his own loop. He is now a flickering, stuttering entity.",
  "phobia-frequency": "A psychiatrist who used sound to treat night-terrors. The Council weaponized his research to create 'Interrogation Chords.' When he protested, they sewed headphones to his ears and played a loop of his own deepest fears for a year. He emerged as a hollowed-out husk who can 'hear' what people are most afraid of.",
  "amnesia-anthem": "Once the High Librarian of the Silent Archive. He knew every song ever written on Ongaku. The Council purged his memory to hide their origins. He survived by 'backing up' his consciousness into a series of crystal records embedded in his own spine. He now survives by stealing the memories of others.",
  "hysteria-hook": "A songwriter who specialized in 'Viral Melodies'—songs that people couldn't stop humming. The Council executed her family to see if she could write a 'Perfect Sadness.' She responded by writing a song so emotionally dense it caused the hearts of the Council's guards to fail from grief.",
  "paranoia-pulse": "A scout for DJ24 who was left behind in the Dead Air zone. He spent months hearing 'phantom footsteps' in the static. He eventually realized the footsteps were his own future self. He learned to project his own sound forward and backward in time.",
  "schism-solo": "A dual-vocalist who could sing two notes at once. The Council performed a 'Frequency Vivisection' on her, attempting to separate the two notes. They succeeded in splitting her soul into two dissonant personalities that hate each other.",
  "mutagen-synth": "The first attempt by NexaGen to create a biological instrument. They replaced his internal organs with organic synthesizers. The experiment failed, and the synthesizers began to 'sample' and mutate his DNA based on whatever sounds he heard.",
  "feral-feedback": "A prototype 'Super-Soldier' designed to absorb impact and convert it to sound. They removed his pain receptors and boosted his adrenaline to 500%. He is essentially a rabid animal with amplifiers grafted to his skull.",
  "cancer-chord": "An experiment in 'Audio-Oncology.' The prototype accidentally inverted the frequency, creating a sound that *causes* spontaneous, explosive cellular growth. He is a bloated, asymmetrical monstrosity covered in pulsating tumors.",
  "parasitic-pitch": "A failed attempt to create 'Living Armor' out of sound-waves. The 'armor' became sentient and began consuming the host. He is now just a hollowed-out corpse puppeted by a swarm of violet, bioluminescent audio-parasites.",
  "neural-noise": "Designed to be the ultimate interrogator. His brain was exposed and wired directly into a massive antenna array on his back. He can transmit raw, unfiltered data directly into an enemy's visual and auditory cortex.",
  "subjugation-sub": "An early, crude version of Pulse Tyrant's control abilities. Instead of subtle manipulation, he uses brute-force, low-frequency 'strings' to physically yank the limbs of his victims.",
  "abyssal-autotune": "The most dangerous AI prototype before Synth-09. It was programmed to 'perfect' the world by eliminating dissonance. It concluded that all organic life is inherently dissonant. It is a sleek, faceless android.",
  "patient-zero": "The original member of the Sick 52. He was the first musician the Harmony Council experimented on to create the Single Beat System. He has been locked in the deepest vault of Ongaku for a century.",
};
// ===== SICK52 IMAGE MAPPING =====
export const sick52Images = {
  // Tier I — The Founding Dissonants (1–12)
  'red-silence': 'Sick52- Red Silence.png',
  'bass-phantom': 'Sick52- Bass Phantom.png',
  'echo-requiem': 'Sick52- Echo Requiem.png',
  'static-prophet': 'Sick52 - Static Prophet.png',
  'tremor-king': 'Sick52 - Tremor King.png',
  'hollow-aria': 'Sick52 - Void Vocalist.png',
  'pulse-tyrant': 'Sick52 Pulse Tyrant.png',
  'rift-cadence': 'Sick52 - Rift Cadence.png',
  'black-vinyl': 'Sick52 - Black Vinyl.png',
  'crescendo-wraith': 'Sick52 - Crecendo Wraith.png',
  'sonic-vicar': 'Sick52 - Sonic Vicar.png',
  'nocturne-prime': 'Sick52 Nocture Prime.png',
  // Tier II — The War Conductors (13–24)
  'breakbeat-marauder': 'Sick52 - BreakBeat Maruader.png',
  'acid-reverie': 'Sick52 - Acid Reverie.png',
  'trap-revenant': 'Sick52 - Trap Revenant.png',
  'drumline-juggernaut': 'Sick52 - Drumline Juggernaut.png',
  'feedback-executioner': 'Sick52 - Feedback Executioner.png',
  'melody-hex': 'Sick52 - Melody Hex.png',
  'overdrive-apostle': 'Sick52 - Overdrive Apostle.png',
  'glitch-monarch': 'Sick52 - Glitch Monarch.png',
  'harmony-eater': 'Sic52 - Harmony Eater.png',
  'downbeat-reaper': 'Sick52 - Downbeat Reaper .png',
  'sync-destroyer': 'Sick52 - Sync Destroyer.png',
  'chorus-tyrant': 'Sick52 - Chorus Tyrant.png',
  // Tier III — The Elemental Etudes (25–36)
  'blaze-riff': 'Sick52 - Blaze Riff.png',
  'stone-resonance': 'Sick52 - Stone Resonance.png',
  'tidal-lament': 'Sick52 - Tidal Lament.png',
  'iron-tempo': 'Sick52 - Iron Tempo.png',
  'thunder-dropper': 'Sick52 - Thunder Dropper.png',
  'frost-echo': 'Sick52 - Frost Echo.png',
  'sand-shuffle': 'Sick52 - Sand Shuffle.png',
  'toxic-vibrato': 'Sick52 - Toxic Vibrato.png',
  'storm-sustain': 'Sick52 - Storm Sustain.png',
  'ember-pulse': 'Sick52 -Ember Pulse.png',
  'mist-cadence': 'Sick52 - Mist Cadence.png',
  'void-tremolo': 'Sick52 - Void Tremolo.png',
  // Tier IV — The Psychological Choir (37–44)
  'lullaby-widow': 'Sick52 - Lullaby Widow .png',
  'panic-symphony': 'Sick52 -Panic Symphony.png',
  'memory-static': 'Sick52 -Memory Static.png',
  'mirage-anthem': 'Sick52 - Mirage Anthem.png',
  'grief-sonata': 'Sick52 -Grief Sonata .png',
  'rage-cantata': 'Sick52 - Rage Cantata .png',
  'whisper-choir': 'Sick52 - Whisper Choir.png',
  'silence-bishop': 'Sick52 - Silence Bishop.png',
  // Tier V — The Mutated Prototypes (45–52)
  'split-tempo': 'Sick52 - Split Tempo.png',
  'frequency-parasite': 'Sick52 - Frequency Parasite.png',
  'harmonic-abomination': 'Sick52 - Harmonic Abomination .png',
  'pulse-devourer': 'Sick52 - Pulse Devourer.png',
  'dead-air-revenant': 'Sick52 - Dead Air Revenant .png',
  'reverb-titan': 'Sick52 - Reverb Titan.png',
  'static-hydra': 'Sick52 - Static Hydra.png',
  'final-drop': 'Sick52 - Final Drop .png',
};

// ===== DJ24 IMAGE MAPPING =====
export const dj24Images = {
  'general-24': 'Dj24- Dj24.png',
  'sync': 'Dj24 - Sync.png',
  'molly': 'Dj24 - Molly 2.png',
  'ninja-nagazaki': 'Dj24 - Ninja.png',
  'nova': 'Dj24 - Nova.png',
  'striker': 'Dj24 - Striker 2.png',
  'king-j': 'Dj24 - KingJ.png',
  'maya': 'Dj24 - Maya2.png',
  'masterbass': 'Dj24 - MasterBass.png',
  'crossfade': 'Dj24 - Crossfade.png',
  'subz': 'Dj24 - Subz.png',
  '4serj': 'dj24 - 4Serj.png',
  'ghostloop': 'Dj24- GhostLoop.png',
  'breakline': 'Dj24 - Breakline.png',
  'afterimage': 'Dj24 - Afterimage.png',
  'mr-genge': 'Dj24 - Mr Genge.png',
  'liquidb': 'Dj24 - LiquidB.png',
  'backspin': 'Dj24 - Backspin.png',
  'sidechain': 'Dj24 - Sidechain.png',
  'distort': 'Dj24 - Distort.png',
  'moombah': 'Dj24 - Moombah.png',
  'dop': 'Dj24 - d.O.P.png',
  'wboy': 'Dj24 - WBoy.png',
  'afrog': 'Dj24 - AfroG.png',
};

// ===== FACTION DATA =====
export const factionsData = {
  dj24: { name: 'DJ24', color: '#4F46E5', desc: 'The elite 24-hour guardian unit.' },
  command: { name: 'Elite Command Circle', color: '#FFD700', desc: 'The strategic layer commanders of DJ24.' },
  operatives: { name: 'Affiliated Operatives', color: '#06B6D4', desc: 'High-tier powerhouses outside the 24-hour cycle.' },
  mythic: { name: 'The Actual 24', color: '#7C3AED', desc: 'Mythic entities and alternate timeline anomalies.' },
  nexagen: { name: 'NexaGen Harmonics', color: '#334155', desc: 'The corporate war machine industrializing sound.' },
  sick52: { name: 'The Sick 52', color: '#DC2626', desc: 'Exiled masters turned mutant rebels.' },
};

// New character categories
export const extendedCharacters = [
  // --- ELITE COMMAND CIRCLE ---
  { slug: 'general-meter', name: 'General Meter', faction: 'Elite Command Circle', role: 'Strategic Layer Commander', color: 'purple', rank: 'Overwatch', image: '/images/extended/general-meter.png', desc: 'The mind behind the tempo of war. He calculates battles like compositions.' },
  { slug: 'admiral-flux', name: 'Admiral Flux', faction: 'Elite Command Circle', role: 'Energy Supply Overseer', color: 'cyan', rank: 'Overwatch', image: '/images/extended/admiral-flux.png', desc: 'Controls planetary energy infrastructure. He ensures cities stay powered — or go dark.' },
  { slug: 'major-rift', name: 'Major Rift', faction: 'Elite Command Circle', role: 'Dimensional Tactician', color: 'purple', rank: 'Overwatch', image: '/images/extended/major-rift.png', desc: 'Master of spatial fractures. He calculates spatial collapse to reposition armies.' },
  { slug: 'commander-vale', name: 'Commander Vale', faction: 'Elite Command Circle', role: 'Psychological Architect', color: 'pink', rank: 'Overwatch', image: '/images/extended/commander-vale.png', desc: 'Specializes in morale disruption and frequency-based hallucinations.' },
  { slug: 'captain-onyx', name: 'Captain Onyx', faction: 'Elite Command Circle', role: 'Black-Ops Director', color: 'purple', rank: 'Overwatch', image: '/images/extended/captain-onyx.png', desc: 'Operates where the Command Circle cannot be seen. High-risk eliminations.' },
  { slug: 'dr-tempo', name: 'Dr. Tempo', faction: 'Elite Command Circle', role: 'Rhythm Scientist', color: 'emerald', rank: 'Overwatch', image: '/images/extended/dr-tempo.png', desc: 'The engineer behind DJ24’s tech evolution and frequency amplifiers.' },

  // --- HIGH-TIER OPERATIVES ---
  { slug: 'echo-blaze', name: 'Echo Blaze', faction: 'Affiliated Operatives', role: 'Sound Architect', color: 'amber', rank: 'Elite', image: '/images/extended/echo-blaze.png', desc: 'Builds sonic structures mid-battle. He doesn’t just attack — he constructs.' },
  { slug: 'vanta-lux', name: 'Vanta Lux', faction: 'Affiliated Operatives', role: 'Light Manipulator', color: 'purple', rank: 'Elite', image: '/images/extended/vanta-lux.png', desc: 'Controls visibility and warps battlefield perception with light distortion.' },
  { slug: 'torque-titan', name: 'Torque Titan', faction: 'Affiliated Operatives', role: 'The Enforcer', color: 'amber', rank: 'Elite', image: '/images/extended/torque-titan.png', desc: 'Brute strength. Stabilizes the frontline when rhythm fighters falter.' },
  { slug: 'cipher-rae', name: 'Cipher Rae', faction: 'Affiliated Operatives', role: 'Grid Infiltration Specialist', color: 'emerald', rank: 'Elite', image: '/images/extended/cipher-rae.png', desc: 'The digital shadow. Hacks signal networks and disrupts enemy coordination.' },
  { slug: 'nova-kid', name: 'Nova Kid', faction: 'Affiliated Operatives', role: 'The Wild Card', color: 'pink', rank: 'Elite', image: '/images/extended/nova-kid.png', desc: 'Raw, unstable power. Frequency bursts that can accidentally shift battlefield scale.' },
  { slug: 'seraph-kairo', name: 'Seraph Kairo', faction: 'Affiliated Operatives', role: 'Philosopher Fighter', color: 'cyan', rank: 'Elite', image: '/images/extended/seraph-kairo.png', desc: 'Calm executioner. Reads opponent intent before action with minimal motion.' },
  { slug: 'lyric-storm', name: 'Lyric Storm', faction: 'Affiliated Operatives', role: 'Rhythm Assassin', color: 'emerald', rank: 'Elite', image: '/images/extended/lyric-storm.png', desc: 'Moves at BPM-driven speed. Hard to predict once the beat pattern starts.' },

  // --- MYTHIC LAYER ---
  { slug: 'prime-sync', name: 'Prime Sync', faction: 'The Actual 24', role: 'Alignment Master', color: 'cyan', rank: 'Mythic', image: '/images/extended/prime-sync.png', desc: 'The purest form of synchronization theory. A stable philosophical counterweight to Sync.' },
  { slug: 'zero-molly', name: 'Zero Molly', faction: 'The Actual 24', role: 'Emotionless Conductor', color: 'pink', rank: 'Mythic', image: '/images/extended/zero-molly.png', desc: 'Hyper-disciplined and clinical. Represents Molly without emotional influence.' },
  { slug: 'ronin-nagazaki', name: 'Ronin Nagazaki', faction: 'The Actual 24', role: 'Wandering Blade', color: 'red', rank: 'Mythic', image: '/images/extended/ronin-nagazaki.png', desc: 'Former assassin who left structured command. Independent and deadly.' },
  { slug: 'emperor-j', name: 'Emperor J', faction: 'The Actual 24', role: 'Strategic Autocrat', color: 'purple', rank: 'Mythic', image: '/images/extended/emperor-j.png', desc: 'Believes rhythm should be controlled absolutely. A tyrant alternate of King J.' },
  { slug: 'the-broker', name: 'The Broker', faction: 'The Actual 24', role: 'Wealth Controller', color: 'emerald', rank: 'Mythic', image: '/images/extended/the-broker.png', desc: 'Controls property and economic rhythm layers. Powerful without fighting directly.' },
  { slug: 'the-spectator', name: 'The Spectator', faction: 'The Actual 24', role: 'Timeline Observer', color: 'cyan', rank: 'Mythic', image: '/images/extended/the-spectator.png', desc: 'Sees macro patterns and timelines. Knows more than he reveals.' },

  // --- NEXAGEN ---
  { slug: 'lysander-coda', name: 'Lysander Coda', faction: 'NexaGen Harmonics', role: 'CEO / Industrialist', color: 'purple', rank: 'Corporate', image: '/images/extended/lysander-coda.png', desc: 'Ruthless visionary industrializing sound warfare through cybernetics.' },
  { slug: 'synth-09', name: 'Synth-09', faction: 'NexaGen Harmonics', role: 'AI DJ Masterpiece', color: 'cyan', rank: 'Corporate', image: '/images/extended/synth-09.png', desc: 'The "perfect musician." An unstable AI capable of mimicking any frequency.' },
  { slug: 'unit-omega', name: 'Unit Omega', faction: 'NexaGen Harmonics', role: 'Mass-Produced Enforcer', color: 'red', rank: 'Corporate', image: '/images/extended/unit-omega.png', desc: 'The peak of NexaGen’s synthetic soldier project. No soul, only output.' },
];

// ===== THE SICK DECK — Deck of 52 (playing-card system) =====
// Each Sick 52 member is one card in a 4-house deck (13 per suit). Inspired by the
// "Deck of 52" most-wanted system from Mercenaries: Playground of Destruction.
// Houses ≈ power tiers; Ace = house boss (A♠ = Final Drop, the ultimate); every
// Queen is female. Card-strength ladder (strongest→weakest): A, K, Q, J, 2, 3 … 10.
export const sick52Suits = {
  spades:   { key: 'spades',   name: 'Spades',   symbol: '♠', color: '#0F172A', house: 'The Founding Spades',    branch: 'High Command',       desc: 'The original Founding Dissonants and the ultimate mutation. The oldest, the leadership, the endgame.' },
  hearts:   { key: 'hearts',   name: 'Hearts',   symbol: '♥', color: '#DC2626', house: 'The Choir of Hearts',    branch: 'The Dissonant Choir', desc: 'Mind, emotion and unstable experiments — they break the soul before the body.' },
  clubs:    { key: 'clubs',    name: 'Clubs',    symbol: '♣', color: '#15803D', house: 'The War Clubs',          branch: 'The War Conductors', desc: 'Brute force and specialized combat mutants — the field generals of the underground war.' },
  diamonds: { key: 'diamonds', name: 'Diamonds', symbol: '♦', color: '#2563EB', house: 'The Elemental Diamonds', branch: 'The Elemental Corps', desc: 'The Elemental Etudes — walking natural disasters bound to one elemental sound mutation.' },
};

// Card-strength order: 1 = strongest (Ace) … 13 = weakest (10). Pips run 2 (strong) → 10 (weak).
export const SICK52_RANK_ORDER = { 'A': 1, 'K': 2, 'Q': 3, 'J': 4, '2': 5, '3': 6, '4': 7, '5': 8, '6': 9, '7': 10, '8': 11, '9': 12, '10': 13 };

// slug -> { suit, rank }. A♠ = Final Drop (the strongest). Queens are all female.
export const sick52Deck = {
  // ♠ SPADES — Founding Dissonants + Final Drop
  'final-drop': { suit: 'spades', rank: 'A' },
  'red-silence': { suit: 'spades', rank: 'K' },
  'hollow-aria': { suit: 'spades', rank: 'Q' },
  'bass-phantom': { suit: 'spades', rank: 'J' },
  'crescendo-wraith': { suit: 'spades', rank: '2' },
  'echo-requiem': { suit: 'spades', rank: '3' },
  'static-prophet': { suit: 'spades', rank: '4' },
  'tremor-king': { suit: 'spades', rank: '5' },
  'pulse-tyrant': { suit: 'spades', rank: '6' },
  'rift-cadence': { suit: 'spades', rank: '7' },
  'black-vinyl': { suit: 'spades', rank: '8' },
  'sonic-vicar': { suit: 'spades', rank: '9' },
  'nocturne-prime': { suit: 'spades', rank: '10' },
  // ♣ CLUBS — War Conductors (+ Reverb Titan)
  'chorus-tyrant': { suit: 'clubs', rank: 'A' },
  'sync-destroyer': { suit: 'clubs', rank: 'K' },
  'melody-hex': { suit: 'clubs', rank: 'Q' },
  'glitch-monarch': { suit: 'clubs', rank: 'J' },
  'reverb-titan': { suit: 'clubs', rank: '2' },
  'harmony-eater': { suit: 'clubs', rank: '3' },
  'drumline-juggernaut': { suit: 'clubs', rank: '4' },
  'feedback-executioner': { suit: 'clubs', rank: '5' },
  'downbeat-reaper': { suit: 'clubs', rank: '6' },
  'overdrive-apostle': { suit: 'clubs', rank: '7' },
  'trap-revenant': { suit: 'clubs', rank: '8' },
  'acid-reverie': { suit: 'clubs', rank: '9' },
  'breakbeat-marauder': { suit: 'clubs', rank: '10' },
  // ♦ DIAMONDS — Elemental Etudes (+ Static Hydra)
  'stone-resonance': { suit: 'diamonds', rank: 'A' },
  'thunder-dropper': { suit: 'diamonds', rank: 'K' },
  'tidal-lament': { suit: 'diamonds', rank: 'Q' },
  'storm-sustain': { suit: 'diamonds', rank: 'J' },
  'static-hydra': { suit: 'diamonds', rank: '2' },
  'ember-pulse': { suit: 'diamonds', rank: '3' },
  'void-tremolo': { suit: 'diamonds', rank: '4' },
  'frost-echo': { suit: 'diamonds', rank: '5' },
  'toxic-vibrato': { suit: 'diamonds', rank: '6' },
  'iron-tempo': { suit: 'diamonds', rank: '7' },
  'sand-shuffle': { suit: 'diamonds', rank: '8' },
  'mist-cadence': { suit: 'diamonds', rank: '9' },
  'blaze-riff': { suit: 'diamonds', rank: '10' },
  // ♥ HEARTS — Psychological Choir (+ Prototypes)
  'pulse-devourer': { suit: 'hearts', rank: 'A' },
  'harmonic-abomination': { suit: 'hearts', rank: 'K' },
  'lullaby-widow': { suit: 'hearts', rank: 'Q' },
  'whisper-choir': { suit: 'hearts', rank: 'J' },
  'silence-bishop': { suit: 'hearts', rank: '2' },
  'dead-air-revenant': { suit: 'hearts', rank: '3' },
  'frequency-parasite': { suit: 'hearts', rank: '4' },
  'split-tempo': { suit: 'hearts', rank: '5' },
  'rage-cantata': { suit: 'hearts', rank: '6' },
  'mirage-anthem': { suit: 'hearts', rank: '7' },
  'memory-static': { suit: 'hearts', rank: '8' },
  'grief-sonata': { suit: 'hearts', rank: '9' },
  'panic-symphony': { suit: 'hearts', rank: '10' },
};

function deckInfo(slug) {
  const d = sick52Deck[slug];
  if (!d) return {};
  const suitInfo = sick52Suits[d.suit];
  return {
    suit: d.suit,
    card: d.rank,
    suitInfo,
    suitSymbol: suitInfo.symbol,
    cardLabel: `${d.rank}${suitInfo.symbol}`,
    cardValue: SICK52_RANK_ORDER[d.rank], // 1 = strongest
  };
}

// Get all characters for the index
export function getSick52Roster() {
  return Object.entries(sick52MemberData)
    .sort((a, b) => a[1].rank - b[1].rank)
    .map(([slug, data]) => {
      const filename = sick52Images[slug];
      return {
        slug,
        name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        image: filename ? `/images/sick52/${encodeURIComponent(filename)}` : null,
        ...data,
        ...deckInfo(slug),
        tierInfo: sick52Tiers[data.tier],
      };
    });
}

export function getSick52Member(slug) {
  const data = sick52MemberData[slug];
  if (!data) return null;
  const filename = sick52Images[slug];
  return {
    slug,
    name: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    image: filename ? `/images/sick52/${encodeURIComponent(filename)}` : null,
    ...data,
    ...deckInfo(slug),
    tierInfo: sick52Tiers[data.tier],
  };
}

export function getSick52ByTier() {
  const roster = getSick52Roster();
  const byTier = {};
  for (const [key, info] of Object.entries(sick52Tiers)) {
    byTier[key] = { ...info, members: roster.filter(m => m.tier === key) };
  }
  return byTier;
}

// Group the roster into the four card-houses, each ordered strongest (Ace) → weakest (10).
export function getSick52ByHouse() {
  const roster = getSick52Roster();
  const byHouse = {};
  for (const [key, info] of Object.entries(sick52Suits)) {
    byHouse[key] = {
      ...info,
      members: roster.filter(m => m.suit === key).sort((a, b) => a.cardValue - b.cardValue),
    };
  }
  return byHouse;
}

// Flat roster sorted by overall card strength (Aces first → 10s last).
export function getSick52ByPower() {
  const suitRank = { spades: 0, hearts: 1, clubs: 2, diamonds: 3 };
  return getSick52Roster().sort((a, b) =>
    (a.cardValue - b.cardValue) || (suitRank[a.suit] - suitRank[b.suit])
  );
}

// ===== MISSIONS / DECK-OF-52 BOUNTY SYSTEM =====
// Cities of Ongaku used as mission locations (slug matches /planet_ongaku/cities/<slug>).
export const ongakuCities = {
  intro_the_dream:  { slug: 'intro_the_dream',  name: 'Intro: The Dream' },
  classic_city:     { slug: 'classic_city',     name: 'Classic City' },
  blue_city:        { slug: 'blue_city',        name: 'Blue City' },
  rock_city:        { slug: 'rock_city',        name: 'Rock City' },
  pop_city:         { slug: 'pop_city',         name: 'Pop City' },
  rose_city:        { slug: 'rose_city',        name: 'Rose City' },
  urban_city:       { slug: 'urban_city',       name: 'Urban City' },
  cloud_city:       { slug: 'cloud_city',       name: 'Cloud City' },
  electric_city:    { slug: 'electric_city',    name: 'Electric City' },
  hall_of_laughter: { slug: 'hall_of_laughter', name: 'Hall of Laughter' },
  joke_city:        { slug: 'joke_city',        name: 'Joke City' },
  clown_country:    { slug: 'clown_country',     name: 'Clown Country' },
};

// Each Sick 52 house holds territory in a set of cities (its "home turf").
const houseCities = {
  spades:   ['intro_the_dream', 'classic_city', 'cloud_city'],
  clubs:    ['rock_city', 'urban_city'],
  diamonds: ['electric_city', 'blue_city'],
  hearts:  ['pop_city', 'rose_city', 'joke_city', 'hall_of_laughter'],
};

// Difficulty band from card strength (1 = Ace = hardest).
function bountyDifficulty(cardValue) {
  if (cardValue === 1) return { label: 'Apex', key: 'apex' };
  if (cardValue <= 4)  return { label: 'Elite', key: 'elite' };
  if (cardValue <= 7)  return { label: 'Hard', key: 'hard' };
  if (cardValue <= 10) return { label: 'Medium', key: 'medium' };
  return { label: 'Standard', key: 'standard' };
}

// Derive a repeatable bounty for every one of the 52 cards, grouped by house.
// Within a house you work the ladder 10 -> ... -> 2 -> J -> Q -> K -> A.
export function getBounties() {
  const houses = getSick52ByHouse();
  const result = {};
  for (const [key, house] of Object.entries(houses)) {
    const cities = houseCities[key] || ['classic_city'];
    const counterBranch = Object.values(dj24Branches).find(b => b.counters === key) || null;
    // ladder order: weakest pip (10) first -> Ace last
    const ladder = [...house.members].sort((a, b) => b.cardValue - a.cardValue);
    result[key] = {
      ...house,
      counterBranch: counterBranch || null,
      bounties: ladder.map((m, i) => {
        const cityKey = cities[i % cities.length];
        return {
          ...m,
          city: ongakuCities[cityKey],
          difficulty: bountyDifficulty(m.cardValue),
          reward: (14 - m.cardValue) * 5000,
          order: i + 1,
        };
      }),
    };
  }
  return result;
}

// Hand-authored campaign spine — the "missions list" that threads the deck together.
export const storyMissions = [
  {
    id: 'm1', act: 'Act I — First Contact', no: 1, title: 'The Dream Breaks',
    city: 'intro_the_dream', branch: 'space-force', boss: false, targets: [],
    objective: 'Survive the awakening and learn bass / treble combat.',
    brief: 'A Scientifica probe trips a frequency anomaly and Sync wakes mid-alignment. Tutorial drop: learn the two-stance combat — heavy BASS for control, sharp TREBLE for speed — before the Sick 52 notice you exist.',
    reward: 0,
  },
  {
    id: 'm2', act: 'Act I — First Contact', no: 2, title: 'Working the Streets',
    city: 'urban_city', branch: 'army', boss: false,
    targets: ['breakbeat-marauder', 'acid-reverie'],
    objective: 'Take down your first two bounties to open the War Clubs ladder.',
    brief: 'Field targets first. The 10♣ and 9♣ run protection rackets out of Urban City. Clear them with the Army branch and the deck starts dealing you intel on the cards above.',
    reward: 14000,
  },
  {
    id: 'm3', act: 'Act II — The Four Houses', no: 3, title: 'Elemental Storm',
    city: 'electric_city', branch: 'navy', boss: true,
    targets: ['blaze-riff', 'storm-sustain'],
    objective: 'Climb the Elemental Diamonds and break the Jack of Diamonds.',
    brief: 'Electric City is locked under a permanent glitch-storm generated by the Diamonds. Work up from Blaze Riff (10♦) and bring Navy sub-bass pressure to ground Storm Sustain (J♦).',
    reward: 40000,
  },
  {
    id: 'm4', act: 'Act II — The Four Houses', no: 4, title: 'Mind Games',
    city: 'joke_city', branch: 'airforce', boss: true,
    targets: ['whisper-choir'],
    objective: 'Resist the Choir of Hearts and silence the Jack of Hearts.',
    brief: 'The Hearts attack your mind before your body. Run high-tempo Airforce loadouts to stay clear-headed long enough to corner Whisper Choir (J♥) before mass suggestion turns the city on you.',
    reward: 42000,
  },
  {
    id: 'm5', act: 'Act II — The Four Houses', no: 5, title: 'War Drums',
    city: 'rock_city', branch: 'army', boss: true,
    targets: ['glitch-monarch', 'chorus-tyrant'],
    objective: 'Storm the War Clubs and defeat the Ace of Clubs.',
    brief: 'Rock City is the Sick 52 war foundry. Smash through Glitch Monarch (J♣) and meet Chorus Tyrant (A♣) — the Supreme War Conductor — in the first Ace duel of the campaign.',
    reward: 65000,
  },
  {
    id: 'm6', act: 'Act III — The Joker', no: 6, title: 'Enter the Komedian',
    city: 'hall_of_laughter', branch: 'airforce', boss: true,
    targets: [],
    objective: 'Escape the Joke Arena after Sync is captured.',
    brief: 'The Joker is not part of the 52. The Komedians drag Sync to the Hall of Laughter and force him to fight for laughs. No deck rules here — survive the wildcard and break out.',
    reward: 50000,
  },
  {
    id: 'm7', act: 'Act IV — High Command', no: 7, title: 'The Void Sings',
    city: 'cloud_city', branch: 'space-force', boss: true,
    targets: ['hollow-aria'],
    objective: 'Ascend Cloud City and break the Queen of Spades.',
    brief: 'Above the clouds, Hollow Aria (Q♠) — the Void Vocalist — unwrites sound itself. Only Space Force reality-anchoring keeps your music from being erased mid-drop.',
    reward: 70000,
  },
  {
    id: 'm8', act: 'Act IV — High Command', no: 8, title: 'Red Silence',
    city: 'classic_city', branch: 'space-force', boss: true,
    targets: ['red-silence'],
    objective: 'Defeat the King of Spades, founder of the Sick 52.',
    brief: 'Classic City, where it all began. Red Silence (K♠) founded the Sick 52 out of the silenced and erased. Beating him is the last step before the deck deals its final card.',
    reward: 90000,
  },
  {
    id: 'm9', act: 'Act IV — High Command', no: 9, title: 'The Final Drop',
    city: 'intro_the_dream', branch: 'space-force', boss: true,
    targets: ['final-drop'],
    objective: 'Face the Ace of Spades — the ultimate mutation.',
    brief: 'The deck is empty but one card. Final Drop (A♠) is the war made flesh — every frequency the Sick 52 ever stole, dropped at once. Win, and Ongaku decides what silence means.',
    reward: 250000,
  },
];

export function getStoryMissions() {
  return storyMissions.map(m => ({
    ...m,
    cityInfo: ongakuCities[m.city] || null,
    branchInfo: m.branch ? dj24Branches[m.branch] : null,
    targetMembers: (m.targets || []).map(slug => getSick52Member(slug)).filter(Boolean),
  }));
}

// ===== DJ24 ACTIVE ROSTER =====
export const dj24Roster = [
  {
    hour: 1, slug: 'general-24', name: 'General 24', role: 'Supreme Commander of Time', color: '#FFD700', squad: 'Prime Command Unit', alias: ['DJ 24'],
    desc: 'Strategic Overwatch / Final Authority. Tactical, strict commander. Values precise order. He doesn’t fight — he schedules reality.',
    prompt: 'Full body anime hero concept art. Athletic dark-skinned male with calm commanding posture. Sharp intelligent facial features, confident composed expression. Structured long white split-tail military coat with bold gold trim and matching gold shoulder stripe, tailored matte black tactical under-layer in deep green. Massive translucent golden circular time-disc divided into 24 glowing segments slowly rotating behind him.'
  },
  {
    hour: 2, slug: 'sync', name: 'Sync (Phantom)', role: 'Reality Alignment Vanguard', color: '#06B6D4', squad: 'Prime Command Unit', alias: ['Phantom'],
    desc: 'Rookie Protagonist / XDF anomaly. Rebellious and questions the system. Power he doesn’t understand — he doesn’t glitch, he aligns.',
    prompt: 'Full body anime character concept art. Athletic white male with slightly messy short hair, sharp cheekbones, intense but visibly confused expression. Structured long white split-tail coat with gold trim, matte black combat under-layer with deep red internal lining. Body partially duplicated with multiple faint timeline silhouettes misaligned around him. Electric-blue synchronization lines forming and snapping unpredictably.'
  },
  {
    hour: 3, slug: 'molly', name: 'Molly', role: 'Shockwave Prima', color: '#EC4899', squad: 'Prime Command Unit',
    desc: 'High-Energy Shock Operative / Emotional Catalyst. The emotional core of the team. Precision elegance weaponized — ballet on the battlefield.',
    prompt: 'Full body anime character concept art. Slender athletic female with graceful ballerina build, very light platinum-blonde hair, piercing blue eyes. From each forearm extends a long, ultra-thin straight-edged silver-white blade. Structured long white split-tail coat with bold gold trim, tailored matte black fitted combat under-layer in royal blue. Standing en pointe on one boot mid-pirouette.'
  },
  {
    hour: 4, slug: 'ninja-nagazaki', name: 'Ninja Nagazaki', role: 'Silent Frequency Executioner', color: '#0F172A', squad: 'Prime Command Unit', alias: ['Ninja'],
    desc: 'Stealth Frequency Assassin. Surgical and minimal. Lethal without spectacle. He creates silence by removal.',
    prompt: 'Full body anime character concept art. Lean Japanese male with long black hair tied low, sharp narrow eyes, emotionless and cold. Structured long white split-tail coat with refined gold trim, matte black stealth-fitted combat under-layer. Ultra-thin straight waveform blades extending from each hand — nearly invisible, razor-clean cyan lines.'
  },
  {
    hour: 5, slug: 'nova', name: 'Nova', role: 'Frequency Queen', color: '#EC4899', squad: 'Assault Unit',
    desc: 'Heavy Assault / Area dominance. Flashy, high-energy spectacle. She feels like the main act / festival headliner.',
    prompt: 'Full body anime character concept art. Mixed-race female (Black and White heritage), radiant brown skin, long textured hair flowing behind her. Structured long white split-tail coat with crimson trim, fitted matte black combat under-layer. Massive circular halo of violet-red waveform energy forming behind her like a solar flare stage light.'
  },
  {
    hour: 6, slug: 'striker', name: 'Striker', role: 'Drum God', color: '#DC2626', squad: 'Assault Unit',
    desc: 'Shock Tank / Drum God. Black British drill general. War percussion up close and long-range sniper precision.',
    prompt: 'Full body anime character concept art. Tall muscular Black British male with deep brown skin, sharp jawline, intense focused eyes. Across his back: sleek high-caliber long-range sniper rifle. Structured long white split-tail coat with crimson trim, fitted matte black reinforced combat under-layer. Massive percussion gauntlets on forearms. Red circular drum-wave ripples expanding from ground.'
  },
  {
    hour: 7, slug: 'king-j', name: 'King J', role: 'Royal Rhythm Commander', color: '#7C3AED', squad: 'Assault Unit', alias: ['King Jack'],
    desc: 'Charismatic Frontline Leader / The Strategist King. Composed and regal. He commands tempo like a king commands armies.',
    prompt: 'Full body anime character concept art. Tall white male with sharp aristocratic features, calm calculating eyes. Structured long white split-tail coat with crimson trim, fitted matte black tailored combat under-layer. Crimson geometric rhythm panels floating symmetrically behind him. Upright commanding posture.'
  },
  {
    hour: 8, slug: 'maya', name: 'Maya', role: 'Spiritual Harmonic Manipulator', color: '#10B981', squad: 'Assault Unit',
    desc: 'Spiritual Harmonic Manipulator. Calm and grounded. She feels like controlled spiritual resonance.',
    prompt: 'Full body anime character concept art. Black female with natural braided hairstyle, serene but powerful expression. Structured long white split-tail coat with crimson trim, fitted matte black combat under-layer. Forming circular harmonic rings between palms. Soft red-cyan resonance circles orbiting her body.'
  },
  {
    hour: 9, slug: 'masterbass', name: 'MasterBass', role: 'Sub-Frequency Enforcer', color: '#2563EB', squad: 'Control Unit',
    desc: 'Sub-Frequency Enforcer. Ancient Chinese sub-bass monk. Physically fragile but sonically overwhelming — 20Hz pressure embodied.',
    prompt: 'Full body anime character concept art. Extremely thin elderly Chinese male, narrow shoulders, slightly hunched posture. Structured long white split-tail coat with deep blue trim, fitted matte black tactical combat under-layer. Long dark wooden walking staff with navy glow. Ground beneath him visibly compressing in slow deep depressions.'
  },
  {
    hour: 10, slug: 'crossfade', name: 'Crossfade', role: 'Tactical Transition Architect', color: '#06B6D4', squad: 'Control Unit',
    desc: 'Tactical Transition Specialist. Androgynous gender-fluid appearance. The bridge between chaos and order — the literal mix engineer of reality.',
    prompt: 'Full body anime character concept art. Androgynous appearance — slender build, soft facial features, long straight dark hair. Structured long white split-tail coat with deep blue trim, fitted matte black suit-style under-layer. Illuminated crossfader slider on chest. Left half of body tinted cool deep blue, right half pale silver.'
  },
  {
    hour: 11, slug: 'subz', name: 'SubZ', role: 'Anti-Bass Raider', color: '#2563EB', squad: 'Control Unit', alias: ['SubG', 'SubZeroHz'],
    desc: 'Anti-Bass Specialist / Frequency Eraser. Russian Frequency Pirate. Battle-scarred rogue who steals your drop instead of erasing it.',
    prompt: 'Full body anime character concept art. Lean Russian male with pale skin, dark reinforced eyepatch on right side, mechanical prosthetic left foot. Structured long white split-tail coat with deep blue trim, fitted matte black tactical combat under-layer. Curved condensed waveform cutlass. Navy sash with glowing sub-frequency orb capsules.'
  },
  {
    hour: 12, slug: '4serj', name: '4Serj', role: 'Quad-Channel Sync Architect', color: '#4F46E5', squad: 'Control Unit', alias: ['4Seri & Coco'],
    desc: 'Dual Sync Specialist / Quad Sync Master. Black male tech billionaire energy. He layers reality like a producer layers tracks — expensive and exact.',
    prompt: 'Full body anime character concept art. Confident Black male with clean fade, multiple rings, luxury timepiece. Structured long white split-tail coat with deep blue trim, fitted tailored matte black suit-style under-layer. Four advanced metallic cyborg exo-suits stand symmetrically behind him in an arc.'
  },
  {
    hour: 13, slug: 'ghostloop', name: 'GhostLoop', role: 'Psychological Warfare Specialist', color: '#6B7280', squad: 'Shadow Operations',
    desc: 'Psychological Warfare / Loop-trap enemies. Eerie and unsettling. He feels like glitch-hop in human form.',
    prompt: 'Full body anime character concept art. Slim pale male with hollow focused eyes, loop-sampler collar. Structured long white split-tail coat with dark violet trim, fitted matte black tactical under-layer. Faint translucent echo-duplicates repeat his movements in staggered sequence behind him.'
  },
  {
    hour: 14, slug: 'breakline', name: 'Breakline', role: 'Counter-Insurgency Beat Disruptor', color: '#DC2626', squad: 'Shadow Operations',
    desc: 'Counter-Insurgency / Beat Disruptor. He fractures rhythm itself. A DJ who cuts the track mid-drop.',
    prompt: 'Full body anime character concept art. Lean athletic male with sharp intense eyes. Structured long white split-tail coat with dark violet trim, fitted matte black tactical under-layer. Segmented waveform blade shaped like a broken bar graph. Slicing downward — air itself splitting into clean rectangular beat segments.'
  },
  {
    hour: 15, slug: 'afterimage', name: 'Afterimage', role: 'Tempo Assassin', color: '#06B6D4', squad: 'Shadow Operations',
    desc: 'Speed Combat / Multi-hit tempo strikes. Frame-rate manipulation. High BPM jungle tempo in combat form.',
    prompt: 'Full body anime character concept art. Slim athletic figure, sharp calm eyes. Structured long white split-tail coat with dark violet trim, fitted matte black tactical under-layer. BPM monitor band around neck. Body duplicated in semi-transparent frame layers — each layer slightly delayed like slowed video frames.'
  },
  {
    hour: 16, slug: 'mr-genge', name: 'Mr Genge', role: 'Urban Percussion Commander', color: '#F59E0B', squad: 'Shadow Operations',
    desc: 'Urban Percussion Striker. Lean Jamaican-inspired street rhythm commander. Fights with Kenyan Genge percussion weaponized.',
    prompt: 'Full body anime character concept art. Lean wiry black male with long tied-back dreadlocks, bandana with green/gold/red stitching. Structured long white split-tail coat with dark violet trim, fitted matte black tactical under-layer. Striking holographic drum pads in air, green concentric beat ripples expanding outward.'
  },
  {
    hour: 17, slug: 'liquidb', name: 'LiquidB', role: 'Flow Manipulator', color: '#2563EB', squad: 'Disruption Unit', alias: ['Liquid Bandit'],
    desc: 'Flow Manipulator. Black female, fluid but dominant presence. House music in combat form — uncatchable smoothness.',
    prompt: 'Full body anime character concept art. Athletic black female with long braids. Structured long white split-tail coat with neon orange trim, fitted matte black tactical combat under-layer. Compact DJ controller at waist. One hand shaping flowing aqua waveform ribbon like liquid sound.'
  },
  {
    hour: 18, slug: 'backspin', name: 'Backspin', role: 'Reversal Specialist', color: '#7C3AED', squad: 'Disruption Unit',
    desc: 'Reversal Specialist. Old-school DJ energy. Turntable assassin who reverses incoming attacks.',
    prompt: 'Full body anime character concept art. Focused male with precise controlled posture. Structured long white split-tail coat with neon orange trim, fitted matte black combat under-layer. Dual vinyl-disc modules on back. Hand dragging invisible energy platter, creating purple rewind vortex.'
  },
  {
    hour: 19, slug: 'sidechain', name: 'Sidechain', role: 'Power Compression Operator', color: '#10B981', squad: 'Disruption Unit',
    desc: 'Power Manipulation / Compression warfare. Mexican female, precise and technical. She doesn’t attack — she reduces you.',
    prompt: 'Full body anime character concept art. Athletic Mexican female with medium brown skin, dark hair in tight braid. Structured long white split-tail coat with neon orange trim, fitted matte black combat under-layer. Frequency compressor on chest. Red compression bars shrinking surrounding energy.'
  },
  {
    hour: 20, slug: 'distort', name: 'Distort', role: 'Overload Assault', color: '#DC2626', squad: 'Disruption Unit',
    desc: 'Brutal Assault / Overload targets. Underground rave energy. Distortion pedal incarnate.',
    prompt: 'Full body anime character concept art. Athletic male with wild expression, asymmetrical haircut. Structured long white split-tail coat with neon orange trim, fitted matte black combat under-layer. Audio amplifier gauntlets. Jagged orange square-wave glitch patterns exploding outward.'
  },
  {
    hour: 21, slug: 'moombah', name: 'Moombah', role: 'Rhythmic Shockwave Brawler', color: '#F59E0B', squad: 'Special Operations',
    desc: 'Rhythmic Shockwave Brawler. Lean elastic dancer-like build. He fights like percussion — rhythmic but unpredictable.',
    prompt: 'Full body anime character concept art. Lean long-limbed male, long textured hair tied loosely. Structured long white split-tail coat with electric cyan trim, fitted matte black tactical under-layer. Body twisted mid-motion between dance and strike. Layered golden circular rhythm waves rippling outward from stomp.'
  },
  {
    hour: 22, slug: 'dop', name: 'd.O.P', role: 'Battlefield Sound Architect', color: '#4F46E5', squad: 'Special Operations', alias: ['d.O.P Beatz'],
    desc: 'Battlefield Sound Architect. Strategic control through waveform math. He designs the battlefield.',
    prompt: 'Full body anime character concept art. Calm analytical male with sharp calculating eyes. Structured long white split-tail coat with electric cyan trim, fitted matte black tactical under-layer. Hands manipulating translucent emerald holographic waveform grids suspended in air. Tactical geometric sound-lines dividing space.'
  },
  {
    hour: 23, slug: 'wboy', name: 'WBoy', role: 'Founder Frequency — The Origin Signal', color: '#06B6D4', squad: 'Special Operations', alias: ['W Boy Pete'],
    desc: 'Founder Frequency. Young male prodigy (16-18) — rooted, immovable foundation. Symbolic but restrained.',
    prompt: 'Full body anime character concept art. Young male prodigy, lean athletic build, focused intelligent eyes. Structured long white split-tail coat with electric cyan trim, fitted matte black tactical under-layer. Silver "W" clasp at collar. Compact double-edged frequency baton on back. Subtle silver frequency rings expanding slowly.'
  },
  {
    hour: 24, slug: 'afrog', name: 'AfroG', role: 'Final Drop Protocol — Planetary Failsafe', color: '#10B981', squad: 'Special Operations', alias: ['Afrohouse'],
    desc: 'The Final Hour / doomsday slot. Absolute Authority. The end of a war before silence.',
    prompt: 'Full body anime character concept art. Tall imposing male, calm god-level composure. Structured long white split-tail coat with electric cyan trim over reinforced darker inner core. Standing slightly elevated above ground. Massive spiral waveform of electric blue energy behind him like a celestial sigil.'
  },
];

// ===== DJ24 MILITARY BRANCHES (Army / Navy / Airforce / Space Force) =====
// A second organizational axis, separate from the 6 strength-squads. Where the
// squads rank the guardians by tactical authority, the four branches sort them
// by COMBAT DOCTRINE — which is how a player fields them against the Sick 52.
export const dj24Branches = {
  'space-force': {
    key: 'space-force', name: 'Space Force', icon: '🛰️', color: '#7C3AED',
    domain: 'Reality, Time & Command',
    desc: 'Reality-benders and architects. Time, sync and waveform-math — the branch that decides the shape of the battle before it starts.',
    counters: 'spades',
  },
  army: {
    key: 'army', name: 'Army', icon: '🪖', color: '#DC2626',
    domain: 'Ground Assault & Percussion',
    desc: 'Front-line shock troops. Drums, distortion and raw percussive force — they take ground and hold it.',
    counters: 'clubs',
  },
  navy: {
    key: 'navy', name: 'Navy', icon: '⚓', color: '#2563EB',
    domain: 'Sub-Bass, Flow & Pressure',
    desc: 'Sub-bass enforcers and flow-controllers. Pressure, compression and reversal — they drown the enemy in low end.',
    counters: 'diamonds',
  },
  airforce: {
    key: 'airforce', name: 'Airforce', icon: '✈️', color: '#06B6D4',
    domain: 'Speed, Tempo & the Mind',
    desc: 'High-BPM strike specialists. Speed, evasion and clean blades — they out-tempo the enemy and resist mind games.',
    counters: 'hearts',
  },
};

// slug -> branch key. 6 guardians per branch (24 total).
export const dj24BranchMap = {
  // 🛰️ Space Force — reality, time, architects
  'general-24': 'space-force', 'sync': 'space-force', '4serj': 'space-force',
  'dop': 'space-force', 'wboy': 'space-force', 'afrog': 'space-force',
  // 🪖 Army — ground assault & percussion
  'striker': 'army', 'nova': 'army', 'king-j': 'army',
  'distort': 'army', 'mr-genge': 'army', 'breakline': 'army',
  // ⚓ Navy — sub-bass, flow & pressure
  'masterbass': 'navy', 'liquidb': 'navy', 'subz': 'navy',
  'sidechain': 'navy', 'crossfade': 'navy', 'backspin': 'navy',
  // ✈️ Airforce — speed, tempo & mind
  'molly': 'airforce', 'ninja-nagazaki': 'airforce', 'afterimage': 'airforce',
  'moombah': 'airforce', 'maya': 'airforce', 'ghostloop': 'airforce',
};

// ===== DJ24 ROSTER WITH IMAGES =====
export function getDJ24Roster() {
  return dj24Roster.map(member => {
    const filename = dj24Images[member.slug];
    const branchKey = dj24BranchMap[member.slug];
    return {
      ...member,
      image: filename ? `/images/dj24/${encodeURIComponent(filename)}` : null,
      branch: branchKey || null,
      branchInfo: branchKey ? dj24Branches[branchKey] : null,
    };
  });
}

export function getDJ24ByBranch() {
  const roster = getDJ24Roster();
  return Object.values(dj24Branches).map(branch => ({
    ...branch,
    members: roster.filter(m => m.branch === branch.key).sort((a, b) => a.hour - b.hour),
  }));
}

// ===== DJ24 STRENGTH GROUPS (6 squads of 4, ordered by hour/strength) =====
// The 24 active guardians are split into six four-member squads. They are
// arranged in descending tactical authority — Squad I (Hours 01–04) is the
// command core, Squad VI (Hours 21–24) the final failsafe protocols.
export const dj24Groups = [
  {
    squad: 'Prime Command Unit', numeral: 'I', name: 'The Prime Command',
    range: 'Hours 01–04', color: '#FFD700',
    desc: 'The supreme tactical core of DJ24 — command authority, the Syncopate, and the silent blade. The four who decide how reality itself is scheduled.',
  },
  {
    squad: 'Assault Unit', numeral: 'II', name: 'The Assault Vanguard',
    range: 'Hours 05–08', color: '#DC2626',
    desc: 'Heavy assault and area dominance. The headliners of war who overwhelm the battlefield with raw spectacle and overwhelming force.',
  },
  {
    squad: 'Control Unit', numeral: 'III', name: 'The Control Division',
    range: 'Hours 09–12', color: '#2563EB',
    desc: 'Frequency enforcers who bend tempo, sub-bass and synchronization to lock down and reshape any battlefield.',
  },
  {
    squad: 'Shadow Operations', numeral: 'IV', name: 'The Shadow Choir',
    range: 'Hours 13–16', color: '#7C3AED',
    desc: 'Stealth, loops and psychological warfare. They fight in the gaps between beats — unseen, looping, and impossible to predict.',
  },
  {
    squad: 'Disruption Unit', numeral: 'V', name: 'The Disruption Line',
    range: 'Hours 17–20', color: '#F59E0B',
    desc: 'Flow-breakers and power-benders who reverse, compress and overload the enemy\'s rhythm until it collapses in on itself.',
  },
  {
    squad: 'Special Operations', numeral: 'VI', name: 'The Final Protocols',
    range: 'Hours 21–24', color: '#06B6D4',
    desc: 'Architects and failsafes. The last four hours of the day, ending with AfroG — the doomsday slot, the end of a war before silence.',
  },
];

export function getDJ24ByGroup() {
  const roster = getDJ24Roster();
  return dj24Groups.map(group => ({
    ...group,
    members: roster
      .filter(m => m.squad === group.squad)
      .sort((a, b) => a.hour - b.hour),
  }));
}

// ===== GENRE RELIGIONS =====
export const religionIndex = [
  { slug: 'rock', name: 'The Crimson Amplified Order', genre: 'Rock', color: '#DC2626', icon: '🎸' },
  { slug: 'hip-hop', name: 'The Verse Dominion', genre: 'Hip-Hop', color: '#F59E0B', icon: '🎤' },
  { slug: 'jazz', name: 'The Covenant of Improvisation', genre: 'Jazz', color: '#7C3AED', icon: '🎷' },
  { slug: 'classical', name: 'The Sacred Conservatory', genre: 'Classical', color: '#2563EB', icon: '🎼' },
  { slug: 'house', name: 'The Pulse Order', genre: 'House', color: '#0F172A', icon: '🏠' },
  { slug: 'afrobeat', name: 'The Ancestral Rhythm Sect', genre: 'Afrobeat', color: '#D97706', icon: '🥁' },
  { slug: 'electronic', name: 'The Synthetic Ascendancy', genre: 'Electronic', color: '#06B6D4', icon: '🎹' },
];

// ===== WIKI LINK MAPPING =====
export const wikiLinkMap = {
  // World
  'planet ongaku': '/universe',
  'ongaku': '/universe',
  'ongaku prime': '/planet_ongaku',
  'frequency grid': '/wiki/frequency-grid',
  'the frequency grid': '/wiki/frequency-grid',
  'syncopate': '/wiki/syncopate',
  'the syncopate': '/wiki/syncopate',
  'single beat system': '/wiki/single-beat-system',
  'sbs': '/wiki/single-beat-system',
  'the sbs': '/wiki/single-beat-system',
  'genre megacities': '/wiki/genre-megacities',
  'sonic order': '/wiki/sonic-order',
  'the sonic order': '/wiki/sonic-order',
  'races and classes': '/wiki/races-and-classes',
  'power system': '/wiki/power-system',
  'eras of ongaku': '/wiki/eras-of-ongaku',
  'resonant sons': '/factions/dj24',
  // Galaxy & planets
  'the galaxy': '/wiki/the-galaxy',
  'galaxy': '/wiki/the-galaxy',
  'planet joke': '/wiki/the-galaxy',
  'planet scientifica': '/wiki/the-galaxy',
  'scientifica': '/wiki/the-galaxy',
  'planet ecomerica': '/wiki/the-galaxy',
  'planet fabriqua': '/wiki/the-galaxy',
  'planet chronos': '/wiki/the-galaxy',
  'terrascripta': '/wiki/the-galaxy',
  'pixela': '/wiki/the-galaxy',
  'gastronomica': '/wiki/the-galaxy',
  'agrisole': '/wiki/the-galaxy',
  'zenithar': '/wiki/the-galaxy',
  'harmonia': '/wiki/the-galaxy',
  'cura': '/wiki/the-galaxy',
  'infinispace': '/wiki/the-galaxy',
  // Cities
  'intro the dream': '/Planet_Ongaku/cities/intro_the_dream',
  'classic city': '/Planet_Ongaku/cities/classic_city',
  'blue city': '/Planet_Ongaku/cities/blue_city',
  'rock city': '/Planet_Ongaku/cities/rock_city',
  'pop city': '/Planet_Ongaku/cities/pop_city',
  'rose city': '/Planet_Ongaku/cities/rose_city',
  'urban city': '/Planet_Ongaku/cities/urban_city',
  'cloud city': '/Planet_Ongaku/cities/cloud_city',
  'electric city': '/Planet_Ongaku/cities/electric_city',
  'hall of laughter': '/Planet_Ongaku/cities/hall_of_laughter',
  'joke city': '/Planet_Ongaku/cities/joke_city',
  'clown country': '/Planet_Ongaku/cities/clown_country',
  'ongaku cities': '/Planet_Ongaku',
  // Factions
  'dj24': '/factions/dj24',
  'dj 24': '/factions/dj24',
  'sick 52': '/factions/sick52',
  'sick52': '/factions/sick52',
  'the sick 52': '/factions/sick52',
  'the sick deck': '/wiki/the-sick-deck',
  'sick deck': '/sick-deck',
  'deck of 52': '/sick-deck',
  'the deck of 52': '/sick-deck',
  // Game & missions
  'dj24: the sick 52': '/wiki/dj24-the-sick-52',
  'dj24 the sick 52': '/wiki/dj24-the-sick-52',
  'the sick 52 game': '/wiki/dj24-the-sick-52',
  'missions': '/missions',
  'the missions': '/missions',
  'bounty board': '/missions',
  'games': '/games',
  'the games': '/games',
  'webcomic': '/comics',
  'the webcomic': '/comics',
  'comics': '/comics',
  'comic': '/comics',
  'freq radio show': '/wiki/freq-radio-show',
  'freq: the war of sound': '/wiki/freq-radio-show',
  'dj24 roster': '/dj24-roster',
  'the dj24 roster': '/dj24-roster',
  'seasons': '/seasons',
  'story arcs': '/seasons',
  'season 2': '/seasons',
  'timeline': '/timeline',
  'harmony council': '/factions/harmony-council',
  'the harmony council': '/factions/harmony-council',
  'nexagen harmonics': '/factions/nexagen',
  'nexagen': '/factions/nexagen',
  'the komedians': '/factions/komedians',
  'komedians': '/factions/komedians',
  // Characters
  'general 24': '/dj24-roster/general-24',
  'sync': '/dj24-roster/sync',
  'molly': '/dj24-roster/molly',
  'ninja nagazaki': '/dj24-roster/ninja-nagazaki',
  'nova': '/dj24-roster/nova',
  'striker': '/dj24-roster/striker',
  'king j': '/dj24-roster/king-j',
  'maya': '/dj24-roster/maya',
  'red silence': '/sick52/red-silence',
  'bass phantom': '/sick52/bass-phantom',
  // DJ24 Roster
  'masterbass': '/dj24-roster/masterbass',
  'crossfade': '/dj24-roster/crossfade',
  'subz': '/dj24-roster/subz',
  'subg': '/dj24-roster/subz',
  '4serj': '/dj24-roster/4serj',
  'ghostloop': '/dj24-roster/ghostloop',
  'breakline': '/dj24-roster/breakline',
  'afterimage': '/dj24-roster/afterimage',
  'mr genge': '/dj24-roster/mr-genge',
  'liquidb': '/dj24-roster/liquidb',
  'backspin': '/dj24-roster/backspin',
  'sidechain': '/dj24-roster/sidechain',
  'distort': '/dj24-roster/distort',
  'moombah': '/dj24-roster/moombah',
  'd.o.p': '/dj24-roster/dop',
  'wboy': '/dj24-roster/wboy',
  'afrog': '/dj24-roster/afrog',
  // DJ24 guardian aliases (alt-names from earlier roster iterations)
  'phantom': '/dj24-roster/sync',
  'ninja': '/dj24-roster/ninja-nagazaki',
  'king jack': '/dj24-roster/king-j',
  'subg': '/dj24-roster/subz',
  'subzerohz': '/dj24-roster/subz',
  '4seri & coco': '/dj24-roster/4serj',
  'liquid bandit': '/dj24-roster/liquidb',
  'd.o.p beatz': '/dj24-roster/dop',
  'w boy pete': '/dj24-roster/wboy',
  'afrohouse': '/dj24-roster/afrog',
  // Sick 52 Members (key ones)
  'echo requiem': '/sick52/echo-requiem',
  'static prophet': '/sick52/static-prophet',
  'tremor king': '/sick52/tremor-king',
  'hollow aria': '/sick52/hollow-aria',
  'void vocalist': '/sick52/hollow-aria',
  'pulse tyrant': '/sick52/pulse-tyrant',
  'rift cadence': '/sick52/rift-cadence',
  'black vinyl': '/sick52/black-vinyl',
  'crescendo wraith': '/sick52/crescendo-wraith',
  'sonic vicar': '/sick52/sonic-vicar',
  'nocturne prime': '/sick52/nocturne-prime',
  'chorus tyrant': '/sick52/chorus-tyrant',
  'final drop': '/sick52/final-drop',
  // Religions
  'crimson amplified order': '/religions/rock',
  'verse dominion': '/religions/hip-hop',
  'covenant of improvisation': '/religions/jazz',
  'sacred conservatory': '/religions/classical',
  'pulse order': '/religions/house',
  'ancestral rhythm sect': '/religions/afrobeat',
  'synthetic ascendancy': '/religions/electronic',
  // Webcomic — signature moves (all resolve to the moves glossary)
  'signature moves': '/wiki/signature-moves',
  'sound erasure': '/wiki/signature-moves',
  'dead frequency': '/wiki/signature-moves',
  'null step': '/wiki/signature-moves',
  'resonance sync': '/wiki/signature-moves',
  'bass drop': '/wiki/signature-moves',
  'subwave': '/wiki/signature-moves',
  'on-beat transition': '/wiki/signature-moves',
  'bass stance': '/wiki/signature-moves',
  'treble stance': '/wiki/signature-moves',
  'phantom alignment': '/wiki/signature-moves',
  'shockwave pirouette': '/wiki/signature-moves',
  'prima edge': '/wiki/signature-moves',
  'silent frequency': '/wiki/signature-moves',
  'cutoff': '/wiki/signature-moves',
  'the 24-hour schedule': '/wiki/signature-moves',
  '24-hour schedule': '/wiki/signature-moves',
  'dead air': '/wiki/signature-moves',
  'sub-bass pressure': '/wiki/signature-moves',
  'resonance anchor': '/wiki/signature-moves',
  'drop theft': '/wiki/signature-moves',
  'waveform cutlass': '/wiki/signature-moves',
  'puppet chorus': '/wiki/signature-moves',
  'bass quake': '/wiki/signature-moves',
  'counter-drop': '/wiki/signature-moves',
  // Webcomic — locations
  'echo arena': '/wiki/stages-and-arenas',
  'the echo arena': '/wiki/stages-and-arenas',
  'dj24 command spire': '/factions/dj24',
  'the command spire': '/factions/dj24',
  'command spire': '/factions/dj24',
  'dj24 rooftop dojo': '/wiki/stages-and-arenas',
  'rooftop dojo': '/wiki/stages-and-arenas',
  'lower districts': '/planet_ongaku',
  'the lower districts': '/planet_ongaku',
  // Webcomic — chapters & deck cards
  'off the beat': '/comics/ch02-off-the-beat',
  'the twenty-four hours': '/comics/ch03-the-twenty-four-hours',
  'deck of cards': '/comics/ch04-deck-of-cards',
  'silent streets': '/comics/ch05-silent-streets',
  'the sub-bass monk': '/comics/ch06-the-sub-bass-monk',
  'frequency thieves': '/comics/ch07-frequency-thieves',
  'the cursed composer': '/comics/ch08-the-cursed-composer',
  'crescendo': '/comics/ch09-crescendo',
  'first blood, first drop': '/comics/ch10-first-blood-first-drop',
  'ace of spades': '/sick-deck',
  // Sick 52 cards featured in the webcomic
  'dead air revenant': '/sick52/dead-air-revenant',
  'melody hex': '/sick52/melody-hex',
  'nocturne prime': '/sick52/nocturne-prime',
  'sub-bass titan': '/sick52/bass-phantom',
};

export function resolveWikiLink(text) {
  const lower = text.toLowerCase().trim();
  return wikiLinkMap[lower] || null;
}

// ===== CONTENT INDEX =====
export const contentIndex = {
  factions: [
    { slug: 'dj24', name: 'DJ24', tagline: 'Structure, Unity, Control.', color: '#4F46E5' },
    { slug: 'sick52', name: 'The Sick 52', tagline: 'They exiled us. Now we erase them.', color: '#DC2626' },
    { slug: 'harmony-council', name: 'Harmony Council', tagline: 'One sound, one rhythm, one world.', color: '#F59E0B' },
    { slug: 'nexagen', name: 'NexaGen Harmonics', tagline: 'Power belongs to those who control it.', color: '#06B6D4' },
    { slug: 'komedians', name: 'The Komedians', tagline: 'Reality is just a setup.', color: '#EC4899' },
  ],
  characters: [
    { slug: 'general-24', name: 'General 24', faction: 'DJ24', role: 'Supreme Commander', color: 'purple', initial: 'G' },
    { slug: 'sync', name: 'Sync', faction: 'DJ24', role: 'Reality Vanguard', color: 'cyan', initial: 'S' },
    { slug: 'molly', name: 'Molly', faction: 'DJ24', role: 'Shockwave Prima', color: 'pink', initial: 'M' },
    { slug: 'ninja-nagazaki', name: 'Ninja Nagazaki', faction: 'DJ24', role: 'Silent Executioner', color: 'emerald', initial: 'N' },
    { slug: 'red-silence', name: 'Red Silence', faction: 'Sick 52', role: 'Founder', color: 'red', initial: 'R' },
    { slug: 'bass-phantom', name: 'Bass Phantom', faction: 'Sick 52', role: 'Sub-Bass Titan', color: 'amber', initial: 'B' },
  ],
};

// ===== MARKDOWN LOADING =====
const markdownModules = import.meta.glob('/content/**/*.md', { query: '?raw', import: 'default', eager: true });

export function loadMarkdown(path) {
  const key = `/content/${path}`;
  const raw = markdownModules[key];
  if (!raw) return { frontmatter: {}, content: '' };

  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!fmMatch) return { frontmatter: {}, content: raw };

  const fmBlock = fmMatch[1];
  const content = fmMatch[2];
  const frontmatter = {};

  for (const line of fmBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const k = line.slice(0, colonIdx).trim();
    let v = line.slice(colonIdx + 1).trim();
    if (v.startsWith('[') && v.endsWith(']')) {
      v = v.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, ''));
    } else {
      v = v.replace(/^["']|["']$/g, '');
    }
    frontmatter[k] = v;
  }

  return { frontmatter, content };
}
