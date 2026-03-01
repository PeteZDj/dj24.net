// Script to generate characterStats.json with Pokémon-style stats
const fs = require('fs');
const path = require('path');

// Read existing stats to preserve moves
const existing = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'characterStats.json'), 'utf8'));

// New stat definitions: [hp, atk, def, spAtk, spDef, spd, type[], level]
const newStats = {
    // ===== DJ24 ACTIVE ROSTER =====
    'general-24': { s: [106, 80, 95, 130, 90, 85], t: ['Dragon', 'Steel'], lv: 95 },
    'sync': { s: [75, 85, 70, 95, 80, 115], t: ['Psychic', 'Normal'], lv: 89 },
    'molly': { s: [65, 110, 55, 95, 60, 125], t: ['Electric', 'Fighting'], lv: 87 },
    'ninja-nagazaki': { s: [55, 130, 50, 60, 55, 150], t: ['Dark', 'Ghost'], lv: 85 },
    'nova': { s: [78, 65, 70, 125, 85, 95], t: ['Electric', 'Fairy'], lv: 79 },
    'striker': { s: [120, 130, 95, 40, 60, 45], t: ['Fighting', 'Ground'], lv: 78 },
    'king-j': { s: [83, 75, 80, 90, 95, 77], t: ['Normal', 'Psychic'], lv: 77 },
    'maya': { s: [95, 55, 80, 100, 110, 55], t: ['Fairy', 'Psychic'], lv: 76 },
    'masterbass': { s: [80, 60, 75, 140, 95, 30], t: ['Ground', 'Psychic'], lv: 75 },
    'crossfade': { s: [72, 65, 75, 85, 90, 80], t: ['Normal', 'Ghost'], lv: 74 },
    'subz': { s: [80, 95, 85, 60, 70, 75], t: ['Ice', 'Dark'], lv: 73 },
    '4serj': { s: [77, 80, 85, 95, 80, 90], t: ['Steel', 'Electric'], lv: 72 },
    'ghostloop': { s: [65, 50, 60, 110, 100, 75], t: ['Ghost', 'Psychic'], lv: 71 },
    'breakline': { s: [76, 100, 80, 55, 65, 80], t: ['Fighting', 'Normal'], lv: 70 },
    'afterimage': { s: [55, 75, 45, 70, 55, 150], t: ['Ghost', 'Normal'], lv: 69 },
    'mr-genge': { s: [75, 95, 65, 80, 60, 85], t: ['Fighting', 'Normal'], lv: 68 },
    'liquidb': { s: [85, 60, 70, 105, 75, 80], t: ['Water', 'Fighting'], lv: 67 },
    'backspin': { s: [70, 80, 90, 65, 85, 75], t: ['Normal', 'Ghost'], lv: 66 },
    'sidechain': { s: [75, 55, 100, 80, 95, 50], t: ['Steel', 'Psychic'], lv: 65 },
    'distort': { s: [73, 95, 55, 90, 50, 85], t: ['Electric', 'Fire'], lv: 64 },
    'moombah': { s: [80, 105, 80, 50, 55, 70], t: ['Fighting'], lv: 63 },
    'dop': { s: [70, 55, 65, 110, 85, 65], t: ['Psychic'], lv: 62 },
    'wboy': { s: [73, 70, 60, 85, 75, 80], t: ['Normal', 'Electric'], lv: 61 },
    'afrog': { s: [91, 70, 75, 95, 80, 85], t: ['Dragon', 'Normal'], lv: 60 },

    // ===== ELITE COMMAND CIRCLE =====
    'general-meter': { s: [85, 60, 75, 120, 110, 80], t: ['Psychic'], lv: 80 },
    'admiral-flux': { s: [80, 65, 70, 115, 95, 105], t: ['Electric'], lv: 84 },
    'major-rift': { s: [90, 80, 85, 100, 90, 75], t: ['Psychic', 'Dark'], lv: 81 },
    'commander-vale': { s: [75, 50, 80, 110, 120, 60], t: ['Psychic', 'Fairy'], lv: 81 },
    'captain-onyx': { s: [85, 100, 95, 55, 70, 80], t: ['Dark', 'Rock'], lv: 83 },
    'dr-tempo': { s: [80, 55, 70, 105, 85, 95], t: ['Normal', 'Psychic'], lv: 81 },

    // ===== AFFILIATED OPERATIVES =====
    'echo-blaze': { s: [70, 85, 65, 95, 60, 80], t: ['Fire', 'Ghost'], lv: 50 },
    'vanta-lux': { s: [65, 45, 60, 125, 80, 75], t: ['Dark', 'Fairy'], lv: 50 },
    'torque-titan': { s: [110, 130, 100, 35, 55, 40], t: ['Fighting', 'Steel'], lv: 50 },
    'cipher-rae': { s: [65, 55, 60, 95, 80, 105], t: ['Dark', 'Electric'], lv: 50 },
    'nova-kid': { s: [60, 75, 50, 100, 55, 90], t: ['Fire', 'Normal'], lv: 50 },
    'seraph-kairo': { s: [55, 45, 65, 90, 90, 120], t: ['Psychic', 'Fighting'], lv: 50 },
    'lyric-storm': { s: [55, 70, 50, 95, 60, 130], t: ['Normal', 'Flying'], lv: 50 },

    // ===== MYTHIC LAYER (The Actual 24) =====
    'prime-sync': { s: [100, 90, 95, 110, 100, 105], t: ['Dragon', 'Psychic'], lv: 96 },
    'zero-molly': { s: [80, 120, 75, 105, 70, 130], t: ['Electric', 'Ice'], lv: 93 },
    'ronin-nagazaki': { s: [70, 140, 60, 65, 55, 155], t: ['Dark', 'Fighting'], lv: 94 },
    'emperor-j': { s: [95, 85, 100, 95, 100, 80], t: ['Dragon', 'Dark'], lv: 94 },
    'the-broker': { s: [100, 60, 90, 105, 115, 70], t: ['Normal', 'Psychic'], lv: 92 },
    'the-spectator': { s: [90, 55, 85, 100, 110, 90], t: ['Psychic', 'Ghost'], lv: 91 },

    // ===== NEXAGEN =====
    'lysander-coda': { s: [70, 60, 65, 100, 80, 75], t: ['Steel', 'Dark'], lv: 50 },
    'synth-09': { s: [65, 55, 60, 120, 70, 95], t: ['Steel', 'Electric'], lv: 50 },
    'unit-omega': { s: [130, 85, 110, 50, 75, 35], t: ['Steel', 'Fighting'], lv: 50 },

    // ===== SICK 52 — TIER I: FOUNDING DISSONANTS =====
    'red-silence': { s: [95, 60, 90, 154, 130, 81], t: ['Dark', 'Psychic'], lv: 98 },
    'bass-phantom': { s: [130, 120, 110, 85, 80, 45], t: ['Ground', 'Steel'], lv: 95 },
    'echo-requiem': { s: [76, 65, 70, 135, 105, 109], t: ['Ghost', 'Psychic'], lv: 93 },
    'static-prophet': { s: [81, 55, 75, 130, 120, 89], t: ['Electric', 'Psychic'], lv: 92 },
    'tremor-king': { s: [105, 140, 95, 55, 70, 75], t: ['Ground', 'Fighting'], lv: 91 },
    'void-vocalist': { s: [73, 45, 65, 145, 125, 87], t: ['Ghost', 'Dark'], lv: 90 },
    'pulse-tyrant': { s: [90, 110, 80, 100, 85, 85], t: ['Dark', 'Fighting'], lv: 89 },
    'rift-cadence': { s: [65, 80, 60, 110, 90, 145], t: ['Ghost', 'Normal'], lv: 88 },
    'black-vinyl': { s: [80, 60, 75, 125, 110, 90], t: ['Dark', 'Psychic'], lv: 87 },
    'crescendo-wraith': { s: [95, 100, 85, 100, 85, 95], t: ['Ghost', 'Fighting'], lv: 90 },
    'chorus-tyrant': { s: [100, 115, 90, 95, 80, 75], t: ['Dark', 'Steel'], lv: 89 },
    'final-drop': { s: [100, 130, 90, 150, 100, 110], t: ['Dragon', 'Dark'], lv: 99 },

    // ===== SICK 52 — TIER II: WAR CONDUCTORS =====
    'harmonic-abomination': { s: [110, 95, 75, 105, 80, 45], t: ['Poison', 'Ghost'], lv: 78 },
    'frequency-parasite': { s: [73, 65, 60, 120, 105, 77], t: ['Bug', 'Dark'], lv: 76 },
    'dead-air-revenant': { s: [85, 70, 85, 100, 95, 55], t: ['Ghost', 'Electric'], lv: 75 },
    'lullaby-widow': { s: [60, 45, 55, 140, 100, 105], t: ['Ice', 'Ghost'], lv: 77 },
    'pulse-devourer': { s: [95, 115, 70, 80, 65, 75], t: ['Dark', 'Fighting'], lv: 76 },
    'rage-cantata': { s: [80, 130, 65, 100, 55, 80], t: ['Fire', 'Fighting'], lv: 78 },
    'silence-bishop': { s: [75, 40, 90, 115, 130, 45], t: ['Dark', 'Psychic'], lv: 74 },
    'sonic-vicar': { s: [90, 55, 105, 120, 85, 45], t: ['Steel', 'Psychic'], lv: 75 },
    'static-hydra': { s: [85, 80, 70, 130, 80, 75], t: ['Electric', 'Dragon'], lv: 79 },
    'thunder-dropper': { s: [130, 120, 115, 40, 70, 25], t: ['Ground', 'Steel'], lv: 77 },
    'tidal-lament': { s: [80, 50, 70, 135, 100, 70], t: ['Water', 'Ghost'], lv: 76 },
    'toxic-vibrato': { s: [75, 65, 80, 125, 90, 65], t: ['Poison', 'Steel'], lv: 75 },

    // ===== SICK 52 — TIER III: ELEMENTAL ETUDES =====
    'frost-echo': { s: [85, 90, 100, 95, 80, 35], t: ['Ice'], lv: 72 },
    'storm-sustain': { s: [65, 70, 55, 130, 60, 110], t: ['Electric'], lv: 71 },
    'sand-shuffle': { s: [80, 75, 90, 85, 85, 60], t: ['Ground', 'Ghost'], lv: 70 },
    'ember-pulse': { s: [70, 95, 85, 110, 65, 55], t: ['Fire', 'Steel'], lv: 71 },
    'mist-cadence': { s: [65, 40, 55, 120, 110, 80], t: ['Poison', 'Psychic'], lv: 69 },
    'stone-resonance': { s: [120, 110, 130, 40, 55, 35], t: ['Rock', 'Ground'], lv: 72 },
    'acid-reverie': { s: [75, 60, 65, 120, 95, 50], t: ['Poison'], lv: 68 },
    'magma-mezzo': { s: [90, 100, 90, 95, 60, 45], t: ['Fire', 'Rock'], lv: 70 },
    'aero-aria': { s: [55, 50, 45, 115, 85, 120], t: ['Flying', 'Ghost'], lv: 69 },
    'blight-beat': { s: [90, 65, 75, 110, 80, 40], t: ['Poison', 'Grass'], lv: 68 },
    'crystal-coda': { s: [70, 55, 95, 125, 90, 40], t: ['Rock', 'Fairy'], lv: 70 },
    'gravity-groove': { s: [80, 70, 80, 130, 90, 40], t: ['Psychic', 'Dark'], lv: 72 },

    // ===== SICK 52 — TIER IV: PSYCHOLOGICAL CHOIR =====
    'panic-symphony': { s: [65, 40, 50, 105, 90, 55], t: ['Dark', 'Psychic'], lv: 60 },
    'memory-static': { s: [60, 35, 55, 100, 90, 55], t: ['Psychic', 'Electric'], lv: 58 },
    'mirage-anthem': { s: [65, 40, 50, 110, 80, 65], t: ['Psychic', 'Fairy'], lv: 59 },
    'grief-sonata': { s: [75, 35, 60, 95, 100, 30], t: ['Ghost', 'Psychic'], lv: 57 },
    'whisper-choir': { s: [60, 30, 55, 105, 90, 60], t: ['Psychic', 'Ghost'], lv: 58 },

    // ===== SICK 52 — TIER V: MUTATED PROTOTYPES =====
    'split-tempo': { s: [70, 90, 55, 85, 60, 90], t: ['Psychic', 'Fighting'], lv: 55 },
    'reverb-titan': { s: [140, 85, 70, 90, 65, 30], t: ['Normal', 'Rock'], lv: 56 },
};

// Build full JSON preserving existing moves
const output = {};
for (const [slug, config] of Object.entries(newStats)) {
    const [hp, atk, def, spAtk, spDef, spd] = config.s;
    const total = hp + atk + def + spAtk + spDef + spd;
    const existingEntry = existing[slug] || {};
    output[slug] = {
        name: existingEntry.name || slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        level: config.lv,
        type: config.t,
        hp, atk, def, spAtk, spDef, spd, total,
        moves: existingEntry.moves || []
    };
}

const outPath = path.join(__dirname, '..', 'src', 'data', 'characterStats.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
console.log(`Written ${Object.keys(output).length} characters to characterStats.json`);

// Print summary table
console.log('\n--- STAT SUMMARY ---');
console.log('Character'.padEnd(25) + 'Total'.padStart(6) + '  Type');
for (const [slug, entry] of Object.entries(output)) {
    console.log(slug.padEnd(25) + String(entry.total).padStart(6) + '  ' + entry.type.join('/'));
}
