import { useContext } from 'react';
import { BookContext } from '../../context/BookContext';
import { useBookStats } from '../../hooks/useBookStats';
import './BookList.css';

function BookList({ onEditBook }) {
  const { deleteBook, getFilteredBooks } = useContext(BookContext);
  const { getStatusLabel } = useBookStats();
  const filteredBooks = getFilteredBooks();

  if (filteredBooks.length === 0) {
    return (
      <div className="empty-state">
        <p>Belum ada buku yang ditambahkan</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      {filteredBooks.map((book) => (
        <div key={book.id} className="book-card">
          <div className="book-info">
            <h3>{book.title}</h3>
            <p className="author">oleh {book.author}</p>
            <span className={`status-badge status-${book.status}`}>
              {getStatusLabel(book.status)}
            </span>
          </div>
          <div className="book-actions">
            <button onClick={() => onEditBook(book)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => deleteBook(book.id)} className="btn-delete">
              Hapus
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;