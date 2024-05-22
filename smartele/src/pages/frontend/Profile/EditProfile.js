import React, { useEffect, useState } from 'react';
import './profile.css';
import Sidebar from './Sidebar';
import axios from 'axios';

const EditProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState('');

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

    // Kiểm tra nếu là trường số điện thoại và giá trị nhập không phải là số hoặc không đủ 11 số
    if (name === 'phone' && (isNaN(value) || value.length < 10)) {
      setPhoneNumberError('Số điện thoại phải số');
    } else {
      setPhoneNumberError(''); // Xóa thông báo lỗi nếu nhập đúng định dạng
    }

    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8082/api/users/${editedUser.id}`, editedUser)
      .then(response => {
        console.log('Cập nhật thành công:', response.data);
        localStorage.setItem('loggedInUser', JSON.stringify(response.data));
        window.location.reload();

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
              <div className="col-sm-6">
                <label htmlFor="name">Tên tài khoản:</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser?.name || ''}
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
                  value={editedUser?.email || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-6">
                <label htmlFor="phone">Số điện thoại:</label>
                <input
                  className={`form-control ${phoneNumberError ? 'is-invalid' : ''}`}
                  type="text"
                  id="phone"
                  name="phone"
                  value={editedUser?.phone || ''}
                  onChange={handleInputChange}
                />
                {phoneNumberError && <div className="invalid-feedback">{phoneNumberError}</div>}
              </div>
              <div className="col-sm-12">
                <label htmlFor="address">Địa chỉ:</label>
                <input
                  className="form-control"
                  type="text"
                  id="address"
                  name="address"
                  value={editedUser?.address || ''}
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
        <div className="image"></div>
      </div>
    </>
  );
};

export default EditProfile;
