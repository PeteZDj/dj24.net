// =====================================================================
// PLANET ONGAKU — THE CANON WORLD
//
// /mapgenerator builds a new planet every time you press a button. This is
// the one we kept.
//
// Because the seed is locked, everything below can be authored rather than
// derived: playable levels anchored to real features, provinces drawn around
// real cities, and a road register with real corridors in it. None of it has
// to survive a re-roll, so none of it has to be procedural.
//
// The rule for what belongs here: if it would be wrong on a different world,
// it belongs in this file. If it would be right on any world, it belongs in
// mapGenerator.js.
// =====================================================================

// The world every /map link points at. Changing this is changing the canon.
export const CANON_SEED = 'NEON-GRID-2481';

/* ------------------------------------------------------------ levels */

// Game-ready sites: somewhere a level could be built, what kind of level it is,
// and why it is there rather than somewhere else. `at` resolves against the
// generated world — a settlement, its airport, its port, or a circuit — so a
// level always lands on real geometry rather than on a guessed coordinate.
export const LEVEL_KINDS = {
  hub: { label: 'Hub', icon: '🏙️', color: '#38BDF8', blurb: 'Open district. Free roam, shops, contacts, side work.' },
  mission: { label: 'Mission', icon: '🎯', color: '#F59E0B', blurb: 'Scripted objective in a bounded slice of the world.' },
  heist: { label: 'Heist', icon: '💰', color: '#D4AF37', blurb: 'Plan, execute, escape. Fails loudly.' },
  siege: { label: 'Siege', icon: '🛡️', color: '#34D399', blurb: 'Large-scale assault or defence. Set-piece.' },
  race: { label: 'Race', icon: '🏁', color: '#FB7185', blurb: 'Circuit or point-to-point. Vehicle handling showcase.' },
  chase: { label: 'Chase', icon: '🚗', color: '#FB923C', blurb: 'Pursuit through a corridor of the map.' },
  stealth: { label: 'Stealth', icon: '🕶️', color: '#818CF8', blurb: 'Infiltration. Detection ends the run.' },
  venue: { label: 'Performance', icon: '🎤', color: '#E879F9', blurb: 'Rhythm and performance set-piece.' },
  finale: { label: 'Finale', icon: '💀', color: '#DC2626', blurb: 'Campaign endgame. Everything the player learned, at once.' },
};

// tier: 1 opening, 2 mid-campaign, 3 late, 4 endgame.
export const CANON_LEVELS = [
  {
    id: 'southside-comeup', name: 'The Come-Up', kind: 'hub', tier: 1,
    at: { city: 'Ongaku Prime', quarter: 'Southside' }, faction: 'mafia',
    brief: 'Opening hub. Southside on foot: the barbershop, the community centre, Ma Kade’s kitchen and the first favour you regret.',
  },
  {
    id: 'neon-promotion', name: 'Promotion War', kind: 'venue', tier: 1,
    at: { city: 'Ongaku Prime', quarter: 'Neon District' }, faction: 'mafia',
    brief: 'Three clubs, one night, two promoters who both think the room is theirs. Performance sections between the negotiations.',
  },
  {
    id: 'oldquarter-commission', name: 'First Sunday', kind: 'stealth', tier: 2,
    at: { city: 'Ongaku Prime', quarter: 'Old Quarter' }, faction: 'mafia',
    brief: 'The Commission meets in the back room of Vantaggio’s. Get a wire into it without being the reason somebody dies.',
  },
  {
    id: 'harbour-container', name: 'Container 44', kind: 'heist', tier: 2,
    at: { city: 'Ongaku Prime', port: true }, faction: 'mafia',
    brief: 'One container, a crane window of ninety seconds and a customs officer on the Verrado payroll. The docks level.',
  },
  {
    id: 'prime-speedway', name: 'The Grand Drop', kind: 'race', tier: 2,
    at: { circuit: 0 }, faction: 'neutral',
    brief: 'Season finale at the Speedway. Halcyon’s marketing budget, in public, with money on it.',
  },
  {
    id: 'cloud-circuit', name: 'Cloud Run', kind: 'race', tier: 3,
    at: { circuit: 1 }, faction: 'neutral',
    brief: 'The other circuit, on the other landmass. Ridge weather, long straights, no run-off.',
  },
  {
    id: 'skyport-departure', name: 'Last Flight Out', kind: 'chase', tier: 2,
    at: { city: 'Ongaku Prime', airport: true }, faction: 'mafia',
    brief: 'Somebody is leaving and somebody else has decided they are not. Terminal, apron, then the approach road at speed.',
  },
  {
    id: 'heights-succession', name: 'Succession', kind: 'mission', tier: 3,
    at: { city: 'Ongaku Prime', quarter: 'The Heights' }, faction: 'mafia',
    brief: 'The Chairman’s house, a Sunday, and four people in the room who each think they are the answer.',
  },
  {
    id: 'nexagen-tower', name: 'Twelve Floors', kind: 'stealth', tier: 3,
    at: { city: 'Ongaku Prime', quarter: 'Central District' }, faction: 'nexagen',
    brief: 'NexaGen Tower from the loading bay up. Interior level: lifts, server floors, and a badge that stops working on floor nine.',
  },
  {
    id: 'urban-heartland', name: 'Heartland', kind: 'hub', tier: 2,
    at: { city: 'Urban City' }, faction: 'mafia',
    brief: 'Second hub. The Hip Hop Mafia at home, where the community fund and the protection racket are the same envelope.',
  },
  {
    id: 'sonora-run', name: 'The Sonora Run', kind: 'chase', tier: 2,
    at: { city: 'Port Sonora', port: true }, faction: 'mafia',
    brief: 'Product from the quay to the M1, with the Planetary Security Directorate already on the corridor.',
  },
  {
    id: 'electric-industry', name: 'Grid Down', kind: 'mission', tier: 3,
    at: { city: 'Electric City' }, faction: 'sick52',
    brief: 'The Sick 52 take an Onoska relay offline and the Frequency Grid goes with it. Defend or exploit — the level plays both.',
  },
  {
    id: 'popcity-broadcast', name: 'Dead Air', kind: 'stealth', tier: 3,
    at: { city: 'Pop City' }, faction: 'tower',
    brief: 'Tower Group HQ. Reach the transmitter floor before the nine o’clock bulletin and decide what the planet hears.',
  },
  {
    id: 'tower-extraction', name: 'The Seam', kind: 'mission', tier: 2,
    at: { purpose: 'mine' }, faction: 'tower',
    brief: 'A Tower Extraction mine four hundred kilometres from anyone. A labour dispute, a shift boss and a shaft that should have been closed.',
  },
  {
    id: 'skyport9-assault', name: 'Aero Command', kind: 'siege', tier: 3,
    at: { city: 'Skyport 9' }, faction: 'military',
    brief: 'The siege of Skyport 9. Runway, hangars, hardened shelters — and air support that arrives whether you are ready or not.',
  },
  {
    id: 'trolley-attack', name: 'Attack on Trolley', kind: 'siege', tier: 4,
    at: { city: 'Trolley' }, faction: 'military',
    brief: 'The defence grid, the fortress, the EDM register. The set-piece the whole world bible is pointing at.',
  },
  {
    id: 'hall-of-laughter', name: 'Nothing Is Funny Here', kind: 'mission', tier: 3,
    at: { city: 'Hall of Laughter' }, faction: 'komedian',
    brief: 'Komedian territory, where the level rules stop being reliable. Geometry, objectives and the HUD all lie at least once.',
  },
  {
    id: 'castle-hold', name: 'The Long Table', kind: 'stealth', tier: 4,
    at: { castle: true }, faction: 'neutral',
    brief: 'Get inside an old castle garrison and out again before the relay is missed. The quiet level before the loud one.',
  },
  {
    id: 'last-chord', name: 'The Last Chord', kind: 'finale', tier: 4,
    at: { evilHold: true }, faction: 'sick52',
    brief: 'Black walls, open desert, no reinforcements. Final Drop and the six Founding Dissonants, and the Black Court at the end of it.',
  },
];

/* ---------------------------------------------------------- provinces */

// Provinces are drawn around the settlements that already matter, so the
// administrative map and the story map are the same map.
const PROVINCE_SEATS = [
  { seat: 'Ongaku Prime', name: 'Prime Territory', color: '#F59E0B' },
  { seat: 'Urban City', name: 'The Western Reach', color: '#D4AF37' },
  { seat: 'Rock City', name: 'Northmarch', color: '#94A3B8' },
  { seat: 'Blue City', name: 'The Blue Coast', color: '#38BDF8' },
  { seat: 'Classic City', name: 'The Conservatory', color: '#FB7185' },
  { seat: 'Pop City', name: 'Eastmarch', color: '#A855F7' },
  { seat: 'Electric City', name: 'The Pulse Isles', color: '#0EA5E9' },
  { seat: 'Cloud City', name: 'The Cloud Shelf', color: '#22D3EE' },
];

/* -------------------------------------------------------- resolution */

// Turn the authored anchors above into coordinates on the generated world.
function resolveAnchor(planet, at) {
  if (at.evilHold) {
    const c = planet.cities.find((k) => k.evilHold);
    return c && { x: c.x, y: c.y, city: c, where: c.name };
  }
  if (at.castle) {
    const c = planet.cities.find((k) => k.kind === 'castle' && !k.evilHold);
    return c && { x: c.x, y: c.y, city: c, where: c.name };
  }
  if (at.purpose) {
    const c = planet.cities.find((k) => k.purpose && k.purpose.key === at.purpose);
    return c && { x: c.x, y: c.y, city: c, where: c.name };
  }
  if (at.circuit !== undefined) {
    const k = (planet.circuits || [])[at.circuit];
    return k && { x: k.x, y: k.y, where: k.name };
  }
  const c = planet.cities.find((k) => k.name === at.city);
  if (!c) return null;
  if (at.airport && c.airport) return { x: c.airport.x, y: c.airport.y, city: c, where: c.airport.name };
  if (at.port && c.port) return { x: c.port.x, y: c.port.y, city: c, where: c.port.name };
  if (at.quarter && c.sectors) {
    const sec = c.sectors.find((q) => q.name === at.quarter);
    if (sec) return { x: sec.lx ?? sec.x, y: sec.ly ?? sec.y, city: c, where: `${at.quarter}, ${c.name}` };
  }
  return { x: c.x, y: c.y, city: c, where: c.name };
}

export function buildCanon(planet) {
  const levels = [];
  for (const def of CANON_LEVELS) {
    const anchor = resolveAnchor(planet, def.at);
    if (!anchor) continue;
    levels.push({ ...def, x: anchor.x, y: anchor.y, where: anchor.where, city: anchor.city?.name });
  }

  // Every settlement belongs to the province whose seat is nearest. Simple, and
  // it produces borders that follow the road network because the seats are
  // where the road network already converges.
  const seats = PROVINCE_SEATS
    .map((p) => ({ ...p, city: planet.cities.find((c) => c.name === p.seat) }))
    .filter((p) => p.city);
  const provinces = seats.map((p) => ({ ...p, members: [] }));
  for (const c of planet.cities) {
    let best = 0;
    let bd = Infinity;
    provinces.forEach((p, i) => {
      const d = Math.hypot(p.city.x - c.x, p.city.y - c.y);
      if (d < bd) { bd = d; best = i; }
    });
    if (provinces[best]) provinces[best].members.push(c);
  }
  for (const p of provinces) {
    p.pop = p.members.reduce((t, c) => t + (c.pop || 0), 0);
    p.members.sort((a, b) => (b.pop || 0) - (a.pop || 0));
  }

  // The road register: the numbered network, longest first, ready to list.
  // Class first, then length. A road register reads M, then H, then R — a
  // long trunk road is still a trunk road even when a highway outruns it.
  const CLASS_ORDER = { motorway: 0, highway: 1, road: 2 };
  const register = (planet.routes || [])
    .filter((r) => r.ref && r.ref !== 'Ferry')
    .sort((x, y) => (CLASS_ORDER[x.cls] - CLASS_ORDER[y.cls]) || (y.len || 0) - (x.len || 0));
  const ferries = (planet.routes || []).filter((r) => r.ferry);

  return { levels, provinces, register, ferries };
}
