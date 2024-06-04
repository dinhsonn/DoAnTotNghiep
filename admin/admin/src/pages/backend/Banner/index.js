import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BannerService from "../../../services/BannerServices";
import TrashServices from "../../../services/TrashServices";

function Banner() {
  const [banners, setBanners] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    BannerService.getAll()
      .then((response) => {
        setBanners(response.data.content);
        console.log("data", response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); 
  };

  const filteredBanners = banners.filter((banner) =>
    banner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Xóa banner
  const removeBanner = async (id) => {
    try {
      // Xóa banner
      await BannerService.remove(id);

      // Lấy thông tin của banner sẽ di chuyển vào thùng rác
      const bannerToMoveToTrash = banners.find((banner) => banner.id === id);

      // Di chuyển vào thùng rác
      await TrashServices.createBanner(bannerToMoveToTrash);

      // Cập nhật danh sách banners sau khi xóa
      setBanners(banners.filter((banner) => banner.id !== id));

      console.log("Banner deleted successfully");
      alert("Banner đã được xóa!");
    } catch (error) {
      console.error("Error deleting banner:", error);
    }
  };

  // Lấy URL hình ảnh banner
  const getImgUrl = (imageName) => {
    const endpoint = "banners";
    let imageUrl = `http://localhost:8082/api/${endpoint}/image/${imageName}`;

    // Xóa bớt một phần đuôi ".png" nếu có
    imageUrl = imageUrl.replace(/\.png/g, "") + ".png";

    return imageUrl;
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
          <div className="col-md-12">
            <div className="row mt-3 align-items-center">
              <div className="col-12">
                <ul className="manager">
                  <li>
                    <Link to="/banner">Tất cả ({banners.length})</Link>
                  </li>
                  <li>
                    <Link to={"/banner/trash"}>Thùng Rác</Link>
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
                <input
                  type="text"
                  className="search d-inline"
                  onChange={handleSearch} // Thêm sự kiện onChange cho ô tìm kiếm
                />
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
                {filteredBanners.map((banner, index) => (
                  <tr className="datarow" key={banner.id}>
                    <td className="text-center">
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <img
                        src={                        getImgUrl(banner.image)}
                        alt={banner.name} // Thêm thuộc tính alt cho hình ảnh
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

