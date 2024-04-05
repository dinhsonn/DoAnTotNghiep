import { useParams } from "react-router-dom";
import BannerService from "../../../services/BannerServices";
import { useEffect, useState } from "react";
import axios from "axios";

function BannerEdit() {
  let { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    sort: '',
    image: '',
    type: '',
    status: '',
  });

  const [newImage, setNewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    BannerService.getById(id)
      .then(response => {
        setFormData(response.data);
        setImageName(response.data.image.replace('.png', ''));
      })
      .catch(error => {
        console.error('Error fetching banner data:', error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (newImage) {
      setNewImage(null);
    }
    setFormData(prevState => ({
      ...prevState,
      [name]: value
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
      setMessage('Please provide a custom name.');
      return;
    }
  
    const formDataBanner = { ...formData };
    const fileName = imageName.endsWith('.png') ? imageName : imageName + '.png';
    formDataBanner.image = fileName;
  
    try {
      if (newImage) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', file);
        formDataUpload.append('customName', imageName);
  
        const response = await axios.post('http://localhost:8082/api/banners/image', formDataUpload);
        setMessage(response.data);
        setFile(null);
        setImageName('');
  
        BannerService.update(formDataBanner, id)
          .then(response => {
            console.log("Updated banner:", response.data);
            alert('Banner cập nhật thành công!')
          })
          .catch(error => {
            console.error('Error updating banner:', error);
          });
      } else {
        BannerService.update(formDataBanner, id)
          .then(response => {
            console.log("Updated banner:", response.data);
            alert('Banner cập nhật thành công!')
          })
          .catch(error => {
            console.error('Error updating banner:', error);
          });
      }
    } catch (error) {
      setMessage('Failed to upload image.');
      console.error(error);
    }
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Cập nhật banner</h1>
        <div className="text-end">
          <a href="/banner" className="btn btn-sm btn-success">
            <i className="fa fa-arrow-left"></i> Về danh sách
          </a>
        </div>
      </section>
      <section className="content-body my-2">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label><strong>Tên banner (*)</strong></label>
                <input type="text" name="name" className="form-control" placeholder="Nhập tên banner" onChange={handleChange} value={formData.name} />
              </div>
              <div className="mb-3">
                <label><strong>Liên kết</strong></label>
                <input type="text" name="link" className="form-control" placeholder="Nhập liên kết" onChange={handleChange} value={formData.link} />
              </div>
              <div className="mb-3">
                <label><strong>Type</strong></label>
                <input type="text" name="type" className="form-control" placeholder="Nhập type" onChange={handleChange} value={formData.type} />
              </div>
            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Trạng thái</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <p>Chọn trạng thái</p>
                  <select name="status" className="form-select" onChange={handleChange} value={formData.status}>
                    <option value="1">Xuất bản</option>
                    <option value="2">Chưa xuất bản</option>
                  </select>
                </div>
              </div>
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình ảnh (*)</strong>
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
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default BannerEdit;
