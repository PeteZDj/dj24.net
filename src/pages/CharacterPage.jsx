import { useParams, Link } from 'react-router-dom';
import { loadMarkdown, contentIndex, dj24Roster, dj24Images, extendedCharacters, getSick52Roster } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';
import StatsCard from '../components/StatsCard';
import { characterStatsData } from '../statsData';

const colorMap = {
  purple: 'avatar-purple',
  pink: 'avatar-pink',
  cyan: 'avatar-cyan',
  red: 'avatar-red',
  emerald: 'avatar-emerald',
  amber: 'avatar-amber',
};

export default function CharacterPage() {
  const { slug } = useParams();
  const { content } = loadMarkdown(`characters/${slug}.md`);
  
  // Search for metadata in all possible sources
  const character = contentIndex.characters.find(c => c.slug === slug);
  const dj24Member = dj24Roster.find(m => m.slug === slug);
  const extendedChar = extendedCharacters.find(c => c.slug === slug);
  const sick52Member = getSick52Roster().find(m => m.slug === slug);

  // Combine found metadata
  const meta = extendedChar || dj24Member || character || sick52Member;
  const stats = characterStatsData[slug];

  if (!meta && !content) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Character Not Found</h1>
        <p>The character "{slug}" doesn't have a page yet. <Link to="/characters">Browse all characters →</Link></p>
      </div>
    );
  }

  const filename = dj24Images[slug];
  let imageUrl = filename ? `/images/dj24/${encodeURIComponent(filename)}` : null;

  if (!imageUrl && meta?.image) {
    imageUrl = meta.image;
  }

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      
      <div className="character-profile-layout">
        <div className="character-info-column">
          {/* Header Section */}
          {meta && (
            <div className="dj24-member-header">
              {meta.hour ? (
                <div className="dj24-member-hour-badge" style={{ borderColor: meta.color || '#4F46E5' }}>
                  <span className="hour-label">HOUR</span>
                  <span className="hour-number">{String(meta.hour).padStart(2, '0')}</span>
                </div>
              ) : meta.rank ? (
                <div className="dj24-member-hour-badge" style={{ borderColor: '#6B7280' }}>
                  <span className="hour-label">{String(meta.rank).includes('Hour') ? 'HOUR' : 'RANK'}</span>
                  <span className="hour-number">{String(meta.rank).replace(/\D/g, '')}</span>
                </div>
              ) : (
                <div className={`character-page-avatar ${colorMap[meta.color] || 'avatar-purple'}`}>
                  {meta.initial || meta.name?.charAt(0)}
                </div>
              )}
              <div>
                <h1>{meta.name}</h1>
                <span className="dj24-member-role">{meta.role || meta.title}</span>
              </div>
            </div>
          )}

          {/* Metadata Infobox */}
          {meta && (
            <div className="sick52-member-infobox">
              <h3>Quick Bio</h3>
              <table>
                <tbody>
                  <tr><td>Faction</td><td>{meta.faction}</td></tr>
                  {meta.squad && <tr><td>Squad</td><td>{meta.squad}</td></tr>}
                  {meta.rank && <tr><td>Designation</td><td>{meta.rank}</td></tr>}
                  <tr><td>Status</td><td>Active</td></tr>
                </tbody>
              </table>
            </div>
          )}

          <StatsCard stats={stats} />

          {content ? (
            <div className="markdown-content-wrap">
              <MarkdownRenderer content={content} />
            </div>
          ) : meta ? (
            <div className="wiki-content">
              <p>{meta.desc}</p>
              {meta.prompt && (
                <details className="image-prompt-details">
                  <summary>🎨 Visual Design Concept</summary>
                  <div className="image-prompt-box">
                    <p>Design base for this character:</p>
                    <code>{meta.prompt}</code>
                  </div>
                </details>
              )}
            </div>
          ) : null}
        </div>

        <div className="character-image-column">
          {imageUrl && (
            <div className="sick52-member-image-wrap sticky-image">
              <img src={imageUrl} alt={slug} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
