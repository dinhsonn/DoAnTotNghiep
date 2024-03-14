function ProductDetail() {
    return ( <>
        <main className="main">
          <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
            <div className="container d-flex align-items-center">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="index.html">Trang chủ</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Sản phẩm</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Chi tiết sản phẩm</a>
                </li>
            
              </ol>
              <nav className="product-pager ml-auto" aria-label="Product">
                <a
                  className="product-pager-link product-pager-prev"
                  href="#"
                  aria-label="Previous"
                  tabIndex={-1}
                >
                  <i className="icon-angle-left" />
                  <span>Prev</span>
                </a>
                <a
                  className="product-pager-link product-pager-next"
                  href="#"
                  aria-label="Next"
                  tabIndex={-1}
                >
                  <span>Next</span>
                  <i className="icon-angle-right" />
                </a>
              </nav>
              {/* End .pager-nav */}
            </div>
            {/* End .container */}
          </nav>
          {/* End .breadcrumb-nav */}
          <div className="page-content">
            <div className="container">
              <div className="row">
                <div className="col-lg-9">
                  <div className="product-details-top">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="product-gallery">
                          <figure className="product-main-image">
                            <span className="product-label label-top">Top</span>
                            <img
                              id="product-zoom"
                              src="assets/images/products/single/sidebar-gallery/1.jpg"
                              data-zoom-image="assets/images/products/single/sidebar-gallery/1-big.jpg"
                              alt="product image"
                            />
                            <a
                              href="#"
                              id="btn-product-gallery"
                              className="btn-product-gallery"
                            >
                              <i className="icon-arrows" />
                            </a>
                          </figure>
                          {/* End .product-main-image */}
                          <div
                            id="product-zoom-gallery"
                            className="product-image-gallery"
                          >
                            <a
                              className="product-gallery-item active"
                              href="#"
                              data-image="assets/images/products/single/sidebar-gallery/1.jpg"
                              data-zoom-image="assets/images/products/single/sidebar-gallery/1-big.jpg"
                            >
                              <img
                                src="assets/images/products/single/sidebar-gallery/1-small.jpg"
                                alt="product side"
                              />
                            </a>
                            <a
                              className="product-gallery-item"
                              href="#"
                              data-image="assets/images/products/single/sidebar-gallery/2.jpg"
                              data-zoom-image="assets/images/products/single/sidebar-gallery/2-big.jpg"
                            >
                              <img
                                src="assets/images/products/single/sidebar-gallery/2-small.jpg"
                                alt="product cross"
                              />
                            </a>
                            <a
                              className="product-gallery-item"
                              href="#"
                              data-image="assets/images/products/single/sidebar-gallery/3.jpg"
                              data-zoom-image="assets/images/products/single/sidebar-gallery/3-big.jpg"
                            >
                              <img
                                src="assets/images/products/single/sidebar-gallery/3-small.jpg"
                                alt="product with model"
                              />
                            </a>
                            <a
                              className="product-gallery-item"
                              href="#"
                              data-image="assets/images/products/single/sidebar-gallery/4.jpg"
                              data-zoom-image="assets/images/products/single/sidebar-gallery/4-big.jpg"
                            >
                              <img
                                src="assets/images/products/single/sidebar-gallery/4-small.jpg"
                                alt="product back"
                              />
                            </a>
                          </div>
                          {/* End .product-image-gallery */}
                        </div>
                        {/* End .product-gallery */}
                      </div>
                      {/* End .col-md-6 */}
                      <div className="col-md-6">
                        <div className="product-details product-details-sidebar">
                          <h1 className="product-title">
                            Black faux leather chain trim sandals
                          </h1>
                          {/* End .product-title */}
                          <div className="ratings-container">
                            <div className="ratings">
                              <div className="ratings-val" style={{ width: "80%" }} />
                              {/* End .ratings-val */}
                            </div>
                            {/* End .ratings */}
                            <a
                              className="ratings-text"
                              href="#product-review-link"
                              id="review-link"
                            >
                              ( 2 Đánh giá )
                            </a>
                          </div>
                          {/* End .rating-container */}
                          <div className="product-price">$90.00</div>
                          {/* End .product-price */}
                          <div className="product-content">
                            <p>
                              Sed egestas, ante et vulputate volutpat, eros semper
                              est, vitae luctus metus libero eu augue.
                            </p>
                          </div>
                          {/* End .product-content */}
                          <div className="details-filter-row details-row-size">
                            <label>Màu sắc:</label>
                            <div className="product-nav product-nav-dots">
                              <a
                                href="#"
                                className="active"
                                style={{ background: "#333333" }}
                              >
                                <span className="sr-only">Color name</span>
                              </a>
                              <a href="#" style={{ background: "#efe7db" }}>
                                <span className="sr-only">Color name</span>
                              </a>
                            </div>
                            {/* End .product-nav */}
                          </div>
                          {/* End .details-filter-row */}
                          <div className="details-filter-row details-row-size">
                            <label htmlFor="size">Size:</label>
                            <div className="select-custom">
                              <select name="size" id="size" className="form-control">
                                <option value="#" selected="selected">
                                  Select a size
                                </option>
                                <option value="s">Small</option>
                                <option value="m">Medium</option>
                                <option value="l">Large</option>
                                <option value="xl">Extra Large</option>
                              </select>
                            </div>
                            {/* End .select-custom */}
                            <a href="#" className="size-guide">
                              <i className="icon-th-list" />
                              size guide
                            </a>
                          </div>
                          {/* End .details-filter-row */}
                          <div className="product-details-action">
                            <div className="details-action-col">
                              <label htmlFor="qty">Số lượng:</label>
                              <div className="product-details-quantity">
                                <input
                                  type="number"
                                  id="qty"
                                  className="form-control"
                                  defaultValue={1}
                                  min={1}
                                  max={10}
                                  step={1}
                                  data-decimals={0}
                                  required=""
                                />
                              </div>
                              {/* End .product-details-quantity */}
                              <a href="#" className="btn-product btn-cart">
                                <span>THÊM VÀO GIỎ HÀNG</span>
                              </a>
                            </div>
                            {/* End .details-action-col */}
                            <div className="details-action-wrapper">
                              <a
                                href="#"
                                className="btn-product btn-wishlist"
                                title="Wishlist"
                              >
                                <span>Thêm vào yêu thích</span>
                              </a>
                              <a
                                href="#"
                                className="btn-product btn-compare"
                                title="Compare"
                              >
                                <span>Thêm vào so sánh</span>
                              </a>
                            </div>
                            {/* End .details-action-wrapper */}
                          </div>
                          {/* End .product-details-action */}
                          <div className="product-details-footer details-footer-col">
                            <div className="product-cat">
                              <span>Danh mục:</span>
                              <a href="#">Women</a>,<a href="#">Dresses</a>,
                              <a href="#">Yellow</a>
                            </div>
                            {/* End .product-cat */}
                            <div className="social-icons social-icons-sm">
                              <span className="social-label">Chia sẽ:</span>
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
                              <a
                                href="#"
                                className="social-icon"
                                title="Pinterest"
                                target="_blank"
                              >
                                <i className="icon-pinterest" />
                              </a>
                            </div>
                          </div>
                          {/* End .product-details-footer */}
                        </div>
                        {/* End .product-details */}
                      </div>
                      {/* End .col-md-6 */}
                    </div>
                    {/* End .row */}
                  </div>
                  {/* End .product-details-top */}
                  <div className="product-details-tab">
                    <ul
                      className="nav nav-pills justify-content-center"
                      role="tablist"
                    >
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          id="product-desc-link"
                          data-toggle="tab"
                          href="#product-desc-tab"
                          role="tab"
                          aria-controls="product-desc-tab"
                          aria-selected="true"
                        >
                          Mô tả sản phẩm
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="product-info-link"
                          data-toggle="tab"
                          href="#product-info-tab"
                          role="tab"
                          aria-controls="product-info-tab"
                          aria-selected="false"
                        >
                          Thông tin chi tiết
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="product-shipping-link"
                          data-toggle="tab"
                          href="#product-shipping-tab"
                          role="tab"
                          aria-controls="product-shipping-tab"
                          aria-selected="false"
                        >
                          Vận chuyển &amp; Đổi trả
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          id="product-review-link"
                          data-toggle="tab"
                          href="#product-review-tab"
                          role="tab"
                          aria-controls="product-review-tab"
                          aria-selected="false"
                        >
                          Đánh giá (2)
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="product-desc-tab"
                        role="tabpanel"
                        aria-labelledby="product-desc-link"
                      >
                        <div className="product-desc-content">
                          <h3>Thông tin sản phẩm</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                            erat ut turpis. Suspendisse urna viverra non, semper
                            suscipit, posuere a, pede. Donec nec justo eget felis
                            facilisis fermentum. Aliquam porttitor mauris sit amet
                            orci. Aenean dignissim pellentesque felis. Phasellus
                            ultrices nulla quis nibh. Quisque a lectus. Donec
                            consectetuer ligula vulputate sem tristique cursus.{" "}
                          </p>
                          <ul>
                            <li>
                              Nunc nec porttitor turpis. In eu risus enim. In vitae
                              mollis elit.{" "}
                            </li>
                            <li>Vivamus finibus vel mauris ut vehicula.</li>
                            <li>
                              Nullam a magna porttitor, dictum risus nec, faucibus
                              sapien.
                            </li>
                          </ul>
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                            erat ut turpis. Suspendisse urna viverra non, semper
                            suscipit, posuere a, pede. Donec nec justo eget felis
                            facilisis fermentum. Aliquam porttitor mauris sit amet
                            orci. Aenean dignissim pellentesque felis. Phasellus
                            ultrices nulla quis nibh. Quisque a lectus. Donec
                            consectetuer ligula vulputate sem tristique cursus.{" "}
                          </p>
                        </div>
                        {/* End .product-desc-content */}
                      </div>
                      {/* .End .tab-pane */}
                      <div
                        className="tab-pane fade"
                        id="product-info-tab"
                        role="tabpanel"
                        aria-labelledby="product-info-link"
                      >
                        <div className="product-desc-content">
                          <h3>Thông tin</h3>
                          <p>
                            Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                            Donec odio. Quisque volutpat mattis eros. Nullam malesuada
                            erat ut turpis. Suspendisse urna viverra non, semper
                            suscipit, posuere a, pede. Donec nec justo eget felis
                            facilisis fermentum. Aliquam porttitor mauris sit amet
                            orci.{" "}
                          </p>
                          <h3>Fabric &amp; care</h3>
                          <ul>
                            <li>Faux suede fabric</li>
                            <li>Gold tone metal hoop handles.</li>
                            <li>RI branding</li>
                            <li>Snake print trim interior </li>
                            <li>Adjustable cross body strap</li>
                            <li>
                              {" "}
                              Height: 31cm; Width: 32cm; Depth: 12cm; Handle Drop:
                              61cm
                            </li>
                          </ul>
                          <h3>Size</h3>
                          <p>one size</p>
                        </div>
                        {/* End .product-desc-content */}
                      </div>
                      {/* .End .tab-pane */}
                      <div
                        className="tab-pane fade"
                        id="product-shipping-tab"
                        role="tabpanel"
                        aria-labelledby="product-shipping-link"
                      >
                        <div className="product-desc-content">
                          <h3>Delivery &amp; returns</h3>
                          <p>
                            We deliver to over 100 countries around the world. For
                            full details of the delivery options we offer, please view
                            our <a href="#">Delivery information</a>
                            <br />
                            We hope you’ll love every purchase, but if you ever need
                            to return an item you can do so within a month of receipt.
                            For full details of how to make a return, please view our{" "}
                            <a href="#">Returns information</a>
                          </p>
                        </div>
                        {/* End .product-desc-content */}
                      </div>
                      {/* .End .tab-pane */}
                      <div
                        className="tab-pane fade"
                        id="product-review-tab"
                        role="tabpanel"
                        aria-labelledby="product-review-link"
                      >
                        <div className="reviews">
                          <h3>Reviews (2)</h3>
                          <div className="review">
                            <div className="row no-gutters">
                              <div className="col-auto">
                                <h4>
                                  <a href="#">Samanta J.</a>
                                </h4>
                                <div className="ratings-container">
                                  <div className="ratings">
                                    <div
                                      className="ratings-val"
                                      style={{ width: "80%" }}
                                    />
                                    {/* End .ratings-val */}
                                  </div>
                                  {/* End .ratings */}
                                </div>
                                {/* End .rating-container */}
                                <span className="review-date">6 days ago</span>
                              </div>
                              {/* End .col */}
                              <div className="col">
                                <h4>Good, perfect size</h4>
                                <div className="review-content">
                                  <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Ducimus cum dolores assumenda
                                    asperiores facilis porro reprehenderit animi culpa
                                    atque blanditiis commodi perspiciatis doloremque,
                                    possimus, explicabo, autem fugit beatae quae
                                    voluptas!
                                  </p>
                                </div>
                                {/* End .review-content */}
                                <div className="review-action">
                                  <a href="#">
                                    <i className="icon-thumbs-up" />
                                    Helpful (2)
                                  </a>
                                  <a href="#">
                                    <i className="icon-thumbs-down" />
                                    Unhelpful (0)
                                  </a>
                                </div>
                                {/* End .review-action */}
                              </div>
                              {/* End .col-auto */}
                            </div>
                            {/* End .row */}
                          </div>
                          {/* End .review */}
                          <div className="review">
                            <div className="row no-gutters">
                              <div className="col-auto">
                                <h4>
                                  <a href="#">John Doe</a>
                                </h4>
                                <div className="ratings-container">
                                  <div className="ratings">
                                    <div
                                      className="ratings-val"
                                      style={{ width: "100%" }}
                                    />
                                    {/* End .ratings-val */}
                                  </div>
                                  {/* End .ratings */}
                                </div>
                                {/* End .rating-container */}
                                <span className="review-date">5 days ago</span>
                              </div>
                              {/* End .col */}
                              <div className="col">
                                <h4>Very good</h4>
                                <div className="review-content">
                                  <p>
                                    Sed, molestias, tempore? Ex dolor esse iure hic
                                    veniam laborum blanditiis laudantium iste amet.
                                    Cum non voluptate eos enim, ab cumque nam, modi,
                                    quas iure illum repellendus, blanditiis
                                    perspiciatis beatae!
                                  </p>
                                </div>
                                {/* End .review-content */}
                                <div className="review-action">
                                  <a href="#">
                                    <i className="icon-thumbs-up" />
                                    Helpful (0)
                                  </a>
                                  <a href="#">
                                    <i className="icon-thumbs-down" />
                                    Unhelpful (0)
                                  </a>
                                </div>
                                {/* End .review-action */}
                              </div>
                              {/* End .col-auto */}
                            </div>
                            {/* End .row */}
                          </div>
                          {/* End .review */}
                        </div>
                        {/* End .reviews */}
                      </div>
                      {/* .End .tab-pane */}
                    </div>
      {/* End .comments */}
      <div className="reply" style={{marginTop:"10px"}}>
        <div className="heading">
          <h3 className="title">Đánh giá sản phẩm</h3>
          {/* End .title */}
          <p className="title-desc">
            Your email address will not be published. Required fields are marked
            *
          </p>
        </div>
        {/* End .heading */}
        <form action="#">
          <label htmlFor="reply-message" className="sr-only">
            Comment
          </label>
          <textarea
            name="reply-message"
            id="reply-message"
            cols={30}
            rows={4}
            className="form-control"
            required=""
            placeholder="Comment *"
            defaultValue={""}
          />
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="reply-name" className="sr-only">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="reply-name"
                name="reply-name"
                required=""
                placeholder="Name *"
              />
            </div>
            {/* End .col-md-6 */}
            <div className="col-md-6">
              <label htmlFor="reply-email" className="sr-only">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="reply-email"
                name="reply-email"
                required=""
                placeholder="Email *"
              />
            </div>
            {/* End .col-md-6 */}
          </div>
          {/* End .row */}
          <button type="submit" className="btn btn-outline-primary-2">
            <span>BÌNH LUẬN</span>
            <i className="icon-long-arrow-right" />
          </button>
        </form>
      </div>
                    {/* End .tab-content */}
                  </div>
                  
                  {/* End .product-details-tab */}
                  <h2 className="title text-center mb-4">Bạn cũng có thể thích</h2>
                  {/* End .title text-center */}
                  <div
                    className="owl-carousel owl-simple carousel-equal-height carousel-with-shadow"
                    data-toggle="owl"
                    data-owl-options='{
                                    "nav": false, 
                                    "dots": true,
                                    "margin": 20,
                                    "loop": false,
                                    "responsive": {
                                        "0": {
                                            "items":1
                                        },
                                        "480": {
                                            "items":2
                                        },
                                        "768": {
                                            "items":3
                                        },
                                        "992": {
                                            "items":4
                                        },
                                        "1200": {
                                            "items":4,
                                            "nav": true,
                                            "dots": false
                                        }
                                    }
                                }'
                  >
                    <div className="product product-7 text-center">
                      <figure className="product-media">
                        <span className="product-label label-new">New</span>
                        <a href="product.html">
                          <img
                            src="assets/images/products/product-4.jpg"
                            alt="Product image"
                            className="product-image"
                          />
                        </a>
                        <div className="product-action-vertical">
                          <a
                            href="#"
                            className="btn-product-icon btn-wishlist btn-expandable"
                          >
                            <span>add to wishlist</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product-icon btn-quickview"
                            title="Quick view"
                          >
                            <span>Quick view</span>
                          </a>
                          <a
                            href="#"
                            className="btn-product-icon btn-compare"
                            title="Compare"
                          >
                            <span>Compare</span>
                          </a>
                        </div>
                        {/* End .product-action-vertical */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Women</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">Brown paperbag waist pencil skirt</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$60.00</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div className="ratings-val" style={{ width: "20%" }} />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 2 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#cc9966" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#7fc5ed" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#e8c97a" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-7 text-center">
                      <figure className="product-media">
                        <span className="product-label label-out">Out of Stock</span>
                        <a href="product.html">
                          <img
                            src="assets/images/products/product-6.jpg"
                            alt="Product image"
                            className="product-image"
                          />
                        </a>
                        <div className="product-action-vertical">
                          <a
                            href="#"
                            className="btn-product-icon btn-wishlist btn-expandable"
                          >
                            <span>add to wishlist</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product-icon btn-quickview"
                            title="Quick view"
                          >
                            <span>Quick view</span>
                          </a>
                          <a
                            href="#"
                            className="btn-product-icon btn-compare"
                            title="Compare"
                          >
                            <span>Compare</span>
                          </a>
                        </div>
                        {/* End .product-action-vertical */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Jackets</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">Khaki utility boiler jumpsuit</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">
                          <span className="out-price">$120.00</span>
                        </div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div className="ratings-val" style={{ width: "80%" }} />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 6 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-7 text-center">
                      <figure className="product-media">
                        <span className="product-label label-top">Top</span>
                        <a href="product.html">
                          <img
                            src="assets/images/products/product-11.jpg"
                            alt="Product image"
                            className="product-image"
                          />
                        </a>
                        <div className="product-action-vertical">
                          <a
                            href="#"
                            className="btn-product-icon btn-wishlist btn-expandable"
                          >
                            <span>add to wishlist</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product-icon btn-quickview"
                            title="Quick view"
                          >
                            <span>Quick view</span>
                          </a>
                          <a
                            href="#"
                            className="btn-product-icon btn-compare"
                            title="Compare"
                          >
                            <span>Compare</span>
                          </a>
                        </div>
                        {/* End .product-action-vertical */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Shoes</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Light brown studded Wide fit wedges
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$110.00</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div className="ratings-val" style={{ width: "80%" }} />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 1 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#8b513d" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#333333" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#d2b99a" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-7 text-center">
                      <figure className="product-media">
                        <a href="product.html">
                          <img
                            src="assets/images/products/product-10.jpg"
                            alt="Product image"
                            className="product-image"
                          />
                        </a>
                        <div className="product-action-vertical">
                          <a
                            href="#"
                            className="btn-product-icon btn-wishlist btn-expandable"
                          >
                            <span>add to wishlist</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product-icon btn-quickview"
                            title="Quick view"
                          >
                            <span>Quick view</span>
                          </a>
                          <a
                            href="#"
                            className="btn-product-icon btn-compare"
                            title="Compare"
                          >
                            <span>Compare</span>
                          </a>
                        </div>
                        {/* End .product-action-vertical */}
                        <div className="product-action">
                          <a href="#" className="btn-product btn-cart">
                            <span>add to cart</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Jumpers</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">Yellow button front tea top</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$56.00</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div className="ratings-val" style={{ width: "0%" }} />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 0 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .owl-carousel */}
                </div>
                {/* End .col-lg-9 */}
                <aside className="col-lg-3">
                  <div className="sidebar sidebar-product">
                    <div className="widget widget-products">
                      <h4 className="widget-title">Sản phẩm liên quan</h4>
                      {/* End .widget-title */}
                      <div className="products">
                        <div className="product product-sm">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/products/single/sidebar/1.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                            </a>
                          </figure>
                          <div className="product-body">
                            <h5 className="product-title">
                              <a href="product.html">
                                Light brown studded Wide fit wedges
                              </a>
                            </h5>
                            {/* End .product-title */}
                            <div className="product-price">
                              <span className="new-price">$50.00</span>
                              <span className="old-price">$110.00</span>
                            </div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                        </div>
                        {/* End .product product-sm */}
                        <div className="product product-sm">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/products/single/sidebar/2.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                            </a>
                          </figure>
                          <div className="product-body">
                            <h5 className="product-title">
                              <a href="product.html">Yellow button front tea top</a>
                            </h5>
                            {/* End .product-title */}
                            <div className="product-price">$56.00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                        </div>
                        {/* End .product product-sm */}
                        <div className="product product-sm">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/products/single/sidebar/3.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                            </a>
                          </figure>
                          <div className="product-body">
                            <h5 className="product-title">
                              <a href="product.html">Beige metal hoop tote bag</a>
                            </h5>
                            {/* End .product-title */}
                            <div className="product-price">$50.00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                        </div>
                        {/* End .product product-sm */}
                        <div className="product product-sm">
                          <figure className="product-media">
                            <a href="product.html">
                              <img
                                src="assets/images/products/single/sidebar/4.jpg"
                                alt="Product image"
                                className="product-image"
                              />
                            </a>
                          </figure>
                          <div className="product-body">
                            <h5 className="product-title">
                              <a href="product.html">
                                Black soft RI weekend travel bag
                              </a>
                            </h5>
                            {/* End .product-title */}
                            <div className="product-price">$75.00</div>
                            {/* End .product-price */}
                          </div>
                          {/* End .product-body */}
                        </div>
                        {/* End .product product-sm */}
                      </div>
                      {/* End .products */}
                      <a href="category.html" className="btn btn-outline-dark-3">
                        <span>XEM NHIỀU HƠN</span>
                        <i className="icon-long-arrow-right" />
                      </a>
                    </div>
                    {/* End .widget widget-products */}
                    <div className="widget widget-banner-sidebar">
                      <div className="banner-sidebar-title">ad box 280 x 280</div>
                      {/* End .ad-title */}
                      <div className="banner-sidebar banner-overlay">
                        <a href="#">
                          <img
                            src="assets/images/blog/sidebar/banner.jpg"
                            alt="banner"
                          />
                        </a>
                      </div>
                      {/* End .banner-ad */}
                    </div>
                    {/* End .widget */}
                  </div>
                  {/* End .sidebar sidebar-product */}
                </aside>
                {/* End .col-lg-3 */}
              </div>
              
              {/* End .row */}
            </div>
            
            {/* End .container */}
          </div>   
          {/* End .page-content */}
        </main>
        {/* End .main */}
      </>
       );
}

export default ProductDetail;