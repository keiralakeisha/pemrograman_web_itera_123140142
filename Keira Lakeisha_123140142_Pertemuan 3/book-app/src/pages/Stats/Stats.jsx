import { useBookStats } from '../../hooks/useBookStats';
import './Stats.css';

function Stats() {
  const { stats } = useBookStats();

  return (
    <div className="stats-container">
      <h2>Statistik Koleksi Buku</h2>
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>Total Buku</h3>
          <p className="stat-number">{stats.total}</p>
        </div>
        <div className="stat-card owned">
          <h3>Sudah Punya</h3>
          <p className="stat-number">{stats.owned}</p>
        </div>
        <div className="stat-card reading">
          <h3>Sedang Baca</h3>
          <p className="stat-number">{stats.reading}</p>
        </div>
        <div className="stat-card wishlist">
          <h3>Mau Beli</h3>
          <p className="stat-number">{stats.wishlist}</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;