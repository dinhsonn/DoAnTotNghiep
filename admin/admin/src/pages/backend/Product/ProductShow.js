import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductServices from "../../../services/ProductServices";

function SaleShow() {
   let { id } = useParams();
   const [products, setProducts] = useState(null);

   useEffect(() => {
      loadSale();
   }, [id]);

   const loadSale = async () => {
      try {
         const response = await ProductServices.getById(id);
         setProducts(response.data);
      } catch (error) {
         console.error("Error loading sale:", error);
      }
   };

   if (!products) {
      return <div>Loading...</div>;
   }

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết </h1>
            <div className="text-end">
               <Link to="/sale" className="btn btn-sm btn-success">
                  <i className="fa fa-arrow-left"></i> Về danh sách
               </Link>
            </div>   
         </section>
         <section className="content-body my-2">
            <table className="table table-bordered sale-table">
               <thead>
                  <tr>
                     <th style={{ width: '180px' }}>Tên trường</th>
                     <th>Giá trị</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td>ID</td>
                     <td>{products.id}</td>
                  </tr>
                  <tr>
                     <td>Sản phẩm</td>
                     <td>{products.name}</td>
                  </tr>
                  <tr>
                     <td>Giá</td>
                     <td>{products.price}</td>
                  </tr>
                  <tr>
                     <td>Mô tả</td>
                     <td>{products.description}</td>
                  </tr>
                  <tr>
                     <td>Bảo hành</td>
                     <td>{products.warranty}</td>
                  </tr>
                  <tr>
                     <td>Thông số kĩ thuật</td>
                     <td>{products.specifications}</td>
                  </tr>
                  <tr>
                     <td>Thương hiệu</td>
                     <td>{products.brandId.name}</td>
                  </tr>
                  <tr>
                     <td>Danh mục</td>
                     <td>{products.categoryId.name}</td>
                  </tr>
                  <tr>
                     <td>Option danh mục</td>
                     <td>{products.categoryOption.name}</td>
                  </tr>
                  <tr>
                     <td>Giá trị option danh mục</td>
                     <td>{products.categoryOptionValue.value}</td>
                  </tr>
                
         
           
               </tbody>
            </table>
         </section>
      </div>
   );
}

export default SaleShow;
