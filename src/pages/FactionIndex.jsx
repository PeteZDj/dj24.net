import { Link } from 'react-router-dom';
import { contentIndex } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

export default function FactionIndex() {
  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <h1>Factions</h1>
      <p className="page-intro">Five powers collide in the war for sound. Each with their own vision for Ongaku's future.</p>
      <div className="faction-index-grid">
        {contentIndex.factions.map(f => (
          <Link to={`/factions/${f.slug}`} key={f.slug} className="faction-index-card" style={{ '--faction-color': f.color }}>
            <div className="faction-index-bar" style={{ background: f.color }} />
            <h3>{f.name}</h3>
            <p className="faction-index-tagline">"{f.tagline}"</p>
            <span className="faction-index-link">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
