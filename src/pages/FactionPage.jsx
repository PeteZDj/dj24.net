import { useParams, Link } from 'react-router-dom';
import { loadMarkdown, contentIndex } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function FactionPage() {
  const { slug } = useParams();
  const { content } = loadMarkdown(`factions/${slug}.md`);
  const faction = contentIndex.factions.find(f => f.slug === slug);

  if (!content) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Faction Not Found</h1>
        <p>The faction "{slug}" doesn't have a page yet. <Link to="/factions">Browse all factions →</Link></p>
      </div>
    );
  }

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      {faction && <div className="page-faction-bar" style={{ background: faction.color }} />}
      <MarkdownRenderer content={content} />
    </div>
  );
}
