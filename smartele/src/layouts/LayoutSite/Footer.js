import { useEffect } from "react";
import { useState } from "react";
import MenuServices from "../../services/MenuServices";
import { Link } from "react-router-dom";
function Footer() {
  const [fmenus, setFmenus] = useState([]);
  useEffect(() => {
    MenuServices.getAll()
      .then((response) => {
        const filteredMenus = response.data.content.filter(menu => menu.type === "1");
        const sortedMenus = filteredMenus.sort((a, b) => a.position - b.position);
        setFmenus(sortedMenus);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
    return ( 
<>
  <footer className="footer">
    <div className="footer-middle">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3">
            <div className="widget widget-about">
              <img
                src="assets/images/demos/demo-3/logo-footer.png"
                className="footer-logo"
                alt="Footer Logo"
                width={105}
                height={25}
              />
              <p>
              Giấy chứng nhận đăng ký doanh nghiệp: 
              0348412593 do Sở KH-ĐT TP.HCM cấp lần đầu ngày 30 tháng 05 năm 2007.{" "}
              </p>
              <div className="widget-call">
                <i className="icon-phone" />
                Có câu hỏi? Gọi ngay 24/7
                <a href="tel:#">+84 348 412 593</a>
              </div>
              {/* End .widget-call */}
            </div>
            {/* End .widget about-widget */}
          </div>
          {/* End .col-sm-6 col-lg-3 */}
          <div className="col-sm-6 col-lg-3">
            <div className="widget">
              <h4 className="widget-title">Liên kết hữu ích</h4>
              {/* End .widget-title */}
              <ul className="widget-list">
              {fmenus.filter(fmenu => fmenu.position === 0).map((fmenu, index) => (
                <li key={index}>
                  <Link to={fmenu.link}>{fmenu.name}</Link>
                </li>
              ))}
              </ul>
              {/* End .widget-list */}
            </div>
            {/* End .widget */}
          </div>
          {/* End .col-sm-6 col-lg-3 */}
          <div className="col-sm-6 col-lg-3">
            <div className="widget">
              <h4 className="widget-title">Dịch vụ khách hàng</h4>
              {/* End .widget-title */}
              <ul className="widget-list">
              {fmenus.filter(fmenu => fmenu.position === 1).map((fmenu, index) => (
                <li key={index}>
                  <Link to={fmenu.link}>{fmenu.name}</Link>
                </li>
              ))}
              </ul>
              {/* End .widget-list */}
            </div>
            {/* End .widget */}
          </div>
          {/* End .col-sm-6 col-lg-3 */}
          <div className="col-sm-6 col-lg-3">
            <div className="widget">
              <h4 className="widget-title">Tài khoản của tôi</h4>
              {/* End .widget-title */}
              <ul className="widget-list">
              {fmenus.filter(fmenu => fmenu.position === 2).map((fmenu, index) => (
                <li key={index}>
                  <Link to={fmenu.link}>{fmenu.name}</Link>
                </li>
              ))}
              </ul>
              {/* End .widget-list */}
            </div>
            {/* End .widget */}
          </div>
          {/* End .col-sm-6 col-lg-3 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </div>
    {/* End .footer-middle */}
    <div className="footer-bottom">
      <div className="container">
        <p className="footer-copyright">
          Copyright © 2019 Molla Store. Đã đăng ký bản quyền
        </p>
        {/* End .footer-copyright */}
        <figure className="footer-payments">
          <img
            src="assets/images/payments.png"
            alt="Payment methods"
            width={272}
            height={20}
          />
        </figure>
        {/* End .footer-payments */}
      </div>
      {/* End .container */}
    </div>
    {/* End .footer-bottom */}
  </footer>
  {/* End .footer */}
  {/* End .page-wrapper */}
  <button id="scroll-top" title="Back to Top">
    <i className="icon-arrow-up" />
  </button>
</>


     );
}

export default Footer;