import { createContext, useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useLocalStorage('books', []);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const addBook = (book) => {
    const newBook = {
      id: Date.now(),
      ...book,
      createdAt: new Date().toISOString()
    };
    setBooks([...books, newBook]);
  };

  const updateBook = (id, updatedBook) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    ));
  };

  const deleteBook = (id) => {
    if (window.confirm('Yakin mau hapus buku ini?')) {
      setBooks(books.filter(book => book.id !== id));
    }
  };

  const getFilteredBooks = () => {
    let filtered = books;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(book => book.status === statusFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const value = {
    books,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    addBook,
    updateBook,
    deleteBook,
    getFilteredBooks
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}