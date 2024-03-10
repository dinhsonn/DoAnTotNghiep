import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SliderServices from "../../../services/SliderServices";
function SliderShow() {
   let { id } = useParams();
   const [sliders, setSliders] = useState({});

   useEffect(() => {
      SliderServices.getById(id)
           .then(response => {
            setSliders(response.data);

           })
           .catch(error => {
               console.error('Error fetching user data:', error);
           });
   }, [id]);
   const getImgUrl = (imageName) => {
      const endpoint = 'sliders'; 
      return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
    return (
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Chi tiết</h1>
           <div className="row mt-2 align-items-center">
              <div className="col-md-12 text-end">
                 <Link to={"/slider"} className="btn btn-primary btn-sm m-1">
                    <i className="fa fa-arrow-left"></i> Về danh sách
                 </Link>
                 <Link to="banner_edit.html" className="btn btn-success btn-sm m-1">
                    <i className="fa fa-edit"></i> Sửa
                 </Link>
                 <Link to="banner_index.html" className="btn btn-danger btn-sm m-1">
                    <i className="fa fa-trash"></i> Xóa
                 </Link>
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
                    <td><img src={getImgUrl(sliders.image)} alt={sliders.image} style={{width: '200px'}}/></td>
                 </tr>
                 <tr>
                    <td>Id</td>
                    <td>{sliders.id}</td>
                 </tr>
                 <tr>
                    <td>Tên slider</td>
                    <td>{sliders.name}</td>
                 </tr>
                 <tr>
                    <td>Liên kết</td>
                    <td>{sliders.link}</td>
                 </tr>
                 <tr>
                    <td>Trạng thái</td>
                    <td>{sliders.status === 0 ? 'Xuất bản' : 'Chưa xuất bản'}</td>
                 </tr>
                 <tr>
                    <td>Vị trí</td>
                    <td>{sliders.position}</td>
                 </tr>
              </tbody>
           </table>

        </section>
     </div>
     );
}

export default SliderShow;