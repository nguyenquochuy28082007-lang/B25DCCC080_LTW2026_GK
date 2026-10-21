import { NavLink } from 'react-router-dom';

const NavBar = () => (
  <header className="header">
    <div className="brand"><span className="brand-icon">▤</span><span>THƯ VIỆN KHOA<small>Không gian tri thức</small></span></div>
    <nav aria-label="Menu chính">
      <NavLink to="/" end>Trang chủ</NavLink>
      <NavLink to="/books" end>Danh sách</NavLink>
      <NavLink to="/books/new" end>Thêm mới</NavLink>
    </nav>
  </header>
);
export default NavBar;

