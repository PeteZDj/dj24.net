import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import { getSick52Roster } from '../contentLoader';
import { madeDeckAll, madeHouses } from '../madeDeckData';
import {
  WORLD_W, WORLD_H, FACTIONS, DISTRICTS,
  generatePlanet, generateCity, renderPlanetBase, renderCityBase,
  placeMembers, randomSeedWord,
} from '../mapGenerator';

const POI_TYPES = {
  landmark: { label: 'Landmarks', color: '#FBBF24' },
  venue: { label: 'Venues & studios', color: '#E879F9' },
  food: { label: 'Restaurants & cafés', color: '#FB923C' },
  front: { label: 'Mafia fronts', color: '#D4AF37' },
  civic: { label: 'Civic & institutions', color: '#38BDF8' },
  military: { label: 'Military', color: '#34D399' },
};

const DEFAULT_LAYERS = {
  districts: true,
  roads: true,
  pois: true,
  made: true,
  sick: true,
  labels: true,
  grid: false,
};

export default function MapPage() {
  const [seed, setSeed] = useState('NEON-GRID-2481');
  const [seedInput, setSeedInput] = useState('NEON-GRID-2481');
  const [mode, setMode] = useState('planet');
  const [cityName, setCityName] = useState('Ongaku Prime');
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [selected, setSelected] = useState(null);
  const [cam, setCam] = useState({ x: 0, y: 0, z: 0.42 });
  const [busy, setBusy] = useState(false);

  const canvasRef = useRef(null);
  const baseRef = useRef(null);
  const wrapRef = useRef(null);
  const dragRef = useRef(null);
  const dirtyRef = useRef(true);
  const camRef = useRef(cam);
  camRef.current = cam;

  const sick52 = useMemo(() => getSick52Roster(), []);

  // ---- world generation -------------------------------------------------
  const world = useMemo(() => {
    if (mode === 'planet') return generatePlanet(seed);
    return generateCity(seed, cityName);
  }, [seed, mode, cityName]);

  const members = useMemo(() => {
    if (mode !== 'city') return [];
    return placeMembers(world, madeDeckAll, sick52);
  }, [world, mode, sick52]);

  // ---- base layer (rendered once per world) -----------------------------
  useEffect(() => {
    setBusy(true);
    const off = document.createElement('canvas');
    off.width = WORLD_W;
    off.height = WORLD_H;
    const octx = off.getContext('2d');
    if (mode === 'planet') renderPlanetBase(octx, world);
    else renderCityBase(octx, world);
    baseRef.current = off;
    setBusy(false);
    setSelected(null);
  }, [world, mode]);

  // ---- fit view ---------------------------------------------------------
  const fitView = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const z = Math.min(wrap.clientWidth / WORLD_W, wrap.clientHeight / WORLD_H) * 0.98;
    setCam({ x: (wrap.clientWidth - WORLD_W * z) / 2, y: (wrap.clientHeight - WORLD_H * z) / 2, z });
  }, []);

  useEffect(() => { fitView(); }, [fitView, mode]);

  // ---- draw -------------------------------------------------------------
  const draw = useCallback(() => {
    const cv = canvasRef.current;
    const wrap = wrapRef.current;
    const base = baseRef.current;
    if (!cv || !wrap || !base) return;

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
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#070c16';
    ctx.fillRect(0, 0, W, H);

    const { x: ox, y: oy, z } = camRef.current;
    ctx.save();
    ctx.translate(ox, oy);
    ctx.scale(z, z);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(base, 0, 0);

    if (layers.grid) {
      ctx.strokeStyle = 'rgba(148,163,184,0.18)';
      ctx.lineWidth = 1 / z;
      ctx.beginPath();
      for (let x = 0; x <= WORLD_W; x += 200) { ctx.moveTo(x, 0); ctx.lineTo(x, WORLD_H); }
      for (let y = 0; y <= WORLD_H; y += 200) { ctx.moveTo(0, y); ctx.lineTo(WORLD_W, y); }
      ctx.stroke();
    }
    ctx.restore();

    // ---- overlay drawn in screen space so icons stay crisp ----
    const toScreen = (wx, wy) => ({ x: wx * z + ox, y: wy * z + oy });

    if (mode === 'planet') {
      if (layers.roads) {
        ctx.lineWidth = 2;
        for (const r of world.routes) {
          const a = toScreen(r.a.x, r.a.y);
          const b = toScreen(r.b.x, r.b.y);
          ctx.strokeStyle = r.sea ? 'rgba(148,197,255,0.30)' : 'rgba(255,226,168,0.40)';
          ctx.setLineDash(r.sea ? [6, 6] : []);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }
      for (const c of world.cities) {
        const p = toScreen(c.x, c.y);
        const f = FACTIONS[c.faction];
        const rad = c.kind === 'capital' ? 11 : c.kind === 'mega' ? 8 : 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad + 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(2,6,16,0.65)';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = f.color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#0b1220';
        ctx.stroke();
        if (c.kind === 'capital') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, rad - 4, 0, Math.PI * 2);
          ctx.fillStyle = '#0b1220';
          ctx.fill();
        }
        if (layers.labels && z > 0.22) {
          ctx.font = `600 ${c.kind === 'capital' ? 15 : 12}px Outfit, system-ui, sans-serif`;
          ctx.textAlign = 'center';
          ctx.lineWidth = 4;
          ctx.strokeStyle = 'rgba(2,6,16,0.9)';
          ctx.strokeText(c.name, p.x, p.y - rad - 8);
          ctx.fillStyle = '#f1f5f9';
          ctx.fillText(c.name, p.x, p.y - rad - 8);
        }
      }
    } else {
      if (layers.districts && layers.labels && z > 0.18) {
        for (const d of world.districts) {
          const p = toScreen(d.x, d.y);
          ctx.font = '700 15px Outfit, system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.lineWidth = 5;
          ctx.strokeStyle = 'rgba(2,6,16,0.92)';
          ctx.strokeText(d.name.toUpperCase(), p.x, p.y);
          ctx.fillStyle = d.color;
          ctx.fillText(d.name.toUpperCase(), p.x, p.y);
        }
      }

      if (layers.pois && z > 0.3) {
        for (const poi of world.pois) {
          const p = toScreen(poi.x, poi.y);
          ctx.beginPath();
          ctx.arc(p.x, p.y, 11, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(2,6,16,0.85)';
          ctx.fill();
          ctx.strokeStyle = POI_TYPES[poi.type]?.color || '#fff';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.font = '12px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#fff';
          ctx.fillText(poi.icon, p.x, p.y + 0.5);
          ctx.textBaseline = 'alphabetic';
          if (z > 0.72) {
            ctx.font = '600 11px Outfit, system-ui, sans-serif';
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'rgba(2,6,16,0.9)';
            ctx.strokeText(poi.name, p.x, p.y + 24);
            ctx.fillStyle = '#e2e8f0';
            ctx.fillText(poi.name, p.x, p.y + 24);
          }
        }
      }

      for (const mem of members) {
        if (mem.kind === 'made' && !layers.made) continue;
        if (mem.kind === 'sick' && !layers.sick) continue;
        if (z < 0.35) continue;
        const p = toScreen(mem.x, mem.y);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = mem.kind === 'made' ? 'rgba(212,175,55,0.9)' : 'rgba(220,38,38,0.9)';
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
        if (z > 0.9) {
          ctx.font = '600 10px Outfit, system-ui, sans-serif';
          ctx.lineWidth = 3;
          ctx.strokeStyle = 'rgba(2,6,16,0.9)';
          ctx.strokeText(mem.label, p.x, p.y - 12);
          ctx.fillStyle = mem.kind === 'made' ? '#fde68a' : '#fca5a5';
          ctx.fillText(mem.label, p.x, p.y - 12);
        }
      }
    }

    // selection ring
    if (selected) {
      const p = toScreen(selected.x, selected.y);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 20, 0, Math.PI * 2);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    }
  }, [world, members, layers, mode, selected]);

  // Redraw only when something actually changed — panning and zooming mark
  // the canvas dirty rather than repainting a 2600x1700 bitmap every frame.
  useEffect(() => {
    let raf = 0;
    let alive = true;
    const loop = () => {
      if (!alive) return;
      if (dirtyRef.current) {
        dirtyRef.current = false;
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    dirtyRef.current = true;
    raf = requestAnimationFrame(loop);
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, [draw]);

  useEffect(() => { dirtyRef.current = true; }, [cam, layers, selected, world, members]);

  useEffect(() => {
    const onResize = () => { dirtyRef.current = true; };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ---- interaction ------------------------------------------------------
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
    if (!d || d.moved) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const { x: ox, y: oy, z } = camRef.current;
    const wx = (mx - ox) / z;
    const wy = (my - oy) / z;

    // Point features win over district areas, so a click on an icon never
    // gets swallowed by the district sitting underneath it.
    const points = [];
    if (mode === 'planet') {
      for (const c of world.cities) points.push({ ...c, _t: 'city' });
    } else {
      if (layers.pois) for (const p of world.pois) points.push({ ...p, _t: 'poi' });
      for (const m of members) {
        if (m.kind === 'made' && !layers.made) continue;
        if (m.kind === 'sick' && !layers.sick) continue;
        points.push({ ...m, _t: 'member' });
      }
    }

    const tol = 26 / z;
    let best = null;
    let bestD = Infinity;
    for (const n of points) {
      const dd = Math.hypot(n.x - wx, n.y - wy);
      if (dd < tol && dd < bestD) { bestD = dd; best = n; }
    }

    if (!best && mode === 'city') {
      const k = world.cellDistrict[
        Math.floor(wy / world.CELL) * world.GW + Math.floor(wx / world.CELL)
      ];
      if (k >= 0) best = { ...world.districts[k], _t: 'district' };
    }

    setSelected(best);
  };
  const onWheel = (e) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setCam((c) => {
      const nz = Math.max(0.12, Math.min(6, c.z * (e.deltaY < 0 ? 1.14 : 1 / 1.14)));
      const k = nz / c.z;
      return { z: nz, x: mx - (mx - c.x) * k, y: my - (my - c.y) * k };
    });
  };

  const zoomBy = (f) => {
    const wrap = wrapRef.current;
    const mx = wrap.clientWidth / 2;
    const my = wrap.clientHeight / 2;
    setCam((c) => {
      const nz = Math.max(0.12, Math.min(6, c.z * f));
      const k = nz / c.z;
      return { z: nz, x: mx - (mx - c.x) * k, y: my - (my - c.y) * k };
    });
  };

  // ---- actions ----------------------------------------------------------
  const regenerate = (s) => {
    const next = s || randomSeedWord();
    setSeed(next);
    setSeedInput(next);
  };

  const savePng = () => {
    const base = baseRef.current;
    if (!base) return;
    const out = document.createElement('canvas');
    out.width = WORLD_W;
    out.height = WORLD_H;
    const c = out.getContext('2d');
    c.drawImage(base, 0, 0);

    // overlay at world scale
    if (mode === 'planet') {
      for (const city of world.cities) {
        const f = FACTIONS[city.faction];
        const rad = city.kind === 'capital' ? 13 : city.kind === 'mega' ? 10 : 7;
        c.beginPath();
        c.arc(city.x, city.y, rad, 0, Math.PI * 2);
        c.fillStyle = f.color;
        c.fill();
        c.lineWidth = 2.5;
        c.strokeStyle = '#0b1220';
        c.stroke();
        c.font = '600 18px Outfit, system-ui, sans-serif';
        c.textAlign = 'center';
        c.lineWidth = 5;
        c.strokeStyle = 'rgba(2,6,16,0.9)';
        c.strokeText(city.name, city.x, city.y - rad - 9);
        c.fillStyle = '#f1f5f9';
        c.fillText(city.name, city.x, city.y - rad - 9);
      }
    } else {
      for (const d of world.districts) {
        c.font = '800 22px Outfit, system-ui, sans-serif';
        c.textAlign = 'center';
        c.lineWidth = 6;
        c.strokeStyle = 'rgba(2,6,16,0.92)';
        c.strokeText(d.name.toUpperCase(), d.x, d.y);
        c.fillStyle = d.color;
        c.fillText(d.name.toUpperCase(), d.x, d.y);
      }
      for (const poi of world.pois) {
        c.beginPath();
        c.arc(poi.x, poi.y, 13, 0, Math.PI * 2);
        c.fillStyle = 'rgba(2,6,16,0.85)';
        c.fill();
        c.strokeStyle = POI_TYPES[poi.type]?.color || '#fff';
        c.lineWidth = 2;
        c.stroke();
        c.font = '14px system-ui, sans-serif';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.fillStyle = '#fff';
        c.fillText(poi.icon, poi.x, poi.y);
        c.textBaseline = 'alphabetic';
        c.font = '600 13px Outfit, system-ui, sans-serif';
        c.lineWidth = 4;
        c.strokeStyle = 'rgba(2,6,16,0.9)';
        c.strokeText(poi.name, poi.x, poi.y + 27);
        c.fillStyle = '#e2e8f0';
        c.fillText(poi.name, poi.x, poi.y + 27);
      }
      for (const mem of members) {
        if (mem.kind === 'made' && !layers.made) continue;
        if (mem.kind === 'sick' && !layers.sick) continue;
        c.beginPath();
        c.arc(mem.x, mem.y, 9, 0, Math.PI * 2);
        c.fillStyle = mem.kind === 'made' ? '#D4AF37' : '#DC2626';
        c.fill();
        c.strokeStyle = '#0b1220';
        c.lineWidth = 2;
        c.stroke();
      }
    }

    // title plate
    c.fillStyle = 'rgba(2,6,16,0.82)';
    c.fillRect(24, 24, 560, 92);
    c.strokeStyle = 'rgba(212,175,55,0.7)';
    c.lineWidth = 2;
    c.strokeRect(24, 24, 560, 92);
    c.textAlign = 'left';
    c.fillStyle = '#f8fafc';
    c.font = '800 30px Outfit, system-ui, sans-serif';
    c.fillText(mode === 'planet' ? 'PLANET ONGAKU' : cityName.toUpperCase(), 44, 66);
    c.fillStyle = '#cbd5e1';
    c.font = '500 16px Outfit, system-ui, sans-serif';
    c.fillText(`${mode === 'planet' ? 'World atlas' : 'District map'} · seed ${seed} · dj24.net/map`, 44, 96);

    const a = document.createElement('a');
    a.download = `planet-ongaku-${mode}-${seed}.png`;
    a.href = out.toDataURL('image/png');
    a.click();
  };

  const toggle = (k) => setLayers((l) => ({ ...l, [k]: !l[k] }));

  const openCity = (name) => {
    setCityName(name);
    setMode('city');
  };

  return (
    <div className="wiki-page map-page">
      <Breadcrumbs />

      <header className="map-head">
        <div>
          <h1>Planet Ongaku — World Generator</h1>
          <p className="map-sub">
            A procedural atlas. Every seed builds a complete planet — continents, oceans, cities and
            trade routes — then drills into a full district map of any city with faction territory,
            landmarks, restaurants and the home turf of both decks.
          </p>
        </div>
      </header>

      <div className="map-toolbar">
        <div className="map-modes">
          <button className={mode === 'planet' ? 'on' : ''} onClick={() => setMode('planet')}>🌍 Planet</button>
          <button className={mode === 'city' ? 'on' : ''} onClick={() => setMode('city')}>🏙️ City</button>
        </div>

        {mode === 'city' && (
          <select className="map-select" value={cityName} onChange={(e) => setCityName(e.target.value)}>
            {['Ongaku Prime', 'Urban City', 'Electric City', 'Classic City', 'Rock City', 'Blue City',
              'Pop City', 'Rose City', 'Cloud City', 'Port Sonora'].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
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

        <button className="map-btn primary" onClick={() => regenerate()}>🎲 Generate new world</button>
        <button className="map-btn" onClick={() => zoomBy(1.3)}>＋</button>
        <button className="map-btn" onClick={() => zoomBy(1 / 1.3)}>－</button>
        <button className="map-btn" onClick={fitView}>Fit</button>
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
          />
          {busy && <div className="map-busy">Generating…</div>}
          <div className="map-hint">Drag to pan · scroll to zoom · click anything for detail</div>

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
                    <div><dt>Population</dt><dd>{(selected.pop / 1e6).toFixed(1)}M</dd></div>
                  </dl>
                  <button className="map-btn primary wide" onClick={() => openCity(selected.name)}>
                    Open district map →
                  </button>
                </>
              )}
              {selected._t === 'district' && (
                <>
                  <span className="map-kicker" style={{ color: selected.color }}>District</span>
                  <h3>{selected.name}</h3>
                  <p>{selected.blurb}</p>
                  <p className="map-note"><strong>Stories:</strong> {selected.stories}</p>
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
                  <span className="map-kicker" style={{ color: '#DC2626' }}>💀 Sick 52 cell</span>
                  <h3>{selected.card} — {selected.data.name}</h3>
                  <p>{selected.data.title}</p>
                  <p className="map-note">Operating outside the districts. Not a resident — a presence.</p>
                </>
              )}
            </aside>
          )}
        </div>

        <aside className="map-legend">
          <h3>Layers</h3>
          <div className="map-layer-list">
            {mode === 'city' && (
              <>
                <label><input type="checkbox" checked={layers.districts} onChange={() => toggle('districts')} /> District names</label>
                <label><input type="checkbox" checked={layers.pois} onChange={() => toggle('pois')} /> Points of interest</label>
                <label><input type="checkbox" checked={layers.made} onChange={() => toggle('made')} /> 🃏 Made Deck (52)</label>
                <label><input type="checkbox" checked={layers.sick} onChange={() => toggle('sick')} /> 💀 Sick 52 cells</label>
              </>
            )}
            {mode === 'planet' && (
              <label><input type="checkbox" checked={layers.roads} onChange={() => toggle('roads')} /> Trade & sea routes</label>
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
              <ul className="map-key">
                <li><span className="map-dot" style={{ background: '#12406b' }} /> Ocean</li>
                <li><span className="map-dot" style={{ background: '#d9c79a' }} /> Coast</li>
                <li><span className="map-dot" style={{ background: '#5f8f52' }} /> Plains</li>
                <li><span className="map-dot" style={{ background: '#3d6b3f' }} /> Forest</li>
                <li><span className="map-dot" style={{ background: '#7d7a4c' }} /> Hills</li>
                <li><span className="map-dot" style={{ background: '#7b6f63' }} /> Mountains</li>
                <li><span className="map-dot" style={{ background: '#e8eef2' }} /> Snow</li>
              </ul>
              <p className="map-legend-note">
                Click any city marker, then <strong>Open district map</strong> to generate that city's
                districts, landmarks and faction territory.
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
              The generator lays down terrain, districts, road networks and block massing — the parts
              nobody remembers. Landmarks like Trolley Fortress, NexaGen Tower and Vantaggio's are
              placed deliberately, because those are the ones audiences actually recall.
            </p>
          </div>
          <div>
            <h4>One perceived world, many streamed chunks</h4>
            <p>
              District boundaries here double as streaming cells. A district at this scale is roughly
              1–4 km² of playable space — the chunk size a Unity streaming setup would load and unload
              beneath a single continuous world.
            </p>
          </div>
          <div>
            <h4>Every district supports every genre</h4>
            <p>
              Click a district to see what it is for. Southside carries the come-up stories, Rose Hill
              the R&B, Harbour the crime procedural, Trolley the spectacle. One city, every register.
            </p>
          </div>
          <div>
            <h4>Both decks live on the map</h4>
            <p>
              All 54 Made Deck members sit in their home districts with full stats, and Sick 52 cells
              hold the margins. The police campaign and the war campaign are visible on the same board.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
