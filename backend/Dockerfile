# Sử dụng Image Node.js chính thức phiên bản nhẹ (LTS)
FROM node:18-alpine

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Sao chép package.json và package-lock.json trước để tận dụng caching layer
COPY package*.json ./

# Cài đặt các gói phụ thuộc (dependencies)
RUN npm install

# Sao chép toàn bộ mã nguồn backend còn lại vào container
COPY . .

# Mở cổng 5000 (trùng với cổng chạy server)
EXPOSE 5000

# Lệnh khởi chạy ứng dụng khi container bắt đầu chạy
CMD ["npm", "start"]