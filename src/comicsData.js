// ===== DJ24: THE WAR OF SOUND — WEBCOMIC =====
// Season 1 spans 4 arcs / 50 chapters. Chapters 1–4 are fully scripted
// (page-by-page, panel-by-panel). The rest are loglined for the roadmap.
//
// Panel types (rendered by ComicReader):
//   { type: 'desc',     text }                      scene / action description
//   { type: 'line',     who, faction, mode, text }  dialogue (mode: speak|thought|whisper|shout)
//   { type: 'sfx',      text }                       sound effect
//   { type: 'caption',  text }                       big narration / title box
//
// Image files live in /public/images/comics and are git-ignored (like all art).

export const comicArcs = [
  {
    slug: 'the-first-drop', no: 1, title: 'The First Drop', range: '1–10', color: '#06B6D4',
    focus: 'Sync joins DJ24 and faces his first battle against the Sick 52.',
    tone: 'High-energy intro · world-building',
  },
  {
    slug: 'the-echo-revolt', no: 2, title: 'The Echo Revolt', range: '11–20', color: '#F59E0B',
    focus: "The Mavericks inside DJ24 challenge General 24's leadership.",
    tone: 'Internal conflict · power struggles',
  },
  {
    slug: 'the-silence-war', no: 3, title: 'The Silence War', range: '21–35', color: '#DC2626',
    focus: 'The Sick 52 launch a full-scale attack on Ongaku Prime.',
    tone: 'Dark · intense battles',
  },
  {
    slug: 'the-final-remix', no: 4, title: 'The Final Remix', range: '36–50', color: '#7C3AED',
    focus: 'Sync discovers his XDF abilities and the truth behind the war.',
    tone: 'Climax · the ultimate betrayal revealed',
  },
];

// ---------- FULLY SCRIPTED CHAPTERS ----------

const ch01 = {
  number: 1, slug: 'ch01-the-first-drop', arc: 'the-first-drop', title: 'The First Drop',
  status: 'published', cover: 'ch01-cover.png',
  logline: 'A rookie with no speakers is thrown into the Echo Arena against the deadliest sound-warlord alive.',
  setting: 'Ongaku Prime — The Echo Arena',
  summaryDoc: 'comics/ch01-the-first-drop.md',
  debut: ['Sync', 'Red Silence', 'General 24'],
  moves: ['Sound Erasure', 'Dead Frequency', 'Resonance Sync', 'Bass Drop', 'Null Step'],
  locations: ['Echo Arena'],
  characters: [
    { name: 'Sync', slug: 'sync', role: 'DJ24 rookie' },
    { name: 'Red Silence', slug: 'red-silence', role: 'Sick 52 leader' },
    { name: 'General 24', slug: 'general-24', role: 'DJ24 commander' },
  ],
  pages: [
    {
      n: '1', title: 'Establishing the World', image: 'ch01-establishing.png',
      panels: [
        { type: 'desc', text: 'A dark cyberpunk cityscape. Neon light bleeds across rain-covered streets.' },
        { type: 'desc', text: 'A low-frequency hum fills the air — a bass drop echoes from a distant megastructure.' },
        { type: 'sfx', text: 'BWOOOMmm…' },
        { type: 'desc', text: 'Cut down, beneath the city — into a massive underground arena. THE ECHO ARENA.' },
        { type: 'caption', text: 'LIVE BATTLE — DJ24 vs. THE SICK 52' },
      ],
    },
    {
      n: '2–3', title: 'The Fighters Enter',
      panels: [
        { type: 'desc', text: 'SYNC steps onto the stage — DJ24 headset, battle gauntlets humming to life.' },
        { type: 'line', who: 'ANNOUNCER', faction: 'neutral', mode: 'shout', text: 'New recruit versus the deadliest sound manipulator alive. Let\u2019s see if you can stay on beat, rookie.' },
        { type: 'desc', text: 'Opposite him, RED SILENCE walks in — calm, confident. No decks. No speakers. No gear.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'thought', text: 'No decks, no speakers? How does he even fight?' },
        { type: 'desc', text: 'Red Silence raises one hand. His fingers flicker — and the entire arena goes silent.' },
        { type: 'sfx', text: '—' },
      ],
    },
    {
      n: '4–6', title: 'Sound Erasure', image: 'ch01-erasure.png',
      panels: [
        { type: 'desc', text: 'Sync hesitates. The roar of the audience fades to nothing. Total silence.' },
        { type: 'desc', text: 'Red Silence closes his eyes. The arena screen GLITCHES. Words vanish. The world loses all sound.' },
        { type: 'desc', text: 'Sync panics, slamming his gauntlets — trying to drop a beat. Nothing plays.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'shout', text: 'What the\u2014 my speakers aren\u2019t working!?' },
        { type: 'line', who: 'Red Silence', faction: 'sick52', mode: 'whisper', text: 'You\u2019re already losing, rookie.' },
        { type: 'desc', text: 'Red Silence SLAMS his foot down — a pure frequency WAVE rips across the arena.' },
        { type: 'sfx', text: 'KRA-THOOM' },
        { type: 'desc', text: 'The shockwave crashes into Sync and throws him backward across the floor.' },
      ],
    },
    {
      n: '7–9', title: 'Feel It', image: 'ch01-bassdrop.png',
      panels: [
        { type: 'desc', text: 'Sync hits the ground, gasping, vision flickering at the edges.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'thought', text: 'I can\u2019t hear. I can\u2019t fight. I have to\u2014 FEEL it.' },
        { type: 'desc', text: 'He closes his eyes. Presses his palm flat to the ground. Syncing with the vibration.' },
        { type: 'desc', text: 'Close on his chest — his own heartbeat. His fingers start to tap.' },
        { type: 'sfx', text: 'bum\u2026 bum\u2026 bum-bum-bum' },
        { type: 'desc', text: 'The floor beneath him THUMPS. His rhythm begins resonating with the arena itself.' },
        { type: 'desc', text: 'Red Silence pauses — sensing the shift in the air.' },
        { type: 'desc', text: 'SYNC\u2019S EYES SNAP OPEN — his whole body pulsing with a low-frequency bassline.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'shout', text: 'You wanna erase sound? Then let\u2019s make some NOISE.' },
        { type: 'desc', text: 'He drives his foot down. BASS DROP. The arena shakes as a subwave erupts toward Red Silence.' },
        { type: 'sfx', text: 'DOOOM——' },
      ],
    },
    {
      n: '10', title: 'The Cliffhanger',
      panels: [
        { type: 'desc', text: 'Red Silence takes the hit head-on — his body flickers like an afterimage.' },
        { type: 'desc', text: 'For the first time, he looks\u2026 surprised.' },
        { type: 'desc', text: 'Sound slowly returns to the arena. Sync is still standing.' },
        { type: 'line', who: 'Red Silence', faction: 'sick52', mode: 'speak', text: 'You might actually be interesting.' },
        { type: 'desc', text: 'He steps back into the shadows, dissolving into static.' },
        { type: 'line', who: 'Red Silence', faction: 'sick52', mode: 'whisper', text: 'You\u2019re not their savior, kid. You\u2019re their weapon.' },
        { type: 'desc', text: 'Sync breathes hard, no idea what he meant. High above, GENERAL 24 watches from the dark.' },
        { type: 'caption', text: 'TO BE CONTINUED\u2026' },
      ],
    },
  ],
};

const ch02 = {
  number: 2, slug: 'ch02-off-the-beat', arc: 'the-first-drop', title: 'Off the Beat',
  status: 'published', cover: 'ch02-cover.png',
  logline: 'Sync is dragged before the commander of DJ24 — and learns the 24 guardians answer to the clock itself.',
  setting: 'Ongaku Prime — The DJ24 Command Spire',
  summaryDoc: 'comics/ch02-off-the-beat.md',
  debut: ['General 24', 'Molly'],
  moves: ['The 24-Hour Schedule', 'Prima Edge', 'Phantom Alignment'],
  locations: ['DJ24 Command Spire'],
  characters: [
    { name: 'Sync', slug: 'sync', role: 'DJ24 rookie' },
    { name: 'General 24', slug: 'general-24', role: 'Supreme Commander of Time' },
    { name: 'Molly', slug: 'molly', role: 'Shockwave Prima' },
  ],
  pages: [
    {
      n: '1', title: 'The Summons',
      panels: [
        { type: 'caption', text: 'The morning after the Echo Arena.' },
        { type: 'desc', text: 'Sync is marched up a glass elevator through the DJ24 Command Spire, the city shrinking below.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'thought', text: 'Survive a death match and they still treat me like I broke curfew.' },
      ],
    },
    {
      n: '2–3', title: 'The Clock of Hours', image: 'ch02-roster.png',
      panels: [
        { type: 'desc', text: 'The doors open onto a vast hall. A golden 24-segment time-disc rotates over the room.' },
        { type: 'desc', text: 'Around it, holographic portraits — twenty-four guardians, one for every hour of the day.' },
        { type: 'line', who: 'General 24', faction: 'dj24', mode: 'speak', text: 'Twenty-four hours. Twenty-four guardians. I don\u2019t fight, rookie\u2014 I schedule reality.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'thought', text: 'Then where the hell do I fit on a clock that\u2019s already full?' },
      ],
    },
    {
      n: '4', title: 'The Anomaly',
      panels: [
        { type: 'desc', text: 'General 24 studies a replay of the arena fight — Sync\u2019s timelines flickering, misaligned.' },
        { type: 'line', who: 'General 24', faction: 'dj24', mode: 'speak', text: 'You didn\u2019t play a beat. You aligned to one that wasn\u2019t there. That\u2019s not a power on my charts.' },
        { type: 'line', who: 'General 24', faction: 'dj24', mode: 'speak', text: 'Red Silence felt it too. That is why he let you live.' },
      ],
    },
    {
      n: '5', title: 'Prima',
      panels: [
        { type: 'desc', text: 'A blade-thin silhouette drops in — MOLLY, landing en pointe, twin silver edges retracting.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'So this is the boy who scared the unkillable man. He doesn\u2019t look like much.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'speak', text: 'Neither does a ballerina with knives, but here we are.' },
        { type: 'desc', text: 'A beat. Molly almost smiles.' },
      ],
    },
    {
      n: '6', title: 'Recruited',
      panels: [
        { type: 'line', who: 'General 24', faction: 'dj24', mode: 'speak', text: 'You\u2019re off the beat, Sync. That makes you dangerous to them\u2014 and to me.' },
        { type: 'line', who: 'General 24', faction: 'dj24', mode: 'speak', text: 'So I\u2019m putting you where I can watch you. Welcome to the Prime Command Unit.' },
        { type: 'desc', text: 'He extends a hand wreathed in golden light. Sync hesitates\u2014 then takes it.' },
        { type: 'caption', text: 'Hour unknown. Guardian: SYNC.' },
      ],
    },
  ],
};

const ch03 = {
  number: 3, slug: 'ch03-the-twenty-four-hours', arc: 'the-first-drop', title: 'The Twenty-Four Hours',
  status: 'published', cover: 'ch03-cover.png',
  logline: 'Training under Molly and Ninja Nagazaki, Sync learns the Frequency Grid is the only thing keeping Ongaku alive.',
  setting: 'Ongaku Prime — DJ24 Rooftop Dojo',
  summaryDoc: 'comics/ch03-the-twenty-four-hours.md',
  debut: ['Ninja Nagazaki'],
  moves: ['Shockwave Pirouette', 'Prima Edge', 'Silent Frequency', 'On-Beat Transition', 'Bass Stance', 'Treble Stance'],
  locations: ['Frequency Grid', 'DJ24 Rooftop Dojo'],
  characters: [
    { name: 'Sync', slug: 'sync', role: 'DJ24 rookie' },
    { name: 'Molly', slug: 'molly', role: 'Shockwave Prima' },
    { name: 'Ninja Nagazaki', slug: 'ninja-nagazaki', role: 'Silent Frequency Executioner' },
  ],
  pages: [
    {
      n: '1', title: 'The Grid',
      panels: [
        { type: 'desc', text: 'Dawn over Ongaku. A lattice of light hums beneath the streets — the Frequency Grid.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'Every wall, every light, every heartbeat in this city runs on the Grid. Cut the sound\u2014 the city dies.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'That\u2019s what the Sick 52 want. Silence. Forever.' },
      ],
    },
    {
      n: '2–3', title: 'Bass & Treble', image: 'ch03-spar.png',
      panels: [
        { type: 'desc', text: 'On the rooftop dojo, Molly flows into a pirouette strike — blades singing.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'shout', text: 'Two stances! BASS to hold the ground\u2014 TREBLE to take the head. Pick one, rookie!' },
        { type: 'desc', text: 'Sync throws up a low-frequency barrier; her edge rings off a shockwave of pure bass.' },
        { type: 'sfx', text: 'KLANG-mmmm' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'thought', text: 'Don\u2019t pick one. Drop between them\u2014 on the beat.' },
      ],
    },
    {
      n: '4', title: 'The Silent Blade',
      panels: [
        { type: 'desc', text: 'NINJA NAGAZAKI is suddenly there — a blade of near-invisible cyan already at Sync\u2019s throat.' },
        { type: 'line', who: 'Ninja Nagazaki', faction: 'dj24', mode: 'whisper', text: 'You make too much noise. Noise is how they find you.' },
        { type: 'line', who: 'Ninja Nagazaki', faction: 'dj24', mode: 'speak', text: 'Red Silence kills sound. I kill the silence between it. Learn both, or die loud.' },
      ],
    },
    {
      n: '5', title: 'On the Beat',
      panels: [
        { type: 'desc', text: 'Sync resets. Breathes. Times the city\u2019s pulse under his feet.' },
        { type: 'desc', text: 'He transitions stance exactly on the downbeat — bass to treble — and the combo detonates.' },
        { type: 'sfx', text: 'TSS-DOOM!' },
        { type: 'desc', text: 'Molly\u2019s next strike is parried clean. Ninja\u2019s blade stops a hair from his collar. A draw.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'Huh. The boy can keep tempo after all.' },
      ],
    },
    {
      n: '6', title: 'Orders',
      panels: [
        { type: 'desc', text: 'A red alert washes the rooftop. A mark blooms on the city map below.' },
        { type: 'line', who: 'General 24', faction: 'dj24', mode: 'speak', text: 'A Sick 52 card just surfaced in the lower districts. Lowest of the deck. Perfect for a first hunt.' },
        { type: 'line', who: 'General 24', faction: 'dj24', mode: 'speak', text: 'Bring it down, Sync. Show me what off the beat can do.' },
        { type: 'caption', text: 'NEXT: the hunt begins.' },
      ],
    },
  ],
};

const ch04 = {
  number: 4, slug: 'ch04-deck-of-cards', arc: 'the-first-drop', title: 'Deck of Cards',
  status: 'published', cover: 'ch04-cover.png',
  logline: 'Sync\u2019s first bounty introduces the deck of 52 — and the rule that you climb from the 10 to the Ace.',
  setting: 'Ongaku Prime — The Lower Districts',
  summaryDoc: 'comics/ch04-deck-of-cards.md',
  debut: ['Deck of 52', 'Ace of Spades'],
  moves: ['Bass Drop', 'On-Beat Transition', 'Bass Stance'],
  locations: ['Lower Districts'],
  characters: [
    { name: 'Sync', slug: 'sync', role: 'DJ24 rookie' },
    { name: 'Molly', slug: 'molly', role: 'Shockwave Prima' },
  ],
  pages: [
    {
      n: '1', title: 'The Most-Wanted Board',
      panels: [
        { type: 'desc', text: 'A neon alley. A giant holographic board unfolds — a fanned deck of 52 cards, each a Sick 52 face.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'Fifty-two of them. Dealt like a deck. You start at the tens and you climb.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'Kings, Queens, Jacks are generals. The Aces? Pray you never meet one early.' },
        { type: 'desc', text: 'At the top, the Ace of Spades burns brightest. A silhouette none of them name.' },
      ],
    },
    {
      n: '2', title: 'Bodyguards',
      panels: [
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'speak', text: 'So why hunt the weak ones first? Sounds backwards.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'Because the low cards are bodyguards. Drop them, and the big cards lose their cover.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'You don\u2019t reach an Ace. You earn it.' },
      ],
    },
    {
      n: '3–4', title: 'The Hunt', image: 'ch04-bounty.png',
      panels: [
        { type: 'desc', text: 'A low-card mutant erupts from the rain-soaked dark, all jagged amps and rage.' },
        { type: 'sfx', text: 'GRRRZZT' },
        { type: 'desc', text: 'Sync drops to bass — holds the alley. The mutant\u2019s charge smashes against his barrier.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'thought', text: 'Hold the ground\u2026 then take the head.' },
        { type: 'desc', text: 'He transitions on the beat and lands a bass-charged finisher. The card shatters into pixels.' },
        { type: 'sfx', text: 'DOOM-tsss!' },
      ],
    },
    {
      n: '5', title: 'One Down, Fifty-One to Go',
      panels: [
        { type: 'desc', text: 'The holographic card flips face-down on the board. One down.' },
        { type: 'line', who: 'Molly', faction: 'dj24', mode: 'speak', text: 'Not bad for off the beat. Only fifty-one to go.' },
        { type: 'desc', text: 'Far above, on a rooftop, a hooded figure watches the kill. Red Silence. He almost smiles.' },
        { type: 'line', who: 'Red Silence', faction: 'sick52', mode: 'whisper', text: 'Climb, little weapon. I\u2019ll be waiting at the top.' },
        { type: 'caption', text: 'END OF PREVIEW \u2014 ARC 1: THE FIRST DROP' },
      ],
    },
  ],
};

const ch05 = {
  number: 5, slug: 'ch05-silent-streets', arc: 'the-first-drop', title: 'Silent Streets',
  status: 'published', cover: 'ch05-cover.png',
  logline: 'A district goes quiet. Sync and Ninja Nagazaki hunt the thing eating the sound block by block.',
  setting: 'Ongaku — Blue City (the jazz quarter)',
  summaryDoc: 'comics/ch05-silent-streets.md',
  debut: ['Dead Air Revenant'],
  moves: ['Dead Air', 'Resonance Sync', 'Silent Frequency', 'Cutoff', 'Bass Drop', 'On-Beat Transition'],
  locations: ['Blue City'],
  characters: [
    { name: 'Sync', slug: 'sync', role: 'DJ24 guardian' },
    { name: 'Ninja Nagazaki', slug: 'ninja-nagazaki', role: 'Silent Executioner' },
    { name: 'Dead Air Revenant', slug: null, role: 'Sick 52 low card' },
  ],
  pages: [
    {
      n: '1', title: 'The Quarter That Went Quiet',
      panels: [
        { type: 'caption', text: 'Blue City — the jazz quarter, where the music never used to stop.' },
        { type: 'desc', text: 'Rain falls on a half-dead street. One side still glows with neon and saxophone clubs; the other side is grey, silent, switched off.' },
        { type: 'desc', text: 'People stand frozen in the silent half, staring at nothing, slowly forgetting why they came outside.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'speak', text: 'It\u2019s eating the whole block. Sound, color\u2014 all of it, just gone.' },
      ],
    },
    {
      n: '2', title: 'The Right Partner for the Job',
      panels: [
        { type: 'desc', text: 'Ninja Nagazaki steps out of the rain beside him, blade already drawn.' },
        { type: 'line', who: 'Ninja Nagazaki', faction: 'dj24', mode: 'speak', text: 'The General sent me because this fight has no sound in it. That is where I live.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'thought', text: 'My first real mission and they pair me with the scariest man on the roster. Great.' },
      ],
    },
    {
      n: '3', title: 'Into the Dead Zone',
      panels: [
        { type: 'desc', text: 'They cross the line into the silent half. Sync\u2019s gauntlets flicker and cut out, just like in the arena.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'shout', text: 'My gear\u2019s dead again\u2014 same as Red Silence!' },
        { type: 'desc', text: 'Sync drops a hand to the wet pavement, reading the vibrations. He feels his way forward.' },
        { type: 'sfx', text: 'bum\u2026 bum\u2026' },
      ],
    },
    {
      n: '4', title: 'The Dead Air Revenant',
      panels: [
        { type: 'desc', text: 'At the center of the dead zone stands a hooded, flatlining figure draining the street\u2014 the Dead Air Revenant.' },
        { type: 'desc', text: 'It spreads a bubble of total silence. Every sound Sync makes is swallowed before it can land.' },
        { type: 'line', who: 'Sync', faction: 'dj24', mode: 'shout', text: 'I can\u2019t even hear my own bass! It\u2019s bigger than the arena\u2014 colder!' },
      ],
    },
    {
      n: '5', title: 'Move Inside the Silence',
      panels: [
        { type: 'line', who: 'Ninja Nagazaki', faction: 'dj24', mode: 'speak', text: 'Stop fighting the silence. Move inside it. Find the one rhythm still alive in here.' },
        { type: 'desc', text: 'Sync goes still. Beneath the silence he feels them\u2014 the heartbeats of the trapped people, and one last jazz note still hanging in the air.' },
        { type: 'desc', text: 'He locks onto the beat, switches stance on the downbeat, and drives a bass drop straight into the Revenant.' },
        { type: 'sfx', text: 'DOOOM\u2014' },
        { type: 'desc', text: 'The silence cracks open. Ninja slips in, strips the sound from the creature itself, and ends it with one clean strike.' },
      ],
    },
    {
      n: '6', title: 'A Card Left Behind',
      panels: [
        { type: 'desc', text: 'Sound rushes back all at once. The clubs roar to life, the rain turns loud, the people blink awake.' },
        { type: 'desc', text: 'Ninja kneels where the creature fell and lifts a single playing card left behind on purpose.' },
        { type: 'line', who: 'Ninja Nagazaki', faction: 'dj24', mode: 'speak', text: 'This wasn\u2019t a stray. A higher card placed it here\u2014 to see how we\u2019d answer.' },
        { type: 'line', who: 'General 24', faction: 'dj24', mode: 'speak', text: 'They\u2019re not raiding anymore. They\u2019re measuring us. The climb starts now.' },
        { type: 'caption', text: 'NEXT: the sub-bass monk.' },
      ],
    },
  ],
};

const scripted = { [ch01.slug]: ch01, [ch02.slug]: ch02, [ch03.slug]: ch03, [ch04.slug]: ch04, [ch05.slug]: ch05 };

// ---------- FULL CHAPTER ROADMAP (loglines) ----------
// status: 'published' (full script) | 'scripting' | 'planned'
const roadmap = [
  // Arc 1 — The First Drop
  { number: 1, arc: 'the-first-drop', title: 'The First Drop', status: 'published', logline: 'Sync\u2019s first battle, against Red Silence in the Echo Arena.' },
  { number: 2, arc: 'the-first-drop', title: 'Off the Beat', status: 'published', logline: 'Sync meets General 24 and joins the Prime Command Unit.' },
  { number: 3, arc: 'the-first-drop', title: 'The Twenty-Four Hours', status: 'published', logline: 'Training with Molly and Ninja; the Frequency Grid explained.' },
  { number: 4, arc: 'the-first-drop', title: 'Deck of Cards', status: 'published', logline: 'The first bounty and the rules of the deck of 52.' },
  { number: 5, arc: 'the-first-drop', title: 'Silent Streets', status: 'published', logline: 'A district goes quiet. Something is eating the sound block by block.' },
  { number: 6, arc: 'the-first-drop', title: 'The Sub-Bass Monk', status: 'planned', logline: 'Sync trains under MasterBass to survive crushing low-end pressure.' },
  { number: 7, arc: 'the-first-drop', title: 'Frequency Thieves', status: 'planned', logline: 'SubZ and a crew of pirates steal a DJ24 drop mid-mission.' },
  { number: 8, arc: 'the-first-drop', title: 'The Cursed Composer', status: 'planned', logline: 'A Sick 52 Queen turns a whole crowd into her orchestra.' },
  { number: 9, arc: 'the-first-drop', title: 'Crescendo', status: 'planned', logline: 'The squad climbs the deck toward its first face card.' },
  { number: 10, arc: 'the-first-drop', title: 'First Blood, First Drop', status: 'planned', logline: 'Arc finale: a Jack of the Sick 52 falls\u2014 but reveals the war is bigger.' },
  // Arc 2 — The Echo Revolt
  { number: 11, arc: 'the-echo-revolt', title: 'The Maverick', status: 'planned', logline: 'Drez and the Mavericks reject General 24\u2019s order.' },
  { number: 12, arc: 'the-echo-revolt', title: 'Split Tempo', status: 'planned', logline: 'DJ24 fractures into rival tempos. Sync is caught between.' },
  { number: 13, arc: 'the-echo-revolt', title: 'Mutiny in the Mix', status: 'planned', logline: 'A coup attempt inside the Command Spire.' },
  { number: 14, arc: 'the-echo-revolt', title: 'The Unchained Beat', status: 'planned', logline: 'Drez unleashes a forbidden, unschedulable rhythm.' },
  { number: 15, arc: 'the-echo-revolt', title: 'Brother Frequencies', status: 'planned', logline: 'Sync and General 24\u2019s rivalry first shows its edge.' },
  { number: 16, arc: 'the-echo-revolt', title: 'The Drop That Broke', status: 'planned', logline: 'A botched op hands the Sick 52 an opening.' },
  { number: 17, arc: 'the-echo-revolt', title: 'Reverb Titan', status: 'planned', logline: 'A War Club mountain of sound besieges a district.' },
  { number: 18, arc: 'the-echo-revolt', title: 'Two Kings', status: 'planned', logline: 'DJ24 must reunite to face a King of the deck.' },
  { number: 19, arc: 'the-echo-revolt', title: 'The Echo Throne', status: 'planned', logline: 'Who really commands the 24 hours?' },
  { number: 20, arc: 'the-echo-revolt', title: 'Revolt\u2019s End', status: 'planned', logline: 'The revolt resolves\u2014 just as the Sick 52 march.' },
  // Arc 3 — The Silence War
  { number: 21, arc: 'the-silence-war', title: 'The Silence Falls', status: 'planned', logline: 'The Sick 52 attack Ongaku Prime in force.' },
  { number: 22, arc: 'the-silence-war', title: 'War Conductors', status: 'planned', logline: 'The Clubs lead the assault on the Grid.' },
  { number: 23, arc: 'the-silence-war', title: 'The Elemental Etudes', status: 'planned', logline: 'Walking disasters tear the districts apart.' },
  { number: 24, arc: 'the-silence-war', title: 'City of Storms', status: 'planned', logline: 'Electric City falls under a permanent glitch-storm.' },
  { number: 25, arc: 'the-silence-war', title: 'The Dissonant Choir', status: 'planned', logline: 'The Hearts break minds before bodies.' },
  { number: 26, arc: 'the-silence-war', title: 'Mind of the Widow', status: 'planned', logline: 'A Queen of Hearts traps the squad in sleep paralysis.' },
  { number: 27, arc: 'the-silence-war', title: 'The Komedian Laughs', status: 'planned', logline: 'A wildcard from Planet Joke crashes the war.' },
  { number: 28, arc: 'the-silence-war', title: 'No Sound Left', status: 'planned', logline: 'The Grid flickers. The city goes dark and dumb.' },
  { number: 29, arc: 'the-silence-war', title: 'The Siege of Ongaku Prime', status: 'planned', logline: 'DJ24\u2019s last line holds the core.' },
  { number: 30, arc: 'the-silence-war', title: 'Red Silence Rising', status: 'planned', logline: 'The founder reveals why he wants silence.' },
  { number: 31, arc: 'the-silence-war', title: 'The Void Sings', status: 'planned', logline: 'Hollow Aria unwrites sound itself.' },
  { number: 32, arc: 'the-silence-war', title: 'Last Stand at the Grid', status: 'planned', logline: 'Everything rides on one drop.' },
  { number: 33, arc: 'the-silence-war', title: 'The Founder\u2019s Requiem', status: 'planned', logline: 'Sync faces Red Silence again\u2014 changed.' },
  { number: 34, arc: 'the-silence-war', title: 'Ashes & Echoes', status: 'planned', logline: 'The cost of the war is counted.' },
  { number: 35, arc: 'the-silence-war', title: 'The War\u2019s Crescendo', status: 'planned', logline: 'Arc finale: the silence breaks\u2014 or the city does.' },
  // Arc 4 — The Final Remix
  { number: 36, arc: 'the-final-remix', title: 'XDF', status: 'planned', logline: 'Sync\u2019s true anomaly awakens.' },
  { number: 37, arc: 'the-final-remix', title: 'The Anomaly', status: 'planned', logline: 'He doesn\u2019t glitch\u2014 he aligns realities.' },
  { number: 38, arc: 'the-final-remix', title: 'Sync vs General 24', status: 'planned', logline: 'The central rivalry finally erupts.' },
  { number: 39, arc: 'the-final-remix', title: 'The Truth Behind the War', status: 'planned', logline: 'Why the Sick 52 were really made.' },
  { number: 40, arc: 'the-final-remix', title: 'NexaGen\u2019s Hand', status: 'planned', logline: 'A corporate puppeteer is revealed.' },
  { number: 41, arc: 'the-final-remix', title: 'The Council\u2019s Secret', status: 'planned', logline: 'The Harmony Council\u2019s hidden agenda surfaces.' },
  { number: 42, arc: 'the-final-remix', title: 'Rewriting Reality', status: 'planned', logline: 'Sync learns what alignment can truly do.' },
  { number: 43, arc: 'the-final-remix', title: 'The Phantom Awakens', status: 'planned', logline: 'Sync embraces the name they feared: Phantom.' },
  { number: 44, arc: 'the-final-remix', title: 'Final Drop', status: 'planned', logline: 'The Ace of Spades\u2014 the ultimate mutation\u2014 descends.' },
  { number: 45, arc: 'the-final-remix', title: 'The Last Beat', status: 'planned', logline: 'Every guardian, every hour, one rhythm.' },
  { number: 46, arc: 'the-final-remix', title: 'Silence & Sound', status: 'planned', logline: 'The two philosophies collide for good.' },
  { number: 47, arc: 'the-final-remix', title: 'The Remix', status: 'planned', logline: 'Sync rewrites the rules of the war.' },
  { number: 48, arc: 'the-final-remix', title: 'One Sound', status: 'planned', logline: 'What victory costs the city.' },
  { number: 49, arc: 'the-final-remix', title: 'Aftershock', status: 'planned', logline: 'The dust settles\u2014 the Council and NexaGen move.' },
  { number: 50, arc: 'the-final-remix', title: 'The War of Sound', status: 'planned', logline: 'Season finale\u2014 the real war is only beginning.' },
];

export const comics = roadmap.map(ch => {
  const full = Object.values(scripted).find(s => s.number === ch.number);
  return {
    ...ch,
    slug: full ? full.slug : `ch${String(ch.number).padStart(2, '0')}`,
    cover: full ? full.cover : null,
    hasScript: !!full,
  };
});

export function getComicArcs() {
  return comicArcs.map(arc => ({
    ...arc,
    chapters: comics
      .filter(c => c.arc === arc.slug)
      .sort((a, b) => a.number - b.number)
      .map(c => ({ ...c, coverUrl: c.cover ? `/images/comics/${c.cover}` : null })),
  }));
}

export function getComic(slug) {
  const full = scripted[slug];
  if (!full) return null;
  const arc = comicArcs.find(a => a.slug === full.arc);
  const idx = roadmap.findIndex(c => c.number === full.number);
  const prev = idx > 0 ? roadmap[idx - 1] : null;
  const next = idx < roadmap.length - 1 ? roadmap[idx + 1] : null;
  const resolve = (ch) => {
    if (!ch) return null;
    const f = Object.values(scripted).find(s => s.number === ch.number);
    return { number: ch.number, title: ch.title, slug: f ? f.slug : null, hasScript: !!f };
  };
  return {
    ...full,
    arcInfo: arc,
    coverUrl: full.cover ? `/images/comics/${full.cover}` : null,
    pages: full.pages.map(p => ({ ...p, imageUrl: p.image ? `/images/comics/${p.image}` : null })),
    prev: resolve(prev),
    next: resolve(next),
  };
}

export function getPublishedComics() {
  return comics.filter(c => c.hasScript).map(c => ({ ...c, coverUrl: c.cover ? `/images/comics/${c.cover}` : null }));
}
