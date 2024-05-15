// src/Login.js
import React, { useState } from 'react';
import './Login.css';
import UserService from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const { name, password } = formData;
    UserService.getAll()
      .then(response => {
        const users = response.data.content;
        const user = users.find(user => user.name === name && user.password === password);
        if (user) {
          if (user.roles === 2) {
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('name', user.name); // Store the username
            navigate('/');
          } else {
            alert('Bạn không có quyền truy cập!');
          }
        } else {
          alert('Tên đăng nhập hoặc mật khẩu không đúng!');
        }
      })
      .catch(error => {
        console.error('Lỗi khi đăng nhập:', error);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmitLogin}>
        <h2>LOGIN</h2>
        <div className="input-group">
          <label htmlFor="name">Tên đăng nhập</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember" name="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="submit">LOGIN</button>
        <a href="#" className="forgot-password">Forgot?</a>
      </form>
    </div>
  );
}

export default Login;
