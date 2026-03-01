import { loadMarkdown } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Universe() {
  const { content } = loadMarkdown('universe.md');

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <MarkdownRenderer content={content} />
    </div>
  );
}
