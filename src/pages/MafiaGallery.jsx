import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getMafiaRoster, getMafiaByHouse, mafiaRestaurants } from '../mafiaData';
import Breadcrumbs from '../components/Breadcrumbs';

function MemberCard({ m }) {
  const accent = m.houseColor;
  const isRed = m.house === 'hearts' || m.house === 'diamonds';
  return (
    <Link to={`/hip-hop-mafia/${m.slug}`} className="sick52-card">
      <div className="sick52-card-image">
        {m.image ? (
          <img src={m.image} alt={m.name} loading="lazy" />
        ) : (
          <div className="sick52-card-placeholder" style={{ background: accent + '22' }}>
            <span>{m.name.charAt(0)}</span>
          </div>
        )}
        <div className="sick52-card-overlay">
          <span className="sick52-card-rank" style={{ background: accent }}>
            {m.card ? m.cardLabel : '◎'}
          </span>
        </div>
        {m.card && (
          <span className={`sick52-card-pip ${isRed ? 'pip-red' : 'pip-dark'}`} title={m.cardLabel}>
            {m.card}<span className="pip-suit">{m.houseSymbol}</span>
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

export default function MafiaGallery() {
  const [view, setView] = useState('houses');
  const roster = getMafiaRoster();
  const houses = getMafiaByHouse();

  return (
    <div className="wiki-page">
      <Breadcrumbs />

      <div className="mafia-hero">
        <img src="/images/logos/logo_hip_hop_mafia.png" alt="Hip Hop Mafia" className="mafia-hero-logo" />
        <div>
          <h1>The Hip Hop Mafia — Made Deck</h1>
          <p className="page-intro" style={{ marginBottom: 0 }}>
            Fifty-four cards. Four houses. Two Jokers. Guns, cars, fronts, and Loyalty that can crack.
            They are not mutants — they are a family business. Browse the featured Commission below, or read the dossier on{' '}
            <Link to="/factions/hip-hop-mafia" className="wiki-link">Hip Hop Mafia</Link>.
          </p>
        </div>
      </div>

      <div className="sort-bar">
        <span className="sort-bar-label">Organize by:</span>
        <button type="button" className={`sort-btn ${view === 'houses' ? 'active' : ''}`} onClick={() => setView('houses')}>Card Houses ♠♥♣♦</button>
        <button type="button" className={`sort-btn ${view === 'rank' ? 'active' : ''}`} onClick={() => setView('rank')}>Commission Rank</button>
        <Link to="/factions/hip-hop-mafia" className="sort-btn sort-btn-link">Faction Page →</Link>
      </div>

      {view === 'houses' && Object.values(houses).filter(h => h.members.length > 0).map(house => (
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
            {house.members.map(m => <MemberCard key={m.slug} m={m} />)}
          </div>
        </div>
      ))}

      {view === 'rank' && (
        <div className="tier-section">
          <div className="tier-header">
            <div className="tier-header-bar" style={{ background: '#C9A227' }} />
            <h2 className="tier-heading">By Commission Rank</h2>
            <p className="tier-desc">Aces and Jokers first. Signed artists sit outside the deck on purpose.</p>
          </div>
          <div className="sick52-tier-grid">
            {roster.map(m => <MemberCard key={m.slug} m={m} />)}
          </div>
        </div>
      )}

      <section className="mafia-restaurants">
        <div className="tier-header">
          <div className="tier-header-bar" style={{ background: '#C9A227' }} />
          <h2 className="tier-heading">Restaurant Chains & Fronts</h2>
          <p className="tier-desc">
            The Made Deck eats in public. These rooms are where money moves, votes happen, and late-night scenes write themselves.
          </p>
        </div>
        <div className="mafia-restaurant-grid">
          {mafiaRestaurants.map(r => {
            const tied = roster.find(m => m.slug === r.tiedTo);
            return (
              <article key={r.slug} className="mafia-restaurant-card" style={{ '--rest-color': r.color }}>
                <div className="mafia-restaurant-logo-wrap">
                  <img src={r.logo} alt={`${r.name} logo`} />
                </div>
                <div className="mafia-restaurant-body">
                  <h3>{r.name}</h3>
                  <p className="mafia-restaurant-tag">{r.tagline}</p>
                  <p>{r.desc}</p>
                  {tied && (
                    <Link to={`/hip-hop-mafia/${tied.slug}`} className="wiki-link">
                      Tied to {tied.name} →
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
