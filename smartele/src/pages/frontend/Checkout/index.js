import React from "react";
import { useLocation } from "react-router-dom";

function Checkout() {
  document.title = "Checkout";
  const location = useLocation();
  const { cartItems, totalAmount } = location.state;

  return (
    <>
      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">
              Thanh toán<span>Smart-Ele</span>
            </h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Thanh toán
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="page-content">
          <div className="checkout">
            <div className="container">
              <form action="#">
                <div className="row">
                  <div className="col-lg-9">
                    <h2 className="checkout-title">Chi tiết thanh toán</h2>
                    <div className="row">
                      <div className="col-sm-6">
                        <label>Tên đầy đủ</label>
                        <input type="text" className="form-control" required="" />
                      </div>
                      {/* End .col-sm-6 */}
                      <div className="col-sm-6">
                        <label>Email</label>
                        <input type="text" className="form-control" required="" />
                      </div>
                      {/* End .col-sm-6 */}
                    </div>
                    {/* End .row */}
                    <label>Điện thoại</label>
                    <input type="text" className="form-control" />
                    <label>Địa chỉ</label>
                    <input type="text" className="form-control" required="" />
                  </div>
                  {/* End .col-lg-9 */}
                  <aside className="col-lg-3">
                    <div className="summary">
                      <h3 className="summary-title">Đơn hàng của bạn</h3>
                      <table className="table table-summary">
                        <thead>
                          <tr>
                            <th>Sản phẩm</th>
                            <th>Giá </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <a href="#">{item.product.name}</a>
                              </td>
                              <td>${item.price}</td>
                            </tr>
                          ))}
                          <tr className="summary-subtotal">
                            <td>Tổng tiền:</td>
                            <td>${totalAmount.toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td>Phương thức vận chuyển:</td>
                            <td>Miễn phí</td>
                          </tr>
                          <tr className="summary-total">
                            <td>Tổng cộng:</td>
                            <td>${totalAmount.toFixed(2)}</td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="accordion-summary" id="accordion-payment">
                        <div className="card">
                          {/* ... */}
                        </div>
                        {/* End .card */}
                        <div className="card">
                          {/* ... */}
                        </div>
                        {/* End .card */}
                        <div className="card">
                          {/* ... */}
                        </div>
                        {/* End .card */}
                        <div className="card">
                          {/* ... */}
                        </div>
                        {/* End .card */}
                        <div className="card">
                          {/* ... */}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-outline-primar y-2 btn-order btn-block"
                      >
                        <span className="btn-text">Đặt hàng</span>
                        <span className="btn-hover-text">Tiến hành thanh toán</span>
                      </button>
                    </div>
                  </aside>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Checkout;
