const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const foodRoutes = require('./routes/foodRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint kiểm tra trạng thái hoạt động theo yêu cầu đề bài
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Backend is running smoothly!' });
});

// Sử dụng Routes quản lý món ăn
app.use('/api/foods', foodRoutes);

// Kết nối MongoDB Atlas và khởi động Server
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Kết nối thành công với MongoDB Atlas!');
        app.listen(PORT, () => {
            console.log(`Server đang chạy trên cổng ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Lỗi kết nối MongoDB:', err);
    });