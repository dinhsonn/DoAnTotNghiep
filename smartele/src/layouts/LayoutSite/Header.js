import Menu from "./Menu";

function Header() {
    return ( 
<>
  <header className="header header-intro-clearance header-3">
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:#">
            <i className="icon-phone" />
            Liên hệ: +84 348 412 593
          </a>
        </div>
        {/* End .header-left */}
        <div className="header-right">
          <ul className="top-menu">
            <li>
              <a href="#">Liên kết</a>
              <ul>
                <li>
                </li>
                <li>
                  <div className="header-dropdown">
                    <a href="#">Việt Nam</a>
                    <div className="header-menu">
                      <ul>
                        <li>
                          <a href="#">Việt Nam</a>
                        </li>
                        <li>
                          <a href="#">English</a>
                        </li>
                      </ul>
                    </div>
                    {/* End .header-menu */}
                  </div>
                </li>
                <li>
                  <a href="#signin-modal" data-toggle="modal">
                    Đăng nhập / Đăng ký
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          {/* End .top-menu */}
        </div>
        {/* End .header-right */}
      </div>
      {/* End .container */}
    </div>
    {/* End .header-top */}
    <div className="header-middle">
      <div className="container">
        <div className="header-left">
          <button className="mobile-menu-toggler">
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <a href="index.html" className="logo">
            <img
              src="assets/images/demos/demo-3/logo.png"
              alt="Molla Logo"
              width={105}
              height={25}
            />
          </a>
        </div>
        {/* End .header-left */}
        <div className="header-center">
          <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
            <a href="#" className="search-toggle" role="button">
              <i className="icon-search" />
            </a>
            <form action="#" method="get">
              <div className="header-search-wrapper search-wrapper-wide">
                <label htmlFor="q" className="sr-only">
                  Search
                </label>
                <button className="btn btn-primary" type="submit">
                  <i className="icon-search" />
                </button>
                <input
                  type="search"
                  className="form-control"
                  name="q"
                  id="q"
                  placeholder="Tìm kiếm sản phẩm ..."
                  required=""
                />
              </div>
              {/* End .header-search-wrapper */}
            </form>
          </div>
          {/* End .header-search */}
        </div>
        <div className="header-right">
          <div className="dropdown compare-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
              title="Compare Products"
              aria-label="Compare Products"
            >
              <div className="icon">
                <i className="icon-random" />
              </div>
              <p>So sánh</p>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <ul className="compare-products">
                <li className="compare-product">
                  <a href="#" className="btn-remove" title="Remove Product">
                    <i className="icon-close" />
                  </a>
                  <h4 className="compare-product-title">
                    <a href="product.html">Blue Night Dress</a>
                  </h4>
                </li>
                <li className="compare-product">
                  <a href="#" className="btn-remove" title="Remove Product">
                    <i className="icon-close" />
                  </a>
                  <h4 className="compare-product-title">
                    <a href="product.html">White Long Skirt</a>
                  </h4>
                </li>
              </ul>
              <div className="compare-actions">
                <a href="#" className="action-link">
                  Xóa tất cả
                </a>
                <a href="#" className="btn btn-outline-primary-2">
                  <span>So sánh</span>
                  <i className="icon-long-arrow-right" />
                </a>
              </div>
            </div>
            {/* End .dropdown-menu */}
          </div>
          {/* End .compare-dropdown */}
          <div className="wishlist">
            <a href="wishlist.html" title="Wishlist">
              <div className="icon">
                <i className="icon-heart-o" />
                <span className="wishlist-count badge">3</span>
              </div>
              <p>Yêu thích</p>
            </a>
          </div>
          {/* End .compare-dropdown */}
          <div className="dropdown cart-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
            >
              <div className="icon">
                <i className="icon-shopping-cart" />
                <span className="cart-count">2</span>
              </div>
              <p>Giỏ hàng</p>
            </a>
            <div className="dropdown-menu dropdown-menu-right">
              <div className="dropdown-cart-products">
                <div className="product">
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <a href="product.html">
                        Beige knitted elastic runner shoes
                      </a>
                    </h4>
                    <span className="cart-product-info">
                      <span className="cart-product-qty">1</span>x $84.00
                    </span>
                  </div>
                  {/* End .product-cart-details */}
                  <figure className="product-image-container">
                    <a href="product.html" className="product-image">
                      <img
                        src="assets/images/products/cart/product-1.jpg"
                        alt="product"
                      />
                    </a>
                  </figure>
                  <a href="#" className="btn-remove" title="Remove Product">
                    <i className="icon-close" />
                  </a>
                </div>
                {/* End .product */}
                <div className="product">
                  <div className="product-cart-details">
                    <h4 className="product-title">
                      <a href="product.html">
                        Blue utility pinafore denim dress
                      </a>
                    </h4>
                    <span className="cart-product-info">
                      <span className="cart-product-qty">1</span>x $76.00
                    </span>
                  </div>
                  {/* End .product-cart-details */}
                  <figure className="product-image-container">
                    <a href="product.html" className="product-image">
                      <img
                        src="assets/images/products/cart/product-2.jpg"
                        alt="product"
                      />
                    </a>
                  </figure>
                  <a href="#" className="btn-remove" title="Remove Product">
                    <i className="icon-close" />
                  </a>
                </div>
                {/* End .product */}
              </div>
              {/* End .cart-product */}
              <div className="dropdown-cart-total">
                <span>Tổng cộng</span>
                <span className="cart-total-price">$160.00</span>
              </div>
              {/* End .dropdown-cart-total */}
              <div className="dropdown-cart-action">
                <a href="cart.html" className="btn btn-primary">
                  Xem
                </a>
                <a href="checkout.html" className="btn btn-outline-primary-2">
                  <span>Thanh toán</span>
                  <i className="icon-long-arrow-right" />
                </a>
              </div>
              {/* End .dropdown-cart-total */}
            </div>
            {/* End .dropdown-menu */}
          </div>
          {/* End .cart-dropdown */}
        </div>
        {/* End .header-right */}
      </div>
      {/* End .container */}
    </div>
    {/* End .header-middle */}
      <Menu/>
    {/* End .header-bottom */}
  </header>
  {/* End .header */}
</>



     );
}

export default Header;