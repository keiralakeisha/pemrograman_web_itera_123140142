import { render, screen, fireEvent } from '@testing-library/react';
import { BookContext } from '../../context/BookContext';
import BookForm from './BookForm';

const mockAddBook = jest.fn();
const mockUpdateBook = jest.fn();

const mockContextValue = {
  addBook: mockAddBook,
  updateBook: mockUpdateBook,
};

describe('BookForm Component', () => {
  test('renders form fields correctly', () => {
    render(
      <BookContext.Provider value={mockContextValue}>
        <BookForm />
      </BookContext.Provider>
    );

    expect(screen.getByPlaceholderText(/masukkan judul buku/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/masukkan nama penulis/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /tambah/i })).toBeInTheDocument();
  });

  test('shows error when submitting empty form', () => {
    render(
      <BookContext.Provider value={mockContextValue}>
        <BookForm />
      </BookContext.Provider>
    );

    const submitButton = screen.getByRole('button', { name: /tambah/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/judul buku harus diisi/i)).toBeInTheDocument();
    expect(screen.getByText(/nama penulis harus diisi/i)).toBeInTheDocument();
  });

  test('calls addBook when form is submitted with valid data', () => {
    render(
      <BookContext.Provider value={mockContextValue}>
        <BookForm />
      </BookContext.Provider>
    );

    const titleInput = screen.getByPlaceholderText(/masukkan judul buku/i);
    const authorInput = screen.getByPlaceholderText(/masukkan nama penulis/i);
    const submitButton = screen.getByRole('button', { name: /tambah/i });

    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(submitButton);

    expect(mockAddBook).toHaveBeenCalledWith({
      title: 'Test Book',
      author: 'Test Author',
      status: 'milik'
    });
  });

  test('clears form after successful submission', () => {
    render(
      <BookContext.Provider value={mockContextValue}>
        <BookForm />
      </BookContext.Provider>
    );

    const titleInput = screen.getByPlaceholderText(/masukkan judul buku/i);
    const authorInput = screen.getByPlaceholderText(/masukkan nama penulis/i);
    const submitButton = screen.getByRole('button', { name: /tambah/i });

    fireEvent.change(titleInput, { target: { value: 'Test Book' } });
    fireEvent.change(authorInput, { target: { value: 'Test Author' } });
    fireEvent.click(submitButton);

    expect(titleInput.value).toBe('');
    expect(authorInput.value).toBe('');
  });

  test('displays edit mode when editingBook prop is provided', () => {
    const editingBook = {
      id: 1,
      title: 'Existing Book',
      author: 'Existing Author',
      status: 'baca'
    };

    render(
      <BookContext.Provider value={mockContextValue}>
        <BookForm editingBook={editingBook} onCancelEdit={jest.fn()} />
      </BookContext.Provider>
    );

    expect(screen.getByText(/edit buku/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /batal/i })).toBeInTheDocument();
  });
});