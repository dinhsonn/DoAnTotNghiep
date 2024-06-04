import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CartService from "../../../services/CartServices";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderServices";
import axios from 'axios';
import ProductService from "../../../services/ProductServices";

function Checkout() {
  document.title = "Checkout";
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentUrl, setPaymentUrl] = useState('');
  const [checkouts, setCheckouts] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && !/^\d+$/.test(value)) {
      return;
    }
    setCheckouts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
    } else {
      // Nếu chưa đăng nhập, hiển thị thông báo
      Swal.fire({
        icon: "info",
        title: "Bạn cần đăng nhập",
        text: "Vui lòng đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/')
        } else {

        }
      });
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    CartService.getCarts()
      .then(async (response) => {
        const userCartItems = response.data.filter(
          (item) => item.user.id === userId
        );

        const cartItemsWithProducts = await Promise.all(
          userCartItems.map(async (item) => {
            const productResponse = await ProductService.getById(item.productId);
            return {
              ...item,
              product: productResponse.data,
            };
          })
        );

        setCartItems(cartItemsWithProducts);
        calculateTotal(cartItemsWithProducts);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
        Swal.fire("Error", "An error occurred while fetching cart items", "error");
      });
  }, [userId]);

  const calculateTotal = (items) => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.price * item.qty;
    }, 0);
    setTotalAmount(total);
  };

  const removeSelectedItemsFromCart = () => {
    Promise.all(
      cartItems.map(item =>
        CartService.removeItemFromCart(item.id, item.product.id)
      )
    )
      .then(() => {
        navigate('/');
        
      })
      .catch(error => {
        console.error('Error removing selected items from cart:', error);
      });
  };

  const handleAddToOrder = (productId, name, email, phone, address, qty, price, image, paymentMethod) => {
    console.log("Adding to order:", productId, name, email, phone, address, qty, price, image, paymentMethod);
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }
    const amount = (price * qty) * 100;
    
    OrderService.addItemToOrder(userId, productId, name, email, phone, address, qty, price, image, paymentMethod)
      .then(() => {
        if (paymentMethod === 'Thanh toán VNpay') {
          axios.get('http://localhost:8082/pay', { params: { amount } })
            .then(response => {
              removeSelectedItemsFromCart();
              navigate('/');
              setPaymentUrl(response.data);
              window.location.href = response.data;
            })
            .catch(error => {
              console.error("Error redirecting to VNPay payment:", error);
            });
        } else {
          Swal.fire({
            title: 'Thanh toán thành công',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            sendToGoogleForm(userId, productId, qty, price, image, paymentMethod);
            removeSelectedItemsFromCart();
            navigate('/');
          });
        }
      })
      .catch((error) => {
        console.error("Error adding to order: ", error);
      });
  };

  const sendToGoogleForm = async (userId, productId, qty, price, image, paymentMethod) => {
    const formData = new FormData();
    formData.append("entry.694064165", checkouts.name); 
    formData.append("entry.1252455685", checkouts.email);
    formData.append("entry.559052945", checkouts.phone); 
    formData.append("entry.85101321", checkouts.address);
    formData.append("entry.1145311346", userId); 
    try {
      const productResponse = await ProductService.getById(productId);
      const productName = productResponse.data.name;
      formData.append("entry.774530511", productId);
      formData.append("entry.57843749", productName);
      formData.append("entry.1801308158", qty); 
      formData.append("entry.1183188484", image);
      formData.append("entry.1848489601", price); 
      formData.append("entry.850051139", paymentMethod);
  
      fetch("https://docs.google.com/forms/u/0/d/e/1FAIpQLSczuHh35WNsFQ-2Q9hv-vYzYtc03jhot0Bee6qPkCTN0uRBqw/formResponse", {
        method: "POST",
        body: formData,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("Dữ liệu đã được gửi lên Google Form thành công");
      })
      .catch(error => {
        console.error("Lỗi khi gửi dữ liệu lên Google Form:", error);
      });
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  

  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

  const formatCurrency = (value) => {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };

  const validateForm = () => {
    const { name, email, phone, address } = checkouts;
    if (!name || !email || !phone || !address) {
      Swal.fire("Error", "Vui lòng nhập đầy đủ thông tin", "error");
      return false;
    }
    if (!paymentMethod) {
      Swal.fire("Error", "Vui lòng chọn phương thức thanh toán", "error");
      return false;
    }
    return true;
  };

  return (
    <>
      <main className="main">
        <div className="page-header text-center" style={{backgroundImage: 'url("assets/images/page-header-bg.jpg")'}}>
          <div className="container">
            <h1 className="page-title">Thanh toán<span>Smart-Ele</span></h1>
          </div>
        </div>
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/">Trang chủ</a></li>
              <li className="breadcrumb-item active" aria-current="page">Thanh toán</li>
            </ol>
          </div>
        </nav>
        <div className="page-content">
          <div className="checkout">
            <div className="container">
              <form action="#">
                <div className="row">
                  <div className="col-lg-6">
                    <h2 className="checkout-title">Chi tiết thanh toán</h2>
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Tên đầy đủ</label>
                        <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Tên *"
                        value={checkouts.name}
                        onChange={handleChange}
                        required
                      />
                      </div>
                      <div className="col-sm-6">
                        <label>Email</label>
                        <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email *"
                        value={checkouts.email}
                        onChange={handleChange}
                        required
                      />                      
                    </div>
                  </div>
                  <label>Điện thoại</label>
                  <input
                      type="phone"
                      className="form-control"
                      id="phone"
                      name="phone"
                      placeholder="Điện thoại"
                      value={checkouts.phone}
                      onChange={handleChange}
                    />
                   <label>Địa chỉ</label>
                                      <input
                      type="address"
                      className="form-control"
                      id="address"
                      name="address"
                      placeholder="Địa chỉ"
                      value={checkouts.address}
                      onChange={handleChange}
                    />                  
                  </div>
              <div className="col-lg-6">
                <div className="summary-title d-flex align-items-center justify-content-between">
                  <h2 style={{ fontSize: '16px' }}>Thông tin đơn hàng</h2>
                  <a href="/cart" style={{ fontSize: '14px' }}>Chỉnh sửa</a>
                </div>
                <table className="table table-cart table-mobile">
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id}>
                        <td className="product-col">
                          <div className="product">
                            <figure className="product-media">
                              <img src={getImgUrl(item.image)} alt="Product image" />
                            </figure>
                            <h3 className="product-title">
                              {item.product ? item.product.name : "Loading..."}
                            </h3>
                          </div>
                        </td>
                        <td className="price-col">{formatCurrency(item.price)}</td>
                        <td className="quantity-col">
                          <div className="cart-product-quantity">
                            <span>Số lượng: {item.qty}</span>
                          </div>
                        </td>
                        <td className="total-col">{formatCurrency(item.price * item.qty)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <aside className="col-lg-6">
                <div className="summary">
                  <h3 className="summary-title">Đơn hàng của bạn</h3>
                  <table className="table table-summary">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item, index) => (
                        <tr key={index}>
                          <td><a href="#">{item.product && item.product.name}</a></td>
                          <td>{formatCurrency(item.price * item.qty)}</td>
                        </tr>
                      ))}
                      <tr className="summary-total">
                        <td>Tổng cộng:</td>
                        <td>{formatCurrency(totalAmount)}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="accordion-summary" id="accordion-payment">
                    <div className="card">
                      <div className="card-header" id="heading-1">
                        <h2 className="card-title">
                          <a
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-1"
                            aria-expanded="true"
                            aria-controls="collapse-1"
                            onClick={() => setPaymentMethod("Thanh toán trực tiếp")}
                          >
                            Thanh toán trực tiếp
                          </a>
                        </h2>
                      </div>
                      <div id="collapse-1" className="collapse show" aria-labelledby="heading-1" data-parent="#accordion-payment"></div>
                    </div>
                    <div className="card">
                      <div className="card-header" id="heading-2">
                        <h2 className="card-title">
                          <a
                            className="collapsed"
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-2"
                            aria-expanded="false"
                            aria-controls="collapse-2"
                            onClick={() => setPaymentMethod("Thanh toán VNpay")}
                          >
                            Thanh toán VNpay
                          </a>
                        </h2>
                      </div>
                      <div id="collapse-2" className="collapse" aria-labelledby="heading-2" data-parent="#accordion-payment"></div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-outline-primary-2 btn-order btn-block"
                    onClick={() => {
                      if (cartItems.length > 0 && validateForm()) { 
                        cartItems.forEach((item) => {
                          handleAddToOrder(
                            item.product ? item.product.id : null,
                            checkouts.name,
                            checkouts.email,
                            checkouts.phone,
                            checkouts.address,
                            item.qty,
                            item.price,
                            item.image,
                            paymentMethod
                          );
                        });
                      } else {
                        console.error('Vui lòng chọn phương thức thanh toán và có ít nhất một sản phẩm trong giỏ hàng.');
                      }
                    }}
                  >
                    Đặt hàng
                  </button>
                </div>
              </aside>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</>
);
}

export default Checkout;
