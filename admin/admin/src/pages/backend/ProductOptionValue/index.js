import { useEffect, useState } from "react";
import ProductServices from "../../../services/ProductServices";
import { Link } from "react-router-dom";

function ProductOptionValue() {
  const [productoptionvalues, setProductOptionValues] = useState([]);
  const [productoptions, setProductoptions] = useState([]);
  const [formData, setFormData] = useState({
    value: "",
    option: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); 
  const handleSearch = (event) => {
    setSearchTerm(event.target.value); 
  };

  const filteredOptione = productoptionvalues.filter((productoptionvalue) =>
    productoptionvalue.value.toLowerCase().includes(searchTerm.toLowerCase())
  );
  useEffect(() => {
    loadProductOptionvalues();
  }, [formData]);

  const loadProductOptionvalues = () => {
    ProductServices.productOptionValue()
      .then((response) => {
        setProductOptionValues(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    ProductServices.productOption()
      .then((response) => {
        setProductoptions(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const removeProductOptionValue = (id) => {
    ProductServices.removeProductOptionValue(id)
      .then(() => {
        setProductOptionValues(productoptionvalues.filter((productoptionvalue) => productoptionvalue.id !== id));
        console.log("Product Option deleted successfully");
        alert("Giá trị Option đã được xóa!");
      })
      .catch((error) => {
        console.error("Error deleting Product Option:", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "option") {
      const selectedOption = productoptions.find(option => option.id === parseInt(value));
      setFormData({
        ...formData,
        [name]: selectedOption,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    ProductServices.createProductOptionValue(formData)
      .then((response) => {
        console.log("Tạo product option thành công:", response.data);
        alert("Thêm giá trị option thành công!");
        loadProductOptionvalues();
      })
      .catch((error) => {
        console.error("Lỗi khi tạo mới option value:", error);
      });
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Giá trị option sản phẩm</h1>
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
                  value={formData.option.id}
                  onChange={handleChange}
                >
                  {productoptions.map((productoption) => (
                    <option key={productoption.id} value={productoption.id}>
                      {productoption.name}
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
                
                  <th>ID Option sản phẩm</th>
              
               
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOptione.map((productoptionvalue, index) => (
                  <tr className="datarow">
                    <td>
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <div className="name">
                        <a>{productoptionvalue.value}</a>
                      </div>
                      <div className="function_style">
                        <a href="#" className="px-1 text-success">
                          <i className="fa fa-toggle-on"></i>
                        </a>
                        <Link
                          to={`/productoptionvalue/edit/${productoptionvalue.id}`}
                          className="px-1 text-primary"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <Link
                          to={`/productoptionvalue/show/${productoptionvalue.id}`}
                          className="px-1 text-info"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                        <a
                          href="#"
                          className="px-1 text-danger"
                          onClick={() => removeProductOptionValue(productoptionvalue.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                    <td>{productoptionvalue.option.name} - {productoptionvalue.option.productId.name}</td>
                    <td className="text-center">{productoptionvalue.id}</td>
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

export default ProductOptionValue;
