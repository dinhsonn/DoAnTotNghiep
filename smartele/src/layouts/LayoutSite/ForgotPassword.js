import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import "./forgot.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const sendVerificationCode = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (response.ok) {
        alert("Mã xác nhận đã được gửi tới email của bạn.");
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };

  const resetPassword = async () => {
    try {
      if (newPassword.length < 10|| !/[a-zA-Z]/.test(newPassword)) {
        alert("Mật khẩu mới phải có ít nhất 6 ký tự.");
        return;
      }
  
      const response = await fetch('http://localhost:8082/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, newPassword })
      });
      if (response.ok) {
        alert("Mật khẩu đã được đặt lại thành công.");
        navigate('/');
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Có lỗi xảy ra, vui lòng thử lại.");
    }
  };
  
  return (
    <div className="forgot-password-container">
      <h2>Tìm tài khoản của bạn</h2>
      <p>Vui lòng nhập email hoặc số di động để tìm kiếm tài khoản của bạn.</p>
      <form onSubmit={(e) => { e.preventDefault(); sendVerificationCode(); }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <div className="button-group">
          <button type="submit" className="search-button">Tìm kiếm</button>
        </div>
      </form>
      <div>
        <label>Mã xác nhận:</label>
        <input value={code} onChange={(e) => setCode(e.target.value)} />
        <label>Mật khẩu mới:</label>
        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <button onClick={resetPassword}>Đặt lại mật khẩu</button>
      </div>
    </div>
  );
}

export default ForgotPassword;
