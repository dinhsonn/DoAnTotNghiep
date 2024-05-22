import React, { useEffect, useState } from 'react';
import './profile.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.id;

    if (userId) {
      axios.get(`http://localhost:8082/api/users/${userId}`)
        .then(response => {
          setUser(response.data);
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }
  }, []);

  return (
    <>
      <div className="profile-container">
        <Sidebar />
        <div className="col-lg-6">
          <div className="profile-header">
            <h2>Thông tin tài khoản</h2>
          </div>
          <div className="contact-form mb-3">
            <div className="row">
              <div className="col-sm-6">
                <label htmlFor="name">Tên tài khoản:</label>
                <div className="form-control" id="name">{user.name}</div>
              </div>
              <div className="col-sm-6">
                <label htmlFor="email">Email:</label>
                <div className="form-control" id="email">{user.email}</div>
              </div>
              <div className="col-sm-6">
                <label htmlFor="phone">Số điện thoại:</label>
                <div className="form-control" id="phone">{user.phone}</div>
              </div>
              <div className="col-sm-6">
                <label htmlFor="address">Địa chỉ:</label>
                <div className="form-control" id="address">{user.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
