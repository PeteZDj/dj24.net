import { useParams, Link } from 'react-router-dom';
import { loadMarkdown, religionIndex } from '../contentLoader';
import MarkdownRenderer from '../components/MarkdownRenderer';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ReligionPage() {
  const { slug } = useParams();
  const { content } = loadMarkdown(`religions/${slug}.md`);
  const religion = religionIndex.find(r => r.slug === slug);

  if (!content) {
    return (
      <div className="wiki-page">
        <Breadcrumbs />
        <h1>Religion Not Found</h1>
        <p><Link to="/religions">Browse all genre religions →</Link></p>
      </div>
    );
  }

  return (
    <div className="wiki-page">
      <Breadcrumbs />
      {religion && <div className="page-faction-bar" style={{ background: religion.color }} />}
      <MarkdownRenderer content={content} />
    </div>
  );
}
