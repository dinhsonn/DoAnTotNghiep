import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SliderService from "../../../services/SliderServices";
import TrashServices from "../../../services/TrashServices";


function SliderTrash() {
   const [sliders, setSliders] = useState([]);


   useEffect(() => {
      loadTrashSliders();
   }, []);

   const loadTrashSliders = () => {
      TrashServices.getAllSlider()
         .then(response => {
            setSliders(response.data.content);
            console.log("Trash Sliders data", response.data.content);
         })
         .catch(error => {
            console.error('Error fetching trash Sliders:', error);
         });
   };
   const restoreSlider = async (id) => {
      try {
         await TrashServices.removeSlider(id);
         await SliderService.create(sliders.find(slider => slider.id === id));
         setSliders(sliders.filter(slider => slider.id !== id));
         console.log("Slider restored successfully");
         alert("Slider đã được khôi phục!");
      } catch (error) {
         console.error("Error restoring Slider:", error);
      }
   };

   const removeSlider = async (id) => {
      try {
         await TrashServices.removeSlider(id);
         setSliders(sliders.filter(slider => slider.id !== id));
         console.log("Slider deleted permanently");
         alert("Slider đã bị xóa vĩnh viễn!");
      } catch (error) {
         console.error("Error deleting Slider permanently:", error);
      }
   };
   const getImgUrl = (imageName) => {
      const endpoint = 'banners'; 
      let imageUrl = `http://localhost:8082/api/${endpoint}/image/${imageName}`;
      
      imageUrl = imageUrl.replace(/\.png/g, "") + ".png";
  
      return imageUrl;
  };
   return (
      <div className="content">
         <section className="content-header my-2">
            <h1 className="d-inline">Thùng rác Slider</h1>
            <div className="row mt-3 align-items-center">
               <div className="col-6">
                  <ul className="manager">
                     <li><Link to="/slider">Trang chính</Link></li>
                  </ul>
               </div>
               <div className="col-6 text-end">
                  <input type="text" className="search d-inline" />
                  <button className="d-inline btnsearch">Tìm kiếm</button>
               </div>
            </div>
         </section>
         <section className="content-body my-2">

            <table className="table table-bordered">
               <thead>
                  <tr>
                     <th className="text-center" style={{ width: '30px' }}>
                        <input type="checkbox" id="checkboxAll" />
                     </th>
                     <th className="text-center" style={{ width: '90px' }}>Hình ảnh</th>
                     <th>Tên slider</th>
                     <th>Liên kết</th>
                     <th>Vị trí</th>
                     <th className="text-center" style={{ width: '30px' }}>ID</th>
                  </tr>
               </thead>
               <tbody>
                  {sliders.map((slider) => (
                     <tr className="datarow" key={slider.id}>
                        <td className="text-center">
                           <input type="checkbox" />
                        </td>
                        <td>
                        <img className="img-fluid" src={getImgUrl(slider.image)} alt={slider.image} />
                        </td>
                        <td>
                           <div className="name">
                              <a>
                              {slider.name}  
                            </a>
                           </div>
                           <div className="function_style">
                           <a href="#" className="text-primary mx-1" onClick={() => restoreSlider(slider.id)}>
                                 <i className="fa fa-undo"></i>
                              </a>
                              <a href="#" className="text-danger mx-1" onClick={() => removeSlider(slider.id)}>
                                 <i className="fa fa-trash"></i>
                              </a>
                           </div>
                        </td>
                        <td>lien-ket</td>
                        <td>slidershow</td>
                        <td className="text-center">1</td>
                     </tr>
                  ))}

               </tbody>
            </table>

         </section>
      </div>
   );
}

export default SliderTrash;