# Thư viện sách — B25DCCC080

Bài giữa kỳ LTW2026, mã đề DE1. React với react-scripts (Create React App), JavaScript, axios và React Router v6. Không dùng thư viện UI.

## Chạy ứng dụng

```sh
npm install
npm start
```

Mở http://localhost:3000. Tạo bản production bằng `npm run build`.

## Chức năng

- Menu SPA, đánh dấu đúng trang; chi tiết không đánh dấu menu.
- Axios tải `/data/books.json`, trạng thái chờ/lỗi, AbortController cleanup.
- Danh sách, chi tiết, thêm sách, xóa, cho mượn và nhận trả.
- Tìm theo tên không phân biệt hoa thường, kết hợp bộ lọc thể loại.
- Debounce 500 ms và thông báo `Đang tìm...`.
- Kiểm tra trống trước, sau đó kiểm tra năm nguyên từ 1900 đến 2026.
- Thống kê dùng reduce; tự đổi khi dữ liệu thay đổi.
- Lưu bằng localStorage key `gk_books`; đã có dữ liệu hợp lệ thì không gọi API.
- Sau khi thêm dùng replace, quay lại ở chi tiết dùng navigate(-1).

## Cấu trúc

`App` giữ state và hàm thay đổi sách, khai báo routes. `Layout` chứa `NavBar` và `Outlet`. `BookList` giữ state lọc, dùng `FilterBar` và `BookTable`; bảng render `BookRow` bằng map và key. `AddBook` là controlled form. `BookDetail` dùng useParams, Number và find.

## Đối chiếu đề gốc

Đã đối chiếu bản PDF đầy đủ: dữ liệu 6 cuốn đúng mục 3.1; có `src/data.js`, `src/App.css`, các component tách file riêng và `student.json`. Thông tin sinh viên: Nguyễn Quốc Huy — B25DCCC080 — D23CQCC02 — DE1.

Nếu đã chạy bản dữ liệu cũ, xóa key `gk_books` trong localStorage rồi tải lại để nhận dữ liệu mẫu đúng. Ứng dụng giữ nguyên dữ liệu người dùng đã lưu theo yêu cầu đề.

## Kiểm tra thủ công

1. Xóa key `gk_books` trong DevTools rồi tải lại: trang chủ có 6 / 2 / 2015.
2. Cho mượn Clean Code: trang chủ có 3 sách đang mượn; F5 vẫn giữ trạng thái.
3. Lọc Văn học có 2 cuốn. Lọc Khoa học + tìm `vũ` có 1 cuốn. Tìm `harry` có 0.
4. Gõ `code` nhanh: chữ cập nhật ngay, hiển thị Đang tìm..., sau 500 ms còn Clean Code.
5. Thêm trống và thử năm 1899, 2027, 2000.5: hiện đúng lỗi; thêm hợp lệ có mã lớn nhất + 1.
6. Mở `/books/3`, `/books/99`, `/books/abc`; kiểm tra nút Quay lại.
7. Xóa hết: thống kê 0 / 0 / 0; F5 vẫn rỗng.

## Nộp GitHub

Tạo repo public `B25DCCC080_LTW2026_GK` không thêm README tự động, sau đó:

```sh
git remote add origin https://github.com/TAI_KHOAN/B25DCCC080_LTW2026_GK.git
git push -u origin main
```

Code ở gốc repo. Chỉ nộp link sau khi kiểm tra repo public và `npm run build` thành công.

## Kết quả kiểm tra

- `npm run build`: thành công.
- `CI=true npm test -- --watchAll=false --runInBand`: 7/7 kiểm thử thành công.
- Đã kiểm tra trên trình duyệt: thống kê ban đầu, danh sách 6 sách, cho mượn rồi tải lại vẫn giữ dữ liệu, tìm `CODE` chỉ còn Clean Code sau thời gian chờ.
- Ảnh giao diện: `preview.jpg`.
- Nếu cổng 3000 đang bận: `PORT=3001 npm start`.

