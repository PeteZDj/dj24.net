import { getComic } from './comicsData';

const key = 'dj24-last-opened-comic';

export function readProgress() {
  try {
    const slug = localStorage.getItem(key);
    const comic = slug ? getComic(slug) : null;
    return comic?.hasScript ? comic : null;
  } catch {
    return null;
  }
}

export function saveProgress(comic) {
  if (!comic?.hasScript) return;
  try { localStorage.setItem(key, comic.slug); } catch { /* Reading works without browser storage. */ }
}
