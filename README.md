# Quản lý thư viện sách

Bài kiểm tra giữa kỳ môn Lập trình Web – Đề 1.

- Họ tên: Nguyễn Quốc Huy
- Mã sinh viên: B25DCCC080
- Lớp: D23CQCC02

## Cách chạy

```bash
npm install
npm start
```

Truy cập http://localhost:3000 để mở ứng dụng.

```bash
npm run build
```

## Các chức năng đã làm

- Xem thống kê số sách và số sách đang cho mượn ở trang chủ.
- Xem danh sách, chi tiết sách, thêm và xóa sách.
- Cho mượn sách và nhận trả.
- Tìm theo tên sách, lọc theo thể loại. Kết quả tìm kiếm cập nhật sau khi ngừng gõ 0,5 giây.
- Kiểm tra thông tin khi thêm sách, năm xuất bản từ 1900 đến 2026.
- Lưu dữ liệu trên trình duyệt để tải lại trang không bị mất.

Bài dùng React, React Router v6 và axios. Dữ liệu ban đầu nằm trong `public/data/books.json`.
