import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ContactService from "../../../services/ContactServices";
import TrashService from "../../../services/TrashServices";

function ContactShow() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [contact, setContact] = useState(null);

    useEffect(() => {
        ContactService.getById(id)
            .then(response => {
                setContact(response.data);
            })
            .catch(error => {
                console.error('Error fetching contact data:', error);
            });
    }, [id]);
    const deleteContact = async () => {
        try {
            await ContactService.remove(id);
            await TrashService.createTrashContact(contact);
            navigate("/contact");
        } catch (error) {
            console.error("Error deleting contact:", error);
        }
    };

    if (!contact) return <div>Loading...</div>;

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Chi tiết</h1>
                <div className="row mt-2 align-items-center">
                    <div className="col-md-12 text-end">
                        <Link to="/contact" className="btn btn-primary btn-sm">
                            <i className="fa fa-arrow-left"></i> Về danh sách
                        </Link>
                        <Link to={`/contact/edit/${id}`} className="btn btn-success btn-sm">
                            <i className="fa fa-edit"></i> Sửa
                        </Link>
                        <button onClick={deleteContact} className="btn btn-danger btn-sm">
                            <i className="fa fa-trash"></i> Xóa
                        </button>
                    </div>
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
                            <td>Id</td>
                            <td>{contact.id}</td>
                        </tr>
                        <tr>
                            <td>Họ tên</td>
                            <td>{contact.name}</td>
                        </tr>
                        <tr>
                            <td>Điện thoại</td>
                            <td>{contact.phone}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{contact.email}</td>
                        </tr>
                        <tr>
                            <td>Tiêu đề</td>
                            <td>{contact.content}</td>
                        </tr>
                        <tr>
                            <td>Trạng thái</td>
                            <td>{contact.status}</td>
                        </tr>
                        <tr>
                            <td>Ngày tạo</td>
                            <td>{new Date(contact.createdAt).toLocaleString()}</td>
                        </tr>
                        {contact.updatedAt && (
                            <tr>
                                <td>Ngày cập nhật</td>
                                <td>{new Date(contact.updatedAt).toLocaleString()}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default ContactShow;
