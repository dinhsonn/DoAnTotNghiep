import React, { useState, useEffect } from 'react';
import ProductService from '../../../services/ProductServices';
import ProductSaleService from '../../../services/SaleServices';

function SaleCreate() {
  const [formData, setFormData] = useState({
    productId: '',
    salePrice: '',
    quantitySold: '',
    dateStart: '',
    dateEnd: '',
    status: 1
  });
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    ProductService.getAll()
      .then(response => {
        setProducts(response.data.content);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    ProductSaleService.create(formData)
      .then(response => {
          console.log("Tạo sản phẩm thành công:", response.data);
          alert('Thêm sản phẩm thành công!')
 })
 .catch(error => {
     console.error('Lỗi khi tạo mới:', error);
 });
};

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Tạo sản phẩm khuyến mãi mới</h1>
        <div className="text-end">
          <a href="/sale" className="btn btn-sm btn-success">
            <i className="fa fa-arrow-left"></i> Về danh sách
          </a>
        </div>
      </section>
      <section className="content-body my-2">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productId" className="form-label">Chọn sản phẩm:</label>
            <select
              id="productId"
              name="productId"
              className="form-select"
              onChange={handleChange}
              value={formData.productId}
            >
              <option value="">Chọn sản phẩm</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="salePrice" className="form-label">Giá khuyến mãi:</label>
            <input
              type="number"
              id="salePrice"
              name="salePrice"
              className="form-control"
              value={formData.salePrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="quantitySold" className="form-label">Số lượng bán:</label>
            <input
              type="number"
              id="quantitySold"
              name="quantitySold"
              className="form-control"
              value={formData.quantitySold}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateStart" className="form-label">Ngày bắt đầu:</label>
            <input
              type="date"
              id="dateStart"
              name="dateStart"
              className="form-control"
              value={formData.dateStart}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="dateEnd" className="form-label">Ngày kết thúc:</label>
            <input
              type="date"
              id="dateEnd"
              name="dateEnd"
              className="form-control"
              value={formData.dateEnd}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">Trạng thái:</label>
            <select
              id="status"
              name="status"
              className="form-select"
              onChange={handleChange}
              value={formData.status}
            >
              <option value="1">Xuất bản</option>
              <option value="0">Chưa xuất bản</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">Tạo</button>
        </form>
      </section>
    </div>
  );
}

export default SaleCreate;
