import { useParams, Link } from 'react-router-dom';
import { getEpisode, gameMeta } from '../missionsData';
import Breadcrumbs from '../components/Breadcrumbs';

function money(n) {
  return n > 0 ? `$${n.toLocaleString()}` : '—';
}

function Pager({ ep, className = '' }) {
  return (
    <nav className={`mission-nav ${className}`}>
      {ep.prev
        ? <Link to={`/missions/${ep.prev.slug}`} className="mission-nav-btn prev">← Ep {ep.prev.no}: {ep.prev.title}</Link>
        : <span className="mission-nav-btn disabled">← Start</span>}
      <Link to="/missions" className="mission-nav-btn home">All Episodes</Link>
      {ep.next
        ? <Link to={`/missions/${ep.next.slug}`} className="mission-nav-btn next">Ep {ep.next.no}: {ep.next.title} →</Link>
        : <span className="mission-nav-btn disabled">Finale →</span>}
    </nav>
  );
}

export default function MissionPage() {
  const { slug } = useParams();
  const ep = getEpisode(slug);

  if (!ep) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Episode Not Found</h1>
        <p>That episode doesn’t exist yet. <Link to="/missions">Back to the campaign →</Link></p>
      </div>
    );
  }

  const act = ep.actInfo;

  return (
    <div className="wiki-page mission-page" style={{ '--act-color': act.color }}>
      <Breadcrumbs />

      <header className="mission-head">
        <span className="mission-kicker">
          <span className="mission-suit">{act.suit}</span> {act.name} · Episode {ep.no} of {gameMeta.episodeCount}
        </span>
        <h1>{ep.title}{ep.boss && <span className="mission-boss-tag">KEY / BOSS</span>}</h1>
        <p className="mission-tagline">{gameMeta.title} — {act.subtitle}</p>
      </header>

      <Pager ep={ep} className="top" />

      <figure className="mission-hero" style={{ '--act-color': act.color }}>
        <img src={ep.art} alt={`${act.name} key art`} />
        <figcaption>{act.name} — {act.region}</figcaption>
      </figure>

      <div className="mission-article">
        <main className="mission-article-main">
          <p className="mission-synopsis">{ep.synopsis}</p>

          {ep.walkthrough && (
            <>
              <h2>Walkthrough</h2>
              <p>{ep.walkthrough}</p>
            </>
          )}

          <h2>{ep.title}: Mission Objectives</h2>
          <ol className="mission-objectives">
            {ep.objectives.map((o, i) => <li key={i}>{o}</li>)}
          </ol>
        </main>

        <aside className="mission-infobox" aria-label="Mission information">
          <div className="mission-infobox-head">
            <span className="mission-infobox-kicker">Mission Info</span>
            <span className="mission-infobox-title">{ep.title}</span>
          </div>
          <dl className="infobox-rows">
            <div className="infobox-row"><dt>Game</dt><dd>{gameMeta.title}</dd></div>
            <div className="infobox-row"><dt>Episode</dt><dd>#{ep.no}</dd></div>
            <div className="infobox-row"><dt>Act</dt><dd>{act.suit} {act.name}</dd></div>
            <div className="infobox-row"><dt>Region</dt><dd>{act.region}</dd></div>
            <div className="infobox-row"><dt>Mission Giver</dt><dd>{ep.giver || '—'}</dd></div>
            <div className="infobox-row"><dt>Location</dt><dd>{ep.location}</dd></div>
            <div className="infobox-row"><dt>Area</dt><dd>{ep.area}</dd></div>
            <div className="infobox-row"><dt>Reward</dt><dd className="mission-reward">{money(ep.rewardCash)}</dd></div>
          </dl>

          {ep.unlocks && ep.unlocks.length > 0 && (
            <div className="infobox-block">
              <div className="infobox-block-label">Unlocked Items</div>
              <div className="infobox-chips">
                {ep.unlocks.map((u) => <span key={u} className="infobox-chip">{u}</span>)}
              </div>
            </div>
          )}

          {ep.featuring && ep.featuring.length > 0 && (
            <div className="infobox-block">
              <div className="infobox-block-label">Featuring</div>
              <div className="infobox-chips">
                {ep.featuring.map((f) => <span key={f} className="infobox-chip">{f}</span>)}
              </div>
            </div>
          )}

          <div className="infobox-block">
            <div className="infobox-block-label">Navigation</div>
            <div className="infobox-chips">
              {ep.prev && <Link to={`/missions/${ep.prev.slug}`} className="infobox-chip is-link">‹ {ep.prev.title}</Link>}
              {ep.next && <Link to={`/missions/${ep.next.slug}`} className="infobox-chip is-link">{ep.next.title} ›</Link>}
            </div>
          </div>
        </aside>
      </div>

      <Pager ep={ep} />
    </div>
  );
}
