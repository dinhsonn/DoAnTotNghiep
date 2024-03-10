import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryServices from "../../../services/CategoryServices";

function CategoryShow() {
   let { id } = useParams();
   const [categories, setCategories] = useState({});
   useEffect(() => {
      CategoryServices.getById(id)
          .then(response => {
            setCategories(response.data);
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
                 <a href="/category" className="btn btn-primary btn-sm">
                    <i className="fa fa-arrow-left"></i> Về danh sách
                 </a>
                 <a href="category_edit.html" className="btn btn-success btn-sm">
                    <i className="fa fa-edit"></i> Sửa
                 </a>
                 <a href="category_index.html" className="btn btn-danger btn-sm">
                    <i className="fa fa-trash"></i> Xóa
                 </a>
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
                    <td>{categories.id}</td>
                 </tr>
                 <tr>
                    <td>Tên danh mục</td>
                    <td>{categories.name}</td>
                 </tr>
                 <tr>
                    <td>Parent_id</td>
                    <td>{categories.parentId}</td>
                 </tr>
                 <tr>
                    <td>Thứ tự</td>
                    <td>{categories.sortOrder}</td>
                 </tr>
                 <tr>
                    <td>Trạng thái</td>
                    <td>{categories.status}</td>
                 </tr>
              </tbody>
           </table>

        </section>
     </div>
    );
}

export default CategoryShow;