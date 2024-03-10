import { Link, useParams } from "react-router-dom";
import BrandServices from "../../../services/BrandServices";
import { useEffect, useState } from "react";
import axios from "axios";
function BrandEdit() {
  let { id } = useParams();
  const [formData, setFormData] = useState({
   name: "",
   image: "",
   sortOrder: "",
   status: "0",
  });
  const [newImage, setNewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    BrandServices.getById(id)
      .then((response) => {
        setFormData(response.data);
        setImageName(response.data.image.replace(".png", ""));
      })
      .catch((error) => {
        console.error("Error fetching slider data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (newImage) {
      setNewImage(null);
    }
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setNewImage(selectedFile);
  };

  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageName) {
      setMessage("Please provide a custom name.");
      return;
    }

    const formDataBrand = { ...formData };
    const fileName = imageName.endsWith(".png")
      ? imageName
      : imageName + ".png";
    formDataBrand.image = fileName;

    try {
      if (newImage) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", file);
        formDataUpload.append("customName", imageName);

        const response = await axios.post(
          "http://localhost:8082/api/brand/image",
          formDataUpload
        );
        setMessage(response.data);
        setFile(null);
        setImageName("");

        BrandServices.update(formDataBrand, id)
          .then((response) => {
            console.log("Updated brand:", response.data);
            alert("Thương hiệu cập nhật thành công!");
          })
          .catch((error) => {
            console.error("Error updating slider:", error);
          });
      } else {
        BrandServices.update(formDataBrand, id)
          .then((response) => {
            console.log("Updated brand:", response.data);
            alert("Thương hiệu cập nhật thành công!");
          })
          .catch((error) => {
            console.error("Error updating slider:", error);
          });
      }
    } catch (error) {
      setMessage("Failed to upload image.");
      console.error(error);
    }
  };
  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Cập nhật thương hiệu</h1>
        <div className="text-end">
          <Link to={"/brand"} className="btn btn-sm btn-success">
            <i className="fa fa-arrow-left"></i> Về danh sách
          </Link>
        </div>
      </section>
      <section className="content-body my-2">
        <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-9">
            <div className="mb-3">
              <label>
                <strong>Tên thương hiệu (*)</strong>
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange} value={formData.name}
                required
              />
            </div>

          </div>
          <div className="col-md-3">
            <div className="box-container mt-4 bg-white">
              <div className="box-header py-1 px-2 border-bottom">
                <strong>Đăng</strong>
              </div>
              <div className="box-body p-2 border-bottom">
                <p>Chọn trạng thái đăng</p>
                <select name="status" className="form-control"  onChange={handleChange} value={formData.status}>
                  <option value="0">Xuất bản</option>
                  <option value="1">Chưa xuất bản</option>
                </select>
              </div>
          
            </div>
            <div className="box-container mt-2 bg-white">
              <div className="box-header py-1 px-2 border-bottom">
                <strong>Hình đại diện</strong>
              </div>
              <div className="box-body p-2 border-bottom">
              <input type="file" onChange={handleFileChange} />
                  <br />
                  <input type="text" placeholder="Custom Name" value={imageName} onChange={handleNameChange} />
                  <br />
              </div>
              <div className="box-footer text-end px-2 py-3">
                  <button type="submit" className="btn btn-success btn-sm text-end">Upload</button>
                </div>
            </div>
            <div className="box-container mt-2 bg-white">
              <div className="box-header py-1 px-2 border-bottom">
                <strong>Thứ tự</strong>
              </div>
              <div className="box-body p-2 border-bottom">
              <input
                type="text"
                name="sortOrder"
                className="form-control"
                onChange={handleChange} value={formData.sortOrder}
                required
              />
              </div>
            </div>
          </div>
        </div>
        </form>
      </section>
    </div>
  );
}

export default BrandEdit;
