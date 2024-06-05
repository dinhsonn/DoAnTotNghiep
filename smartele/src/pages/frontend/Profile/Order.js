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
  const [selectedTab, setSelectedTab] = useState('pendingPayment');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.id) {
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
        if (response.data) {
          const userOrders = response.data.filter(order => order.user.id === userId);
          setOrders(userOrders);
        } else {
          console.error('No data received from the server');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
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

    const filteredOrders = orders.filter(order => {
      if (selectedTab === 'pendingPayment') {
        return order.status === 1;
      } else if (selectedTab === 'pendingDelivery') {
        return order.status === 2;
      } else if (selectedTab === 'completed') {
        return order.status === 3;
      }
      return false;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

    return (
      <>
        <table className="table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Số lượng</th>
              <th>Tổng cộng</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
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
                    <span>{item.qty}</span>
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
        return "Đang giao hàng";
      case 3:
        return "Đã hoàn thành";
      default:
        return "Người nhận không nhận hàng";
    }
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="order-content">
        <h2>Danh sách đơn hàng</h2>
        <div className="tabs">
          <button
            onClick={() => setSelectedTab('pendingPayment')}
            className={selectedTab === 'pendingPayment' ? 'active' : ''}
          >
            Chờ xác nhận
          </button>
          <button
            onClick={() => setSelectedTab('pendingDelivery')}
            className={selectedTab === 'pendingDelivery' ? 'active' : ''}
          >
            Chờ giao hàng
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={selectedTab === 'completed' ? 'active' : ''}
          >
            Đã hoàn thành
          </button>
        </div>
        {renderOrders()}
      </div>
    </div>
  );
};

export default Order;
