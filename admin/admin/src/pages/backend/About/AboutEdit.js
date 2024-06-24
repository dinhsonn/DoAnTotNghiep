import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AboutService from "../../../services/AboutServices";

function AboutEdit() {
    let { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        layout: "1"
    });

    useEffect(() => {
        AboutService.getById(id)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching about data:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AboutService.update(formData, id)
            .then(response => {
                console.log("About cập nhật thành công!", response.data);
                alert('About cập nhật thành công!')
            })
            .catch(error => {
                console.error('Error updating about:', error);
                // Show error message
            });
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Chỉnh sửa About</h1>
                <Link to={`/about`} className="btn btn-primary btn-sm m-1">
                    <i className="fa fa-arrow-left"></i> Quay lại
                </Link>
            </section>
            <section className="content-body my-2">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Chủ đề</label>
                        <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Chi tiết</label>
                        <textarea className="form-control" id="content" name="content" value={formData.content} onChange={handleChange}></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="status">Bố cục</label>
                        <select className="form-control" id="layout" name="layout" value={formData.layout} onChange={handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Lưu</button>
                </form>
            </section>
        </div>
    );
}

export default AboutEdit;
