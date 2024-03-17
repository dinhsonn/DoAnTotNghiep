import React, { useState, useEffect } from 'react';
import ProductSaleService from '../../../services/SaleServices';
import { Link } from "react-router-dom";
import { format } from 'date-fns'; // Import thư viện date-fns

function ProductSale() {
  const [productSales, setProductSales] = useState([]);

  useEffect(() => {
    fetchProductSales();
  }, []);

  const fetchProductSales = async () => {
    try {
      const response = await ProductSaleService.getAll();
      setProductSales(response.data.content); // Lấy danh sách sản phẩm từ response.data.content
    } catch (error) {
      console.error('Lỗi khi lấy danh sách sản phẩm khuyến mãi:', error);
    }
  };
  const removeSale = async (id) => {
    try {
      await ProductSaleService.remove(id);
      setProductSales(productSales.filter((sale) => sale.id !== id));
      console.log("Image deleted successfully");
      alert("Sản phẩm đã được xóa!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const formatDate = (date) => {
    return format(new Date(date), 'MM/dd/yyyy'); // Định dạng ngày theo 'MM/dd/yyyy'
  };
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Khuyến mãi</h1>
        <Link className="btn-add" to={"/sale/create"}>
          Thêm mới
        </Link>
        <div className="row mt-3 align-items-center">
          <div className="col-12 text-end">
            <input type="text" className="search d-inline" />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
        <table className="table table-bordered" id="mytable2">
          <thead>
            <tr>
              <th className="text-center" style={{ width: '30px' }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th>Tên sản phẩm</th>
              <th>Giá bán</th>
              <th>Giá sale</th>
              <th>Số lượng bán</th>
              <th>Ngày BĐ</th>
              <th>Ngày kết thúc</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {productSales.map((productsale, index) => (
              <tr key={index} className="datarow">
                <td className="text-center">
                  <input type="checkbox" id={`checkId${index}`} />
                </td>
                <td>
                  <div className="name">
                    {productsale.productId.name}
                  </div>
                  <div className="function_style">
                    <Link to={`/sale/edit/${productsale.id}`} className="mx-1 text-primary">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <Link to={`/sale/show/${productsale.id}`} className="mx-1 text-info">
                      <i className="fas fa-eye"></i>
                    </Link>
                    <Link to="#" className="text-danger mx-1" onClick={() => removeSale(productsale.id)}>
                      <i className="fa fa-trash"></i>
                    </Link>
                  </div>
                </td>
                <td>{productsale.productId.price}</td>
                <td>{productsale.salePrice}</td>
                <td>{productsale.quantitySold}</td>
                <td>{formatDate(productsale.dateStart)}</td>
                <td>{formatDate(productsale.dateEnd)}</td>
                <td>{productsale.quantitySold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default ProductSale;
