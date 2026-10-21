import { CATEGORIES } from '../data';
const FilterBar = ({ keyword, category, onQueryChange, onCategoryChange, searching }) => <div className="filters"><div className="search-field"><label htmlFor="query">Tìm kiếm</label><div className="search-line"><input id="query" type="search" placeholder="Tìm kiếm theo tên sách" value={keyword} onChange={onQueryChange} /><span role="status">{searching ? 'Đang tìm...' : ''}</span></div></div><div><label htmlFor="category">Thể loại</label><select id="category" value={category} onChange={onCategoryChange}>{['Tất cả', ...CATEGORIES].map(item => <option key={item}>{item}</option>)}</select></div></div>;
export default FilterBar;

