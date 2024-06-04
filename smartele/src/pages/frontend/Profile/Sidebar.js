import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li><Link to="/profile">Thông tin tài khoản</Link></li>
        <li><Link to="/order">Quản lý đơn hàng</Link></li>
        <li><Link to="/addresses">Sổ địa chỉ</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
