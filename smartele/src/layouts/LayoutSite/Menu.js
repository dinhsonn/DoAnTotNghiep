import { useEffect } from "react";
import { useState } from "react";
import CategoryServices from "../../services/CategoryServices";
import MenuServices from "../../services/MenuServices";
import { Link } from "react-router-dom";
function Menu() {
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    CategoryServices.getAll()
      .then((response) => {
        setCategories(response.data.content);
        console.log("cte", response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    MenuServices.getAll()
      .then((response) => {
        const sortedMenus = response.data.content.sort((a, b) => a.position - b.position);
        setMenus(sortedMenus);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="header-bottom sticky-header">
      <div className="container">
        <div className="header-left">
          <div className="dropdown category-dropdown">
            <a
              href="#"
              className="dropdown-toggle"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-display="static"
              title="Browse Categories"
            >
              Danh mục sản phẩm <i className="icon-angle-down" />
            </a>
            <div className="dropdown-menu">
              <nav className="side-nav">
                <ul className="menu-vertical sf-arrows">
                  {categories.map((parentCategory, index) => {
                    if (!parentCategory.parentId) {
                      return (
                        <li className="item-lead" key={parentCategory.id}>
                          <a href="#">{parentCategory.name}</a>

                          {categories.map((childCategory) => {
                            if (childCategory.parentId === parentCategory.id) {
                              return (
                                <ul className="sub-menu">
                                  <li key={childCategory.id}>
                                    <a href="#">{childCategory.name}</a>
                                  </li>
                                </ul>
                              );
                            }
                            return null;
                          })}
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>

                {/* End .menu-vertical */}
              </nav>
              {/* End .side-nav */}
            </div>
            {/* End .dropdown-menu */}
          </div>
          {/* End .category-dropdown */}
        </div>
        {/* End .header-left */}
        <div className="header-center">
          <nav className="main-nav">
            <ul className="menu sf-arrows">
<<<<<<< HEAD
              {menus.map((parentMenu, index) => {
              if (!parentMenu.parentId) {
                return (
                <li key={parentMenu.id}>
                  <Link to={parentMenu.link} className="sf-with-ul">
                    {parentMenu.name}
                  </Link>
                  {menus.map((childMenu) => {
                    if (childMenu.parentId === parentMenu.id) {
                      return (
                        <ul key={childMenu.id}>
=======
              <li className="megamenu-container active">
                <a href="/" className="sf-with-ul">
                  Home
                </a>
                <div className="megamenu demo">
                  <div className="menu-col">
                    <div className="menu-title">Choose your demo</div>
                    {/* End .menu-title */}
                    <div className="demo-list">
                      <div className="demo-item">
                        <a href="index-1.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/1.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            01 - furniture store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-2.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/2.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            02 - furniture store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-3.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/3.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            03 - electronic store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-4.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/4.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            04 - electronic store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-5.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/5.jpg)"
                            }}
                          />
                          <span className="demo-title">05 - fashion store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-6.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/6.jpg)"
                            }}
                          />
                          <span className="demo-title">06 - fashion store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-7.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/7.jpg)"
                            }}
                          />
                          <span className="demo-title">07 - fashion store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-8.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/8.jpg)"
                            }}
                          />
                          <span className="demo-title">08 - fashion store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-9.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/9.jpg)"
                            }}
                          />
                          <span className="demo-title">09 - fashion store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item">
                        <a href="index-10.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/10.jpg)"
                            }}
                          />
                          <span className="demo-title">10 - shoes store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-11.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/11.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            11 - furniture simple store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-12.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/12.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            12 - fashion simple store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-13.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/13.jpg)"
                            }}
                          />
                          <span className="demo-title">13 - market</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-14.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/14.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            14 - market fullwidth
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-15.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/15.jpg)"
                            }}
                          />
                          <span className="demo-title">15 - lookbook 1</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-16.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/16.jpg)"
                            }}
                          />
                          <span className="demo-title">16 - lookbook 2</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-17.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/17.jpg)"
                            }}
                          />
                          <span className="demo-title">17 - fashion store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-18.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/18.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            18 - fashion store (with sidebar)
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-19.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/19.jpg)"
                            }}
                          />
                          <span className="demo-title">19 - games store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-20.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/20.jpg)"
                            }}
                          />
                          <span className="demo-title">20 - book store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-21.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/21.jpg)"
                            }}
                          />
                          <span className="demo-title">21 - sport store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-22.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/22.jpg)"
                            }}
                          />
                          <span className="demo-title">22 - tools store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-23.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/23.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            23 - fashion left navigation store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-24.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/24.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            24 - extreme sport store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-25.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/25.jpg)"
                            }}
                          />
                          <span className="demo-title">25 - jewelry store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-26.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/26.jpg)"
                            }}
                          />
                          <span className="demo-title">26 - market store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-27.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/27.jpg)"
                            }}
                          />
                          <span className="demo-title">27 - fashion store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-28.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/28.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            28 - food market store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-29.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/29.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            29 - t-shirts store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-30.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/30.jpg)"
                            }}
                          />
                          <span className="demo-title">
                            30 - headphones store
                          </span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                      <div className="demo-item hidden">
                        <a href="index-31.html">
                          <span
                            className="demo-bg"
                            style={{
                              backgroundImage:
                                "url(assets/images/menu/demos/31.jpg)"
                            }}
                          />
                          <span className="demo-title">31 - yoga store</span>
                        </a>
                      </div>
                      {/* End .demo-item */}
                    </div>
                    {/* End .demo-list */}
                    <div className="megamenu-action text-center">
                      <a
                        href="#"
                        className="btn btn-outline-primary-2 view-all-demos"
                      >
                        <span>View All Demos</span>
                        <i className="icon-long-arrow-right" />
                      </a>
                    </div>
                    {/* End .text-center */}
                  </div>
                  {/* End .menu-col */}
                </div>
                {/* End .megamenu */}
              </li>
              <li>
                <a href="category.html" className="sf-with-ul">
                  Shop
                </a>
                <div className="megamenu megamenu-md">
                  <div className="row no-gutters">
                    <div className="col-md-8">
                      <div className="menu-col">
                        <div className="row">
                          <div className="col-md-6">
                            <div className="menu-title">Shop with sidebar</div>
                            {/* End .menu-title */}
                            <ul>
                              <li>
                                <a href="category-list.html">Shop List</a>
                              </li>
                              <li>
                                <a href="category-2cols.html">
                                  Shop Grid 2 Columns
                                </a>
                              </li>
                              <li>
                                <a href="category.html">Shop Grid 3 Columns</a>
                              </li>
                              <li>
                                <a href="category-4cols.html">
                                  Shop Grid 4 Columns
                                </a>
                              </li>
                              <li>
                                <a href="category-market.html">
                                  <span>
                                    Shop Market
                                    <span className="tip tip-new">New</span>
                                  </span>
                                </a>
                              </li>
                            </ul>
                            <div className="menu-title">Shop no sidebar</div>
                            {/* End .menu-title */}
                            <ul>
                              <li>
                                <a href="category-boxed.html">
                                  <span>
                                    Shop Boxed No Sidebar
                                    <span className="tip tip-hot">Hot</span>
                                  </span>
                                </a>
                              </li>
                              <li>
                                <a href="category-fullwidth.html">
                                  Shop Fullwidth No Sidebar
                                </a>
                              </li>
                            </ul>
                          </div>
                          {/* End .col-md-6 */}
                          <div className="col-md-6">
                            <div className="menu-title">Product Category</div>
                            {/* End .menu-title */}
                            <ul>
                              <li>
                                <a href="product-category-boxed.html">
                                  Product Category Boxed
                                </a>
                              </li>
                              <li>
                                <a href="product-category-fullwidth.html">
                                  <span>
                                    Product Category Fullwidth
                                    <span className="tip tip-new">New</span>
                                  </span>
                                </a>
                              </li>
                            </ul>
                            <div className="menu-title">Shop Pages</div>
                            {/* End .menu-title */}
                            <ul>
                              <li>
                                <a href="cart.html">Cart</a>
                              </li>
                              <li>
                                <a href="checkout.html">Checkout</a>
                              </li>
                              <li>
                                <a href="wishlist.html">Wishlist</a>
                              </li>
                              <li>
                                <a href="dashboard.html">My Account</a>
                              </li>
                              <li>
                                <a href="#">Lookbook</a>
                              </li>
                            </ul>
                          </div>
                          {/* End .col-md-6 */}
                        </div>
                        {/* End .row */}
                      </div>
                      {/* End .menu-col */}
                    </div>
                    {/* End .col-md-8 */}
                    <div className="col-md-4">
                      <div className="banner banner-overlay">
                        <a href="category.html" className="banner banner-menu">
                          <img
                            src="assets/images/menu/banner-1.jpg"
                            alt="Banner"
                          />
                          <div className="banner-content banner-content-top">
                            <div className="banner-title text-white">
                              Last <br />
                              Chance
                              <br />
                              <span>
                                <strong>Sale</strong>
                              </span>
                            </div>
                            {/* End .banner-title */}
                          </div>
                          {/* End .banner-content */}
                        </a>
                      </div>
                      {/* End .banner banner-overlay */}
                    </div>
                    {/* End .col-md-4 */}
                  </div>
                  {/* End .row */}
                </div>
                {/* End .megamenu megamenu-md */}
              </li>
              <li>
                <a href="product.html" className="sf-with-ul">
                  Product
                </a>
                <div className="megamenu megamenu-sm">
                  <div className="row no-gutters">
                    <div className="col-md-6">
                      <div className="menu-col">
                        <div className="menu-title">Product Details</div>
                        {/* End .menu-title */}
                        <ul>
>>>>>>> e0a4dd9d1f205f3e9094703365faa228aaf4f325
                          <li>
                            <a href="about.html" className="sf-with-ul">
                              {childMenu.name}
                            </a>
                            {/* <ul>
                              <li>
                                <a href="about.html">About 01</a>
                              </li>
                            </ul> */}
                          </li>
                        </ul>
                      );
                    }
                    return null;
                  })}
                </li>
                );
              };
              return null;
            })}
            </ul>
            {/* End .menu */}
          </nav>
          {/* End .main-nav */}
        </div>
        {/* End .header-center */}
        <div className="header-right">
          <i className="la la-lightbulb-o" />
          <p>
            Giảm giá<span className="highlight">&nbsp;lên đến 30%</span>
          </p>
        </div>
      </div>
      {/* End .container */}
    </div>
  );
}

export default Menu;
