import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Đã cập nhật trỏ trực tiếp đến Backend trên Render
const API_URL = 'https://two36822-levanben.onrender.com/api/foods';

function App() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    foodId: '', name: '', category: '', cuisine: '',
    ingredients: '', price: '', quantity: '', description: '', imageUrl: ''
  });
  const [editingId, setEditingId] = useState(null);

  const fetchFoods = async (keyword = '') => {
    setLoading(true);
    setError('');
    try {
      const url = keyword ? `${API_URL}?search=${keyword}` : API_URL;
      const response = await axios.get(url);
      setFoods(response.data);
    } catch (err) {
      setError('Không thể tải dữ liệu từ server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    fetchFoods(e.target.value);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        ingredients: typeof formData.ingredients === 'string' 
          ? formData.ingredients.split(',').map(item => item.trim()) 
          : formData.ingredients,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formattedData);
        alert('Cập nhật món ăn thành công!');
      } else {
        await axios.post(API_URL, formattedData);
        alert('Thêm món ăn thành công!');
      }

      setFormData({
        foodId: '', name: '', category: '', cuisine: '',
        ingredients: '', price: '', quantity: '', description: '', imageUrl: ''
      });
      setEditingId(null);
      fetchFoods();
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (food) => {
    setEditingId(food._id);
    setFormData({
      foodId: food.foodId,
      name: food.name,
      category: food.category,
      cuisine: food.cuisine,
      ingredients: Array.isArray(food.ingredients) ? food.ingredients.join(', ') : food.ingredients,
      price: food.price,
      quantity: food.quantity,
      description: food.description || '',
      imageUrl: food.imageUrl || ''
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa món ăn này không?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        alert('Xóa thành công!');
        fetchFoods();
      } catch (err) {
        alert('Lỗi khi xóa món ăn');
      }
    }
  };

  return (
    <div className="container">
      <h1>Quản Lý Món Ăn - 236822_LeVanBen</h1>

      <form onSubmit={handleSubmit} style={{ background: '#e9ecef', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <h3>{editingId ? 'Cập Nhật Món Ăn' : 'Thêm Món Ăn Mới'}</h3>
        <input type="text" name="foodId" placeholder="Mã món ăn (foodId)" value={formData.foodId} onChange={handleInputChange} required disabled={editingId} />
        <input type="text" name="name" placeholder="Tên món ăn" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="category" placeholder="Loại món ăn" value={formData.category} onChange={handleInputChange} required />
        <input type="text" name="cuisine" placeholder="Ẩm thực / Vùng miền" value={formData.cuisine} onChange={handleInputChange} required />
        <input type="text" name="ingredients" placeholder="Nguyên liệu (phân cách bằng dấu phẩy)" value={formData.ingredients} onChange={handleInputChange} required />
        <input type="number" name="price" placeholder="Giá bán" value={formData.price} onChange={handleInputChange} required />
        <input type="number" name="quantity" placeholder="Số lượng" value={formData.quantity} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Mô tả" value={formData.description} onChange={handleInputChange}></textarea>
        <input type="text" name="imageUrl" placeholder="Đường dẫn hình ảnh URL" value={formData.imageUrl} onChange={handleInputChange} />
        <button type="submit" style={{ marginTop: '10px' }}>{editingId ? 'Cập nhật' : 'Thêm mới'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ foodId: '', name: '', category: '', cuisine: '', ingredients: '', price: '', quantity: '', description: '', imageUrl: '' }); }} style={{ background: '#6c757d', marginLeft: '5px' }}>Hủy</button>}
      </form>

      <div className="search-bar">
        <input type="text" placeholder="Tìm kiếm theo tên, loại hoặc vùng miền..." value={search} onChange={handleSearchChange} />
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Danh sách món ăn</h3>
      <table>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên món</th>
            <th>Hình ảnh</th>
            <th>Loại</th>
            <th>Vùng miền</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {foods.length > 0 ? (
            foods.map((food) => (
              <tr key={food._id}>
                <td>{food.foodId}</td>
                <td>{food.name}</td>
                <td>
                  {food.imageUrl ? (
                    <img 
                      src={food.imageUrl} 
                      alt={food.name} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} 
                    />
                  ) : (
                    <span>Không có ảnh</span>
                  )}
                </td>
                <td>{food.category}</td>
                <td>{food.cuisine}</td>
                <td>{food.price.toLocaleString()} VNĐ</td>
                <td>{food.quantity}</td>
                <td>
                  <button onClick={() => handleEdit(food)}>Sửa</button>
                  <button className="btn-danger" onClick={() => handleDelete(food._id)}>Xóa</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center' }}>Không tìm thấy món ăn nào.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
