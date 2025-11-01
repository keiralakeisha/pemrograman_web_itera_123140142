import { useState, useContext, useEffect } from 'react';
import { BookContext } from '../../context/BookContext';
import './BookForm.css';

function BookForm({ editingBook, onCancelEdit }) {
  const { addBook, updateBook } = useContext(BookContext);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    status: 'milik'
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingBook) {
      setFormData({
        title: editingBook.title,
        author: editingBook.author,
        status: editingBook.status
      });
    }
  }, [editingBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Judul buku harus diisi';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Nama penulis harus diisi';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (editingBook) {
      updateBook(editingBook.id, formData);
      onCancelEdit();
    } else {
      addBook(formData);
    }

    setFormData({ title: '', author: '', status: 'milik' });
    setErrors({});
  };

  const handleCancel = () => {
    setFormData({ title: '', author: '', status: 'milik' });
    setErrors({});
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <div className="book-form-container">
      <h2>{editingBook ? 'Edit Buku' : 'Tambah Buku Baru'}</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label>Judul Buku</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Masukkan judul buku"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label>Penulis</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Masukkan nama penulis"
          />
          {errors.author && <span className="error">{errors.author}</span>}
        </div>

        <div className="form-group">
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="milik">Sudah Punya</option>
            <option value="baca">Sedang Baca</option>
            <option value="beli">Mau Beli</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            {editingBook ? 'Update' : 'Tambah'}
          </button>
          {editingBook && (
            <button type="button" onClick={handleCancel} className="btn-secondary">
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default BookForm;