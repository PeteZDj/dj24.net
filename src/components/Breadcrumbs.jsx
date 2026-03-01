import { Link, useLocation } from 'react-router-dom';

const routeLabels = {
  '': 'Home',
  'universe': 'Planet Ongaku',
  'factions': 'Factions',
  'characters': 'Characters',
  'sick52': 'Sick 52 Roster',
  'timeline': 'Timeline',
  'seasons': 'Seasons',
  'games': 'Games',
};

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav className="breadcrumbs">
      <Link to="/">Home</Link>
      {segments.map((seg, i) => {
        const path = '/' + segments.slice(0, i + 1).join('/');
        const label = routeLabels[seg] || seg.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        const isLast = i === segments.length - 1;
        return (
          <span key={path}>
            <span className="breadcrumb-sep">›</span>
            {isLast ? (
              <span className="breadcrumb-current">{label}</span>
            ) : (
              <Link to={path}>{label}</Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
