import { useEffect, useState } from "react";
import ProductServices from "../../../services/ProductServices";
import { useParams } from "react-router-dom";
function ProductOptionEdit() {
   let { id } = useParams();
   const [productoptions, setProductOptions] = useState([]);
   const [products, setProducts] = useState([]);
   const [formData, setFormData] = useState({
     name: "",
     productId: "",
     status: "0",
   });

   useEffect(() => {
       ProductServices.productOptionById(id)
           .then(response => {
               setFormData(response.data);
           })
           .catch(error => {
               console.error('Error fetching category data:', error);
           });
           
           ProductServices.productOption()
           .then(response => {
               setProductOptions(response.data.content);
           })
           .catch(error => {
               console.error('Error fetching categories:', error);
           });
   }, [id]);
   useEffect(() => {
      ProductServices.getAll()
        .then((response) => {
          setProducts(response.data.content);
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
       ProductServices.productOptionUpdate(formData, id)
           .then(response => {
               console.log("Updated topic:", response.data);
               alert('Option sản phẩm đã được cập nhật thành công!')
           })
           .catch(error => {
               console.error('Error updating category:', error);
           });
   };
    return (    
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Cập nhật Option sản phẩm</h1>
       <div className="text-end">
          <a className="btn btn-sm btn-primary" href="/productoption">Về danh sách</a>
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
                   <select name="productId" className="form-select" onChange={handleChange} value={formData.productId.id}>
                      {products.map(product => (
                         <option  value={product.id}>{product.name}</option>
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

export default ProductOptionEdit;