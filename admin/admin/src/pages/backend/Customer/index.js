import { Link } from "react-router-dom";

function Customer() {
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Khách hàng</h1>
           <Link className="btn-add" to={"/customer/create"}>Thêm mới</Link>
           <div className="row mt-3 align-items-center">
              <div className="col-6">
                 <ul className="manager">
                    <li><a href="customer_index.html">Tất cả (123)</a></li>
                    <li><a href="#">Xuất bản (12)</a></li>
                    <li><a href="customer_trash.html">Rác (12)</a></li>
                 </ul>
              </div>
              <div className="col-6 text-end">
                 <input type="text" className="search d-inline" />
                 <button className="d-inlin btnsearch">Tìm kiếm</button>
              </div>
           </div>
           <div className="row mt-1 align-items-center">
              <div className="col-md-8">
                 <select name="" className="d-inline me-1">
                    <option value="">Hành động</option>
                    <option value="">Bỏ vào thùng rác</option>
                 </select>
                 <button className="btnapply">Áp dụng</button>
              </div>
              <div className="col-md-4 text-end">
                 <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-end">
                       <li className="page-item disabled">
                          <a className="page-link">&laquo;</a>
                       </li>
                       <li className="page-item"><a className="page-link" href="#">1</a></li>
                       <li className="page-item"><a className="page-link" href="#">2</a></li>
                       <li className="page-item"><a className="page-link" href="#">3</a></li>
                       <li className="page-item">
                          <a className="page-link" href="#">&raquo;</a>
                       </li>
                    </ul>
                 </nav>
              </div>
           </div>
        </section>
        <section className="content-body my-2">

           <table className="table table-bordered">
              <thead>
                 <tr>
                    <th className="text-center" style={{width: '30px'}}>
                       <input type="checkbox" id="checkboxAll" />
                    </th>
                    <th className="text-center" style={{width: '130px'}}>Hình ảnh</th>
                    <th>Họ tên</th>
                    <th>Điện thoại</th>
                    <th>Email</th>
                    <th className="text-center" style={{width: '30px'}}>ID</th>
                 </tr>
              </thead>
              <tbody>
                 <tr className="datarow">
                    <td>
                       <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                       <img className="img-fluid" src="public/images/user/default_user.jpg" alt="user.jpg" />
                    </td>
                    <td>
                       <div className="name">
                          <a href="customer_edit.html">Ho Din Loi</a>
                       </div>
                       <div className="function_style">
                          <a href="#" className="text-success mx-1">
                             <i className="fa fa-toggle-on"></i>
                          </a>
                          <a href="customer_edit.html" className="text-primary mx-1">
                             <i className="fa fa-edit"></i>
                          </a>
                          <a href="customer_show.html" className="text-info mx-1">
                             <i className="fa fa-eye"></i>
                          </a>
                          <a href="#" className="text-danger mx-1">
                             <i className="fa fa-trash"></i>
                          </a>
                       </div>
                    </td>
                    <td>0987654331</td>
                    <td>dienloisoft@gmail.com</td>
                    <td className="text-center">1</td>
                 </tr>
              </tbody>
           </table>

        </section>
     </div>
     );
}

export default Customer;