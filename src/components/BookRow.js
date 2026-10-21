import { Link } from 'react-router-dom';

const BookRow = ({ book, onDelete, onToggle }) => {
  const { id, title, author, year, category, available } = book;
  return <tr className={available ? '' : 'borrowed'}><td><Link to={`/books/${id}`}>{title}</Link></td><td>{author}</td><td>{year}</td><td>{category}</td><td><span className={`status ${available ? 'ready' : 'out'}`}>{available ? 'Có sẵn' : 'Đang mượn'}</span></td><td className="actions"><button onClick={() => onToggle(id)}>{available ? 'Cho mượn' : 'Nhận trả'}</button><button className="delete" onClick={() => onDelete(id)}>Xóa</button></td></tr>;
};
export default BookRow;

