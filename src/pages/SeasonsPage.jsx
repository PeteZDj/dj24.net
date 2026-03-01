import { loadMarkdown } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function SeasonsPage() {
  const { content } = loadMarkdown('seasons.md');

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <MarkdownRenderer content={content} />
    </div>
  );
}
