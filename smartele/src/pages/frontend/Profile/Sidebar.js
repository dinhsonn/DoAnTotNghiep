import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { faUser, faShoppingBag, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
  const [name, setName] = useState(""); // Khai báo biến state 'name'

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');

    if (storedUser) {
      const user = JSON.parse(storedUser);
      setName(user.name); // Gán 'name' từ thông tin người dùng vào state
    }
  }, []);

  return (
    <div className="sidebar">
      <h2>{name}</h2>
      <ul>
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
            <span>Tài khoản của tôi</span>
          </Link>
        </li>
        <li>
          <Link to="/edit">
            <FontAwesomeIcon icon={faEdit} />
            <span>Sửa Hồ Sơ</span>
          </Link>
        </li>
        <li>
          <Link to="/order">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span>Đơn hàng</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
