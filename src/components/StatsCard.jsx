import { useState } from 'react';

const typeColors = {
  Normal: { bg: '#A8A878', text: '#fff' },
  Fire: { bg: '#F08030', text: '#fff' },
  Water: { bg: '#6890F0', text: '#fff' },
  Electric: { bg: '#F8D030', text: '#333' },
  Grass: { bg: '#78C850', text: '#fff' },
  Ice: { bg: '#98D8D8', text: '#333' },
  Fighting: { bg: '#C03028', text: '#fff' },
  Poison: { bg: '#A040A0', text: '#fff' },
  Ground: { bg: '#E0C068', text: '#333' },
  Flying: { bg: '#A890F0', text: '#fff' },
  Psychic: { bg: '#F85888', text: '#fff' },
  Bug: { bg: '#A8B820', text: '#fff' },
  Rock: { bg: '#B8A038', text: '#fff' },
  Ghost: { bg: '#705898', text: '#fff' },
  Dragon: { bg: '#7038F8', text: '#fff' },
  Dark: { bg: '#705848', text: '#fff' },
  Steel: { bg: '#B8B8D0', text: '#333' },
  Fairy: { bg: '#EE99AC', text: '#fff' },
};

const statDescriptions = {
  hp: { label: 'HP', full: 'Hit Points', desc: 'The character\'s total vitality and endurance. A higher HP means they can absorb more damage before falling in combat — the raw tankiness that keeps a fighter standing when all else fails.' },
  atk: { label: 'ATK', full: 'Attack', desc: 'Physical striking power. Determines the damage dealt by close-range, brute-force attacks — punches, kicks, blades, and percussion strikes. Characters with high ATK are frontline destroyers.' },
  def: { label: 'DEF', full: 'Defense', desc: 'Physical damage resistance. Reduces incoming damage from physical attacks. High DEF characters are walls — nearly impossible to break through with conventional force.' },
  spAtk: { label: 'SP.ATK', full: 'Special Attack', desc: 'The power behind frequency-based, elemental, and supernatural abilities. Governs energy blasts, sound manipulation, psychic attacks, and all non-physical offensive techniques.' },
  spDef: { label: 'SP.DEF', full: 'Special Defense', desc: 'Resistance to special and frequency-based attacks. High SP.DEF characters can shrug off energy beams, psychic assaults, and elemental barrages that would devastate others.' },
  spd: { label: 'SPD', full: 'Speed', desc: 'Combat speed and reaction time. Determines who strikes first, dodging ability, and how many actions a character can take. The fastest fighters control the tempo of battle entirely.' },
};

const statBarColors = {
  hp: '#6BBE6B',
  atk: '#F08030',
  def: '#F8D030',
  spAtk: '#6890F0',
  spDef: '#78C850',
  spd: '#F85888',
};

export default function StatsCard({ stats }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  if (!stats) {
    return (
      <div className="stats-card-container stats-placeholder">
        <h3>BATTLE STATS</h3>
        <p>No battle data available for this character yet.</p>
      </div>
    );
  }

  const total = stats.total || (stats.hp + stats.atk + stats.def + stats.spAtk + stats.spDef + stats.spd);
  const types = stats.type || [];
  const maxStat = 255; // Pokémon-style max

  const rarityStyles = {
    'Legendary': { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' },
    'Pseudo-Legendary': { bg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: '#fff' },
    'Elite': { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff' },
    'Standard': { bg: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#fff' },
    'Common': { bg: '#6b7280', color: '#fff' },
    'Weak': { bg: '#9ca3af', color: '#fff' },
  };

  const rs = rarityStyles[stats.rarity] || rarityStyles['Common'];

  return (
    <div className="stats-card-container">
      <div className="stats-header">
        <h3>BATTLE STATS</h3>
        <div className="stats-meta">
          {types.map((t, i) => (
            <span key={i} className="type-chip" style={{
              background: typeColors[t]?.bg || '#888',
              color: typeColors[t]?.text || '#fff'
            }}>{t}</span>
          ))}
          <div className="level-badge">LVL {stats.level}</div>
          <div className="power-total-badge">⚡ {total}</div>
        </div>
        <div className="stats-meta" style={{ marginTop: '0.4rem' }}>
          {stats.rarity && (
            <span className="rarity-badge" style={{
              background: rs.bg,
              color: rs.color
            }}>{stats.rarity}</span>
          )}
          {stats.class && (
            <span className="class-badge">{stats.class}</span>
          )}
        </div>
      </div>

      <div className="stats-grid">
        {['hp', 'atk', 'def', 'spAtk', 'spDef', 'spd'].map(key => {
          const info = statDescriptions[key];
          const value = stats[key] || 0;
          const pct = Math.min((value / maxStat) * 100, 100);
          return (
            <div className="stat-item" key={key}>
              <label
                className="stat-label-hoverable"
                onMouseEnter={() => setActiveTooltip(key)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                {info.label}
                {activeTooltip === key && (
                  <div className="stat-tooltip">
                    <strong>{info.full}</strong>
                    <p>{info.desc}</p>
                  </div>
                )}
              </label>
              <div className="stat-bar-bg">
                <div className="stat-bar-fill" style={{
                  width: `${pct}%`,
                  backgroundColor: statBarColors[key]
                }}></div>
              </div>
              <span>{value}</span>
            </div>
          );
        })}
      </div>

      {stats.moves && stats.moves.length > 0 && (
        <div className="moves-table-container">
          <h4>Signature Moves</h4>
          <table className="moves-table">
            <thead>
              <tr>
                <th>Move</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {stats.moves.map((move, i) => (
                <tr key={i}>
                  <td className="move-name">{move.name}</td>
                  <td className="move-desc">{move.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
