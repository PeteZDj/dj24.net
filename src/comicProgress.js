import { getComic } from './comicsData';

const key = 'dj24-last-opened-comic';

export function readProgress() {
  try {
    const slug = localStorage.getItem(key);
    const comic = slug ? getComic(slug) : null;
    return comic;
  } catch {
    return null;
  }
}

export function saveProgress(slug) {
  if (!slug) return;
  try { localStorage.setItem(key, slug); } catch { /* Reading works without browser storage. */ }
}
