import { useEffect, useState } from "react";
import CategoryService from "../../../services/CategoryServices";
import { Link } from "react-router-dom";
import TrashServices from "../../../services/TrashServices";

function Category() {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        parentId: '',
        sortOrder:'',
        status: '0'
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


    const removeProduct = async (id) => {
        try {
            // Xóa about
            await CategoryService.remove(id);
    
            // Lấy thông tin của about sẽ di chuyển vào thùng rác
            const cateToMoveToTrash = categories.find(category => category.id === id);
    
            // Di chuyển vào thùng rác
            await TrashServices.createCategory(cateToMoveToTrash);
    
            // Cập nhật danh sách abouts sau khi xóa
            setCategories(categories.filter((category) => category.id !== id));
    
            console.log("Product deleted successfully");
            alert("Sản phẩm đã được xóa!");
        } catch (error) {
            console.error("Error deleting product:", error);
        }
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
                alert('Thêm danh mục thành công!')
       })
       .catch(error => {
           console.error('Lỗi khi tạo mới:', error);
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
                                    <option value="">Chọn danh mục</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
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
                                    <option value="0">Xuất bản</option>
                                    <option value="1">Chưa xuất bản</option>
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
                                    <li><Link to="/category">Tất cả ({categories.length})</Link></li>
                                    <li><Link to={"/category/trash"}> Thùng Rác</Link></li>
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
                                    <th>Danh mục cha</th>
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
                                        <td>{categories.find(cat => cat.id === category.parentId)?.name || 'None'}</td>
                                        <td>{category.sortOrder}</td>
                                        <td>{category.status === 0 ? 'Xuất bản' : 'Chưa xuất bản'}</td>
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
