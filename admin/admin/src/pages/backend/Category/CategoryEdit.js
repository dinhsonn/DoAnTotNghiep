import { useEffect, useState } from "react";
import CategoryServices from "../../../services/CategoryServices";
import { useParams } from "react-router-dom";

function CategoryEdit() {
    let { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        parentId: '',
        sortOrder: '',
        status: '0'
    });

    useEffect(() => {
        CategoryServices.getById(id)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching category data:', error);
            });
            
        CategoryServices.getAll()
            .then(response => {
                setCategories(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CategoryServices.update(formData, id)
            .then(response => {
                console.log("Updated category:", response.data);
                alert('Danh mục đã được cập nhật thành công!')
            })
            .catch(error => {
                console.error('Error updating category:', error);
            });
    };

    return (
        <form action="" method="post" encType="multipart/form-data">
            <div className="content">
                <section className="content-header my-2">
                    <h1 className="d-inline">Cập nhật danh mục</h1>
                    <div className="row mt-2 align-items-center">
                        <div className="col-md-12 text-end">
                            <button className="btn btn-success btn-sm m-1" name="CAPNHAT" onClick={handleSubmit}>
                                <i className="fa fa-save"></i> Lưu [Cập nhật]
                            </button>
                            <a href="/category" className="btn btn-primary btn-sm">
                                <i className="fa fa-arrow-left"></i> Về danh sách
                            </a>
                        </div>
                    </div>
                </section>
                <section className="content-body my-2">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Tên danh mục (*)</strong></label>
                                <input type="text" name="name" className="form-control" placeholder="Tên danh mục" onChange={handleChange} value={formData.name} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label><strong>Trạng thái</strong></label>
                                <select name="status" className="form-select" onChange={handleChange} value={formData.status}>
                                    <option value="0">Xuất bản</option>
                                    <option value="1">Chưa xuất bản</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label><strong>Danh mục cha</strong></label>
                                <select name="parentId" className="form-select" onChange={handleChange} value={formData.parentId}>
                                    <option value="">None</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label><strong>Thứ tự</strong></label>
                                <input type="number" name="sortOrder" className="form-control" placeholder="Thứ tự" onChange={handleChange} value={formData.sortOrder} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    );
}

export default CategoryEdit;
