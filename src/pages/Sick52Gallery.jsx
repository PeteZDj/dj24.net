import { Link } from 'react-router-dom';
import { getSick52ByTier } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Sick52Gallery() {
  const tiers = getSick52ByTier();

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <h1>The Sick 52 — Full Roster</h1>
      <p className="page-intro">
        Once the <Link to="/wiki/sonic-order" className="wiki-link">Sonic Order</Link> — the 52 greatest musicians on{' '}
        <Link to="/universe" className="wiki-link">Planet Ongaku</Link>. Betrayed by the{' '}
        <Link to="/factions/harmony-council" className="wiki-link">Harmony Council</Link>, mutated underground, now ranked in five tiers of power.
      </p>

      {Object.entries(tiers).map(([key, tier]) => (
        <div key={key} className="tier-section" style={{ '--tier-color': tier.color }}>
          <div className="tier-header">
            <div className="tier-header-bar" style={{ background: tier.color }} />
            <h2 className="tier-heading">{tier.name}</h2>
            <p className="tier-desc">{tier.desc}</p>
          </div>

          <div className="sick52-tier-grid">
            {tier.members.map(m => (
              <Link to={`/sick52/${m.slug}`} key={m.slug} className="sick52-card">
                <div className="sick52-card-image">
                  {m.image ? (
                    <img src={m.image} alt={m.name} loading="lazy" />
                  ) : (
                    <div className="sick52-card-placeholder" style={{ background: tier.color + '22' }}>
                      <span>{m.name.charAt(0)}</span>
                    </div>
                  )}
                  <div className="sick52-card-overlay">
                    <span className="sick52-card-rank" style={{ background: tier.color }}>#{m.rank}</span>
                  </div>
                </div>
                <div className="sick52-card-info">
                  <h4>{m.name}</h4>
                  <span className="sick52-card-title">{m.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
