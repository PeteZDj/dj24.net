import { Link } from 'react-router-dom';
import { getDJ24Roster } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

export default function DJ24Roster() {
  const roster = getDJ24Roster();

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <h1>DJ24 — Active Roster (24/24)</h1>
      <p className="page-intro">
        The <Link to="/factions/dj24" className="wiki-link">DJ24</Link> consists of 24 active guardians — one for each hour of the day.
        Elite shinobi-military operatives defending Planet Ongaku.
      </p>

      <div className="dj24-roster-grid">
        {roster.map(member => {
          return (
            <Link to={`/dj24-roster/${member.slug}`} key={member.slug} className="dj24-roster-card" style={{ '--member-color': member.color }}>
              <div className="dj24-roster-visual">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="dj24-roster-img" loading="lazy" />
                ) : (
                  <div className="dj24-roster-hour">
                    <span className="hour-icon">🕒</span>
                    <span className="hour-num">{String(member.hour).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
              <div className="dj24-roster-info">
                <div className="dj24-roster-meta">
                  <span className="hour-mini">HOUR {String(member.hour).padStart(2, '0')}</span>
                </div>
                <h4>{member.name}</h4>
                <span className="dj24-roster-role">{member.role}</span>
              </div>
              <div className="dj24-roster-bar" style={{ background: member.color }} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
