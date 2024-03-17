import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductSaleService from '../../../services/SaleServices';
import ProductService from '../../../services/ProductServices';

function SaleEdit() {
  let { id } = useParams(); 
  const [formData, setFormData] = useState({
    productId: '',
    salePrice: '',
    quantitySold: '',
    dateStart: '',
    dateEnd: '',
    status: ''
  });

  const [products, setProducts] = useState([]);
  useEffect(() => {
    ProductService.getAll()
    .then(response => {
      setProducts(response.data.content);
    })
    .catch(error => {
      console.error('Lỗi khi lấy danh sách sản phẩm:', error);
    });
    fetchProductSale();
  }, []);

  const fetchProductSale = async () => {
    try {
      const response = await ProductSaleService.getById(id);
      setFormData(response.data);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin sản phẩm khuyến mãi:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductSaleService.update(formData,id);
      console.log("Cập nhật sản phẩm khuyến mãi thành công");
      alert("Thông tin sản phẩm đã được cập nhật!");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm khuyến mãi:", error);
      alert("Đã xảy ra lỗi khi cập nhật sản phẩm!");
    }
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Chỉnh sửa sản phẩm khuyến mãi</h1>
        <div className="text-end">
                    <a href="/sale" className="btn btn-sm btn-success">
                        <i className="fa fa-arrow-left"></i> Về danh sách
                    </a>
                </div>
      </section>
      <section className="content-body my-2">
        <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="productId" className="form-label">Product ID:</label>
                        <select id="productId" name="productId" className="form-select" value={formData.productId} onChange={handleChange}>
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
            />
          </div>
          <button type="submit" className="btn btn-primary">Cập nhật</button>
        </form>
      </section>
    </div>
  );
}

export default SaleEdit;
