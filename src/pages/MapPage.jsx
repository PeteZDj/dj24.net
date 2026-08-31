import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { getSick52Roster } from '../contentLoader';
import { madeDeckAll, madeHouses } from '../madeDeckData';
import {
  WORLD_W, WORLD_H, FACTIONS, MAP_STYLES, BIOME_LEGEND,
  generatePlanet, rasterizeTerrain, drawPlanetVectors,
  randomSeedWord, palette, cityContains, citySectorAt,
} from '../mapGenerator';
import { buildCityDetail, drawCityDetail, placeCrew } from '../cityDetail';
import { drawPlanetLabels, POI_TYPES } from '../mapLabels';

// World units per kilometre. A capital's sprawl is ~59 units across the
// radius, which lands it at roughly 170 km² — the size the world bible asks a
// major city to be.
const UNITS_PER_KM = 8;

const BASE_W = 2048;
const BASE_H = Math.round((BASE_W * WORLD_H) / WORLD_W);

// The label engine is tuned for a viewport around 1400px wide. The PNG export
// is a 4096px poster, so every label it draws is scaled to match.
const EXPORT_SCALE = WORLD_W / 1400;

// Screen pixels of city radius at which the streamed detail tier is worth
// building. Below this the block texture already reads correctly.
const DETAIL_ZOOM = 150;

// How many city models to keep in memory. Each is a couple of hundred KB and
// takes single-digit milliseconds to rebuild, so this can stay small.
const DETAIL_CACHE = 6;

export default function MapPage() {
  const [seed, setSeed] = useState('NEON-GRID-2481');
  const [seedInput, setSeedInput] = useState('NEON-GRID-2481');
  const [style, setStyle] = useState('map');
  const [layers, setLayers] = useState({
    districts: true, roads: true, buildings: true, rivers: true,
    pois: true, made: true, sick: true, labels: true, grid: false,
  });
  const [selected, setSelected] = useState(null);
  const [cam, setCam] = useState({ x: 0, y: 0, z: 0.3 });
  const [status, setStatus] = useState('');
  const [world, setWorld] = useState(null);
  // Bumped whenever a city model finishes streaming, purely to trigger a redraw.
  const [detailTick, setDetailTick] = useState(0);
  // Render-safe mirror of what the streaming cache holds, so the panel can
  // report it without reaching into a ref during render.
  const [streamed, setStreamed] = useState({});

  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const baseRef = useRef(null);
  const sharpRef = useRef(null);
  const dragRef = useRef(null);
  const dirtyRef = useRef(true);
  const camRef = useRef(cam);
  const sharpTimer = useRef(0);
  const streamTimer = useRef(0);
  const detailsRef = useRef(new Map());

  // The rAF draw loop reads the camera through a ref so it never has to be
  // re-created when the camera moves. Declared first so it is up to date
  // before any other effect marks the canvas dirty.
  useEffect(() => { camRef.current = cam; }, [cam]);

  const sick52 = useMemo(() => getSick52Roster(), []);

  /* ---------------------------------------------------- generation ---- */

  useEffect(() => {
    let cancelled = false;
    baseRef.current = null;
    sharpRef.current = null;
    detailsRef.current = new Map();

    // Two stages on purpose: clear and show the message first, then let the
    // browser paint it before the generator ties up the main thread.
    const t0 = setTimeout(() => {
      if (cancelled) return;
      setStatus('Building the planet…');
      setWorld(null);
      setStreamed({});
      setSelected(null);
    }, 0);
    const t1 = setTimeout(() => {
      if (cancelled) return;
      const w = generatePlanet(seed);
      if (cancelled) return;
      setWorld(w);
      setStatus('');
      dirtyRef.current = true;
    }, 40);

    return () => { cancelled = true; clearTimeout(t0); clearTimeout(t1); };
  }, [seed]);

  const crew = useMemo(() => (world ? placeCrew(world, madeDeckAll, sick52) : []), [world, sick52]);

  /* ------------------------------------------------------ base raster -- */

  useEffect(() => {
    if (!world) { baseRef.current = null; return undefined; }
    let cancelled = false;
    const t0 = setTimeout(() => { if (!cancelled) setStatus('Rendering terrain…'); }, 0);
    const t = setTimeout(() => {
      if (cancelled) return;
      const off = document.createElement('canvas');
      off.width = BASE_W;
      off.height = BASE_H;
      const octx = off.getContext('2d');
      const img = octx.createImageData(BASE_W, BASE_H);
      rasterizeTerrain(img.data, world, { x: 0, y: 0, w: WORLD_W, h: WORLD_H }, BASE_W, BASE_H, style, 3);
      octx.putImageData(img, 0, 0);
      if (cancelled) return;
      baseRef.current = off;
      sharpRef.current = null;
      setStatus('');
      dirtyRef.current = true;
    }, 20);
    return () => { cancelled = true; clearTimeout(t0); clearTimeout(t); };
  }, [world, style]);

  // Re-render just the visible rectangle at screen resolution once the user is
  // zoomed past the point where the base bitmap would start to look soft.
  // This is the whole trick behind zooming staying sharp.
  const scheduleSharpen = useCallback(() => {
    if (!world) return;
    clearTimeout(sharpTimer.current);
    sharpTimer.current = setTimeout(() => {
      const wrap = wrapRef.current;
      if (!wrap || !baseRef.current) return;
      const { x: ox, y: oy, z } = camRef.current;
      if (z < 1.2) { sharpRef.current = null; dirtyRef.current = true; return; }

      const rect = {
        x: -ox / z, y: -oy / z,
        w: wrap.clientWidth / z, h: wrap.clientHeight / z,
      };
      const W = Math.min(1500, Math.round(wrap.clientWidth));
      const H = Math.max(1, Math.round((W * rect.h) / rect.w));
      setStatus('Sharpening…');
      setTimeout(() => {
        const off = document.createElement('canvas');
        off.width = W;
        off.height = H;
        const octx = off.getContext('2d');
        const img = octx.createImageData(W, H);
        // More octaves the closer in you are, so new detail keeps appearing.
        const extra = z > 4 ? 7 : z > 2.2 ? 6 : 5;
        rasterizeTerrain(img.data, world, rect, W, H, style, extra);
        octx.putImageData(img, 0, 0);
        sharpRef.current = { canvas: off, rect };
        setStatus('');
        dirtyRef.current = true;
      }, 10);
    }, 280);
  }, [world, style]);

  /* -------------------------------------------------------- streaming -- */

  // Cities in view and close enough to be worth a full model. This is the
  // streaming set: it is what would be a loaded chunk in an engine build.
  const citiesNeedingDetail = useCallback(() => {
    const wrap = wrapRef.current;
    if (!world || !wrap) return [];
    const { x: ox, y: oy, z } = camRef.current;
    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    const out = [];
    for (const c of world.cities) {
      const rr = c.radius * z;
      if (rr < DETAIL_ZOOM) continue;
      const sx = c.x * z + ox;
      const sy = c.y * z + oy;
      // Load a screen early so a model is ready before you pan onto it.
      if (sx < -rr - W || sy < -rr - H || sx > W * 2 + rr || sy > H * 2 + rr) continue;
      out.push(c);
    }
    // Nearest to the middle of the view first.
    out.sort((a, b) => {
      const da = Math.hypot(a.x * z + ox - W / 2, a.y * z + oy - H / 2);
      const db = Math.hypot(b.x * z + ox - W / 2, b.y * z + oy - H / 2);
      return da - db;
    });
    return out;
  }, [world]);

  const streamDetail = useCallback(() => {
    clearTimeout(streamTimer.current);
    streamTimer.current = setTimeout(() => {
      if (!world) return;
      const cache = detailsRef.current;

      // One model per frame keeps the map interactive while a dense capital is
      // being built, and the queue is re-derived each step so panning away
      // mid-load cancels whatever is no longer wanted.
      function step() {
        const wanted = citiesNeedingDetail();
        const missing = wanted.filter((c) => !cache.has(c.name));
        if (!missing.length) { setStatus(''); return; }
        const c = missing[0];
        setStatus(`Streaming ${c.name}…`);
        setTimeout(() => {
          cache.set(c.name, buildCityDetail(world, c));
          // Evict whatever is furthest from what the camera is looking at.
          const keep = new Set(wanted.map((w) => w.name));
          for (const name of cache.keys()) {
            if (cache.size <= DETAIL_CACHE) break;
            if (!keep.has(name)) cache.delete(name);
          }
          setDetailTick((n) => n + 1);
          setStreamed(Object.fromEntries([...cache].map(([n, d]) => [n, d.stats])));
          dirtyRef.current = true;
          step();
        }, 16);
      }
      step();
    }, 180);
  }, [world, citiesNeedingDetail]);

  useEffect(() => { scheduleSharpen(); streamDetail(); }, [cam, scheduleSharpen, streamDetail]);

  /* -------------------------------------------------------- fit view -- */

  const fitView = useCallback(() => {
    const wrap = wrapRef.current;
    // A pane that has not been laid out yet reports zero, which would fit the
    // camera to zoom 0 and leave the canvas permanently blank.
    if (!wrap || !wrap.clientWidth || !wrap.clientHeight) return false;
    const z = Math.min(wrap.clientWidth / WORLD_W, wrap.clientHeight / WORLD_H) * 0.98;
    setCam({ x: (wrap.clientWidth - WORLD_W * z) / 2, y: (wrap.clientHeight - WORLD_H * z) / 2, z });
    return true;
  }, []);

  useEffect(() => { fitView(); }, [fitView]);

  const flyTo = useCallback((c) => {
    const wrap = wrapRef.current;
    if (!wrap || !c) return;
    // Frame the whole sprawl with a margin, which is always past the point
    // where its streets and buildings stream in.
    const z = Math.min(wrap.clientWidth, wrap.clientHeight) / (c.radius * 2.9);
    setCam({ z, x: wrap.clientWidth / 2 - c.x * z, y: wrap.clientHeight / 2 - c.y * z });
  }, []);

  /* ------------------------------------------------------------ draw -- */

  const draw = useCallback(() => {
    const cv = canvasRef.current;
    const wrap = wrapRef.current;
    if (!cv || !wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = wrap.clientWidth;
    const H = wrap.clientHeight;
    if (cv.width !== W * dpr || cv.height !== H * dpr) {
      cv.width = W * dpr;
      cv.height = H * dpr;
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
    }
    const ctx = cv.getContext('2d');
    const P = palette(style);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = style === 'satellite' ? '#050a14' : P.water;
    ctx.fillRect(0, 0, W, H);
    if (!world) return;

    const { x: ox, y: oy, z } = camRef.current;
    const details = detailsRef.current;
    const detailed = new Set(details.keys());

    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(z, z);

    if (baseRef.current) ctx.drawImage(baseRef.current, 0, 0, WORLD_W, WORLD_H);
    const sharp = sharpRef.current;
    if (sharp) ctx.drawImage(sharp.canvas, sharp.rect.x, sharp.rect.y, sharp.rect.w, sharp.rect.h);

    // Ground pass: water, sprawl footprints and block massing, but no roads —
    // roads have to go over the buildings that stream in between the two.
    drawPlanetVectors(ctx, world, style, z, {
      rivers: layers.rivers, roads: false, detailed,
    });

    for (const c of world.cities) {
      const det = details.get(c.name);
      if (det) drawCityDetail(ctx, c, det, style, z, layers);
    }

    drawPlanetVectors(ctx, world, style, z, {
      rivers: false, cities: false, roads: layers.roads,
    });

    if (layers.grid) {
      ctx.strokeStyle = 'rgba(100,116,139,0.28)';
      ctx.lineWidth = 1 / z;
      ctx.beginPath();
      for (let x = 0; x <= WORLD_W; x += 256) { ctx.moveTo(x, 0); ctx.lineTo(x, WORLD_H); }
      for (let y = 0; y <= WORLD_H; y += 256) { ctx.moveTo(0, y); ctx.lineTo(WORLD_W, y); }
      ctx.stroke();
    }
    ctx.restore();

    // Overlay: one label engine per frame decides what gets a name. Markers
    // are reserved first, then names are placed highest priority first, and
    // anything that cannot find a clear box is dropped rather than overlapped.
    drawPlanetLabels(ctx, world, style, { ox, oy, z, W, H }, {
      labels: layers.labels, layers, details, crew,
    });

    if (selected) {
      ctx.beginPath();
      ctx.arc(selected.x * z + ox, selected.y * z + oy, 19, 0, Math.PI * 2);
      ctx.strokeStyle = '#4F46E5';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }, [world, crew, layers, style, selected]);

  useEffect(() => {
    let raf = 0;
    let alive = true;
    const loop = () => {
      if (!alive) return;
      if (dirtyRef.current) { dirtyRef.current = false; draw(); }
      raf = requestAnimationFrame(loop);
    };
    dirtyRef.current = true;
    raf = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [draw]);

  useEffect(() => { dirtyRef.current = true; }, [cam, layers, selected, world, crew, style, status, detailTick]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return undefined;
    // Watch the pane rather than the window: it can mount at zero height and
    // gain size later, and until it does there is no sensible camera to fit.
    const ro = new ResizeObserver(() => {
      dirtyRef.current = true;
      if (!(camRef.current.z > 0)) fitView();
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [fitView]);

  /* ----------------------------------------------------- interaction -- */

  const onPointerDown = (e) => {
    dragRef.current = { sx: e.clientX, sy: e.clientY, ox: cam.x, oy: cam.y, moved: false };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (!d) return;
    const dx = e.clientX - d.sx;
    const dy = e.clientY - d.sy;
    if (Math.abs(dx) + Math.abs(dy) > 3) d.moved = true;
    setCam((c) => ({ ...c, x: d.ox + dx, y: d.oy + dy }));
  };
  const onPointerUp = (e) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (!d || d.moved || !world) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const { x: ox, y: oy, z } = camRef.current;
    const wx = (e.clientX - rect.left - ox) / z;
    const wy = (e.clientY - rect.top - oy) / z;

    // Point features win over areas, so clicking a pin never selects the
    // quarter sitting underneath it.
    const points = [];
    for (const [name, det] of detailsRef.current) {
      const c = world.cities.find((o) => o.name === name);
      if (!c || c.radius * z < DETAIL_ZOOM) continue;
      if (layers.pois) for (const p of det.pois) points.push({ ...p, _t: 'place', city: name });
    }
    for (const m of crew) {
      if (m.kind === 'made' && !layers.made) continue;
      if (m.kind === 'sick' && !layers.sick) continue;
      points.push({ ...m, _t: 'member' });
    }
    for (const c of world.cities) points.push({ ...c, _t: 'city' });

    const tol = 22 / z;
    let best = null;
    let bestD = Infinity;
    for (const n of points) {
      const dd = Math.hypot(n.x - wx, n.y - wy);
      if (dd < tol && dd < bestD) { bestD = dd; best = n; }
    }

    // Falling through to the quarter under the cursor.
    if (!best) {
      for (const c of world.cities) {
        if (!cityContains(c, wx, wy)) continue;
        const qi = citySectorAt(c, wx, wy);
        const det = detailsRef.current.get(c.name);
        const q = det ? det.quarters[qi] : null;
        best = q
          ? { ...q, _t: 'quarter', city: c.name, faction: c.faction }
          : { ...c, _t: 'city' };
        break;
      }
    }
    setSelected(best);
  };
  const zoomAt = useCallback((mx, my, f) => {
    setCam((c) => {
      const nz = Math.max(0.1, Math.min(60, c.z * f));
      const k = nz / c.z;
      return { z: nz, x: mx - (mx - c.x) * k, y: my - (my - c.y) * k };
    });
  }, []);

  // React attaches wheel handlers passively, so preventDefault inside an
  // onWheel prop is ignored and the page scrolls away under the map. Zooming a
  // map has to own the wheel, which means a native non-passive listener.
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return undefined;
    const handler = (e) => {
      e.preventDefault();
      const rect = cv.getBoundingClientRect();
      zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.deltaY < 0 ? 1.16 : 1 / 1.16);
    };
    cv.addEventListener('wheel', handler, { passive: false });
    return () => cv.removeEventListener('wheel', handler);
  }, [zoomAt]);

  const onDoubleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    zoomAt(e.clientX - rect.left, e.clientY - rect.top, 1.9);
  };
  const zoomBy = (f) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    zoomAt(wrap.clientWidth / 2, wrap.clientHeight / 2, f);
  };

  /* --------------------------------------------------------- actions -- */

  const regenerate = (s) => {
    const next = (s || randomSeedWord()).trim().toUpperCase();
    setSeed(next);
    setSeedInput(next);
  };

  const savePng = () => {
    if (!world) return;
    setStatus('Exporting…');
    setTimeout(() => {
      const out = document.createElement('canvas');
      out.width = WORLD_W;
      out.height = WORLD_H;
      const c = out.getContext('2d');

      const img = c.createImageData(WORLD_W, WORLD_H);
      rasterizeTerrain(img.data, world, { x: 0, y: 0, w: WORLD_W, h: WORLD_H }, WORLD_W, WORLD_H, style, 5);
      c.putImageData(img, 0, 0);
      drawPlanetVectors(c, world, style, 1, { rivers: layers.rivers, roads: layers.roads });

      // The export runs the same label engine at 1:1 world scale, so the
      // poster is decluttered exactly like the screen is — just larger.
      drawPlanetLabels(c, world, style, { ox: 0, oy: 0, z: 1, W: WORLD_W, H: WORLD_H }, {
        labels: layers.labels, layers, sizeScale: EXPORT_SCALE, margin: 24,
      });

      c.fillStyle = 'rgba(255,255,255,0.94)';
      c.fillRect(36, 36, 760, 118);
      c.strokeStyle = 'rgba(79,70,229,0.5)';
      c.lineWidth = 3;
      c.strokeRect(36, 36, 760, 118);
      c.textAlign = 'left';
      c.fillStyle = '#0F172A';
      c.font = '800 40px Outfit, system-ui, sans-serif';
      c.fillText('PLANET ONGAKU', 62, 88);
      c.fillStyle = '#475569';
      c.font = '500 20px Outfit, system-ui, sans-serif';
      c.fillText(`World atlas · ${style} · seed ${seed} · dj24.net/map`, 62, 126);

      const a = document.createElement('a');
      a.download = `planet-ongaku-${style}-${seed}.png`;
      a.href = out.toDataURL('image/png');
      a.click();
      setStatus('');
    }, 30);
  };

  const toggle = (k) => setLayers((l) => ({ ...l, [k]: !l[k] }));

  /* ------------------------------------------------------------ view -- */

  const scaleBar = useMemo(() => {
    const targetPx = 110;
    const km = targetPx / cam.z / UNITS_PER_KM;
    const nice = [0.05, 0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500];
    const pick = nice.find((n) => n >= km) || 1000;
    return { km: pick, px: pick * UNITS_PER_KM * cam.z };
  }, [cam.z]);

  const loaded = Object.keys(streamed).length;
  const selCity = selected && world
    ? world.cities.find((c) => c.name === (selected._t === 'city' ? selected.name : selected.city))
    : null;

  return (
    <div className="wiki-page map-page">
      <Breadcrumbs />

      <header className="map-head">
        <h1>Planet Ongaku — World Generator</h1>
        <p className="map-sub">
          One continuous world, streamed. Fly from orbit down to a street corner without ever
          changing maps: terrain, climate and rivers at planet scale, then motorways, sprawl,
          quarters, blocks and individual buildings as each settlement loads in underneath you.
          Every seed builds a different world, and the same seed always rebuilds the same one.
        </p>
      </header>

      <div className="map-toolbar">
        <div className="map-seg">
          {MAP_STYLES.map((s) => (
            <button key={s.key} className={style === s.key ? 'on' : ''} onClick={() => setStyle(s.key)}>{s.label}</button>
          ))}
        </div>

        <select
          className="map-select"
          value=""
          onChange={(e) => {
            const c = world?.cities.find((o) => o.name === e.target.value);
            if (c) { flyTo(c); setSelected({ ...c, _t: 'city' }); }
          }}
        >
          <option value="">Fly to…</option>
          {(world?.cities || []).map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>

        <div className="map-seed">
          <label htmlFor="seed">Seed</label>
          <input
            id="seed"
            value={seedInput}
            onChange={(e) => setSeedInput(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && regenerate(seedInput)}
          />
          <button onClick={() => regenerate(seedInput)}>Apply</button>
        </div>

        <button className="map-btn primary" onClick={() => regenerate()}>🎲 New world</button>
        <button className="map-btn gold" onClick={savePng}>⬇ Save PNG</button>
      </div>

      <div className="map-body">
        <div className="map-canvas-wrap" ref={wrapRef}>
          <canvas
            ref={canvasRef}
            className="map-canvas"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            onDoubleClick={onDoubleClick}
          />

          <div className="map-zoom-ctl">
            <button onClick={() => zoomBy(1.35)} aria-label="Zoom in">＋</button>
            <button onClick={() => zoomBy(1 / 1.35)} aria-label="Zoom out">−</button>
            <button className="map-fit" onClick={fitView} aria-label="Fit to view">⤢</button>
          </div>

          <div className="map-scalebar">
            <span className="map-scalebar-line" style={{ width: `${Math.max(28, scaleBar.px)}px` }} />
            <span>{scaleBar.km >= 1 ? `${scaleBar.km} km` : `${scaleBar.km * 1000} m`}</span>
          </div>

          {status && <div className="map-busy">{status}</div>}
          <div className="map-hint">
            Drag to pan · scroll or double-click to zoom · click anything for detail
            {loaded ? ` · ${loaded} ${loaded === 1 ? 'city' : 'cities'} streamed` : ''}
          </div>

          {selected && (
            <aside className="map-inspector">
              <button className="map-inspector-close" onClick={() => setSelected(null)}>✕</button>

              {selected._t === 'city' && (
                <>
                  <span className="map-kicker" style={{ color: FACTIONS[selected.faction].color }}>
                    {FACTIONS[selected.faction].icon} {FACTIONS[selected.faction].name}
                  </span>
                  <h3>{selected.name}</h3>
                  <p>{selected.desc}</p>
                  <dl className="map-stats">
                    <div><dt>Type</dt><dd>{selected.kind}</dd></div>
                    <div><dt>People</dt><dd>{(selected.pop / 1e6).toFixed(1)}M</dd></div>
                    <div><dt>Across</dt><dd>{((selected.radius * 2) / UNITS_PER_KM).toFixed(0)}km</dd></div>
                  </dl>
                  <p className="map-note"><strong>Climate:</strong> {selected.climate}</p>
                  <p className="map-note">
                    {selected.sectors?.length} quarters
                    {streamed[selected.name]
                      ? ` · ${streamed[selected.name].buildings.toLocaleString()} buildings, ${streamed[selected.name].places} named places loaded`
                      : ' · fly in to stream its streets and buildings'}
                  </p>
                  <button className="map-btn primary wide" onClick={() => flyTo(selected)}>
                    Fly down to {selected.name} →
                  </button>
                </>
              )}

              {selected._t === 'quarter' && (
                <>
                  <span className="map-kicker" style={{ color: selected.color }}>
                    Quarter of {selected.city}
                  </span>
                  <h3>{selected.name}</h3>
                  <p>{selected.blurb}</p>
                  {selected.stories && <p className="map-note"><strong>Stories:</strong> {selected.stories}</p>}
                  <p className="map-note">
                    Character: <strong>{selected.role}</strong>. Quarters double as streaming cells —
                    this one is one chunk of {selCity?.name}.
                  </p>
                  {selCity && (
                    <span className="map-tag" style={{ '--tag': FACTIONS[selCity.faction].color }}>
                      {FACTIONS[selCity.faction].icon} {FACTIONS[selCity.faction].name}
                    </span>
                  )}
                </>
              )}

              {selected._t === 'place' && (
                <>
                  <span className="map-kicker" style={{ color: POI_TYPES[selected.type]?.color }}>
                    {POI_TYPES[selected.type]?.label}
                  </span>
                  <h3>{selected.icon} {selected.name}</h3>
                  <p>{selected.note}</p>
                  <p className="map-note">📍 {selected.quarter}, {selected.city}</p>
                  {selected.canon && <p className="map-note">Written into the canon, not generated.</p>}
                </>
              )}

              {selected._t === 'member' && selected.kind === 'made' && (
                <>
                  <span className="map-kicker" style={{ color: madeHouses[selected.data.suit].color }}>
                    🃏 Hip Hop Mafia · {madeHouses[selected.data.suit].house}
                  </span>
                  <h3>{selected.card} — {selected.data.alias}</h3>
                  <p className="map-realname">{selected.data.name}</p>
                  <p>{selected.data.role}</p>
                  <dl className="map-stats">
                    <div><dt>Muscle</dt><dd>{selected.data.mus}</dd></div>
                    <div><dt>Money</dt><dd>{selected.data.mon}</dd></div>
                    <div><dt>Reach</dt><dd>{selected.data.rea}</dd></div>
                    <div><dt>Heat</dt><dd>{selected.data.hea}</dd></div>
                    <div><dt className={selected.data.loy < 50 ? 'flip' : ''}>Loyalty</dt><dd className={selected.data.loy < 50 ? 'flip' : ''}>{selected.data.loy}</dd></div>
                    <div><dt>Wheels</dt><dd>{selected.data.whl}</dd></div>
                  </dl>
                  {selected.data.loy < 50 && <p className="map-flip">⚠ Flip risk — a police-campaign entry point.</p>}
                  <p className="map-note"><strong>Front:</strong> {selected.data.front}</p>
                  <p className="map-note"><strong>Car:</strong> {selected.data.car}</p>
                  <p className="map-note">📍 {selected.data.district}, Ongaku Prime</p>
                </>
              )}

              {selected._t === 'member' && selected.kind === 'sick' && (
                <>
                  <span className="map-kicker" style={{ color: '#DC2626' }}>💀 Sick 52 · cell {selected.cell + 1}</span>
                  <h3>{selected.card} — {selected.data.name}</h3>
                  <p>{selected.data.title}</p>
                  <p className="map-note">
                    Operating outside the built-up area. They work in cells of five or six, never in
                    the city proper — a presence, not a resident.
                  </p>
                </>
              )}
            </aside>
          )}
        </div>

        <aside className="map-legend">
          <h3>Layers</h3>
          <div className="map-layer-list">
            <label><input type="checkbox" checked={layers.roads} onChange={() => toggle('roads')} /> Roads & sea routes</label>
            <label><input type="checkbox" checked={layers.rivers} onChange={() => toggle('rivers')} /> Rivers & lakes</label>
            <label><input type="checkbox" checked={layers.districts} onChange={() => toggle('districts')} /> Quarter territory</label>
            <label><input type="checkbox" checked={layers.buildings} onChange={() => toggle('buildings')} /> Buildings</label>
            <label><input type="checkbox" checked={layers.pois} onChange={() => toggle('pois')} /> Places</label>
            <label><input type="checkbox" checked={layers.made} onChange={() => toggle('made')} /> 🃏 Made Deck (54)</label>
            <label><input type="checkbox" checked={layers.sick} onChange={() => toggle('sick')} /> 💀 Sick 52 cells</label>
            <label><input type="checkbox" checked={layers.labels} onChange={() => toggle('labels')} /> Labels</label>
            <label><input type="checkbox" checked={layers.grid} onChange={() => toggle('grid')} /> Coordinate grid</label>
          </div>

          <h3>Factions</h3>
          <ul className="map-key">
            {Object.entries(FACTIONS).map(([k, f]) => (
              <li key={k}><span className="map-dot" style={{ background: f.color }} /> {f.icon} {f.name}</li>
            ))}
          </ul>

          <h3>Places</h3>
          <ul className="map-key">
            {Object.entries(POI_TYPES).map(([k, t]) => (
              <li key={k}><span className="map-ring" style={{ borderColor: t.color }} /> {t.label}</li>
            ))}
            <li><span className="map-dot" style={{ background: '#D4AF37' }} /> Made Deck member (card shown)</li>
            <li><span className="map-dot" style={{ background: '#DC2626' }} /> Sick 52 cell</li>
          </ul>

          <h3>Terrain</h3>
          <ul className="map-key map-key-biomes">
            {BIOME_LEGEND.map((b) => (
              <li key={b.key}>
                <span className="map-dot" style={{ background: biomeSwatch(style, b.key) }} /> {b.label}
              </li>
            ))}
          </ul>

          <h3>Seed</h3>
          <p className="map-legend-note">
            <code>{seed}</code><br />
            The same seed always rebuilds the same world, so a map can be shared by seed alone.
          </p>
        </aside>
      </div>

      <section className="map-explainer">
        <h2 className="section-title">How this fits the production plan</h2>
        <div className="map-explainer-grid">
          <div>
            <h4>One perceived world, many streamed chunks</h4>
            <p>
              There is no second map. Settlements are geometry on the planet, and their streets,
              blocks and buildings are built on demand when the camera gets close enough, then
              dropped again when it leaves. That is exactly the load-and-unload contract a Unity
              streaming setup runs, rehearsed in the browser first.
            </p>
          </div>
          <div>
            <h4>Roads, then blocks, then lots, then buildings</h4>
            <p>
              Each quarter picks a street orientation and block size, the grid carves blocks, and
              the streamed tier subdivides those same blocks into lots — so footprints front onto
              the streets you were already looking at. That is the pipeline a CityEngine or Houdini
              graph would run, in the same order.
            </p>
          </div>
          <div>
            <h4>Procedural = ordinary, hand-crafted = important</h4>
            <p>
              Every settlement generates its own restaurants, museums, stations and warehouses from
              its quarters' character. The places audiences actually remember — NexaGen Tower,
              Vantaggio's, Trolley Fortress — are written by hand and placed into the generated
              fabric.
            </p>
          </div>
          <div>
            <h4>Both decks live on the map</h4>
            <p>
              All 54 Made Deck members sit in their home quarters of Ongaku Prime with full stats,
              and the Sick 52 work in cells out past the built-up edge. Fly down far enough and the
              police campaign and the war campaign are on the same board.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------- utils */

function biomeSwatch(style, key) {
  const P = palette(style);
  const c = P[key] || P.grass;
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
