import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import './App.css';

function App() {
  return (
    <BookProvider>
      <Router>
        <div className="app-container">
          <header className="header">
            <h1>📚 Manajemen Buku Pribadi</h1>
            <p>Kelola koleksi bukumu dengan mudah</p>
            <nav className="nav-links">
              <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                Beranda
              </NavLink>
              <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>
                Statistik
              </NavLink>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </Router>
    </BookProvider>
  );
}

export default App;