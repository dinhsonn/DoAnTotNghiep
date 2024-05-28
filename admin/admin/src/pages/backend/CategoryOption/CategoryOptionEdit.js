import { useEffect, useState } from "react";
import CategoryServices from "../../../services/CategoryServices";
import { useParams } from "react-router-dom";
function CategoryyOptionEdit() {
   let { id } = useParams();
   const [categoryoptions, setCategoryOptions] = useState([]);
   const [categories, setCategories] = useState([]);
   const [formData, setFormData] = useState({
     name: "",
     categoryId: "",
     status: "0",
   });

   useEffect(() => {
      CategoryServices.categoryOptionById(id)
           .then(response => {
               setFormData(response.data);
           })
           .catch(error => {
               console.error('Error fetching category data:', error);
           });
           
           CategoryServices.categoryOption()
           .then(response => {
               setCategoryOptions(response.data.content);
           })
           .catch(error => {
               console.error('Error fetching categories:', error);
           });
   }, [id]);
   useEffect(() => {
      CategoryServices.getAll()
        .then((response) => {
          setCategories(response.data.content);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData(prevState => ({
           ...prevState,
           [name]: value
       }));
   };

   const handleSubmit = (e) => {
       e.preventDefault();
       CategoryServices.categoryOptionUpdate(formData, id)
           .then(response => {
               console.log("Updated category option:", response.data);
               alert('Option danh mục đã được cập nhật thành công!')
           })
           .catch(error => {
               console.error('Error updating category:', error);
           });
   };
    return (    
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Cập nhật Option danh mục</h1>
       <div className="text-end">
          <a className="btn btn-sm btn-primary" href="/categoryoption">Về danh sách</a>
       </div>
    </section>
    <section className="content-body my-2">
      <form onSubmit={handleSubmit}> 
       <div className="row">
          <div className="col-md-9">
             <div className="mb-3">
                <label><strong>Tên option sản phẩm (*)</strong></label>
                <input type="text" name="name" id="name" placeholder="Nhập tên chủ đề"
                   className="form-control" required onChange={handleChange} value={formData.name}/>
             </div>
          </div>
          <div className="col-md-3">
             <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                   <strong>ID sản phẩm</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                   <p>Chọn ID sản phẩm</p>
                   <select name="productId" className="form-select" onChange={handleChange} value={formData.categoryId.id}>
                      {categories.map(category => (
                         <option  value={category.id}>{category.name}</option>
                     ))}
                   </select>
                </div>
             </div>
             <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                   <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                   <p>Chọn trạng thái đăng</p>
                   <select name="status" className="form-select"onChange={handleChange} value={formData.status}>
                      <option value="0">Xuất bản</option>
                      <option value="1">Chưa xuất bản</option>
                   </select>
                </div>
                <div className="box-footer text-end px-2 py-3">
                   <button type="submit" className="btn btn-success btn-sm text-end">
                      <i className="fa fa-save" aria-hidden="true"></i> Đăng
                   </button>
                </div>
             </div>
          </div>
       </div>
       </form>
    </section>
 </div>);
}

export default CategoryyOptionEdit;