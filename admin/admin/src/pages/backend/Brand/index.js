import { useEffect, useState } from "react";
import BrandServices from "../../../services/BrandServices";
import { Link } from "react-router-dom";
import axios from "axios";
function Brand() {
  const [brands, setBrands] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    sortOrder: "",
    status: "0",
  });
  useEffect(() => {
    loadBrands();
  }, []);
  const loadBrands = () => {
    BrandServices.getAll()
      .then((response) => {
        setBrands(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const removeBrands = (id) => {
    BrandServices.remove(id)
      .then(() => {
        setBrands(brands.filter((brand) => brand.id !== id));
        console.log("Brand deleted successfully");
        alert("Thương hiệu đã được xóa!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "sortOrder" && (!Number(value) || Number(value) <= 0)) {
      alert("Thứ tự phải là một số lớn hơn 0!");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };
      //image
   const getImgUrl = (imageName) => {
         const endpoint = 'brand'; 
         return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
   };
   const [file, setFile] = useState(null);
   const [imageName, setImageName] = useState('');
   const [message, setMessage] = useState('');
 
   const handleFileChange = (e) => {
     setFile(e.target.files[0]);
     
   };
 
   const handleNameChange = (e) => {
     setImageName(e.target.value);
   };
   const handleSubmit = async (e) => {
      e.preventDefault();
      if (!file || !imageName) {
        setMessage('Please select a file and provide a custom name.');
        return;
      }
  
      const formDataBrand = { ...formData };
      formDataBrand.image = imageName;
  
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('customName', imageName);
  
      try {
        const response = await axios.post('http://localhost:8082/api/brand/image', formDataUpload);
        setMessage(response.data);
        setFile(null);
        setImageName('');

        BrandServices.create(formDataBrand)
        .then((response) => {
          console.log("Tạo thương hiệu thành công:", response.data);
          alert("Thêm thương hiệu thành công!");
        })
        .catch((error) => {
          console.error("Lỗi khi tạo mới thương hiệu:", error);
        });
      } catch (error) {
        setMessage('Failed to upload image.');
        console.error(error);
      }
    };
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Thương hiệu</h1>
        <hr style={{ border: "none" }} />
      </section>
      <section className="content-body my-2">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  <strong>Tên thương hiệu (*)</strong>
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
                <label>
                  <strong>Thứ tự(*)</strong>
                </label>
                <input
                  type="text"
                  name="sortOrder"
                  id="sortOrder"
                  placeholder="Nhập thứ tự"
                  className="form-control"
                  value={formData.sortOrder}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Mô tả</strong>
                </label>
                <textarea
                  name="description"
                  rows="4"
                  className="form-control"
                  placeholder="Mô tả"
                ></textarea>
              </div>
              <div className="mb-3">
                <label>
                  <strong>Hình đại diện</strong>
                </label>
                <br />
                <input type="file" onChange={handleFileChange} style={{marginBottom:"5px"}}/>
                  <br />
                  <input type="text" placeholder="Custom Name" style={{width:"280px",height:"35px"}} value={imageName} onChange={handleNameChange} />
                  <br />
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
                <button className="btnsearch d-inline">Tìm kiếm</button>
              </div>
            </div>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center" style={{ width: "30px" }}>
                    <input type="checkbox" id="checkboxAll" />
                  </th>
                  <th className="text-center" style={{ width: "90px" }}>
                    Hình ảnh
                  </th>
                  <th>Tên thương hiệu</th>
                  <th>Thứ tự</th>
                  <th>Trạng thái</th>
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr className="datarow" key={brand.id}>
                    <td className="text-center">
                      <input type="checkbox" />
                    </td>
                    <td>
                    <img src={getImgUrl(brand.image)} alt={brand.image} style={{width: '150px'}}/>
                    </td>
                    <td>
                      <div className="name">
                        <a>{brand.name}</a>
                      </div>
                      <div className="function_style">
                        <a href="#" className="px-1 text-success">
                          <i className="fa fa-toggle-on"></i>
                        </a>
                        <Link
                          to={`/brand/edit/${brand.id}`}
                          className="px-1 text-primary"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <Link
                          to={`/brand/show/${brand.id}`}
                          className="px-1 text-info"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                        <a
                          href="#"
                          className="px-1 text-danger"
                          onClick={() => removeBrands(brand.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                    <td>{brand.sortOrder}</td>
                    <td>{brand.status === 0 ? "Xuất bản":"Chưa xuất bản"}</td>
                    <td className="text-center">{brand.id}</td>
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

export default Brand;
