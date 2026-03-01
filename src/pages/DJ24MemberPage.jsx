import { useParams, Link } from 'react-router-dom';
import { loadMarkdown, dj24Roster, dj24Images } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';
import StatsCard from '../components/StatsCard';
import { characterStatsData } from '../statsData';

export default function DJ24MemberPage() {
  const { slug } = useParams();
  const { content } = loadMarkdown(`dj24-roster/${slug}.md`);
  const member = dj24Roster.find(m => m.slug === slug);
  const stats = characterStatsData[slug];

  if (!member) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Member Not Found</h1>
        <p><Link to="/dj24-roster">Browse the full DJ24 Roster →</Link></p>
      </div>
    );
  }

  const filename = dj24Images[member.slug];
  const imageUrl = filename ? `/images/dj24/${encodeURIComponent(filename)}` : null;

  const idx = dj24Roster.findIndex(m => m.slug === slug);
  const prev = idx > 0 ? dj24Roster[idx - 1] : null;
  const next = idx < dj24Roster.length - 1 ? dj24Roster[idx + 1] : null;

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <div className="page-faction-bar" style={{ background: member.color }} />

      <div className="dj24-member-header">
        <div className="dj24-member-hour-badge" style={{ borderColor: member.color }}>
          <span className="hour-label">HOUR</span>
          <span className="hour-number">{String(member.hour).padStart(2, '0')}</span>
        </div>
        <div>
          <h1>{member.name}</h1>
          <span className="dj24-member-role">{member.role}</span>
        </div>
      </div>

      <div className="sick52-member-layout">
        {imageUrl && (
          <div className="sick52-member-image-wrap">
            <img src={imageUrl} alt={member.name} />
          </div>
        )}
        <div className="sick52-member-info">
          <div className="sick52-member-infobox">
            <h3>Profile</h3>
            <table>
              <tbody>
                <tr><td>Organization</td><td><Link to="/factions/dj24" className="wiki-link">DJ24</Link></td></tr>
                <tr><td>Hour</td><td>{member.hour} of 24</td></tr>
                <tr><td>Role</td><td>{member.role}</td></tr>
                <tr><td>Squad</td><td>{member.squad}</td></tr>
                <tr><td>Status</td><td>Active Guardian</td></tr>
              </tbody>
            </table>
          </div>

          <StatsCard stats={stats} />

          {content ? (
            <MarkdownRenderer content={content} />
          ) : (
            <div className="wiki-content">
              <p><strong>{member.name}</strong> serves as Hour {member.hour} of the <Link to="/factions/dj24" className="wiki-link">DJ24</Link> active roster. {member.desc}</p>
              <p>Role: <strong>{member.role}</strong></p>
              
              {member.prompt && (
                <details className="image-prompt-details">
                  <summary>🎨 Visual Design Concept</summary>
                  <div className="image-prompt-box">
                    <p>Design base for this character:</p>
                    <code>{member.prompt}</code>
                  </div>
                </details>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sick52-member-nav">
        {prev ? (
          <Link to={`/dj24-roster/${prev.slug}`} className="member-nav-btn prev">← {prev.name}</Link>
        ) : <div />}
        <Link to="/dj24-roster" className="member-nav-btn roster">Full Roster</Link>
        {next ? (
          <Link to={`/dj24-roster/${next.slug}`} className="member-nav-btn next">{next.name} →</Link>
        ) : <div />}
      </div>
    </div>
  );
}
