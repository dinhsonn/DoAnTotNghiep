import React, { useEffect, useState } from 'react';
import TrashServices from "../../../services/TrashServices";
import UserService from '../../../services/UserServices';

function AdminTrash() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);
    const loadUser = async () => {
        try {
            const response = await TrashServices.getAllUser();
            setUsers(response.data.content);
            console.log("day ne", response.data.content);
        } catch (error) {
            console.error("Error loading users:", error);
        }
    };
    const removeUser = async (id) => {
        try {
            await TrashServices.removeUser(id);
            setUsers(users.filter((user) => user.id !== id));
            console.log("users deleted successfully");
            alert("users đã được xóa!");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    const backUser = async (id) => {
        try {
            await TrashServices.removeUser(id);
            await UserService.create(users.find(user => user.id === id));
            setUsers(users.filter((user) => user.id !== id));
            console.log("Product deleted successfully");
            alert("Thành công!");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };
    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Thùng rác thành viên</h1>
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
                            <th>Họ tên</th>
                            <th>Điện thoại</th>
                            <th>Email</th>
                            <th className="text-center" style={{ width: '30px' }}>ID</th>
                        </tr>
                    </thead>
                    <tbody>
    {users.map((user, index) => (
        <tr className="datarow" key={index}>
            <td>
                <input type="checkbox" />
            </td>
            <td>
                <div className="name">
                    <a href="#">{user.name}</a>
                </div>
                <div className="function_style">
                    <a href="#" className="text-primary mx-1" onClick={() => backUser(user.id)}>
                        <i className="fa fa-undo"></i>
                    </a>
                    <a href="#" className="text-danger mx-1" onClick={() => removeUser(user.id)}>
                        <i className="fa fa-trash"></i>
                    </a>
                </div>
            </td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td className="text-center">{user.id}</td>
        </tr>
    ))}
</tbody>

                </table>
            </section>
        </div>
    );
}

export default AdminTrash;
