import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CartService from "../../../services/CartServices";
import { useNavigate } from "react-router-dom";
import OrderService from "../../../services/OrderServices";
import axios from 'axios';
import ProductService from "../../../services/ProductServices";

const YOUR_OPENCAGE_API_KEY = 'f0a06c54453b4ccf816aab8dbeb65131';

function Checkout() {
  document.title = "Checkout";
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [userId, setUserId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [checkouts, setCheckouts] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [defaultLocation, setDefaultLocation] = useState(null);
  const navigate = useNavigate();
  const warehouseLocation = { lat: 10.8471, lng: 106.7695 };

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
      Swal.fire({
        icon: "info",
        title: "Bạn cần đăng nhập",
        text: "Vui lòng đăng nhập",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await CartService.getCarts();
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
      } catch (error) {
        console.error("Error fetching cart items:", error);
        Swal.fire("Error", "An error occurred while fetching cart items", "error");
      }
    };

    fetchCartItems();
  }, [userId]);

  useEffect(() => {
    const fetchDefaultLocation = async () => {
      try {
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=Qu%E1%BA%ADn%209%2C%20Th%E1%BB%A7%20%C4%90%E1%BB%A9c&key=${YOUR_OPENCAGE_API_KEY}`);
        const { lat, lng } = response.data.results[0].geometry;
        setDefaultLocation({ lat, lng });
      } catch (error) {
        console.error("Error fetching default location:", error);
      }
    };
    fetchDefaultLocation();
  }, []);

  const calculateTotal = (items) => {
    const itemsTotal = items.reduce((accumulator, item) => {
      return accumulator + (item.product.price * item.qty);
    }, 0);
    setTotalAmount(itemsTotal + shippingCost);
  };

  const calculateShippingCost = async (address) => {
    if (!defaultLocation) {
      console.error("Default location is not available.");
      return;
    }
  
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${YOUR_OPENCAGE_API_KEY}`);
      const { lat, lng } = response.data.results[0].geometry;
      const distance = getDistance(defaultLocation, { lat, lng });
  
      let cost;
      if (distance <= 10) {
        cost = 20000;
      } else {
        cost = distance * 5000;
      }
  
      setShippingCost(cost);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return error; 
    }
  };
  


  const getDistance = (location1, location2) => {
    const R = 6371; // Earth's radius in km
    const dLat = toRad(location2.lat - location1.lat);
    const dLng = toRad(location2.lng - location1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(location1.lat)) * Math.cos(toRad(location2.lat)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const toRad = (value) => {
    return value * Math.PI / 180;
  };

  const removeSelectedItemsFromCart = async () => {
    try {
      await Promise.all(
        cartItems.map(item =>
          CartService.removeItemFromCart(item.id, item.product.id)
        )
      );
      navigate('/');
    } catch (error) {
      console.error('Error removing selected items from cart:', error);
    }
  };

  const handleAddToOrder = (productId, name, email, phone, address, qty, price, image, paymentMethod) => {
    console.log("Adding to order:", productId, name, email, phone, address, qty, price, image, paymentMethod);
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }

    const subtotal = ((price * qty) + shippingCost).toFixed(0);
    const subtotalNumber = parseFloat(subtotal);

    OrderService.addItemToOrder(userId, productId, name, email, phone, address, qty, subtotalNumber, image, paymentMethod)
      .then(() => {
        if (paymentMethod === 'Thanh toán VNpay') {
          axios.get('http://localhost:8082/pay', { params: { amount: subtotalNumber * 100 } })
            .then(response => {
              removeSelectedItemsFromCart();
              navigate('/');
              window.location.href = response.data;
            })
            .catch(error => {
              console.error("Error redirecting to VNPay payment:", error);
            });
        } else {
          // Xử lý thanh toán trực tiếp
          Swal.fire({
            title: 'Thanh toán thành công',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            sendToGoogleForm(userId, productId, qty, subtotalNumber, image, paymentMethod);
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
          console.log("Data sent to Google Form successfully");
        })
        .catch(error => {
          console.error("Error sending data to Google Form:", error);
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
      Swal.fire("Error", "Vui lòng chọn phương thức thanh toán", "error ");
      return false;
    }
    return true;
  };

  return (
    <>
      <main className="main">
        <div className="page-header text-center" style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}>
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
                      <div className="col-12">
                        <label>Điện thoại</label>
                        <input
                          type="text"
                          className="form-control"
                          id="phone"
                          name="phone"
                          placeholder="Điện thoại *"
                          value={checkouts.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label>Địa chỉ</label>
                        <input
                          type="text"
                          className="form-control"
                          id="address"
                          name="address"
                          placeholder="Địa chỉ *"
                          value={checkouts.address}
                          onChange={(e) => {
                            handleChange(e);
                            // Clear previous error
                            Swal.close();
                          }}
                          onBlur={async () => {
                            const error = await calculateShippingCost(checkouts.address);
                            if (error) {
                              Swal.fire("Lỗi", "Không tìm thấy địa chỉ", "error");
                            }
                          }}
                          required
                        />

                      </div>
                    </div>
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
                            <td className="price-col">{formatCurrency(item.product.price)}</td>
                            <td className="quantity-col">
                              <div className="cart-product-quantity">
                                <span>Số lượng: {item.qty}</span>
                              </div>
                            </td>
                            <td className="total-col">{formatCurrency(item.product.price * item.qty)}</td>
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
                              <td>{formatCurrency(item.product.price * item.qty)}</td>
                            </tr>
                          ))}
                          <tr className="summary-total">
                            <td>Phí vận chuyển:</td>
                            <td>{formatCurrency(shippingCost)}</td>
                          </tr>
                          <tr className="summary-total">
                            <td>Tổng cộng:</td>
                            <td>{formatCurrency(totalAmount + shippingCost)}</td>
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
                              const subtotal = (item.product.price * item.qty + shippingCost).toFixed(0);
                              handleAddToOrder(
                                item.product ? item.product.id : null,
                                checkouts.name,
                                checkouts.email,
                                checkouts.phone,
                                checkouts.address,
                                item.qty,
                                subtotal,
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