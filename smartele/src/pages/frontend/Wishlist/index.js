import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import WishlistService from "../../../services/WishlistService";
import ProductService from "../../../services/ProductServices";
import CartService from "../../../services/CartServices";

function Wishlist() {
  document.title = "Wishlist";
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

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
    WishlistService.getAll()
      .then(async (response) => {
        const userCartItems = response.data.filter(
          (item) => item.user && item.user.id === userId
        );

        const cartItemsWithProducts = await Promise.all(
          userCartItems.map(async (item) => {
            const productResponse = await ProductService.getById(item.productId);
            return {
              ...item,
              product: productResponse.data,
              qty: productResponse.data.qty,
            };
          })
        );

        setWishlistItems(cartItemsWithProducts);
        calculateTotal(cartItemsWithProducts);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        Swal.fire("Error", "An error occurred while fetching items", "error");
      });
  }, [userId]);

  const calculateTotal = (items) => {
    const total = items.reduce((accumulator, item) => {
      return accumulator + (item.product ? item.product.price * item.qty : 0);
    }, 0);
    setTotalAmount(total);
  };

  const removeItem = (productId) => {
    WishlistService.removeFromWishlist(productId)
      .then(() => {
        setWishlistItems((prevWishlistItems) => prevWishlistItems.filter(item => item.product.id !== productId));
        Swal.fire(
          'Deleted!',
          'Your item has been removed from the wishlist.',
          'success'
        )
      })
      .catch((error) => {
        console.error('Error removing item from wishlist:', error);
        Swal.fire("Error", "An error occurred while removing item from wishlist", "error");
      });
  };

  const handleAddToCart = (productId, qty, price, image) => {
    console.log("Adding to cart:", productId, qty, price, image);
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }

    const selectedProduct = wishlistItems.find(item => item.product.id === productId);
    if (!selectedProduct) {
      console.error('Product not found in wishlist.');
      return;
    }

    if (selectedProduct.qty <= 0) {
      Swal.fire("Out of Stock", "This product is out of stock.", "error");
      return;
    }

    CartService.addItemToCart(userId, productId, qty, price, image)
      .then(() => {
        ProductService.updateProductQty(productId, selectedProduct.qty - 1) // Giảm số lượng sản phẩm trong cơ sở dữ liệu
          .then(() => {
            setWishlistItems((prevWishlistItems) =>
              prevWishlistItems.map((item) =>
                item.product.id === productId
                  ? { ...item, qty: item.qty - 1 }
                  : item
              )
            );

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
  };

  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

  const renderStockStatus = (qty) => {
    return qty > 0 ? <span className="in-stock">Còn hàng</span> : <span className="out-of-stock">Hết hàng</span>;
  };

  return (
    <>
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Trang chủ</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Yêu thích
              </li>
            </ol>
          </div>
        </nav>
        <div className="page-content">
          <div className="container">
            <table className="table table-wishlist table-mobile">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Tình trạng sản phẩm</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
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
                    <td className="price-col">${item.product ? item.product.price : 0}</td>
                    <td className="stock-col">
                      {renderStockStatus(item.qty)}
                    </td>
                    <td className="">
                      <button className="btn btn-primary" onClick={() => handleAddToCart(item.product.id, 1, item.price, item.image)}>
                        Add to Cart
                      </button>
                    </td>
                    <td className="">
                      <button className="btn-remove" onClick={() => removeItem(item.product.id)}>
                        <i className="icon-close" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Wishlist;
  