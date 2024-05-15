import React, { useEffect, useState } from 'react';
import OrderService from '../../../services/OrderServices'; // Đảm bảo đường dẫn này đúng

function Order() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        OrderService.getAll()
            .then(response => {
                setOrders(response.data); // Giả định rằng dữ liệu trả về là một mảng đơn hàng
                console.log("data", response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const removeOrder = (id) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) {
            OrderService.remove(id)
                .then(() => {
                    setOrders(orders.filter(order => order.id !== id));
                    console.log("Post deleted successfully");
                    alert("Đơn hàng đã được xóa!");
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                });
        }
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý đơn hàng</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="#">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="#">Rác (12)</a></li>
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
                            <option value="">Chọn tháng</option>
                            <option value="">Tháng 9</option>
                        </select>
                        <select name="" className="d-inline me-1">
                            <option value="">Chọn năm</option>
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
                            <th className="text-center" style={{ width: '30px' }}>
                                <input type="checkbox" id="checkboxAll" />
                            </th>
                            <th>Họ tên khách hàng</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th>Địa chỉ</th>
                            <th>Tên sản phẩm</th>
                            <th>Ngày đặt hàng</th>
                            <th className="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr className="datarow" key={order.id}>
                                <td>
                                    <input type="checkbox" id="checkId" />
                                </td>
                                <td>
                                    <div className="name">
                                        <a>{order.name}</a>
                                    </div>
                                    <div className="function_style">
                                        <a href="#" className="text-success mx-1">
                                            <i className="fa fa-toggle-on"></i>
                                        </a>
                                        <a href="order_edit.html" className="text-primary mx-1">
                                            <i className="fa fa-edit"></i>
                                        </a>
                                        <a href="order_show.html" className="text-info mx-1">
                                            <i className="fa fa-eye"></i>
                                        </a>
                                        <a href="#" className="text-danger mx-1" onClick={() => removeOrder(order.id)}>
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>{order.phone}</td>
                                <td>{order.email}</td>
                                <td>{order.address}</td>
                                <td>{order.product.name}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="text-center">{order.id}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default Order;
