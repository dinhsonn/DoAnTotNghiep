import { Link, Outlet } from "react-router-dom";

function Sidebar() {
    return ( 

      <section className="hdl-content">
      <div className="container-fluid">
         <div className="row">
            <div className="col-md-2 bg-dark p-0 hdl-left">
               <div className="hdl-left">
                  <div className="dashboard-name">
                     Bản điều khiển
                  </div>
                  <nav className="m-2 mainmenu">
                     <ul className="main">
                        <li className="hdlitem item-sub">
                           <i className="fa-brands fa-product-hunt icon-left"></i>
                           <a to="#">Sản phẩm</a>
                           <i className="fa-solid fa-plus icon-right"></i>
                           <ul className="submenu">
                              <li>
                                 <Link to={"/product"}>Tất cả sản phẩm</Link>
                              </li>
                              <li>
                                 <Link to={"/product/import"}>Nhập hàng</Link>
                              </li>
                              <li>
                                 <Link to={"/category"}>Danh mục</Link>
                              </li>
                              <li>
                                 <Link to={"/brand"}>Thương hiệu</Link>
                              </li>
                              <li>
                                 <Link to={"/product/sale"}>Khuyễn mãi</Link>
                              </li>
                           </ul>
                        </li>
                        <li className="hdlitem item-sub">
                           <i className="fa-brands fa-product-hunt icon-left"></i>
                           <a to="#">Bài viết</a>
                           <i className="fa-solid fa-plus icon-right"></i>
                           <ul className="submenu">
                              <li>
                                 <Link to={"/post"}>Tất cả bài viết</Link>
                              </li>
                              <li>
                                 <Link to={"/topic"}>Chủ đề</Link>
                              </li>
                              <li>
                                 <Link to={"/page"}>Trang đơn</Link>
                              </li>
                           </ul>
                        </li>
                        <li className="hdlitem item-sub">
                           <i className="fa-brands fa-product-hunt icon-left"></i>
                           <a to="#">Quản lý bán hàng</a>
                           <i className="fa-solid fa-plus icon-right"></i>
                           <ul className="submenu">
                              <li>
                                 <Link to={"/order"}>Tất cả đơn hàng</Link>
                              </li>
                              <li>
                                 <Link to={"/order/export"}>Xuất hàng</Link>
                              </li>
                           </ul>
                        </li>
                        <li className="hdlitem">
                           <i className="fa-regular fa-circle icon-left"></i>
                           <Link to={"/customer"}>Khách hàng</Link>
                        </li>
                        <li className="hdlitem">
                           <i className="fa-regular fa-circle icon-left"></i>
                           <Link to={"/contact"}>Liên hệ</Link>
                        </li>
                        <li className="hdlitem item-sub">
                           <i className="fa-brands fa-product-hunt icon-left"></i>
                           <Link to="#">Giao diện</Link>
                           <i className="fa-solid fa-plus icon-right"></i>
                           <ul className="submenu">
                              <li>
                                 <Link to={"/menu"}>Menu</Link>
                              </li>
                              <li>
                                 <Link to={"/slider"}>Slider</Link>
                              </li>
                              <li>
                                 <Link to={"/banner"}>Banner</Link>
                              </li>
                           </ul>
                        </li>
                        <li className="hdlitem item-sub">
                           <i className="fa-brands fa-product-hunt icon-left"></i>
                           <Link to="#">Hệ thống</Link>
                           <i className="fa-solid fa-plus icon-right"></i>
                           <ul className="submenu">
                              <li>
                                 <Link to={"/admin"}>Thành viên</Link>
                              </li>
                              <li>
                                 <Link to={"/config"}>Cấu hình</Link>
                              </li>
                           </ul>
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
            <div className="col-md-10">
               {/*CONTENT  */}
            <Outlet/>
               {/*END CONTENT*/}
            </div>
         </div>
      </div>
   </section>

     );
}

export default Sidebar;