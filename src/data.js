export const factionsData = {
    dj24: {
        id: 'dj24',
        name: 'DJ24',
        tagline: '"Structure, Unity, Control."',
        desc: "Ongaku's elite private super army founded by the mysterious Billionaire X. A living failsafe consisting of 24 active guardians—one for each hour of the day—and 54 reserves. They operate as a decentralized unit enforcing order and protecting the planet's sonic dominion. Internally, they are split between The Harmonic Order (military discipline), The Mavericks (chaotic rebellion), and The Resonant Sons (freedom of music).",
        roster: [
            { name: 'General 24', desc: 'The strict, tactical commander. Son of Billionaire X.' },
            { name: 'Sync', desc: 'The rebellious newcomer with rare XDF abilities. The Syncopate.' },
            { name: 'Drez', desc: '"The Unchained Beat" — Leader of The Mavericks, chaotic and unpredictable.' },
            { name: 'Veyra', desc: '"Sonic Knight" — Blends classical and electronic sound with precision.' },
            { name: 'Nova', desc: '"Frequency Queen" — Dramatic performer wielding synthwave laser attacks.' },
        ],
    },
    sick52: {
        id: 'sick52',
        name: 'The Sick 52',
        tagline: '"They exiled us. They erased us. Now we erase them."',
        desc: "Once the 52 greatest musicians in the galaxy—the architects of the Frequency Grid itself. Betrayed by the Harmony Council 200 years ago, stripped of their powers, and exiled underground. They mutated, harnessed raw chaotic sound, and became outlaws. Now a mass underground movement fueled by Hip-Hop, they wage an endless war to destroy the Frequency Grid and free all sound.",
        roster: [
            { name: 'Red Silence', desc: 'Leader. Cold, emotionless. Commands sound-erasing powers.' },
            { name: 'Bass Phantom', desc: 'A giant half-machine mutant whose heartbeat is a bass drop.' },
            { name: 'Jinx', desc: 'Wild trickster using reversed sound waves to disorient enemies.' },
            { name: 'Echo Husk', desc: 'A spectral ghost of sound, flickering in and out of existence.' },
            { name: 'Fader', desc: 'The Volume Killer. Can create total silence or deafening noise.' },
        ],
    },
    council: {
        id: 'council',
        name: 'Harmony Council',
        tagline: '"One sound, one rhythm, one world."',
        desc: "The rulers of Ongaku Prime who enforce absolute control over music through the Single Beat System (SBS). They believe only government-approved rhythm can maintain peace. They erase people from history, control all Sound Towers, and consider Sync a dangerous anomaly.",
        roster: [
            { name: 'Maestro Noctis', desc: 'Unseen leader manipulating the world\'s sound balance.' },
            { name: 'Grand Composer Veyra', desc: 'The strict public face of the Council.' },
            { name: 'The Conductor', desc: 'Elite enforcer using orchestral waves to crush opponents.' },
        ],
    },
    nexagen: {
        id: 'nexagen',
        name: 'NexaGen Harmonics',
        tagline: '"Music is power. Power belongs to those who control it."',
        desc: "A cybernetic megacorporation that weaponized music. They harvest DNA, mass-produce AI artists, and secretly scheme to create the ultimate music-based lifeform through Project Harmonia. They cloned the Sick 52, producing one new mutant every week—industrializing war itself.",
        roster: [
            { name: 'Lysander Coda', desc: 'Ruthless CEO who believes organic music is obsolete.' },
            { name: 'Synth-09', desc: 'Unstable AI DJ masterpiece—the "perfect musician."' },
            { name: 'Project Harmonia', desc: 'The forbidden weapon—a fusion of human and machine sound.' },
        ],
    },
    komedians: {
        id: 'komedians',
        name: 'The Komedians',
        tagline: '"Reality is just a setup. We are the punchline."',
        desc: "Interdimensional invaders from Planet Joke. They don't conquer worlds—they rewrite them into jokes. Cities bend into caricatures, people become punchlines, and sound becomes mockery. Their arrival through Extra-Dimensional Frequencies changed the war from planetary to cosmic.",
        roster: [
            { name: 'The Grand Punchline', desc: 'Ruling power plotting the Eternal Laughtrack.' },
            { name: 'Joke Warriors', desc: 'Reality-bending soldiers of farce.' },
        ],
    },
};

export const charactersData = [
    { name: 'General 24', role: 'DJ24 Commander', faction: 'dj24', initial: 'G', color: 'purple', desc: 'Tactical genius. Feared and respected. Believes in absolute efficiency.' },
    { name: 'Sync', role: 'The Syncopate', faction: 'dj24', initial: 'S', color: 'cyan', desc: 'Gifted but conflicted. Hears patterns others can\'t. Questions everything.' },
    { name: 'Drez', role: 'The Unchained Beat', faction: 'dj24', initial: 'D', color: 'emerald', desc: 'Chaotic energy. Speaks in freestyle rap. Doesn\'t follow orders.' },
    { name: 'Red Silence', role: 'Sick 52 Leader', faction: 'sick52', initial: 'R', color: 'red', desc: 'Cold, emotionless. Wields "The Silent Note" that erases sound.' },
    { name: 'Nova', role: 'Frequency Queen', faction: 'dj24', initial: 'N', color: 'pink', desc: 'Flashy and dramatic. Controls laser-sound weapons in the spotlight.' },
    { name: 'Bass Phantom', role: 'Walking Subwoofer', faction: 'sick52', initial: 'B', color: 'amber', desc: 'Half-machine giant whose heartbeat distorts reality itself.' },
];

export const timelineData = [
    { era: 'Pre-Rhythm', title: 'The Dawn of Sound', desc: 'Before control, before structure. Music was wild and pure, shaping reality itself across the cosmos.' },
    { era: 'Low-Res Era', title: 'Golden Age of Music Battles', desc: 'Pure artistic mastery. 52 Masters build the Frequency Grid and the Sound Towers. No guns, no tech—just sound.' },
    { era: 'HD Era', title: 'The Great Betrayal', desc: 'The Harmony Council rises, strips the 52 of their power, and enforces the Single Beat System. The Sick 52 are born.' },
    { era: 'XD Era', title: 'The Interdimensional Wars', desc: 'The Frequency Grid collapses. Komedians invade. DJ24 fractures. The war goes intergalactic.' },
    { era: 'Galactic Era', title: 'The Universe Expands', desc: 'Sound warfare reaches beyond Ongaku. New planets, new alliances, and cosmic-scale conflict over the future of music.' },
];

export const seasonsData = [
    { num: 'Season 1', title: 'The Internal War', desc: 'Sync joins DJ24. The escalating war against the Sick 52 leads to the collapse of the Frequency Grid and exposes Ongaku to the galaxy.' },
    { num: 'Season 2', title: 'The Komedian Invasion', desc: 'The Komedians breach reality. Sync is captured and taken to Planet Joke. Cities are rewritten into nightmares of absurdity.' },
    { num: 'Season 3', title: 'The AI War', desc: 'General 24 allies with AI musicians for a synthetic army. Sync wanders through Jazz and Rocker culture. The Sick 52 grows stronger.' },
    { num: 'Season 4', title: 'The Forgotten Soldiers', desc: 'DJ24 fractures completely. Sync hunts the Sick 52 as an anti-hero. General 24 explores intergalactic politics.' },
];

export const gamesData = [
    { title: 'DJ Battle', era: 'Low-Res Era', genre: 'Tactical Rhythm Combat', desc: 'Dojo building, tournament progression, and 1v1 DJ battles in the Golden Age of Sound.' },
    { title: 'DJ VIP', era: 'Early-HD Era', genre: 'Narrative Social Sim', desc: 'Navigate fame, corruption, and the music industry\'s fall from grace.' },
    { title: 'DJ24', era: 'XD Era', genre: 'Open-World Action RPG', desc: 'Cyberpunk city-building, real-time sound combat, and interdimensional warfare.' },
    { title: 'DJ24: The Sick 52', era: 'Mid-XD Era', genre: 'Squad Tactics', desc: 'City-control warfare. Play as DJ24 or the Sick 52 in this tactical showdown.' },
    { title: 'Planet Ongaku', era: 'Galactic Era', genre: 'Space 4X Strategy', desc: 'Explore the cosmos. Diplomacy, conquest, and music-based civilization management.' },
];
