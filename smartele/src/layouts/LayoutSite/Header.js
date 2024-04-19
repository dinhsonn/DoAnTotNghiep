import Login from "./Login";
import Menu from "./Menu";
import { useEffect, useState } from "react";
import './Header.css';
import CartHeader from "./CartHeader";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(""); // Khai báo biến state 'name'

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setName(user.name); 
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setName(""); // Xóa 'name' khi đăng xuất
    window.location.href = '/';
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setName(user.name); // Gán 'name' từ thông tin người dùng vào state
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  return (
    <>
      <header className="header header-intro-clearance header-3">
        <Login onLoginSuccess={handleLoginSuccess} />
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
                      {isLoggedIn ? (
                        <div className="dropdown compare-dropdown">
                          <li className="icon-user" style={{ cursor: 'pointer', fontSize: '1.4em' }}>{name} </li>
                          <ul className="dropdown-menu">
                            <h4 className="compare-product-title">
                              <a href="/profile">Thông tin tài khoản</a>
                            </h4>
                            <h4 className="compare-product-title">
                              <a href="#" onClick={handleLogout}>Đăng xuất</a>
                            </h4>
                          </ul>
                        </div>
                      ) : (
                        <li>
                          <a href="#signin-modal" data-toggle="modal">
                            {isLoggedIn ? name : 'Đăng nhập / Đăng ký'}
                          </a>
                        </li>
                      )}
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
              <a href="/" className="logo">
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
              <CartHeader />
              {/* End .cart-dropdown */}
            </div>
            {/* End .header-right */}
          </div>
          {/* End .container */}
        </div>
        {/* End .header-middle */}
        <Menu />
        {/* End .header-bottom */}
      </header>
      {/* End .header */}
    </>



  );
}

export default Header;