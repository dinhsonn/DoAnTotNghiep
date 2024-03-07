import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserServices from "../../../services/UserServices";
function AdminShow() {
   let { id } = useParams();
   const [admins, setAdmins] = useState({});

   useEffect(() => {
       UserServices.getById(id)
           .then(response => {
            setAdmins(response.data);
               console.log("Chithanh",response.data);
           })
           .catch(error => {
               console.error('Error fetching user data:', error);
           });
   }, [id]);

    return ( 
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chi tiết</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <Link to={'/admin'} className="btn btn-primary btn-sm m-1">
                <i className="fa fa-arrow-left"></i> Về danh sách
             </Link>
             <Link to="user_edit.html" className="btn btn-success btn-sm m-1">
                <i className="fa fa-edit"></i> Sửa
             </Link>
             <Link to="#" className="btn btn-danger btn-sm m-1">
                <i className="fa fa-trash"></i> Xóa
             </Link>
          </div>
       </div>
    </section>
    <section className="content-body my-2">

       <table className="table table-bordered">
          <thead>
             <tr>
                <th style={{width: '180px'}}>Tên trường</th>
                <th>Giá trị</th>
             </tr>
          </thead>
         
          <tbody>
             <tr>
                <td>Id</td>
                <td>{admins.id}</td>
             </tr>
             <tr>
                <td>Họ và tên</td>
                <td>{admins.name}</td>
             </tr>
             <tr>
                <td>Ngày sinh</td>
                <td>{admins.birthday}</td>
             </tr>
             <tr>
                <td>Giới tính</td>
                <td>{admins.sex}</td>
             </tr>
             <tr>
                <td>Điện thoại</td>
                <td>{admins.phone}</td>
             </tr>
             <tr>
                <td>Địa chỉ</td>
                <td>{admins.address}</td>
             </tr>
             <tr>
                <td>Email</td>
                <td>{admins.email}</td>
             </tr>
             <tr>
                <td>Vai trò</td>
                <td>{admins.roles}</td>
             </tr>
             <tr>
                <td>Trạng thái</td>
                <td>{admins.status}</td>
             </tr>
          </tbody>
        
       </table>
  
    </section>
 </div> );
}

export default AdminShow;