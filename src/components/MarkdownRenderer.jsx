import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { resolveWikiLink } from '../contentLoader';

// Custom renderer that converts [[wiki-links]] to React Router Links
function processWikiLinks(text) {
  if (typeof text !== 'string') return text;
  // Match [[Display Text|Link Text]] or [[Link Text]]
  const parts = [];
  let lastIndex = 0;
  const regex = /\[\[([^\]|]+?)(?:\|([^\]]+?))?\]\]/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Push text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const linkTarget = match[1].trim();
    const displayText = match[2] ? match[2].trim() : linkTarget;
    const route = resolveWikiLink(linkTarget);

    if (route) {
      parts.push(
        <Link key={match.index} to={route} className="wiki-link">
          {displayText}
        </Link>
      );
    } else {
      parts.push(
        <span key={match.index} className="wiki-link-missing" title={`Page not found: ${linkTarget}`}>
          {displayText}
        </span>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

// Custom text renderer that injects wiki links
function WikiText({ children }) {
  if (typeof children === 'string') {
    const processed = processWikiLinks(children);
    if (Array.isArray(processed)) {
      return <>{processed}</>;
    }
    return children;
  }
  return children;
}

export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  // Remove HTML comments (image prompts) from visible rendering
  const cleanContent = content.replace(/<!--[\s\S]*?-->/g, '');

  return (
    <div className="wiki-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Override paragraph to handle wiki links in text
          p: ({ children }) => {
            const processed = processChildren(children);
            return <p>{processed}</p>;
          },
          // Override list items
          li: ({ children }) => {
            const processed = processChildren(children);
            return <li>{processed}</li>;
          },
          // Override headings
          h1: ({ children }) => <h1>{processChildren(children)}</h1>,
          h2: ({ children }) => <h2>{processChildren(children)}</h2>,
          h3: ({ children }) => <h3>{processChildren(children)}</h3>,
          h4: ({ children }) => <h4>{processChildren(children)}</h4>,
          // Override strong/em
          strong: ({ children }) => <strong>{processChildren(children)}</strong>,
          em: ({ children }) => <em>{processChildren(children)}</em>,
          // Override links to use React Router for internal links
          a: ({ href, children }) => {
            if (href && href.startsWith('/')) {
              return <Link to={href} className="wiki-link">{children}</Link>;
            }
            return <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
          },
          // Blockquote styling
          blockquote: ({ children }) => (
            <blockquote className="wiki-quote">{children}</blockquote>
          ),
          // Table styling
          table: ({ children }) => (
            <div className="wiki-table-wrap"><table className="wiki-table">{children}</table></div>
          ),
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </div>
  );
}

function processChildren(children) {
  if (!children) return children;
  if (typeof children === 'string') return processWikiLinks(children);
  if (Array.isArray(children)) {
    return children.map((child, i) => {
      if (typeof child === 'string') {
        const processed = processWikiLinks(child);
        if (Array.isArray(processed)) {
          return <span key={i}>{processed}</span>;
        }
        return child;
      }
      return child;
    });
  }
  return children;
}
