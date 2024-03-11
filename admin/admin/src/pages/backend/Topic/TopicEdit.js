import { useEffect, useState } from "react";
import TopicServices from "../../../services/TopicServices";
import { useParams } from "react-router-dom";
function TopicEdit() {
   let { id } = useParams();
   const [topics, setTopics] = useState([]);
   const [formData, setFormData] = useState({
      name: "",
      slug: "",
      parentId: "",
      sortOrder: "",
      status: "0",
   });

   useEffect(() => {
       TopicServices.getById(id)
           .then(response => {
               setFormData(response.data);
           })
           .catch(error => {
               console.error('Error fetching category data:', error);
           });
           
           TopicServices.getAll()
           .then(response => {
               setTopics(response.data.content);
           })
           .catch(error => {
               console.error('Error fetching categories:', error);
           });
   }, [id]);

   const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData(prevState => ({
           ...prevState,
           [name]: value
       }));
   };

   const handleSubmit = (e) => {
       e.preventDefault();
       TopicServices.update(formData, id)
           .then(response => {
               console.log("Updated topic:", response.data);
               alert('Chủ đề đã được cập nhật thành công!')
           })
           .catch(error => {
               console.error('Error updating category:', error);
           });
   };
    return (    
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Cập nhật chủ đề</h1>
       <div className="text-end">
          <a className="btn btn-sm btn-primary" href="/topic">Về danh sách</a>
       </div>
    </section>
    <section className="content-body my-2">
      <form onSubmit={handleSubmit}> 
       <div className="row">
          <div className="col-md-9">
             <div className="mb-3">
                <label><strong>Tên chủ đề (*)</strong></label>
                <input type="text" name="name" id="name" placeholder="Nhập tên chủ đề"
                   className="form-control" required onChange={handleChange} value={formData.name}/>
             </div>
             <div className="mb-3">
                <label><strong>Tên đường dẫn</strong></label>
                <input type="text" name="slug" id="slug" placeholder="Nhập slug" className="form-control" onChange={handleChange} value={formData.slug}/>
             </div>
          </div>
          <div className="col-md-3">
             <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                   <strong>Danh mục cha</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                   <p>Chọn danh mục cha</p>
                   <select name="status" className="form-select" onChange={handleChange} value={formData.parentId}>
                      <option value="">None</option>
                      {topics.map(topic => (
                         <option key={topic.id} value={topic.id}>{topic.name}</option>
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
             <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                   <strong>Thứ tự</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                <input type="text" name="sortOrder" id="sortOrder" placeholder="Nhập thứ tự"
                   className="form-control" onChange={handleChange} value={formData.sortOrder} required />
                </div>
             </div>
          </div>
       </div>
       </form>
    </section>
 </div>);
}

export default TopicEdit;