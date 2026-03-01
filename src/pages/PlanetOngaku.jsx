import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { loadMarkdown } from '../contentLoader';

export default function PlanetOngaku() {
  const { frontmatter, content } = loadMarkdown('wiki/Planet_Ongaku.md');
  return (
    <div className="wiki-page">
      <MarkdownRenderer content={content} />
    </div>
  );
}