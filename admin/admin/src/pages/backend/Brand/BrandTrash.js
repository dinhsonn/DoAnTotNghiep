import React, { useEffect, useState } from 'react';
import TrashServices from "../../../services/TrashServices";
import { Link } from "react-router-dom";
import BannerService from '../../../services/BannerServices';
import BrandService from '../../../services/BrandServices';

function BrandTrash() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        loadBrands();
    }, []);

    const loadBrands = async () => {
        try {
            const response = await TrashServices.getAllBrand();
            setBrands(response.data.content);
            console.log("Danh sách thương hiệu trong thùng rác:", response.data.content);
        } catch (error) {
            console.error("Lỗi khi tải danh sách thương hiệu từ thùng rác:", error);
        }
    };

    const removeBrand = async (id) => {
        try {
            await TrashServices.removeBrand(id);
            setBrands(brands.filter((brand) => brand.id !== id));
            console.log("Thương hiệu đã được xóa thành công");
            alert("Thương hiệu đã được xóa!");
        } catch (error) {
            console.error("Lỗi khi xóa thương hiệu:", error);
        }
    };

    const restoreBrand = async (id) => {
        try {
            await TrashServices.removeBrand(id); // Xóa thương hiệu khỏi thùng rác
            const brandToRestore = brands.find(brand => brand.id === id);
            await BrandService.create(brandToRestore); // Khôi phục thương hiệu
            setBrands(brands.filter((brand) => brand.id !== id)); // Cập nhật danh sách brands
            console.log("Thương hiệu đã được khôi phục thành công");
            alert("Thương hiệu đã được khôi phục!");
        } catch (error) {
            console.error("Lỗi khi khôi phục thương hiệu:", error);
        }
    };

    const getImgUrl = (imageName) => {
      const endpoint = 'trashbrands';
      let imageUrl = `http://localhost:8082/api/${endpoint}/image/${imageName}`;
      // Xóa bớt một phần đuôi ".png" nếu có
      imageUrl = imageUrl.replace(/\.png/g, "") + ".png";

      return imageUrl;
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Thùng rác thương hiệu</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><Link to="/brand">Tất cả ({brands.length})</Link></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="brand_trash.html">Rác (12)</a></li>
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
                                <input type="checkbox" id="checkAll" />
                            </th>
                            <th className="text-center" style={{ width: '90px' }}>Hình ảnh</th>
                            <th>Tên thương hiệu</th>
                            <th>Tên slug</th>
                            <th className="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand, index) => (
                            <tr className="datarow" key={index}>
                                <td className="text-center">
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <img className="img-fluid" src={getImgUrl(brand.image)} alt={brand.image} />
                                </td>
                                <td>
                                    <div className="name">
                                        <Link to={`/brand/edit/${brand.id}`}>
                                            {brand.name}
                                        </Link>
                                    </div>
                                    <div className="function_style">
                                        <a href="#" className="text-primary mx-1" onClick={() => restoreBrand(brand.id)}>
                                            <i className="fa fa-undo"></i>
                                        </a>
                                        <a href="#" className="text-danger mx-1" onClick={() => removeBrand(brand.id)}>
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>{brand.slug}</td>
                                <td className="text-center">{brand.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default BrandTrash;
