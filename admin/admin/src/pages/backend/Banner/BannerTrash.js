import React, { useEffect, useState } from 'react';
import TrashServices from "../../../services/TrashServices";
import { Link } from "react-router-dom";
import BannerService from '../../../services/BannerServices';

function BannerTrash() {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        loadBanners();
    }, []);

    const loadBanners = async () => {
        try {
            const response = await TrashServices.getAllBanner();
            setBanners(response.data.content);
            console.log("Danh sách banner trong thùng rác:", response.data.content);
        } catch (error) {
            console.error("Lỗi khi tải danh sách banner từ thùng rác:", error);
        }
    };

    const removeBanner = async (id) => {
        try {
            await TrashServices.removeBanner(id);
            setBanners(banners.filter((banner) => banner.id !== id));
            console.log("Banner đã được xóa thành công");
            alert("Banner đã được xóa!");
        } catch (error) {
            console.error("Lỗi khi xóa banner:", error);
        }
    };

    const restoreBanner = async (id) => {
        try {
            await TrashServices.removeBanner(id); // Xóa banner khỏi thùng rác
            const bannerToRestore = banners.find(banner => banner.id === id);
            await BannerService.create(bannerToRestore); // Khôi phục about
            setBanners(banners.filter((banner) => banner.id !== id)); // Cập nhật danh sách banners
            console.log("Banner đã được khôi phục thành công");
            alert("Banner đã được khôi phục!");
        } catch (error) {
            console.error("Lỗi khi khôi phục banner:", error);
        }
    };
    const getImgUrl = (imageName) => {
      const endpoint = 'banners'; 
      let imageUrl = `http://localhost:8082/api/${endpoint}/image/${imageName}`;
      
      // Xóa bớt một phần đuôi ".png" nếu có
      imageUrl = imageUrl.replace(/\.png/g, "") + ".png";
  
      return imageUrl;
  };
    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Thùng rác Banner</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                        <li><Link to="/banner">Tất cả ({banners.length})</Link></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="banner_trash.html">Rác (12)</a></li>
                        </ul>
                    </div>
                    <div className="col-6 text-end">
                        <input type="text" className="search d-inline" />
                        <button className="d-inline btnsearch">Tìm kiếm</button>
                    </div>
                </div>
                {/* Phần còn lại của giao diện bạn có thể thiết kế tương tự như trong mã của bạn */}
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th className="text-center" style={{ width: '90px' }}>Hình ảnh</th>
                            <th>Tên banner</th>
                            <th>Liên kết</th>
                            <th>Vị trí</th>
                            <th className="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banners.map((banner, index) => (
                            <tr className="datarow" key={index}>
                                <td className="text-center">
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <img className="img-fluid"src={getImgUrl(banner.image)} alt={banner.image}/>
                                </td>
                                <td>
                                    <div className="name">
                                        <Link to={`/banner/edit/${banner.id}`}>
                                            {banner.name}
                                        </Link>
                                    </div>
                                    <div className="function_style">
                                        <a href="#" className="text-primary mx-1" onClick={() => restoreBanner(banner.id)}>
                                            <i className="fa fa-undo"></i>
                                        </a>
                                        <a href="#" className="text-danger mx-1" onClick={() => removeBanner(banner.id)}>
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>{banner.link}</td>
                                <td>{banner.position}</td>
                                <td className="text-center">{banner.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default BannerTrash;
