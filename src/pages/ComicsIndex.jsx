import { Link } from 'react-router-dom';
import { getComicArcs } from '../comicsData';
import Breadcrumbs from '../components/Breadcrumbs';

function StatusBadge({ status }) {
  const map = {
    published: { label: 'Read now', cls: 'live' },
    scripting: { label: 'Scripting', cls: 'soon' },
    planned: { label: 'Planned', cls: 'planned' },
  };
  const s = map[status] || map.planned;
  return <span className={`comic-status comic-status-${s.cls}`}>{s.label}</span>;
}

function ChapterCard({ ch, color }) {
  const inner = (
    <>
      <div className="comic-card-cover" style={{ '--arc-color': color }}>
        {ch.coverUrl
          ? <img src={ch.coverUrl} alt={ch.title} loading="lazy" />
          : <span className="comic-card-no">#{ch.number}</span>}
        <span className="comic-card-num">#{String(ch.number).padStart(2, '0')}</span>
        <StatusBadge status={ch.status} />
      </div>
      <div className="comic-card-body">
        <h4>{ch.title}</h4>
        <p>{ch.logline}</p>
      </div>
    </>
  );
  return ch.hasScript
    ? <Link to={`/comics/${ch.slug}`} className="comic-card comic-card-live">{inner}</Link>
    : <div className="comic-card comic-card-locked" title="Coming soon">{inner}</div>;
}

export default function ComicsIndex() {
  const arcs = getComicArcs();
  const featured = arcs[0].chapters.find(c => c.hasScript);

  return (
    <div className="wiki-page comics-index">
      <Breadcrumbs />
      <h1>DJ24: The War of Sound — Webcomic</h1>
      <p className="page-intro">
        The saga as a <strong>cyberpunk-shonen webcomic</strong>: vertical-scroll chapters where the
        DJ battles are drawn as full sound-combat. Season 1 runs <strong>50 chapters across 4 arcs</strong>.
        The opening run is fully scripted and ready to read — start with{' '}
        <Link to="/comics/ch01-the-first-drop" className="wiki-link">Chapter 1</Link>.
      </p>

      {featured && (
        <Link to={`/comics/${featured.slug}`} className="comic-hero" style={{ '--arc-color': arcs[0].color }}>
          {featured.coverUrl && <img src={featured.coverUrl} alt={featured.title} />}
          <div className="comic-hero-overlay">
            <span className="comic-hero-kicker">Start here · Arc 1 · Chapter 1</span>
            <h2>{featured.title}</h2>
            <p>{featured.logline}</p>
            <span className="comic-hero-btn">Read the first chapter →</span>
          </div>
        </Link>
      )}

      {arcs.map(arc => (
        <section key={arc.slug} className="comic-arc" style={{ '--arc-color': arc.color }}>
          <div className="comic-arc-head">
            <span className="comic-arc-no">ARC {arc.no}</span>
            <h2>{arc.title}</h2>
            <span className="comic-arc-range">Chapters {arc.range}</span>
          </div>
          <p className="comic-arc-focus">{arc.focus} <em>· {arc.tone}</em></p>
          <div className="comic-grid">
            {arc.chapters.map(ch => <ChapterCard key={ch.number} ch={ch} color={arc.color} />)}
          </div>
        </section>
      ))}

      <div className="deck-joker">
        <span className="deck-joker-symbol">🎧</span>
        <div>
          Prefer audio? The webcomic shares its story with the{' '}
          <Link to="/wiki/freq-radio-show" className="wiki-link">FREQ Radio Show</Link>. See the full
          concept on the <Link to="/wiki/webcomic" className="wiki-link">Webcomic</Link> page.
        </div>
      </div>
    </div>
  );
}
