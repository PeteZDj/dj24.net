import { useParams, Link } from 'react-router-dom';
import { getSick52Member, getSick52Roster, previousSick52MemberData } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';
import StatsCard from '../components/StatsCard';
import { characterStatsData } from '../statsData';

export default function Sick52Member() {
  const { slug } = useParams();
  const member = getSick52Member(slug);
  const roster = getSick52Roster();
  const stats = characterStatsData[slug];
  const currentIdx = roster.findIndex(m => m.slug === slug);
  const prev = currentIdx > 0 ? roster[currentIdx - 1] : null;
  const next = currentIdx < roster.length - 1 ? roster[currentIdx + 1] : null;

  if (!member) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Member Not Found</h1>
        <p><Link to="/sick52">Browse the full Sick 52 Roster →</Link></p>
      </div>
    );
  }

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <div className="page-faction-bar" style={{ background: member.tierInfo.color }} />

      <div className="sick52-member-layout">
        <div className="sick52-member-image-wrap">
          {member.image ? (
            <img src={member.image} alt={member.name} />
          ) : (
            <div className="sick52-card-placeholder" style={{ background: member.tierInfo.color + '22', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
              {member.name.charAt(0)}
            </div>
          )}
        </div>
        <div className="sick52-member-info">
          <h1>{member.name}</h1>
          <div className="sick52-member-meta">
            <span className="sick52-member-tier-badge" style={{ background: member.tierInfo.color }}>
              {member.tierInfo.name.split('—')[0].trim()}
            </span>
            <span className="sick52-member-rank">Rank #{member.rank} of 52</span>
          </div>

          <div className="sick52-member-infobox">
            <h3>Profile</h3>
            <table>
              <tbody>
                <tr><td>Rank</td><td>#{member.rank}</td></tr>
                <tr><td>Tier</td><td><span style={{ color: member.tierInfo.color }}>{member.tierInfo.name}</span></td></tr>
                <tr><td>Title</td><td>{member.title}</td></tr>
                <tr><td>Role</td><td>{member.role}</td></tr>
                <tr><td>Faction</td><td><Link to="/factions/sick52" className="wiki-link">The Sick 52</Link></td></tr>
                <tr><td>Status</td><td>Active ({member.tierInfo.accent} Mutation)</td></tr>
                <tr><td>Former Title</td><td><Link to="/wiki/sonic-order" className="wiki-link">Sonic Order</Link> Master</td></tr>
                <tr><td>Allegiance</td><td><Link to="/sick52/red-silence" className="wiki-link">Red Silence</Link></td></tr>
              </tbody>
            </table>
          </div>

          <p className="sick52-member-desc">{member.desc}</p>

          {previousSick52MemberData[slug] && (
            <div className="previous-lore-box" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', borderLeft: '4px solid ' + member.tierInfo.color, borderRadius: '4px' }}>
              <h4 style={{ color: member.tierInfo.color, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px' }}>Previous Incarnation Lore</h4>
              <p style={{ fontStyle: 'italic', fontSize: '0.95rem', color: '#ccc', margin: 0 }}>{previousSick52MemberData[slug]}</p>
            </div>
          )}

          <StatsCard stats={stats} />

          <details className="image-prompt-details">
            <summary>🎨 Nano Banana / AI Image Prompt</summary>
            <div className="image-prompt-box">
              <p>Use this prompt in <strong>Nano Banana</strong>, <strong>Gemini</strong>, or <strong>ComfyUI</strong>:</p>
              <code>{member.prompt}</code>
            </div>
          </details>
        </div>
      </div>

      {/* Navigation */}
      <div className="sick52-member-nav">
        {prev ? (
          <Link to={`/sick52/${prev.slug}`} className="member-nav-btn prev">
            ← {prev.name}
          </Link>
        ) : <div />}
        <Link to="/sick52" className="member-nav-btn roster">All Roster</Link>
        {next ? (
          <Link to={`/sick52/${next.slug}`} className="member-nav-btn next">
            {next.name} →
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
