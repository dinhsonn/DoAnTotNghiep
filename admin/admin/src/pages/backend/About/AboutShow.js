import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AboutService from "../../../services/AboutServices";

function AboutShow() {
    const { id } = useParams();
    const [about, setAbout] = useState({});

    useEffect(() => {
        AboutService.getById(id)
            .then(response => {
                setAbout(response.data);
                console.log("About data:", response.data);
            })
            .catch(error => {
                console.error('Error fetching about data:', error);
            });
    }, [id]);
    const removeAbout = (id) => {
        AboutService.remove(id)
            .then(() => {
                setAbout(about.filter(about => about.id !== id));
                console.log("About item deleted successfully");
                alert("Mục About đã được xóa!");
            })
            .catch(error => {
                console.error('Error deleting About item:', error);
            });
    };
    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Chi tiết</h1>
                <div className="row mt-2 align-items-center">
                    <div className="col-md-12 text-end">
                        <Link to={'/about'} className="btn btn-primary btn-sm m-1">
                            <i className="fa fa-arrow-left"></i> Về danh sách
                        </Link>
                        <Link to={`/about/edit/${id}`} className="btn btn-success btn-sm m-1">
                            <i className="fa fa-edit"></i> Sửa
                        </Link>
                        <button className="btn btn-danger btn-sm m-1" onClick={() => removeAbout(id)}>
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
                            <td>ID</td>
                            <td>{about.id}</td>
                        </tr>
                        <tr>
                            <td>Title</td>
                            <td>{about.title}</td>
                        </tr>
                        <tr>
                            <td>Content</td>
                            <td>{about.content}</td>
                        </tr>
                        <tr>
                            <td>Trạng thái</td>
                            <td>{about.status === "0" ? "Xuất bản" : "Chưa xuất bản"}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
}

export default AboutShow;
