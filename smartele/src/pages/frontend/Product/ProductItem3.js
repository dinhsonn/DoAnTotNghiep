import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartService from "../../../services/CartServices";
import ProductService from "../../../services/ProductServices";
import Swal from 'sweetalert2';
import WishlistService from "../../../services/WishlistService";

function ProductItem3(props) {
  const [userId, setUserId] = useState(null);
  const [quantity, setQuantity] = useState(props.product.qty);

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
    if (quantity > 0) {
      CartService.addItemToCart(userId, productId, qty, price, image)
        .then(() => {
          const newQuantity = quantity - 1;
          ProductService.updateProductQty(productId, newQuantity)
            .then(() => {
              setQuantity(newQuantity);
              Swal.fire(
                "The product has been added to cart.",
                "Your product has been added to the cart!",
                "success"
              );

            })
            .catch((error) => {
              console.error("Error updating product quantity: ", error);
            });
        })
        .catch((error) => {
          console.error("Error adding to cart: ", error);
        });
    } else {
      Swal.fire(
        "Xin lỗi",
        "Sản phẩm đã hết hàng!",
        "warning"
      );
    }
  };
  const handleAddToWishlist = (productId, qty, price, image) => {
    console.log("Adding to Wishlist:", productId, qty, price, image);
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }
    
    if (props.wishlistItems && props.wishlistItems.length > 0) {
      const isInWishlist = props.wishlistItems.some(item => item.productId === productId);
    
      if (isInWishlist) {
        Swal.fire(
          "Already in Wishlist",
          "The product is already in your wishlist!",
          "info"
        );
      } else {
        // Nếu sản phẩm chưa có trong danh sách mong muốn, thêm vào
        WishlistService.addToWishlist(userId, productId, qty, price, image)
          .then(() => {
            Swal.fire(
              "Added to Wishlist",
              "The product has been added to your wishlist!",
              "success"
            );
          })
          .catch((error) => {
            console.error("Error adding to wishlist: ", error);
          });
      }
    } else {
      WishlistService.addToWishlist(userId, productId, qty, price, image)
        .then(() => {
          Swal.fire(
            "Added to Wishlist",
            "The product has been added to your wishlist!",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error adding to wishlist: ", error);
        });
    }
  };
  
  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
  function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + 'đ';
  }
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
              onClick={() => handleAddToWishlist(props.product.id, 1, props.product.price, props.product.image)} // Thêm sự kiện cho nút "Thêm vào danh sách mong muốn"
            >
              <span>add to wishlist</span>
            </a>
          </div>
          <div className="product-action action-icon-top">
            <a href="#" className="btn-product btn-cart" onClick={() => handleAddToCart(props.product.id, 1, props.product.price, props.product.image)}>
              <span>add to cart</span>
            </a>
            <Link to={`/productdetail/${props.product.id}`}
              className="btn-product btn-quickview"
              title="Quick view"
            >
              <span>quick view</span>
              </Link>
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
            <a href="#">{props.product.categoryOption.name}</a>
          </div>
          <h3 className="product-title">
            <a href="product.html">{props.product.name}</a>
          </h3>
          <div className="product-price">{formatCurrency(props.product.price)}</div>
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
