// Add Harmony Council members to characterStats.json
const fs = require('fs');
const path = require('path');

const statsPath = path.join(__dirname, '..', 'src', 'data', 'characterStats.json');
const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));

// Council members are VERY WEAK — bureaucrats, not fighters
// Totals: 195-320 range (Caterpie to Rattata tier)
const councilMembers = {
    'maestro-noctis': {
        name: 'Maestro Noctis',
        level: 15,
        type: ['Normal', 'Psychic'],
        hp: 45, atk: 10, def: 35, spAtk: 80, spDef: 70, spd: 15,
        total: 255,
        moves: [
            { name: 'Golden Hum', desc: 'A low resonance pulse that transmits commands directly into minds.' },
            { name: 'Grid Whisper', desc: 'Taps into the Frequency Grid to monitor a distant location.' },
            { name: 'Authoritarian Decree', desc: 'Issues an unquestionable command — but only to those sworn to the Council.' },
            { name: 'Ancient Resonance', desc: 'A feeble defensive hum that slightly reduces incoming damage.' },
            { name: 'Final Composition', desc: 'ULTIMATE: Attempts to freeze all sound in range. Effective only against civilians.' }
        ]
    },
    'grand-composer-veyra-hc': {
        name: 'Grand Composer Veyra',
        level: 18,
        type: ['Normal'],
        hp: 50, atk: 15, def: 40, spAtk: 65, spDef: 55, spd: 25,
        total: 250,
        moves: [
            { name: 'Iron Baton', desc: 'A weak strike with her conductor\'s baton. More symbolic than damaging.' },
            { name: 'Public Address', desc: 'A speech that lowers enemy morale... slightly.' },
            { name: 'Composure', desc: 'Maintains perfect poise under pressure, reducing status effect duration.' },
            { name: 'Propaganda Veil', desc: 'Creates an illusion of authority that may cause hesitation.' },
            { name: 'Execution Order', desc: 'ULTIMATE: Summons Harmonic Guards to fight on her behalf. She does not fight directly.' }
        ]
    },
    'the-conductor-hc': {
        name: 'The Conductor',
        level: 22,
        type: ['Normal', 'Steel'],
        hp: 65, atk: 55, def: 60, spAtk: 40, spDef: 45, spd: 35,
        total: 300,
        moves: [
            { name: 'Orchestral Wave', desc: 'A weak shockwave from his ornamental staff. Mostly ceremonial.' },
            { name: 'Formation Command', desc: 'Directs nearby guards into defensive formation.' },
            { name: 'Golden Guard', desc: 'Raises his staff to create a brief protective barrier.' },
            { name: 'Enforcement Strike', desc: 'A disciplined strike aimed at civilians. Ineffective against trained fighters.' },
            { name: 'Harmonic Suppression', desc: 'ULTIMATE: Activates the local Grid node to dampen all sound. Only works near Grid infrastructure.' }
        ]
    },
    'arbiter-shen': {
        name: 'Arbiter Shen',
        level: 12,
        type: ['Normal', 'Psychic'],
        hp: 40, atk: 5, def: 30, spAtk: 55, spDef: 60, spd: 10,
        total: 200,
        moves: [
            { name: 'Legal Binding', desc: 'Wraps the target in bureaucratic red tape. Slows movement by 10%.' },
            { name: 'Gavel Strike', desc: 'A feeble tap with his tuning-fork gavel. Almost zero damage.' },
            { name: 'Objection', desc: 'Interrupts an enemy\'s attack with a shout. May cause flinch.' },
            { name: 'Sound Law Citation', desc: 'Recites regulations so boring they cause minor psychic damage.' },
            { name: 'Summary Judgment', desc: 'ULTIMATE: Declares the opponent guilty. Has no actual combat effect.' }
        ]
    },
    'warden-forte': {
        name: 'Warden Forte',
        level: 16,
        type: ['Normal', 'Dark'],
        hp: 70, atk: 45, def: 50, spAtk: 15, spDef: 30, spd: 20,
        total: 230,
        moves: [
            { name: 'Shock Baton', desc: 'A weak electrical prod designed for unarmed prisoners.' },
            { name: 'Lockdown', desc: 'Seals exits in an enclosed space. Useless in open combat.' },
            { name: 'Silence Chamber', desc: 'Attempts to create a small zone of silence. Easily broken.' },
            { name: 'Intimidation', desc: 'Glares menacingly. May lower attack of cowardly opponents.' },
            { name: 'Solitary Confinement', desc: 'ULTIMATE: Traps a weakened target in a temporary sound-null bubble. Breaks immediately against strong foes.' }
        ]
    },
    'minister-lyra': {
        name: 'Minister Lyra',
        level: 14,
        type: ['Fairy', 'Psychic'],
        hp: 45, atk: 10, def: 25, spAtk: 70, spDef: 65, spd: 30,
        total: 245,
        moves: [
            { name: 'Charming Address', desc: 'A soothing speech that may confuse a weak-willed target.' },
            { name: 'Propaganda Wave', desc: 'Broadcasts Council messaging that clouds judgment temporarily.' },
            { name: 'Smiling Deflection', desc: 'Dodges a question — and occasionally an attack — with a perfect smile.' },
            { name: 'Cultural Override', desc: 'Rewrites a target\'s musical preferences. Only works on civilians.' },
            { name: 'Harmony is Freedom', desc: 'ULTIMATE: A mass-suggestion broadcast. Devastating to civilians, meaningless to trained fighters.' }
        ]
    },
    'auditor-kane': {
        name: 'Auditor Kane',
        level: 13,
        type: ['Normal', 'Electric'],
        hp: 35, atk: 8, def: 25, spAtk: 60, spDef: 55, spd: 20,
        total: 203,
        moves: [
            { name: 'Frequency Scan', desc: 'Identifies a target\'s sound signature. No damage dealt.' },
            { name: 'Compliance Check', desc: 'Flags a target as "non-compliant." Alerts nearby guards.' },
            { name: 'Data Log', desc: 'Records everything. Has no combat use whatsoever.' },
            { name: 'Surveillance Ping', desc: 'A weak sonar pulse that reveals hidden targets in a small area.' },
            { name: 'Total Monitoring', desc: 'ULTIMATE: Activates the FCB surveillance network. Useful for intelligence, useless in battle.' }
        ]
    }
};

// Add to existing stats
Object.assign(stats, councilMembers);

fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
console.log(`Updated characterStats.json. Total characters: ${Object.keys(stats).length}`);

// Print council summary
console.log('\n--- HARMONY COUNCIL STATS ---');
for (const [slug, s] of Object.entries(councilMembers)) {
    console.log(`${s.name.padEnd(28)} Total: ${s.total}  Type: ${s.type.join('/')}  LVL ${s.level}`);
}
