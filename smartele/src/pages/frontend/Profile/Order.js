import React, { useEffect, useState } from 'react';
import './profile.css';
import './Order.css';

import Sidebar from './Sidebar';
import OrderService from '../../../services/OrderServices';

const Order = () => {
  // State
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Số sản phẩm mỗi trang

  // Effect hook để lấy userId từ localStorage khi component được render
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
    }
  }, []);

  // Effect hook để lấy danh sách đơn hàng từ API khi userId thay đổi
  useEffect(() => {
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }

    OrderService.getOrders()
      .then((response) => {
        const userCartItems = response.data.filter(item => item.user.id === userId);
        setOrders(userCartItems);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [userId]);

  // Helper function để lấy URL của ảnh sản phẩm từ tên hình ảnh
  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; 
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

  // Helper function để lấy chuỗi trạng thái từ giá trị status
  const getStatusText = (status) => {
    switch (status) {
      case 1:
        return "Chờ xác nhận";
      case 2:
        return "Đã xác nhận";
      case 3:
        return "Đang giao hàng";
      case 4:
        return "Giao thành công";
      default:
        return "Trạng thái không xác định";
    }
  };

  // Tính toán index của item cuối cùng trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Handler để chuyển sang trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler để chuyển sang trang trước đó
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handler để điều hướng đến trang cụ thể
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // JSX rendering
  return (
    <div>
      <div className="profile-container">
        <Sidebar />
        <div className="order-content">
          <h2>Danh sách đơn hàng</h2>
          <table className="table">
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="product-col">
                    <div className="product">
                      <figure className="product-media">
                        <img
                          src={getImgUrl(item.image)}
                          alt="Product image"
                        />
                      </figure>
                      <h3 className="product-title">
                        {item.product.name}
                      </h3>
                    </div>
                  </td>
                  <td className="quantity-col">
                    <div className="cart-product-quantity">
                      <span>Số lượng: {item.qty}</span>
                    </div>
                  </td>
                  <td className="total-col">
                    ${item.price * item.qty}
                  </td>
                  <td className="status-col">
                    {getStatusText(item.status)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={currentPage === page ? 'active' : ''}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
