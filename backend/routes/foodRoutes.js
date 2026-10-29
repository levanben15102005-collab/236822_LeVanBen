const express = require('express');
const router = express.Router();
const Food = require('../models/Food');

// 1. Lấy danh sách món ăn & Hỗ trợ tìm kiếm theo từ khóa
router.get('/', async (req, res) => {
    try {
        const { search } = req.query;
        let query = {};
        if (search) {
            const regex = new RegExp(search, 'i');
            query = {
                $or: [
                    { name: regex },
                    { category: regex },
                    { cuisine: regex }
                ]
            };
        }
        const foods = await Food.find(query);
        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server khi lấy danh sách món ăn', error: error.message });
    }
});

// 2. Xem thông tin một món ăn theo ID
router.get('/:id', async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Không tìm thấy món ăn' });
        }
        res.status(200).json(food);
    } catch (error) {
        res.status(400).json({ message: 'ID không hợp lệ hoặc lỗi server', error: error.message });
    }
});

// 3. Thêm món ăn mới (Kiểm tra trùng foodId)
router.post('/', async (req, res) => {
    try {
        const { foodId, name, category, cuisine, ingredients, price, quantity, description, imageUrl } = req.body;
        if (!foodId || !name || !category || !cuisine || price === undefined || quantity === undefined) {
            return res.status(400).json({ message: 'Vui lòng điền đầy đủ các trường bắt buộc' });
        }
        const existingFood = await Food.findOne({ foodId });
        if (existingFood) {
            return res.status(400).json({ message: `Mã món ăn ${foodId} đã tồn tại` });
        }
        const newFood = new Food({
            foodId, name, category, cuisine, ingredients, price, quantity, description, imageUrl
        });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi thêm món ăn', error: error.message });
    }
});

// 4. Cập nhật thông tin món ăn
router.put('/:id', async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedFood) {
            return res.status(404).json({ message: 'Không tìm thấy món ăn để cập nhật' });
        }
        res.status(200).json(updatedFood);
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi cập nhật món ăn', error: error.message });
    }
});

// 5. Xóa món ăn
router.delete('/:id', async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) {
            return res.status(404).json({ message: 'Không tìm thấy món ăn để xóa' });
        }
        res.status(200).json({ message: 'Xóa món ăn thành công', deletedFood });
    } catch (error) {
        res.status(400).json({ message: 'Lỗi khi xóa món ăn', error: error.message });
    }
});

module.exports = router;