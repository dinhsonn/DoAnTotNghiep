import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartService from "../../../services/CartServices";
import Swal from 'sweetalert2';

function ProductItem3(props) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
    }
  }, []);

  const handleAddToCart = (productId, qty, price, image) => {
    console.log("Adding to cart:", productId, qty, price, image);
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }
    CartService.addItemToCart(userId, productId, qty, price, image)
      .then(() => {
        Swal.fire(
          "The product has been added to cart.",
          "Your product has been added to the cart!",
          "success"
        );
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
    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
      <div className="product">
        <figure className="product-media">
          <span className="product-label label-new">New</span>
          <Link to={`/productdetail/${props.product.id}`}>
            <img
              src={getImgUrl(props.product.image)}
              alt="Product image"
              className="product-image"
            />
          </Link>
          <div className="product-action-vertical">
            <a
              href="#"
              className="btn-product-icon btn-wishlist btn-expandable"
            >
              <span>add to wishlist</span>
            </a>
          </div>
          <div className="product-action action-icon-top">
            <a href="#" className="btn-product btn-cart" onClick={() => handleAddToCart(props.product.id, 1, props.product.price, props.product.image)}>
              <span>add to cart</span>
            </a>
            <a
              href="popup/quickView.html"
              className="btn-product btn-quickview"
              title="Quick view"
            >
              <span>quick view</span>
            </a>
            <a
              href="#"
              className="btn-product btn-compare"
              title="Compare"
            >
              <span>compare</span>
            </a>
          </div>
        </figure>
        <div className="product-body">
          <div className="product-cat">
            <a href="#">{props.product.categoryId.name}</a>
          </div>
          <h3 className="product-title">
            <a href="product.html">{props.product.name}</a>
          </h3>
          <div className="product-price">{props.product.price}đ</div>
          <div className="ratings-container">
            <div className="ratings">
              <div className="ratings-val" style={{ width: "0%" }} />
            </div>
            <span className="ratings-text">( 0 Reviews )</span>
          </div>
          <div className="product-nav product-nav-dots">
            <a href="#" style={{ background: "#cc9966" }}>
              <span className="sr-only">Color name</span>
            </a>
            <a
              href="#"
              className="active"
              style={{ background: "#ebebeb" }}
            >
              <span className="sr-only">Color name</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductItem3;
