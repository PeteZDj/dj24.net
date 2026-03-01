import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { dj24Roster, getSick52Roster, dj24Images, extendedCharacters } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

const colorMap = {
  purple: 'avatar-purple',
  pink: 'avatar-pink',
  cyan: 'avatar-cyan',
  red: 'avatar-red',
  emerald: 'avatar-emerald',
  amber: 'avatar-amber',
};

// Character data normalization
const sick52Roster = getSick52Roster();

const allCharacters = [
  // DJ24 Roster members
  ...dj24Roster.map(m => {
    const filename = dj24Images[m.slug];
    return {
      slug: m.slug,
      name: m.name,
      faction: 'DJ24',
      role: m.role,
      rank: `Hour ${m.hour.toString().padStart(2, '0')}`,
      squad: m.squad,
      desc: m.desc,
      image: filename ? `/images/dj24/${encodeURIComponent(filename)}` : null,
      color: m.hour <= 4 ? 'purple' : (m.hour <= 8 ? 'red' : (m.hour <= 12 ? 'cyan' : (m.hour <= 16 ? 'emerald' : 'amber'))),
      initial: m.name.charAt(0),
      type: 'dj24',
      link: `/dj24-roster/${m.slug}`
    };
  }),
  // Extended Characters (Command, Operatives, Mythic, Nexagen)
  ...extendedCharacters.map(c => ({
    ...c,
    type: 'extended',
    initial: c.name.charAt(0),
    link: `/characters/${c.slug}`
  })),
  // Sick 52 members
  ...sick52Roster.map(m => ({
    slug: m.slug,
    name: m.name,
    faction: 'Sick 52',
    role: m.title || m.role,
    rank: `Rank ${m.rank}`,
    tier: m.tierInfo.name,
    desc: m.desc,
    image: m.image,
    color: 'red',
    initial: m.slug.charAt(0).toUpperCase(),
    type: 'sick52',
    link: `/sick52/${m.slug}`
  }))
];

const factions = ['All', 'DJ24', 'Elite Command Circle', 'Affiliated Operatives', 'The Actual 24', 'NexaGen Harmonics', 'Sick 52'];

export default function CharacterIndex() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFaction, setActiveFaction] = useState('All');

  const filteredCharacters = useMemo(() => {
    return allCharacters.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           c.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (c.desc && c.desc.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFaction = activeFaction === 'All' || c.faction === activeFaction;
      return matchesSearch && matchesFaction;
    }).sort((a, b) => {
        if (a.faction !== b.faction) return a.faction.localeCompare(b.faction);
        const rankA = parseInt(a.rank.replace(/\D/g, ''));
        const rankB = parseInt(b.rank.replace(/\D/g, ''));
        return rankA - rankB;
    });
  }, [searchTerm, activeFaction]);

  return (
    <div className="wiki-page character-index-page">
      <Breadcrumbs />
      <h1>Characters</h1>
      <p className="page-intro">The warriors, rebels, and legends who shape the War of Sound.</p>

      <div className="char-filter-bar">
        <input 
          type="text" 
          placeholder="Search characters, roles, or lore..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="char-search-input"
        />
        <div className="char-faction-filters">
          {factions.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFaction(f)}
              className={`char-filter-btn ${activeFaction === f ? 'active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="char-filter-count">
        Showing {filteredCharacters.length} characters
      </div>

      <div className="char-grid">
        {filteredCharacters.map(c => (
          <Link to={c.link} key={`${c.type}-${c.slug}`} className="char-card">
            <div className="char-card-img-wrap">
              {c.image ? (
                <img src={c.image} alt={c.name} loading="lazy" />
              ) : (
                <div className={`char-card-placeholder ${colorMap[c.color] || 'avatar-purple'}`}>
                  <span>{c.initial}</span>
                </div>
              )}
              <div className="char-card-overlay">
                <span className="char-card-rank">{c.rank}</span>
              </div>
            </div>
            <div className="char-card-body">
              <h4>{c.name}</h4>
              <span className="char-card-role">{c.role}</span>
              <span className="char-card-faction">{c.faction}{c.squad ? ` • ${c.squad}` : ''}</span>
            </div>
          </Link>
        ))}
      </div>

      {filteredCharacters.length === 0 && (
        <div className="char-no-results">
          <p>No characters found matching your criteria.</p>
          <button onClick={() => {setSearchTerm(''); setActiveFaction('All');}} className="char-reset-btn">Clear Filters</button>
        </div>
      )}
    </div>
  );
}
