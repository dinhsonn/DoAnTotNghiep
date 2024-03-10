import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BrandServices from "../../../services/BrandServices";
function BrandShow() {
   let { id } = useParams();
   const [brand, setBrand] = useState({});
   useEffect(() => {
      BrandServices.getById(id)
           .then(response => {
            setBrand(response.data);

           })
           .catch(error => {
               console.error('Error fetching user data:', error);
           });
   }, [id]);
   const getImgUrl = (imageName) => {
      const endpoint = 'brand'; 
      return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Chi tiết</h1>
           <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
                 <a href="brand_index.html" className="btn btn-primary btn-sm">
                    <i className="fa fa-arrow-left"></i> Về danh sách
                 </a>
                 <a href="brand_edit.html" className="btn btn-success btn-sm">
                    <i className="fa fa-edit"></i> Sửa
                 </a>
                 <a href="brand_index.html" className="btn btn-danger btn-sm">
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
                    <td>Hình ảnh</td>
                    <td><img src={getImgUrl(brand.image)} alt={brand.image} style={{width: '200px'}}/></td>
                 </tr>
                 <tr>
                    <td>Id</td>
                    <td>{brand.id}</td>
                 </tr>
                 <tr>
                    <td>Tên thương hiệu</td>
                    <td>{brand.name}</td>
                 </tr>
                 <tr>
                    <td>Thứ tự</td>
                    <td>{brand.sortOrder}</td>
                 </tr>
                 <tr>
                    <td>Trạng thái</td>
                    <td>{brand.status === 0 ? 'Xuất bản' : 'Chưa xuất bản'}</td>
                 </tr>
      
              </tbody>
           </table>

        </section>
     </div>
     );
}

export default BrandShow;