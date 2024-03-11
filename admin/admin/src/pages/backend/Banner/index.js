import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BannerService from "../../../services/BannerServices";

function Banner() {
   const [banners, setBanners] = useState([]);
   //api này gọi user 
   useEffect(() => {
      BannerService.getAll()
       .then(response => {
         setBanners(response.data.content);
         console.log("data",response.data.content)
       })
       .catch(error => {
         console.error('Error fetching data:', error);
       });
   }, []);
   //xóa sản phẩm
   const removeBanner = (id) => {
      BannerService.remove(id)
        .then(() => {
         setBanners(banners.filter(slider => slider.id !== id));
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
        <h1 className="d-inline">Banner</h1>
        <Link className="btn-add" to={"/banner/create"}>
          Thêm mới
        </Link>
      </section>
      <section className="content-body my-2">
      <div className="row">

      <div className="col-md-8">
      <div className="row mt-3 align-items-center">
              <div className="col-12">
                <ul className="manager">
                  <li>
                    <a href="brand_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="#">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="brand_trash.html">Rác (12)</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row my-2 align-items-center">
              <div className="col-md-6">
                <select name="" className="d-inline me-1">
                  <option value="">Hành động</option>
                  <option value="">Bỏ vào thùng rác</option>
                </select>
                <button className="btnapply">Áp dụng</button>
              </div>
              <div className="col-md-6 text-end">
                <input type="text" className="search d-inline" />
                <button className="d-inline">Tìm kiếm</button>
              </div>
            </div>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" style={{ width: "30px" }}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th className="text-center" style={{ width: "130px" }}>
                Hình ảnh
              </th>
              <th>Tên banner</th>
              <th>Liên kết</th>
              <th>Vị trí</th>
              <th>Trạng thái</th>
               <th>Type</th>
              <th className="text-center" style={{ width: "30px" }}>
                ID
              </th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner, index) => (
              <tr className="datarow" key={banner.id}>
                <td className="text-center">
                  <input type="checkbox" id="checkId"/>
                </td>
                <td>
                  <img
                    src={getImgUrl(banner.image)}
                    style={{ width: "180px" }}
                  />
                </td>
                <td>
                  <div className="name">
                    <a>{banner.name}</a>
                  </div>
                  <div className="function_style">
                    {/* Các chức năng khác như chỉnh sửa, xem, xóa */}
                    <Link
                      to={`/banner/edit/${banner.id}`}
                      className="text-primary mx-1"
                    >
                      <i className="fa fa-edit"></i>
                    </Link>
                    <Link
                      to={`/banner/show/${banner.id}`}
                      className="text-info mx-1"
                    >
                      <i className="fa fa-eye"></i>
                    </Link>
                    <a
                      href="#"
                      className="text-danger mx-1"
                      onClick={() => removeBanner(banner.id)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </div>
                </td>
                <td>{banner.link}</td>
               <td>{banner.status}</td>
               <td>{banner.sort}</td>
               <td>{banner.type}</td>
                <td className="text-center">{banner.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
         </div>
         </div>

      </section>
    </div>
  );
}

export default Banner;
