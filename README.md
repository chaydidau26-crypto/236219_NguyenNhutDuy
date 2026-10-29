# 236219_NguyenNhutDuy

## 1. Giới thiệu đề tài
Xây dựng hệ thống quản lý món ăn trên nền tảng đám mây.

Ứng dụng hỗ trợ quản lý thông tin món ăn như tên món,
loại món, vùng miền, nguyên liệu, giá bán và số lượng.

## 2. Công nghệ sử dụng
- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Quản lý mã nguồn: Git, GitHub
- Đóng gói: Docker
- Lưu trữ image: Docker Hub
- Triển khai: Render

## 3. Cấu trúc dự án
- frontend/: Mã nguồn giao diện React.
- backend/: Mã nguồn API Node.js và Express.

## 4. Cài đặt và chạy chương trình
Cài đặt Node.js và Git trước khi thực hiện.

### Backend
Di chuyển vào thư mục backend:
cd backend

Cài đặt các thư viện sau khi đã có package.json:
npm install

Chạy ứng dụng:
npm start

### Frontend
Di chuyển vào thư mục frontend:
cd frontend

Cài đặt các thư viện sau khi đã có package.json:
npm install

Chạy ứng dụng:
npm run dev

## 5. Cơ sở dữ liệu
Sử dụng MongoDB Atlas để lưu trữ dữ liệu món ăn.
Thông tin kết nối được cấu hình bằng biến môi trường.

## 6. Bảo mật
Không đưa file .env, mật khẩu, access token hoặc
thông tin kết nối bí mật lên GitHub.