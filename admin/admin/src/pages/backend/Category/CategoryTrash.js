import React, { useEffect, useState } from 'react';
import TrashServices from "../../../services/TrashServices";
import CategoryService from '../../../services/CategoryServices';
import { Link } from "react-router-dom";

function CategoryTrash() {
   const [categories, setCategories] = useState([]);

   useEffect(() => {
      loadCategory();
   }, []);

   const loadCategory = async () => {
      try {
         const response = await TrashServices.getAllCategory();
         setCategories(response.data.content);
         console.log("Danh sách banner trong thùng rác:", response.data.content);
      } catch (error) {
         console.error("Lỗi khi tải danh sách banner từ thùng rác:", error);
      }
   };

   const removeCategory = async (id) => {
      try {
         await TrashServices.removeCategory(id);
         setCategories(categories.filter((category) => category.id !== id));
         console.log("Banner đã được xóa thành công");
         alert("Banner đã được xóa!");
      } catch (error) {
         console.error("Lỗi khi xóa banner:", error);
      }
   };

   const restoreCategory = async (id) => {
      try {
         const cateToRestore = categories.find(category => category.id === id);
         await CategoryService.create(cateToRestore);
         await TrashServices.removeCategory(id);
         setCategories(categories.filter((category) => category.id !== id));
         console.log("Danh mục đã được khôi phục thành công");
         alert("Danh mục đã được khôi phục!");
      } catch (error) {
         console.error("Lỗi khi khôi phục danh mục:", error);
      }
   };

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thùng rác danh mục</h1>
            <div className="row mt-3 align-items-center">
               <div className="col-6">
                  <ul className="manager">
                     <li><a href="/category">Tất cả (123)</a></li>
                     <li><a href="#">Xuất bản (12)</a></li>
                     <li><a href="/category/trash">Rác (12)</a></li>
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
                  <select name="" className="d-inline me-1">
                     <option value="">Tất cả vị trí</option>
                  </select>
                  <button className="btnfilter">Lọc</button>
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
                     <th className="text-center" style={{ width: '30px' }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th>Tên danh mục</th>
                     <th>Thứ tự</th>
                     <th className="text-center" style={{ width: '100px' }}>Hành động</th>
                  </tr>
               </thead>
               <tbody>
                  {categories.map((category) => (
                     <tr key={category.id} className="datarow">
                        <td className="text-center">
                           <input type="checkbox" id="checkId" />
                        </td>
                        <td>
                           <div className="name">
                              <Link to={`/categories/${category.id}`}>
                                 {category.name}
                              </Link>
                           </div>
                        </td>
                        <td>{category.sortOrder}</td>
                        <td className="text-center">
                           <div className="function_style">
                              <a href="#" className="text-primary mx-1" onClick={() => restoreCategory(category.id)}>
                                 <i className="fa fa-undo"></i>
                              </a>
                              <a href="#" className="text-danger mx-1" onClick={() => removeCategory(category.id)}>
                                 <i className="fa fa-trash"></i>
                              </a>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </section>
      </div>
   );
}

export default CategoryTrash;
