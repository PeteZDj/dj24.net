import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getSick52ByTier, getSick52ByHouse, getSick52ByPower } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

function MemberCard({ m, accent }) {
  const isRed = m.suit === 'hearts' || m.suit === 'diamonds';
  return (
    <Link to={`/sick52/${m.slug}`} className="sick52-card">
      <div className="sick52-card-image">
        {m.image ? (
          <img src={m.image} alt={m.name} loading="lazy" />
        ) : (
          <div className="sick52-card-placeholder" style={{ background: accent + '22' }}>
            <span>{m.name.charAt(0)}</span>
          </div>
        )}
        <div className="sick52-card-overlay">
          <span className="sick52-card-rank" style={{ background: accent }}>#{m.rank}</span>
        </div>
        {m.card && (
          <span className={`sick52-card-pip ${isRed ? 'pip-red' : 'pip-dark'}`} title={`${m.card} of ${m.suitInfo?.name}`}>
            {m.card}<span className="pip-suit">{m.suitSymbol}</span>
          </span>
        )}
      </div>
      <div className="sick52-card-info">
        <h4>{m.name}</h4>
        <span className="sick52-card-title">{m.title}</span>
      </div>
    </Link>
  );
}

export default function Sick52Gallery() {
  const [view, setView] = useState('tiers');

  const tiers = getSick52ByTier();
  const houses = getSick52ByHouse();
  const byPower = getSick52ByPower();

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <h1>The Sick 52 — Full Roster</h1>
      <p className="page-intro">
        Once the <Link to="/wiki/sonic-order" className="wiki-link">Sonic Order</Link> — the 52 greatest musicians on{' '}
        <Link to="/universe" className="wiki-link">Planet Ongaku</Link>. Betrayed by the{' '}
        <Link to="/factions/harmony-council" className="wiki-link">Harmony Council</Link>, mutated underground, and dealt
        out as a living <Link to="/wiki/the-sick-deck" className="wiki-link">Deck of 52</Link>.
      </p>

      <div className="sort-bar">
        <span className="sort-bar-label">Organize by:</span>
        <button className={`sort-btn ${view === 'tiers' ? 'active' : ''}`} onClick={() => setView('tiers')}>Power Tiers</button>
        <button className={`sort-btn ${view === 'houses' ? 'active' : ''}`} onClick={() => setView('houses')}>Card Houses ♠♥♣♦</button>
        <button className={`sort-btn ${view === 'power' ? 'active' : ''}`} onClick={() => setView('power')}>Card Strength</button>
        <Link to="/sick-deck" className="sort-btn sort-btn-link">View the Deck →</Link>
      </div>

      {/* ===== POWER TIERS ===== */}
      {view === 'tiers' && Object.entries(tiers).map(([key, tier]) => (
        <div key={key} className="tier-section" style={{ '--tier-color': tier.color }}>
          <div className="tier-header">
            <div className="tier-header-bar" style={{ background: tier.color }} />
            <h2 className="tier-heading">{tier.name}</h2>
            <p className="tier-desc">{tier.desc}</p>
          </div>
          <div className="sick52-tier-grid">
            {tier.members.map(m => <MemberCard key={m.slug} m={m} accent={tier.color} />)}
          </div>
        </div>
      ))}

      {/* ===== CARD HOUSES ===== */}
      {view === 'houses' && Object.values(houses).map(house => (
        <div key={house.key} className="tier-section" style={{ '--tier-color': house.color }}>
          <div className="tier-header">
            <div className="tier-header-bar" style={{ background: house.color }} />
            <h2 className="tier-heading">
              <span style={{ color: house.color }}>{house.symbol}</span> {house.house}{' '}
              <span className="tier-range" style={{ color: house.color }}>· {house.branch}</span>
            </h2>
            <p className="tier-desc">{house.desc}</p>
          </div>
          <div className="sick52-tier-grid">
            {house.members.map(m => <MemberCard key={m.slug} m={m} accent={house.color} />)}
          </div>
        </div>
      ))}

      {/* ===== CARD STRENGTH (flat) ===== */}
      {view === 'power' && (
        <div className="tier-section">
          <div className="tier-header">
            <div className="tier-header-bar" style={{ background: '#7C3AED' }} />
            <h2 className="tier-heading">By Card Strength</h2>
            <p className="tier-desc">All 52, ranked Ace → 10. The four Aces are the apex bosses; the 10s are the first targets you hunt.</p>
          </div>
          <div className="sick52-tier-grid">
            {byPower.map(m => <MemberCard key={m.slug} m={m} accent={m.tierInfo.color} />)}
          </div>
        </div>
      )}
    </div>
  );
}
