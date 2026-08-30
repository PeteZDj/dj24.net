// =====================================================================
// THE MADE DECK — the Hip Hop Mafia's 52 (+2 Jokers)
// Design doc: docs/HIP-HOP-MAFIA-DECK.md
//
// Mirror of the Sick Deck, but built on territory, money, guns and cars
// instead of sound mutation. A♠ is the boss of all bosses.
// Stats: mus (muscle) mon (money) rea (reach) hea (heat, high = wanted)
//        loy (loyalty, LOW = flip risk) whl (wheels)
// =====================================================================

export const madeHouses = {
  spades: {
    key: 'spades', name: 'Spades', symbol: '♠', color: '#D4AF37', accent: '#0F172A',
    house: "The Founders' House",
    business: 'Artists, labels, venues, publishing — the culture itself.',
    territory: 'Southside',
    desc: 'The founding house. Grew directly out of the hip-hop scene. The throne — the other three defer.',
  },
  clubs: {
    key: 'clubs', name: 'Clubs', symbol: '♣', color: '#15803D', accent: '#052E16',
    house: 'The Corner House',
    business: 'Corners, protection, gambling and Static Cut distribution.',
    territory: 'Harbour District',
    desc: 'Formed from the block crews. Youngest, most volatile, most feared.',
  },
  hearts: {
    key: 'hearts', name: 'Hearts', symbol: '♥', color: '#DB2777', accent: '#500724',
    house: 'The Velvet House',
    business: 'Nightclubs, promotion, hospitality, celebrity access, the door.',
    territory: 'Neon District',
    desc: 'Old club and hospitality money. The glamour, and the launder-friendly cash.',
  },
  diamonds: {
    key: 'diamonds', name: 'Diamonds', symbol: '♦', color: '#2563EB', accent: '#0C1E4A',
    house: 'The Count House',
    business: 'Laundering, finance, luxury goods, cars, jewellery, real estate.',
    territory: 'Central District',
    desc: 'Old immigrant finance families. The quietest, richest and hardest to prosecute.',
  },
};

// Same ladder as the Sick Deck so ranking logic can be shared.
export const MADE_RANK_ORDER = { A: 1, K: 2, Q: 3, J: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12, 10: 13 };

const m = (card, suit, alias, name, role, gun, car, front, district, s) => ({
  card, suit, alias, name, role, gun, car, front, district,
  mus: s[0], mon: s[1], rea: s[2], hea: s[3], loy: s[4], whl: s[5],
  slug: alias.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
});

export const madeDeck = [
  // ♠ SPADES — The Founders' House
  m('A', 'spades', 'Grand Verse', 'Marcus Cole', 'The Chairman — boss of all bosses', 'Nickel .45, unfired in 20 years', "'68 Kestrel Continental", 'Verse Holdings (publishing)', 'The Heights', [40, 95, 99, 30, 95, 30]),
  m('K', 'spades', '8-Bar', 'Terrence Boyd', 'Underboss — street operations', 'Colt sidearm', 'Black Kestrel Wraith', 'Boyd & Sons barbershops', 'Southside', [85, 78, 82, 55, 70, 60]),
  m('Q', 'spades', 'Ladysoul', 'Delores Cole', "The Chairman's sister — owns the masters", 'Derringer in a clutch', 'Kestrel saloon, driven for her', 'Ladysoul Records', 'Rose Hill', [20, 92, 85, 20, 96, 25]),
  m('J', 'spades', 'Reverend', 'Ezra Boone', 'Fixer — negotiates with other organisations', 'Does not carry', 'Modest Bantam estate', 'Community centre chaplaincy', 'Southside', [15, 55, 90, 15, 88, 40]),
  m('2', 'spades', 'Blackout', 'Kenneth Sayles', 'Chief enforcer — refuses drug work', 'Carries, rarely draws', 'Wolfe coupé, black', 'Gym owner', 'Southside', [96, 45, 60, 45, 38, 55]),
  m('3', 'spades', 'Crate', 'Bobby Crate', 'The archive — contraband via the record shop', 'Shotgun under the counter', '40-year-old Bantam van', 'Deep Crates record shop', 'Old Quarter', [30, 50, 75, 25, 98, 35]),
  m('4', 'spades', 'Tapes', 'Julius Bell', 'Smuggling and logistics', 'Whatever is nearest', 'Sakata tuner, loud', 'Vending & jukebox route', 'Harbour District', [45, 62, 70, 65, 42, 88]),
  m('5', 'spades', 'Deacon', 'Otis Pryor', "Runs the community fund's legitimate side", 'None', 'Bantam sedan', 'Kade Community Trust', 'Southside', [20, 58, 72, 12, 90, 35]),
  m('6', 'spades', 'Two-Track', 'Andre Mims', 'Studio owner — launders via session fees', 'Pistol in the console', 'Verrado, used', 'Two-Track Studios', 'Southside', [30, 70, 65, 35, 75, 45]),
  m('7', 'spades', 'Sable', 'Cornell Whitfield', 'Venue control and door rights', 'Sidearm', 'Kestrel SUV', 'Sable Live (promotions)', 'Neon District', [55, 74, 68, 40, 72, 50]),
  m('8', 'spades', 'Pressman', 'Ray Duvall', 'Bootlegs and black-market pressing', 'Sidearm', 'Panel van', 'Duvall Pressing Plant', 'Harbour District', [40, 60, 50, 50, 68, 45]),
  m('9', 'spades', 'Cousin June', 'June Ellery Cole', "The Chairman's driver and confidant", 'Under the seat', "Whatever the Chairman is in", 'None — family', 'The Heights', [50, 40, 55, 20, 99, 92]),
  m('10', 'spades', 'Half-Step', 'Darius Pryor', "Producer — made last year, Deacon's nephew", 'New, never fired', 'Leased Verrado he cannot afford', 'Beat production credits', 'Southside', [25, 48, 45, 55, 35, 50]),

  // ♣ CLUBS — The Corner House
  m('A', 'clubs', 'Bishop', 'Malik Rawls', 'Boss of Clubs — every corner east of the river', 'Engraved sidearm', 'Armoured Kestrel', 'Rawls Security Services', 'Harbour District', [88, 85, 88, 70, 85, 60]),
  m('K', 'clubs', 'Ox', 'Hector Delgado', 'Underboss — enforcement', 'Heavy revolver', 'Wolfe pickup, lifted', 'Haulage company', 'Harbour District', [95, 62, 65, 72, 80, 65]),
  m('Q', 'clubs', 'Mercy', 'Yolanda Reyes', 'Product routes — shows none', 'Compact, always on her', 'Bantam, deliberately forgettable', 'Laundromat chain', 'Harbour District', [70, 80, 75, 60, 82, 70]),
  m('J', 'clubs', 'Trigga', 'Devon Hollis', 'Enforcer', 'Two, always', 'Sakata, stolen and re-plated', 'None', 'Southside', [92, 40, 45, 85, 65, 68]),
  m('2', 'clubs', 'Cutty', 'Rashad Vance', 'Head of Static Cut distribution', 'Sidearm', 'Kestrel SUV, blacked out', 'Car wash', 'Harbour District', [65, 82, 70, 78, 60, 62]),
  m('3', 'clubs', 'Pistola', 'Luis Marrero', 'Corner captain, Harbour', 'Sidearm', 'Verrado, financed', 'Bodega', 'Harbour District', [78, 50, 52, 68, 62, 60]),
  m('4', 'clubs', 'Deuce', 'Tyrone Bankhead', 'Gambling and dice houses', 'Sidearm', 'Wolfe muscle car', 'Pool hall', 'Southside', [60, 68, 58, 55, 70, 50]),
  m('5', 'clubs', 'Smoke', 'Omar Tillman', 'Protection collections', 'Sidearm', 'Bantam', 'Barber chair at Boyd & Sons', 'Southside', [72, 45, 48, 62, 58, 55]),
  m('6', 'clubs', 'Vico', 'Javier Ocampo', 'Docks and containers', 'Shotgun', 'Flatbed', 'Freight brokerage', 'Harbour District', [68, 58, 60, 50, 66, 72]),
  m('7', 'clubs', 'Lil Nine', 'Curtis Pace', 'Corner captain, Eastside', 'Sidearm', 'Sakata hatch', 'None', 'Harbour District', [75, 38, 40, 70, 45, 58]),
  m('8', 'clubs', 'Switchblade', 'Nia Carter', 'Debt collection — sent first', 'Blade before gun', 'Sakata coupé', 'Nail salon', 'Southside', [90, 44, 50, 66, 74, 52]),
  m('9', 'clubs', 'Manny Ice', 'Emmanuel Duran', 'Fencing stolen goods', 'Sidearm', 'Van', 'Pawn shop', 'Old Quarter', [45, 55, 62, 58, 40, 48]),
  m('10', 'clubs', 'Baby K', 'Kadeem Foster', 'Youngest made member, 20', 'New, unfired', 'Leased Sakata', 'None — still lives at home', 'Southside', [55, 25, 30, 45, 28, 62]),

  // ♥ HEARTS — The Velvet House
  m('A', 'hearts', 'Silk', 'Nadia Silk', 'Boss of Hearts — keeps Static Cut out of her rooms', 'Small, in the jacket', 'White Verrado', 'Velvet Static (venue group)', 'Rose Hill', [35, 90, 92, 28, 90, 55]),
  m('K', 'hearts', 'Velour', 'Viktor Amsel', 'Underboss — old money, resents her', 'Antique pistol, decorative', 'Vintage Kestrel', 'Amsel Hospitality', 'Neon District', [30, 82, 78, 30, 48, 40]),
  m('Q', 'hearts', 'Countess', 'Colette Bauer', 'Hospitality, escorts, discretion', 'None — has people', 'Chauffeured', 'Boutique hotel group', 'Neon District', [15, 78, 88, 22, 70, 30]),
  m('J', 'hearts', 'Domino', 'Dominic Sarris', 'Promoter — books the rooms', 'Carries when travelling', 'Verrado convertible', 'Domino Presents', 'Neon District', [45, 72, 80, 42, 68, 60]),
  m('2', 'hearts', 'Applause', 'Lena Hoffmann', 'Ticketing and the door take', 'None', 'Kestrel coupé', 'Ticketing platform', 'Neon District', [20, 70, 60, 25, 75, 40]),
  m('3', 'hearts', 'Fitzy', "Fitz O'Rourke", 'Bar supply and liquor routes', 'Under the bar', 'Delivery truck', 'Beverage distributor', 'Harbour District', [50, 60, 55, 38, 72, 65]),
  m('4', 'hearts', 'Cherry', 'Marisol Vega', "Talent liaison — knows every artist's habits", 'Compact', 'Sakata convertible', 'Artist management', 'Neon District', [25, 62, 82, 30, 58, 55]),
  m('5', 'hearts', 'Ghost Light', 'Anders Holm', 'Venue security', 'Sidearm', 'Bantam SUV', 'Security firm', 'Neon District', [80, 48, 45, 35, 78, 50]),
  m('6', 'hearts', 'Tiara', 'Talia Brennan', 'Celebrity access and guest lists', 'None', 'Town car', 'PR agency', 'Rose Hill', [10, 58, 85, 18, 55, 35]),
  m('7', 'hearts', 'Sundown', 'Sonny Castellane', 'After-hours rooms', 'Sidearm', 'Verrado', 'Late-licence bars', 'Neon District', [55, 65, 58, 48, 62, 52]),
  m('8', 'hearts', 'Roulette', 'Ruthie Kaplan', 'Private gaming rooms', 'None', 'Kestrel', 'Casino floor lease', 'Neon District', [20, 76, 62, 40, 66, 30]),
  m('9', 'hearts', 'Encore', 'Isaiah Grant', 'Festival and tour promotion', 'None', 'Tour bus', 'Encore Touring', 'Neon District', [25, 74, 70, 22, 80, 45]),
  m('10', 'hearts', 'Last Call', 'Pia Novak', 'Neon District street-level fixer', 'Compact', 'Scooter', 'Diner franchise', 'Neon District', [40, 42, 65, 32, 44, 70]),

  // ♦ DIAMONDS — The Count House
  m('A', 'diamonds', 'Saint Sal', 'Salvatore Moretti', "Boss of Diamonds — the family's money", 'Never carries', 'Armoured Kestrel limousine', 'Moretti Holdings', 'Central District', [25, 99, 94, 22, 92, 35]),
  m('K', 'diamonds', 'Ledger', 'Emeka Duru', 'Underboss — laundering through royalties', 'None', 'Ordinary navy Bantam', 'Accountancy practice', 'Central District', [10, 96, 80, 18, 85, 30]),
  m('Q', 'diamonds', 'The Jeweller', 'Irina Vasilenko', 'Precious metals, stones, moving value', 'Small, in the safe', 'Verrado', 'Vasilenko Fine Jewellery', 'Central District', [20, 90, 76, 26, 78, 40]),
  m('J', 'diamonds', 'Chrome', 'Dae-Sun Pak', 'Street racing, chop shops, diverted NexaGen tech', 'Under the dash', 'Whatever he built this month', 'Redline Garage', 'Harbour District', [60, 70, 66, 62, 72, 99]),
  m('2', 'diamonds', 'Two Watches', 'Gino Fanelli', 'Loansharking', 'Sidearm', 'Kestrel coupé', 'Watch dealership', 'Central District', [70, 78, 62, 52, 68, 48]),
  m('3', 'diamonds', 'Paper', 'Arkady Lem', 'Forged documents and identities', 'None', 'Bantam', 'Print shop', 'Old Quarter', [15, 65, 74, 45, 46, 35]),
  m('4', 'diamonds', 'Marble', 'Nikos Stavrou', 'Construction and property', 'Sidearm', 'Wolfe pickup', 'Stavrou Build', 'The Heights', [65, 80, 70, 30, 76, 50]),
  m('5', 'diamonds', 'Bee', 'Bernadette Ricci', 'Bank relationships', 'None', 'Kestrel saloon', 'Private bank board seat', 'Central District', [10, 88, 82, 15, 80, 30]),
  m('6', 'diamonds', 'Titles', 'Tommy Pisani', 'Car titles, plates, registration fraud', 'Sidearm', 'Rotates constantly', 'Vehicle brokerage', 'Central District', [30, 62, 58, 55, 42, 85]),
  m('7', 'diamonds', 'Jade', 'Wen Liu', 'Overseas transfers and shipping', 'None', 'Chauffeured', 'Import/export', 'Harbour District', [15, 86, 78, 24, 74, 30]),
  m('8', 'diamonds', 'Foreclosure', 'Frank Bianchi', 'Distressed property acquisition', 'Sidearm', 'Kestrel SUV', 'Estate agency', 'The Heights', [45, 74, 64, 35, 70, 45]),
  m('9', 'diamonds', 'Deposit', 'Mira Kozel', 'Cash handling and counting houses', 'Compact', 'Armoured van', 'Cash-in-transit firm', 'Central District', [35, 72, 55, 40, 82, 68]),
  m('10', 'diamonds', 'Loose Change', 'Aldo Serafini', 'Vending, parking, coin businesses', 'None', 'Bantam van', 'Parking group', 'Old Quarter', [25, 50, 48, 20, 75, 55]),
];

export const madeJokers = [
  { ...m('🃏', 'spades', 'Mama Kade', 'Rosaline Kade', 'The Consigliere — books and the community fund', 'None', 'Driven everywhere', 'Kade Community Trust', 'Southside', [10, 88, 97, 5, 99, 25]), joker: 'black' },
  { ...m('🃏', 'diamonds', 'The Pen', 'Isiah Poole', 'Ghost Ink — intelligence', 'None', 'Bantam, unremarkable', 'Ghostwriting credits', 'Old Quarter', [20, 70, 99, 30, 50, 40]), joker: 'red' },
];

export const madeDeckAll = [...madeDeck, ...madeJokers];

export function getMadeByHouse() {
  const out = {};
  for (const [key, info] of Object.entries(madeHouses)) {
    out[key] = {
      ...info,
      members: madeDeck
        .filter((x) => x.suit === key)
        .sort((a, b) => MADE_RANK_ORDER[a.card] - MADE_RANK_ORDER[b.card]),
    };
  }
  return out;
}

// The softest cards — the police campaign's entry points.
export function getFlipList(threshold = 50) {
  return madeDeckAll.filter((x) => x.loy < threshold).sort((a, b) => a.loy - b.loy);
}
