import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserServices from "../../../services/UserServices";
function CustomerShow() {
   let { id } = useParams();
   const [customers, setCustomers] = useState({});

   useEffect(() => {
       UserServices.getById(id)
           .then(response => {
            setCustomers(response.data);
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
               <Link to={'/customers'} className="btn btn-primary btn-sm m-1">
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
                  <td>{customers.id}</td>
               </tr>
               <tr>
                  <td>Họ và tên</td>
                  <td>{customers.name}</td>
               </tr>
               <tr>
                  <td>Ngày sinh</td>
                  <td>{customers.birthday}</td>
               </tr>
               <tr>
                  <td>Giới tính</td>
                  <td>{customers.sex===0? "Nữ":"Nam"}</td>
               </tr>
               <tr>
                  <td>Điện thoại</td>
                  <td>{customers.phone}</td>
               </tr>
               <tr>
                  <td>Địa chỉ</td>
                  <td>{customers.address}</td>
               </tr>
               <tr>
                  <td>Email</td>
                  <td>{customers.email}</td>
               </tr>
               <tr>
                  <td>Vai trò</td>
                  <td>{customers.roles===0? "Admin":"Customer"}</td>
               </tr>
               <tr>
                  <td>Trạng thái</td>
                  <td>{customers.status==="0"? "Xuất bản":"Chưa xuất bản"}</td>
               </tr>
            </tbody>
          
         </table>
    
      </section>
   </div> );
}

export default CustomerShow;