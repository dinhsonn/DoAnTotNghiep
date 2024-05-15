import React, { useEffect, useState } from 'react';
import UserServices from '../../../services/UserServices';

function AdminTrash() {


    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Thùng rác thành viên</h1>
                {/* Phần còn lại của giao diện bạn có thể thiết kế tương tự như trong mã của bạn */}
                {/* Ví dụ: */}
                <div className="row mt-3 align-items-center">
                    <div className="col-6">
                        <ul className="manager">
                            <li><a href="user_index.html">Tất cả (123)</a></li>
                            <li><a href="#">Xuất bản (12)</a></li>
                            <li><a href="user_trash.html">Rác (12)</a></li>
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
                            <th className="text-center" style={{ width: '130px' }}>Hình ảnh</th>
                            <th>Họ tên</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th className="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                            <tr className="datarow">
                                <td>    
                                    <input type="checkbox" />
                                </td>
                                <td>
                                    <img className="img-fluid"  />
                                </td>
                                <td>
                                    <div className="name">
                                        <a href>
aaa                                        </a>
                                    </div>
                                    <div className="function_style">
                                        <a href="#" className="text-primary mx-1">
                                            <i className="fa fa-undo"></i>
                                        </a>
                                        <a href="#" className="text-danger mx-1">
                                            <i className="fa fa-trash"></i>
                                        </a>
                                    </div>
                                </td>
                                <td>1111</td>
                                <td>aaaa</td>
                                <td className="text-center">1</td>
                            </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default AdminTrash;
