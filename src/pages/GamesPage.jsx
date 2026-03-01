import { loadMarkdown } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function GamesPage() {
  const { content } = loadMarkdown('games.md');

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <MarkdownRenderer content={content} />
    </div>
  );
}
