import React, { useEffect, useState } from 'react';
import './profile.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ChangePassword = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editedUser, setEditedUser] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const toggleShowPassword = (field) => {
    switch (field) {
      case 'oldPassword':
        setShowOldPassword(!showOldPassword);
        break;
      case 'newPassword':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirmPassword':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (editedUser.newPassword !== editedUser.confirmPassword) {
      Swal.fire({
        title: 'Lỗi',
        text: 'Mật khẩu mới và xác nhận mật khẩu không khớp.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    axios.post('http://localhost:8082/api/users/verify-password', {
      userId: userDetails.id,
      oldPassword: editedUser.oldPassword
    })
    .then(response => {
      if (response.data) {
        axios.put(`http://localhost:8082/api/users/${userDetails.id}/password`, {
          newPassword: editedUser.newPassword
        })
        .then(() => {
          Swal.fire({
            title: 'Thành công',
            text: 'Mật khẩu đã cập nhật thành công.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then(() => {
          window.location.reload();
          });
        })
        .catch(error => {
          console.error('Lỗi khi cập nhật mật khẩu:', error);
          Swal.fire({
            title: 'Lỗi',
            text: 'Đã xảy ra lỗi khi cập nhật mật khẩu.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        });
      } else {
        Swal.fire({
          title: 'Lỗi',
          text: 'Mật khẩu cũ không chính xác.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    })
    .catch(error => {
      console.error('Lỗi khi xác thực mật khẩu cũ:', error);
      Swal.fire({
        title: 'Lỗi',
        text: 'Đã xảy ra lỗi khi xác thực mật khẩu.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    });
  };

  return (
    <>
      <div className="profile-container">
        <Sidebar />
        <div className="col-lg-6">
          <div className="profile-header">
            <h4>Đổi mật khẩu</h4>
          </div>
          <form className="contact-form mb-3" onSubmit={handleFormSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label>Mật khẩu cũ:</label>
                <div className="input-group">
                  <input
                    type={showOldPassword ? 'text' : 'password'}
                    className="form-control"
                    name="oldPassword"
                    value={editedUser.oldPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text" onClick={() => toggleShowPassword('oldPassword')}>
                    <FontAwesomeIcon icon={showOldPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>
              <div className="col-sm-12">
                <label>Mật khẩu mới:</label>
                <div className="input-group">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    className="form-control"
                    name="newPassword"
                    value={editedUser.newPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text" onClick={() => toggleShowPassword('newPassword')}>
                    <FontAwesomeIcon icon={showNewPassword ? faEyeSlash : faEye} />
                  </span>
                </div>
              </div>  
              <div className="col-sm-12">
                <label>Xác nhận mật khẩu:</label>
                <div className="input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="form-control"
                    name="confirmPassword"
                    value={editedUser.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                  <span className="input-group-text" onClick={() => toggleShowPassword('confirmPassword')}>
                    <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                  </span>
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

export default ChangePassword;
