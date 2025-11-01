import { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import './BookFilter.css';

function BookFilter() {
  const { searchQuery, setSearchQuery, statusFilter, setStatusFilter } = useContext(BookContext);

  return (
    <div className="filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Cari judul atau penulis..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="filter-buttons">
        <button
          className={statusFilter === 'all' ? 'active' : ''}
          onClick={() => setStatusFilter('all')}
        >
          Semua
        </button>
        <button
          className={statusFilter === 'milik' ? 'active' : ''}
          onClick={() => setStatusFilter('milik')}
        >
          Sudah Punya
        </button>
        <button
          className={statusFilter === 'baca' ? 'active' : ''}
          onClick={() => setStatusFilter('baca')}
        >
          Sedang Baca
        </button>
        <button
          className={statusFilter === 'beli' ? 'active' : ''}
          onClick={() => setStatusFilter('beli')}
        >
          Mau Beli
        </button>
      </div>
    </div>
  );
}

export default BookFilter;