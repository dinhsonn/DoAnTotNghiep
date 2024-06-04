import React, { useEffect, useState } from 'react';
import './profile.css';
import './Order.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';
import OrderService from '../../../services/OrderServices';

const Order = () => {
  const [userId, setUserId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
    } else {
      // Redirect to login page if not logged in
      Swal.fire({
        title: 'Bạn cần đăng nhập',
        text: 'Để xem đơn hàng, vui lòng đăng nhập hoặc đăng ký tài khoản.',
        icon: 'warning',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    }
  }, [navigate]);

  useEffect(() => {
    if (!userId) return;

    OrderService.getOrders(userId)
      .then(response => {
        // Filter orders to only include those belonging to the logged-in user
        const userOrders = response.data.filter(order => order.user.id === userId);
        setOrders(userOrders);
        setLoading(false);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách đơn hàng:', error);
        setLoading(false);
      });
  }, [userId]);

  const renderOrders = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (!orders.length) {
      return <p>Không có đơn hàng nào.</p>;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(orders.length / itemsPerPage);

    return (
      <>
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
                      {item.product && item.product.name}
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
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? 'active' : ''}
            >
              {page}
            </button>
          ))}
        </div>
      </>
    );
  };

  const getImgUrl = (imageName) => {
    const endpoint = 'productimages';
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

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

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="order-content">
        <h2>Danh sách đơn hàng</h2>
        {loading ? <p>Loading...</p> : renderOrders()}
      </div>
    </div>
  );
};

export default Order;
