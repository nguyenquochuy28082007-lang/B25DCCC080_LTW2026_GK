import BookRow from './BookRow';

const BookTable = ({ books, onDelete, onToggle }) => <div className="table-wrap"><table><thead><tr>{['Tên sách', 'Tác giả', 'Năm', 'Thể loại', 'Trạng thái', 'Thao tác'].map(label => <th key={label}>{label}</th>)}</tr></thead><tbody>{books.length ? books.map(book => <BookRow key={book.id} book={book} onDelete={onDelete} onToggle={onToggle} />) : <tr><td colSpan="6" className="empty">Không có dữ liệu</td></tr>}</tbody></table></div>;
export default BookTable;

