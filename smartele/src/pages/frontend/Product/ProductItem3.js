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

  const handleAddToCart = async (productId, qty, price, image) => {
    if (!userId) {
      Swal.fire(
        "Chưa đăng nhập",
        "Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.",
        "warning"
      );
      return;
    }

    console.log("Adding to cart:", productId, qty, price, image);
    if (quantity > 0) {
      try {
        await CartService.addItemToCart(userId, productId, qty, price, image);
        const newQuantity = quantity - 1;
        await ProductService.updateProductQty(productId, newQuantity);
        setQuantity(newQuantity);
        Swal.fire(
          "Sản phẩm đã được thêm vào giỏ hàng.",
          "Sản phẩm của bạn đã được thêm vào giỏ hàng!",
          "success"
        );
      } catch (error) {
        console.error("Error adding to cart or updating product quantity: ", error);
      }
    } else {
      Swal.fire(
        "Xin lỗi",
        "Sản phẩm đã hết hàng!",
        "warning"
      );
    }
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

  const formatCurrency = (number) => {
    return number.toLocaleString('vi-VN') + 'đ';
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
              onClick={(e) => {
                e.preventDefault();
                handleAddToWishlist(props.product.id, 1, props.product.price, props.product.image);
              }}
            >
              <span>add to wishlist</span>
            </a>
          </div>
          <div className="product-action action-icon-top">
            <a
              href="#"
              className="btn-product btn-cart"
              onClick={(e) => {
                e.preventDefault();
                handleAddToCart(props.product.id, 1, props.product.price, props.product.image);
              }}
            >
              <span>add to cart</span>
            </a>
            <Link
              to={`/productdetail/${props.product.id}`}
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
        </div>
      </div>
    </div>
  );
}

export default ProductItem3;
