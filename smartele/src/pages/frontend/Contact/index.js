function Contact() {
    return ( 
        <>
  <main className="main">
    <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Trang chủ</a>
          </li>
         
          <li className="breadcrumb-item active" aria-current="page">
            Liên hệ chúng tôi
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-2 mb-lg-0">
            <h2 className="title mb-1">Thông tin liên hệ</h2>
            {/* End .title mb-2 */}
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
                  {/* End .contact-list */}
                </div>
                {/* End .contact-info */}
              </div>
              {/* End .col-sm-7 */}
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
                  {/* End .contact-list */}
                </div>
                {/* End .contact-info */}
              </div>
              {/* End .col-sm-5 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .col-lg-6 */}
          <div className="col-lg-6">
            <h2 className="title mb-1">Bạn có câu hỏi nào không?</h2>
            {/* End .title mb-2 */}
            <p className="mb-2">
                Sử dụng mẫu dưới đây để liên hệ với cửa hàng
            </p>
            <form action="#" className="contact-form mb-3">
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="cname" className="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cname"
                    placeholder="Tên *"
                    required=""
                  />
                </div>
                {/* End .col-sm-6 */}
                <div className="col-sm-6">
                  <label htmlFor="cemail" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="cemail"
                    placeholder="Email *"
                    required=""
                  />
                </div>
                {/* End .col-sm-6 */}
              </div>
              {/* End .row */}
              <div className="row">
                <div className="col-sm-6">
                  <label htmlFor="cphone" className="sr-only">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="cphone"
                    placeholder="Điện thoại"
                  />
                </div>
                {/* End .col-sm-6 */}
                <div className="col-sm-6">
                  <label htmlFor="csubject" className="sr-only">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="csubject"
                    placeholder="Chủ đề"
                  />
                </div>
                {/* End .col-sm-6 */}
              </div>
              {/* End .row */}
              <label htmlFor="cmessage" className="sr-only">
                Message
              </label>
              <textarea
                className="form-control"
                cols={30}
                rows={4}
                id="cmessage"
                required=""
                placeholder="Ghi chú *"
                defaultValue={""}
              />
              <button
                type="submit"
                className="btn btn-outline-primary-2 btn-minwidth-sm"
              >
                <span>GỬI ĐI</span>
                <i className="icon-long-arrow-right" />
              </button>
            </form>
            {/* End .contact-form */}
          </div>
          {/* End .col-lg-6 */}
        </div>
        {/* End .row */}
        <hr className="mt-4 mb-5" />
        <div className="stores mb-4 mb-lg-5">
          <h2 className="title text-center mb-3">Cửa hàng của chúng tôi</h2>
          {/* End .title text-center mb-2 */}
          <div className="row">
            <div className="col-lg-6">
              <div className="store">
                <div className="row">
                  <div className="col-sm-5 col-xl-6">
                    <figure className="store-media mb-2 mb-lg-0">
                      <img src="assets/images/stores/img-1.jpg" alt="image" />
                    </figure>
                    {/* End .store-media */}
                  </div>
                  {/* End .col-xl-6 */}
                  <div className="col-sm-7 col-xl-6">
                    <div className="store-content">
                      <h3 className="store-title">Wall Street Plaza</h3>
                      {/* End .store-title */}
                      <address>88 Pine St, New York, NY 10005, USA</address>
                      <div>
                        <a href="tel:#">+1 987-876-6543</a>
                      </div>
                      <h4 className="store-subtitle">Store Hours:</h4>
                      {/* End .store-subtitle */}
                      <div>Monday - Saturday 11am to 7pm</div>
                      <div>Sunday 11am to 6pm</div>
                      <a href="#" className="btn btn-link" target="_blank">
                        <span>View Map</span>
                        <i className="icon-long-arrow-right" />
                      </a>
                    </div>
                    {/* End .store-content */}
                  </div>
                  {/* End .col-xl-6 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .store */}
            </div>
            {/* End .col-lg-6 */}
            <div className="col-lg-6">
              <div className="store">
                <div className="row">
                  <div className="col-sm-5 col-xl-6">
                    <figure className="store-media mb-2 mb-lg-0">
                      <img src="assets/images/stores/img-2.jpg" alt="image" />
                    </figure>
                    {/* End .store-media */}
                  </div>
                  {/* End .col-xl-6 */}
                  <div className="col-sm-7 col-xl-6">
                    <div className="store-content">
                      <h3 className="store-title">One New York Plaza</h3>
                      {/* End .store-title */}
                      <address>88 Pine St, New York, NY 10005, USA</address>
                      <div>
                        <a href="tel:#">+1 987-876-6543</a>
                      </div>
                      <h4 className="store-subtitle">Store Hours:</h4>
                      {/* End .store-subtitle */}
                      <div>Monday - Friday 9am to 8pm</div>
                      <div>Saturday - 9am to 2pm</div>
                      <div>Sunday - Closed</div>
                      <a href="#" className="btn btn-link" target="_blank">
                        <span>View Map</span>
                        <i className="icon-long-arrow-right" />
                      </a>
                    </div>
                    {/* End .store-content */}
                  </div>
                  {/* End .col-xl-6 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .store */}
            </div>
            {/* End .col-lg-6 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .stores */}
      </div>
      {/* End .container */}
      <div id="map" />
      {/* End #map */}
    </div>
    {/* End .page-content */}
  </main>
  {/* End .main */}
</>

     );
}

export default Contact;