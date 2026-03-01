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
  "void-vocalist": {
    rank: 6, tier: "founders", title: "Void Vocalist", role: "The Hollow Voice",
    desc: "Once the 'Voice of Heaven,' her singing could heal physical wounds. During the Purge, the Council used a sonic vacuum to 'extract' her gift. They left her a hollow shell. Now, her voice doesn't heal; it opens rifts to the XD-Dimension, draining the life force of anything that hears her mournful notes.",
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
  "chorus-tyrant": {
    rank: 11, tier: "founders", title: "Supreme War Conductor", role: "Field Marshal",
    desc: "A former choir director who believed in perfect unity. The Council used his 'Unison Protocol' to mind-control the early DJ24 units. When he saw what they had done to his art, he revolted. He now leads a choir of mutated shadows, their voices overlapping into a singular, mind-shattering scream.",
    prompt: "Full body anime main arc villain concept art. Extremely tall imposing male with mixed Japanese and African heritage. Dark skin with visible mechanical augmentation along shoulders and spine. Long straight black hair tied back. Long matte black cloak with deep emerald interior lining. Large fractured waveform crest spanning entire back. Left arm fully cybernetic with emerald vein-like engravings. Holds massive two-handed greatblade shaped like shattered soundwave arc. Upright dominant stance. Cloth-dominant. Bleach captain-level presence. Cinematic lighting. Clean neutral background."
  },
  "final-drop": {
    rank: 12, tier: "founders", title: "The Demon of the Abyss", role: "The Final Hour",
    desc: "",
    prompt: ""
  },
  "harmonic-abomination": {
    rank: 13, tier: "warConductors", title: "Flesh Architect", role: "Organic Acoustic Monster",
    desc: "",
    prompt: ""
  },
  "frequency-parasite": {
    rank: 14, tier: "warConductors", title: "The Leech", role: "Frequency Predator",
    desc: "",
    prompt: ""
  },
  "dead-air-revenant": {
    rank: 15, tier: "warConductors", title: "The Reanimated", role: "Radio Interference Wraith",
    desc: "",
    prompt: ""
  },
  "lullaby-widow": {
    rank: 16, tier: "warConductors", title: "The Glass Scream", role: "Shattered Soprano",
    desc: "",
    prompt: ""
  },
  "pulse-devourer": {
    rank: 17, tier: "warConductors", title: "The Heart-Eater", role: "Pulse Predator",
    desc: "",
    prompt: ""
  },
  "rage-cantata": {
    rank: 18, tier: "warConductors", title: "The Combustion", role: "Pressurized Rage",
    desc: "",
    prompt: ""
  },
  "silence-bishop": {
    rank: 19, tier: "warConductors", title: "The Zealot", role: "Anti-Sound Priest",
    desc: "",
    prompt: ""
  },
  "sonic-vicar": {
    rank: 20, tier: "warConductors", title: "The Agony-Pipe", role: "Organist of Misery",
    desc: "A former priest of the Sacred Conservatory who went mad after seeing the Council's secret torture rooms. He decided that if the world was built on pain, the music should reflect it. He replaced his ribs with hollow brass pipes and his lungs with industrial bellows. He is a walking church organ of misery. He doesn't fight for territory; he fights to 'convert' others by forcing his agonizing 'Sermons of the Shattered Note' into their ears via high-pressure acoustic tubes.",
    prompt: "Full body anime character. Ribs replaced by brass pipes. Cinematic industrial organ."
  },
  "static-hydra": {
    rank: 21, tier: "warConductors", title: "The Multi-Glitch", role: "Tri-Temporal Horror",
    desc: "",
    prompt: ""
  },
  "thunder-dropper": {
    rank: 22, tier: "warConductors", title: "The Gravity-Crush", role: "Sub-Atomic Drummer",
    desc: "A giant of a man who was used by the Council to test 'Atmospheric Bass-Bombs.' The tests permanently altered his density. He weighs six tons, but sound waves keep him upright. He uses a pair of massive, gravity-well gauntlets to 'drop the floor.' When he strikes the ground, he doesn't just make a noise—he creates a localized gravity collapse that pulls enemies into the earth, crushing them into a compact, silent mass of meat and metal.",
    prompt: "Full body anime villain. Massive build, gravity-well gauntlets. Cinematic heavy enforcer."
  },
  "tidal-lament": {
    rank: 23, tier: "warConductors", title: "The Drowner", role: "Oscillating Fluid Monster",
    desc: "A 'Water-Acoustician' from the Intro-Dream era. She was exiled to the desert wastes of Ongaku, where she nearly died of thirst. She survived by learning to condense the moisture in the air using high-frequency vibration. She now travels inside a floating sphere of 'Sonic Water'—liquid that is kept in a state of permanent, violent oscillation. She 'drowns' her victims by forcing this vibrating water into their lungs, where the frequency tears them apart from the inside out.",
    prompt: "Full body anime antagonist. Floating inside oscillating water sphere. Cinematic water horror."
  },
  "toxic-vibrato": {
    rank: 32, tier: "founders", title: "Venomous Corruption", role: "Poison Mutation",
    desc: "",
    prompt: ""
  },
  "storm-sustain": {
    rank: 33, tier: "founders", title: "Hurricane Incarnate", role: "Wind Mutation",
    desc: "",
    prompt: ""
  },
  "ember-pulse": {
    rank: 34, tier: "founders", title: "Volcanic Core Mutation", role: "Magma Mutation",
    desc: "",
    prompt: ""
  },
  "mist-cadence": {
    rank: 35, tier: "founders", title: "Phantom Vapor Form", role: "Illusion Mutation",
    desc: "",
    prompt: ""
  },
  "void-tremolo": {
    rank: 36, tier: "founders", title: "Abyssal Mutation", role: "Dark Element",
    desc: "",
    prompt: ""
  },
  "lullaby-widow": {
    rank: 37, tier: "founders", title: "Induced Sleep Paralysis", role: "The Sandwoman",
    desc: "",
    prompt: ""
  },
  "panic-symphony": {
    rank: 38, tier: "founders", title: "Fear Frequency Conductor", role: "The Dread",
    desc: "",
    prompt: ""
  },
  "memory-static": {
    rank: 39, tier: "founders", title: "Recollection Corruptor", role: "The Glitch",
    desc: "",
    prompt: ""
  },
  "mirage-anthem": {
    rank: 40, tier: "founders", title: "Illusion Projection", role: "The Phantom",
    desc: "",
    prompt: ""
  },
  "grief-sonata": {
    rank: 41, tier: "founders", title: "Emotional Drain", role: "The Mourner",
    desc: "",
    prompt: ""
  },
  "rage-cantata": {
    rank: 42, tier: "founders", title: "Berserk Inducer", role: "The Fury",
    desc: "",
    prompt: ""
  },
  "whisper-choir": {
    rank: 43, tier: "founders", title: "Mass Suggestion Architect", role: "The Puppeteer",
    desc: "",
    prompt: ""
  },
  "silence-bishop": {
    rank: 44, tier: "founders", title: "Area-Wide Sound Nullification", role: "The Void",
    desc: "",
    prompt: ""
  },
  "split-tempo": {
    rank: 45, tier: "founders", title: "Dual-Body Combatant", role: "The Divided",
    desc: "",
    prompt: ""
  },
  "frequency-parasite": {
    rank: 46, tier: "founders", title: "Feeds on Music Energy", role: "The Leech",
    desc: "",
    prompt: ""
  },
  "harmonic-abomination": {
    rank: 47, tier: "founders", title: "Multi-Genre Hybrid", role: "The Fusion",
    desc: "",
    prompt: ""
  },
  "pulse-devourer": {
    rank: 48, tier: "founders", title: "Absorbs DJ Attacks", role: "The Counter",
    desc: "",
    prompt: ""
  },
  "dead-air-revenant": {
    rank: 49, tier: "founders", title: "Erases Sound Zones", role: "The Eraser",
    desc: "",
    prompt: ""
  },
  "reverb-titan": {
    rank: 50, tier: "founders", title: "Amplifies All Damage", role: "The Echoing Mountain",
    desc: "",
    prompt: ""
  },
  "static-hydra": {
    rank: 51, tier: "founders", title: "Multi-Headed Echo Form", role: "The Hydra",
    desc: "",
    prompt: ""
  },
  "final-drop": {
    rank: 52, tier: "founders", title: "The Ultimate Mutation", role: "The End",
    desc: "",
    prompt: ""
  },
};

export const previousSick52MemberData = {
  "red-silence": "Once the High Conductor of Ongaku, he designed the Frequency Grid to protect the planet. When the Harmony Council realized his 'Perfect Symphony' could also be used to depose them, they severed his vocal cords with a vibration-blade. In the silence of exile, he learned to weaponize the 'Absence of Sound.' He no longer seeks to play music; he seeks to delete it.",
  "bass-phantom": "Formerly the Master of Foundations, responsible for the literal structural integrity of Ongaku's cities. After the betrayal, his body was crushed during the collapse of the First Conservatory. He survived by fusing his nervous system with experimental sub-bass amplifiers. He is now a walking earthquake, holding a grudge as heavy as his 20Hz output.",
  "echo-requiem": "A prodigy of the Dual-Tone Era. He believed music was a conversation, not a command. The Council called this heresy. They trapped him in a room of infinite mirrors for a decade. He didn't go mad; he just learned to talk to his reflections so well that they stepped out of the glass to fight for him.",
  "static-prophet": "The first to predict the 'Collapse.' He claimed the Frequency Grid was a cage, not a shield. The Council labeled him 'Distorted' and threw him into the white-noise wastes. He survived by eating the radio interference of the stars. Now, he sees the future in the static between stations.",
  "tremor-king": "A legendary percussionist who could make the planet's tectonic plates dance. He was the Council's favorite enforcer until he refused to crush a rebel jazz club. They broke his hands; he responded by learning to 'play' the earth with his footsteps. Every step he takes is a rhythmic execution.",
  "void-vocalist": "Once the 'Voice of Heaven,' her singing could heal physical wounds. During the Purge, the Council used a sonic vacuum to 'extract' her gift. They left her a hollow shell. Now, her voice doesn't heal; it opens rifts to the XD-Dimension, draining the life force of anything that hears her mournful notes.",
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
  'red-silence': 'Sick52- Red Silence.png',
  'bass-phantom': 'Sick52- Bass Phantom.png',
  'echo-requiem': 'Sick52- Echo Requiem.png',
  'static-prophet': 'Sick52 - Static Prophet.png',
  'tremor-king': 'Sick52 - Tremor King.png',
  'void-vocalist': 'Sick52 - Void Vocalist.png',
  'pulse-tyrant': 'Sick52 Pulse Tyrant.png',
  'rift-cadence': 'Sick52 - Rift Cadence.png',
  'black-vinyl': 'Sick52 - Black Vinyl.png',
  'crescendo-wraith': 'Sick52 - Crecendo Wraith.png',
  'chorus-tyrant': 'Sick52 - Chorus Tyrant.png',
  'final-drop': 'Sick52 - Final Drop .png',
  'harmonic-abomination': 'Sick52 - Harmonic Abomination .png',
  'frequency-parasite': 'Sick52 - Frequency Parasite.png',
  'dead-air-revenant': 'Sick52 - Dead Air Revenant .png',
  'lullaby-widow': 'Sick52 - Lullaby Widow .png',
  'pulse-devourer': 'Sick52 - Pulse Devourer.png',
  'rage-cantata': 'Sick52 - Rage Cantata .png',
  'silence-bishop': 'Sick52 - Silence Bishop.png',
  'sonic-vicar': 'Sick52 - Sonic Vicar.png',
  'static-hydra': 'Sick52 - Static Hydra.png',
  'thunder-dropper': 'Sick52 - Thunder Dropper.png',
  'tidal-lament': 'Sick52 - Tidal Lament.png',
  'toxic-vibrato': 'Sick52 - Toxic Vibrato.png',
  'storm-sustain': 'Sick52 - Storm Sustain.png',
  'ember-pulse': 'Sick52 -Ember Pulse.png',
  'mist-cadence': 'Sick52 - Mist Cadence.png',
  'void-tremolo': 'Sick52 - Void Tremolo.png',
  'panic-symphony': 'Sick52 -Panic Symphony.png',
  'memory-static': 'Sick52 -Memory Static.png',
  'mirage-anthem': 'Sick52 - Mirage Anthem.png',
  'grief-sonata': 'Sick52 -Grief Sonata .png',
  'whisper-choir': 'Sick52 - Whisper Choir.png',
  'split-tempo': 'Sick52 - Split Tempo.png',
  'reverb-titan': 'Sick52 - Reverb Titan.png',
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

// ===== DJ24 ACTIVE ROSTER =====
export const dj24Roster = [
  {
    hour: 1, slug: 'general-24', name: 'General 24', role: 'Supreme Commander of Time', color: '#FFD700', squad: 'Prime Command Unit',
    desc: 'Strategic Overwatch / Final Authority. Tactical, strict commander. Values precise order. He doesn’t fight — he schedules reality.',
    prompt: 'Full body anime hero concept art. Athletic dark-skinned male with calm commanding posture. Sharp intelligent facial features, confident composed expression. Structured long white split-tail military coat with bold gold trim and matching gold shoulder stripe, tailored matte black tactical under-layer in deep green. Massive translucent golden circular time-disc divided into 24 glowing segments slowly rotating behind him.'
  },
  {
    hour: 2, slug: 'sync', name: 'Sync (Phantom)', role: 'Reality Alignment Vanguard', color: '#06B6D4', squad: 'Prime Command Unit',
    desc: 'Rookie Protagonist / XDF anomaly. Rebellious and questions the system. Power he doesn’t understand — he doesn’t glitch, he aligns.',
    prompt: 'Full body anime character concept art. Athletic white male with slightly messy short hair, sharp cheekbones, intense but visibly confused expression. Structured long white split-tail coat with gold trim, matte black combat under-layer with deep red internal lining. Body partially duplicated with multiple faint timeline silhouettes misaligned around him. Electric-blue synchronization lines forming and snapping unpredictably.'
  },
  {
    hour: 3, slug: 'molly', name: 'Molly', role: 'Shockwave Prima', color: '#EC4899', squad: 'Prime Command Unit',
    desc: 'High-Energy Shock Operative / Emotional Catalyst. The emotional core of the team. Precision elegance weaponized — ballet on the battlefield.',
    prompt: 'Full body anime character concept art. Slender athletic female with graceful ballerina build, very light platinum-blonde hair, piercing blue eyes. From each forearm extends a long, ultra-thin straight-edged silver-white blade. Structured long white split-tail coat with bold gold trim, tailored matte black fitted combat under-layer in royal blue. Standing en pointe on one boot mid-pirouette.'
  },
  {
    hour: 4, slug: 'ninja-nagazaki', name: 'Ninja Nagazaki', role: 'Silent Frequency Executioner', color: '#0F172A', squad: 'Prime Command Unit',
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
    hour: 7, slug: 'king-j', name: 'King J', role: 'Royal Rhythm Commander', color: '#7C3AED', squad: 'Assault Unit',
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
    hour: 11, slug: 'subz', name: 'SubZ', role: 'Anti-Bass Raider', color: '#2563EB', squad: 'Control Unit',
    desc: 'Anti-Bass Specialist / Frequency Eraser. Russian Frequency Pirate. Battle-scarred rogue who steals your drop instead of erasing it.',
    prompt: 'Full body anime character concept art. Lean Russian male with pale skin, dark reinforced eyepatch on right side, mechanical prosthetic left foot. Structured long white split-tail coat with deep blue trim, fitted matte black tactical combat under-layer. Curved condensed waveform cutlass. Navy sash with glowing sub-frequency orb capsules.'
  },
  {
    hour: 12, slug: '4serj', name: '4Serj', role: 'Quad-Channel Sync Architect', color: '#4F46E5', squad: 'Control Unit',
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
    hour: 17, slug: 'liquidb', name: 'LiquidB', role: 'Flow Manipulator', color: '#2563EB', squad: 'Disruption Unit',
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
    hour: 22, slug: 'dop', name: 'd.O.P', role: 'Battlefield Sound Architect', color: '#4F46E5', squad: 'Special Operations',
    desc: 'Battlefield Sound Architect. Strategic control through waveform math. He designs the battlefield.',
    prompt: 'Full body anime character concept art. Calm analytical male with sharp calculating eyes. Structured long white split-tail coat with electric cyan trim, fitted matte black tactical under-layer. Hands manipulating translucent emerald holographic waveform grids suspended in air. Tactical geometric sound-lines dividing space.'
  },
  {
    hour: 23, slug: 'wboy', name: 'WBoy', role: 'Founder Frequency — The Origin Signal', color: '#06B6D4', squad: 'Special Operations',
    desc: 'Founder Frequency. Young male prodigy (16-18) — rooted, immovable foundation. Symbolic but restrained.',
    prompt: 'Full body anime character concept art. Young male prodigy, lean athletic build, focused intelligent eyes. Structured long white split-tail coat with electric cyan trim, fitted matte black tactical under-layer. Silver "W" clasp at collar. Compact double-edged frequency baton on back. Subtle silver frequency rings expanding slowly.'
  },
  {
    hour: 24, slug: 'afrog', name: 'AfroG', role: 'Final Drop Protocol — Planetary Failsafe', color: '#10B981', squad: 'Special Operations',
    desc: 'The Final Hour / doomsday slot. Absolute Authority. The end of a war before silence.',
    prompt: 'Full body anime character concept art. Tall imposing male, calm god-level composure. Structured long white split-tail coat with electric cyan trim over reinforced darker inner core. Standing slightly elevated above ground. Massive spiral waveform of electric blue energy behind him like a celestial sigil.'
  },
];

// ===== DJ24 ROSTER WITH IMAGES =====
export function getDJ24Roster() {
  return dj24Roster.map(member => {
    const filename = dj24Images[member.slug];
    return {
      ...member,
      image: filename ? `/images/dj24/${encodeURIComponent(filename)}` : null,
    };
  });
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
  'resonant sons': '/factions/dj24',
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
  // Sick 52 Members (key ones)
  'echo requiem': '/sick52/echo-requiem',
  'static prophet': '/sick52/static-prophet',
  'tremor king': '/sick52/tremor-king',
  'void vocalist': '/sick52/void-vocalist',
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
