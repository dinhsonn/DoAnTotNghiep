import React, { useEffect, useState } from 'react';
import './profile.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (!loggedInUser) {
      Swal.fire({
        title: 'Bạn cần đăng nhập',
        text: 'Để xem đơn hàng, vui lòng đăng nhập hoặc đăng ký tài khoản.',
        icon: 'warning',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/');
        }
      });
    } else {
      const userId = loggedInUser.id;

      axios.get(`http://localhost:8082/api/users/${userId}`)
        .then(response => {
          setUserDetails(response.data);
          setEditedUser({ ...response.data });
        })
        .catch(error => {
          console.error('Lỗi khi lấy thông tin người dùng:', error);
        });
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone' && (isNaN(value) || value.length < 10)) {
      setPhoneNumberError('Số điện thoại phải là số và có ít nhất 10 số');
    } else {
      setPhoneNumberError('');
    }

    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    axios.put(`http://localhost:8082/api/users/${editedUser.id}`, editedUser)
      .then(response => {
        Swal.fire({
          title: 'Thành công',
          text: 'Thông tin của bạn đã được cập nhật.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          localStorage.setItem('loggedInUser', JSON.stringify(response.data));
          window.location.reload();
        });
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
            <h4>Thông tin tài khoản</h4>
          </div>
          <form className="contact-form mb-3" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label htmlFor="name">Họ tên:</label>
                <input
                  className="form-control"
                  type="text"
                  id="name"
                  name="name"
                  value={editedUser?.name || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-12">
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
              <div className="col-sm-12">
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
                <label htmlFor="birthday">Ngày sinh:</label>
                <input
                  className="form-control"
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={editedUser?.birthday || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div className="col-sm-12">
                <label>Giới tính:</label>
                <div className="gender-selection">
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="nam"
                      checked={editedUser?.sex === 'nam'}
                      onChange={handleInputChange}
                    />
                    Nam
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sex"
                      value="nữ"
                      checked={editedUser?.sex === 'nữ'}
                      onChange={handleInputChange}
                    />
                    Nữ
                  </label>
                </div>
              </div>
              <div className="col-sm-12">
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
