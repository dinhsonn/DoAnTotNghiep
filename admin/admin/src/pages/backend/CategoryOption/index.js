import { useEffect, useState } from "react";
import CategoryServices from "../../../services/CategoryServices";
import { Link } from "react-router-dom";

function CategoryOption() {
  const [categoryoptions, setCategoryOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    status: "0",
  });
  const [searchTerm, setSearchTerm] = useState(""); 
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); 
  };

  const filteredOptione = categoryoptions.filter((categoryoption) =>
    categoryoption.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    loadCategoryOptions();
  }, [formData]);

  const loadCategoryOptions = () => {
    CategoryServices.categoryOption()
      .then((response) => {
        setCategoryOptions(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    CategoryServices.getAll()
      .then((response) => {
        setCategories(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const removeCategoryOption = (id) => {
    CategoryServices.removeCategoryOption(id)
      .then(() => {
        setCategoryOptions(
          categoryoptions.filter((categoryoption) => categoryoption.id !== id)
        );
        console.log("Category Option deleted successfully");
        alert("Category Option đã được xóa!");
      })
      .catch((error) => {
        console.error("Error deleting Product Option:", error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const categoryIdObject = categories.find(
      (category) => category.id === parseInt(formData.categoryId)
    );
    console.log("gg", categoryIdObject);
    const updatedProduct = {
      ...formData,
      categoryId: categoryIdObject,
    };
    CategoryServices.createCategoryOption(updatedProduct)
      .then((response) => {
        console.log("Tạo category option thành công:", response.data);
        alert("Thêm danh mục option thành công!");
        loadCategoryOptions();
      })
      .catch((error) => {
        console.error("Lỗi khi tạo mới người dùng:", error);
      });
  };


  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Option danh mục</h1>
        <hr style={{ border: "none" }} />
      </section>
      <section className="content-body my-2">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  <strong>Tên option (*)</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Tên option"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>ID danh mục</strong>
                </label>
                <select
                  name="categoryId"
                  className="form-control"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>
                  <strong>Trạng thái</strong>
                </label>
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="0">Xuất bản</option>
                  <option value="1">Chưa xuất bản</option>
                </select>
              </div>

              <div className="mb-3 text-end">
                <button
                  className="btn btn-sm btn-success"
                  type="submit"
                  name="THEM"
                >
                  <i className="fa fa-save"></i> Lưu[Cập nhật]
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-8">
            <div className="row mt-3 align-items-center">
              <div className="col-12">
                <ul className="manager">
                  <li>
                    <a href="brand_index.html">Tất cả (123)</a>
                  </li>
                  <li>
                    <a href="#">Xuất bản (12)</a>
                  </li>
                  <li>
                    <a href="brand_trash.html">Rác (12)</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row my-2 align-items-center">
            <div className="col-md-6">
                <input
                  type="text"
                  className="search d-inline"
                  onChange={handleSearch} // Thêm sự kiện onChange cho ô tìm kiếm
                />
                <button className="d-inline">Tìm kiếm</button>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "30px" }}>
                    <input type="checkbox" id="checkboxAll" />
                  </th>
                  <th>Tên option</th>

                  <th>ID sản phẩm</th>

                  <th>Trạng thái</th>
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOptione.map((categoryoption, index) => (
                  <tr className="datarow">
                    <td>
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <div className="name">
                        <a>{categoryoption.name}</a>
                      </div>
                      <div className="function_style">
                        <a href="#" className="px-1 text-success">
                          <i className="fa fa-toggle-on"></i>
                        </a>
                        <Link
                          to={`/categoryoption/edit/${categoryoption.id}`}
                          className="px-1 text-primary"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <Link
                          to={`/categoryoption/show/${categoryoption.id}`}
                          className="px-1 text-info"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                        <a
                          href="#"
                          className="px-1 text-danger"
                          onClick={() =>
                            removeCategoryOption(categoryoption.id)
                          }
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                    <td>{categoryoption.categoryId.name}</td>
                    <td>
                      {categoryoption.status === 0
                        ? "Xuất bản"
                        : "Chưa xuất bản"}
                    </td>
                    <td className="text-center">{categoryoption.id}</td>
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

export default CategoryOption;
