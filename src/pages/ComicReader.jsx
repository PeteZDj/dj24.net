import { useParams, Link } from 'react-router-dom';
import { getComic } from '../comicsData';
import { loadMarkdown, resolveWikiLink } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';

const DJ24_SLUGS = new Set(['sync', 'general-24', 'molly', 'ninja-nagazaki', 'masterbass', 'subz']);

function charLink(slug) {
  if (!slug) return null;
  return DJ24_SLUGS.has(slug) ? `/dj24-roster/${slug}` : `/sick52/${slug}`;
}

// Render a "Place — Sub-place" setting string with each resolvable part linked.
function LocationText({ text }) {
  if (!text) return null;
  const parts = text.split('—');
  return (
    <>
      {parts.map((part, i) => {
        const trimmed = part.trim();
        const route = resolveWikiLink(trimmed);
        return (
          <span key={i}>
            {i > 0 && ' — '}
            {route ? <Link to={route} className="wiki-link">{trimmed}</Link> : trimmed}
          </span>
        );
      })}
    </>
  );
}

function ArtCaption({ prompt }) {
  if (!prompt) return null;
  return (
    <figcaption className="comic-art-caption">
      <span className="comic-art-caption-label">AI image prompt</span>
      {prompt}
    </figcaption>
  );
}

function ChapterPager({ comic, className = '' }) {
  return (
    <nav className={`comic-nav ${className}`}>
      {comic.prev && comic.prev.hasScript
        ? <Link to={`/comics/${comic.prev.slug}`} className="comic-nav-btn prev">← Ch {comic.prev.number}: {comic.prev.title}</Link>
        : <span className="comic-nav-btn disabled">← Start of season</span>}
      <Link to="/comics" className="comic-nav-btn home">All Chapters</Link>
      {comic.next && comic.next.hasScript
        ? <Link to={`/comics/${comic.next.slug}`} className="comic-nav-btn next">Ch {comic.next.number}: {comic.next.title} →</Link>
        : <span className="comic-nav-btn disabled">{comic.next ? `${comic.next.title} (soon)` : 'Season finale'} →</span>}
    </nav>
  );
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

  const summary = comic.summaryDoc ? loadMarkdown(comic.summaryDoc).content : '';

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
          <span>📍 <LocationText text={comic.setting} /></span>
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

      {/* easy top pager */}
      <ChapterPager comic={comic} className="top" />

      {comic.coverUrl && (
        <figure className="comic-cover-splash">
          <img src={comic.coverUrl} alt={`${comic.title} cover`} />
          <ArtCaption prompt={comic.coverPrompt} />
        </figure>
      )}

      {/* === SUMMARY (article) + CHAPTER INFO (sidebar) === */}
      <div className="comic-article">
        <main className="comic-article-main">
          {summary
            ? <MarkdownRenderer content={summary} />
            : <p className="comic-reader-logline">{comic.logline}</p>}
        </main>

        <aside className="comic-infobox" aria-label="Chapter information">
          <div className="comic-infobox-head">
            <span className="comic-infobox-kicker">Chapter Info</span>
            <span className="comic-infobox-title">{comic.title}</span>
          </div>
          <dl className="infobox-rows">
            <div className="infobox-row"><dt>Series</dt><dd>DJ24: The War of Sound</dd></div>
            <div className="infobox-row"><dt>Arc</dt><dd>Arc {comic.arcInfo?.no} — {comic.arcInfo?.title}</dd></div>
            <div className="infobox-row"><dt>Chapter</dt><dd>#{comic.number}</dd></div>
            <div className="infobox-row"><dt>Setting</dt><dd><LocationText text={comic.setting} /></dd></div>
            <div className="infobox-row"><dt>Pages</dt><dd>{comic.pages.length} pages</dd></div>
            <div className="infobox-row"><dt>Format</dt><dd>Vertical scroll (webtoon)</dd></div>
            <div className="infobox-row">
              <dt>Previous</dt>
              <dd>
                {comic.prev && comic.prev.hasScript
                  ? <Link to={`/comics/${comic.prev.slug}`} className="infobox-chip is-link">{comic.prev.title}</Link>
                  : '—'}
              </dd>
            </div>
            <div className="infobox-row">
              <dt>Next</dt>
              <dd>
                {comic.next && comic.next.hasScript
                  ? <Link to={`/comics/${comic.next.slug}`} className="infobox-chip is-link">{comic.next.title}</Link>
                  : (comic.next ? `${comic.next.title} (soon)` : 'Season finale')}
              </dd>
            </div>
          </dl>

          <InfoboxList label="Debut" items={comic.debut} />
          <InfoboxList label="Signature Moves" items={comic.moves} />
          <InfoboxList label="Locations" items={comic.locations} />
        </aside>
      </div>

      {/* === STORYBOARD (the visual panel-by-panel overview) === */}
      <section className="comic-storyboard">
        <h2 className="comic-storyboard-title">Storyboard — Page by Page</h2>
        <p className="comic-storyboard-note">
          The shot-by-shot visual breakdown of the chapter: panel descriptions, dialogue and sound effects.
        </p>
        <div className="comic-strip">
          {comic.pages.map((page, i) => (
            <section className="comic-page" key={i}>
              <div className="comic-page-tab">PAGE {page.n}{page.title ? ` · ${page.title}` : ''}</div>
              {page.imageUrl && (
                <figure className="comic-page-art">
                  <img src={page.imageUrl} alt={page.title || `Page ${page.n}`} loading="lazy" />
                  <ArtCaption prompt={page.imagePrompt} />
                </figure>
              )}
              <div className="comic-panels">
                {page.panels.map((p, j) => <Panel key={j} p={p} />)}
              </div>
            </section>
          ))}
        </div>
      </section>

      <ChapterPager comic={comic} />
    </div>
  );
}

function InfoboxList({ label, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="infobox-block">
      <div className="infobox-block-label">{label}</div>
      <div className="infobox-chips">
        {items.map((it) => {
          const route = resolveWikiLink(it);
          return route
            ? <Link key={it} to={route} className="infobox-chip is-link">{it}</Link>
            : <span key={it} className="infobox-chip">{it}</span>;
        })}
      </div>
    </div>
  );
}
