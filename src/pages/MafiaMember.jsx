import { useParams, Link } from 'react-router-dom';
import { getMafiaMember, getMafiaRoster } from '../mafiaData';
import Breadcrumbs from '../components/Breadcrumbs';
import MafiaStatsCard from '../components/MafiaStatsCard';

export default function MafiaMember() {
  const { slug } = useParams();
  const member = getMafiaMember(slug);
  const roster = getMafiaRoster();
  const idx = roster.findIndex(m => m.slug === slug);
  const prev = idx > 0 ? roster[idx - 1] : null;
  const next = idx >= 0 && idx < roster.length - 1 ? roster[idx + 1] : null;

  if (!member) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Card Not Found</h1>
        <p><Link to="/hip-hop-mafia">Browse the Hip Hop Mafia roster →</Link></p>
      </div>
    );
  }

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <div className="page-faction-bar" style={{ background: member.houseColor }} />

      <div className="sick52-member-layout">
        <div className="sick52-member-image-wrap">
          {member.image ? (
            <img src={member.image} alt={member.name} />
          ) : (
            <div className="sick52-card-placeholder" style={{
              background: 'radial-gradient(circle, #1a1610 0%, #0c0a08 100%)',
              border: `2px solid ${member.houseColor}55`,
              height: 400,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
              borderRadius: '8px',
            }}>
              <span style={{ fontSize: '5rem', lineHeight: 1, filter: `drop-shadow(0 0 12px ${member.houseColor}66)`, color: member.houseColor }}>
                {member.houseSymbol}
              </span>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '1rem', letterSpacing: '3px', color: '#f3f4f6' }}>
                {member.card ? `${member.card}${member.houseSymbol} · ${member.title.toUpperCase()}` : 'CLASSIFIED'}
              </span>
              <span style={{ fontSize: '0.8rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '0.5rem' }}>
                Character Art In Production Queue
              </span>
            </div>
          )}
        </div>

        <div className="sick52-member-info">
          <h1>{member.name}</h1>
          <p className="mafia-real-name">{member.realName}</p>
          <div className="sick52-member-meta">
            <span className="sick52-member-tier-badge" style={{ background: member.houseColor }}>
              {member.houseInfo.house}
            </span>
            <span className="sick52-member-rank">
              {member.card ? `Card ${member.cardLabel}` : 'Signed — outside the deck'}
            </span>
            <span className={`deck-card-chip ${member.house === 'hearts' || member.house === 'diamonds' ? 'pip-red' : 'pip-dark'}`}>
              {member.cardLabel}
            </span>
          </div>

          <div className="sick52-member-infobox">
            <h3>Profile</h3>
            <table>
              <tbody>
                <tr><td>Alias</td><td>{member.alias}</td></tr>
                <tr><td>Real Name</td><td>{member.realName}</td></tr>
                {member.card && (
                  <tr><td>Card</td><td>{member.cardLabel} · {member.houseInfo.name}</td></tr>
                )}
                <tr><td>House</td><td>{member.houseInfo.house} · {member.houseInfo.branch}</td></tr>
                <tr><td>Title</td><td>{member.title}</td></tr>
                <tr><td>Role</td><td>{member.role}</td></tr>
                <tr>
                  <td>Faction</td>
                  <td><Link to="/factions/hip-hop-mafia" className="wiki-link">Hip Hop Mafia</Link></td>
                </tr>
                <tr>
                  <td>Allegiance</td>
                  <td><Link to="/hip-hop-mafia/grand-verse" className="wiki-link">Grand Verse</Link></td>
                </tr>
                <tr><td>Gun</td><td>{member.gun}</td></tr>
                <tr><td>Car</td><td>{member.car}</td></tr>
                <tr><td>Front</td><td>{member.front}</td></tr>
              </tbody>
            </table>
          </div>

          <p className="sick52-member-desc">{member.desc}</p>

          {member.past && (
            <div className="previous-lore-box" style={{
              marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.04)',
              borderLeft: `4px solid ${member.houseColor}`, borderRadius: 4,
            }}>
              <h4 style={{
                color: member.houseColor, marginBottom: '0.5rem',
                textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px',
              }}>
                Before the Card
              </h4>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#444', margin: 0 }}>{member.past}</p>
            </div>
          )}

          {member.civilian && (
            <div className="previous-lore-box" style={{
              marginTop: '1rem', padding: '1.5rem', background: 'rgba(201,162,39,0.08)',
              borderLeft: '4px solid #C9A227', borderRadius: 4,
            }}>
              <h4 style={{
                color: '#C9A227', marginBottom: '0.5rem',
                textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px',
              }}>
                Civilian Life
              </h4>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#444', margin: 0 }}>{member.civilian}</p>
            </div>
          )}

          <MafiaStatsCard stats={member.stats} />

          {member.prompt && (
            <details className="image-prompt-details">
              <summary>🎨 Image Prompt</summary>
              <div className="image-prompt-box">
                <code>{member.prompt}</code>
              </div>
            </details>
          )}
        </div>
      </div>

      {member.modelSheet && (
        <div className="mafia-model-sheet-container" style={{
          marginTop: '2.5rem',
          padding: '1.5rem',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 0, marginBottom: '0.5rem' }}>
            <span>📐</span> 3D Model & Animation Turnaround Sheet
          </h3>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
            Production-grade orthographic model sheet (Front, Side, Back A-pose views) with costume callouts, weapon schematics, and color swatches for 3D modeling (Blender / Maya / Unity) and AI video generation.
          </p>
          <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.15)', background: '#0a0a0a' }}>
            <img 
              src={member.modelSheet} 
              alt={`${member.name} Turnaround Model Sheet`} 
              style={{ width: '100%', height: 'auto', display: 'block' }} 
            />
          </div>
        </div>
      )}

      <div className="sick52-member-nav">
        {prev ? (
          <Link to={`/hip-hop-mafia/${prev.slug}`} className="member-nav-btn prev">← {prev.name}</Link>
        ) : <div />}
        <Link to="/hip-hop-mafia" className="member-nav-btn roster">All Roster</Link>
        {next ? (
          <Link to={`/hip-hop-mafia/${next.slug}`} className="member-nav-btn next">{next.name} →</Link>
        ) : <div />}
      </div>
    </div>
  );
}
