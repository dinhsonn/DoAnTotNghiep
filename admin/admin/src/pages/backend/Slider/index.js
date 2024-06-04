import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SliderService from "../../../services/SliderServices";
import TrashServices from "../../../services/TrashServices";


function Slider() {
   const [sliders, setSliders] = useState([]);
   const [searchTerm, setSearchTerm] = useState(""); 
   const handleSearch = (event) => {
     setSearchTerm(event.target.value); 
   };
 
   const filteredSlider = sliders.filter((slider) =>
      slider.name.toLowerCase().includes(searchTerm.toLowerCase())
   );   useEffect(() => {
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
   const removeSlider = async (id) => {
      try {
         await SliderService.remove(id);
         const sliderToMoveToTrash = sliders.find(slider => slider.id === id);
         await TrashServices.createBrand(sliderToMoveToTrash);
         setSliders(sliders.filter(slider => slider.id !== id));
 
         console.log("Slider deleted successfully");
         alert("Slider đã được xóa!");
     } catch (error) {
       console.error("Error deleting product:", error);
     }
 };
      
    //image
    const getImgUrl = (imageName) => {
      const endpoint = 'sliders'; 
      let imageUrl = `http://localhost:8082/api/${endpoint}/image/${imageName}`;
      
      imageUrl = imageUrl.replace(/\.png/g, "") + ".png";
  
      return imageUrl;
  };
    return ( 
        <div className="content">
        <section className="content-header my-2">
           <h1 className="d-inline">Slider</h1>
           <Link className="btn-add" to={"/slider/create"}>Thêm mới</Link>
           <div className="row mt-3 align-items-center">
              <div className="col-6">
                 <ul className="manager">
                    <li><Link to="/slider">Tất cả ({sliders.length})</Link></li>
                    <li><Link to="/slider/trash">Rác</Link></li>
                 </ul>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="search d-inline"
                  onChange={handleSearch} // Thêm sự kiện onChange cho ô tìm kiếm
                />
                <button className="d-inline">Tìm kiếm</button>
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
                    <th>Thứ tự</th>
                    <th>Liên kết</th>
                    <th className="text-center" style={{width: '30px'}}>ID</th>
                 </tr>
              </thead>
              <tbody>
               {filteredSlider.map((slider,index)=>(
                 <tr className="datarow">
                    <td className="text-center">
                       <input type="checkbox" />
                    </td>
                    <td >
                       <img src={getImgUrl(slider.image)} alt={slider.image} style={{width: '180px'}}/>
                    </td>
                    <td>
                       <div className="name">
                          <a>
                             {slider.name}
                          </a>
                       </div>
                       <div className="function_style">
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
                    <td>{slider.sortOrder}</td>
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