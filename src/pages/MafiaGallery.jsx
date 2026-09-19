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
          <div className="sick52-card-placeholder" style={{
            background: 'radial-gradient(circle, #1a1610 0%, #0c0a08 100%)',
            border: `1px solid ${accent}44`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            textAlign: 'center',
          }}>
            <span style={{ fontSize: '2.5rem', lineHeight: 1, filter: `drop-shadow(0 0 10px ${accent}66)`, color: accent }}>
              {m.houseSymbol}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: 800, marginTop: '0.5rem', letterSpacing: '2px', color: '#f3f4f6' }}>
              {m.card ? `${m.card}${m.houseSymbol}` : 'CLASSIFIED'}
            </span>
            <span style={{ fontSize: '0.6rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.25rem' }}>
              Art in Queue
            </span>
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
  const [filterMode, setFilterMode] = useState('illustrated'); // 'illustrated' (default) or 'all'
  const roster = getMafiaRoster();
  const houses = getMafiaByHouse();

  const displayedRoster = filterMode === 'illustrated' ? roster.filter(m => m.image) : roster;

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

      <div className="sort-bar" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span className="sort-bar-label">Organize by:</span>
          <button type="button" className={`sort-btn ${view === 'houses' ? 'active' : ''}`} onClick={() => setView('houses')}>Card Houses ♠♥♣♦</button>
          <button type="button" className={`sort-btn ${view === 'rank' ? 'active' : ''}`} onClick={() => setView('rank')}>Commission Rank</button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span className="sort-bar-label">Filter:</span>
          <button
            type="button"
            className={`sort-btn ${filterMode === 'illustrated' ? 'active' : ''}`}
            onClick={() => setFilterMode('illustrated')}
            title="Show only characters with completed anime artwork"
          >
            Illustrated Only ({roster.filter(m => m.image).length})
          </button>
          <button
            type="button"
            className={`sort-btn ${filterMode === 'all' ? 'active' : ''}`}
            onClick={() => setFilterMode('all')}
            title="Show full deck roster including unillustrated seats"
          >
            Full Deck ({roster.length})
          </button>
          <Link to="/factions/hip-hop-mafia" className="sort-btn sort-btn-link">Faction Page →</Link>
        </div>
      </div>

      {view === 'houses' && Object.values(houses).map(house => {
        const members = filterMode === 'illustrated'
          ? house.members.filter(m => m.image)
          : house.members;

        if (members.length === 0) return null;

        return (
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
              {members.map(m => <MemberCard key={m.slug} m={m} />)}
            </div>
          </div>
        );
      })}

      {view === 'rank' && (
        <div className="tier-section">
          <div className="tier-header">
            <div className="tier-header-bar" style={{ background: '#C9A227' }} />
            <h2 className="tier-heading">By Commission Rank</h2>
            <p className="tier-desc">
              {filterMode === 'illustrated'
                ? 'Showing all members with completed anime illustrations.'
                : 'Aces and Jokers first. Signed artists sit outside the deck on purpose.'}
            </p>
          </div>
          <div className="sick52-tier-grid">
            {displayedRoster.map(m => <MemberCard key={m.slug} m={m} />)}
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
          {mafiaRestaurants.map(r => (
            <div key={r.slug} className="mafia-restaurant-card" style={{ '--accent': r.color }}>
              <div className="mafia-restaurant-header">
                <img src={r.logo} alt={r.name} className="mafia-restaurant-logo" />
                <div>
                  <h3>{r.name}</h3>
                  <span className="mafia-restaurant-tagline">{r.tagline}</span>
                </div>
              </div>
              <p className="mafia-restaurant-desc">{r.desc}</p>
              {r.tiedTo && (
                <div className="mafia-restaurant-footer">
                  <span className="mafia-restaurant-tied">
                    Primary front for{' '}
                    <Link to={`/hip-hop-mafia/${r.tiedTo}`} className="wiki-link">
                      {r.tiedTo.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </Link>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
