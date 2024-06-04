import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './Address.css';
import Sidebar from './Sidebar';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const Address = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="profile-container">
      <Sidebar />
      <div className="address-management">
        <h2>Địa chỉ</h2>
        <div className="add-address" onClick={openModal}>
          <span>+ Thêm địa chỉ mới</span>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Add New Address">
        <div className="modal-content">
          <h2>Thông tin người nhận hàng</h2>
          <form className="contact-form mb-3" onSubmit={handleFormSubmit}>
          <div className="col-sm-12">
                <label htmlFor="address">Nhập địa chỉ:</label>
                <input
                  className="form-control"
                  type="text"
                  id="address"
                  name="address"
                  value={editedUser?.address || ''}
                  onChange={handleInputChange}
                />
              </div>
            <div className="form-actions">
              <button type="button" onClick={closeModal}>Hủy bỏ</button>
              <button type="submit">Lưu địa chỉ</button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Address;
