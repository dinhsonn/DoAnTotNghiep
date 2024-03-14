function FAQ() {
    return ( 
        <>
  <main className="main">
    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          Câu hỏi thường gặp<span>F.A.Q</span>
        </h1>
      </div>
      {/* End .container */}
    </div>
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.html">Trang chủ</a>
          </li>
          {/* <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li> */}
          <li className="breadcrumb-item active" aria-current="page">
            Câu hỏi thường gặp
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content">
      <div className="container">
        <h2 className="title text-center mb-3">Thông tin vận chuyển</h2>
        {/* End .title */}
        <div className="accordion accordion-rounded" id="accordion-1">
          <div className="card card-box card-sm bg-light">
            <div className="card-header" id="heading-1">
              <h2 className="card-title">
                <a
                  role="button"
                  data-toggle="collapse"
                  href="#collapse-1"
                  aria-expanded="true"
                  aria-controls="collapse-1"
                >
                  Kiện hàng của tôi sẽ được giao như thế nào?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse-1"
              className="collapse show"
              aria-labelledby="heading-1"
              data-parent="#accordion-1"
            >
              <div className="card-body">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
                odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
                turpis. Suspendisse urna nibh, viverra non, semper suscipit,
                posuere a, pede. Donec nec justo eget felis facilisis fermentum.
                Aliquam porttitor mauris sit amet orci. Aenean dignissim
                pellentesque felis. Phasellus ultrices nulla quis nibh. Quisque
                a lectus. Donec consectetuer ligula vulputate sem tristique
                cursus. Nam nulla quam, gravida non, commodo a, sodales sit
                amet, nisi.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
          <div className="card card-box card-sm bg-light">
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
                  Làm cách nào để thanh toán đơn hàng?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse-2"
              className="collapse"
              aria-labelledby="heading-2"
              data-parent="#accordion-1"
            >
              <div className="card-body">
                Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                Suspendisse urna nibh, viverra non, semper suscipit, posuere a,
                pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum
                dolor sit amet, consectetuer adipiscing elit. Donec odio.
                Quisque volutpat mattis eros.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
          <div className="card card-box card-sm bg-light">
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
                  Tôi có bị tính phí hải quan không?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse-3"
              className="collapse"
              aria-labelledby="heading-3"
              data-parent="#accordion-1"
            >
              <div className="card-body">
                Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra
                non, semper suscipit, posuere a, pede. Donec nec justo eget
                felis facilisis fermentum.Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Donec odio. Quisque volutpat mattis eros.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
          <div className="card card-box card-sm bg-light">
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
                  Mặt hàng của tôi đã bị lỗi khi vận chuyển?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse-4"
              className="collapse"
              aria-labelledby="heading-4"
              data-parent="#accordion-1"
            >
              <div className="card-body">
                Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra
                non, semper suscipit, posuere a, pede. Donec nec justo eget
                felis facilisis fermentum.Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Donec odio. Quisque volutpat mattis eros.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
        </div>
        {/* End .accordion */}
        <h2 className="title text-center mb-3">Đơn hàng và Đổi trả</h2>
        {/* End .title */}
        <div className="accordion accordion-rounded" id="accordion-2">
          <div className="card card-box card-sm bg-light">
            <div className="card-header" id="heading2-1">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse2-1"
                  aria-expanded="false"
                  aria-controls="collapse2-1"
                >
                  Theo dõi đơn hàng của tôi?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse2-1"
              className="collapse"
              aria-labelledby="heading2-1"
              data-parent="#accordion-2"
            >
              <div className="card-body">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
                odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
                turpis. Suspendisse urna nibh, viverra non, semper suscipit,
                posuere a, pede. Donec nec justo eget felis facilisis fermentum.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
          <div className="card card-box card-sm bg-light">
            <div className="card-header" id="heading2-2">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse2-2"
                  aria-expanded="false"
                  aria-controls="collapse2-2"
                >
                  Tôi chưa nhận được đơn hàng của mình?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse2-2"
              className="collapse"
              aria-labelledby="heading2-2"
              data-parent="#accordion-2"
            >
              <div className="card-body">
                Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                Suspendisse urna nibh, viverra non, semper suscipit, posuere a,
                pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum
                dolor sit amet, consectetuer adipiscing elit. Donec odio.
                Quisque volutpat mattis eros.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
          <div className="card card-box card-sm bg-light">
            <div className="card-header" id="heading2-3">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse2-3"
                  aria-expanded="false"
                  aria-controls="collapse2-3"
                >
                  Làm thế nào để đổi trả sản phẩm?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse2-3"
              className="collapse"
              aria-labelledby="heading2-3"
              data-parent="#accordion-2"
            >
              <div className="card-body">
                Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra
                non, semper suscipit, posuere a, pede. Donec nec justo eget
                felis facilisis fermentum.Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Donec odio. Quisque volutpat mattis eros.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
        </div>
        {/* End .accordion */}
        <h2 className="title text-center mb-3">Thanh toán</h2>
        {/* End .title */}
        <div className="accordion accordion-rounded" id="accordion-3">
          <div className="card card-box card-sm bg-light">
            <div className="card-header" id="heading3-1">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse3-1"
                  aria-expanded="false"
                  aria-controls="collapse3-1"
                >
                  Tôi có thể sữ dụng những phương thức thanh toán nào?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse3-1"
              className="collapse"
              aria-labelledby="heading3-1"
              data-parent="#accordion-3"
            >
              <div className="card-body">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
                odio. Quisque volutpat mattis eros. Nullam malesuada erat ut
                turpis. Suspendisse urna nibh, viverra non, semper suscipit,
                posuere a, pede. Donec nec justo eget felis facilisis fermentum.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
          <div className="card card-box card-sm bg-light">
            <div className="card-header" id="heading3-2">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse3-2"
                  aria-expanded="false"
                  aria-controls="collapse3-2"
                >
                  Tôi có thể thanh toán thông qua thẻ quà tặng không?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse3-2"
              className="collapse"
              aria-labelledby="heading3-2"
              data-parent="#accordion-3"
            >
              <div className="card-body">
                Ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
                Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
                Suspendisse urna nibh, viverra non, semper suscipit, posuere a,
                pede. Donec nec justo eget felis facilisis fermentum.Lorem ipsum
                dolor sit amet, consectetuer adipiscing elit. Donec odio.
                Quisque volutpat mattis eros.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
          <div className="card card-box card-sm bg-light">
            <div className="card-header" id="heading3-3">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse3-3"
                  aria-expanded="false"
                  aria-controls="collapse3-3"
                >
                  Tôi không thể thanh toán?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse3-3"
              className="collapse"
              aria-labelledby="heading3-3"
              data-parent="#accordion-3"
            >
              <div className="card-body">
                Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra
                non, semper suscipit, posuere a, pede. Donec nec justo eget
                felis facilisis fermentum.Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Donec odio. Quisque volutpat mattis eros.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
          <div className="card card-box card-sm bg-light">
            <div className="card-header" id="heading3-4">
              <h2 className="card-title">
                <a
                  className="collapsed"
                  role="button"
                  data-toggle="collapse"
                  href="#collapse3-4"
                  aria-expanded="false"
                  aria-controls="collapse3-4"
                >
                  Khoản thanh toán của tôi đã được thực hiện chưa?
                </a>
              </h2>
            </div>
            {/* End .card-header */}
            <div
              id="collapse3-4"
              className="collapse"
              aria-labelledby="heading3-4"
              data-parent="#accordion-3"
            >
              <div className="card-body">
                Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra
                non, semper suscipit, posuere a, pede. Donec nec justo eget
                felis facilisis fermentum.Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Donec odio. Quisque volutpat
                mattis eros. Lorem ipsum dolor sit amet, consectetuer adipiscing
                elit. Donec odio. Quisque volutpat mattis eros.
              </div>
              {/* End .card-body */}
            </div>
            {/* End .collapse */}
          </div>
          {/* End .card */}
        </div>
        {/* End .accordion */}
      </div>
      {/* End .container */}
    </div>
    {/* End .page-content */}
    <div
      className="cta cta-display bg-image pt-4 pb-4"
      style={{ backgroundImage: "url(assets/images/backgrounds/cta/bg-7.jpg)" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-9 col-xl-7">
            <div className="row no-gutters flex-column flex-sm-row align-items-sm-center">
              <div className="col">
                <h3 className="cta-title text-white">
                  Nếu bạn có thêm câu hỏi
                </h3>
                {/* End .cta-title */}
                <p className="cta-desc text-white">
                  Gữi ngay cho chúng tôi
                </p>
                {/* End .cta-desc */}
              </div>
              {/* End .col */}
              <div className="col-auto">
                <a href="contact.html" className="btn btn-outline-white">
                  <span>LIÊN HỆ CHÚNG TÔI</span>
                  <i className="icon-long-arrow-right" />
                </a>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row no-gutters */}
          </div>
          {/* End .col-md-10 col-lg-9 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </div>
    {/* End .cta */}
  </main>
  {/* End .main */}
</>

     );
}

export default FAQ;