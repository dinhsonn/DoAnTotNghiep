// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  const handleLogout = () => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn thoát?');
    if (confirmed) {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('name');
      navigate('/login');
    }
  };

  return (
    <section className="hdl-header sticky-top">
      <div className="container-fluid">
        <ul className="menutop">
          <li>
            <a href="/">
              <i className="fa-brands fa-dashcube" /> SmartELe
            </a>
          </li>
          {isAuthenticated ? (
            <>
              <li className="text-phai">
                <a href="#" onClick={handleLogout}>
                  <i className="fa-solid fa-power-off" /> Thoát
                </a>
              </li>
              <li className="text-phai">
                <a href="#">
                  <i className="fa fa-user" aria-hidden="true" /> Chào {name}
                </a>
              </li>
            </>
          ) : (
            <li className="text-phai">
              <a href="/login">
                <i className="fa-solid fa-power-off" /> Đăng nhập
              </a>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

export default Header;
