const BUILD_TAG = "qf-2817";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
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
    loadBooks();
    return () => controller.abort();
  }, []);
  const addBook = book => setBooks(current => [...current, { ...book, id: current.reduce((max, { id }) => Math.max(max, id), 0) + 1 }]);
  const deleteBook = id => setBooks(current => current.filter(book => book.id !== id));
  const toggleBook = id => setBooks(current => current.map(book => book.id === id ? { ...book, available: !book.available } : book));
  const content = page => loading ? <p role="status">Đang tải...</p> : error ? <p role="alert" className="error">{error}</p> : page;
  return <div data-build={BUILD_TAG}><Routes><Route path="/" element={<Layout />}><Route index element={content(<Home books={books} />)} /><Route path="books" element={content(<BookList books={books} onDelete={deleteBook} onToggle={toggleBook} />)} /><Route path="books/new" element={content(<AddBook onAdd={addBook} />)} /><Route path="books/:id" element={content(<BookDetail books={books} />)} /><Route path="*" element={<p>Không tìm thấy trang</p>} /></Route></Routes></div>;
};
export default App;
