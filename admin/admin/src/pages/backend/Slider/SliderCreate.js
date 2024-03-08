import { useState } from "react";
import SliderService from "../../../services/SliderServices";
import ImageUpload from "../../../ImageUpload";
import axios from 'axios';
function SliderCreate() {
   const [formData, setFormData] = useState({
      name: '',
      link: '',
      position: '',
      sort_order: '1',
      image: null,
      status: '',
  });
  const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData({ ...formData, [name]: value });
  };
  const handleImageUpload = (imageName) => {
   setFormData({ ...formData, image: imageName });
};
  const handleSubmit = (e) => {
   e.preventDefault();
   SliderService.create(formData)
       .then(response => {
       
           console.log('Tạo mới slider thành công:', response.data);
            alert('Thêm Slider thành công!')
       })
       .catch(error => {
           console.error('Lỗi khi tạo mới người dùng:', error);
       });
};
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Thêm slider</h1>
           <div className="text-end">
              <a href="banner_index.html" className="btn btn-sm btn-success">
                 <i className="fa fa-arrow-left"></i> Về danh sách
              </a>
           </div>
        </section>
        <section className="content-body my-2">
           <div className="row">
              <div className="col-md-9">
                 <div className="mb-3">
                    <label><strong>Tên slider (*)</strong></label>
                    <input type="text" name="name" className="form-control" placeholder="Nhập tên slider" onChange={handleChange} value={formData.username}/>
                 </div>
                 <div className="mb-3">
                    <label><strong>Liên kết</strong></label>
                    <input type="text" name="link" className="form-control" placeholder="Nhập liên kết" onChange={handleChange} value={formData.link}/>
                 </div>
                 <div className="mb-3">
                    <label><strong>Mô tả (*)</strong></label>
                    <textarea name="description" rows="5" className="form-control"
                       placeholder="Nhập mô tả"></textarea>
                 </div>
              </div>
              <div className="col-md-3">
                 <div className="box-container mt-4 bg-white">
                    <div className="box-header py-1 px-2 border-bottom">
                       <strong>Đăng</strong>
                    </div>
                    <div className="box-body p-2 border-bottom">
                       <p>Chọn trạng thái đăng</p>
                       <select name="status" className="form-select" onChange={handleChange} value={formData.status}>
                          <option value="1">Xuất bản</option>
                          <option value="2">Chưa xuất bản</option>
                       </select>
                    </div>
                    <div className="box-footer text-end px-2 py-3">
                       <button type="submit" className="btn btn-success btn-sm text-end" onClick={handleSubmit}>
                          <i className="fa fa-save" aria-hidden="true"></i> Đăng
                       </button>
                    </div>
                 </div>
                 <div className="box-container mt-4 bg-white">
                    <div className="box-header py-1 px-2 border-bottom">
                       <strong>Vị trí (*)</strong>
                    </div>
                    <div className="box-body p-2 border-bottom">
                       <select name="position" className="form-select" onChange={handleChange} value={formData.position}>
                          <option>Chọn vị trí</option>
                          <option value="1">Slide Show</option>
                          <option value="2">Quảng cáo</option>
                       </select>
                       <p className="pt-2">Vị trí hiển thị banner</p>
                    </div>
                 </div>
                 <div className="box-container mt-4 bg-white">
                    <div className="box-header py-1 px-2 border-bottom">
                       <strong>Hình (*)</strong>
                    </div>
                    <div className="box-body p-2 border-bottom">
                       {/* <input type="file" name="image" className="form-control" onChange={handleChange} value={formData.image}/> */}
                       <ImageUpload onImageUpload={handleImageUpload} />
                    </div>
                 </div>
              </div>
           </div>
        </section>
     </div> );
}

export default SliderCreate;