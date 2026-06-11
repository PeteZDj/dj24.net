import { useParams, Link } from 'react-router-dom';
import { getComic } from '../comicsData';
import Breadcrumbs from '../components/Breadcrumbs';

const DJ24_SLUGS = new Set(['sync', 'general-24', 'molly', 'ninja-nagazaki']);

function charLink(slug) {
  if (!slug) return null;
  return DJ24_SLUGS.has(slug) ? `/dj24-roster/${slug}` : `/sick52/${slug}`;
}

function Panel({ p }) {
  if (p.type === 'sfx') return <div className="panel-sfx">{p.text}</div>;
  if (p.type === 'caption') return <div className="panel-caption">{p.text}</div>;
  if (p.type === 'line') {
    return (
      <div className={`panel-line faction-${p.faction || 'neutral'} mode-${p.mode || 'speak'}`}>
        <span className="panel-speaker">{p.who}</span>
        <span className="panel-bubble">{p.text}</span>
      </div>
    );
  }
  return <p className="panel-desc">{p.text}</p>;
}

export default function ComicReader() {
  const { slug } = useParams();
  const comic = getComic(slug);

  if (!comic) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Chapter Not Found</h1>
        <p>That chapter isn’t scripted yet. <Link to="/comics">Back to the Webcomic →</Link></p>
      </div>
    );
  }

  return (
    <div className="wiki-page comic-reader" style={{ '--arc-color': comic.arcInfo?.color || '#06B6D4' }}>
      <Breadcrumbs />

      <header className="comic-reader-head">
        <span className="comic-reader-kicker">
          Arc {comic.arcInfo?.no}: {comic.arcInfo?.title} · Chapter {comic.number}
        </span>
        <h1>{comic.title}</h1>
        <p className="comic-reader-logline">{comic.logline}</p>
        <div className="comic-reader-meta">
          <span>📍 {comic.setting}</span>
        </div>
        <div className="comic-cast">
          {comic.characters.map(c => {
            const to = charLink(c.slug);
            const chip = (
              <>
                <strong>{c.name}</strong> <span>{c.role}</span>
              </>
            );
            return to
              ? <Link key={c.name} to={to} className="comic-cast-chip">{chip}</Link>
              : <span key={c.name} className="comic-cast-chip">{chip}</span>;
          })}
        </div>
      </header>

      {comic.coverUrl && (
        <div className="comic-cover-splash">
          <img src={comic.coverUrl} alt={`${comic.title} cover`} />
        </div>
      )}

      <div className="comic-strip">
        {comic.pages.map((page, i) => (
          <section className="comic-page" key={i}>
            <div className="comic-page-tab">PAGE {page.n}{page.title ? ` · ${page.title}` : ''}</div>
            {page.imageUrl && (
              <div className="comic-page-art">
                <img src={page.imageUrl} alt={page.title || `Page ${page.n}`} loading="lazy" />
              </div>
            )}
            <div className="comic-panels">
              {page.panels.map((p, j) => <Panel key={j} p={p} />)}
            </div>
          </section>
        ))}
      </div>

      <nav className="comic-nav">
        {comic.prev && comic.prev.hasScript
          ? <Link to={`/comics/${comic.prev.slug}`} className="comic-nav-btn prev">← {comic.prev.title}</Link>
          : <span className="comic-nav-btn disabled">← Start of season</span>}
        <Link to="/comics" className="comic-nav-btn home">All Chapters</Link>
        {comic.next && comic.next.hasScript
          ? <Link to={`/comics/${comic.next.slug}`} className="comic-nav-btn next">{comic.next.title} →</Link>
          : <span className="comic-nav-btn disabled">{comic.next ? `${comic.next.title} (soon)` : 'Season finale'} →</span>}
      </nav>
    </div>
  );
}
