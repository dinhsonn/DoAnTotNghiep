import AboutService from "../../../services/AboutServices";
import { useEffect, useState } from "react";

function About() {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
      AboutService.getAll()
          .then(response => {
              setAbouts(response.data.content);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, []);
    return (
        <>
  <main className="main">
    <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Trang chủ</a>
          </li>
          {/* <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li> */}
          <li className="breadcrumb-item active" aria-current="page">
            Về chúng tôi
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="container">
      <div
        className="page-header page-header-big text-center"
        style={{ backgroundImage: 'url("assets/images/about-header-bg.jpg")' }}
      >
        <h1 className="page-title text-white">
          Về chúng tôi<span className="text-white">Who we are</span>
        </h1> 
      </div>
      {/* End .page-header */}
    </div>
    {/* End .container */}
    {abouts.map((about, index) => (

    <div className="page-content pb-0">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-3 mb-lg-0">
            <h2 className="title">{about.title}</h2>
            {/* End .title */}
            <p>
            {about.content}
            </p>
          </div>
          {/* End .col-lg-6 */}
          <div className="col-lg-6">
            <h2 className="title">Nhiệm vụ của chúng tôi</h2>
            {/* End .title */}
            <p>
              Sed egestas, ante et vulputate volutpat, eros pede semper est,
              vitae luctus metus libero eu augue. Morbi purus libero, faucibus
              adipiscing, commodo quis, gravida id, est. Sed lectus. <br />
              Praesent elementum hendrerit tortor. Sed semper lorem at felis.{" "}
            </p>
          </div>
          {/* End .col-lg-6 */}
        </div>
        {/* End .row */}
        <div className="mb-5" />
        {/* End .mb-4 */}
      </div>
      {/* End .container */}
      <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 mb-3 mb-lg-0">
              <h2 className="title">Who We Are</h2>
              {/* End .title */}
              <p className="lead text-primary mb-3">
                Pellentesque odio nisi, euismod pharetra a ultricies <br />
                in diam. Sed arcu. Cras consequat
              </p>
              {/* End .lead text-primary */}
              <p className="mb-2">
                Sed pretium, ligula sollicitudin laoreet viverra, tortor libero
                sodales leo, eget blandit nunc tortor eu nibh. Suspendisse
                potenti. Sed egestas, ante et vulputate volutpat, uctus metus
                libero eu augue.{" "}
              </p>
              <a
                href="blog.html"
                className="btn btn-sm btn-minwidth btn-outline-primary-2"
              >
                <span>XEM TIN TỨC CỦA CHÚNG TÔI</span>
                <i className="icon-long-arrow-right" />
              </a>
            </div>
            {/* End .col-lg-5 */}
            <div className="col-lg-6 offset-lg-1">
              <div className="about-images">
                <img
                  src="assets/images/about/img-1.jpg"
                  alt=""
                  className="about-img-front"
                />
                <img
                  src="assets/images/about/img-2.jpg"
                  alt=""
                  className="about-img-back"
                />
              </div>
              {/* End .about-images */}
            </div>
            {/* End .col-lg-6 */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </div>
      {/* End .bg-light-2 pt-6 pb-6 */}
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="brands-text">
              <h2 className="title">
                Các thương hiệu điện tử cao cấp của thế giới tại nơi đây.
              </h2>
              {/* End .title */}
              <p>
                Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
                neque, aliquet vel, dapibus id, mattis vel, nis
              </p>
            </div>
            {/* End .brands-text */}
          </div>
          {/* End .col-lg-5 */}
          <div className="col-lg-7">
            <div className="brands-display">
              <div className="row justify-content-center">
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/1.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/2.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/3.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/4.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/5.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/6.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/7.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/8.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
                <div className="col-6 col-sm-4">
                  <a href="#" className="brand">
                    <img src="assets/images/brands/9.png" alt="Brand Name" />
                  </a>
                </div>
                {/* End .col-sm-4 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .brands-display */}
          </div>
          {/* End .col-lg-7 */}
        </div>
        {/* End .row */}
        <hr className="mt-4 mb-6" />
        <h2 className="title text-center mb-4">Gặp gỡ đội ngũ</h2>
        {/* End .title text-center mb-2 */}
        <div className="row">
          <div className="col-md-4">
            <div className="member member-anim text-center">
              <figure className="member-media">
                <img src="assets/images/team/member-1.jpg" alt="member photo" />
                <figcaption className="member-overlay">
                  <div className="member-overlay-content">
                    <h3 className="member-title">
                      Samanta Grey<span>Founder &amp; CEO</span>
                    </h3>
                    {/* End .member-title */}
                    <p>
                      Sed pretium, ligula sollicitudin viverra, tortor libero
                      sodales leo, eget blandit nunc.
                    </p>
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </div>
                  {/* End .member-overlay-content */}
                </figcaption>
                {/* End .member-overlay */}
              </figure>
              {/* End .member-media */}
              <div className="member-content">
                <h3 className="member-title">
                  Samanta Grey<span>Founder &amp; CEO</span>
                </h3>
                {/* End .member-title */}
              </div>
              {/* End .member-content */}
            </div>
            {/* End .member */}
          </div>
          {/* End .col-md-4 */}
          <div className="col-md-4">
            <div className="member member-anim text-center">
              <figure className="member-media">
                <img src="assets/images/team/member-2.jpg" alt="member photo" />
                <figcaption className="member-overlay">
                  <div className="member-overlay-content">
                    <h3 className="member-title">
                      Bruce Sutton<span>Sales &amp; Marketing Manager</span>
                    </h3>
                    {/* End .member-title */}
                    <p>
                      Sed pretium, ligula sollicitudin viverra, tortor libero
                      sodales leo, eget blandit nunc.
                    </p>
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </div>
                  {/* End .member-overlay-content */}
                </figcaption>
                {/* End .member-overlay */}
              </figure>
              {/* End .member-media */}
              <div className="member-content">
                <h3 className="member-title">
                  Bruce Sutton<span>Sales &amp; Marketing Manager</span>
                </h3>
                {/* End .member-title */}
              </div>
              {/* End .member-content */}
            </div>
            {/* End .member */}
          </div>
          {/* End .col-md-4 */}
          <div className="col-md-4">
            <div className="member member-anim text-center">
              <figure className="member-media">
                <img src="assets/images/team/member-3.jpg" alt="member photo" />
                <figcaption className="member-overlay">
                  <div className="member-overlay-content">
                    <h3 className="member-title">
                      Janet Joy<span>Product Manager</span>
                    </h3>
                    {/* End .member-title */}
                    <p>
                      Sed pretium, ligula sollicitudin viverra, tortor libero
                      sodales leo, eget blandit nunc.
                    </p>
                    <div className="social-icons social-icons-simple">
                      <a
                        href="#"
                        className="social-icon"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </div>
                  {/* End .member-overlay-content */}
                </figcaption>
                {/* End .member-overlay */}
              </figure>
              {/* End .member-media */}
              <div className="member-content">
                <h3 className="member-title">
                  Janet Joy<span>Product Manager</span>
                </h3>
                {/* End .member-title */}
              </div>
              {/* End .member-content */}
            </div>
            {/* End .member */}
          </div>
          {/* End .col-md-4 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
      <div className="mb-2" />
      {/* End .mb-2 */}
      <div className="about-testimonials bg-light-2 pt-6 pb-6">
        <div className="container">
          <h2 className="title text-center mb-3">Khách hàng nói gì về chúng tôi</h2>
          {/* End .title text-center */}
          <div
            className="owl-carousel owl-simple owl-testimonials-photo"
            data-toggle="owl"
            data-owl-options='{
                          "nav": false, 
                          "dots": true,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "1200": {
                                  "nav": true
                              }
                          }
                      }'
          >
            <blockquote className="testimonial text-center">
              <img src="assets/images/testimonials/user-1.jpg" alt="user" />
              <p>
                “ Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                Pellentesque aliquet nibh nec urna. <br />
                In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed
                pretium, ligula sollicitudin laoreet viverra, tortor libero
                sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut
                justo. Suspendisse potenti. ”
              </p>
              <cite>
                Jenson Gregory
                <span>Customer</span>
              </cite>
            </blockquote>
            {/* End .testimonial */}
            <blockquote className="testimonial text-center">
              <img src="assets/images/testimonials/user-2.jpg" alt="user" />
              <p>
                “ Impedit, ratione sequi, sunt incidunt magnam et. Delectus
                obcaecati optio eius error libero perferendis nesciunt atque
                dolores magni recusandae! Doloremque quidem error eum quis
                similique doloribus natus qui ut ipsum.Velit quos ipsa
                exercitationem, vel unde obcaecati impedit eveniet non. ”
              </p>
              <cite>
                Victoria Ventura
                <span>Customer</span>
              </cite>
            </blockquote>
            {/* End .testimonial */}
          </div>
          {/* End .testimonials-slider owl-carousel */}
        </div>
        {/* End .container */}
      </div>
      {/* End .bg-light-2 pt-5 pb-6 */}
    </div>
                            ))}

    {/* End .page-content */}
  </main>
  {/* End .main */}
</>

      );
}

export default About;