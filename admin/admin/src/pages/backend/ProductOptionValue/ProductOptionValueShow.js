import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductServices from "../../../services/ProductServices";
function ProductOptionValueShow() {
   let { id } = useParams();
   const [productoptionvalues, setProductOptionValues] = useState([]);
   const [productname, setProductname] = useState([]);
   useEffect(() => {
    loadProductOptionValue();
    }, [id]);

 const loadProductOptionValue = async () => {
    try {
       const response = await ProductServices.productOptionValueById(id);
       setProductOptionValues(response.data);
      setProductname(response.data.option.name);
    } catch (error) {
       console.error("Error loading sale:", error);
    }
 };

 if (!productoptionvalues) {
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
              <td>{productoptionvalues.id}</td>
            </tr>
            <tr>
              <td>Tên giá trị option</td>
              <td>{productoptionvalues.value}</td>
            </tr>
            <tr>
              <td>ID Option</td>
              <td>{productname}</td>
            </tr>
          
          </tbody>
        </table>

    </section>
 </div> );
}

export default ProductOptionValueShow;