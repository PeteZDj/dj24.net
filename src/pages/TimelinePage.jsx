import { loadMarkdown } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function TimelinePage() {
  const { content } = loadMarkdown('timeline.md');

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <MarkdownRenderer content={content} />
    </div>
  );
}
