import { Link } from 'react-router-dom';
const Home = ({ books }) => {
  const borrowed = books.reduce((total, { available }) => total + (available ? 0 : 1), 0);
  const newest = books.reduce((year, book) => Math.max(year, book.year), 0);
  return <section>
    <div className="eyebrow">TỔNG QUAN THƯ VIỆN</div>
    <div className="hero"><div><h1>Thư viện sách</h1><p>Chào mừng bạn đến với thư viện khoa.<br />Theo dõi sách, quản lý mượn trả và khám phá kho tri thức.</p><Link className="button" to="/books">Xem danh sách sách <span>→</span></Link></div><div className="book-art" aria-hidden="true"><div className="book-spine one">VĂN HỌC</div><div className="book-spine two">KHOA HỌC</div><div className="book-spine three">CÔNG NGHỆ</div></div></div>
    <h2>Tình hình thư viện</h2><div className="stats"><article><span className="stat-label">Tổng số sách: <strong>{books.length}</strong></span><small>Cuốn sách trong thư viện</small></article><article><span className="stat-label">Số sách đang cho mượn: <strong>{borrowed}</strong></span><small>Theo dõi tình trạng mượn trả</small></article><article><span className="stat-label">Năm xuất bản mới nhất: <strong>{newest}</strong></span><small>Cập nhật từ danh mục hiện tại</small></article></div>
    <div className="note"><div><h2>Thêm một cuốn sách, mở thêm một thế giới.</h2><p>Bổ sung sách mới vào danh mục của thư viện.</p></div><Link to="/books/new" className="button secondary">+ Thêm mới</Link></div>
  </section>;
};
export default Home;
