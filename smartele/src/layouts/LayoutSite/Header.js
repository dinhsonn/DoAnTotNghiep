import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Thêm axios để gửi request tới backend
import Login from "./Login";
import Menu from "./Menu";
import CartHeader from "./CartHeader";
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(""); // State cho tên người dùng
  const [searchQuery, setSearchQuery] = useState(''); // State cho tìm kiếm

  const navigate = useNavigate();

  // Xử lý khi đăng nhập thành công
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setName(user.name);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  // Xử lý khi đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setName("");
    window.location.href = '/';
  };

  // Xử lý khi submit form tìm kiếm
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    console.log(`User searched for: ${searchQuery}`);

    // Gửi thông tin tìm kiếm tới backend
    try {
      await axios.post('http://localhost:8082/api/search-log', { query: searchQuery });
    } catch (error) {
      console.error('Error logging search query:', error);
    }

    // Điều hướng tới trang kết quả tìm kiếm
    navigate(`/search?q=${searchQuery}`);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsLoggedIn(true);
      setName(user.name);
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
            <div className="header-right">
              <ul className="top-menu">
                <li>
                  <a href="#">Liên kết</a>
                  <ul>
                    <li>
                      <div className="header-dropdown">
                        <a href="#">Việt Nam</a>
                        <div className="header-menu">
                          <ul>
                            <li><a href="#">Việt Nam</a></li>
                            <li><a href="#">English</a></li>
                          </ul>
                        </div>
                      </div>
                    </li>
                    <li>
                      {isLoggedIn ? (
                        <div className="dropdown compare-dropdown">
                          <li className="icon-user" style={{ cursor: 'pointer', fontSize: '1.4em' }}>{name} </li>
                          <ul className="dropdown-menu">
                            <h4 className="titleoptioncte">
                              <a href="/profile">Thông tin tài khoản</a>
                            </h4>
                            <h4 className="titleoptioncte">
                            <a href="/order">
                              Quản lý đơn hàng
                            </a>
                            </h4>

                            <h4 className="titleoptioncte">
                            <a href="/changepassword" className="titleoptioncte">
                              Đổi mật khẩu
                            </a>
                            </h4>


                            <button className="btn btn-primary">
                              <a href="#" onClick={handleLogout}>Đăng xuất</a>
                            </button>
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
            </div>
          </div>
        </div>
        <div className="header-middle">
          <div className="container">
            <div className="header-left">
              <button className="mobile-menu-toggler">
                <span className="sr-only">Toggle mobile menu</span>
                <i className="icon-bars" />
              </button>
              <a href="/" className="logo">
                <img src="assets/images/demos/demo-3/logo.png" alt="Molla Logo" width={105} height={25} />
              </a>
            </div>
            <div className="header-center">
              <div className="header-search header-search-extended header-search-visible d-none d-lg-block">
                <a href="#" className="search-toggle" role="button">
                  <i className="icon-search" />
                </a>
                <form onSubmit={handleSearchSubmit}>
                  <div className="header-search-wrapper search-wrapper-wide">
                    <label htmlFor="q" className="sr-only">Search</label>
                    <button className="btn btn-primary" type="submit">
                      <i className="icon-search" />
                    </button>
                    <input
                      type="search"
                      className="form-control"
                      name="q"
                      id="q"
                      placeholder="Tìm kiếm sản phẩm ..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
            <div className="header-right">
              <div className="dropdown compare-dropdown">
                <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static" title="Compare Products" aria-label="Compare Products">
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
                    <a href="#" className="action-link">Xóa tất cả</a>
                    <a href="#" className="btn btn-outline-primary-2">
                      <span>So sánh</span>
                      <i className="icon-long-arrow-right" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="wishlist">
                <a href="/wishlist" title="Wishlist">
                  <div className="icon">
                    <i className="icon-heart-o" />
                  </div>
                  <p>Yêu thích</p>
                </a>
              </div>
              <CartHeader />
            </div>
          </div>
        </div>
        <Menu />
      </header>
    </>
  );
}

export default Header;
