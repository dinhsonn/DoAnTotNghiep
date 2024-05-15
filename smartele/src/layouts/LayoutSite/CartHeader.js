import React, { useEffect, useState } from "react";
import CartService from "../../services/CartServices";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function CartHeader() {
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userId, setUserId] = useState(null);

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

    fetchCartItems(); 

    const interval = setInterval(() => {
      fetchCartItems();
    }, 1000);

    return () => clearInterval(interval);
  }, [userId]);

  const fetchCartItems = async () => {
    try {
      const response = await CartService.getCarts();
      if (response && response.data && Array.isArray(response.data)) {
        const userCartItems = response.data.filter(item => item.user.id === userId);
        setCartItems(userCartItems);
        calculateTotal(userCartItems);
        const totalCount = userCartItems.reduce((total, item) => total + item.qty, 0);
        setCartItemCount(totalCount);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const removeItem = (cartId, productId) => {
    CartService.removeFromCart(cartId, productId)
      .then((response) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            setCartItems((prevCartItems) => prevCartItems.filter(item => item.product.id !== productId));
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      })
      .catch((error) => {
        console.error('Error removing item from cart:', error);
      });
  };

  const calculateTotal = (items) => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + item.qty * item.price;
    }, 0);
    setTotalAmount(total);
  };

  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

  return (
    <div className="dropdown cart-dropdown">
      <a
        href="#"
        className="dropdown-toggle"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-display="static"
      >
        <div className="icon">
          <i className="icon-shopping-cart" />
          <span className="cart-count">{cartItemCount}</span>
        </div>
        <p>Giỏ hàng</p>
      </a>
      <div className="dropdown-menu dropdown-menu-right">
        <div className="dropdown-cart-products">
        {cartItems.map((item) => (
  <div className="product" key={item.id}>
    <div className="product-cart-details">
      <h4 className="product-title">
        <a href="product.html">{item.product && item.product.name}</a>
      </h4>
      <span className="cart-product-info">
        <span className="cart-product-qty">{item.qty}</span>x${item.price}
      </span>
    </div>
    {/* End .product-cart-details */}
    <figure className="product-image-container">
      <a href="product.html" className="product-image">
        <img src={getImgUrl(item.image)} alt="Product" />
      </a>
    </figure>
    <a href="#" className="btn-remove" title="Remove Product" onClick={() => removeItem(item.id, item.product && item.product.id)}>
      <i className="icon-close" />
    </a>
  </div>
))}

        </div>
        <div className="dropdown-cart-total">
          <span>Tổng cộng</span>
          <span className="cart-total-price">${totalAmount.toFixed(2)}</span>
        </div>
        <div className="dropdown-cart-action">
          <Link to={"cart"} className="btn btn-primary">
            Xem
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartHeader;
