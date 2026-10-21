import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => <><NavBar /><main><Outlet /></main><footer>THƯ VIỆN SÁCH <span>Quản lý sách · Kết nối tri thức</span></footer></>;
export default Layout;

