import { useEffect, useState } from "react";
import Banner from "./Banner";
import Slider from "./Slider";
import ProductServices from "../../../services/ProductServices";
import ProductItem3 from "../Product/ProductItem3";
import Brand from "./Brand";
import ProductItemSale from "../Product/ProductItemSale";

function Home() {
  const [products, setProducts] = useState([]);
  const [productsales, setProductSales] = useState([]);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, productsaleResponse, productImagesResponse] =
          await Promise.all([
            ProductServices.getAll(),
            ProductServices.getProductSale(),
            ProductServices.getProductImage(),
          ]);
        const productsData = productsResponse.data.content;
        const productsaleData = productsaleResponse.data.content;
        const productImagesData = productImagesResponse.data.content;
        setProducts(productsData);
        setProductSales(productsaleData);
        setProductImages(productImagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const combinedData = products.map((product) => {
    const correspondingImages = productImages.filter(
      (image) => image.productId.id === product.id && image.sortOrder === 1
    );

    const imageUrls = correspondingImages.map((image) => image.image);

    return {
      ...product,
      image: imageUrls.length > 0 ? imageUrls[0] : null,
    };
  });
  const combinedDataSale = productsales.map((product) => {
    const correspondingImages = productImages.filter(
      (image) => image.productId.id === product.productId.id && image.sortOrder === 1
    );

    const imageUrls = correspondingImages.map((image) => image.image);

    return {
      ...product,
      image: imageUrls.length > 0 ? imageUrls[0] : null,
    };
  });

  return (
    <>
      <main className="main">
        <div className="intro-section pt-3 pb-3 mb-2">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <Slider />
                {/* End .intro-slider-container */}
              </div>
              {/* End .col-lg-8 */}
              <Banner />
              {/* End .col-lg-4 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .intro-section */}
        <div className="container featured">
          <ul
            className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
            role="tablist"
          >
            <li className="nav-item">
              <a
                className="nav-link active"
                id="products-featured-link"
                data-toggle="tab"
                href="#products-featured-tab"
                role="tab"
                aria-controls="products-featured-tab"
                aria-selected="true"
              >
                Nổi bật
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="products-sale-link"
                data-toggle="tab"
                href="#products-sale-tab"
                role="tab"
                aria-controls="products-sale-tab"
                aria-selected="false"
              >
                Đang giảm giá
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                id="products-top-link"
                data-toggle="tab"
                href="#products-top-tab"
                role="tab"
                aria-controls="products-top-tab"
                aria-selected="false"
              >
                Hàng đầu
              </a>
            </li>
          </ul>
          <div className="tab-content tab-content-carousel">
            <div
              className="tab-pane p-0 fade show active"
              id="products-featured-tab"
              role="tabpanel"
              aria-labelledby="products-featured-link"
            >
              <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow">
                <div className="row">
                  {combinedData.map((combinedItem, index) => (
                    <ProductItem3 product={combinedItem} key={index} />
                  ))}
                </div>
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
            <div
              className="tab-pane p-0 fade"
              id="products-sale-tab"
              role="tabpanel"
              aria-labelledby="products-sale-link"
            >
              <div className="owl-carousel owl-full carousel-equal-height carousel-with-shadow">
                <div className="row">
                  {combinedDataSale.map((combinedItem, index) => (
                    <ProductItemSale product={combinedItem} key={index} />
                  ))}
                </div>
                {/* End .product */}
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
            <div
              className="tab-pane p-0 fade"
              id="products-top-tab"
              role="tabpanel"
              aria-labelledby="products-top-link"
            >
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                          "nav": true, 
                          "dots": true,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "0": {
                                  "items":2
                              },
                              "600": {
                                  "items":2
                              },
                              "992": {
                                  "items":3
                              },
                              "1200": {
                                  "items":4
                              }
                          }
                      }'
              >
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-3.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">Lenovo - 330-15IKBR 15.6"</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">
                      <span className="out-price">$339.99</span>
                      <span className="out-text">Out of Stock</span>
                    </div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 3 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-1.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Cameras &amp; Camcorders</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        GoPro - HERO7 Black HD Waterproof Action
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$349.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 2 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-4.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Digital Cameras</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Sony - Alpha a5100 Mirrorless Camera
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$499.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "70%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 11 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-new">
                      New
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-2.jpg"
                        alt="Product image"
                        className="product-image"
                      />
                      <img
                        src="assets/images/demos/demo-3/products/product-2-2.jpg"
                        alt="Product image"
                        className="product-image-hover"
                      />
                    </a>
                    <div className="product-action-vertical">
                      <a
                        href="#"
                        className="btn-product-icon btn-wishlist btn-expandable"
                      >
                        <span>add to wishlist</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Smartwatches</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Apple - Apple Watch Series 3 with White Sport Band
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$214.99</div>
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
                    <div className="product-nav product-nav-dots">
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#e2e2e2" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#333333" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#f2bc9e" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-1.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Cameras &amp; Camcorders</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        GoPro - HERO7 Black HD Waterproof Action
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$349.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 2 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
        </div>
        {/* End .container */}
        <div className="mb-7 mb-lg-11" />
        {/* End .mb-7 */}
        <div className="container">
          <div
            className="cta cta-border cta-border-image mb-5 mb-lg-7"
            style={{
              backgroundImage: "url(assets/images/demos/demo-3/bg-1.jpg)",
            }}
          >
            <div className="cta-border-wrapper bg-white">
              <div className="row justify-content-center">
                <div className="col-md-11 col-xl-11">
                  <div className="cta-content">
                    <div className="cta-heading">
                      <h3 className="cta-title text-right">
                        <span className="text-primary">Ưu đãi mới</span> <br />
                        Bắt đầu 12h mỗi ngày.
                      </h3>
                      {/* End .cta-title */}
                    </div>
                    {/* End .cta-heading */}
                    <div className="cta-text">
                      <p>
                        Nhận{" "}
                        <span className="text-dark font-weight-normal">
                          MIỄN PHÍ VẬN CHUYỂN* &amp; Ưu đãi 5%
                        </span>{" "}
                        khi <br />
                        mọi đơn hàng với chương trình phần thưởng.
                      </p>
                    </div>
                    {/* End .cta-text */}
                    <a href="#" className="btn btn-primary btn-round">
                      <span>Add to Cart for $50.00/yr</span>
                      <i className="icon-long-arrow-right" />
                    </a>
                  </div>
                  {/* End .cta-content */}
                </div>
                {/* End .col-xl-7 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .bg-white */}
          </div>
          {/* End .cta */}
        </div>
        {/* End .container */}
        <div className="bg-light deal-container pt-7 pb-7 mb-5">
          <div className="container">
            <div className="heading text-center mb-4">
              <h2 className="title">Ưu đãi &amp; Siêu ưu đãi</h2>
              {/* End .title */}
              <p className="title-desc">Ưu đãi hôm nay và hơn thế nữa</p>
              {/* End .title-desc */}
            </div>
            {/* End .heading */}
            <div className="row">
              <div className="col-lg-6 deal-col">
                <div
                  className="deal"
                  style={{
                    backgroundImage:
                      'url("assets/images/demos/demo-3/deal/bg-1.jpg")',
                  }}
                >
                  <div className="deal-top">
                    <h2>Ưu đãi trong ngày.</h2>
                    <h4>Số lượng có hạn. </h4>
                  </div>
                  {/* End .deal-top */}
                  <div className="deal-content">
                    <h3 className="product-title">
                      <a href="product.html">
                        Home Smart Speaker with Google Assistant
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">
                      <span className="new-price">$129.00</span>
                      <span className="old-price">Was $150.99</span>
                    </div>
                    {/* End .product-price */}
                    <a href="product.html" className="btn btn-link">
                      <span>Shop Now</span>
                      <i className="icon-long-arrow-right" />
                    </a>
                  </div>
                  {/* End .deal-content */}
                  <div className="deal-bottom">
                    <div className="deal-countdown" data-until="+10h" />
                    {/* End .deal-countdown */}
                  </div>
                  {/* End .deal-bottom */}
                </div>
                {/* End .deal */}
              </div>
              {/* End .col-lg-6 */}
              <div className="col-lg-6">
                <div className="products">
                  <div className="row">
                    <div className="col-6">
                      <div className="product product-2">
                        <figure className="product-media">
                          <span className="product-label label-circle label-top">
                            Top
                          </span>
                          <span className="product-label label-circle label-sale">
                            Sale
                          </span>
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-3/products/product-5.jpg"
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
                          </div>
                          {/* End .product-action */}
                          <div className="product-action product-action-dark">
                            <a
                              href="#"
                              className="btn-product btn-cart"
                              title="Add to cart"
                            >
                              <span>add to cart</span>
                            </a>
                            <a
                              href="popup/quickView.html"
                              className="btn-product btn-quickview"
                              title="Quick view"
                            >
                              <span>quick view</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Digital Cameras</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">
                              Canon - EOS 5D Mark IV DSLR Camera
                            </a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">
                            <span className="new-price">$3,599.99</span>
                            <span className="old-price">Was $3,999.99</span>
                          </div>
                          {/* End .product-price */}
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{ width: "80%" }}
                              />
                              {/* End .ratings-val */}
                            </div>
                            {/* End .ratings */}
                            <span className="ratings-text">( 5 Reviews )</span>
                          </div>
                          {/* End .rating-container */}
                        </div>
                        {/* End .product-body */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 */}
                    <div className="col-6">
                      <div className="product product-2">
                        <figure className="product-media">
                          <span className="product-label label-circle label-sale">
                            Sale
                          </span>
                          <a href="product.html">
                            <img
                              src="assets/images/demos/demo-3/products/product-6.jpg"
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
                          </div>
                          {/* End .product-action */}
                          <div className="product-action product-action-dark">
                            <a
                              href="#"
                              className="btn-product btn-cart"
                              title="Add to cart"
                            >
                              <span>add to cart</span>
                            </a>
                            <a
                              href="popup/quickView.html"
                              className="btn-product btn-quickview"
                              title="Quick view"
                            >
                              <span>quick view</span>
                            </a>
                          </div>
                          {/* End .product-action */}
                        </figure>
                        {/* End .product-media */}
                        <div className="product-body">
                          <div className="product-cat">
                            <a href="#">Computers &amp; Tablets</a>
                          </div>
                          {/* End .product-cat */}
                          <h3 className="product-title">
                            <a href="product.html">
                              Apple - Smart Keyboard Folio for 11-inch iPad Pro
                            </a>
                          </h3>
                          {/* End .product-title */}
                          <div className="product-price">
                            <span className="new-price">$179.00</span>
                            <span className="old-price">Was $200.99</span>
                          </div>
                          {/* End .product-price */}
                          <div className="ratings-container">
                            <div className="ratings">
                              <div
                                className="ratings-val"
                                style={{ width: "60%" }}
                              />
                              {/* End .ratings-val */}
                            </div>
                            {/* End .ratings */}
                            <span className="ratings-text">( 4 Reviews )</span>
                          </div>
                          {/* End .rating-container */}
                        </div>
                        {/* End .product-body */}
                      </div>
                      {/* End .product */}
                    </div>
                    {/* End .col-sm-6 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .products */}
              </div>
              {/* End .col-lg-6 */}
            </div>
            {/* End .row */}
            <div className="more-container text-center mt-3 mb-0">
              <a href="#" className="btn btn-outline-dark-2 btn-round btn-more">
                <span>Shop more Outlet deals</span>
                <i className="icon-long-arrow-right" />
              </a>
            </div>
            {/* End .more-container */}
          </div>
          {/* End .container */}
        </div>
        {/* End .deal-container */}
        <Brand />
        {/* End .container */}
        <div className="container">
          <hr className="mt-3 mb-6" />
        </div>
        {/* End .container */}
        <div className="container trending">
          <div className="heading heading-flex mb-3">
            <div className="heading-left">
              <h2 className="title">Sản phẩm thịnh hành</h2>
              {/* End .title */}
            </div>
            {/* End .heading-left */}
            <div className="heading-right">
              <ul
                className="nav nav-pills nav-border-anim justify-content-center"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="trending-all-link"
                    data-toggle="tab"
                    href="#trending-all-tab"
                    role="tab"
                    aria-controls="trending-all-tab"
                    aria-selected="true"
                  >
                    All
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trending-tv-link"
                    data-toggle="tab"
                    href="#trending-tv-tab"
                    role="tab"
                    aria-controls="trending-tv-tab"
                    aria-selected="false"
                  >
                    TV
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trending-computers-link"
                    data-toggle="tab"
                    href="#trending-computers-tab"
                    role="tab"
                    aria-controls="trending-computers-tab"
                    aria-selected="false"
                  >
                    Computers
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trending-phones-link"
                    data-toggle="tab"
                    href="#trending-phones-tab"
                    role="tab"
                    aria-controls="trending-phones-tab"
                    aria-selected="false"
                  >
                    Tablets &amp; Cell Phones
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trending-watches-link"
                    data-toggle="tab"
                    href="#trending-watches-tab"
                    role="tab"
                    aria-controls="trending-watches-tab"
                    aria-selected="false"
                  >
                    Smartwatches
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="trending-acc-link"
                    data-toggle="tab"
                    href="#trending-acc-tab"
                    role="tab"
                    aria-controls="trending-acc-tab"
                    aria-selected="false"
                  >
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            {/* End .heading-right */}
          </div>
          {/* End .heading */}
          <div className="row">
            <div className="col-xl-5col d-none d-xl-block">
              <div className="banner">
                <a href="#">
                  <img
                    src="assets/images/demos/demo-3/banners/banner-4.jpg"
                    alt="banner"
                  />
                </a>
              </div>
              {/* End .banner */}
            </div>
            {/* End .col-xl-5col */}
            <div className="col-xl-4-5col">
              <div className="tab-content tab-content-carousel just-action-icons-sm">
                <div
                  className="tab-pane p-0 fade show active"
                  id="trending-all-tab"
                  role="tabpanel"
                  aria-labelledby="trending-all-link"
                >
                  <div
                    className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                    data-toggle="owl"
                    data-owl-options='{
                                  "nav": true, 
                                  "dots": false,
                                  "margin": 20,
                                  "loop": false,
                                  "responsive": {
                                      "0": {
                                          "items":2
                                      },
                                      "480": {
                                          "items":2
                                      },
                                      "768": {
                                          "items":3
                                      },
                                      "992": {
                                          "items":4
                                      }
                                  }
                              }'
                  >
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-7.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Headphones</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Bose - SoundSport wireless headphones
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a href="#" style={{ background: "#69b4ff" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#ff887f" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#333333" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-8.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Video Games</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Microsoft - Refurbish Xbox One S 500GB
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$279.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
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
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-new">
                          New
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-9.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Smartwatches</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Apple Watch Series 4 Gold Aluminum Case
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$499.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a href="#" style={{ background: "#edd2c8" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#333333" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <span className="product-label label-circle label-sale">
                          Sale
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-10.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">TV &amp; Home Theater</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Sony - Class LED 2160p Smart 4K Ultra HD
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">
                          <span className="new-price">$1,699.99</span>
                          <span className="old-price">Was $1,999.99</span>
                        </div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 10 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-15.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">TV &amp; Home Theater</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Samsung - 55" Class LED 2160p Smart
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 5 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-11.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Laptops</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">MacBook Pro 13" Display, i5</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$1,199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .owl-carousel */}
                </div>
                {/* .End .tab-pane */}
                <div
                  className="tab-pane p-0 fade"
                  id="trending-tv-tab"
                  role="tabpanel"
                  aria-labelledby="trending-tv-link"
                >
                  <div
                    className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                    data-toggle="owl"
                    data-owl-options='{
                                  "nav": true, 
                                  "dots": false,
                                  "margin": 20,
                                  "loop": false,
                                  "responsive": {
                                      "0": {
                                          "items":2
                                      },
                                      "480": {
                                          "items":2
                                      },
                                      "768": {
                                          "items":3
                                      },
                                      "992": {
                                          "items":4
                                      }
                                  }
                              }'
                  >
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-new">
                          New
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-13.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Tablets</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a href="#" style={{ background: "#edd2c8" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#333333" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-12.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Audio</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Bose - SoundLink Bluetooth Speaker
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$79.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
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
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <span className="product-label label-circle label-sale">
                          Sale
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-14.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Cell Phone</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">Google - Pixel 3 XL 128GB</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">
                          <span className="new-price">$35.41</span>
                          <span className="old-price">Was $41.67</span>
                        </div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 10 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#edd2c8" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#333333" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-15.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">TV &amp; Home Theater</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Samsung - 55" Class LED 2160p Smart
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 5 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-11.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Laptops</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">MacBook Pro 13" Display, i5</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$1,199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .owl-carousel */}
                </div>
                {/* .End .tab-pane */}
                <div
                  className="tab-pane p-0 fade"
                  id="trending-computers-tab"
                  role="tabpanel"
                  aria-labelledby="trending-computers-link"
                >
                  <div
                    className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                    data-toggle="owl"
                    data-owl-options='{
                                  "nav": true, 
                                  "dots": false,
                                  "margin": 20,
                                  "loop": false,
                                  "responsive": {
                                      "0": {
                                          "items":2
                                      },
                                      "480": {
                                          "items":2
                                      },
                                      "768": {
                                          "items":3
                                      },
                                      "992": {
                                          "items":4
                                      }
                                  }
                              }'
                  >
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-15.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">TV &amp; Home Theater</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Samsung - 55" Class LED 2160p Smart
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 5 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-11.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Laptops</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">MacBook Pro 13" Display, i5</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$1,199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-new">
                          New
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-13.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Tablets</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a href="#" style={{ background: "#edd2c8" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#333333" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-12.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Audio</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Bose - SoundLink Bluetooth Speaker
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$79.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
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
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <span className="product-label label-circle label-sale">
                          Sale
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-14.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Cell Phone</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">Google - Pixel 3 XL 128GB</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">
                          <span className="new-price">$35.41</span>
                          <span className="old-price">Was $41.67</span>
                        </div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 10 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#edd2c8" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#333333" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .owl-carousel */}
                </div>
                {/* .End .tab-pane */}
                <div
                  className="tab-pane p-0 fade"
                  id="trending-phones-tab"
                  role="tabpanel"
                  aria-labelledby="trending-phones-link"
                >
                  <div
                    className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                    data-toggle="owl"
                    data-owl-options='{
                                  "nav": true, 
                                  "dots": false,
                                  "margin": 20,
                                  "loop": false,
                                  "responsive": {
                                      "0": {
                                          "items":2
                                      },
                                      "480": {
                                          "items":2
                                      },
                                      "768": {
                                          "items":3
                                      },
                                      "992": {
                                          "items":4
                                      }
                                  }
                              }'
                  >
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-11.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Laptops</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">MacBook Pro 13" Display, i5</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$1,199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-12.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Audio</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Bose - SoundLink Bluetooth Speaker
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$79.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
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
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-new">
                          New
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-13.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Tablets</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a href="#" style={{ background: "#edd2c8" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#333333" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-15.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">TV &amp; Home Theater</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Samsung - 55" Class LED 2160p Smart
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 5 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-11.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Laptops</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">MacBook Pro 13" Display, i5</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$1,199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <span className="product-label label-circle label-sale">
                          Sale
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-14.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title=" "
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Cell Phone</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">Google - Pixel 3 XL 128GB</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">
                          <span className="new-price">$35.41</span>
                          <span className="old-price">Was $41.67</span>
                        </div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 10 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#edd2c8" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#333333" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .owl-carousel */}
                </div>
                {/* .End .tab-pane */}
                <div
                  className="tab-pane p-0 fade"
                  id="trending-watches-tab"
                  role="tabpanel"
                  aria-labelledby="trending-watches-link"
                >
                  <div
                    className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                    data-toggle="owl"
                    data-owl-options='{
                                  "nav": true, 
                                  "dots": false,
                                  "margin": 20,
                                  "loop": false,
                                  "responsive": {
                                      "0": {
                                          "items":2
                                      },
                                      "480": {
                                          "items":2
                                      },
                                      "768": {
                                          "items":3
                                      },
                                      "992": {
                                          "items":4
                                      }
                                  }
                              }'
                  >
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <span className="product-label label-circle label-sale">
                          Sale
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-14.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Cell Phone</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">Google - Pixel 3 XL 128GB</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">
                          <span className="new-price">$35.41</span>
                          <span className="old-price">Was $41.67</span>
                        </div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 10 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#edd2c8" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#333333" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-11.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Laptops</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">MacBook Pro 13" Display, i5</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$1,199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-12.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Audio</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Bose - SoundLink Bluetooth Speaker
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$79.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
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
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-new">
                          New
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-13.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Tablets</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a href="#" style={{ background: "#edd2c8" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#333333" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .owl-carousel */}
                </div>
                {/* .End .tab-pane */}
                <div
                  className="tab-pane p-0 fade"
                  id="trending-acc-tab"
                  role="tabpanel"
                  aria-labelledby="trending-acc-link"
                >
                  <div
                    className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                    data-toggle="owl"
                    data-owl-options='{
                                  "nav": true, 
                                  "dots": false,
                                  "margin": 20,
                                  "loop": false,
                                  "responsive": {
                                      "0": {
                                          "items":2
                                      },
                                      "480": {
                                          "items":2
                                      },
                                      "768": {
                                          "items":3
                                      },
                                      "992": {
                                          "items":4
                                      }
                                  }
                              }'
                  >
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-11.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Laptops</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">MacBook Pro 13" Display, i5</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$1,199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-15.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">TV &amp; Home Theater</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Samsung - 55" Class LED 2160p Smart
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 5 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-top">
                          Top
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-11.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Laptops</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">MacBook Pro 13" Display, i5</a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$1,199.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "100%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                    <div className="product product-2">
                      <figure className="product-media">
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-12.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Audio</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Bose - SoundLink Bluetooth Speaker
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$79.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "60%" }}
                            />
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
                    <div className="product product-2">
                      <figure className="product-media">
                        <span className="product-label label-circle label-new">
                          New
                        </span>
                        <a href="product.html">
                          <img
                            src="assets/images/demos/demo-3/products/product-13.jpg"
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
                        </div>
                        {/* End .product-action */}
                        <div className="product-action product-action-dark">
                          <a
                            href="#"
                            className="btn-product btn-cart"
                            title="Add to cart"
                          >
                            <span>add to cart</span>
                          </a>
                          <a
                            href="popup/quickView.html"
                            className="btn-product btn-quickview"
                            title="Quick view"
                          >
                            <span>quick view</span>
                          </a>
                        </div>
                        {/* End .product-action */}
                      </figure>
                      {/* End .product-media */}
                      <div className="product-body">
                        <div className="product-cat">
                          <a href="#">Tablets</a>
                        </div>
                        {/* End .product-cat */}
                        <h3 className="product-title">
                          <a href="product.html">
                            Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                          </a>
                        </h3>
                        {/* End .product-title */}
                        <div className="product-price">$899.99</div>
                        {/* End .product-price */}
                        <div className="ratings-container">
                          <div className="ratings">
                            <div
                              className="ratings-val"
                              style={{ width: "80%" }}
                            />
                            {/* End .ratings-val */}
                          </div>
                          {/* End .ratings */}
                          <span className="ratings-text">( 4 Reviews )</span>
                        </div>
                        {/* End .rating-container */}
                        <div className="product-nav product-nav-dots">
                          <a href="#" style={{ background: "#edd2c8" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a href="#" style={{ background: "#eaeaec" }}>
                            <span className="sr-only">Color name</span>
                          </a>
                          <a
                            href="#"
                            className="active"
                            style={{ background: "#333333" }}
                          >
                            <span className="sr-only">Color name</span>
                          </a>
                        </div>
                        {/* End .product-nav */}
                      </div>
                      {/* End .product-body */}
                    </div>
                    {/* End .product */}
                  </div>
                  {/* End .owl-carousel */}
                </div>
                {/* .End .tab-pane */}
              </div>
              {/* End .tab-content */}
            </div>
            {/* End .col-xl-4-5col */}
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
        <div className="container">
          <hr className="mt-5 mb-6" />
        </div>
        {/* End .container */}
        <div className="container top">
          <div className="heading heading-flex mb-3">
            <div className="heading-left">
              <h2 className="title">Top sản phẩm đang giảm giá</h2>
              {/* End .title */}
            </div>
            {/* End .heading-left */}
            <div className="heading-right">
              <ul
                className="nav nav-pills nav-border-anim justify-content-center"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="top-all-link"
                    data-toggle="tab"
                    href="#top-all-tab"
                    role="tab"
                    aria-controls="top-all-tab"
                    aria-selected="true"
                  >
                    All
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="top-tv-link"
                    data-toggle="tab"
                    href="#top-tv-tab"
                    role="tab"
                    aria-controls="top-tv-tab"
                    aria-selected="false"
                  >
                    TV
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="top-computers-link"
                    data-toggle="tab"
                    href="#top-computers-tab"
                    role="tab"
                    aria-controls="top-computers-tab"
                    aria-selected="false"
                  >
                    Computers
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="top-phones-link"
                    data-toggle="tab"
                    href="#top-phones-tab"
                    role="tab"
                    aria-controls="top-phones-tab"
                    aria-selected="false"
                  >
                    Tablets &amp; Cell Phones
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="top-watches-link"
                    data-toggle="tab"
                    href="#top-watches-tab"
                    role="tab"
                    aria-controls="top-watches-tab"
                    aria-selected="false"
                  >
                    Smartwatches
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="top-acc-link"
                    data-toggle="tab"
                    href="#top-acc-tab"
                    role="tab"
                    aria-controls="top-acc-tab"
                    aria-selected="false"
                  >
                    Accessories
                  </a>
                </li>
              </ul>
            </div>
            {/* End .heading-right */}
          </div>
          {/* End .heading */}
          <div className="tab-content tab-content-carousel just-action-icons-sm">
            <div
              className="tab-pane p-0 fade show active"
              id="top-all-tab"
              role="tabpanel"
              aria-labelledby="top-all-link"
            >
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                          "nav": true, 
                          "dots": false,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "0": {
                                  "items":2
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
                                  "items":5
                              }
                          }
                      }'
              >
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-12.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Audio</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Bose - SoundLink Bluetooth Speaker
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$79.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
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
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-new">
                      New
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-13.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Tablets</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "80%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a href="#" style={{ background: "#edd2c8" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#333333" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <span className="product-label label-circle label-sale">
                      Sale
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-14.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Cell Phone</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">Google - Pixel 3 XL 128GB</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">
                      <span className="new-price">$35.41</span>
                      <span className="old-price">Was $41.67</span>
                    </div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 10 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#edd2c8" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#333333" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-15.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">TV &amp; Home Theater</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Samsung - 55" Class LED 2160p Smart
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 5 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
            <div
              className="tab-pane p-0 fade"
              id="top-tv-tab"
              role="tabpanel"
              aria-labelledby="top-tv-link"
            >
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                          "nav": true, 
                          "dots": false,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "0": {
                                  "items":2
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
                                  "items":5
                              }
                          }
                      }'
              >
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-new">
                      New
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-13.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Tablets</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "80%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a href="#" style={{ background: "#edd2c8" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#333333" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-12.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Audio</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Bose - SoundLink Bluetooth Speaker
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$79.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
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
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <span className="product-label label-circle label-sale">
                      Sale
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-14.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Cell Phone</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">Google - Pixel 3 XL 128GB</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">
                      <span className="new-price">$35.41</span>
                      <span className="old-price">Was $41.67</span>
                    </div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 10 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#edd2c8" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#333333" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-15.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">TV &amp; Home Theater</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Samsung - 55" Class LED 2160p Smart
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 5 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
            <div
              className="tab-pane p-0 fade"
              id="top-computers-tab"
              role="tabpanel"
              aria-labelledby="top-computers-link"
            >
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                          "nav": true, 
                          "dots": false,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "0": {
                                  "items":2
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
                                  "items":5
                              }
                          }
                      }'
              >
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-15.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">TV &amp; Home Theater</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Samsung - 55" Class LED 2160p Smart
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 5 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-new">
                      New
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-13.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Tablets</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "80%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a href="#" style={{ background: "#edd2c8" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#333333" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-12.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Audio</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Bose - SoundLink Bluetooth Speaker
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$79.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
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
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <span className="product-label label-circle label-sale">
                      Sale
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-14.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Cell Phone</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">Google - Pixel 3 XL 128GB</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">
                      <span className="new-price">$35.41</span>
                      <span className="old-price">Was $41.67</span>
                    </div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 10 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#edd2c8" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#333333" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
            <div
              className="tab-pane p-0 fade"
              id="top-phones-tab"
              role="tabpanel"
              aria-labelledby="top-phones-link"
            >
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                          "nav": true, 
                          "dots": false,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "0": {
                                  "items":2
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
                                  "items":5
                              }
                          }
                      }'
              >
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-12.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Audio</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Bose - SoundLink Bluetooth Speaker
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$79.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
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
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-new">
                      New
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-13.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Tablets</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "80%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a href="#" style={{ background: "#edd2c8" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#333333" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-15.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">TV &amp; Home Theater</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Samsung - 55" Class LED 2160p Smart
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 5 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <span className="product-label label-circle label-sale">
                      Sale
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-14.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Cell Phone</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">Google - Pixel 3 XL 128GB</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">
                      <span className="new-price">$35.41</span>
                      <span className="old-price">Was $41.67</span>
                    </div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 10 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#edd2c8" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#333333" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
            <div
              className="tab-pane p-0 fade"
              id="top-watches-tab"
              role="tabpanel"
              aria-labelledby="top-watches-link"
            >
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                          "nav": true, 
                          "dots": false,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "0": {
                                  "items":2
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
                                  "items":5
                              }
                          }
                      }'
              >
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <span className="product-label label-circle label-sale">
                      Sale
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-14.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Cell Phone</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">Google - Pixel 3 XL 128GB</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">
                      <span className="new-price">$35.41</span>
                      <span className="old-price">Was $41.67</span>
                    </div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 10 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#edd2c8" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#333333" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-12.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Audio</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Bose - SoundLink Bluetooth Speaker
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$79.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
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
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-new">
                      New
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-13.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Tablets</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "80%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a href="#" style={{ background: "#edd2c8" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#333333" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
            <div
              className="tab-pane p-0 fade"
              id="top-acc-tab"
              role="tabpanel"
              aria-labelledby="top-acc-link"
            >
              <div
                className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                data-toggle="owl"
                data-owl-options='{
                          "nav": true, 
                          "dots": false,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "0": {
                                  "items":2
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
                                  "items":5
                              }
                          }
                      }'
              >
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-15.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">TV &amp; Home Theater</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Samsung - 55" Class LED 2160p Smart
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 5 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-top">
                      Top
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-11.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Laptops</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">MacBook Pro 13" Display, i5</a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$1,199.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div
                          className="ratings-val"
                          style={{ width: "100%" }}
                        />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
                <div className="product product-2">
                  <figure className="product-media">
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-12.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Audio</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Bose - SoundLink Bluetooth Speaker
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$79.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "60%" }} />
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
                <div className="product product-2">
                  <figure className="product-media">
                    <span className="product-label label-circle label-new">
                      New
                    </span>
                    <a href="product.html">
                      <img
                        src="assets/images/demos/demo-3/products/product-13.jpg"
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
                    </div>
                    {/* End .product-action */}
                    <div className="product-action product-action-dark">
                      <a
                        href="#"
                        className="btn-product btn-cart"
                        title="Add to cart"
                      >
                        <span>add to cart</span>
                      </a>
                      <a
                        href="popup/quickView.html"
                        className="btn-product btn-quickview"
                        title="Quick view"
                      >
                        <span>quick view</span>
                      </a>
                    </div>
                    {/* End .product-action */}
                  </figure>
                  {/* End .product-media */}
                  <div className="product-body">
                    <div className="product-cat">
                      <a href="#">Tablets</a>
                    </div>
                    {/* End .product-cat */}
                    <h3 className="product-title">
                      <a href="product.html">
                        Apple - 11 Inch iPad Pro with Wi-Fi 256GB{" "}
                      </a>
                    </h3>
                    {/* End .product-title */}
                    <div className="product-price">$899.99</div>
                    {/* End .product-price */}
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val" style={{ width: "80%" }} />
                        {/* End .ratings-val */}
                      </div>
                      {/* End .ratings */}
                      <span className="ratings-text">( 4 Reviews )</span>
                    </div>
                    {/* End .rating-container */}
                    <div className="product-nav product-nav-dots">
                      <a href="#" style={{ background: "#edd2c8" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a href="#" style={{ background: "#eaeaec" }}>
                        <span className="sr-only">Color name</span>
                      </a>
                      <a
                        href="#"
                        className="active"
                        style={{ background: "#333333" }}
                      >
                        <span className="sr-only">Color name</span>
                      </a>
                    </div>
                    {/* End .product-nav */}
                  </div>
                  {/* End .product-body */}
                </div>
                {/* End .product */}
              </div>
              {/* End .owl-carousel */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
        </div>
        {/* End .container */}
        <div className="container">
          <hr className="mt-5 mb-0" />
        </div>
        {/* End .container */}
        <div className="icon-boxes-container mt-2 mb-2 bg-transparent">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className="icon-rocket" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Miễn phí giao hàng</h3>
                    {/* End .icon-box-title */}
                    <p>Đơn hàng 800K trở lên</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className="icon-rotate-left" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Miễn phí đổi trả</h3>
                    {/* End .icon-box-title */}
                    <p>Trong vòng 30 ngày</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className="icon-info-circle" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Giảm giá 20% lần đầu</h3>
                    {/* End .icon-box-title */}
                    <p>khi bạn đăng ký</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
              <div className="col-sm-6 col-lg-3">
                <div className="icon-box icon-box-side">
                  <span className="icon-box-icon text-dark">
                    <i className="icon-life-ring" />
                  </span>
                  <div className="icon-box-content">
                    <h3 className="icon-box-title">Đội ngũ hổ trợ</h3>
                    {/* End .icon-box-title */}
                    <p>dịch vụ 24/7</p>
                  </div>
                  {/* End .icon-box-content */}
                </div>
                {/* End .icon-box */}
              </div>
              {/* End .col-sm-6 col-lg-3 */}
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </div>
        {/* End .icon-boxes-container */}
        <div className="container">
          <div
            className="cta cta-separator cta-border-image cta-half mb-0"
            style={{
              backgroundImage: "url(assets/images/demos/demo-3/bg-2.jpg)",
            }}
          >
            <div className="cta-border-wrapper bg-white">
              <div className="row">
                <div className="col-lg-6">
                  <div className="cta-wrapper cta-text text-center">
                    <h3 className="cta-title">Mua sắm trên mạng xã hội</h3>
                    {/* End .cta-title */}
                    <p className="cta-desc">
                      Dễ dàng hơn - Tiện lợi hơn với nhiều mã giảm giá cực hấp
                      dẫn.{" "}
                    </p>
                    {/* End .cta-desc */}
                    <div className="social-icons social-icons-colored justify-content-center">
                      <a
                        href="#"
                        className="social-icon social-facebook"
                        title="Facebook"
                        target="_blank"
                      >
                        <i className="icon-facebook-f" />
                      </a>
                      <a
                        href="#"
                        className="social-icon social-twitter"
                        title="Twitter"
                        target="_blank"
                      >
                        <i className="icon-twitter" />
                      </a>
                      <a
                        href="#"
                        className="social-icon social-instagram"
                        title="Instagram"
                        target="_blank"
                      >
                        <i className="icon-instagram" />
                      </a>
                      <a
                        href="#"
                        className="social-icon social-youtube"
                        title="Youtube"
                        target="_blank"
                      >
                        <i className="icon-youtube" />
                      </a>
                      <a
                        href="#"
                        className="social-icon social-pinterest"
                        title="Pinterest"
                        target="_blank"
                      >
                        <i className="icon-pinterest" />
                      </a>
                    </div>
                    {/* End .soial-icons */}
                  </div>
                  {/* End .cta-wrapper */}
                </div>
                {/* End .col-lg-6 */}
                <div className="col-lg-6">
                  <div className="cta-wrapper text-center">
                    <h3 className="cta-title">Nhận ưu đãi mới nhất</h3>
                    {/* End .cta-title */}
                    <p className="cta-desc">
                      và <br />
                      nhận được phiếu giảm giá{" "}
                      <span className="text-primary"> 400.000đ</span> cho lần
                      mua sắm đầu tiên.
                    </p>
                    {/* End .cta-desc */}
                    <form action="#">
                      <div className="input-group">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Nhập địa chỉ Email của bạn"
                          aria-label="Email Adress"
                          required=""
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-primary btn-rounded"
                            type="submit"
                          >
                            <i className="icon-long-arrow-right" />
                          </button>
                        </div>
                        {/* .End .input-group-append */}
                      </div>
                      {/* .End .input-group */}
                    </form>
                  </div>
                  {/* End .cta-wrapper */}
                </div>
                {/* End .col-lg-6 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .bg-white */}
          </div>
          {/* End .cta */}
        </div>
        {/* End .container */}
      </main>
      {/* End .main */}
    </>
  );
}

export default Home;
