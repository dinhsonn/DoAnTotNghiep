function Checkout() {
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
          {/* <li className="breadcrumb-item">
            <a href="#">Shop</a>
          </li> */}
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
          <div className="checkout-discount">
            <form action="#">
              <input
                type="text"
                className="form-control"
                required=""
                id="checkout-discount-input"
              />
              <label
                htmlFor="checkout-discount-input"
                className="text-truncate"
              >
                Có mã giảm giá? <span> Bấm vào đây nhập mã giảm giá</span>
              </label>
            </form>
          </div>
          {/* End .checkout-discount */}
          <form action="#">
            <div className="row">
              <div className="col-lg-9">
                <h2 className="checkout-title">Chi tiết thanh toán</h2>
                {/* End .checkout-title */}
                <div className="row">
                  <div className="col-sm-6">
                    <label>First Name *</label>
                    <input type="text" className="form-control" required="" />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label>Last Name *</label>
                    <input type="text" className="form-control" required="" />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}
                <label>Company Name (Optional)</label>
                <input type="text" className="form-control" />
                <label>Country *</label>
                <input type="text" className="form-control" required="" />
                <label>Street address *</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="House number and Street name"
                  required=""
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Appartments, suite, unit etc ..."
                  required=""
                />
                <div className="row">
                  <div className="col-sm-6">
                    <label>Town / City *</label>
                    <input type="text" className="form-control" required="" />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label>State / County *</label>
                    <input type="text" className="form-control" required="" />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}
                <div className="row">
                  <div className="col-sm-6">
                    <label>Postcode / ZIP *</label>
                    <input type="text" className="form-control" required="" />
                  </div>
                  {/* End .col-sm-6 */}
                  <div className="col-sm-6">
                    <label>Phone *</label>
                    <input type="tel" className="form-control" required="" />
                  </div>
                  {/* End .col-sm-6 */}
                </div>
                {/* End .row */}
                <label>Email address *</label>
                <input type="email" className="form-control" required="" />
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="checkout-create-acc"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="checkout-create-acc"
                  >
                    Create an account?
                  </label>
                </div>
                {/* End .custom-checkbox */}
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="checkout-diff-address"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="checkout-diff-address"
                  >
                    Ship to a different address?
                  </label>
                </div>
                {/* End .custom-checkbox */}
                <label>Order notes (optional)</label>
                <textarea
                  className="form-control"
                  cols={30}
                  rows={4}
                  placeholder="Notes about your order, e.g. special notes for delivery"
                  defaultValue={""}
                />
              </div>
              {/* End .col-lg-9 */}
              <aside className="col-lg-3">
                <div className="summary">
                  <h3 className="summary-title">Đơn hàng của bạn</h3>
                  {/* End .summary-title */}
                  <table className="table table-summary">
                    <thead>
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Giá </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a href="#">Beige knitted elastic runner shoes</a>
                        </td>
                        <td>$84.00</td>
                      </tr>
                      <tr>
                        <td>
                          <a href="#">Blue utility pinafore denimdress</a>
                        </td>
                        <td>$76,00</td>
                      </tr>
                      <tr className="summary-subtotal">
                        <td>Tổng tiền:</td>
                        <td>$160.00</td>
                      </tr>
                      {/* End .summary-subtotal */}
                      <tr>
                        <td>Phương thức vận chuyển:</td>
                        <td>Miễn phí</td>
                      </tr>
                      <tr className="summary-total">
                        <td>Tổng cộng:</td>
                        <td>$160.00</td>
                      </tr>
                      {/* End .summary-total */}
                    </tbody>
                  </table>
                  {/* End .table table-summary */}
                  <div className="accordion-summary" id="accordion-payment">
                    <div className="card">
                      <div className="card-header" id="heading-1">
                        <h2 className="card-title">
                          <a
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-1"
                            aria-expanded="true"
                            aria-controls="collapse-1"
                          >
                            Thanh toán khi nhận hàng
                          </a>
                        </h2>
                      </div>
                      {/* End .card-header */}
                      <div
                        id="collapse-1"
                        className="collapse show"
                        aria-labelledby="heading-1"
                        data-parent="#accordion-payment"
                      >
                        <div className="card-body">
                          Make your payment directly into our bank account.
                          Please use your Order ID as the payment reference.
                          Your order will not be shipped until the funds have
                          cleared in our account.
                        </div>
                        {/* End .card-body */}
                      </div>
                      {/* End .collapse */}
                    </div>
                    {/* End .card */}
                    <div className="card">
                      <div className="card-header" id="heading-2">
                        <h2 className="card-title">
                          <a
                            className="collapsed"
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-2"
                            aria-expanded="false"
                            aria-controls="collapse-2"
                          >
                            Thanh toán bằng thẻ ngân hàng
                          </a>
                        </h2>
                      </div>
                      {/* End .card-header */}
                      <div
                        id="collapse-2"
                        className="collapse"
                        aria-labelledby="heading-2"
                        data-parent="#accordion-payment"
                      >
                        <div className="card-body">
                          Ipsum dolor sit amet, consectetuer adipiscing elit.
                          Donec odio. Quisque volutpat mattis eros. Nullam
                          malesuada erat ut turpis.
                        </div>
                        {/* End .card-body */}
                      </div>
                      {/* End .collapse */}
                    </div>
                    {/* End .card */}
                    <div className="card">
                      <div className="card-header" id="heading-3">
                        <h2 className="card-title">
                          <a
                            className="collapsed"
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-3"
                            aria-expanded="false"
                            aria-controls="collapse-3"
                          >
                            MOMO
                          </a>
                        </h2>
                      </div>
                      {/* End .card-header */}
                      <div
                        id="collapse-3"
                        className="collapse"
                        aria-labelledby="heading-3"
                        data-parent="#accordion-payment"
                      >
                        <div className="card-body">
                          Quisque volutpat mattis eros. Lorem ipsum dolor sit
                          amet, consectetuer adipiscing elit. Donec odio.
                          Quisque volutpat mattis eros.
                        </div>
                        {/* End .card-body */}
                      </div>
                      {/* End .collapse */}
                    </div>
                    {/* End .card */}
                    <div className="card">
                      <div className="card-header" id="heading-4">
                        <h2 className="card-title">
                          <a
                            className="collapsed"
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-4"
                            aria-expanded="false"
                            aria-controls="collapse-4"
                          >
                            PayPal{" "}
                            <small className="float-right paypal-link">
                              PayPal là gì?
                            </small>
                          </a>
                        </h2>
                      </div>
                      {/* End .card-header */}
                      <div
                        id="collapse-4"
                        className="collapse"
                        aria-labelledby="heading-4"
                        data-parent="#accordion-payment"
                      >
                        <div className="card-body">
                          Nullam malesuada erat ut turpis. Suspendisse urna
                          nibh, viverra non, semper suscipit, posuere a, pede.
                          Donec nec justo eget felis facilisis fermentum.
                        </div>
                        {/* End .card-body */}
                      </div>
                      {/* End .collapse */}
                    </div>
                    {/* End .card */}
                    <div className="card">
                      <div className="card-header" id="heading-5">
                        <h2 className="card-title">
                          <a
                            className="collapsed"
                            role="button"
                            data-toggle="collapse"
                            href="#collapse-5"
                            aria-expanded="false"
                            aria-controls="collapse-5"
                          >
                             Thẻ tín dụng (Credit Card)
                            <img
                              src="assets/images/payments-summary.png"
                              alt="payments cards"
                            />
                          </a>
                        </h2>
                      </div>
                      {/* End .card-header */}
                      <div
                        id="collapse-5"
                        className="collapse"
                        aria-labelledby="heading-5"
                        data-parent="#accordion-payment"
                      >
                        <div className="card-body">
                          {" "}
                          Donec nec justo eget felis facilisis fermentum.Lorem
                          ipsum dolor sit amet, consectetuer adipiscing elit.
                          Donec odio. Quisque volutpat mattis eros. Lorem ipsum
                          dolor sit ame.
                        </div>
                        {/* End .card-body */}
                      </div>
                      {/* End .collapse */}
                    </div>
                    {/* End .card */}
                  </div>
                  {/* End .accordion */}
                  <button
                    type="submit"
                    className="btn btn-outline-primary-2 btn-order btn-block"
                  >
                    <span className="btn-text">Đặt hàng</span>
                    <span className="btn-hover-text">Tiến hành thanh toán</span>
                  </button>
                </div>
                {/* End .summary */}
              </aside>
              {/* End .col-lg-3 */}
            </div>
            {/* End .row */}
          </form>
        </div>
        {/* End .container */}
      </div>
      {/* End .checkout */}
    </div>
    {/* End .page-content */}
  </main>
  {/* End .main */}
</>

     );
}

export default Checkout;