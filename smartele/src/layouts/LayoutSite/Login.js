import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserServices from "../../services/UserServices";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { useUser } from '../../services/UserContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useUser();

  //dang ky
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    address: '',
    sex: '',
    birthday: '',
    roles: '1',
    status: '0'
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    UserServices.create(formData)
      .then(response => {
        Swal.fire({
          title: "Thành công!",
          text: "Thêm người dùng thành công!",
          icon: "success"
        });
      })
      .catch(error => {
        console.error('Lỗi khi tạo mới người dùng:', error);
      });
  };
  //dang nhap
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    UserServices.getAll()
      .then(response => {
        const users = response.data.content;
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          localStorage.setItem('loggedInUser', JSON.stringify(user));
          Swal.fire({
            title: "Thành công!",
            text: "Đăng nhập thành công!",
            icon: "success"
          });
          const closeButton = document.querySelector('.close');
          if (closeButton) {
            closeButton.click();
          }

          login(user);
          console.log("user", user)
          setTimeout(() => {
            navigate('/');
            window.location.reload()
          }, 10000);
        } else {
          Swal.fire({
            title: "Lỗi!",
            text: "Email hoặc mật khẩu không đúng!",
            icon: "error"
          });
        }
      })
      .catch(error => {
        console.error('Lỗi khi đăng nhập:', error);
      });
  };
  //dang nhap google
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      if (credentialResponse && credentialResponse.credential) {
        const decodedToken = jwtDecode(credentialResponse.credential);
        console.log("API:", decodedToken);
        const { email, name } = decodedToken;

        const userData = {
          name: name,
          email: email,
          phone: '',
          username: '',
          password: '',
          address: '',
          sex: '',
          birthday: '',
          roles: '1',
          status: '0'
        };
        localStorage.setItem('loggedInUser', JSON.stringify(userData));

        const response = await UserServices.create(userData);

        console.log("Google Login successful", response);
        Swal.fire("Logged In Successfully!", "You have successfully logged into your account!", "success");
        const closeButton = document.querySelector(".close");
        if (closeButton) {
          closeButton.click();
        }
        setTimeout(() => {
          navigate('/');
          window.location.reload()
        }, 1000);
      } else {
        console.error("Invalid Google Login response:", credentialResponse);
      }
    } catch (error) { 
      console.error("Error handling Google Login:", error);
    }
  };


  return (
    <>
      <div
        className="modal fade"
        id="signin-modal"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="signin-tab"
                        data-toggle="tab"
                        href="#signin"
                        role="tab"
                        aria-controls="signin"
                        aria-selected="true"
                      >
                        Đăng nhập
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        id="register-tab"
                        data-toggle="tab"
                        href="#register"
                        role="tab"
                        aria-controls="register"
                        aria-selected="false"
                      >
                        Đăng ký
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div
                      className="tab-pane fade show active"
                      id="signin"
                      role="tabpanel"
                      aria-labelledby="signin-tab"
                    >

                      <form action="#" onSubmit={handleSubmitLogin}>
                        <div className="form-group">
                          <label htmlFor="singin-email">
                            Tên người dùng hoặc địa chỉ email *
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="singin-email"
                            name="email"
                            required=""
                            onChange={handleChange} value={formData.email}
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-group">
                          <label htmlFor="singin-password">Mật khẩu *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="singin-password"
                            name="password"
                            required=""
                            onChange={handleChange} value={formData.password}
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>ĐĂNG NHẬP</span>
                            <i className="icon-long-arrow-right" />
                          </button>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="signin-remember"
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="signin-remember"
                            >
                              Nhớ mật khẩu
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                          <a href="#" className="forgot-link">
                            Quên mật khẩu?
                          </a>
                        </div>
                        {/* End .form-footer */}
                      </form>
                      <div className="form-choice">
                        <p className="text-center">hoặc đăng nhập</p>
                        <div className="row">
                          <div className="col-sm-6">

                            <GoogleOAuthProvider clientId="63487271461-8saii2i38r6dlbbfeqh2rjs54grh3vj9.apps.googleusercontent.com">
                              <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              />
                            </GoogleOAuthProvider>

                          </div>
                          {/* End .col-6 */}
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login btn-f">
                              <i className="icon-facebook-f" />
                              Đăng nhập với Facebook
                            </a>
                          </div>
                          {/* End .col-6 */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .form-choice */}
                    </div>
                    {/* .End .tab-pane */}
                    <div
                      className="tab-pane fade"
                      id="register"
                      role="tabpanel"
                      aria-labelledby="register-tab"
                    >
                      <form action="#" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <label htmlFor="register-email" >
                            Địa chỉ email của bạn *
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="register-email"
                            name="email"
                            onChange={handleChange} value={formData.email}
                            required=""
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="register-name" >
                            Nhập tên của bạn
                          </label>
                          <input
                            type="name"
                            className="form-control"
                            id="register-name"
                            name="name"
                            onChange={handleChange} value={formData.name}
                            required=""
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-group">
                          <label htmlFor="register-password">Mật khẩu *</label>
                          <input
                            type="password"
                            className="form-control"
                            id="register-password"
                            name="password"
                            required=""
                            onChange={handleChange} value={formData.password}
                          />
                        </div>
                        {/* End .form-group */}
                        <div className="form-footer">
                          <button
                            type="submit"
                            className="btn btn-outline-primary-2"
                          >
                            <span>ĐĂNG KÝ</span>
                            <i className="icon-long-arrow-right" />
                          </button>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="register-policy"
                              required=""
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="register-policy"
                            >
                              Tôi đồng ý với <a href="#">chính sách bảo mật</a> *
                            </label>
                          </div>
                          {/* End .custom-checkbox */}
                        </div>
                        {/* End .form-footer */}
                      </form>
                      <div className="form-choice">
                        <p className="text-center">hoặc đăng nhập</p>
                        <div className="row">
                          <div className="col-sm-6">
                              <GoogleOAuthProvider clientId="63487271461-8saii2i38r6dlbbfeqh2rjs54grh3vj9.apps.googleusercontent.com">
                              <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => {
                                  console.log('Login Failed');
                                }}
                              />
                            </GoogleOAuthProvider>
                          </div>
                          {/* End .col-6 */}
                          <div className="col-sm-6">
                            <a href="#" className="btn btn-login  btn-f">
                              <i className="icon-facebook-f" />
                              Đăng nhập với Facebook
                            </a>
                          </div>
                          {/* End .col-6 */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .form-choice */}
                    </div>
                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
      </div>
      {/* End .modal */}
    </>

  );
}

export default Login;