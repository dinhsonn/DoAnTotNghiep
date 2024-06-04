import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CartService from "../../../services/CartServices";
import ProductService from "../../../services/ProductServices";
import { useNavigate, Link } from "react-router-dom";

function Cart() {
  document.title = "Cart";
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userId, setUserId] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const navigate = useNavigate();

  const removeItem = (cartId, productId, qty) => {
    CartService.removeItemFromCart(cartId, productId)
      .then((response) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            setCartItems((prevCartItems) =>
              prevCartItems.filter((item) => item.product.id !== productId)
            );
            ProductService.getById(productId)
              .then((productResponse) => {
                const updatedQty = productResponse.data.qty + qty;
                ProductService.updateProductQty(productId, updatedQty)
                  .then(() => {
                    Swal.fire("Deleted!", "Your item has been deleted.", "success");
                  })
                  .catch((error) => {
                    console.error("Error updating product quantity:", error);
                    Swal.fire("Error", "An error occurred while updating product quantity", "error");
                  });
              })
              .catch((error) => {
                console.error("Error fetching product details:", error);
                Swal.fire("Error", "An error occurred while fetching product details", "error");
              });
          }
        });
      })
      .catch((error) => {
        console.error("Error removing item from cart:", error);
        Swal.fire("Error", "An error occurred while removing item from cart", "error");
      });
  };

  const updateCartItemQuantity = (cartId, productId, newQuantity) => {
    ProductService.getById(productId)
      .then((productResponse) => {
        if (newQuantity > productResponse.data.qty) {
          Swal.fire("Xin lỗi", "Số lượng vượt quá số lượng có sẵn", "warning");
          return;
        }
        CartService.updateCartItemQuantity(cartId, productId, newQuantity)
          .then((response) => {
            console.log("Updated:", response);
            setCartItems((prevCartItems) => {
              const updatedItems = prevCartItems.map((item) => {
                if (item.product.id === productId) {
                  return { ...item, qty: newQuantity };
                }
                return item;
              });
              calculateTotal(updatedItems);
              return updatedItems;
            });
          })
          .catch((error) => {
            console.error("Error updating cart item quantity:", error);
            Swal.fire("Error", "An error occurred while updating cart item quantity", "error");
          });
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        Swal.fire("Error", "An error occurred while fetching product details", "error");
      });
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
        text: "Vui lòng đăng nhập để xem giỏ hàng của bạn.",
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

        if (userCartItems.length === 0) {
          setIsEmpty(true); // Set giỏ hàng trống nếu không có sản phẩm
        } else {
          setIsEmpty(false);
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
        }
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

  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
  function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + 'đ';
  }
  return (
    <>
      <div className="page-content">
        {isEmpty ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2>Giỏ hàng của bạn đang trống</h2>
                <Link to="/" className="btn btn-primary">Tiếp tục mua hàng</Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <table className="table table-cart table-mobile">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th />
                      </tr>
                    </thead>
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
                                {item.product ? item.product.name : "Loading..."}
                              </h3>
                            </div>
                          </td>
                          <td className="price-col">{formatCurrency(item.price)}</td>
                          <td className="quantity-col">
                            <div className="cart-product-quantity">
                              <input
                                type="number"
                                className="form-control"
                                value={item.qty}
                                min={1}
                                step={1}
                                onChange={(e) =>
                                  updateCartItemQuantity(
                                    item.id,
                                    item.product.id,
                                    parseInt(e.target.value)
                                  )
                                }
                                required=""
                              />
                            </div>
                          </td>
                          <td className="total-col">
                            {formatCurrency(item.price * item.qty)}
                          </td>
                          <td className="remove-col">
                            <button
                              className="btn-remove"
                              onClick={() => removeItem(item.id, item.product.id, item.qty)}
                            >
                              <i className="icon-close" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="cart-bottom">
                    <div className="cart-discount">
                      <form action="#">
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            required=""
                            placeholder="Discount Code"
                          />
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-primary-2"
                              type="submit"
                            >
                              <i className="icon-long-arrow-right" />
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <a href="#" className="btn btn-outline-dark-2">
                      <span>UPDATE CART</span>
                      <i className="icon-refresh" />
                    </a>
                  </div>
                </div>
                <aside className="col-lg-3">
                  <div className="summary summary-cart">
                    <h3 className="summary-title">Cart Total</h3>
                    <table className="table table-summary">
                      <tbody>
                        <tr className="summary-subtotal">
                          <td>Subtotal:</td>
                          <td>{formatCurrency(totalAmount)}</td>
                        </tr>
                        <tr className="summary-total">
                          <td>Total:</td>
                          <td>{formatCurrency(totalAmount)}</td>
                        </tr>
                      </tbody>
                    </table>
                    <Link
                      className="btn btn-outline-primary-2 btn-order btn-block"
                      to={`/checkout`}
                    >
                      PROCEED TO CHECKOUT
                    </Link>
                  </div>
                  <a
                    href="category.html"
                    className="btn btn-outline-dark-2 btn-block mb-3"
                  >
                    <span>CONTINUE SHOPPING</span>
                    <i className="icon-refresh" />
                  </a>
                </aside>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
