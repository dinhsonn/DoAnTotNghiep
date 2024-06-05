import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import OrderService from '../../../services/OrderServices';
import ProductService from '../../../services/ProductServices';

function OrderEx() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const handleSearch = (event) => {
      setSearchTerm(event.target.value); 
    };
  
    const filteredOrder = orders
        .filter(order => order.status === 3)
        .filter(order =>
            order.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadProduct();
                const response = await OrderService.getAll();
                setOrders(response.data);
                console.log("data", response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const loadProduct = async () => {
        try {
            const response = await ProductService.getAll();
            setProducts(response.data.content);
        } catch (error) {
            console.error("Error loading product:", error);
        }
    };

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

    function getStatusText(status) {
        switch (status) {
            case 1:
                return "Chờ xác nhận";
            case 2:
                return "Đã xác nhận";
            case 3:
                return "Đang giao hàng";
            case 4:
                return "Giao thành công";
            default:
                return "Trạng thái không xác định";
        }
    }

    const updateOrderStatus = (id, status) => {
        OrderService.updateOrderStatus(id, status)
            .then(response => {
                setOrders(prevOrders => prevOrders.map(order => {
                    if (order.id === id) {
                        return { ...order, status: status };
                    } else {
                        return order;
                    }
                }));
                console.log("Order status updated successfully");
            })
            .catch(error => {
                console.error('Error updating order status:', error);
            });
    };


    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Quản lý đơn hàng</h1>
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><Link to="/order">Tất cả ({orders.length})</Link></li>
                            <li><Link to="/order/dang-giao">Đơn đã giao</Link></li>
                            <li><Link to="/order/thanh-cong">Đơn hoàn thành</Link></li>
                            <li><Link to="#">Đơn hoàn</Link></li>
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
            </section>
            <section className="content-body my-2">
            <div className="d-flex justify-content-between mb-3">
                </div>
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
                            <th>Tình trạng</th>
                            <th className="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                    {filteredOrder.map((order, index) => {
                        const product = products.find(product => product.id === order.productId);
                        if (!product) {
                            return <tr key={order.id}><td colSpan="9">Không có thông tin sản phẩm</td></tr>;
                        }
                        return (
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
                                <td>{product.name}</td>
                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                                        <option value={1}>Chờ xác nhận</option>
                                        <option value={2}>Đã xác nhận</option>
                                        <option value={3}>Đang giao hàng</option>
                                        <option value={4}>Giao thành công</option>
                                    </select>
                                </td>
                                <td className="text-center">{order.id}</td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default OrderEx;
