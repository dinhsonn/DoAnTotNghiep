import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ContactService from "../../../services/ContactServices";

function Contact() {
  document.title = "Liên hệ";
  const navigate = useNavigate();
  const [contacts, setContacts] = useState({
    name: "",
    email: "",
    phone: "",
    content: "",
    status: "1",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone" && value !== "" && !/^\d+$/.test(value)) {
      return;
    }
    setContacts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ContactService.create(contacts)
      .then((response) => {
        Swal.fire({
          title: "Thành công!",
          text: "Gửi yêu cầu thành công!",
          icon: "success",
        });
        sendToGoogleForm();
        setTimeout(() => {
          navigate('/contact');
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        console.error("Lỗi khi tạo mới người dùng:", error);
      });
  };

  const sendToGoogleForm = () => {
    const formData = new FormData();
    formData.append("entry.146884205", contacts.name);
    formData.append("entry.1659690825", contacts.email);
    formData.append("entry.1688564603", contacts.phone);
    formData.append("entry.836537999", contacts.content);

    fetch("https://docs.google.com/forms/d/e/1FAIpQLSdcEijVmzwHO16eo9e47IG241cZsaPsFUMQhvQar_8iIxTn0A/formResponse", {
      method: "POST",
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log("Dữ liệu đã được gửi lên Google Form thành công");
      })
      .catch(error => {
        console.error("Lỗi khi gửi dữ liệu lên Google Form:", error);
      });
  };

  return (
    <>
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Liên hệ chúng tôi
              </li>
            </ol>
          </div>
        </nav>

        <div className="page-content pb-0">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-2 mb-lg-0">
                <h2 className="title mb-1">Thông tin liên hệ</h2>
                <p className="mb-3">
                  Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod
                  dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu,
                  dapibus eu, fermentum et, dapibus sed, urna.
                </p>
                <div className="row">
                  <div className="col-sm-7">
                    <div className="contact-info">
                      <h3>Cửa hàng</h3>
                      <ul className="contact-list">
                        <li>
                          <i className="icon-map-marker" />
                          82/10 Đường số 10, Tăng Nhơn Phú B, TP Thủ Đức, TPHCM
                        </li>
                        <li>
                          <i className="icon-phone" />
                          <a href="tel:#">+84 348 412 593</a>
                        </li>
                        <li>
                          <i className="icon-envelope" />
                          <a href="mailto:#">smartele@gmail.com</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-sm-5">
                    <div className="contact-info">
                      <h3>Hoạt động</h3>
                      <ul className="contact-list">
                        <li>
                          <i className="icon-clock-o" />
                          <span className="text-dark">Thứ hai-Thứ bảy</span> <br />
                          8h-21h
                        </li>
                        <li>
                          <i className="icon-calendar" />
                          <span className="text-dark">Chủ nhật</span> <br />
                          8h-16h
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <h2 className="title mb-1">Bạn có câu hỏi nào không?</h2>
                <p className="mb-2">
                  Sử dụng mẫu dưới đây để liên hệ với cửa hàng
                </p>
                <form className="contact-form mb-3" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-sm-6">
                      <label htmlFor="name" className="sr-only">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Tên *"
                        value={contacts.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label htmlFor="email" className="sr-only">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email *"
                        value={contacts.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-6">
                      <label htmlFor="phone" className="sr-only">
                        Phone
                      </label>
                      <input
                        type="phone"
                        className="form-control"
                        id="phone"
                        name="phone"
                        placeholder="Điện thoại *"
                        value={contacts.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <label htmlFor="content" className="sr-only">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      cols={30}
                      rows={4}
                      name="content"
                      id="content"
                      placeholder="Ghi chú *"
                      value={contacts.content}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
                    <span>GỬI ĐI</span>
                    <i className="icon-long-arrow-right" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Contact;
