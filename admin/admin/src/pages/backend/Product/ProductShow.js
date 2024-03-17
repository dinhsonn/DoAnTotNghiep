import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductSaleService from "../../../services/SaleServices";

function SaleShow() {
   let { id } = useParams();
   const [sale, setSale] = useState(null);

   useEffect(() => {
      loadSale();
   }, [id]);

   const loadSale = async () => {
      try {
         const response = await ProductSaleService.getById(id);
         setSale(response.data);
      } catch (error) {
         console.error("Error loading sale:", error);
      }
   };

   if (!sale) {
      return <div>Loading...</div>;
   }

   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Chi tiết khuyến mãi</h1>
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
                     <td>{sale.id}</td>
                  </tr>
                  <tr>
                     <td>Sản phẩm</td>
                     <td>{sale.productId.name}</td>
                  </tr>
                  <tr>
                     <td>Giá khuyến mãi</td>
                     <td>{sale.salePrice}</td>
                  </tr>
                  <tr>
                     <td>Số lượng đã bán</td>
                     <td>{sale.quantitySold}</td>
                  </tr>
                  <tr>
                     <td>Ngày bắt đầu</td>
                     <td>{sale.dateStart}</td>
                  </tr>
                  <tr>
                     <td>Ngày kết thúc</td>
                     <td>{sale.dateEnd}</td>
                  </tr>
                  {/* Thêm các trường thông tin khác tương ứng */}
               </tbody>
            </table>
         </section>
      </div>
   );
}

export default SaleShow;
