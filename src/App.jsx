import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// Pages
import Home from './pages/Home';
import PlanetOngaku from './pages/PlanetOngaku';
import PlanetOngakuCities from './pages/PlanetOngakuCities';
import FactionIndex from './pages/FactionIndex';
import FactionPage from './pages/FactionPage';
import CharacterIndex from './pages/CharacterIndex';
import CharacterPage from './pages/CharacterPage';
import Sick52Gallery from './pages/Sick52Gallery';
import Sick52Member from './pages/Sick52Member';
import TimelinePage from './pages/TimelinePage';
import SeasonsPage from './pages/SeasonsPage';
import GamesPage from './pages/GamesPage';
import WikiPage from './pages/WikiPage';
import ReligionIndex from './pages/ReligionIndex';
import ReligionPage from './pages/ReligionPage';
import DJ24Roster from './pages/DJ24Roster';
import DJ24MemberPage from './pages/DJ24MemberPage';

/* ===== Scroll to top on route change ===== */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ===== Nav ===== */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const term = searchTerm.toLowerCase().replace(/ /g, '_');
    navigate(`/planet_ongaku/cities/${term}`);
    setSearchTerm('');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`glass-nav ${scrolled ? 'scrolled' : ''}`}>
      <Link to="/" className="logo">DJ24 <span className="logo-wiki">WIKI</span></Link>
      <button className="nav-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        <span /><span /><span />
      </button>
      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <form className="nav-search" onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.1)", borderRadius: "20px", padding: "2px 10px", margin: "0 15px" }}>
          <input 
            type="text" 
            placeholder="Search Ongaku..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: "none", border: "none", color: "white", outline: "none", padding: "5px", width: "150px" }}
          />
          <button type="submit" style={{ background: "none", border: "none", cursor: "pointer", color: "white" }}>ðŸ”</button>
        </form>
        <Link to="/planet_ongaku" onClick={() => setMenuOpen(false)}>Planet Ongaku</Link>
        <Link to="/factions" onClick={() => setMenuOpen(false)}>Factions</Link>
        <Link to="/characters" onClick={() => setMenuOpen(false)}>Characters</Link>
        <Link to="/dj24-roster" onClick={() => setMenuOpen(false)}>DJ24 Roster</Link>
        <Link to="/sick52" onClick={() => setMenuOpen(false)}>Sick 52</Link>
        <Link to="/religions" onClick={() => setMenuOpen(false)}>Religions</Link>
        <Link to="/timeline" onClick={() => setMenuOpen(false)}>Timeline</Link>
        <Link to="/seasons" onClick={() => setMenuOpen(false)}>Seasons</Link>
        <Link to="/games" onClick={() => setMenuOpen(false)}>Games</Link>
      </div>
    </nav>
  );
}

/* ===== Footer ===== */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <Link to="/" className="logo">DJ24 <span className="logo-wiki">WIKI</span></Link>
        <p>DJ24: War of Sound — Fandom Wiki &copy; 2026</p>
        <div className="footer-links">
          <Link to="/planet_ongaku">Planet Ongaku</Link>
          <Link to="/planet_ongaku/cities">Cities</Link>
          <Link to="/factions">Factions</Link>
          <Link to="/characters">Characters</Link>
          <Link to="/dj24-roster">DJ24 Roster</Link>
          <Link to="/sick52">Sick 52</Link>
          <Link to="/religions">Religions</Link>
          <Link to="/timeline">Timeline</Link>
        </div>
      </div>
    </footer>
  );
}

function LegacyPlanetCityRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/planet_ongaku/cities/${slug}`} replace />;
}

/* ===== Layout ===== */
function WikiLayout({ children }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className={`wiki-layout ${isHome ? 'wiki-layout-home' : ''}`}>
      {!isHome && <Sidebar />}
      <main className="wiki-main">
        {children}
      </main>
    </div>
  );
}

/* ===== APP ===== */
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <WikiLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planet_ongaku" element={<PlanetOngaku />} />
          <Route path="/planet_ongaku/cities" element={<PlanetOngakuCities />} />
          <Route path="/planet_ongaku/cities/:slug" element={<WikiPage />} />
          <Route path="/universe" element={<Navigate to="/planet_ongaku" replace />} />
          <Route path="/Planet_Ongaku" element={<Navigate to="/planet_ongaku" replace />} />
          <Route path="/Planet_Ongaku/cities/:slug" element={<LegacyPlanetCityRedirect />} />
          <Route path="/Universe" element={<Navigate to="/planet_ongaku" replace />} />
          <Route path="/Universe/:slug" element={<Navigate to="/planet_ongaku" replace />} />
          <Route path="/factions" element={<FactionIndex />} />
          <Route path="/factions/:slug" element={<FactionPage />} />
          <Route path="/characters" element={<CharacterIndex />} />
          <Route path="/characters/:slug" element={<CharacterPage />} />
          <Route path="/sick52" element={<Sick52Gallery />} />
          <Route path="/sick52/:slug" element={<Sick52Member />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/seasons" element={<SeasonsPage />} />
          <Route path="/games" element={<GamesPage />} />
          <Route path="/wiki/:slug" element={<WikiPage />} />
          <Route path="/religions" element={<ReligionIndex />} />
          <Route path="/religions/:slug" element={<ReligionPage />} />
          <Route path="/dj24-roster" element={<DJ24Roster />} />
          <Route path="/dj24-roster/:slug" element={<DJ24MemberPage />} />
        </Routes>
      </WikiLayout>
      <Footer />
    </>
  );
}
