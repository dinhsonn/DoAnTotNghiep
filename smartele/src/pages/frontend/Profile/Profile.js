import React, { useEffect, useState } from 'react';
import './profile.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const EditProfile = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [editedUser, setEditedUser] = useState({
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
          setUserDetails(response.data);
          setEditedUser({ ...response.data });
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8082/api/users/${editedUser.id}`, editedUser)
      .then(response => {
        console.log('Cập nhật thành công:', response.data);
        localStorage.setItem('loggedInUser', JSON.stringify(response.data));
        window.location.reload(); // Reload trang sau khi cập nhật thành công
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật thông tin người dùng:', error);
      });
  };

  return (
    <>
      <div className="profile-container">
        <Sidebar />
        <div className="col-lg-6">
          <div className="profile-header">
            <h2>Chỉnh sửa thông tin tài khoản</h2>
          </div>
          <form className="contact-form mb-3" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="username">Tên đăng nhập:</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={editedUser.username}
                  readOnly
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="name">Tên tài khoản:</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="email">Email:</label>
                <input
                  className="form-control"
                  type="text"
                  id="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  className="form-control"
                  type="text"
                  id="phone"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  className="form-control"
                  type="text"
                  id="address"
                  name="address"
                  value={editedUser.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-12">
                <button type="submit" className="btn btn-primary">
                  Lưu thay đổi
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="image">
          {/* Bạn có thể thêm ảnh đại diện ở đây */}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
