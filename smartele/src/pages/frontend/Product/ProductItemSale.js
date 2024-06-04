import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CartService from "../../../services/CartServices";
import Swal from 'sweetalert2';
import WishlistService from "../../../services/WishlistService";

function ProductItemSale(props) {
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
      Swal.fire(
        "Chưa đăng nhập",
        "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.",
        "warning"
      );
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
  const handleAddToWishlist = async (productId, qty, price, image) => {
    if (!userId) {
      Swal.fire(
        "Chưa đăng nhập",
        "Bạn cần đăng nhập để thêm sản phẩm vào danh sách mong muốn.",
        "warning"
      );
      return;
    }

    console.log("Adding to Wishlist:", productId, qty, price, image);
    try {
      if (props.wishlistItems && props.wishlistItems.length > 0) {
        const isInWishlist = props.wishlistItems.some(item => item.productId === productId);
        if (isInWishlist) {
          Swal.fire(
            "Đã có trong danh sách mong muốn",
            "Sản phẩm đã có trong danh sách mong muốn của bạn!",
            "info"
          );
        } else {
          await WishlistService.addToWishlist(userId, productId, qty, price, image);
          Swal.fire(
            "Đã thêm vào danh sách mong muốn",
            "Sản phẩm đã được thêm vào danh sách mong muốn của bạn!",
            "success"
          );
        }
      } else {
        await WishlistService.addToWishlist(userId, productId, qty, price, image);
        Swal.fire(
          "Đã thêm vào danh sách mong muốn",
          "Sản phẩm đã được thêm vào danh sách mong muốn của bạn!",
          "success"
        );
      }
    } catch (error) {
      console.error("Error adding to wishlist: ", error);
    }
  };
  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

  return (
    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
      <div className="product">
        <figure className="product-media">
          <span className="product-label label-new" style={{backgroundColor:"red"}}>Giảm giá</span>
          <Link to={`/productdetail/${props.product.productId.id}`}>
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
            <a href="#" className="btn-product btn-cart" onClick={() => handleAddToCart(props.product.id, 1, props.product.price, props.product.image)}
>
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
            <a href="#">{props.product.productId.categoryOption.name}</a>
          </div>
          <h3 className="product-title">
            <a href="product.html">{props.product.productId.name}</a>
          </h3>
         
          <div className="product-price">
          <del>{props.product.productId.price}đ</del>
          </div>
          <div className="product-price">
              Được giảm còn: {props.product.salePrice}đ
          </div>

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

export default ProductItemSale;
