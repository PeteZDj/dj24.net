import { Link } from 'react-router-dom';
import { contentIndex, getSick52Roster, getDJ24Roster, religionIndex } from '../contentLoader';
import { gameMeta } from '../missionsData';
import { comicArcs, getPublishedComics } from '../comicsData';

const SCRIPT_FORMATS = [
  {
    id: 'comic',
    icon: '📖',
    name: 'Webcomic Scripts',
    color: '#06B6D4',
    link: '/comics',
    wiki: '/wiki/webcomic',
    status: '10 chapters live · Arc 1 complete',
    audience: 'Visual readers · Webtoon / manhwa fans',
    unit: 'Chapter → Page → Panel',
    format: 'Vertical-scroll manga. Each panel is typed: description, dialogue (who/faction/mode), SFX, or caption. Art prompts ship alongside every illustrated page.',
    canon: 'Sync\'s War of Sound — the anime-season spine. Season 1 = 4 arcs / 50 chapters.',
    where: 'Full scripts in src/comicsData.js · Summaries in content/comics/ · Reader at /comics',
    progress: { done: 10, total: 50, label: 'Season 1 chapters scripted' },
  },
  {
    id: 'game',
    icon: '🎮',
    name: 'Game Scripts (DJ24 XD)',
    color: '#a855f7',
    link: '/missions',
    wiki: '/wiki/dj-battle-game',
    status: '101 episodes · 5 acts · full campaign data',
    audience: 'Players · RPG / GTA-style mission fans',
    unit: 'Episode → Objectives → Rewards',
    format: 'Open-world music RPG missions. Each episode has a title, location, playable character, objectives, unlocks, and payout tier. Acts map to four regions (Flowers → Spades).',
    canon: 'Pete\'s "Z Story" — Kid → General Grievous → Z. A separate protagonist arc that intersects the wider DJ24 universe.',
    where: 'Episode data in src/missionsData.js · Design bible in content/game/ · Mission pages at /missions/ep###',
    progress: { done: 101, total: 101, label: 'Episodes outlined & playable on site' },
  },
  {
    id: 'radio',
    icon: '🎧',
    name: 'Radio Show Scripts (FREQ)',
    color: '#F59E0B',
    link: '/wiki/freq-radio-show',
    wiki: '/wiki/freq-radio-show',
    status: 'Format locked · Episode 01 sample scripted',
    audience: 'Listeners · DJ-mix / podcast / anime-OST fans',
    unit: 'Episode → Segment → Drop',
    format: 'Narrative DJ anime in audio. 30–60 min mixes where bass drops = attacks, filters = counters, and voiceover carries the plot between tracks.',
    canon: 'Same War of Sound timeline as the webcomic — battles dramatized through music rather than panels.',
    where: 'Concept + sample script in content/wiki/freq-radio-show.md · Source notes in docs/source/14-…',
    progress: { done: 1, total: 52, label: 'Sample episodes (weekly format planned)' },
  },
];

const SEASONS = [
  { no: 1, title: 'The Internal War', focus: 'Sync joins DJ24. Sick 52 escalate. The Frequency Grid collapses.', link: '/seasons' },
  { no: 2, title: 'The Komedian Invasion', focus: 'Reality breaks. Sync captured to Planet Joke. Cities become nightmares.', link: '/seasons' },
  { no: 3, title: 'The AI War', focus: 'General 24 allies with AI musicians. Underground culture rises.', link: '/seasons' },
  { no: 4, title: 'The Forgotten Soldiers', focus: 'DJ24 fractures. Sync becomes anti-hero. Galactic politics emerge.', link: '/seasons' },
];

const GAMES = [
  { era: 'Low-Res', title: 'DJ Battle', genre: 'Tactical rhythm combat', desc: 'Build your dojo, train fighters, 1v1 DJ battles in the Golden Age.' },
  { era: 'Early-HD', title: 'DJ VIP', genre: 'Narrative social sim', desc: 'Fame, corruption, and the industry\'s fall from grace.' },
  { era: 'XD', title: 'DJ24 XD', genre: 'Open-world action RPG', desc: 'The Z Story — 101-episode campaign. Build your city, become the villain.', link: '/missions' },
  { era: 'Mid-XD', title: 'DJ24: The Sick 52', genre: 'Squad tactics', desc: 'City-control warfare. Pick DJ24 or the Sick 52.' },
  { era: 'Galactic', title: 'Planet Ongaku', genre: 'Space 4X strategy', desc: 'Explore the cosmos. Music-based interstellar war.' },
];

const MILESTONES = [
  { done: true, label: 'Full wiki: 52 Sick 52 + 24 DJ24 rosters, factions, religions, cities' },
  { done: true, label: 'Webcomic Arc 1 (Ch 1–10) fully scripted with illustrated reader' },
  { done: true, label: '50-chapter Season 1 roadmap + Deck of 52 bounty game on /missions' },
  { done: true, label: 'DJ24 XD: 101-episode campaign + per-episode mission pages' },
  { done: true, label: 'Game design docs organized in content/game/ (story bible → episode guide)' },
  { done: false, label: 'FREQ Radio Show — weekly episode production' },
  { done: false, label: 'Webcomic Arc 2 scripting (Ch 11–20: The Echo Revolt)' },
  { done: false, label: 'DJ24 XD playable prototype (Unity / engine TBD)' },
];

function ProgressBar({ done, total, color }) {
  const pct = Math.round((done / total) * 100);
  return (
    <div className="home-progress">
      <div className="home-progress-track">
        <div className="home-progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="home-progress-label">{done} / {total} ({pct}%)</span>
    </div>
  );
}

export default function Home() {
  const sick52Preview = getSick52Roster().slice(0, 6);
  const publishedComics = getPublishedComics();

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content">
          <h1 className="hero-title">DJ24: War of Sound</h1>
          <p className="hero-subtitle">
            The definitive fandom wiki for Planet Ongaku — lore, rosters, three script formats,
            and every active media project in one place.
          </p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">52</span><span className="stat-label">Sick 52 Members</span></div>
            <div className="stat"><span className="stat-num">24</span><span className="stat-label">DJ24 Guardians</span></div>
            <div className="stat"><span className="stat-num">7</span><span className="stat-label">Genre Religions</span></div>
            <div className="stat"><span className="stat-num">5</span><span className="stat-label">Factions</span></div>
            <div className="stat"><span className="stat-num">10</span><span className="stat-label">Comic Chapters Live</span></div>
            <div className="stat"><span className="stat-num">101</span><span className="stat-label">Game Episodes</span></div>
          </div>
          <div className="hero-cta-row">
            <Link to="/planet_ongaku" className="hero-cta">Explore the Universe →</Link>
            <Link to="/comics/ch01-the-first-drop" className="hero-cta hero-cta-alt">Read Chapter 1 →</Link>
            <Link to="/missions" className="hero-cta hero-cta-alt">Play the Campaign →</Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="home-about">
        <h2 className="section-title">What Is DJ24: War of Sound?</h2>
        <div className="home-prose">
          <p>
            On <strong>Planet Ongaku</strong>, music is not entertainment — it is <em>power</em>.
            The <Link to="/wiki/frequency-grid" className="wiki-link">Frequency Grid</Link> shapes
            reality itself. Those who master sound control the fate of worlds; those who break the
            beat can erase existence.
          </p>
          <p>
            <strong>DJ24: War of Sound</strong> is petezdj&apos;s multimedia franchise spanning anime,
            video games, webcomics, manga, and a narrative radio show. This wiki is the central hub:
            every character, faction, city, timeline event, and script format lives here and cross-links.
          </p>
          <p>
            The core conflict pits the elite <Link to="/dj24-roster" className="wiki-link">DJ24 guardians</Link> — one
            warrior per hour of the day — against the exiled <Link to="/sick52" className="wiki-link">Sick 52</Link>,
            once the galaxy&apos;s greatest musicians, now mutated and seeking revenge against the{' '}
            <Link to="/factions/harmony-council" className="wiki-link">Harmony Council</Link> that betrayed them 200 years ago.
            Behind both sides lurk the <Link to="/factions/nexagen" className="wiki-link">NexaGen</Link> corporation,
            the authoritarian <Link to="/wiki/single-beat-system" className="wiki-link">Single Beat System</Link>,
            and the interdimensional <strong>Komedians</strong> who rewrite reality into absurdist nightmares.
          </p>
        </div>
      </section>

      {/* Three Script Formats */}
      <section className="home-scripts">
        <h2 className="section-title">Three Script Formats — One Universe</h2>
        <p className="home-section-lead">
          The War of Sound is told through <strong>three different script types</strong>. They share
          canon characters and factions but serve different audiences and production pipelines.
        </p>

        <div className="script-compare-table-wrap">
          <table className="script-compare-table">
            <thead>
              <tr>
                <th>Format</th>
                <th>Best for</th>
                <th>Script unit</th>
                <th>Canon spine</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {SCRIPT_FORMATS.map((f) => (
                <tr key={f.id}>
                  <td><Link to={f.link} className="wiki-link">{f.icon} {f.name}</Link></td>
                  <td>{f.audience}</td>
                  <td><code>{f.unit}</code></td>
                  <td>{f.canon}</td>
                  <td><span className="script-status-badge" style={{ '--badge-color': f.color }}>{f.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="script-format-grid">
          {SCRIPT_FORMATS.map((f) => (
            <article key={f.id} className="script-format-card" style={{ '--card-color': f.color }}>
              <div className="script-format-head">
                <span className="script-format-icon">{f.icon}</span>
                <div>
                  <h3>{f.name}</h3>
                  <span className="script-format-status">{f.status}</span>
                </div>
              </div>
              <p className="script-format-desc">{f.format}</p>
              <dl className="script-format-meta">
                <dt>Canon</dt><dd>{f.canon}</dd>
                <dt>Source files</dt><dd><code>{f.where}</code></dd>
              </dl>
              <ProgressBar done={f.progress.done} total={f.progress.total} color={f.color} />
              <span className="script-format-progress-label">{f.progress.label}</span>
              <div className="script-format-links">
                <Link to={f.link} className="script-format-cta">Open {f.id === 'game' ? 'campaign' : f.id === 'comic' ? 'reader' : 'show page'} →</Link>
                <Link to={f.wiki} className="script-format-wiki">Wiki article</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Media */}
      <section className="home-featured-media">
        <h2 className="section-title">Featured Media Projects</h2>
        <div className="featured-media-grid">
          <Link to="/comics/ch01-the-first-drop" className="featured-media-card" style={{ '--fm-color': '#06B6D4' }}>
            <span className="featured-media-kicker">Webcomic · Arc 1 complete</span>
            <h3>The War of Sound — Chapters 1–10</h3>
            <p>
              Cyberpunk-shonen vertical scroll. Sync&apos;s first drop against Red Silence in the Echo Arena.
              Panel-by-panel scripts, AI art, and wiki summaries for every chapter.
            </p>
            <span className="featured-media-stat">{publishedComics.length} chapters readable now</span>
          </Link>
          <Link to="/missions" className="featured-media-card" style={{ '--fm-color': '#a855f7' }}>
            <span className="featured-media-kicker">Music RPG · {gameMeta.title}</span>
            <h3>{gameMeta.subtitle} — 101 Episodes</h3>
            <p>{gameMeta.blurb}</p>
            <span className="featured-media-stat">{gameMeta.episodeCount} mission pages · 5 acts · build-your-city</span>
          </Link>
          <Link to="/wiki/freq-radio-show" className="featured-media-card" style={{ '--fm-color': '#F59E0B' }}>
            <span className="featured-media-kicker">Narrative DJ Anime · Audio</span>
            <h3>FREQ: The War of Sound</h3>
            <p>
              Weekly DJ mixes where every drop is an attack and every filter is a counter.
              Same battles as the webcomic — told through electro, DnB, and anime-OST energy.
            </p>
            <span className="featured-media-stat">Episode structure + sample script ready</span>
          </Link>
        </div>
      </section>

      {/* Webcomic Arcs */}
      <section className="home-comic-arcs">
        <h2 className="section-title">Webcomic — Season 1 Roadmap</h2>
        <p className="home-section-lead">
          Four arcs, 50 chapters. Chapters 1–10 (<strong>The First Drop</strong>) are fully scripted
          and illustrated. Chapters 11–50 are loglined and locked on the roadmap.
        </p>
        <div className="comic-arc-strip">
          {comicArcs.map((arc) => (
            <div key={arc.slug} className="comic-arc-pill" style={{ '--arc-color': arc.color }}>
              <span className="comic-arc-pill-no">Arc {arc.no}</span>
              <strong>{arc.title}</strong>
              <span className="comic-arc-pill-range">Ch. {arc.range}</span>
              <p>{arc.focus}</p>
            </div>
          ))}
        </div>
        <Link to="/comics" className="section-more-link">Browse all chapters in the reader →</Link>
      </section>

      {/* Game Acts */}
      <section className="home-game-acts">
        <h2 className="section-title">DJ24 XD — The Z Story</h2>
        <p className="home-section-lead">
          A <em>different protagonist</em> (Pete) on a hero-to-villain arc: Kid → General Grievous → Z.
          Game scripts are mission briefs — not panels — built for open-world RPG play.
        </p>
        <div className="game-act-strip">
          <div className="game-act-pill" style={{ '--act-color': '#a855f7' }}>
            <span>◇ Prologue</span><strong>The Pilot</strong><em>9 eps · Hometown</em>
          </div>
          <div className="game-act-pill" style={{ '--act-color': '#f97316' }}>
            <span>❀ Act I — Flowers</span><strong>The Come-Up</strong><em>23 eps · Home turf</em>
          </div>
          <div className="game-act-pill" style={{ '--act-color': '#ec4899' }}>
            <span>♥ Act II — Hearts</span><strong>Royal Music School</strong><em>24 eps · Scholarship</em>
          </div>
          <div className="game-act-pill" style={{ '--act-color': '#eab308' }}>
            <span>♦ Act III — Diamonds</span><strong>Billionaire X</strong><em>22 eps · Industry empire</em>
          </div>
          <div className="game-act-pill" style={{ '--act-color': '#38bdf8' }}>
            <span>♠ Act IV — Spades</span><strong>Regicide</strong><em>23 eps · Ongaku Prime</em>
          </div>
        </div>
        <p className="home-section-lead">
          Design docs: <Link to="/wiki/dj-battle-game" className="wiki-link">DJ Battle</Link> franchise overview ·
          full bible in <code>content/game/</code> · playable data at <Link to="/missions" className="wiki-link">/missions</Link>
        </p>
        <Link to="/missions" className="section-more-link">Start Episode 1: In the Beginning →</Link>
      </section>

      {/* Project Status */}
      <section className="home-roadmap">
        <h2 className="section-title">Where We Are — Project Status</h2>
        <ul className="roadmap-list">
          {MILESTONES.map((m, i) => (
            <li key={i} className={m.done ? 'roadmap-done' : 'roadmap-todo'}>
              <span className="roadmap-check">{m.done ? '✓' : '○'}</span>
              {m.label}
            </li>
          ))}
        </ul>
      </section>

      {/* Category Portals */}
      <section className="category-portals">
        <h2 className="section-title">Explore the Wiki</h2>
        <div className="portal-grid">
          <Link to="/planet_ongaku" className="portal-card" style={{ '--portal-color': '#4F46E5' }}>
            <span className="portal-icon">🌍</span>
            <h3>Planet Ongaku</h3>
            <p>The Frequency Grid, genre megacities, and the world of sound</p>
          </Link>
          <Link to="/factions" className="portal-card" style={{ '--portal-color': '#DC2626' }}>
            <span className="portal-icon">⚔️</span>
            <h3>Factions</h3>
            <p>DJ24, Sick 52, Harmony Council, NexaGen, Komedians</p>
          </Link>
          <Link to="/characters" className="portal-card" style={{ '--portal-color': '#06B6D4' }}>
            <span className="portal-icon">👤</span>
            <h3>Characters</h3>
            <p>Heroes, villains, and legends of Ongaku</p>
          </Link>
          <Link to="/dj24-roster" className="portal-card" style={{ '--portal-color': '#10B981' }}>
            <span className="portal-icon">🛡️</span>
            <h3>DJ24 Roster</h3>
            <p>24 guardians — one for each hour of the day</p>
          </Link>
          <Link to="/sick52" className="portal-card" style={{ '--portal-color': '#7C3AED' }}>
            <span className="portal-icon">💀</span>
            <h3>Sick 52 Roster</h3>
            <p>52 exiled masters — 5 tiers of mutant power</p>
          </Link>
          <Link to="/comics" className="portal-card" style={{ '--portal-color': '#06B6D4' }}>
            <span className="portal-icon">📖</span>
            <h3>Webcomic</h3>
            <p>10 scripted chapters · 50-chapter Season 1 roadmap</p>
          </Link>
          <Link to="/missions" className="portal-card" style={{ '--portal-color': '#a855f7' }}>
            <span className="portal-icon">🎯</span>
            <h3>DJ24 XD Campaign</h3>
            <p>101-episode music RPG · mission pages + bounty deck</p>
          </Link>
          <Link to="/religions" className="portal-card" style={{ '--portal-color': '#F59E0B' }}>
            <span className="portal-icon">🛐</span>
            <h3>Religions</h3>
            <p>7 genre faiths. Music as doctrine, creed, and war.</p>
          </Link>
          <Link to="/timeline" className="portal-card" style={{ '--portal-color': '#EC4899' }}>
            <span className="portal-icon">📅</span>
            <h3>Timeline</h3>
            <p>The Ages of Ongaku from dawn to war</p>
          </Link>
          <Link to="/seasons" className="portal-card" style={{ '--portal-color': '#8B5CF6' }}>
            <span className="portal-icon">📺</span>
            <h3>Seasons</h3>
            <p>4-season anime arc from internal war to galactic politics</p>
          </Link>
          <Link to="/games" className="portal-card" style={{ '--portal-color': '#0F172A' }}>
            <span className="portal-icon">🎮</span>
            <h3>Games</h3>
            <p>DJ Battle, DJ VIP, DJ24 XD — five eras of play</p>
          </Link>
          <Link to="/sick-deck" className="portal-card" style={{ '--portal-color': '#DC2626' }}>
            <span className="portal-icon">🃏</span>
            <h3>Sick Deck</h3>
            <p>52 members as a deck of cards — bounty war game</p>
          </Link>
        </div>
      </section>

      {/* Story Seasons */}
      <section className="home-seasons">
        <h2 className="section-title">Story Seasons — The Anime Spine</h2>
        <p className="home-section-lead">
          The webcomic and FREQ radio show follow this four-season structure. The game (DJ24 XD) runs
          a parallel protagonist arc that eventually intersects the meta-war.
        </p>
        <div className="season-grid">
          {SEASONS.map((s) => (
            <Link to={s.link} key={s.no} className="season-card">
              <span className="season-no">Season {s.no}</span>
              <h3>{s.title}</h3>
              <p>{s.focus}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Games Franchise */}
      <section className="home-games-franchise">
        <h2 className="section-title">The Games — Five Eras of Ongaku</h2>
        <div className="games-era-grid">
          {GAMES.map((g) => (
            g.link
              ? <Link to={g.link} key={g.title} className="games-era-card games-era-live">
                  <span className="games-era-label">{g.era}</span>
                  <h3>{g.title}</h3>
                  <span className="games-era-genre">{g.genre}</span>
                  <p>{g.desc}</p>
                  <span className="games-era-cta">Campaign live →</span>
                </Link>
              : <div key={g.title} className="games-era-card">
                  <span className="games-era-label">{g.era}</span>
                  <h3>{g.title}</h3>
                  <span className="games-era-genre">{g.genre}</span>
                  <p>{g.desc}</p>
                </div>
          ))}
        </div>
        <Link to="/games" className="section-more-link">Full games overview →</Link>
      </section>

      {/* World Quick Links */}
      <section className="quick-links-section">
        <h2 className="section-title">World Encyclopedia</h2>
        <div className="quick-links-grid">
          <Link to="/wiki/frequency-grid" className="quick-link-chip">⚡ The Frequency Grid</Link>
          <Link to="/wiki/syncopate" className="quick-link-chip">🎵 The Syncopate</Link>
          <Link to="/wiki/single-beat-system" className="quick-link-chip">📜 Single Beat System</Link>
          <Link to="/wiki/sonic-order" className="quick-link-chip">🏛️ Sonic Order</Link>
          <Link to="/wiki/genre-megacities" className="quick-link-chip">🏙️ Genre Megacities</Link>
          <Link to="/wiki/races-and-classes" className="quick-link-chip">🧬 Races & Classes</Link>
          <Link to="/wiki/power-system" className="quick-link-chip">💥 Power System</Link>
          <Link to="/wiki/combat-styles" className="quick-link-chip">⚔️ Combat Styles</Link>
          <Link to="/wiki/eras-of-ongaku" className="quick-link-chip">🕐 Eras of Ongaku</Link>
          <Link to="/wiki/the-sick-deck" className="quick-link-chip">🃏 The Sick Deck</Link>
        </div>
        <h2 className="section-title" style={{ marginTop: '2rem' }}>Media & Scripts</h2>
        <div className="quick-links-grid">
          <Link to="/comics" className="quick-link-chip">📖 Webcomic Reader</Link>
          <Link to="/missions" className="quick-link-chip">🎮 DJ24 XD Missions</Link>
          <Link to="/wiki/freq-radio-show" className="quick-link-chip">🎧 FREQ Radio Show</Link>
          <Link to="/wiki/webcomic" className="quick-link-chip">📝 Webcomic Concept</Link>
          <Link to="/wiki/dj-battle-game" className="quick-link-chip">🎮 DJ Battle Game</Link>
        </div>
      </section>

      {/* Sick 52 Preview */}
      <section className="sick52-preview">
        <h2 className="section-title">Sick 52 — Featured Members</h2>
        <div className="sick52-preview-grid">
          {sick52Preview.map(m => (
            <Link to={`/sick52/${m.slug}`} key={m.slug} className="sick52-preview-card">
              <div className="sick52-preview-img-wrap">
                {m.image ? (
                  <img src={m.image} alt={m.name} loading="lazy" />
                ) : (
                  <div className="sick52-card-placeholder"><span>{m.name.charAt(0)}</span></div>
                )}
                <span className="sick52-preview-rank" style={{ background: m.tierInfo.color }}>#{m.rank}</span>
              </div>
              <h4>{m.name}</h4>
              <span className="sick52-preview-title">{m.title}</span>
            </Link>
          ))}
        </div>
        <Link to="/sick52" className="section-more-link">View all 52 members →</Link>
      </section>

      {/* DJ24 Roster Preview */}
      <section className="sick52-preview">
        <h2 className="section-title">DJ24 — Active Roster</h2>
        <div className="sick52-preview-grid">
          {getDJ24Roster().slice(0, 8).map(m => (
            <Link to={`/dj24-roster/${m.slug}`} key={m.slug} className="sick52-preview-card">
              <div className="sick52-preview-img-wrap">
                {m.image ? (
                  <img src={m.image} alt={m.name} loading="lazy" />
                ) : (
                  <div className="sick52-card-placeholder"><span>{m.name.charAt(0)}</span></div>
                )}
                <span className="sick52-preview-rank" style={{ background: m.color }}>
                  {String(m.hour).padStart(2, '0')}h
                </span>
              </div>
              <h4>{m.name}</h4>
              <span className="sick52-preview-title">{m.role}</span>
            </Link>
          ))}
        </div>
        <Link to="/dj24-roster" className="section-more-link">View all 24 guardians →</Link>
      </section>

      {/* Character Quick Cards */}
      <section className="character-quick">
        <h2 className="section-title">Key Characters</h2>
        <div className="character-quick-grid">
          {contentIndex.characters.map(c => (
            <Link to={`/characters/${c.slug}`} key={c.slug} className="character-quick-card">
              <div className={`character-avatar avatar-${c.color}`}>{c.initial}</div>
              <div>
                <h4>{c.name}</h4>
                <span className="character-faction">{c.faction} — {c.role}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Factions */}
      <section className="faction-links">
        <h2 className="section-title">Factions</h2>
        <div className="faction-grid">
          {contentIndex.factions.map(f => (
            <Link to={`/factions/${f.slug}`} key={f.slug} className="faction-card" style={{ '--faction-color': f.color }}>
              <h3>{f.name}</h3>
              <p className="faction-tagline">{f.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Religion Preview */}
      <section className="religion-preview">
        <h2 className="section-title">Genre Religions</h2>
        <div className="religion-preview-grid">
          {religionIndex.map(r => (
            <Link to={`/religions/${r.slug}`} key={r.slug} className="religion-preview-card" style={{ '--religion-color': r.color }}>
              <span className="religion-preview-icon">{r.icon}</span>
              <h4>{r.name}</h4>
              <span className="religion-preview-genre">{r.genre}</span>
            </Link>
          ))}
        </div>
        <Link to="/religions" className="section-more-link">Explore all religions →</Link>
      </section>

      {/* Knowledge Base */}
      <section className="home-knowledge">
        <h2 className="section-title">Canon & Knowledge Base</h2>
        <p className="home-section-lead">
          Structured lore lives in <code>docs/lore/</code> (dissected canon) and <code>docs/source/</code> (original
          source pages). <code>docs/CANON-NOTES.md</code> tracks decisions and discrepancies.
          Game design docs are in <code>content/game/</code>. Comic scripts in <code>src/comicsData.js</code>.
          Game episode data in <code>src/missionsData.js</code>.
        </p>
      </section>
    </div>
  );
}
