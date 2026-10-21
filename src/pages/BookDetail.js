import { useNavigate, useParams } from 'react-router-dom';
const BookDetail = ({ books }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find(({ id: bookId }) => bookId === Number(id));
  return <section className="form-page"><div className="eyebrow">THÔNG TIN CUỐN SÁCH</div><h1>Chi tiết sách</h1><div className="panel detail">{book ? <><p><strong>Tên sách:</strong> {book.title}</p><p><strong>Tác giả:</strong> {book.author}</p><p><strong>Năm xuất bản:</strong> {book.year}</p><p><strong>Thể loại:</strong> {book.category}</p><p><strong>Trạng thái:</strong> {book.available ? 'Có sẵn' : 'Đang mượn'}</p></> : <p role="alert">Không tìm thấy sách</p>}<button className="button secondary" onClick={() => navigate(-1)}>Quay lại</button></div></section>;
};
export default BookDetail;

