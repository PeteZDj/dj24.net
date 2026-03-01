import React from 'react';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { loadMarkdown } from '../contentLoader';

export default function PlanetOngakuCities() {
  // Use the Planet_Ongaku.md content or a specific cities overview
  const { frontmatter, content } = loadMarkdown('wiki/Planet_Ongaku.md');
  return (
    <div className="wiki-page">
      <h1>Cities of Ongaku</h1>
      <MarkdownRenderer content={content} />
    </div>
  );
}