import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ProductService from "../../../services/ProductServices";
import { Link } from "react-router-dom";
import CartService from "../../../services/CartServices";
import Swal from 'sweetalert2';
import WishlistService from "../../../services/WishlistService";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Search(props) {
  const query = useQuery();
  const searchTerm = query.get("q");
  const [results, setResults] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
    }
  }, []);

  const handleAddToCart = (productId, qty, price, image) => {
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

  useEffect(() => {
    if (searchTerm) {
      setLoading(true);
      ProductService.getAll().then((response) => {
        const filteredResults = response.data.content.filter(
          (result) =>
            result.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.categoryId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.brandId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.warranty?.toLowerCase().includes(searchTerm.toLowerCase())
        );

        Promise.all(filteredResults.map(product =>
          ProductService.getProductImage(product.id).then((imageResponse) => {
            const productImage = imageResponse.data.content.find(img => img.productId.id === product.id);
            return {
              ...product,
              image: productImage ? productImage.image : null // Chỉ lấy ảnh nếu productId trùng khớp
            };
          })
        )).then(resultsWithImages => {
          setResults(resultsWithImages);
          setLoading(false);
        }).catch(error => {
          console.error('Error fetching product images: ', error);
          setLoading(false);
        });
      });
    }
  }, [searchTerm]);
  const formatCurrency = (number) => {
    return number.toLocaleString('vi-VN') + 'đ';
  };
  return (
    <div className="page-content">
      <div className="container">
        <div className="toolbox">
        </div>
        <div className="result">
          <div className="row">
            {loading ? (
              <div className="loading-spinner">
                <img src="loading-spinner-url.gif" alt="Loading..." />
              </div>
            ) : results.length > 0 ? (
              results.map((result) => (
                <div className="col-6 col-md-4 col-lg-4 col-xl-3" key={result.id}>
                  <div className="product ">
                    <figure className="product-media">
                      <span className="product-label label-new" >New</span>
                      <Link to={`/productdetail/${result.id}`}>
                        {result.image && (
                          <img
                            src={getImgUrl(result.image)}
                            alt="Product image"
                            className="product-image"
                          />
                        )}
                      </Link>

                      <div className="product-action-vertical">
                        <a
                          href="#"
                          className="btn-product-icon btn-wishlist btn-expandable"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToWishlist(result.id, 1, result.price, result.image);
                          }}
                        >
                          <span>add to wishlist</span>
                        </a>
                      </div>
                      <div className="product-action action-icon-top">
                        <a href="#" className="btn-product btn-cart" onClick={() => handleAddToCart(result.id, 1, result.price, result.image)}>
                          <span>add to cart</span>
                        </a>
                        <Link to={`/productdetail/${result.id}`}
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
                        <a href="#">{result.categoryId?.name}</a>
                      </div>
                      <h3 className="product-title">
                        <a href="product.html">{result.name}</a>
                      </h3>
                      <div className="product-price">{formatCurrency(result.price)}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <li>Không tìm thấy sản phẩm nào.</li>
            )}
          </div>
        </div>
        <div className="sidebar-filter-overlay" />
      </div>
    </div>
  );
};

export default Search;
