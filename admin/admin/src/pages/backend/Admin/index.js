import { Link } from "react-router-dom";
import UserServices from "../../../services/UserServices";
import { useEffect, useState } from "react";
function Admin() {
   const [admins, setAdmins] = useState([]);
   //api này gọi user 
   useEffect(() => {
      UserServices.getAll()
       .then(response => {
         const filteredAdmins = (response.data.content);
         setAdmins(filteredAdmins );
       })
       .catch(error => {
         console.error('Error fetching data:', error);
       });
   }, []);
   //xóa admin
   const removeAdmin = (id) => {
      UserServices.remove(id)
        .then(() => {
         setAdmins(admins.filter(admin => admin.id !== id));
          console.log("Admin deleted successfully");
          alert("Thành viên đã được xóa!")
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    };
    return (   
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Thành viên</h1>
       <Link to={"/admin/create"} className="btn-add">Thêm mới</Link>
       <div className="row mt-3 align-items-center">
          <div className="col-6">
             <ul className="manager">
                <li><a href="user_index.html">Tất cả (123)</a></li>
                <li><a href="#">Xuất bản (12)</a></li>
                <li><Link to={"/admin/trash"}>Rác (12)</Link></li>
             </ul>
          </div>
          <div className="col-6 text-end">
             <input type="text" className="search d-inline" />
             <button className="d-inline btnsearch">Tìm kiếm</button>
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
                   <input type="checkbox" id="checkAll" />
                </th>
                <th>Họ tên</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Điện thoại</th>
                <th>Email</th>
                <th>Địa chỉ</th>
                <th>Vai trò</th>
                <th className="text-center" style={{width: '30px'}}>ID</th>
             </tr>
          </thead>
          <tbody>
            {admins.map((admin,index) => (
             <tr className="datarow">
                <td className="text-center">
                   <input type="checkbox" id="checkId" />
                </td>
              
                <td>
                   <div className="name ">
                      <Link to={`/admin/show/${admin.id}`} >
                         {admin.name}
                      </Link>
                   </div>
                   <div className="function_style">
                      <Link to="#" className="text-success mx-1">
                         <i className="fa fa-toggle-on"></i>
                      </Link>
                      <Link to={`/admin/edit/${admin.id}`} className="text-primary mx-1">
                         <i className="fa fa-edit"></i>
                      </Link>
                      <Link to={`/admin/show/${admin.id}`} className="text-info mx-1">
                         <i className="fa fa-eye"></i>
                      </Link>
                      <Link to="#" className="text-danger mx-1" onClick={() => removeAdmin(admin.id)}>
                         <i className="fa fa-trash"></i>
                      </Link>
                   </div>
                </td>
                <td>{admin.sex === "0" ? "Nữ" : "Nam"}</td>
                <td>{admin.birthday}</td>
                <td>{admin.phone}</td>
                <td>{admin.email}</td>
                <td>{admin.address}</td>
                <td>{admin.roles === 0 ? "Admin" : "Người dùng"}</td>
                <td className="text-center">{admin.id}</td>
             </tr>
             ))}
          </tbody>
       </table>

    </section>
 </div>);
}

export default Admin;