import { Link } from 'react-router-dom';
import { religionIndex } from '../contentLoader';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ReligionIndex() {
  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <h1>Genre Religions of Ongaku</h1>
      <p className="page-intro">
        On <Link to="/universe" className="wiki-link">Planet Ongaku</Link>, musical genres are religions.
        Each genre carries its own philosophy, clothing, crests, and combat doctrine — shaping politics, identity, and war.
      </p>
      <div className="religion-index-grid">
        {religionIndex.map(r => (
          <Link to={`/religions/${r.slug}`} key={r.slug} className="religion-index-card" style={{ '--religion-color': r.color }}>
            <div className="religion-index-icon">{r.icon}</div>
            <div className="religion-index-bar" style={{ background: r.color }} />
            <h3>{r.name}</h3>
            <span className="religion-index-genre">{r.genre}</span>
            <span className="religion-index-link">Read more →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
