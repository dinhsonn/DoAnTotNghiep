import React, { useEffect, useState } from 'react';
import './profile.css';
import './Order.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Sidebar from './Sidebar';
import OrderService from '../../../services/OrderServices';
import ReportService from '../../../services/ReportServices';

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

  const handleReport = (orderId) => {
    Swal.fire({
      title: 'Báo cáo đơn hàng',
      input: 'textarea',
      inputLabel: 'Nội dung báo cáo',
      inputPlaceholder: 'Nhập nội dung...',
      showCancelButton: true,
      confirmButtonText: 'Gửi báo cáo',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const report = {
          order: { id: orderId },
          user: { id: userId },
          content: result.value
        };
        ReportService.submitReport(report)
          .then(() => {
            Swal.fire('Báo cáo thành công!', '', 'success');
          })
          .catch((error) => {
            Swal.fire('Lỗi khi gửi báo cáo', error.message, 'error');
          });
      }
    });
  };
  const formatCurrency = (number) => {
    return number.toLocaleString('vi-VN') + 'đ';
  };
  const renderOrders = () => {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (!orders.length) {
      return <p>Không có đơn hàng nào.</p>;
    }

    const filteredOrders = orders.filter(order => {
      switch (selectedTab) {
        case 'pendingPayment':
          return order.status === OrderStatus.PENDING_PAYMENT;
        case 'confirmed':
          return order.status === OrderStatus.CONFIRMED;
        case 'pendingDelivery':
          return order.status === OrderStatus.PENDING_DELIVERY;
        case 'delivered':
          return order.status === OrderStatus.DELIVERED;
        case 'completed':
          return order.status === OrderStatus.COMPLETED;
        case 'cancelled':
          return order.status === OrderStatus.CANCELLED;
        case 'returned':
          return order.status === OrderStatus.RETURNED;
        default:
          return false;
      }
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
              <th></th>
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
                  ${formatCurrency(item.price * item.qty)}
                </td>
                <td className="status-col">
                  {getStatusText(item.status)}
                </td>
                <td className="action-col">
                  {item.status === OrderStatus.PENDING_DELIVERY && (
                    <button onClick={() => handleReport(item.id)}>Báo cáo</button>
                  )}
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
      case OrderStatus.PENDING_PAYMENT:
        return "Chờ xác nhận";
      case OrderStatus.CONFIRMED:
        return "Đã xác nhận";
      case OrderStatus.PENDING_DELIVERY:
        return "Đang giao hàng";
      case OrderStatus.DELIVERED:
        return "Đã giao";
      case OrderStatus.COMPLETED:
        return "Đã hoàn thành";
      case OrderStatus.CANCELLED: 
        return "Đã hủy";
      case OrderStatus.RETURNED:
        return "Trả hàng";
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
            onClick={() => setSelectedTab('confirmed')}
            className={selectedTab === 'confirmed' ? 'active' : ''}
          >
            Đã xác nhận
          </button>
          <button
            onClick={() => setSelectedTab('pendingDelivery')}
            className={selectedTab === 'pendingDelivery' ? 'active' : ''}
          >
            Chờ giao hàng
          </button>
          <button
            onClick={() => setSelectedTab('delivered')}
            className={selectedTab === 'delivered' ? 'active' : ''}
          >
            Đã giao
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={selectedTab === 'completed' ? 'active' : ''}
          >
            Đã hoàn thành
          </button>
          <button
            onClick={() => setSelectedTab('cancelled')}
            className={selectedTab === 'cancelled' ? 'active' : ''}
          >
            Đã hủy
          </button>
        </div>
        {renderOrders()}
      </div>
    </div>
  );
};

const OrderStatus = {
  PENDING_PAYMENT: 1,
  CONFIRMED: 2,
  PENDING_DELIVERY: 3,
  DELIVERED: 4,
  COMPLETED: 5,
  CANCELLED: 6,
  RETURNED: 7,
};

export default Order;
