const BUILD_TAG = "qf-2817";
/* eslint-disable import/first */
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';
import BookList from './pages/BookList';
import AddBook from './pages/AddBook';
import BookDetail from './pages/BookDetail';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    const loadBooks = async () => {
      try {
        const { data } = await axios.get('/data/books.json', { signal: controller.signal });
        setBooks(data);
      } catch (err) {
        if (axios.isCancel(err)) return;
        setError('Không tải được dữ liệu');
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };
    // Dữ liệu đã lưu được ưu tiên; dữ liệu hỏng sẽ tải lại từ API.
    try {
      const saved = localStorage.getItem('gk_books');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.every(book => book && Number.isInteger(book.id) && typeof book.title === 'string' && typeof book.author === 'string' && Number.isInteger(book.year) && typeof book.category === 'string' && typeof book.available === 'boolean')) {
          setBooks(parsed);
          setLoading(false);
          return () => controller.abort();
        }
      }
    } catch {
      // Trình duyệt chặn lưu trữ hoặc JSON hỏng: vẫn dùng được API.
    }
    loadBooks();
    return () => controller.abort();
  }, []);
  useEffect(() => {
    if (!loading && !error) {
      try { localStorage.setItem('gk_books', JSON.stringify(books)); }
      catch { /* Vẫn cho phép sử dụng khi trình duyệt chặn lưu trữ. */ }
    }
  }, [books, loading, error]);
  const addBook = book => setBooks(current => [...current, { ...book, id: current.reduce((max, { id }) => Math.max(max, id), 0) + 1 }]);
  const deleteBook = id => setBooks(current => current.filter(book => book.id !== id));
  const toggleBook = id => setBooks(current => current.map(book => book.id === id ? { ...book, available: !book.available } : book));
  const content = page => loading ? <p role="status">Đang tải...</p> : error ? <p role="alert" className="error">{error}</p> : page;
  return <div data-build={BUILD_TAG}><Routes><Route path="/" element={<Layout />}><Route index element={content(<Home books={books} />)} /><Route path="books" element={content(<BookList books={books} onDelete={deleteBook} onToggle={toggleBook} />)} /><Route path="books/new" element={content(<AddBook onAdd={addBook} />)} /><Route path="books/:id" element={content(<BookDetail books={books} />)} /><Route path="*" element={<p>Không tìm thấy trang</p>} /></Route></Routes></div>;
};
export default App;
