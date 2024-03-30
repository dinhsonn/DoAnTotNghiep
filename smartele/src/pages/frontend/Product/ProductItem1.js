import { Link } from "react-router-dom";

function ProductItem1(props) {
  const getImgUrl = (imageName) => {
    const endpoint = 'productimages'; 
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
    return ( 
      
        <div className="product product-2">
        <figure className="product-media">
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
          <div className="product-action product-action-dark">
            <a
              href="#"
              className="btn-product btn-cart"
              title="Add to cart"
            >
              <span>add to cart</span>
            </a>
            <a
              href="popup/quickView.html"
              className="btn-product btn-quickview"
              title="Quick view"
            >
              <span>quick view</span>
            </a>
          </div>
          {/* End .product-action */}
        </figure>
        {/* End .product-media */}
        <div className="product-body">
          <div className="product-cat">
            <a href="#">Cameras &amp; Camcorders</a>
          </div>
          {/* End .product-cat */}
          <h3 className="product-title">
            <a href="product.html">
            {props.product.name}
            </a>
          </h3>
          {/* End .product-title */}
          <div className="product-price">{props.product.price}đ</div>
          {/* End .product-price */}
          <div className="ratings-container">
            <div className="ratings">
              <div className="ratings-val" style={{ width: "60%" }} />
              {/* End .ratings-val */}
            </div>
            {/* End .ratings */}
            <span className="ratings-text">( 2 Reviews )</span>
          </div>
          {/* End .rating-container */}
        </div>
        {/* End .product-body */}
      </div> );
}

export default ProductItem1;