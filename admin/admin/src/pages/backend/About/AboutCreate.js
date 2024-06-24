import { useState } from "react";
import { Link } from "react-router-dom";
import AboutService from "../../../services/AboutServices";

function AboutCreate() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        layout: '1'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AboutService.create(formData)
            .then(response => {      
                console.log('Tạo mới mục About thành công:', response.data);
                alert('Thêm mục About thành công!');
            })
            .catch(error => {
                console.error('Lỗi khi tạo mới mục About:', error);
            });
    };

    return (
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Thêm mục About</h1>
                <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
             <button className="btn btn-success btn-sm m-1" name="THEM" onClick={handleSubmit}>
                <i className="fa fa-save"></i> Lưu [Thêm]
             </button>
             <Link to={"/about"} className="btn btn-primary btn-sm m-1">
                <i className="fa fa-arrow-left"></i> Về danh sách
             </Link>
          </div>
       </div>
            </section>
            <section className="content-body my-2">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Chủ đề:</label>
                        <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="content" className="form-label">Chi tiết:</label>
                        <textarea className="form-control" id="content" name="content" value={formData.content} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="layout" className="form-label">Bố cục:</label>
                        <select className="form-select" id="status" name="layout" value={formData.layout} onChange={handleChange}>
                        <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                        </select>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default AboutCreate;
