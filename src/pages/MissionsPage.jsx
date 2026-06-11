import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getStoryMissions, getBounties, getDJ24ByBranch } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

function money(n) {
  return n > 0 ? `$${n.toLocaleString()}` : '—';
}

function BranchChip({ branch }) {
  if (!branch) return null;
  return (
    <span className="branch-chip" style={{ '--branch-color': branch.color }}>
      <span className="branch-chip-icon">{branch.icon}</span> {branch.name}
    </span>
  );
}

export default function MissionsPage() {
  const acts = getStoryMissions();
  const bounties = getBounties();
  const branches = getDJ24ByBranch();
  const houseKeys = Object.keys(bounties);
  const [activeHouse, setActiveHouse] = useState('clubs');

  // group story missions by act, preserving order
  const byAct = acts.reduce((acc, m) => {
    (acc[m.act] = acc[m.act] || []).push(m);
    return acc;
  }, {});

  const house = bounties[activeHouse];

  return (
    <div className="wiki-page missions-page">
      <Breadcrumbs />
      <h1>Missions — The Deck of 52 Bounty War</h1>
      <p className="page-intro">
        <Link to="/wiki/dj24-the-sick-52" className="wiki-link">DJ24: The Sick 52</Link> turns the
        roster into a <strong>most-wanted bounty war</strong>. The 52 enemies are dealt as a{' '}
        <Link to="/sick-deck" className="wiki-link">deck of cards</Link>; you field the four
        <strong> DJ24 branches</strong> — Army, Navy, Airforce, Space Force — and clear a city by
        hunting its cards from the <strong>10</strong> up to the <strong>Ace</strong>.
      </p>

      {/* ===== DJ24 BRANCHES — your forces ===== */}
      <h2 className="section-title">Your Forces — The Four DJ24 Branches</h2>
      <p className="tier-desc">
        Pick the right branch for the house you're hunting. Each branch counters one Sick 52 house.
      </p>
      <div className="branch-grid">
        {branches.map(b => (
          <div key={b.key} className="branch-card" style={{ '--branch-color': b.color }}>
            <div className="branch-card-head">
              <span className="branch-card-icon">{b.icon}</span>
              <div>
                <h3>{b.name}</h3>
                <span className="branch-domain">{b.domain}</span>
              </div>
            </div>
            <p className="branch-desc">{b.desc}</p>
            <div className="branch-counter">
              Counters <strong>{bounties[b.counters]?.house}</strong> {bounties[b.counters]?.symbol}
            </div>
            <div className="branch-members">
              {b.members.map(m => (
                <Link key={m.slug} to={`/dj24-roster/${m.slug}`} className="branch-member" title={m.role}>
                  {m.image && <img src={m.image} alt={m.name} loading="lazy" />}
                  <span>{m.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ===== STORY CAMPAIGN ===== */}
      <h2 className="section-title">Campaign — The Story Missions</h2>
      <p className="tier-desc">The spine of the war, from first contact to the Final Drop.</p>
      <div className="mission-timeline">
        {Object.entries(byAct).map(([act, missions]) => (
          <div key={act} className="mission-act">
            <h3 className="mission-act-title">{act}</h3>
            {missions.map(m => (
              <div key={m.id} className={`mission-row ${m.boss ? 'mission-boss' : ''}`}>
                <div className="mission-no">{m.no}</div>
                <div className="mission-body">
                  <div className="mission-head">
                    <h4>{m.title}{m.boss && <span className="boss-tag">BOSS</span>}</h4>
                    <div className="mission-meta">
                      {m.cityInfo && (
                        <Link to={`/planet_ongaku/cities/${m.cityInfo.slug}`} className="mission-city">
                          📍 {m.cityInfo.name}
                        </Link>
                      )}
                      <BranchChip branch={m.branchInfo} />
                      {m.reward > 0 && <span className="mission-reward">{money(m.reward)}</span>}
                    </div>
                  </div>
                  <p className="mission-objective"><strong>Objective:</strong> {m.objective}</p>
                  <p className="mission-brief">{m.brief}</p>
                  {m.targetMembers.length > 0 && (
                    <div className="mission-targets">
                      {m.targetMembers.map(t => (
                        <Link key={t.slug} to={`/sick52/${t.slug}`} className="mission-target">
                          <span className="mission-target-card">{t.cardLabel}</span>
                          {t.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ===== BOUNTY BOARD ===== */}
      <h2 className="section-title">Bounty Board — All 52 Targets</h2>
      <p className="tier-desc">
        Every card is a repeatable bounty in a city. Work each house from <strong>10 → Ace</strong>.
      </p>
      <div className="deck-suit-tabs">
        {houseKeys.map(k => {
          const h = bounties[k];
          const red = k === 'hearts' || k === 'diamonds';
          return (
            <button
              key={k}
              className={`deck-suit-tab ${activeHouse === k ? 'active' : ''} ${red ? 'pip-red' : 'pip-dark'}`}
              style={{ '--suit-color': h.color }}
              onClick={() => setActiveHouse(k)}
            >
              <span className="deck-suit-symbol">{h.symbol}</span>
              <span className="deck-suit-name">{h.name}</span>
            </button>
          );
        })}
      </div>

      <div className="bounty-house" style={{ '--house-color': house.color }}>
        <div className="bounty-house-head">
          <h3><span style={{ color: house.color }}>{house.symbol}</span> {house.house}</h3>
          {house.counterBranch && (
            <span className="bounty-counter">Best fielded by <BranchChip branch={house.counterBranch} /></span>
          )}
        </div>
        <div className="bounty-list">
          {house.bounties.map(b => (
            <Link key={b.slug} to={`/sick52/${b.slug}`} className={`bounty-row diff-${b.difficulty.key}`}>
              <span className="bounty-order">#{b.order}</span>
              <span className={`bounty-card ${b.suit === 'hearts' || b.suit === 'diamonds' ? 'red' : 'dark'}`}>
                {b.cardLabel}
              </span>
              {b.image
                ? <img className="bounty-thumb" src={b.image} alt={b.name} loading="lazy" />
                : <span className="bounty-thumb bounty-thumb-empty">{b.suitSymbol}</span>}
              <span className="bounty-name">{b.name}</span>
              <span className="bounty-city">📍 {b.city.name}</span>
              <span className={`bounty-diff diff-${b.difficulty.key}`}>{b.difficulty.label}</span>
              <span className="bounty-reward">{money(b.reward)}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="deck-joker">
        <span className="deck-joker-symbol">🃏</span>
        <div>
          <strong>The Joker</strong> — the <Link to="/factions/komedians" className="wiki-link">Komedian</Link>{' '}
          wildcard. It appears outside the deck during the{' '}
          <Link to="/seasons" className="wiki-link">Komedian Invasion</Link> and breaks every rule above.
        </div>
      </div>
    </div>
  );
}
