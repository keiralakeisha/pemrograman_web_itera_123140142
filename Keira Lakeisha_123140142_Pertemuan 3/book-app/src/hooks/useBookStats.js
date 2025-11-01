import { useContext } from 'react';
import { BookContext } from '../context/BookContext';

export function useBookStats() {
  const { books } = useContext(BookContext);

  const stats = {
    total: books.length,
    owned: books.filter(b => b.status === 'milik').length,
    reading: books.filter(b => b.status === 'baca').length,
    wishlist: books.filter(b => b.status === 'beli').length
  };

  const getStatusLabel = (status) => {
    const labels = {
      milik: 'Sudah Punya',
      baca: 'Sedang Baca',
      beli: 'Mau Beli'
    };
    return labels[status] || status;
  };

  return { stats, getStatusLabel };
}