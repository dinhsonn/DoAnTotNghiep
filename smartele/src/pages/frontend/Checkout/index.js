import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CartService from "../../../services/CartServices";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../Cart/Context";
import OrderService from "../../../services/OrderServices";

function Checkout() {
  document.title = "Checkout";
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
    }
  }, []);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }

    CartService.getCarts()
      .then((response) => {
        console.log("Response data:", response.data);
        const userCartItems = response.data.filter(
          (item) => item.user.id === userId
        );
        setCartItems(userCartItems);
        calculateTotal(userCartItems);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, [userId]);


  const updateCartPayment = (paymentMethod) => {
    cartItems.forEach((item) => {
      CartService.updateCartPayment(item.id, paymentMethod)
        .then((response) => {
          console.log("Updated payment method for cart:", item.id);
        })
        .catch((error) => {
          console.error("Error updating payment method for cart:", item.id, error);
        });
    });
  };


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
  const handleAddToOrder = (productId, qty, price, image, paymentMethod) => {
    console.log("Adding to cart:", productId, qty, price, image, paymentMethod);
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }
    OrderService.addItemToOrder(userId, productId, qty, price, image, paymentMethod)
      .then(() => {
        
        Swal.fire({
          title: 'Thanh toán thành công',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          removeSelectedItemsFromCart();
          navigate('/');
        });
      })
      .catch((error) => {
        console.error("Error adding to cart: ", error);
      });
  };
  
  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
  return (
    <>
      <main className="main">
        <div
          className="page-header text-center"
          style={{
            backgroundImage: 'url("assets/images/page-header-bg.jpg")',
          }}
        >
          <div className="container">
            <h1 className="page-title">
              Thanh toán<span>Smart-Ele</span>
            </h1>
          </div>
        </div>
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Thanh toán
              </li>

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
                          required=""
                        />
                      </div>
                      <div className="col-sm-6">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          required=""
                        />
                      </div>
                    </div>
                    <label>Điện thoại</label>
                    <input type="text" className="form-control" />
                    <label>Địa chỉ</label>
                    <input
                      type="text"
                      className="form-control"
                      required=""
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
                            <td className="price-col">${item.price}</td>
                            <td className="quantity-col">
                              <div className="cart-product-quantity">
                                <span>Số lượng: {item.qty}</span>
                              </div>

                            </td>
                            <td className="total-col">
                              ${item.price * item.qty}
                            </td>
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
                              <td>
                                <a href="#">{item.product.name}</a>
                              </td>
                              <td>${item.price * item.qty}</td>
                            </tr>
                          ))}
                          <tr className="summary-total">
                            <td>Tổng cộng:</td>
                            <td>${totalAmount.toFixed(2)}</td>
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
                                onClick={() => {
                                  if (cartItems.length > 0) {
                                    updateCartPayment("Thanh toán trực tiếp");
                                  }
                                }}
                              >
                                Thanh toán trực tiếp
                              </a>
                            </h2>
                          </div>
                          {/* End .card-header */}
                          <div
                            id="collapse-1"
                            className="collapse show"
                            aria-labelledby="heading-1"
                            data-parent="#accordion-payment"
                          >
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-outline-primary-2 btn-order btn-block"
                        onClick={() => {
                          if (cartItems.length > 0) {
                            cartItems.forEach((item) => {
                              handleAddToOrder(item.product.id, item.qty, item.price, item.image, 'Thanh toán trực tiếp');
                            });
                          } else {
                            console.error('No items in the cart.');
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
