import { useParams, Link } from 'react-router-dom';
import { loadMarkdown } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function WikiPage() {
  const { slug } = useParams();
  const { content } = loadMarkdown(`wiki/${slug}.md`);

  if (!content) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Page Not Found</h1>
        <p>The page "{slug}" doesn't exist yet. <Link to="/">Return to the wiki home →</Link></p>
      </div>
    );
  }

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      <MarkdownRenderer content={content} />
    </div>
  );
}
