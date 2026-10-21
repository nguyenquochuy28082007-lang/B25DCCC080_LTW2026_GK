import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const AddBook = ({ onAdd }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', author: '', year: '', category: 'Văn học' });
  const [message, setMessage] = useState('');
  const handleChange = ({ target: { name, value } }) => setForm(current => ({ ...current, [name]: value }));
  const handleSubmit = event => {
    event.preventDefault();
    const { title, author, year, category } = form;
    if (![title, author, year, category].every(value => value.trim())) { setMessage('Vui lòng nhập đầy đủ thông tin'); return; }
    const numericYear = Number(year);
    if (!Number.isInteger(numericYear) || numericYear < 1900 || numericYear > 2026) { setMessage('Năm xuất bản phải từ 1900 đến 2026'); return; }
    onAdd({ title: title.trim(), author: author.trim(), year: numericYear, category, available: true });
    navigate('/books', { replace: true });
  };
  return <section className="form-page"><div className="eyebrow">BỔ SUNG DANH MỤC</div><h1>Thêm mới sách</h1><p>Nhập thông tin cuốn sách để thêm vào thư viện.</p><form className="panel book-form" onSubmit={handleSubmit} noValidate><label htmlFor="title">Tên sách</label><input id="title" name="title" value={form.title} onChange={handleChange} placeholder="Nhập tên sách" /><label htmlFor="author">Tác giả</label><input id="author" name="author" value={form.author} onChange={handleChange} placeholder="Nhập tên tác giả" /><div className="form-grid"><div><label htmlFor="year">Năm xuất bản</label><input id="year" name="year" type="number" step="any" value={form.year} onChange={handleChange} placeholder="1900 – 2026" /></div><div><label htmlFor="new-category">Thể loại</label><select id="new-category" name="category" value={form.category} onChange={handleChange}>{['Văn học', 'Khoa học', 'CNTT'].map(item => <option key={item}>{item}</option>)}</select></div></div><button className="button" type="submit">Thêm</button>{message && <p className="error" role="alert">{message}</p>}</form></section>;
};
export default AddBook;
