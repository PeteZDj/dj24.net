import { Link, useLocation } from 'react-router-dom';
import { contentIndex, religionIndex, dj24Roster } from '../contentLoader';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <aside className="wiki-sidebar">
      <div className="sidebar-section">
        <h3 className="sidebar-heading">🌍 World</h3>
        <ul>
          <li><Link to="/universe" className={isActive('/universe') ? 'active' : ''}>Planet Ongaku</Link></li>
          <li><Link to="/wiki/frequency-grid" className={isActive('/wiki/frequency-grid') ? 'active' : ''}>↳ Frequency Grid</Link></li>
          <li><Link to="/wiki/syncopate" className={isActive('/wiki/syncopate') ? 'active' : ''}>↳ The Syncopate</Link></li>
          <li><Link to="/wiki/single-beat-system" className={isActive('/wiki/single-beat-system') ? 'active' : ''}>↳ Single Beat System</Link></li>
          <li><Link to="/wiki/sonic-order" className={isActive('/wiki/sonic-order') ? 'active' : ''}>↳ Sonic Order</Link></li>
          <li><Link to="/wiki/genre-megacities" className={isActive('/wiki/genre-megacities') ? 'active' : ''}>↳ Genre Megacities</Link></li>
          <li><Link to="/wiki/races-and-classes" className={isActive('/wiki/races-and-classes') ? 'active' : ''}>↳ Races & Classes</Link></li>
          <li><Link to="/wiki/power-system" className={isActive('/wiki/power-system') ? 'active' : ''}>↳ Power System</Link></li>
          <li><Link to="/wiki/combat-styles" className={isActive('/wiki/combat-styles') ? 'active' : ''}>↳ Combat Styles</Link></li>
          <li><Link to="/wiki/eras-of-ongaku" className={isActive('/wiki/eras-of-ongaku') ? 'active' : ''}>↳ Eras of Ongaku</Link></li>
          <li><Link to="/timeline" className={isActive('/timeline') ? 'active' : ''}>Timeline</Link></li>
          <li><Link to="/seasons" className={isActive('/seasons') ? 'active' : ''}>Story Arcs</Link></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">📺 Media</h3>
        <ul>
          <li><Link to="/wiki/freq-radio-show" className={isActive('/wiki/freq-radio-show') ? 'active' : ''}>🎧 FREQ Radio Show</Link></li>
          <li><Link to="/wiki/dj-battle-game" className={isActive('/wiki/dj-battle-game') ? 'active' : ''}>🎮 DJ Battle Game</Link></li>
          <li><Link to="/wiki/webcomic" className={isActive('/wiki/webcomic') ? 'active' : ''}>📖 Webcomic</Link></li>
          <li><Link to="/games" className={isActive('/games') ? 'active' : ''}>🕹️ All Games</Link></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">⚔️ Factions</h3>
        <ul>
          {contentIndex.factions.map(f => (
            <li key={f.slug}>
              <Link to={`/factions/${f.slug}`} className={isActive(`/factions/${f.slug}`) ? 'active' : ''}>
                {f.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">👤 Characters</h3>
        <ul>
          {contentIndex.characters.map(c => (
            <li key={c.slug}>
              <Link to={`/characters/${c.slug}`} className={isActive(`/characters/${c.slug}`) ? 'active' : ''}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">🛡️ DJ24 Roster</h3>
        <ul>
          <li><Link to="/dj24-roster" className={isActive('/dj24-roster') && location.pathname === '/dj24-roster' ? 'active' : ''}>Full Roster (24)</Link></li>
          {dj24Roster.slice(0, 8).map(m => (
            <li key={m.slug}>
              <Link to={`/dj24-roster/${m.slug}`} className={isActive(`/dj24-roster/${m.slug}`) ? 'active' : ''}>
                <span className="sidebar-hour">{String(m.hour).padStart(2, '0')}</span> {m.name}
              </Link>
            </li>
          ))}
          <li className="sidebar-more"><Link to="/dj24-roster">View all 24 →</Link></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">💀 Sick 52</h3>
        <ul>
          <li><Link to="/sick52" className={isActive('/sick52') && location.pathname === '/sick52' ? 'active' : ''}>Full Roster Gallery</Link></li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="sidebar-heading">🛐 Religions</h3>
        <ul>
          <li><Link to="/religions" className={isActive('/religions') && location.pathname === '/religions' ? 'active' : ''}>All Religions</Link></li>
          {religionIndex.map(r => (
            <li key={r.slug}>
              <Link to={`/religions/${r.slug}`} className={isActive(`/religions/${r.slug}`) ? 'active' : ''}>
                {r.icon} {r.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </aside>
  );
}
