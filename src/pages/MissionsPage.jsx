import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getBounties, getDJ24ByBranch } from '../contentLoader';
import { gameMeta, getActsWithEpisodes } from '../missionsData';
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
  const campaign = getActsWithEpisodes();
  const bounties = getBounties();
  const branches = getDJ24ByBranch();
  const houseKeys = Object.keys(bounties);
  const [activeHouse, setActiveHouse] = useState('clubs');
  const firstEp = campaign[0]?.episodes[0];

  const house = bounties[activeHouse];

  return (
    <div className="wiki-page missions-page">
      <Breadcrumbs />

      {/* ===== GAME HERO ===== */}
      <section className="game-hero">
        <img className="game-hero-art" src={gameMeta.cover} alt="DJ24 XD key art" />
        <div className="game-hero-body">
          <span className="game-hero-kicker">Music RPG · Create-your-character · Build-your-city</span>
          <h1>{gameMeta.title} <span className="game-hero-sub">{gameMeta.subtitle}</span></h1>
          <p className="game-hero-tagline">{gameMeta.tagline}</p>
          <p className="game-hero-blurb">{gameMeta.blurb}</p>
          <div className="game-hero-stats">
            <span><strong>{gameMeta.episodeCount}</strong> episodes</span>
            <span><strong>5</strong> acts</span>
            <span><strong>4</strong> regions</span>
          </div>
          {firstEp && (
            <Link to={`/missions/${firstEp.slug}`} className="game-hero-cta">
              ▶ Start — Ep 1: {firstEp.title}
            </Link>
          )}
        </div>
      </section>

      {/* ===== 101-EPISODE CAMPAIGN ===== */}
      <h2 className="section-title">The Campaign — 101 Episodes</h2>
      <p className="tier-desc">
        The story runs across four regions of <Link to="/planet_ongaku" className="wiki-link">Planet Ongaku</Link> —
        the <strong>Flowers</strong>, <strong>Hearts</strong>, <strong>Diamonds</strong> and <strong>Spades</strong> —
        with the payouts climbing every act. Click any episode for its full mission page.
      </p>

      <div className="campaign">
        {campaign.map((act) => (
          <section key={act.key} className="campaign-act" style={{ '--act-color': act.color }}>
            <div className="campaign-act-header">
              <img className="campaign-act-art" src={act.art} alt={`${act.name} key art`} />
              <div className="campaign-act-meta">
                <span className="campaign-act-suit">{act.suit}</span>
                <h3>{act.name}<span className="campaign-act-subtitle">{act.subtitle}</span></h3>
                <p className="campaign-act-region">📍 {act.region}</p>
                <p className="campaign-act-desc">{act.desc}</p>
                <span className="campaign-act-tier">Rewards: {act.rewardTier}</span>
              </div>
            </div>

            <ol className="campaign-list">
              {act.episodes.map((e) => (
                <li key={e.slug}>
                  <Link to={`/missions/${e.slug}`} className={`campaign-row ${e.boss ? 'is-boss' : ''}`}>
                    <span className="campaign-no">{e.no}</span>
                    <span className="campaign-body">
                      <span className="campaign-title">
                        {e.title}
                        {e.boss && <span className="campaign-boss">KEY</span>}
                      </span>
                      <span className="campaign-synopsis">{e.synopsis}</span>
                      <span className="campaign-tags">
                        {e.giver && <span className="campaign-giver">▸ {e.giver}</span>}
                        {e.featuring?.slice(0, 3).map((f) => (
                          <span key={f} className="campaign-feat">{f}</span>
                        ))}
                      </span>
                    </span>
                    <span className="campaign-reward">{money(e.rewardCash)}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      {/* ===== SICK 52 BOUNTY WAR (endgame / multiplayer) ===== */}
      <h2 className="section-title">Endgame — The Sick 52 Bounty War</h2>
      <p className="tier-desc">
        After the story, <Link to="/wiki/dj24-the-sick-52" className="wiki-link">DJ24: The Sick 52</Link> opens the
        roster as a <strong>most-wanted bounty war</strong>. Field the four <strong>DJ24 branches</strong> and clear
        each city by hunting its cards from the <strong>10</strong> up to the <strong>Ace</strong>.
      </p>

      <h3 className="section-title sub">Your Forces — The Four DJ24 Branches</h3>
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

      <h3 className="section-title sub">Bounty Board — All 52 Targets</h3>
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
