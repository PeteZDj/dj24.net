import { Link } from 'react-router-dom';
import { contentIndex } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

export default function FactionIndex() {
  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <h1>Factions</h1>
      <p className="page-intro">
        Six powers collide in the war for sound — and for the streets beneath it. Each with their own vision for Ongaku&apos;s future.
      </p>
      <div className="faction-index-grid">
        {contentIndex.factions.map(f => (
          <Link
            to={`/factions/${f.slug}`}
            key={f.slug}
            className="faction-index-card"
            style={{ '--faction-color': f.color }}
          >
            <div className="faction-index-bar" style={{ background: f.color }} />
            {f.logo && (
              <div className="faction-index-logo-wrap">
                <img src={f.logo} alt="" className="faction-index-logo" />
              </div>
            )}
            <h3>{f.name}</h3>
            <p className="faction-index-tagline">&ldquo;{f.tagline}&rdquo;</p>
            <span className="faction-index-link">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
