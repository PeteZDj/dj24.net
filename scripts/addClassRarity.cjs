// Add class type and rarity tier to all characters in characterStats.json
const fs = require('fs');
const path = require('path');

const statsPath = path.join(__dirname, '..', 'src', 'data', 'characterStats.json');
const stats = JSON.parse(fs.readFileSync(statsPath, 'utf8'));

// Rarity tiers based on total stat sum (like Pokémon)
function getRarity(total) {
    if (total >= 600) return 'Legendary';
    if (total >= 540) return 'Pseudo-Legendary';
    if (total >= 480) return 'Elite';
    if (total >= 400) return 'Standard';
    if (total >= 300) return 'Common';
    return 'Weak';
}

// Class type based on stat distribution
function getClass(s) {
    const { hp, atk, def, spAtk, spDef, spd } = s;
    const total = s.total || (hp + atk + def + spAtk + spDef + spd);

    const physAtk = atk;
    const specAtk = spAtk;
    const physDef = def;
    const specDef = spDef;
    const bulk = hp + def + spDef;
    const offense = Math.max(atk, spAtk);
    const defense = (def + spDef) / 2;

    // Extreme speed + high offense = Assassin
    if (spd >= 130 && offense >= 100 && hp <= 70) return 'Assassin';
    if (spd >= 120 && offense >= 80 && hp <= 75) return 'Assassin';

    // Very high speed = Speedster
    if (spd >= 120 && offense < 100) return 'Speedster';

    // Very high HP + DEF, low speed = Tank
    if (hp >= 110 && def >= 95 && spd <= 50) return 'Tank';
    if (hp >= 100 && (def >= 100 || spDef >= 100) && spd <= 45) return 'Tank';
    if (hp >= 120 && def >= 80 && spd <= 50) return 'Tank';

    // High DEF + SP.DEF, low ATK = Wall
    if (defense >= 90 && offense <= 60 && hp >= 70) return 'Wall';
    if (specDef >= 110 && physDef >= 80 && offense <= 60) return 'Wall';

    // Very high ATK, low HP/DEF = Glass Cannon
    if (physAtk >= 120 && hp <= 70 && def <= 60) return 'Glass Cannon';
    if (specAtk >= 130 && hp <= 70 && def <= 60) return 'Glass Cannon';
    if (specAtk >= 120 && hp <= 75 && def <= 65) return 'Glass Cannon';

    // High SP.ATK + decent SP.DEF = Special Sweeper
    if (specAtk >= 110 && spd >= 80 && specAtk > physAtk + 30) return 'Special Sweeper';
    if (specAtk >= 120 && specAtk > physAtk + 40) return 'Special Sweeper';

    // High ATK + decent speed = Physical Sweeper
    if (physAtk >= 110 && spd >= 75 && physAtk > specAtk + 30) return 'Physical Sweeper';
    if (physAtk >= 120 && physAtk > specAtk + 40) return 'Physical Sweeper';

    // High HP + moderate all = Bruiser
    if (hp >= 90 && physAtk >= 80 && def >= 70) return 'Bruiser';
    if (physAtk >= 100 && hp >= 80 && def >= 65) return 'Bruiser';

    // High SP.DEF + SP.ATK = Mystic
    if (specAtk >= 90 && specDef >= 90 && physAtk <= 60) return 'Mystic';
    if (specAtk >= 100 && specDef >= 80) return 'Mystic';

    // Balanced-ish stats, leaning offensive
    if (offense >= 85 && defense >= 65 && hp >= 70) return 'Fighter';

    // High SP.DEF, support-like
    if (specDef >= 85 && hp >= 75 && offense <= 70) return 'Support';

    // Balanced stats
    if (Math.abs(physAtk - specAtk) < 20 && Math.abs(def - spDef) < 20) return 'All-Rounder';

    // Default
    if (specAtk > physAtk) return 'Special Attacker';
    return 'Fighter';
}

// Process all characters
let updated = 0;
for (const [slug, char] of Object.entries(stats)) {
    const total = char.total || (char.hp + char.atk + char.def + char.spAtk + char.spDef + char.spd);
    char.total = total;
    char.rarity = getRarity(total);
    char.class = getClass(char);
    updated++;
}

fs.writeFileSync(statsPath, JSON.stringify(stats, null, 2));
console.log(`Updated ${updated} characters with class and rarity\n`);

// Print summary
console.log('Character'.padEnd(28) + 'Total'.padStart(5) + '  Rarity'.padEnd(20) + '  Class');
console.log('-'.repeat(80));
for (const [slug, char] of Object.entries(stats)) {
    console.log(
        slug.padEnd(28) +
        String(char.total).padStart(5) + '  ' +
        char.rarity.padEnd(18) + '  ' +
        char.class
    );
}
