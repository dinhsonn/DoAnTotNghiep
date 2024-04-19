import { useEffect, useState } from "react";
import CategoryServices from "../../../services/CategoryServices";
import { useParams } from "react-router-dom";
function CategoryOptionValueEdit() {
   let { id } = useParams();
   const [categoryoptionvalues, setCategoryOptionValues] = useState([]);
   const [categoryoptions, setCategoryoptions] = useState([]);
   const [formData, setFormData] = useState({
      value: "",
      option: "",
   });

   useEffect(() => {
      CategoryServices.categoryOptionValueById(id)
           .then(response => {
               setFormData(response.data);
           })
           .catch(error => {
               console.error('Error fetching category data:', error);
           });
           
           CategoryServices.removeCategoryOptionValue()
           .then(response => {
               setCategoryOptionValues(response.data.content);
           })
           .catch(error => {
               console.error('Error fetching categories:', error);
           });
   }, [id]);
   useEffect(() => {
      CategoryServices.categoryOption()
        .then((response) => {
          setCategoryoptions(response.data.content);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
    const handleChange = (e) => {
      const { name, value } = e.target;
    
      if (name === "option") {
        const selectedOption = categoryoptions.find(option => option.id === parseInt(value));
        setFormData({
          ...formData,
          [name]: selectedOption,
        });
      } else {
        setFormData({
          ...formData,
          [name]: value,
        });
      }
    };

   const handleSubmit = (e) => {
       e.preventDefault();
       CategoryServices.categoryOptionValueUpdate(formData, id)
           .then(response => {
               alert('Giá trị Option danh mục đã được cập nhật thành công!')
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
          <a className="btn btn-sm btn-primary" href="/topic">Về danh sách</a>
       </div>
    </section>
    <section className="content-body my-2">
      <form onSubmit={handleSubmit}> 
       <div className="row">
          <div className="col-md-9">
             <div className="mb-3">
                <label><strong>Tên giá trị option sản phẩm (*)</strong></label>
                <input type="text" name="name" id="name" placeholder="Nhập tên chủ đề"
                   className="form-control" required onChange={handleChange} value={formData.value}/>
             </div>
          </div>
          <div className="col-md-3">
             <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                   <strong>ID sản phẩm</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                   <p>Chọn ID sản phẩm</p>
                   <select name="option" className="form-select" onChange={handleChange} value={formData.option.id}>
                      {categoryoptions.map(categoryoption => (
                         <option  value={categoryoption.id}>{categoryoption.name}</option>
                     ))}
                   </select>
                </div>
             </div>
             <div className="box-container mt-4 bg-white">
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

export default CategoryOptionValueEdit;