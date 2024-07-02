import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Login from "./Login";
import Menu from "./Menu";
import CartHeader from "./CartHeader";
import './Header.css';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();

  // Function to handle successful login
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setName(user.name);
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
    }

    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false);
    setName("");
    window.location.href = '/';
  };


  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    console.log(`User searched for: ${searchQuery}`);

    // Log search query to backend
    try {
      await axios.post('http://localhost:8082/api/search-log', { query: searchQuery });
    } catch (error) {
      console.error('Error logging search query:', error);
    }

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
                              <a href="/order">Quản lý đơn hàng</a>
                            </h4>
                            <h4 className="titleoptioncte">
                              <a href="/changepassword">Đổi mật khẩu</a>
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
