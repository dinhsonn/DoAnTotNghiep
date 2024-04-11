function ProductRelated() {
    return ( 
        <aside className="col-lg-3">
        <div className="sidebar sidebar-product">
          <div className="widget widget-products">
            <h4 className="widget-title">Sản phẩm liên quan</h4>
            {/* End .widget-title */}
            <div className="products">
              <div className="product product-sm">
                <figure className="product-media">
                  <a href="product.html">
                    <img
                      src="assets/images/products/single/sidebar/1.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
                </figure>
                <div className="product-body">
                  <h5 className="product-title">
                    <a href="product.html">
                      Light brown studded Wide fit wedges
                    </a>
                  </h5>
                  {/* End .product-title */}
                  <div className="product-price">
                    <span className="new-price">$50.00</span>
                    <span className="old-price">$110.00</span>
                  </div>
                  {/* End .product-price */}
                </div>
                {/* End .product-body */}
              </div>
              {/* End .product product-sm */}
              <div className="product product-sm">
                <figure className="product-media">
                  <a href="product.html">
                    <img
                      src="assets/images/products/single/sidebar/2.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
                </figure>
                <div className="product-body">
                  <h5 className="product-title">
                    <a href="product.html">
                      Yellow button front tea top
                    </a>
                  </h5>
                  {/* End .product-title */}
                  <div className="product-price">$56.00</div>
                  {/* End .product-price */}
                </div>
                {/* End .product-body */}
              </div>
              {/* End .product product-sm */}
              <div className="product product-sm">
                <figure className="product-media">
                  <a href="product.html">
                    <img
                      src="assets/images/products/single/sidebar/3.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
                </figure>
                <div className="product-body">
                  <h5 className="product-title">
                    <a href="product.html">Beige metal hoop tote bag</a>
                  </h5>
                  {/* End .product-title */}
                  <div className="product-price">$50.00</div>
                  {/* End .product-price */}
                </div>
                {/* End .product-body */}
              </div>
              {/* End .product product-sm */}
              <div className="product product-sm">
                <figure className="product-media">
                  <a href="product.html">
                    <img
                      src="assets/images/products/single/sidebar/4.jpg"
                      alt="Product image"
                      className="product-image"
                    />
                  </a>
                </figure>
                <div className="product-body">
                  <h5 className="product-title">
                    <a href="product.html">
                      Black soft RI weekend travel bag
                    </a>
                  </h5>
                  {/* End .product-title */}
                  <div className="product-price">$75.00</div>
                  {/* End .product-price */}
                </div>
                {/* End .product-body */}
              </div>
              {/* End .product product-sm */}
            </div>
            {/* End .products */}
            <a href="category.html" className="btn btn-outline-dark-3">
              <span>XEM NHIỀU HƠN</span>
              <i className="icon-long-arrow-right" />
            </a>
          </div>
          {/* End .widget widget-products */}

          {/* End .widget */}
        </div>
        {/* End .sidebar sidebar-product */}
      </aside>
     );
}

export default ProductRelated;