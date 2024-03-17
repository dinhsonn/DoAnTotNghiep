import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import ProductSaleService from '../../../services/SaleServices';

function SaleShow() {
    const { id } = useParams();
    const [saleDetails, setSaleDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSaleDetails = async () => {
            try {
                const response = await ProductSaleService.getById(id);
                setSaleDetails(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSaleDetails();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Thông tin chi tiết sản phẩm khuyến mãi</h1>
                <div className="col-md-12 text-end">
                    <Link to={"/sale"} className="btn btn-primary btn-sm m-1">
                        <i className="fa fa-arrow-left"></i> Về danh sách
                    </Link>
                </div>
            </section>
            <section className="content-body my-2">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th style={{ width: '180px' }}>Tên trường</th>
                            <th>Giá trị</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tên sản phẩm:</td>
                            <td>{saleDetails.productId.name}</td>
                        </tr>
                        <tr>
                            <td>Giá bán:</td>
                            <td>{saleDetails.productId.price}</td>
                        </tr>
                        <tr>
                            <td>Giá khuyến mãi:</td>
                            <td>{saleDetails.salePrice}</td>
                        </tr>
                        <tr>
                            <td>Ngày bắt đầu:</td>
                            <td>{saleDetails.dateStart}</td>
                        </tr>
                        <tr>
                            <td>Ngày kết thúc:</td>
                            <td>{saleDetails.dateEnd}</td>
                        </tr>
                        <tr>
                            <td>Số lượng bán:</td>
                            <td>{saleDetails.quantitySold}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default SaleShow;
