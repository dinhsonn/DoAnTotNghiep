import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserServices from "../../../services/UserServices";
import swal from "sweetalert2";
function AdminCreate() {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      address: '',
      sex: '',
      birthday: '',
      roles: '0',
      status: ''
  });
  const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
   e.preventDefault();
   UserServices.create(formData)
       .then(response => {      
           console.log('Tạo mới người dùng thành công:', response.data);
            alert('Thêm thành viên thành công!')
       })
       .catch(error => {
           console.error('Lỗi khi tạo mới người dùng:', error);
       });
};
    return (
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Thêm thành viên</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <button className="btn btn-success btn-sm m-1" name="THEM" onClick={handleSubmit}>
                <i className="fa fa-save"></i> Lưu [Thêm]
             </button>
             <Link to={"/admin"} className="btn btn-primary btn-sm m-1">
                <i className="fa fa-arrow-left"></i> Về danh sách
             </Link>
          </div>
       </div>
    </section>
    <section className="content-body my-2">
       <form action="" method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="row">
             <div className="col-md-6">
                <div className="mb-3">
                   <label><strong>Tên đăng nhập(*)</strong></label>
                   <input type="text" name="username" className="form-control" placeholder="Tên đăng nhập" onChange={handleChange} value={formData.username}/>
                </div>
                <div className="mb-3">
                   <label><strong>Mật khẩu(*)</strong></label>
                   <input type="password" name="password" className="form-control" placeholder="Mật khẩu" onChange={handleChange} value={formData.password}/>
                </div>
                <div className="mb-3">
                   <label><strong>Xác nhận mật khẩu(*)</strong></label>
                   <input type="password" name="re_password" className="form-control"
                      placeholder="Xác nhận mật khẩu" />
                </div>
                <div className="mb-3">
                   <label><strong>Email(*)</strong></label>
                   <input type="text" name="email" className="form-control" placeholder="Email" onChange={handleChange} value={formData.email}/>
                </div>
                <div className="mb-3">
                   <label><strong>Xác nhận email(*)</strong></label>
                   <input type="text" name="re_email" className="form-control" placeholder="Xác nhận email" />
                </div>
                <div className="mb-3">
                   <label><strong>Điện thoại(*)</strong></label>
                   <input type="text" name="phone" className="form-control" placeholder="Điện thoại" onChange={handleChange} value={formData.phone}/>
                </div>
             </div>
             <div className="col-md-6">
                <div className="mb-3">
                   <label><strong>Họ tên (*)</strong></label>
                   <input type="text" name="name" className="form-control" placeholder="Họ tên" onChange={handleChange} value={formData.name}/>
                </div>
                <div className="mb-3">
                   <label><strong>Giới tính</strong></label>
                   <select name="sex" id="sex" className="form-select" onChange={handleChange} value={formData.sex}>
                      <option> Chọn giới tinh</option>
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
                   </select>
                </div>
                <div className="mb-3">
                   <label><strong>Ngày sinh</strong></label>
                   <input type="date" name="birthday" className="form-control" placeholder="Ngày sinh" onChange={handleChange} value={formData.birthday}/>
                </div>
                <div className="mb-3">
                   <label><strong>Địa chỉ</strong></label>
                   <input type="text" name="address" className="form-control" placeholder="Địa chỉ" onChange={handleChange} value={formData.address}/>
                </div>
                <div className="mb-3">
                   <label><strong>Trạng thái</strong></label>
                   <select name="status" className="form-select"onChange={handleChange} value={formData.status}>
                      <option value="1">Xuất bản</option>
                      <option value="2">Chưa xuất bản</option>
                   </select>
                </div>
             </div>
          </div>
       </form>
    </section>
 </div> );
}

export default AdminCreate;