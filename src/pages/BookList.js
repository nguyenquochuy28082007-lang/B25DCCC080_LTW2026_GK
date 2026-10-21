import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterBar from '../components/FilterBar';
import BookTable from '../components/BookTable';
const BookList = ({ books, onDelete, onToggle }) => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedKeyword(keyword), 500);
    return () => clearTimeout(timer);
  }, [keyword]);
  const handleQueryShift = ({ target: { value } }) => setKeyword(value);
  const filteredBooks = books.filter(({ title, category: bookCategory }) => title.toLocaleLowerCase('vi').includes(debouncedKeyword.toLocaleLowerCase('vi')) && (category === 'Tất cả' || bookCategory === category));
  return <section><div className="eyebrow">DANH MỤC THƯ VIỆN</div><div className="page-title"><div><h1>Danh sách sách</h1><p>Tìm sách và quản lý mượn trả trong một nơi.</p></div><Link className="button" to="/books/new">+ Thêm mới</Link></div><div className="panel"><FilterBar keyword={keyword} category={category} onQueryChange={handleQueryShift} onCategoryChange={({ target: { value } }) => setCategory(value)} searching={keyword !== debouncedKeyword} /><p className="count" aria-live="polite">{`Tìm thấy ${filteredBooks.length} cuốn sách`}</p><BookTable books={filteredBooks} onDelete={onDelete} onToggle={onToggle} /></div></section>;
};
export default BookList;

