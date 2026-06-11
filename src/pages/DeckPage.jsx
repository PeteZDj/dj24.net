import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getSick52ByHouse } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

function PlayingCard({ m, featured }) {
  const red = m.suit === 'hearts' || m.suit === 'diamonds';
  return (
    <Link
      to={`/sick52/${m.slug}`}
      className={`deck-card ${red ? 'deck-card-red' : 'deck-card-dark'} ${featured ? 'deck-card-featured' : ''}`}
      title={`${m.card} of ${m.suitInfo.name} — ${m.name}`}
    >
      <span className="deck-corner tl">{m.card}<br />{m.suitSymbol}</span>
      <div className="deck-card-art">
        {m.image ? <img src={m.image} alt={m.name} loading="lazy" /> : <span className="deck-card-suit-big">{m.suitSymbol}</span>}
      </div>
      <div className="deck-card-name">{m.name}</div>
      <span className="deck-corner br">{m.card}<br />{m.suitSymbol}</span>
    </Link>
  );
}

export default function DeckPage() {
  const houses = getSick52ByHouse();
  const houseKeys = Object.keys(houses);
  const [active, setActive] = useState('spades');
  const house = houses[active];

  const ace = house.members.find(m => m.card === 'A');
  const faces = ['J', 'Q', 'K'].map(r => house.members.find(m => m.card === r)).filter(Boolean);
  const pips = ['2', '3', '4', '5', '6', '7', '8', '9', '10'].map(r => house.members.find(m => m.card === r)).filter(Boolean);

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <h1>The Sick Deck — Deck of 52</h1>
      <p className="page-intro">
        Every member of the <Link to="/sick52" className="wiki-link">Sick 52</Link> is one card in a four-house deck.
        Inspired by the legendary "Deck of 52" most-wanted system, the roster is dealt into four <strong>Houses</strong>
        of thirteen. <strong>Aces</strong> are the apex bosses, <strong>face cards</strong> are elite generals, and
        <strong> number cards</strong> are the field targets — you hunt the 10 first and climb to the Ace.
        Read the full system on the <Link to="/wiki/the-sick-deck" className="wiki-link">Sick Deck</Link> page.
      </p>

      {/* Suit selector — like the in-game SELECT SUIT screen */}
      <div className="deck-suit-tabs">
        {houseKeys.map(k => {
          const h = houses[k];
          const red = k === 'hearts' || k === 'diamonds';
          return (
            <button
              key={k}
              className={`deck-suit-tab ${active === k ? 'active' : ''} ${red ? 'pip-red' : 'pip-dark'}`}
              style={{ '--suit-color': h.color }}
              onClick={() => setActive(k)}
            >
              <span className="deck-suit-symbol">{h.symbol}</span>
              <span className="deck-suit-name">{h.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active house */}
      <div className="deck-house" style={{ '--house-color': house.color }}>
        <div className="deck-house-header">
          <h2><span style={{ color: house.color }}>{house.symbol}</span> {house.house}</h2>
          <p className="tier-desc">{house.branch} — {house.desc}</p>
        </div>

        <div className="deck-section-label">Ace — Apex Boss</div>
        <div className="deck-row deck-row-ace">
          {ace && <PlayingCard m={ace} featured />}
        </div>

        <div className="deck-section-label">Face Cards — Elite Generals</div>
        <div className="deck-row deck-row-faces">
          {faces.map(m => <PlayingCard key={m.slug} m={m} />)}
        </div>

        <div className="deck-section-label">Number Cards — Field Targets (hunt 10 → 2)</div>
        <div className="deck-row deck-row-pips">
          {pips.map(m => <PlayingCard key={m.slug} m={m} />)}
        </div>
      </div>

      <div className="deck-joker">
        <span className="deck-joker-symbol">🃏</span>
        <div>
          <strong>The Joker</strong> — the wildcard outside the 52. Reserved for the{' '}
          <Link to="/factions/komedians" className="wiki-link">Komedian</Link> incursion: an extra-dimensional threat
          that doesn't play by the deck's rules.
        </div>
      </div>
    </div>
  );
}
