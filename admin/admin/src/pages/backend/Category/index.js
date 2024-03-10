import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryServices";
import { Link } from "react-router-dom";

function Category() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        parentId: '',
        sortOrder:'',
        status: ''
    });

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = () => {
        CategoryService.getAll()
            .then(response => {
                setCategories(response.data.content);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const removeProduct = (id) => {
        CategoryService.remove(id)
            .then(() => {
                setCategories(categories.filter(category => category.id !== id));
                console.log("Admin deleted successfully");
                alert("Thành viên đã được xóa!")
            })
            .catch(error => {
                console.error('Error deleting product:', error);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'sortOrder' && (!Number(value) || Number(value) <= 0)) {
            alert('Thứ tự phải là một số lớn hơn 0!');
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        CategoryService.create(formData)
            .then(response => {
                console.log("Tạo danh mục thành công:", response.data);
                alert('Thêm thành viên thành công!')
       })
       .catch(error => {
           console.error('Lỗi khi tạo mới người dùng:', error);
       });
    };
    
    return (  
        <div className="content">
            <section className="content-header my-2">
                <h1 className="d-inline">Danh mục</h1>
                <hr style={{border: 'none'}} />
            </section>
            <section className="content-body my-2"> 
                <div className="row">
                    <div className="col-md-4">
                    <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label>
                                    <strong>Tên danh mục (*)</strong>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Nhập tên danh mục"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label><strong>Mô tả</strong></label>
                                <textarea
                                    name="description"
                                    placeholder="Mô tả"
                                    rows="4"
                                    className="form-control"
                                    value={formData.description}
                                    onChange={handleChange}
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label><strong>Danh mục cha</strong></label>
                                <select
                                    name="parentId"
                                    className="form-select"
                                    value={formData.parentId}
                                    onChange={handleChange}
                                >
                                    <option value="0">1</option>
                                    <option value="1">2</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label><strong>Thứ tự</strong></label>
                                <input
                                    type="text"
                                    name="sortOrder"
                                    className="form-control"
                                    onChange={handleChange}
                                    value={formData.sortOrder}
                                />
                            </div>
                            <div className="mb-3">
                                <label><strong>Trạng thái</strong></label>
                                <select
                                    name="status"
                                    className="form-select"
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="1">Xuất bản</option>
                                    <option value="2">Chưa xuất bản</option>
                                </select>
                            </div>
                            <div className="mb-3 text-end">
                                <button type="submit" className="btn btn-success" name="THEM">
                                    <i className="fa fa-save"></i> Lưu[Thêm]
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-8">
                        <div className="row mt-3 align-items-center">
                            <div className="col-12">
                                <ul className="manager">
                                    <li><a href="category_index.html">Tất cả (123)</a></li>
                                    <li><a href="#">Xuất bản (12)</a></li>
                                    <li><a href="category_trash.html">Rác (12)</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row my-2 align-items-center">
                            <div className="col-md-6">
                                <select name="" className="d-inline me-1">
                                    <option value="">Hành động</option>
                                    <option value="">Bỏ vào thùng rác</option>
                                </select>
                                <button className="btnapply">Áp dụng</button>
                            </div>
                            <div className="col-md-6 text-end">
                                <input type="text" className="search d-inline" />
                                <button className="d-inline btnsearch">Tìm kiếm</button>
                            </div>
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{width: '30px'}}>
                                        <input type="checkbox" id="checkboxAll" />
                                    </th>
                                    <th>Tên danh mục</th>
                                    <th>Parent_id</th>
                                    <th>Thứ tự</th>
                                    <th>Trạng thái</th>
                                    <th className="text-center" style={{width: '30px'}}>ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map(category => (
                                    <tr className="datarow" key={category.id}>
                                        <td className="text-center">
                                            <input type="checkbox" id={`checkId${category.id}`} />
                                        </td>
                                        <td>
                                            <div className="name">
                                                <a>{category.name}</a>
                                            </div>
                                            <div className="function_style">
                                                <a href="#" className="px-1 text-success">
                                                    <i className="fa fa-toggle-on"></i>
                                                </a>
                                                <Link to={`/category/edit/${category.id}`} className="px-1 text-primary">
                                                    <i className="fa fa-edit"></i>
                                                </Link>
                                                <Link to={`/category/show/${category.id}`} className="px-1 text-info">
                                                    <i className="fa fa-eye"></i>
                                                </Link>
                                                <a href="#" className="px-1 text-danger" onClick={() => removeProduct(category.id)}>
                                                    <i className="fa fa-trash"></i>
                                                </a>
                                            </div>
                                        </td>
                                        <td>{category.parentId}</td>
                                        <td>{category.sortOrder}</td>
                                        <td>{category.status === 1 ? 'Xuất bản' : 'Chưa xuất bản'}</td>
                                        <td className="text-center">{category.id}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </section>
        </div>
    );
}

export default Category;
