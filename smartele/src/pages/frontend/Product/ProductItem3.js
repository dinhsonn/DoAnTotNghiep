import { Link } from "react-router-dom";

function ProductItem3(props) {
  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; 
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
          {/* End .product-action */}
          <div className="product-action action-icon-top">
            <a href="#" className="btn-product btn-cart">
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
          {/* End .product-action */}
        </figure>
        {/* End .product-media */}
        <div className="product-body">
          <div className="product-cat">
            <a href="#">Women</a>
          </div>
          {/* End .product-cat */}
          <h3 className="product-title">
            <a href="product.html">{props.product.name}</a>
          </h3>
          {/* End .product-title */}
          <div className="product-price">{props.product.price}đ</div>
          {/* End .product-price */}
          <div className="ratings-container">
            <div className="ratings">
              <div className="ratings-val" style={{ width: "0%" }} />
              {/* End .ratings-val */}
            </div>
            {/* End .ratings */}
            <span className="ratings-text">( 0 Reviews )</span>
          </div>
          {/* End .rating-container */}
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
          {/* End .product-nav */}
        </div>
        {/* End .product-body */}
      </div>
      </div>
     );
}

export default ProductItem3;