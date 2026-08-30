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

const statMeta = {
  muscle: { label: 'MUS', full: 'Muscle', desc: 'Capacity and appetite for violence. Street power, crew size, willingness to escalate.', color: '#DC2626' },
  money: { label: 'MON', full: 'Money', desc: 'Earning power — what they bring the table each month through fronts, cuts, and deals.', color: '#C9A227' },
  reach: { label: 'REA', full: 'Reach', desc: 'Influence: who they can call, who owes them, how far their name travels.', color: '#7C3AED' },
  heat: { label: 'HEA', full: 'Heat', desc: 'Law-enforcement attention. High is bad — a liability, not a flex.', color: '#EA580C' },
  loyalty: { label: 'LOY', full: 'Loyalty', desc: 'How solid they are. Low = flip risk. The single most important number in a crime story.', color: '#2563EB' },
  wheels: { label: 'WHL', full: 'Wheels', desc: 'Driving, transport, escape. Garage network and getaway skill.', color: '#0891B2' },
};

const rarityStyles = {
  Legendary: { bg: 'linear-gradient(135deg, #f59e0b, #d97706)', color: '#fff' },
  'Pseudo-Legendary': { bg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: '#fff' },
  Elite: { bg: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: '#fff' },
  Standard: { bg: 'linear-gradient(135deg, #14b8a6, #0d9488)', color: '#fff' },
};

export default function MafiaStatsCard({ stats }) {
  const [tip, setTip] = useState(null);

  if (!stats) {
    return (
      <div className="stats-card-container stats-placeholder">
        <h3>STREET STATS</h3>
        <p>No street data for this card yet.</p>
      </div>
    );
  }

  const total = stats.muscle + stats.money + stats.reach + stats.heat + stats.loyalty + stats.wheels;
  const rs = rarityStyles[stats.rarity] || rarityStyles.Standard;

  return (
    <div className="stats-card-container mafia-stats-card">
      <div className="stats-header">
        <h3>STREET STATS</h3>
        <div className="stats-meta">
          {(stats.type || []).map((t, i) => (
            <span key={i} className="type-chip" style={{
              background: typeColors[t]?.bg || '#888',
              color: typeColors[t]?.text || '#fff',
            }}>{t}</span>
          ))}
          <div className="level-badge">LVL {stats.level}</div>
          <div className="power-total-badge">♠ {total}</div>
        </div>
        <div className="stats-meta" style={{ marginTop: '0.4rem' }}>
          {stats.rarity && (
            <span className="rarity-badge" style={{ background: rs.bg, color: rs.color }}>{stats.rarity}</span>
          )}
          {stats.class && <span className="class-badge">{stats.class}</span>}
        </div>
      </div>

      <div className="stats-grid">
        {Object.keys(statMeta).map(key => {
          const info = statMeta[key];
          const value = stats[key] || 0;
          const pct = Math.min(value, 100);
          return (
            <div className="stat-item" key={key}>
              <label
                className="stat-label-hoverable"
                onMouseEnter={() => setTip(key)}
                onMouseLeave={() => setTip(null)}
              >
                {info.label}
                {tip === key && (
                  <div className="stat-tooltip">
                    <strong>{info.full}</strong>
                    <p>{info.desc}</p>
                  </div>
                )}
              </label>
              <div className="stat-bar-bg">
                <div className="stat-bar-fill" style={{ width: `${pct}%`, backgroundColor: info.color }} />
              </div>
              <span>{value}</span>
            </div>
          );
        })}
      </div>

      {stats.moves?.length > 0 && (
        <div className="moves-table-container">
          <h4>Signature Moves</h4>
          <table className="moves-table">
            <thead>
              <tr><th>Move</th><th>Description</th></tr>
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
