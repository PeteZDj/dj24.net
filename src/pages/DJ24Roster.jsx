import { Link } from 'react-router-dom';
import { getDJ24ByGroup } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

export default function DJ24Roster() {
  const groups = getDJ24ByGroup();

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <h1>DJ24 — Active Roster (24/24)</h1>
      <p className="page-intro">
        The <Link to="/factions/dj24" className="wiki-link">DJ24</Link> consists of 24 active guardians — one for each hour of the day.
        They fight in <strong>six four-member squads</strong>, arranged in order of tactical strength from the command core down to the final failsafe protocols.
      </p>

      {groups.map(group => (
        <div key={group.squad} className="tier-section" style={{ '--tier-color': group.color }}>
          <div className="tier-header">
            <div className="tier-header-bar" style={{ background: group.color }} />
            <h2 className="tier-heading">
              Squad {group.numeral} — {group.name}{' '}
              <span className="tier-range" style={{ color: group.color }}>· {group.range}</span>
            </h2>
            <p className="tier-desc">{group.desc}</p>
          </div>

          <div className="dj24-roster-grid">
            {group.members.map(member => (
              <Link
                to={`/dj24-roster/${member.slug}`}
                key={member.slug}
                className="dj24-roster-card"
                style={{ '--member-color': member.color }}
              >
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
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
