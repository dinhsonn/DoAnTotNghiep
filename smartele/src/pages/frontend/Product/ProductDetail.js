import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import ProductServices from "../../../services/ProductServices";
import Swal from "sweetalert2";
import ProductRelated from "./ProductRelated";
import CartService from "../../../services/CartServices";
import WishlistService from "../../../services/WishlistService";

function ProductDetail(props) {
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState({});
  const [userId, setUserId] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const { search } = useLocation();
  const { id } = useParams();
  const queryParams = new URLSearchParams(search);
  const image = queryParams.get("image");
  const [selectedImage, setSelectedImage] = useState("");
  const [productoptions, setProductOptions] = useState([]);
  const [productoptionvalues, setProductOptionValues] = useState([]);
  const [categoryOptionValue, setCategoryOptionValue] = useState(null);
  const [availableQty, setAvailableQty] = useState(0);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUserId(loggedInUser.id);
    }

    ProductServices.getById(id)
      .then((response) => {
        document.title = response.data.title;
        setProducts(response.data);
        setAvailableQty(response.data.qty);
        setCategoryOptionValue(response.data.categoryOptionValue);
        if (response.data.image) {
          setSelectedImage(getImgUrl(response.data.image));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });

    ProductServices.getProductImageById(id)
      .then((response) => {
        setProductImages(response.data.content);
        if (response.data.content.length > 0) {
          setSelectedImage(getImgUrl(response.data.content[0].image));
        }
      })
      .catch((error) => {
        console.error("Error fetching product images:", error);
      });

    ProductServices.productOptionById(id)
      .then((response) => {
        const productOptions = response.data.content;
        setProductOptions(productOptions);
        const fetchOptionValues = async () => {
          const promises = productOptions.map(async (option) => {
            try {
              const optionId = option.id;
              const response = await ProductServices.productOptionValueByOption(optionId);
              const optionValues = response.data.content;
              return { optionId, optionValues };
            } catch (error) {
              console.error("Error fetching product option values:", error);
              return { optionId: null, optionValues: [] };
            }
          });
          const resolvedOptionValues = await Promise.all(promises);
          const updatedOptionValues = resolvedOptionValues.reduce(
            (acc, { optionId, optionValues }) => {
              acc[optionId] = optionValues;
              return acc;
            },
            {}
          );
          setProductOptionValues(updatedOptionValues);
        };
        fetchOptionValues();
      })
      .catch((error) => {
        console.error("Error fetching product options:", error);
      });
  }, [id]);
  const handleAddToWishlist = (productId, qty, price, image) => {
    const imageName = selectedImage ? selectedImage.split('/').pop() : products.image;
    console.log("Adding to Wishlist:", productId, qty, price, imageName);
    
    if (!userId) {
      console.error('User ID is not available.');
      return;
    }
  
    if (props.wishlistItems && props.wishlistItems.length > 0) {
      const isInWishlist = props.wishlistItems.some(item => item.productId === productId);
  
      if (isInWishlist) {
        Swal.fire(
          "Đã có trong danh sách yêu thích",
          "Sản phẩm đã có trong danh sách yêu thích của bạn!",
          "info"
        );
      } else {
        WishlistService.addToWishlist(userId, productId, qty, price, imageName)
          .then(() => {
            Swal.fire(
              "Thêm vào danh sách yêu thích",
              "Sản phẩm đã được thêm vào danh sách yêu thích của bạn!",
              "success"
            );
          })
          .catch((error) => {
            console.error("Lỗi khi thêm vào danh sách yêu thích: ", error);
          });
      }
    } else {
      WishlistService.addToWishlist(userId, productId, qty, price, imageName)
        .then(() => {
          Swal.fire(
            "Thêm vào danh sách yêu thích",
            "Sản phẩm đã được thêm vào danh sách yêu thích của bạn!",
            "success"
          );
        })
        .catch((error) => {
          console.error("Lỗi khi thêm vào danh sách yêu thích: ", error);
        });
    }
  };
  
  const handleAddToCart = (productId, qty, price, image, paymentMethod) => {
    if (qty > availableQty) {
      Swal.fire(
        "Số lượng không đủ",
        "Số lượng bạn chọn vượt quá số lượng hiện có.",
        "error"
      );
      return;
    }
  
    const imageName = selectedImage ? selectedImage.split('/').pop() : products.image;
    console.log("Adding to cart:", productId, qty, price, imageName, paymentMethod);
    if (!userId) {
      console.error("User ID is not available.");
      return;
    }
  
    CartService.addItemToCart(userId, productId, qty, price, imageName, paymentMethod)
      .then(() => {
        setAvailableQty(prevQty => prevQty - qty);
        updateProductQty(productId, availableQty - qty);
        Swal.fire(
          "Thành công",
          "Sản phẩm đã được thêm vào giỏ hàng!",
          "success"
        ).then(() => {
        });
      })
      .catch((error) => {
        console.error("Error adding to cart: ", error);
      });
  };
  

  const updateProductQty = (productId, newQty) => {
    ProductServices.updateProductQty(productId, newQty)
      .then(() => {
        console.log("Product quantity updated on the server.");
      })
      .catch((error) => {
        console.error("Error updating product quantity on the server:", error);
      });
  };

  if (!products) {
    return <p>Loading...</p>;
  }

  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };


  
  return (
    
    <>
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container d-flex align-items-center">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Sản phẩm</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Chi tiết sản phẩm</a>
              </li>
            </ol>
            <nav className="product-pager ml-auto" aria-label="Product">
              <a
                className="product-pager-link product-pager-prev"
                href="#"
                aria-label="Previous"
                tabIndex={-1}
              >
                <i className="icon-angle-left" />
                <span>Prev</span>
              </a>
              <a
                className="product-pager-link product-pager-next"
                href="#"
                aria-label="Next"
                tabIndex={-1}
              >
                <span>Next</span>
                <i className="icon-angle-right" />
              </a>
            </nav>
            {/* End .pager-nav */}
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <div className="product-details-top">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="product-gallery">
                        <figure className="product-main-image">
                          <span className="product-label label-top">Top</span>
                          <img
                            id="product-zoom"
                            src={selectedImage || getImgUrl(image)}
                            data-zoom-image="assets/images/products/single/sidebar-gallery/1-big.jpg"
                            alt="product image"
                          />
                          <a
                            href="#"
                            id="btn-product-gallery"
                            className="btn-product-gallery"
                          >
                            <i className="icon-arrows" />
                          </a>
                        </figure>
                        {/* End .product-main-image */}
                        <div
                          id="product-zoom-gallery"
                          className="product-image-gallery"
                        >
                          {productImages.map((image, index) => (
                            <a
                              className="product-gallery-item active"
                              href="#"
                              key={index}
                              data-image="assets/images/products/single/sidebar-gallery/1.jpg"
                              data-zoom-image="assets/images/products/single/sidebar-gallery/1-big.jpg"
                              onClick={() =>
                                setSelectedImage(getImgUrl(image.image))
                              }
                            >
                              <img
                                src={getImgUrl(image.image)}
                                alt="product side"
                              />
                            </a>
                          ))}
                        </div>
                        {/* End .product-image-gallery */}
                      </div>
                      {/* End .product-gallery */}
                    </div>
                    {/* End .col-md-6 */}
                    <div className="col-md-6">
                      <div className="product-details product-details-sidebar">
                        <h1 className="product-title">{products.name}</h1>
                        {/* End .product-title */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <a
                            className="ratings-text"
                            href="#product-review-link"
                            id="review-link"
                          >
                            ( 2 Đánh giá )
                          </a>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-price">
  {(products.price !== undefined ? products.price : 0).toLocaleString('vi-VN') + 'đ'}
</div>
                        {/* End .product-price */}
                        <div className="product-content">
                          <div className="product-cat">
                            <span>Số lượng hiện có:</span>
                            <a href="#">{products.qty}</a>
                          </div>
                          {/* End .product-cat */}                          
                        </div>
                        {/* End .product-content */}
                        {productoptions.map((productoption, index) => (
                          <div className="details-filter-row details-row-size">
                            <label htmlFor="size">{productoption.name}:</label>
                            <div className="select-custom">
                              <select
                                name="color"
                                id="color"
                                className="form-control"
                              >
                                {productoptionvalues[productoption.id]?.map((productoptionvalue, index) => (
                                  <option key={index} value={productoptionvalue.id}>{productoptionvalue.value}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        ))}
                        {/* End .details-filter-row */}

                        {/* End .details-filter-row */}
                        <div className="product-details-action">
                          <div className="details-action-col">
                            <label htmlFor="qty">Số lượng:</label>
                            <div className="product-details-quantity">
                              <input
                                type="number"
                                id="qty"
                                className="form-control"
                                defaultValue={1}
                                value={qty}
                                min={1}
                                max={10}
                                step={1}
                                onChange={(e) => setQty(e.target.value)}
                                required=""
                              />


                            </div>
                            {/* End .product-details-quantity */}
                            <a href="#" className="btn-product btn-cart"
                              onClick={() => handleAddToCart(products.id, qty, products.price, products.image, 'Thanh toán trực tiếp')}>
                              <span>THÊM VÀO GIỎ HÀNG</span>
                            </a>
                          </div>
                          {/* End .details-action-col */}
                          <div className="details-action-wrapper">
                          <a
  href="#"
  className="btn-product btn-wishlist"
  title="Wishlist"
  onClick={() => handleAddToWishlist(products.id, 1, products.price, products.image)}
>
  <span>Thêm vào yêu thích</span>
</a>

                            <a
                              href="#"
                              className="btn-product btn-compare"
                              title="Compare"
                            >
                              <span>Thêm vào so sánh</span>
                            </a>
                          </div>
                          {/* End .details-action-wrapper */}
                        </div>
                        {/* End .product-details-action */}
                        <div className="product-details-footer details-footer-col">
                          <div className="product-cat">
                            <span>Danh mục:</span>
                            <a href="#">Women</a>
                          </div>
                          {/* End .product-cat */}                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* End .product-details-top */}
                <div className="product-details-tab">
                  <ul
                    className="nav nav-pills justify-content-center"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="product-desc-link"
                        data-toggle="tab"
                        href="#product-desc-tab"
                        role="tab"
                        aria-controls="product-desc-tab"
                        aria-selected="true"
                      >
                        Mô tả sản phẩm
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      className="tab-pane fade show active"
                      id="product-desc-tab"
                      role="tabpanel"
                      aria-labelledby="product-desc-link"
                    >
                      <div className="product-desc-content">
                        <h3>Thông tin sản phẩm</h3>
                
                        {products.description && products.description.split(';').map((spec, index) => (
                          <p key={index}>{spec.trim()}</p>
                        ))}
         
                      </div>
                      {/* End .product-desc-content */}
                    </div>
                    {/* .End .tab-pane */}
                    <div
                      className="tab-pane fade"
                      id="product-info-tab"
                      role="tabpanel"
                      aria-labelledby="product-info-link"
                    >
                      <div className="product-desc-content">
                        <h3>Thông tin</h3>
                        {products.specifications && products.specifications.split(',').map((spec, index) => (
                          <p key={index}>{spec.trim()}</p>
                        ))}
                      </div>
                      {/* End .product-desc-content */}
                    </div>
                    {/* .End .tab-pane */}
                    {/* .End .tab-pane */}
                    <div
                      className="tab-pane fade"
                      id="product-review-tab"
                      role="tabpanel"
                      aria-labelledby="product-review-link"
                    >
                    </div>
                  </div>
                </div>

              </div>
              <ProductRelated brandId={products && products.brandId && products.brandId.id}  />

              {/* End .col-lg-3 */}
            </div>

            {/* End .row */}
          </div>

        </div>
        {/* End .page-content */}
      </main>
      {/* End .main */}
    </>
  );
}

export default ProductDetail;