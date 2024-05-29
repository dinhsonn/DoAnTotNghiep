import React, { useEffect, useState } from "react";
import ProductServices from "../../../services/ProductServices";
import { Link, useParams } from "react-router-dom";

function ProductRelated({ brandId, currentProductId }) {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    if (brandId) {
      ProductServices.getProductsByBrandId(brandId)
        .then((response) => {
          const filteredProducts = response.data.filter(product => product.id !== currentProductId);
          setRelatedProducts(filteredProducts);
          console.log("Filtered Related Products:", filteredProducts);
        })
        .catch((error) => {
          console.error("Error fetching related products:", error);
        });
    }
  }, [brandId, currentProductId]);

  useEffect(() => {
    relatedProducts.forEach((product) => {
      ProductServices.getProductImageById(product.id)
        .then((response) => {
          setProductImages((prevImages) => ({
            ...prevImages,
            [product.id]: response.data.content[0].image 
          }));
        })
        .catch((error) => {
          console.error("Error fetching product images:", error);
        });
    });
  }, [relatedProducts]);

  const getImgUrl = (imageName) => {
    const endpoint = "productimages";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
  function formatCurrency(number) {
    return number.toLocaleString('vi-VN') + 'đ';
  }
  return (
    <aside className="col-lg-3" >
      <div className="sidebar sidebar-product"style={{width:"250px"}}>
        <div className="widget widget-products">
          <h4 className="widget-title">Sản phẩm liên quan</h4>
          <div className="products" >
            {relatedProducts.map((product) => (
              <div className="product product-sm" key={product.id}>
                <figure className="product-media">
                  <Link to={`/productdetail/${product.id}`}>
                    <img
                      src={getImgUrl(productImages[product.id])}
                      alt="Product image"
                      className="product-image"
                    />
                  </Link>
                </figure>
                <div className="product-body">
                  <h5 className="product-title">
                    <Link to={`/productdetail/${product.id}`}>{product.name}</Link>
                  </h5>
                  <div className="product-price">
                    {product.oldPrice && <span className="old-price">${product.oldPrice}</span>}
                    <span className="new-price">{formatCurrency(product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <a href="/category" className="btn btn-outline-dark-3">
            <span>XEM NHIỀU HƠN</span>
            <i className="icon-long-arrow-right" />
          </a>
        </div>
      </div>
    </aside>
  );
}

export default ProductRelated;
