import { Link } from 'react-router-dom';
export const BookRow = ({ book, onDelete, onToggle }) => {
  const { id, title, author, year, category, available } = book;
  return <tr className={available ? '' : 'borrowed'}><td><Link to={`/books/${id}`}>{title}</Link></td><td>{author}</td><td>{year}</td><td>{category}</td><td><span className={`status ${available ? 'ready' : 'out'}`}>{available ? 'Có sẵn' : 'Đang mượn'}</span></td><td className="actions"><button onClick={() => onToggle(id)}>{available ? 'Cho mượn' : 'Nhận trả'}</button><button className="delete" onClick={() => onDelete(id)}>Xóa</button></td></tr>;
};
const BookTable = ({ books, onDelete, onToggle }) => <div className="table-wrap"><table><thead><tr>{['Tên sách', 'Tác giả', 'Năm', 'Thể loại', 'Trạng thái', 'Thao tác'].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{books.length ? books.map(book => <BookRow key={book.id} book={book} onDelete={onDelete} onToggle={onToggle} />) : <tr><td colSpan="6" className="empty">Không có dữ liệu</td></tr>}</tbody></table></div>;
export default BookTable;
