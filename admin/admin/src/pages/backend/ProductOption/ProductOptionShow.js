import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductServices from "../../../services/ProductServices";
function ProductOptionShow() {
   let { id } = useParams();
   const [productoptions, setProductOptions] = useState([]);
   const [productname, setProductname] = useState([]);
   useEffect(() => {
    loadProductOption();
    }, [id]);

 const loadProductOption = async () => {
    try {
       const response = await ProductServices.productOptionById(id);
       setProductOptions(response.data);
       setProductname(response.data.productId.name);
    } catch (error) {
       console.error("Error loading sale:", error);
    }
 };

 if (!productoptions) {
    return <div>Loading...</div>;
 }
    return (    
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chi tiết</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <a href="/productoption" className="btn btn-primary btn-sm">
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
              <td>{productoptions.id}</td>
            </tr>
            <tr>
              <td>Tên option</td>
              <td>{productoptions.name}</td>
            </tr>
            <tr>
              <td>ID sản phẩm</td>
              <td>{productname}</td>
            </tr>
            <tr>
              <td>Trạng thái</td>
              <td>{productoptions.status === 0 ? "Xuất bản" : "Chưa xuất bản"}</td>
            </tr>
          </tbody>
        </table>

    </section>
 </div> );
}

export default ProductOptionShow;