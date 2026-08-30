import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { getSick52Roster } from '../contentLoader';
import { madeDeckAll, madeHouses } from '../madeDeckData';
import {
  WORLD_W, WORLD_H, FACTIONS, DISTRICTS, MAP_STYLES, BIOME_LEGEND,
  generatePlanet, generateCity, rasterizeTerrain, drawPlanetVectors, drawCity,
  placeMembers, randomSeedWord, palette,
} from '../mapGenerator';

const POI_TYPES = {
  landmark: { label: 'Landmarks', color: '#FBBF24' },
  venue: { label: 'Venues & studios', color: '#E879F9' },
  food: { label: 'Restaurants & cafés', color: '#FB923C' },
  front: { label: 'Mafia fronts', color: '#D4AF37' },
  civic: { label: 'Civic & institutions', color: '#38BDF8' },
  transit: { label: 'Transit', color: '#60A5FA' },
  park: { label: 'Parks & recreation', color: '#4ADE80' },
  military: { label: 'Military', color: '#34D399' },
};

// World units per kilometre. A capital is ~180 km across at this scale, which
// keeps the district sizes in the range the world bible describes.
const UNITS_PER_KM = 22;

const BASE_W = 2048;
const BASE_H = Math.round((BASE_W * WORLD_H) / WORLD_W);

const CITY_CHOICES = [
  'Ongaku Prime', 'Urban City', 'Electric City', 'Classic City', 'Rock City',
  'Blue City', 'Pop City', 'Rose City', 'Cloud City', 'Port Sonora',
];

export default function MapPage() {
  const [seed, setSeed] = useState('NEON-GRID-2481');
  const [seedInput, setSeedInput] = useState('NEON-GRID-2481');
  const [mode, setMode] = useState('planet');
  const [style, setStyle] = useState('satellite');
  const [cityName, setCityName] = useState('Ongaku Prime');
  const [layers, setLayers] = useState({
    districts: true, roads: true, buildings: true, rivers: true,
    pois: true, made: true, sick: true, labels: true, grid: false,
  });
  const [selected, setSelected] = useState(null);
  const [cam, setCam] = useState({ x: 0, y: 0, z: 0.3 });
  const [status, setStatus] = useState('');
  const [world, setWorld] = useState(null);

  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const baseRef = useRef(null);
  const detailRef = useRef(null);
  const dragRef = useRef(null);
  const dirtyRef = useRef(true);
  const camRef = useRef(cam);
  const detailTimer = useRef(0);
  camRef.current = cam;

  const sick52 = useMemo(() => getSick52Roster(), []);

  /* ---------------------------------------------------- generation ---- */

  useEffect(() => {
    let cancelled = false;
    setStatus(mode === 'planet' ? 'Building planet…' : `Building ${cityName}…`);
    setWorld(null);
    baseRef.current = null;
    detailRef.current = null;
    setSelected(null);

    // Deferred so the status message paints before the main thread is tied up.
    const t = setTimeout(() => {
      if (cancelled) return;
      const w = mode === 'planet' ? generatePlanet(seed) : generateCity(seed, cityName, cityClimate(seed, cityName));
      if (cancelled) return;
      setWorld(w);
      setStatus('');
      dirtyRef.current = true;
    }, 30);

    return () => { cancelled = true; clearTimeout(t); };
  }, [seed, mode, cityName]);

  const members = useMemo(() => {
    if (!world || world.kind !== 'city') return [];
    return placeMembers(world, madeDeckAll, sick52);
  }, [world, sick52]);

  /* ------------------------------------------------- planet raster ---- */

  useEffect(() => {
    if (!world || world.kind !== 'planet') { baseRef.current = null; return; }
    let cancelled = false;
    setStatus('Rendering terrain…');
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
      detailRef.current = null;
      setStatus('');
      dirtyRef.current = true;
    }, 20);
    return () => { cancelled = true; clearTimeout(t); };
  }, [world, style]);

  // Re-render just the visible rectangle at screen resolution once the user is
  // zoomed past the point where the base bitmap would start to look soft.
  // This is the whole trick behind zooming staying sharp.
  const scheduleDetail = useCallback(() => {
    if (!world || world.kind !== 'planet') return;
    clearTimeout(detailTimer.current);
    detailTimer.current = setTimeout(() => {
      const wrap = wrapRef.current;
      if (!wrap || !baseRef.current) return;
      const { x: ox, y: oy, z } = camRef.current;
      if (z < 1.2) { detailRef.current = null; dirtyRef.current = true; return; }

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
        detailRef.current = { canvas: off, rect };
        setStatus('');
        dirtyRef.current = true;
      }, 10);
    }, 280);
  }, [world, style]);

  useEffect(() => { scheduleDetail(); }, [cam, scheduleDetail]);

  /* -------------------------------------------------------- fit view -- */

  const fitView = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const z = Math.min(wrap.clientWidth / WORLD_W, wrap.clientHeight / WORLD_H) * 0.98;
    setCam({ x: (wrap.clientWidth - WORLD_W * z) / 2, y: (wrap.clientHeight - WORLD_H * z) / 2, z });
  }, []);

  useEffect(() => { fitView(); }, [fitView, mode, cityName]);

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
    const toScreen = (wx, wy) => ({ x: wx * z + ox, y: wy * z + oy });

    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(z, z);

    if (world.kind === 'planet') {
      if (baseRef.current) ctx.drawImage(baseRef.current, 0, 0, WORLD_W, WORLD_H);
      const d = detailRef.current;
      if (d) ctx.drawImage(d.canvas, d.rect.x, d.rect.y, d.rect.w, d.rect.h);
      drawPlanetVectors(ctx, world, style, z, { rivers: layers.rivers, roads: layers.roads });
    } else {
      drawCity(ctx, world, style, z, layers);
    }

    if (layers.grid) {
      ctx.strokeStyle = 'rgba(148,163,184,0.25)';
      ctx.lineWidth = 1 / z;
      ctx.beginPath();
      for (let x = 0; x <= WORLD_W; x += 256) { ctx.moveTo(x, 0); ctx.lineTo(x, WORLD_H); }
      for (let y = 0; y <= WORLD_H; y += 256) { ctx.moveTo(0, y); ctx.lineTo(WORLD_W, y); }
      ctx.stroke();
    }
    ctx.restore();

    /* ---- overlay, drawn in screen space so icons and text stay crisp ---- */
    ctx.lineJoin = 'round';
    const label = (text, x, y, size, color, weight = 600) => {
      ctx.font = `${weight} ${size}px Outfit, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.lineWidth = Math.max(3, size / 3.5);
      ctx.strokeStyle = P.labelHalo;
      ctx.strokeText(text, x, y);
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
    };

    if (world.kind === 'planet') {
      for (const c of world.cities) {
        const p = toScreen(c.x, c.y);
        if (p.x < -80 || p.y < -40 || p.x > W + 80 || p.y > H + 40) continue;
        const f = FACTIONS[c.faction];
        const big = c.kind === 'capital' || c.kind === 'mega';
        // Small settlements drop out when zoomed out, like a real basemap.
        if (!big && z < 0.22) continue;
        const rad = c.kind === 'capital' ? 8 : big ? 6 : 4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, rad + 2.5, 0, Math.PI * 2);
        ctx.fillStyle = P.labelHalo;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = f.color;
        ctx.fill();
        if (c.kind === 'capital') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad - 3.5, 0, Math.PI * 2);
          ctx.fillStyle = P.labelHalo;
          ctx.fill();
        }
        if (layers.labels && (big || z > 0.3)) {
          label(c.name, p.x, p.y - rad - 7, big ? 14 : 11.5, P.label, big ? 700 : 600);
        }
      }
    } else {
      if (layers.districts && layers.labels && z > 0.14) {
        for (const d of world.districts) {
          const p = toScreen(d.x, d.y);
          if (p.x < -100 || p.y < -40 || p.x > W + 100 || p.y > H + 40) continue;
          label(d.name.toUpperCase(), p.x, p.y, 14, style === 'map' ? '#5f6368' : d.color, 800);
        }
      }

      if (layers.pois && z > 0.42) {
        for (const poi of world.pois) {
          const p = toScreen(poi.x, poi.y);
          if (p.x < -40 || p.y < -40 || p.x > W + 40 || p.y > H + 40) continue;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 10, 0, Math.PI * 2);
          ctx.fillStyle = style === 'map' ? '#ffffff' : 'rgba(2,6,16,0.85)';
          ctx.fill();
          ctx.strokeStyle = POI_TYPES[poi.type]?.color || '#fff';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.font = '11px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';
          ctx.fillText(poi.icon, p.x, p.y + 0.5);
          ctx.textBaseline = 'alphabetic';
          if (z > 0.9) label(poi.name, p.x, p.y + 23, 11, P.label);
        }
      }

      if (z > 0.5) {
        for (const mem of members) {
          if (mem.kind === 'made' && !layers.made) continue;
          if (mem.kind === 'sick' && !layers.sick) continue;
          const p = toScreen(mem.x, mem.y);
          if (p.x < -30 || p.y < -30 || p.x > W + 30 || p.y > H + 30) continue;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
          ctx.fillStyle = mem.kind === 'made' ? '#D4AF37' : '#DC2626';
          ctx.fill();
          ctx.strokeStyle = '#0b1220';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.font = '700 8px Outfit, system-ui, sans-serif';
          ctx.fillStyle = '#0b1220';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(mem.card.slice(0, 3), p.x, p.y + 0.5);
          ctx.textBaseline = 'alphabetic';
          if (z > 1.4) {
            label(mem.label, p.x, p.y - 13, 10.5, mem.kind === 'made' ? '#b8860b' : '#b91c1c', 700);
          }
        }
      }
    }

    if (selected) {
      const p = toScreen(selected.x, selected.y);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 19, 0, Math.PI * 2);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  }, [world, members, layers, style, selected]);

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

  useEffect(() => { dirtyRef.current = true; }, [cam, layers, selected, world, members, style, status]);

  useEffect(() => {
    const onResize = () => { dirtyRef.current = true; };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

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

    // Point features win over areas, so clicking an icon never selects the
    // district sitting underneath it.
    const points = [];
    if (world.kind === 'planet') {
      for (const c of world.cities) points.push({ ...c, _t: 'city' });
    } else {
      if (layers.pois) for (const p of world.pois) points.push({ ...p, _t: 'poi' });
      for (const m of members) {
        if (m.kind === 'made' && !layers.made) continue;
        if (m.kind === 'sick' && !layers.sick) continue;
        points.push({ ...m, _t: 'member' });
      }
    }
    const tol = 22 / z;
    let best = null;
    let bestD = Infinity;
    for (const n of points) {
      const dd = Math.hypot(n.x - wx, n.y - wy);
      if (dd < tol && dd < bestD) { bestD = dd; best = n; }
    }
    if (!best && world.kind === 'city') {
      const k = world.districtAt(wx, wy);
      if (k >= 0) best = { ...world.districts[k], _t: 'district' };
    }
    setSelected(best);
  };
  const onWheel = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    zoomAt(e.clientX - rect.left, e.clientY - rect.top, e.deltaY < 0 ? 1.16 : 1 / 1.16);
  };
  const onDoubleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    zoomAt(e.clientX - rect.left, e.clientY - rect.top, 1.9);
  };

  const zoomAt = (mx, my, f) => {
    setCam((c) => {
      const nz = Math.max(0.1, Math.min(14, c.z * f));
      const k = nz / c.z;
      return { z: nz, x: mx - (mx - c.x) * k, y: my - (my - c.y) * k };
    });
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

  const openCity = (name) => {
    setCityName(CITY_CHOICES.includes(name) ? name : 'Ongaku Prime');
    setMode('city');
  };

  const savePng = () => {
    if (!world) return;
    setStatus('Exporting…');
    setTimeout(() => {
      const out = document.createElement('canvas');
      out.width = WORLD_W;
      out.height = WORLD_H;
      const c = out.getContext('2d');
      const P = palette(style);

      if (world.kind === 'planet') {
        const img = c.createImageData(WORLD_W, WORLD_H);
        rasterizeTerrain(img.data, world, { x: 0, y: 0, w: WORLD_W, h: WORLD_H }, WORLD_W, WORLD_H, style, 5);
        c.putImageData(img, 0, 0);
        drawPlanetVectors(c, world, style, 1, { rivers: layers.rivers, roads: layers.roads });
        for (const city of world.cities) {
          const f = FACTIONS[city.faction];
          const rad = city.kind === 'capital' ? 13 : city.kind === 'mega' ? 10 : 7;
          c.beginPath();
          c.arc(city.x, city.y, rad, 0, Math.PI * 2);
          c.fillStyle = f.color;
          c.fill();
          c.lineWidth = 3;
          c.strokeStyle = P.labelHalo;
          c.stroke();
          c.font = '700 26px Outfit, system-ui, sans-serif';
          c.textAlign = 'center';
          c.lineWidth = 7;
          c.strokeStyle = P.labelHalo;
          c.strokeText(city.name, city.x, city.y - rad - 12);
          c.fillStyle = P.label;
          c.fillText(city.name, city.x, city.y - rad - 12);
        }
      } else {
        drawCity(c, world, style, 1, layers);
        for (const d of world.districts) {
          c.font = '800 34px Outfit, system-ui, sans-serif';
          c.textAlign = 'center';
          c.lineWidth = 9;
          c.strokeStyle = P.labelHalo;
          c.strokeText(d.name.toUpperCase(), d.x, d.y);
          c.fillStyle = style === 'map' ? '#5f6368' : d.color;
          c.fillText(d.name.toUpperCase(), d.x, d.y);
        }
        for (const poi of world.pois) {
          c.beginPath();
          c.arc(poi.x, poi.y, 14, 0, Math.PI * 2);
          c.fillStyle = style === 'map' ? '#fff' : 'rgba(2,6,16,.85)';
          c.fill();
          c.strokeStyle = POI_TYPES[poi.type]?.color || '#fff';
          c.lineWidth = 2.5;
          c.stroke();
          c.font = '600 17px Outfit, system-ui, sans-serif';
          c.textAlign = 'center';
          c.lineWidth = 5;
          c.strokeStyle = P.labelHalo;
          c.strokeText(poi.name, poi.x, poi.y + 30);
          c.fillStyle = P.label;
          c.fillText(poi.name, poi.x, poi.y + 30);
        }
        for (const mem of members) {
          if (mem.kind === 'made' && !layers.made) continue;
          if (mem.kind === 'sick' && !layers.sick) continue;
          c.beginPath();
          c.arc(mem.x, mem.y, 10, 0, Math.PI * 2);
          c.fillStyle = mem.kind === 'made' ? '#D4AF37' : '#DC2626';
          c.fill();
          c.strokeStyle = '#0b1220';
          c.lineWidth = 2.5;
          c.stroke();
        }
      }

      c.fillStyle = 'rgba(2,6,16,0.85)';
      c.fillRect(36, 36, 720, 118);
      c.strokeStyle = 'rgba(212,175,55,0.75)';
      c.lineWidth = 3;
      c.strokeRect(36, 36, 720, 118);
      c.textAlign = 'left';
      c.fillStyle = '#f8fafc';
      c.font = '800 40px Outfit, system-ui, sans-serif';
      c.fillText(world.kind === 'planet' ? 'PLANET ONGAKU' : cityName.toUpperCase(), 62, 88);
      c.fillStyle = '#cbd5e1';
      c.font = '500 20px Outfit, system-ui, sans-serif';
      c.fillText(`${world.kind === 'planet' ? 'World atlas' : 'District map'} · ${style} · seed ${seed} · dj24.net/map`, 62, 126);

      const a = document.createElement('a');
      a.download = `planet-ongaku-${world.kind}-${style}-${seed}.png`;
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
    const nice = [0.1, 0.25, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 2000];
    const pick = nice.find((n) => n >= km) || 5000;
    return { km: pick, px: pick * UNITS_PER_KM * cam.z };
  }, [cam.z]);

  return (
    <div className="wiki-page map-page">
      <Breadcrumbs />

      <header className="map-head">
        <h1>Planet Ongaku — World Generator</h1>
        <p className="map-sub">
          A procedural atlas with a real terrain engine: elevation, hillshading, climate bands and
          river networks at planet scale, then a full district map of any city with its road
          hierarchy, blocks, parks, waterfront and the home turf of both decks. Every seed builds a
          different world, and the same seed always rebuilds the same one.
        </p>
      </header>

      <div className="map-toolbar">
        <div className="map-seg">
          <button className={mode === 'planet' ? 'on' : ''} onClick={() => setMode('planet')}>🌍 Planet</button>
          <button className={mode === 'city' ? 'on' : ''} onClick={() => setMode('city')}>🏙️ City</button>
        </div>

        <div className="map-seg">
          {MAP_STYLES.map((s) => (
            <button key={s.key} className={style === s.key ? 'on' : ''} onClick={() => setStyle(s.key)}>{s.label}</button>
          ))}
        </div>

        {mode === 'city' && (
          <select className="map-select" value={cityName} onChange={(e) => setCityName(e.target.value)}>
            {CITY_CHOICES.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        )}

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
            onWheel={onWheel}
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
          <div className="map-hint">Drag to pan · scroll or double-click to zoom · click anything for detail</div>

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
                    <div><dt>Elevation</dt><dd>{selected.elev}m</dd></div>
                  </dl>
                  <p className="map-note"><strong>Climate:</strong> {selected.climate}</p>
                  {CITY_CHOICES.includes(selected.name) ? (
                    <button className="map-btn primary wide" onClick={() => openCity(selected.name)}>
                      Open district map →
                    </button>
                  ) : (
                    <p className="map-note">No district map for settlements this size yet.</p>
                  )}
                </>
              )}
              {selected._t === 'district' && (
                <>
                  <span className="map-kicker" style={{ color: selected.color }}>District</span>
                  <h3>{selected.name}</h3>
                  <p>{selected.blurb}</p>
                  <p className="map-note"><strong>Stories:</strong> {selected.stories}</p>
                  <p className="map-note">
                    <strong>Area:</strong> {(selected.area / (UNITS_PER_KM * UNITS_PER_KM)).toFixed(1)} km²
                    {' — '}a streaming chunk at production scale.
                  </p>
                  <span className="map-tag" style={{ '--tag': FACTIONS[selected.faction].color }}>
                    {FACTIONS[selected.faction].icon} {FACTIONS[selected.faction].name}
                  </span>
                </>
              )}
              {selected._t === 'poi' && (
                <>
                  <span className="map-kicker" style={{ color: POI_TYPES[selected.type]?.color }}>
                    {POI_TYPES[selected.type]?.label}
                  </span>
                  <h3>{selected.icon} {selected.name}</h3>
                  <p>{selected.note}</p>
                  <p className="map-note">📍 {selected.district}</p>
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
                  <p className="map-note">📍 {selected.data.district}</p>
                </>
              )}
              {selected._t === 'member' && selected.kind === 'sick' && (
                <>
                  <span className="map-kicker" style={{ color: '#DC2626' }}>💀 Sick 52 · cell {selected.cell + 1}</span>
                  <h3>{selected.card} — {selected.data.name}</h3>
                  <p>{selected.data.title}</p>
                  <p className="map-note">
                    Operating outside the districts. They work in cells of five or six, never in the
                    city proper — a presence, not a resident.
                  </p>
                </>
              )}
            </aside>
          )}
        </div>

        <aside className="map-legend">
          <h3>Layers</h3>
          <div className="map-layer-list">
            {mode === 'city' ? (
              <>
                <label><input type="checkbox" checked={layers.districts} onChange={() => toggle('districts')} /> District territory</label>
                <label><input type="checkbox" checked={layers.roads} onChange={() => toggle('roads')} /> Road network</label>
                <label><input type="checkbox" checked={layers.buildings} onChange={() => toggle('buildings')} /> Buildings</label>
                <label><input type="checkbox" checked={layers.pois} onChange={() => toggle('pois')} /> Points of interest</label>
                <label><input type="checkbox" checked={layers.made} onChange={() => toggle('made')} /> 🃏 Made Deck (54)</label>
                <label><input type="checkbox" checked={layers.sick} onChange={() => toggle('sick')} /> 💀 Sick 52 cells</label>
              </>
            ) : (
              <>
                <label><input type="checkbox" checked={layers.roads} onChange={() => toggle('roads')} /> Motorways & sea routes</label>
                <label><input type="checkbox" checked={layers.rivers} onChange={() => toggle('rivers')} /> Rivers & lakes</label>
              </>
            )}
            <label><input type="checkbox" checked={layers.labels} onChange={() => toggle('labels')} /> Labels</label>
            <label><input type="checkbox" checked={layers.grid} onChange={() => toggle('grid')} /> Coordinate grid</label>
          </div>

          <h3>Factions</h3>
          <ul className="map-key">
            {Object.entries(FACTIONS).map(([k, f]) => (
              <li key={k}><span className="map-dot" style={{ background: f.color }} /> {f.icon} {f.name}</li>
            ))}
          </ul>

          {mode === 'city' ? (
            <>
              <h3>Map key</h3>
              <ul className="map-key">
                {Object.entries(POI_TYPES).map(([k, t]) => (
                  <li key={k}><span className="map-ring" style={{ borderColor: t.color }} /> {t.label}</li>
                ))}
                <li><span className="map-dot" style={{ background: '#D4AF37' }} /> Made Deck member (card shown)</li>
                <li><span className="map-dot" style={{ background: '#DC2626' }} /> Sick 52 cell</li>
                <li><span className="map-line" style={{ background: '#facc15' }} /> Ring motorway</li>
                <li><span className="map-line" style={{ background: '#e2e8f0' }} /> Arterial / street</li>
              </ul>

              <h3>Districts</h3>
              <ul className="map-key">
                {DISTRICTS.map((d) => (
                  <li key={d.key}><span className="map-dot" style={{ background: d.color }} /> {d.name}</li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <h3>Terrain</h3>
              <ul className="map-key map-key-biomes">
                {BIOME_LEGEND.map((b) => (
                  <li key={b.key}>
                    <span className="map-dot" style={{ background: biomeSwatch(style, b.key) }} /> {b.label}
                  </li>
                ))}
              </ul>
              <p className="map-legend-note">
                Click a city marker, then <strong>Open district map</strong> to generate its
                districts, roads, landmarks and faction territory.
              </p>
            </>
          )}

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
            <h4>Procedural = ordinary, hand-crafted = important</h4>
            <p>
              The generator lays down terrain, districts, road hierarchy and block massing — the
              parts nobody remembers. Landmarks like Trolley Fortress, NexaGen Tower and Vantaggio's
              are placed deliberately, because those are the ones audiences actually recall.
            </p>
          </div>
          <div>
            <h4>Roads, then blocks, then lots, then buildings</h4>
            <p>
              Buildings aren't scattered. Each district picks a street orientation and block size,
              the grid carves blocks, and blocks subdivide into lots — so footprints front onto
              streets the way real ones do. That's the same pipeline a CityEngine or Houdini graph
              would run.
            </p>
          </div>
          <div>
            <h4>One perceived world, many streamed chunks</h4>
            <p>
              District boundaries double as streaming cells, and each one reports its area in km².
              Most land between 1 and 4 km², which is the chunk size a Unity streaming setup would
              load and unload beneath a single continuous world.
            </p>
          </div>
          <div>
            <h4>Both decks live on the map</h4>
            <p>
              All 54 Made Deck members sit in their home districts with full stats, and Sick 52 work
              in cells out past the district edges. The police campaign and the war campaign are
              visible on the same board.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------- utils */

// Cities keep a stable climate across regenerations of the same seed, so the
// district map's ground cover matches what the planet view showed.
function cityClimate(seed, name) {
  const table = {
    'Cloud City': 'cold', 'Northreach': 'cold', 'Ashfall': 'arid',
    'Port Sonora': 'tropical', 'Rose City': 'temperate', 'Rock City': 'arid',
  };
  return table[name] || 'temperate';
}

function biomeSwatch(style, key) {
  const P = palette(style);
  const c = P[key] || P.grass;
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}
