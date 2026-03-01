
import fs from 'fs';
import path from 'path';

// Import the data directly from the source file
import { dj24Roster, sick52MemberData, extendedCharacters } from './fandom-site/src/contentLoader.js';

// The contentLoader functions can't be run in this Node context easily,
// so we'll replicate the name logic for Sick52
function getSick52Name(slug) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

const allChars = [];

// Process DJ24 Roster
dj24Roster.forEach(char => {
    if (char.slug) {
        allChars.push({
            slug: char.slug,
            name: char.name,
            faction: 'DJ24',
            role: char.role,
            rank: char.hour,
            desc: char.desc
        });
    }
});

// Process Extended Characters
extendedCharacters.forEach(char => {
    if (char.slug) {
        allChars.push({
            slug: char.slug,
            name: char.name,
            faction: char.faction,
            role: char.role,
            rank: char.rank,
            desc: char.desc
        });
    }
});

// Process Sick 52 Roster
for (const [slug, data] of Object.entries(sick52MemberData)) {
    allChars.push({
        slug: slug,
        name: getSick52Name(slug),
        faction: 'Sick 52',
        role: data.role,
        rank: data.rank,
        desc: data.desc,
        title: data.title, // Keep title for move generation
    });
}

// Remove duplicates
const seenSlugs = new Set();
const uniqueChars = allChars.filter(char => {
    if (seenSlugs.has(char.slug)) {
        return false;
    } else {
        seenSlugs.add(char.slug);
        return true;
    }
});

const outputDir = './';
const outputPath = path.join(outputDir, 'characters.json');

try {
    fs.writeFileSync(outputPath, JSON.stringify(uniqueChars, null, 2));
    console.log(`Successfully extracted ${uniqueChars.length} characters to ${outputPath}`);
} catch (err) {
    console.error("Error writing characters.json file:", err);
}
