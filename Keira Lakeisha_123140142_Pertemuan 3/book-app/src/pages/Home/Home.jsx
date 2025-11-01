import { useState } from 'react';
import BookForm from '../../components/BookForm/BookForm';
import BookFilter from '../../components/BookFilter/BookFilter';
import BookList from '../../components/BookList/BookList';

function Home() {
  const [editingBook, setEditingBook] = useState(null);

  const handleEditBook = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div>
      <BookForm editingBook={editingBook} onCancelEdit={handleCancelEdit} />
      <BookFilter />
      <BookList onEditBook={handleEditBook} />
    </div>
  );
}

export default Home;