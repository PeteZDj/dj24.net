/** Hip Hop Mafia — Made Deck featured roster + restaurant fronts */

export const mafiaHouses = {
  spades: {
    key: 'spades',
    name: 'Spades',
    symbol: '♠',
    house: "The Founders' House",
    branch: 'Southside & Urban City',
    color: '#C9A227',
    desc: 'Artists, labels, venues, publishing — the culture itself. The throne the other three houses defer to.',
  },
  clubs: {
    key: 'clubs',
    name: 'Clubs',
    symbol: '♣',
    house: 'The Corner House',
    branch: 'Harbour District & Eastside',
    color: '#15803D',
    desc: 'Corners, protection, gambling, and Static Cut distribution. The muscle — feared and slightly distrusted.',
  },
  hearts: {
    key: 'hearts',
    name: 'Hearts',
    symbol: '♥',
    house: 'The Velvet House',
    branch: 'Neon District & Rose Hill',
    color: '#BE185D',
    desc: 'Nightclubs, promotion, hospitality, celebrity access. Glamour cash that washes clean.',
  },
  diamonds: {
    key: 'diamonds',
    name: 'Diamonds',
    symbol: '♦',
    house: 'The Count House',
    branch: 'Central District & the Heights',
    color: '#2563EB',
    desc: 'Laundering, finance, luxury goods, cars, jewellery. Quietest, richest, hardest to prosecute.',
  },
  jokers: {
    key: 'jokers',
    name: 'Jokers',
    symbol: '🃏',
    house: 'The Commission Advisors',
    branch: 'Outside the houses',
    color: '#78716C',
    desc: 'Answer only to the Commission. Everyone needs them. Nobody fully trusts them.',
  },
  signed: {
    key: 'signed',
    name: 'Signed',
    symbol: '◎',
    house: 'Signed Artists',
    branch: 'Not Made',
    color: '#0891B2',
    desc: 'Under contract, not in the deck. The single best story hook in the organisation.',
  },
};

export const mafiaImages = {
  'grand-verse': 'marcus-grand-verse-cole.png',
  'freq-kid': 'amara-freq-kid-nwosu.png',
  silk: 'nadia-silk-silk.png',
  bishop: 'malik-bishop-rawls.png',
  'saint-sal': 'salvatore-saint-sal-moretti.png',
  'mama-kade': 'rosaline-mama-kade.png',
  'the-pen': 'isiah-the-pen-poole.png',
  blackout: 'kenneth-blackout-sayles.png',
  chrome: 'dae-sun-chrome-pak.png',
  mercy: 'yolanda-mercy-reyes.png',
};

export const mafiaMemberData = {
  'grand-verse': {
    rank: 1,
    house: 'spades',
    card: 'A',
    alias: 'Grand Verse',
    realName: 'Marcus Cole',
    title: 'The Chairman',
    role: 'Boss of all bosses',
    gun: 'Nickel .45, unfired in 20 years',
    car: "'68 Kestrel Continental, restored",
    front: 'Verse Holdings (publishing)',
    civilian: "Eats alone at Vantaggio's every Sunday before the Commission arrives. Still writes verses in a leather notebook nobody is allowed to open.",
    desc: 'The deck came first — an old street ranking that predates the exile. Marcus Cole chairs the Commission that runs it. Soft-spoken, heavy-set, one gold ring. He has not drawn that nickel .45 in twenty years because he has never needed to. When the Sick 52 dealt themselves as a deck in mockery of the streets, Grand Verse took it personally. To him, the Sick Deck is plagiarism.',
    past: 'Before the chair, he was a Southside lyricist who bought masters instead of cars. Three labels, two wars, one sister who still owns the catalogue. He built Verse Holdings so the culture would have a landlord who looked like it — then discovered landlords need soldiers.',
    prompt: 'Full-body anime character for DJ24 War of Sound. Marcus "Grand Verse" Cole, Black man in his sixties, grey beard, charcoal overcoat, single thick gold ring, hands clasped. Black/gold palette. No waveforms, no glowing auras.',
  },
  'freq-kid': {
    rank: 99,
    house: 'signed',
    card: null,
    alias: 'Freq Kid',
    realName: 'Amara Nwosu',
    title: 'Signed Artist',
    role: 'The empty seat they keep offering',
    gun: 'None',
    car: 'None — rides the transit',
    front: 'None yet',
    civilian: 'Lives above a corner store in Southside. Writes in notebooks until 4am. Still calls her mum every Sunday.',
    desc: 'Nineteen. Box braids, bomber jacket, headphones, one gold hoop. She is not in the Made Deck — and that is the entire point of her arc. Half the Commission wants to give her a seat. The other half remembers what happened to the last kid who took one. She has not said yes.',
    past: 'Won three open-mics in Urban City before anyone knew her government name. Silk heard the tapes first. Bishop wants her for Clubs. Grand Verse wants her for Spades. She wants a career that does not require a gun.',
    prompt: 'Full-body anime. Amara "Freq Kid" Nwosu, 19, box braids, vintage bomber, headphones, notebook to chest. Cool cyan lighting. Smaller framing — she is not Made yet.',
  },
  silk: {
    rank: 2,
    house: 'hearts',
    card: 'A',
    alias: 'Silk',
    realName: 'Nadia Silk',
    title: 'Boss of Hearts',
    role: 'Velvet Static — nightlife & the door',
    gun: 'Small, in the jacket',
    car: 'White Verrado',
    front: 'Velvet Static (venue group)',
    civilian: 'Swims at 5am. Never drinks. Funds a Southside music school anonymously.',
    desc: 'Mid-thirties, ivory trouser suit, gold anklet, arms loosely crossed. She keeps Static Cut out of her rooms when Clubs and Diamonds push it in. Runs Hearts as a Black woman inside a predominantly white house — which is why she had to be twice as good, and why the old guard resent her.',
    past: 'Started as a door girl in Rose Hill. Learned every name that mattered by watching who got waved through. Bought her first room with a loan Mama Kade still denies making.',
    prompt: 'Full-body anime. Nadia "Silk" Silk, mid-thirties, ivory suit, gold anklet, magenta/amber light.',
  },
  bishop: {
    rank: 3,
    house: 'clubs',
    card: 'A',
    alias: 'Bishop',
    realName: 'Malik Rawls',
    title: 'Boss of Clubs',
    role: 'Every corner east of the river',
    gun: 'Engraved sidearm, holstered',
    car: 'Armoured Kestrel',
    front: 'Rawls Security Services',
    civilian: 'Coaches youth basketball on Saturday mornings. Does not talk about it.',
    desc: 'Late forties, shaved head, grey-flecked beard, dark green military overcoat, heavy gold chain. Feet planted. He runs the corners and the Cut, and he is tired of Grand Verse breaking the Commission vote the same way for three years.',
    past: 'Came up Harbour-side as a corner captain who never missed a count. Built Rawls Security so the police would have a legitimate firm to call when something needed handling.',
    prompt: 'Full-body anime. Malik "Bishop" Rawls, late forties, green military overcoat, gold chain, holstered sidearm.',
  },
  'saint-sal': {
    rank: 4,
    house: 'diamonds',
    card: 'A',
    alias: 'Saint Sal',
    realName: 'Salvatore Moretti',
    title: 'Boss of Diamonds',
    role: "The family's money",
    gun: 'Never carries',
    car: 'Armoured Kestrel limousine',
    front: 'Moretti Holdings',
    civilian: 'Collects first editions. Attends Mass. Tips in cash.',
    desc: 'Sixties, silver hair swept back, midnight-blue three-piece, gold pocket-watch chain. Quiet, patrician, untouchable. Diamonds do not shout. They move numbers until the shouting stops.',
    past: 'Old immigrant finance money from the Heights. His father ran numbers; Salvatore ran banks. The nickname "Saint" started as a joke about his Mass attendance.',
    prompt: 'Full-body anime. Salvatore "Saint Sal" Moretti, sixties, midnight-blue three-piece, gold pocket watch.',
  },
  'mama-kade': {
    rank: 5,
    house: 'jokers',
    card: '🃏',
    alias: 'Mama Kade',
    realName: 'Rosaline Kade',
    title: 'The Consigliere',
    role: 'Black Joker — books & community fund',
    gun: 'None',
    car: 'Driven',
    front: "Ma Kade's (soul food, ~40 locations)",
    civilian: "Knows every grandchild's birthday. Cooks when she is angry.",
    desc: "Seventies, silver hair pinned up, gold-rimmed glasses on a chain, deep-green wool coat, single gold brooch. Kind face, unreadable eyes. Everyone's aunt. Nobody's friend. Never been arrested. Runs the books and the Kade Community Trust — which genuinely feeds Southside and genuinely launders money.",
    past: 'Opened one kitchen on a Southside corner forty years ago. The Trust came later, when Grand Verse needed somewhere clean for dirty money and Rosaline needed somewhere dirty for clean charity.',
    prompt: 'Full-body anime. Rosaline "Mama Kade" Kade, seventies, deep-green coat, gold brooch, handbag.',
  },
  'the-pen': {
    rank: 6,
    house: 'jokers',
    card: '🃏',
    alias: 'The Pen',
    realName: 'Isiah Poole',
    title: 'Ghost Ink',
    role: 'Red Joker — intelligence',
    gun: 'None — he writes the damage instead',
    car: 'Ordinary Bantam',
    front: 'Ghostwriting credits / Skillet & Static booth',
    civilian: 'Always the Harbour branch, back booth, black coffee, 3am.',
    desc: "Forties, slight build, locs tied back, thin gold-rimmed glasses, notebook and pen. Watchful, quiet, faintly amused. Ghostwrote half the planet's biggest records — so he knows every secret anyone ever put in a bar.",
    past: 'Was a staff writer at three labels before he realised the uncredited verses paid better in leverage than in royalties. Grand Verse made him a Joker so the houses could not claim him.',
    prompt: 'Full-body anime. Isiah "The Pen" Poole, forties, dark coat, turtleneck, notebook and pen.',
  },
  blackout: {
    rank: 7,
    house: 'spades',
    card: '2',
    alias: 'Blackout',
    realName: 'Kenneth Sayles',
    title: 'Chief Enforcer',
    role: 'The highest-value flip in the game',
    gun: 'Carries, rarely draws',
    car: 'Wolfe coupé, black',
    front: 'Gym owner',
    civilian: 'Opens the gym at 5. Closes it himself. Sleeps badly.',
    desc: 'Very tall, heavily built, late thirties, scarred knuckles, plain black bomber, silver crucifix, no gold. Hands loose at his sides. Deeply tired, visibly at war with himself. Refuses drug work. Loyalty 38 — the number that keeps the Commission awake.',
    past: 'Was a prospect boxer before Spades made him. Grand Verse personally pulled him off a corner and into the family. Kenneth has killed for the deck and prayed about it every night since. He wants out.',
    prompt: 'Full-body anime. Kenneth "Blackout" Sayles, tall, black bomber, silver crucifix, no gold. Harsh overhead light.',
  },
  chrome: {
    rank: 8,
    house: 'diamonds',
    card: 'J',
    alias: 'Chrome',
    realName: 'Dae-Sun Pak',
    title: 'Redline Garage',
    role: 'Street racing, chop shops, diverted Motion tech',
    gun: 'Under the dash',
    car: 'Whatever he built this month',
    front: 'Redline Garage',
    civilian: 'Eats instant noodles in the bay. Names every car.',
    desc: 'Early thirties, bleached hair, tattooed neck, oil-stained hands, coverall tied at the waist, thick gold chain, grinning. Electric blue and orange garage light. Taking him down cripples the illegal racing economy — and hands NexaGen Motion a win.',
    past: 'Harbour District kid who could rebuild a Sakata blindfolded by sixteen. Diamonds recruited him after he boosted a NexaGen prototype and sold the parts back through a pawn shop.',
    prompt: 'Full-body anime. Dae-Sun "Chrome" Pak, bleached hair, mechanic coverall, gold chain. Electric blue/orange garage light.',
  },
  mercy: {
    rank: 9,
    house: 'clubs',
    card: 'Q',
    alias: 'Mercy',
    realName: 'Yolanda Reyes',
    title: 'Product Routes',
    role: 'Called Mercy because she shows none',
    gun: 'Compact, always on her',
    car: 'Bantam, deliberately forgettable',
    front: 'Laundromat chain',
    civilian: 'Looks like every other woman on the bus. That is the point.',
    desc: 'Late thirties, hair scraped back, hard eyes, scar through one eyebrow, plain dark jacket, one thin gold chain. Utterly unremarkable by design — she is the one you would never pick out of a crowd.',
    past: 'Started counting laundry bags that were not laundry. Bishop promoted her after she moved a Harbour shipment through three districts without a single Heat spike.',
    prompt: 'Full-body anime. Yolanda "Mercy" Reyes, plain dark jacket, thin gold chain, arms folded. Muted green palette.',
  },
};

export const mafiaStats = {
  'grand-verse': {
    name: 'Grand Verse', level: 99, type: ['Dark', 'Normal'],
    muscle: 40, money: 95, reach: 99, heat: 30, loyalty: 95, wheels: 30,
    rarity: 'Legendary', class: 'Crime Boss',
    moves: [
      { name: 'The Tie Break', desc: 'Four Aces vote. Grand Verse decides. Ends arguments without raising his voice.' },
      { name: 'Old Money Quiet', desc: 'Lowers Heat across the Commission for one cycle. Power that does not announce itself.' },
      { name: 'Plagiarism Grudge', desc: 'ULTIMATE: Marks a Sick 52 target. Spades resources flood the case.' },
    ],
  },
  'freq-kid': {
    name: 'Freq Kid', level: 22, type: ['Normal', 'Psychic'],
    muscle: 15, money: 20, reach: 45, heat: 25, loyalty: 70, wheels: 20,
    rarity: 'Standard', class: 'Unsigned Threat',
    moves: [
      { name: 'Open Mic', desc: 'Wins a room. Raises Reach without raising Heat.' },
      { name: 'Empty Seat', desc: 'Every Commission meeting mentions her. Passive pressure on all four Aces.' },
      { name: 'Not Yet', desc: 'ULTIMATE: Refuses the Made offer. Remains outside the deck — and more dangerous for it.' },
    ],
  },
  silk: {
    name: 'Silk', level: 88, type: ['Fairy', 'Dark'],
    muscle: 35, money: 90, reach: 92, heat: 28, loyalty: 90, wheels: 55,
    rarity: 'Legendary', class: 'Night Queen',
    moves: [
      { name: 'Velvet Rope', desc: 'Controls who enters. Information tax on every guest list.' },
      { name: 'Clean Rooms', desc: 'Blocks Static Cut from Hearts territory. Lowers house Heat.' },
      { name: 'Anonymous Patron', desc: 'ULTIMATE: Funds a neighbourhood project that buys lasting Loyalty.' },
    ],
  },
  bishop: {
    name: 'Bishop', level: 90, type: ['Fighting', 'Dark'],
    muscle: 88, money: 85, reach: 88, heat: 70, loyalty: 85, wheels: 60,
    rarity: 'Legendary', class: 'Corner King',
    moves: [
      { name: 'East of the River', desc: 'Claims a block. Muscle and Money spike in Clubs territory.' },
      { name: 'The Cut Question', desc: 'Forces a Commission vote on Static Cut. Raises Heat on Spades and Hearts.' },
      { name: 'Security Detail', desc: 'ULTIMATE: Rawls Security floods an area. Legal cover for illegal work.' },
    ],
  },
  'saint-sal': {
    name: 'Saint Sal', level: 91, type: ['Steel', 'Dark'],
    muscle: 25, money: 99, reach: 94, heat: 18, loyalty: 88, wheels: 40,
    rarity: 'Legendary', class: 'Rainmaker',
    moves: [
      { name: 'Moretti Holdings', desc: 'Washes Money until it looks like daylight.' },
      { name: 'Never Carries', desc: 'Heat cannot stick to a man with no weapon and perfect books.' },
      { name: 'Absolution Fee', desc: "ULTIMATE: Erases another card's Heat — for a permanent favour owed." },
    ],
  },
  'mama-kade': {
    name: 'Mama Kade', level: 93, type: ['Fairy', 'Normal'],
    muscle: 10, money: 80, reach: 96, heat: 8, loyalty: 99, wheels: 15,
    rarity: 'Legendary', class: 'Consigliere',
    moves: [
      { name: 'Community Trust', desc: 'Feeds the neighbourhood and launders the table in the same kitchen.' },
      { name: "Everyone's Aunt", desc: 'Opens doors Loyalty alone cannot. Soft Reach that outlasts guns.' },
      { name: 'Never Arrested', desc: 'ULTIMATE: Heat checks against her automatically fail.' },
    ],
  },
  'the-pen': {
    name: 'The Pen', level: 85, type: ['Psychic', 'Dark'],
    muscle: 12, money: 55, reach: 97, heat: 20, loyalty: 75, wheels: 35,
    rarity: 'Pseudo-Legendary', class: 'Spymaster',
    moves: [
      { name: 'Ghost Ink', desc: "Reveals a secret written into someone else's verse." },
      { name: 'Back Booth', desc: 'Intelligence drop at Skillet & Static. No phones. No witnesses.' },
      { name: 'Uncredited', desc: "ULTIMATE: Turns a rival's own lyrics into evidence." },
    ],
  },
  blackout: {
    name: 'Blackout', level: 78, type: ['Fighting', 'Ghost'],
    muscle: 96, money: 45, reach: 60, heat: 45, loyalty: 38, wheels: 55,
    rarity: 'Elite', class: 'Broken Enforcer',
    moves: [
      { name: 'Scarred Knuckles', desc: 'Devastating Muscle strike. Loyalty drops further afterward.' },
      { name: 'Refuses the Cut', desc: 'Will not touch drug work. Limits Clubs influence over him.' },
      { name: 'Wants Out', desc: 'ULTIMATE: Flip risk. If Loyalty hits bottom, he talks — to the right person only.' },
    ],
  },
  chrome: {
    name: 'Chrome', level: 72, type: ['Steel', 'Electric'],
    muscle: 50, money: 70, reach: 65, heat: 55, loyalty: 70, wheels: 99,
    rarity: 'Elite', class: 'Gearhead',
    moves: [
      { name: 'Redline', desc: 'Escape or chase auto-succeeds on Wheels checks.' },
      { name: 'Chop Shop', desc: 'Converts stolen Motion tech into Diamonds Money.' },
      { name: 'Built This Month', desc: 'ULTIMATE: Deploys a one-off custom car that breaks a pursuit.' },
    ],
  },
  mercy: {
    name: 'Mercy', level: 80, type: ['Poison', 'Dark'],
    muscle: 70, money: 80, reach: 75, heat: 60, loyalty: 82, wheels: 70,
    rarity: 'Elite', class: 'Route Queen',
    moves: [
      { name: 'Forgettable', desc: 'Passes surveillance. Heat barely rises.' },
      { name: 'Product Routes', desc: 'Moves inventory across three districts in one night.' },
      { name: 'Shows None', desc: 'ULTIMATE: Debt collection that ends negotiations permanently.' },
    ],
  },
};

export const mafiaRestaurants = [
  {
    slug: 'vantaggios',
    name: "Vantaggio's",
    tagline: 'Where the Commission meets',
    desc: 'Sixty-year-old steakhouse in the Old Quarter. White tablecloths, no music, waiters who have been there for decades. Back room, one long table, first Sunday of every month — unbroken for 31 years. Guns in a crate by the door. No phones. No business before the food.',
    logo: '/images/logos/logo_vantaggios.png',
    color: '#7C2D12',
    tiedTo: 'grand-verse',
  },
  {
    slug: 'ma-kades',
    name: "Ma Kade's",
    tagline: 'Soul food · ~40 locations',
    desc: "Started as one Southside kitchen. Now a chain owned through the Kade Community Trust — genuinely feeds the neighbourhood and genuinely launders money. The whole faction's ambiguity on a plate.",
    logo: '/images/logos/logo_ma_kades.png',
    color: '#15803D',
    tiedTo: 'mama-kade',
  },
  {
    slug: 'skillet-static',
    name: 'Skillet & Static',
    tagline: '24-hour diner · Harbour back booth',
    desc: "Chrome counters, bottomless coffee, always half-empty at 3am. The Pen's booth is at the back of the Harbour branch — the natural set for late-night hip-hop and R&B scenes.",
    logo: '/images/logos/logo_skillet_static.png',
    color: '#0369A1',
    tiedTo: 'the-pen',
  },
  {
    slug: 'velvet-room',
    name: 'The Velvet Room',
    tagline: 'Members-only supper club',
    desc: "Silk's world. A room in every major city under Velvet Static. Deals, affairs, and reconciliations staged for the cameras — and quieter ones that never are.",
    logo: '/images/logos/logo_velvet_room.png',
    color: '#BE185D',
    tiedTo: 'silk',
  },
];

function enrich(slug, data) {
  const house = mafiaHouses[data.house];
  const filename = mafiaImages[slug];
  const cardLabel = data.card ? `${data.card}${house.symbol}` : 'Signed';
  return {
    slug,
    name: data.alias,
    ...data,
    houseInfo: house,
    houseColor: house.color,
    houseSymbol: house.symbol,
    cardLabel,
    image: filename ? `/images/factions/hip-hop-mafia/${encodeURIComponent(filename)}` : null,
    stats: mafiaStats[slug] || null,
  };
}

export function getMafiaMember(slug) {
  const data = mafiaMemberData[slug];
  if (!data) return null;
  return enrich(slug, data);
}

export function getMafiaRoster() {
  return Object.entries(mafiaMemberData)
    .map(([slug, data]) => enrich(slug, data))
    .sort((a, b) => a.rank - b.rank);
}

export function getMafiaByHouse() {
  const result = {};
  for (const [key, info] of Object.entries(mafiaHouses)) {
    result[key] = {
      ...info,
      members: getMafiaRoster().filter(m => m.house === key),
    };
  }
  return result;
}
