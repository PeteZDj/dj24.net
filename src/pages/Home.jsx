import { Link } from 'react-router-dom';
import { contentIndex, getSick52Roster, getDJ24Roster, religionIndex } from '../contentLoader';

export default function Home() {
  const sick52Preview = getSick52Roster().slice(0, 6);

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">DJ24: War of Sound</h1>
          <p className="hero-subtitle">The definitive fandom wiki for Planet Ongaku</p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">52</span><span className="stat-label">Sick 52 Members</span></div>
            <div className="stat"><span className="stat-num">24</span><span className="stat-label">DJ24 Guardians</span></div>
            <div className="stat"><span className="stat-num">7</span><span className="stat-label">Genre Religions</span></div>
            <div className="stat"><span className="stat-num">5</span><span className="stat-label">Factions</span></div>
          </div>
          <Link to="/universe" className="hero-cta">Explore the Universe →</Link>
        </div>
      </section>

      {/* Category Portals */}
      <section className="category-portals">
        <h2 className="section-title">Explore the Wiki</h2>
        <div className="portal-grid">
          <Link to="/universe" className="portal-card" style={{ '--portal-color': '#4F46E5' }}>
            <span className="portal-icon">🌍</span>
            <h3>Universe</h3>
            <p>Planet Ongaku, the Frequency Grid, and the world of sound</p>
          </Link>
          <Link to="/factions" className="portal-card" style={{ '--portal-color': '#DC2626' }}>
            <span className="portal-icon">⚔️</span>
            <h3>Factions</h3>
            <p>DJ24, Sick 52, Harmony Council, and more</p>
          </Link>
          <Link to="/characters" className="portal-card" style={{ '--portal-color': '#06B6D4' }}>
            <span className="portal-icon">👤</span>
            <h3>Characters</h3>
            <p>Heroes, villains, and legends of Ongaku</p>
          </Link>
          <Link to="/dj24-roster" className="portal-card" style={{ '--portal-color': '#10B981' }}>
            <span className="portal-icon">🛡️</span>
            <h3>DJ24 Roster</h3>
            <p>24 guardians — one for each hour of the day</p>
          </Link>
          <Link to="/sick52" className="portal-card" style={{ '--portal-color': '#7C3AED' }}>
            <span className="portal-icon">💀</span>
            <h3>Sick 52 Roster</h3>
            <p>52 exiled masters — 5 tiers of mutant power</p>
          </Link>
          <Link to="/religions" className="portal-card" style={{ '--portal-color': '#F59E0B' }}>
            <span className="portal-icon">🛐</span>
            <h3>Religions</h3>
            <p>7 genre faiths. Music as doctrine, creed, and war.</p>
          </Link>
          <Link to="/timeline" className="portal-card" style={{ '--portal-color': '#EC4899' }}>
            <span className="portal-icon">📅</span>
            <h3>Timeline</h3>
            <p>The Ages of Ongaku from dawn to war</p>
          </Link>
          <Link to="/games" className="portal-card" style={{ '--portal-color': '#0F172A' }}>
            <span className="portal-icon">🎮</span>
            <h3>Games</h3>
            <p>DJ Battle, DJ VIP, DJ24 — the franchise</p>
          </Link>
        </div>
      </section>

      {/* World Quick Links */}
      <section className="quick-links-section">
        <h2 className="section-title">World Encyclopedia</h2>
        <div className="quick-links-grid">
          <Link to="/wiki/frequency-grid" className="quick-link-chip">⚡ The Frequency Grid</Link>
          <Link to="/wiki/syncopate" className="quick-link-chip">🎵 The Syncopate</Link>
          <Link to="/wiki/single-beat-system" className="quick-link-chip">📜 Single Beat System</Link>
          <Link to="/wiki/sonic-order" className="quick-link-chip">🏛️ Sonic Order</Link>
          <Link to="/wiki/genre-megacities" className="quick-link-chip">🏙️ Genre Megacities</Link>
          <Link to="/wiki/races-and-classes" className="quick-link-chip">🧬 Races & Classes</Link>
          <Link to="/wiki/power-system" className="quick-link-chip">💥 Power System</Link>
          <Link to="/wiki/combat-styles" className="quick-link-chip">⚔️ Combat Styles</Link>
          <Link to="/wiki/eras-of-ongaku" className="quick-link-chip">🕐 Eras of Ongaku</Link>
        </div>
        <h2 className="section-title" style={{ marginTop: '2rem' }}>Media & Projects</h2>
        <div className="quick-links-grid">
          <Link to="/wiki/freq-radio-show" className="quick-link-chip">🎧 FREQ Radio Show</Link>
          <Link to="/wiki/dj-battle-game" className="quick-link-chip">🎮 DJ Battle Game</Link>
          <Link to="/wiki/webcomic" className="quick-link-chip">📖 Webcomic</Link>
        </div>
      </section>

      {/* Sick 52 Preview */}
      <section className="sick52-preview">
        <h2 className="section-title">Sick 52 — Featured Members</h2>
        <div className="sick52-preview-grid">
          {sick52Preview.map(m => (
            <Link to={`/sick52/${m.slug}`} key={m.slug} className="sick52-preview-card">
              <div className="sick52-preview-img-wrap">
                {m.image ? (
                  <img src={m.image} alt={m.name} loading="lazy" />
                ) : (
                  <div className="sick52-card-placeholder"><span>{m.name.charAt(0)}</span></div>
                )}
                <span className="sick52-preview-rank" style={{ background: m.tierInfo.color }}>#{m.rank}</span>
              </div>
              <h4>{m.name}</h4>
              <span className="sick52-preview-title">{m.title}</span>
            </Link>
          ))}
        </div>
        <Link to="/sick52" className="section-more-link">View all 52 members →</Link>
      </section>

      {/* DJ24 Roster Preview */}
      <section className="sick52-preview">
        <h2 className="section-title">DJ24 — Active Roster</h2>
        <div className="sick52-preview-grid">
          {getDJ24Roster().slice(0, 8).map(m => (
            <Link to={`/dj24-roster/${m.slug}`} key={m.slug} className="sick52-preview-card">
              <div className="sick52-preview-img-wrap">
                {m.image ? (
                  <img src={m.image} alt={m.name} loading="lazy" />
                ) : (
                  <div className="sick52-card-placeholder"><span>{m.name.charAt(0)}</span></div>
                )}
                <span className="sick52-preview-rank" style={{ background: m.color }}>
                  {String(m.hour).padStart(2, '0')}h
                </span>
              </div>
              <h4>{m.name}</h4>
              <span className="sick52-preview-title">{m.role}</span>
            </Link>
          ))}
        </div>
        <Link to="/dj24-roster" className="section-more-link">View all 24 guardians →</Link>
      </section>

      {/* Character Quick Cards */}
      <section className="character-quick">
        <h2 className="section-title">Key Characters</h2>
        <div className="character-quick-grid">
          {contentIndex.characters.map(c => (
            <Link to={`/characters/${c.slug}`} key={c.slug} className="character-quick-card">
              <div className={`character-avatar avatar-${c.color}`}>{c.initial}</div>
              <div>
                <h4>{c.name}</h4>
                <span className="character-faction">{c.faction} — {c.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Factions */}
      <section className="faction-links">
        <h2 className="section-title">Factions</h2>
        <div className="faction-grid">
          {contentIndex.factions.map(f => (
            <Link to={`/factions/${f.slug}`} key={f.slug} className="faction-card" style={{ '--faction-color': f.color }}>
              <h3>{f.name}</h3>
              <p className="faction-tagline">{f.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Religion Preview */}
      <section className="religion-preview">
        <h2 className="section-title">Genre Religions</h2>
        <div className="religion-preview-grid">
          {religionIndex.map(r => (
            <Link to={`/religions/${r.slug}`} key={r.slug} className="religion-preview-card" style={{ '--religion-color': r.color }}>
              <span className="religion-preview-icon">{r.icon}</span>
              <h4>{r.name}</h4>
              <span className="religion-preview-genre">{r.genre}</span>
            </Link>
          ))}
        </div>
        <Link to="/religions" className="section-more-link">Explore all religions →</Link>
      </section>
    </div>
  );
}
