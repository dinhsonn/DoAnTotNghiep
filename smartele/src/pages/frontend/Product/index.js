import { useEffect, useState } from "react";
import ProductServices from '../../../services/ProductServices';
import ProductItem3 from "./ProductItem3";
function Product() {
  const [products, setProducts] = useState([]);
  const [productImages, setProductImages] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse,productImagesResponse] = await Promise.all([
          ProductServices.getAll(),
          ProductServices.getProductImage(),
        ]);
        const productsData = productsResponse.data.content;
        const productImagesData = productImagesResponse.data.content;
        setProducts(productsData);
        setProductImages(productImagesData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
      const combinedData = products.map(product => {
        const correspondingImages = productImages.filter(image => image.productId.id === product.id && image.sortOrder === 1);

        const imageUrls = correspondingImages.map(image => image.image);

        return {
          ...product,
          image: imageUrls.length > 0 ? imageUrls[0] : null,

        };
      });
    return (  
        <>
  <main className="main">

    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-2">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Trang chủ</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Tất cả sản phẩm</a>
          </li>
    
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content">
      <div className="container">
        <div className="toolbox">
          <div className="toolbox-left">
            <a href="#" className="sidebar-toggler">
              <i className="icon-bars" />
              Lọc
            </a>
          </div>
          {/* End .toolbox-left */}
          <div className="toolbox-center">
            <div className="toolbox-info">
              Hiển thị <span>12 trên 56</span> Sản phẩm
            </div>
            {/* End .toolbox-info */}
          </div>
          {/* End .toolbox-center */}
          <div className="toolbox-right">
            <div className="toolbox-sort">
              <label htmlFor="sortby">Sắp xếp theo:</label>
              <div className="select-custom">
                <select name="sortby" id="sortby" className="form-control">
                  <option value="popularity" selected="selected">
                    Phổ biến
                  </option>
                  <option value="rating">Đánh giá</option>
                  <option value="date">Ngày tháng</option>
                </select>
              </div>
            </div>
            {/* End .toolbox-sort */}
          </div>
          {/* End .toolbox-right */}
        </div>
        {/* End .toolbox */}
        <div className="products">
          <div className="row">
          {combinedData.map((combinedItem, index) => (
                  <ProductItem3 product={combinedItem} key={index} />
                ))}
     
           
          </div>
          {/* End .row */}
          <div className="load-more-container text-center">
            <a href="#" className="btn btn-outline-darker btn-load-more">
              XEM THÊM <i className="icon-refresh" />
            </a>
          </div>
          {/* End .load-more-container */}
        </div>
        {/* End .products */}
        <div className="sidebar-filter-overlay" />
        {/* End .sidebar-filter-overlay */}
        <aside className="sidebar-shop sidebar-filter">
          <div className="sidebar-filter-wrapper">
            <div className="widget widget-clean">
              <label>
                <i className="icon-close" />
                Lọc
              </label>
              <a href="#" className="sidebar-filter-clear">
                Xóa tất cả
              </a>
            </div>
            {/* End .widget */}
            <div className="widget widget-collapsible">
              <h3 className="widget-title">
                <a
                  data-toggle="collapse"
                  href="#widget-1"
                  role="button"
                  aria-expanded="true"
                  aria-controls="widget-1"
                >
                  Danh mục sản phẩm
                </a>
              </h3>
              {/* End .widget-title */}
              <div className="collapse show" id="widget-1">
                <div className="widget-body">
                  <div className="filter-items filter-items-count">
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-1"
                        />
                        <label className="custom-control-label" htmlFor="cat-1">
                          Dresses
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">3</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-2"
                        />
                        <label className="custom-control-label" htmlFor="cat-2">
                          T-shirts
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">0</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-3"
                        />
                        <label className="custom-control-label" htmlFor="cat-3">
                          Bags
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">4</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-4"
                        />
                        <label className="custom-control-label" htmlFor="cat-4">
                          Jackets
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">2</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-5"
                        />
                        <label className="custom-control-label" htmlFor="cat-5">
                          Shoes
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">2</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-6"
                        />
                        <label className="custom-control-label" htmlFor="cat-6">
                          Jumpers
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">1</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-7"
                        />
                        <label className="custom-control-label" htmlFor="cat-7">
                          Jeans
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">1</span>
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="cat-8"
                        />
                        <label className="custom-control-label" htmlFor="cat-8">
                          Sportwear
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                      <span className="item-count">0</span>
                    </div>
                    {/* End .filter-item */}
                  </div>
                  {/* End .filter-items */}
                </div>
                {/* End .widget-body */}
              </div>
              {/* End .collapse */}
            </div>
            {/* End .widget */}
            <div className="widget widget-collapsible">
              <h3 className="widget-title">
                <a
                  data-toggle="collapse"
                  href="#widget-2"
                  role="button"
                  aria-expanded="true"
                  aria-controls="widget-2"
                >
                  Size
                </a>
              </h3>
              {/* End .widget-title */}
              <div className="collapse show" id="widget-2">
                <div className="widget-body">
                  <div className="filter-items">
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="size-1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="size-1"
                        >
                          XS
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="size-2"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="size-2"
                        >
                          S
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked=""
                          id="size-3"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="size-3"
                        >
                          M
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          defaultChecked=""
                          id="size-4"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="size-4"
                        >
                          L
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="size-5"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="size-5"
                        >
                          XL
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="size-6"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="size-6"
                        >
                          XXL
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                  </div>
                  {/* End .filter-items */}
                </div>
                {/* End .widget-body */}
              </div>
              {/* End .collapse */}
            </div>
            {/* End .widget */}
            <div className="widget widget-collapsible">
              <h3 className="widget-title">
                <a
                  data-toggle="collapse"
                  href="#widget-3"
                  role="button"
                  aria-expanded="true"
                  aria-controls="widget-3"
                >
                  Màu sắc
                </a>
              </h3>
              {/* End .widget-title */}
              <div className="collapse show" id="widget-3">
                <div className="widget-body">
                  <div className="filter-colors">
                    <a href="#" style={{ background: "#b87145" }}>
                      <span className="sr-only">Color Name</span>
                    </a>
                    <a href="#" style={{ background: "#f0c04a" }}>
                      <span className="sr-only">Color Name</span>
                    </a>
                    <a href="#" style={{ background: "#333333" }}>
                      <span className="sr-only">Color Name</span>
                    </a>
                    <a
                      href="#"
                      className="selected"
                      style={{ background: "#cc3333" }}
                    >
                      <span className="sr-only">Color Name</span>
                    </a>
                    <a href="#" style={{ background: "#3399cc" }}>
                      <span className="sr-only">Color Name</span>
                    </a>
                    <a href="#" style={{ background: "#669933" }}>
                      <span className="sr-only">Color Name</span>
                    </a>
                    <a href="#" style={{ background: "#f2719c" }}>
                      <span className="sr-only">Color Name</span>
                    </a>
                    <a href="#" style={{ background: "#ebebeb" }}>
                      <span className="sr-only">Color Name</span>
                    </a>
                  </div>
                  {/* End .filter-colors */}
                </div>
                {/* End .widget-body */}
              </div>
              {/* End .collapse */}
            </div>
            {/* End .widget */}
            <div className="widget widget-collapsible">
              <h3 className="widget-title">
                <a
                  data-toggle="collapse"
                  href="#widget-4"
                  role="button"
                  aria-expanded="true"
                  aria-controls="widget-4"
                >
                  Hãng
                </a>
              </h3>
              {/* End .widget-title */}
              <div className="collapse show" id="widget-4">
                <div className="widget-body">
                  <div className="filter-items">
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="brand-1"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="brand-1"
                        >
                          Next
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="brand-2"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="brand-2"
                        >
                          River Island
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="brand-3"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="brand-3"
                        >
                          Geox
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="brand-4"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="brand-4"
                        >
                          New Balance
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="brand-5"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="brand-5"
                        >
                          UGG
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="brand-6"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="brand-6"
                        >
                          F&amp;F
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                    <div className="filter-item">
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="brand-7"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="brand-7"
                        >
                          Nike
                        </label>
                      </div>
                      {/* End .custom-checkbox */}
                    </div>
                    {/* End .filter-item */}
                  </div>
                  {/* End .filter-items */}
                </div>
                {/* End .widget-body */}
              </div>
              {/* End .collapse */}
            </div>
            {/* End .widget */}
            <div className="widget widget-collapsible">
              <h3 className="widget-title">
                <a
                  data-toggle="collapse"
                  href="#widget-5"
                  role="button"
                  aria-expanded="true"
                  aria-controls="widget-5"
                >
                  Giá tiền
                </a>
              </h3>
              {/* End .widget-title */}
              <div className="collapse show" id="widget-5">
                <div className="widget-body">
                  <div className="filter-price">
                    <div className="filter-price-text">
                      Phạm vi:
                      <span id="filter-price-range" />
                    </div>
                    {/* End .filter-price-text */}
                    <div id="price-slider" />
                    {/* End #price-slider */}
                  </div>
                  {/* End .filter-price */}
                </div>
                {/* End .widget-body */}
              </div>
              {/* End .collapse */}
            </div>
            {/* End .widget */}
          </div>
          {/* End .sidebar-filter-wrapper */}
        </aside>
        {/* End .sidebar-filter */}
      </div>
      {/* End .container */}
    </div>
    {/* End .page-content */}
  </main>
  {/* End .main */}
</>

    );
}

export default Product;