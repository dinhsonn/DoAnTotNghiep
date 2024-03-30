import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MenuServices from "../../../services/MenuServices";

function MenuShow() {
   let { id } = useParams();
   const [menuData, setMenuData] = useState({});

   useEffect(() => {
      MenuServices.getById(id)
           .then(response => {
            setMenuData(response.data);
           })
           .catch(error => {
               console.error('Error fetching banner data:', error);
           });
   }, [id]);
    return (     
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Chi tiết</h1>
       <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <a href="menu_index.html" className="btn btn-primary btn-sm">
                <i className="fa fa-arrow-left"></i> Về danh sách
             </a>
             <a href="menu_edit.html" className="btn btn-success btn-sm">
                <i className="fa fa-edit"></i> Sửa
             </a>
             <a href="menu_index.html" className="btn btn-danger btn-sm">
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
                <td>{menuData.id}</td>
             </tr>
             <tr>
                <td>Đường dẫn</td>
                <td>{menuData.link}</td>
             </tr>
             <tr>
                <td>Loại</td>
                <td>{menuData.type ==="0" ?"MainMenu":"FooterMenu"}</td>
             </tr>
             <tr>
                <td>Vị trí</td>
                <td>{menuData.position}</td>
             </tr>
             <tr>
                <td>Menu Cha</td>
                <td>{menuData.parentId}</td>
             </tr>
             <tr>
                <td>Trạng thái</td>
                <td>{menuData.status}</td>
             </tr>
          </tbody>
       </table>

    </section>
 </div> );
}

export default MenuShow;