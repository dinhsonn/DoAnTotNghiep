import { useParams } from "react-router-dom";
import BannerService from "../../../services/BannerServices";
import { useEffect, useState } from "react";

function BannerShow() {
    let { id } = useParams();
    const [bannerData, setBannerData] = useState(null);

    useEffect(() => {
        BannerService.getById(id)
            .then(response => {
                setBannerData(response.data);
            })
            .catch(error => {
                console.error('Error fetching banner data:', error);
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
                        <a href="/banner" className="btn btn-primary btn-sm">
                            <i className="fa fa-arrow-left"></i> Về danh sách
                        </a>
                        <a href={`/banner/edit/${id}`} className="btn btn-success btn-sm">
                            <i className="fa fa-edit"></i> Sửa
                        </a>
                        <button className="btn btn-danger btn-sm" onClick={() => { /* Xử lý xóa banner */ }}>
                            <i className="fa fa-trash"></i> Xóa
                        </button>
                    </div>
                </div>
            </section>
            <section className="content-body my-2">
                {bannerData && (
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th style={{ width: '180px' }}>Tên trường</th>
                                <th>Giá trị</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Id</td>
                                <td>{bannerData.id}</td>
                            </tr>
                            <tr>
                                <td>Tên banner</td>
                                <td>{bannerData.name}</td>
                            </tr>
                            <tr>
                                <td>Liên kết</td>
                                <td>{bannerData.link}</td>
                            </tr>
                            <tr>
                                <td>Sort</td>
                                <td>{bannerData.sort}</td>
                            </tr>
                            <tr>
                                <td>Hình ảnh</td>
                                <td><img src={getImgUrl(bannerData.image)} alt={bannerData.image} style={{width: '200px'}}/></td>
                            </tr>
                            <tr>
                                <td>Type</td>
                                <td>{bannerData.type}</td>
                            </tr>
                            <tr>
                                <td>Trạng thái</td>
                                <td>{bannerData.status}</td>
                            </tr>
                            {/* Thêm các trường dữ liệu khác cần hiển thị */}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default BannerShow;
