import React, { useEffect, useState } from 'react';
import './profile.css';
import Sidebar from './Sidebar';
import OrderService from '../../../services/OrderServices';

const Order = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2); // Số sản phẩm mỗi trang

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
    }
  }, []);

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

  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; 
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="profile-container">
        <Sidebar />
        <div className="profile-content">
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
                  <td className="status-col">{item.status}</td>

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
