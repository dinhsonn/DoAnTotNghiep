import { useEffect, useState } from "react";
import CategoryServices from "../../../services/CategoryServices";
import { Link } from "react-router-dom";

function CategoryOptionValue() {
  const [categoryoptionvalues, setCategoryOptionValues] = useState([]);
  const [categoryoptions, setCategoryoptions] = useState([]);
  const [formData, setFormData] = useState({
    value: "",
    option: "",
  });

  useEffect(() => {
    loadCategoryOptionvalues();
  }, [formData]);

  const loadCategoryOptionvalues = () => {
    CategoryServices.categoryOptionValue()
      .then((response) => {
        setCategoryOptionValues(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    CategoryServices.categoryOption()
      .then((response) => {
        setCategoryoptions(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const removeCategoryOptionValue = (id) => {
    CategoryServices.removeCategoryOptionValue(id)
      .then(() => {
        setCategoryOptionValues(categoryoptionvalues.filter((categoryoptionvalue) => categoryoptionvalue.id !== id));
        console.log("Product Option deleted successfully");
        alert("Giá trị Option danh mục đã được xóa!");
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
    const categoryoptIdObject = categoryoptions.find(
      (categoryoption) => categoryoption.id === parseInt(formData.option)
    );
    console.log("gg", categoryoptIdObject);
    const updatedProduct = {
      ...formData,
      option: categoryoptIdObject,
    };
    CategoryServices.createCategoryOptionValue(updatedProduct)
      .then((response) => {
        console.log("Tạo product option thành công:", response.data);
        alert("Thêm giá trị option danh mục  thành công!");
        loadCategoryOptionvalues();
      })
      .catch((error) => {
        console.error("Lỗi khi tạo mới option value:", error);
      });
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Giá trị option danh mục</h1>
        <hr style={{ border: "none" }} />
      </section>
      <section className="content-body my-2">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  <strong>Tên giá option (*)</strong>
                </label>
                <input
                  type="text"
                  name="value"
                  className="form-control"
                  placeholder="Tên option"
                  value={formData.value}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>ID Option</strong>
                </label>
                <select
                  name="option"
                  className="form-control"
                  value={formData.option}
                  onChange={handleChange}
                >
                  {categoryoptions.map((categoryoption) => (
                    <option key={categoryoption.id} value={categoryoption.id}>
                      {categoryoption.name}
                    </option>
                  ))}
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
                <select name="" className="d-inline me-1">
                  <option value="">Hành động</option>
                  <option value="">Bỏ vào thùng rác</option>
                </select>
                <button className="btnapply">Áp dụng</button>
              </div>
              <div className="col-md-6 text-end">
                <input type="text" className="search d-inline" />
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
                
                  <th>ID Option sản phẩm</th>
              
               
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryoptionvalues.map((categoryoptionvalue, index) => (
                  <tr className="datarow">
                    <td>
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <div className="name">
                        <a>{categoryoptionvalue.value}</a>
                      </div>
                      <div className="function_style">
                        <a href="#" className="px-1 text-success">
                          <i className="fa fa-toggle-on"></i>
                        </a>
                        <Link
                          to={`/categoryoptionvalue/edit/${categoryoptionvalue.id}`}
                          className="px-1 text-primary"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <Link
                          to={`/categoryoptionvalue/show/${categoryoptionvalue.id}`}
                          className="px-1 text-info"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                        <a
                          href="#"
                          className="px-1 text-danger"
                          onClick={() => removeCategoryOptionValue(categoryoptionvalue.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                    <td>{categoryoptionvalue.option.name} - {categoryoptionvalue.option.categoryId.name}</td>
                    <td className="text-center">{categoryoptionvalue.id}</td>
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

export default CategoryOptionValue;
