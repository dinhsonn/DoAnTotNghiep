import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CategoryServices from "../../../services/CategoryServices";
function CategoryOptionShow() {
   let { id } = useParams();
   const [categoryoptions, setCategoryOptions] = useState([]);
   const [categoryname, setCategoryname] = useState([]);
   useEffect(() => {
      loadCategoryOption();
    }, [id]);

 const loadCategoryOption = async () => {
    try {
       const response = await CategoryServices.categoryOptionById(id);
       setCategoryOptions(response.data);
       setCategoryname(response.data.categoryId.name);
    } catch (error) {
       console.error("Error loading sale:", error);
    }
 };

 if (!categoryoptions) {
    return <div>Loading...</div>;
 }
    return (    
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chi tiết</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <a href="topic_index.html" className="btn btn-primary btn-sm">
                <i className="fa fa-arrow-left"></i> Về danh sách
             </a>
             <a href="topic_edit.html" className="btn btn-success btn-sm">
                <i className="fa fa-edit"></i> Sửa
             </a>
             <a href="topic_index.html" className="btn btn-danger btn-sm">
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
              <td>{categoryoptions.id}</td>
            </tr>
            <tr>
              <td>Tên option</td>
              <td>{categoryoptions.name}</td>
            </tr>
            <tr>
              <td>ID danh mục</td>
              <td>{categoryname}</td>
            </tr>
            <tr>
              <td>Trạng thái</td>
              <td>{categoryoptions.status === 0 ? "Xuất bản" : "Chưa xuất bản"}</td>
            </tr>
          </tbody>
        </table>

    </section>
 </div> );
}

export default CategoryOptionShow;