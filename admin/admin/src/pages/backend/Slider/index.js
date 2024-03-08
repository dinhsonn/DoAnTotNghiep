import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SliderService from "../../../services/SliderServices";


function Slider() {
   const [sliders, setSliders] = useState([]);
   //api này gọi user 
   useEffect(() => {
      SliderService.getAll()
       .then(response => {
         setSliders(response.data.content);
         console.log("data",response.data.content)
       })
       .catch(error => {
         console.error('Error fetching data:', error);
       });
   }, []);
   //xóa sản phẩm
   const removeSlider = (id) => {
      SliderService.remove(id)
        .then(() => {
         setSliders(sliders.filter(slider => slider.id !== id));
          console.log("Slider deleted successfully");
          alert("Slider đã được xóa!")
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    };
    //image
    const getImgUrl = (imageName) => {
      const endpoint = 'sliders'; 
      return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Slider</h1>
           <Link className="btn-add" to={"/slider/create"}>Thêm mới</Link>
           <div className="row mt-3 align-items-center">
              <div className="col-6">
                 <ul className="manager">
                    <li><a href="banner_index.html">Tất cả (123)</a></li>
                    <li><a href="#">Xuất bản (12)</a></li>
                    <li><a href="banner_trash.html">Rác (12)</a></li>
                 </ul>
              </div>
              <div className="col-6 text-end">
                 <input type="text" className="search d-inline" />
                 <button className="d-inline btnsearch">Tìm kiếm</button>
              </div>
           </div>
           <div className="row mt-1 align-items-center">
              <div className="col-md-8">
                 <select name="" className="d-inline me-1">
                    <option value="">Hành động</option>
                    <option value="">Bỏ vào thùng rác</option>
                 </select>
                 <button className="btnapply">Áp dụng</button>
                 <select name="" className="d-inline me-1">
                    <option value="">Tất cả vị trí</option>
                 </select>
                 <button className="btnfilter">Lọc</button>
              </div>
              <div className="col-md-4 text-end">
                 <nav aria-label="Page navigation example">
                    <ul className="pagination pagination-sm justify-content-end">
                       <li className="page-item disabled">
                          <a className="page-link">&laquo;</a>
                       </li>
                       <li className="page-item"><a className="page-link" href="#">1</a></li>
                       <li className="page-item"><a className="page-link" href="#">2</a></li>
                       <li className="page-item"><a className="page-link" href="#">3</a></li>
                       <li className="page-item">
                          <a className="page-link" href="#">&raquo;</a>
                       </li>
                    </ul>
                 </nav>
              </div>
           </div>
        </section>
        <section className="content-body my-2">

           <table className="table table-bordered">
              <thead>
                 <tr>
                    <th className="text-center" style={{width: '30px'}}>
                       <input type="checkbox" id="checkboxAll" />
                    </th>
                    <th className="text-center" style={{width: '130px'}}>Hình ảnh</th>
                    <th>Tên slider</th>
                    <th>Vị trí</th>
                    <th>Liên kết</th>
                    <th className="text-center" style={{width: '30px'}}>ID</th>
                 </tr>
              </thead>
              <tbody>
               {sliders.map((slider,index)=>(
                 <tr className="datarow">
                    <td className="text-center">
                       <input type="checkbox" />
                    </td>
                    <td >
                       <img src={getImgUrl(slider.image)} alt={slider.image} style={{width: '180px'}}/>
                    </td>
                    <td>
                       <div className="name">
                          <a href="banner_edit.html">
                             {slider.name}
                          </a>
                       </div>
                       <div className="function_style">
                          <Link to="#" className="text-success mx-1">
                             <i className="fa fa-toggle-on"></i>
                          </Link>
                          <Link to={`/slider/edit/${slider.id}`} className="text-primary mx-1">
                             <i className="fa fa-edit"></i>
                          </Link>
                          <Link to={`/slider/show/${slider.id}`} className="text-info mx-1">
                             <i className="fa fa-eye"></i>
                          </Link>
                          <Link to="#" className="text-danger mx-1" onClick={() => removeSlider(slider.id)}>
                             <i className="fa fa-trash"></i>
                          </Link>
                       </div>
                    </td>
                    <td>{slider.position}</td>
                    <td>{slider.link}</td>
                    <td className="text-center">{slider.id}</td>
                 </tr>
               ))}
              </tbody>
           </table>

        </section>
     </div>
     );
}

export default Slider;