# 236822_LeVanBen - Đồ án Ứng dụng Web Quản lý Món ăn

## 1. Thông tin đề tài
* **Sinh viên thực hiện:** Lê Văn Bến
* **Mã số sinh viên:** 236822
* **Công nghệ sử dụng:** 
  * **Backend:** Node.js, Express, Mongoose (MongoDB Atlas)
  * **Frontend:** React.js, Axios
  * **Database:** MongoDB Atlas (`236822_LeVanBen`)
  * **Containerization:** Docker & Docker Hub
  * **Cloud Deployment:** Render

---

## 2. Cấu trúc thư mục dự án
```text
236822_LeVanBen/
├── backend/          # Mã nguồn Backend API
│   ├── models/       # Định nghĩa Schema (Food.js)
│   ├── routes/       # Định nghĩa các tuyến đường API (foodRoutes.js)
│   ├── Dockerfile    # Cấu hình Docker đóng gói Backend
│   ├── server.js     # Điểm khởi chạy ứng dụng Server
│   └── package.json
├── frontend/         # Mã nguồn Giao diện React
│   ├── public/
│   ├── src/
│   └── package.json
└── README.md         # Tài liệu hướng dẫn dự án

## 🚀 Thông tin triển khai (Deployment Links)
- **Frontend App (Render):** https://web-236822-levanben.onrender.com
- **Backend API (Render):** https://two36822-levanben.onrender.com/api/foods
- **Database:** MongoDB Atlas

---

## 5. Hướng dẫn chạy Frontend bằng Docker (Câu 6)

1. Mở terminal tại thư mục `frontend`:
   ```bash
   cd frontend
