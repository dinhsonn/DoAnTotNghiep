import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryServices from "../../../services/CategoryServices";

function CategoryShow() {
   let { id } = useParams();
   const [category, setCategory] = useState({});
   const [parentCategory, setParentCategory] = useState(null);

   useEffect(() => {
      CategoryServices.getById(id)
          .then(response => {
            setCategory(response.data);
            // Kiểm tra nếu category có parentId thì lấy thông tin của danh mục cha
            if (response.data.parentId) {
              CategoryServices.getById(response.data.parentId)
                .then(parentResponse => {
                  setParentCategory(parentResponse.data);
                })
                .catch(error => {
                  console.error('Error fetching parent category data:', error);
                });
            }
          })
          .catch(error => {
              console.error('Error fetching category data:', error);
          });
  }, [id]);
  
  return (  
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Chi tiết</h1>
        <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
            <Link to="/category" className="btn btn-primary btn-sm">
              <i className="fa fa-arrow-left"></i> Về danh sách
            </Link>
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
              <td>{category.id}</td>
            </tr>
            <tr>
              <td>Tên danh mục</td>
              <td>{category.name}</td>
            </tr>
            <tr>
              <td>Danh mục cha</td>
              <td>{parentCategory ? parentCategory.name : "None"}</td>
            </tr>
            <tr>
              <td>Thứ tự</td>
              <td>{category.sortOrder}</td>
            </tr>
            <tr>
              <td>Trạng thái</td>
              <td>{category.status === 0 ? "Xuất bản" : "Chưa xuất bản"}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default CategoryShow;
