import { NavLink, Outlet } from 'react-router-dom';

export const NavBar = () => (
  <header className="header">
    <div className="brand"><span className="brand-icon">▤</span><span>THƯ VIỆN KHOA<small>Không gian tri thức</small></span></div>
    <nav aria-label="Menu chính">
      <NavLink to="/" end>Trang chủ</NavLink>
      <NavLink to="/books" end>Danh sách</NavLink>
      <NavLink to="/books/new" end>Thêm mới</NavLink>
    </nav>
  </header>
);
const Layout = () => <><NavBar /><main><Outlet /></main><footer>THƯ VIỆN SÁCH <span>Quản lý sách · Kết nối tri thức</span></footer></>;
export default Layout;
