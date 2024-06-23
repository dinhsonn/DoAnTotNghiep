import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductService from '../../../services/ProductServices';
import ImageService from '../../../services/ImageServices';
import axios from 'axios';

function ImageCreate() {
  const location = useLocation();
  const productId = new URLSearchParams(location.search).get('productId'); // Lấy productId từ query params

  const [formData, setFormData] = useState({
    name: '',
    productId: productId || '', // Đặt giá trị mặc định cho productId từ query params
    image: '',
    link: '',
    sortOrder: '',
    status: '1', // Giá trị mặc định là '1' (Xuất bản)
  });

  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Load danh sách sản phẩm khi component mount
    ProductService.getAll()
      .then(response => {
        setProducts(response.data.content);
      })
      .catch(error => {
        console.error('Lỗi khi lấy danh sách sản phẩm:', error);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !imageName || !formData.sortOrder || !formData.productId) {
      setMessage('Please fill in all fields.');
      return;
    }

    const formDataImage = { ...formData };
    formDataImage.image = imageName;

    const formDataUpload = new FormData();
    formDataUpload.append('file', file);
    formDataUpload.append('customName', imageName);

    try {
      const responseUpload = await axios.post('http://localhost:8082/api/productimages/image', formDataUpload);
      setMessage(responseUpload.data);
      setFile(null);
      setImageName('');

      // Sau khi tải lên ảnh thành công, thực hiện tạo mới ảnh
      ImageService.create(formDataImage)
        .then(response => {
          console.log('Tạo mới ảnh thành công:', response.data);
          alert('Thêm ảnh thành công!')
        })
        .catch(error => {
          console.error('Lỗi khi tạo mới ảnh:', error);
        });
    } catch (error) {
      setMessage('Failed to upload image.');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Thêm ảnh</h1>
        <div className="text-end">
          <a href="/image" className="btn btn-sm btn-success">
            <i className="fa fa-arrow-left"></i> Về danh sách
          </a>
        </div>
      </section>
      <section className="content-body my-2">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-9">
              <div className="mb-3">
                <label htmlFor="productId" className="form-label">Product ID:</label>
                <select
                  id="productId"
                  name="productId"
                  className="form-select"
                  onChange={handleChange}
                  value={formData.productId}
                >
                  <option value="">Select Product</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label><strong>Tên ảnh (*)</strong></label>
                <input type="text" name="name" className="form-control" placeholder="Nhập tên slider" onChange={handleChange} value={formData.name}/>
              </div>
              <div className="mb-3">
                <label><strong>Thứ tự (*)</strong></label>
                <input type="text" name="sortOrder" className="form-control" placeholder="Nhập thứ tự" onChange={handleChange} value={formData.sortOrder}/>
              </div>
              <div className="mb-3">
                <label><strong>Liên kết</strong></label>
                <input type="text" name="link" className="form-control" placeholder="Nhập liên kết" onChange={handleChange} value={formData.link}/>
              </div>
            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <p>Chọn trạng thái đăng</p>
                  <select name="status" className="form-select" onChange={handleChange} value={formData.status}>
                    <option value="1">Xuất bản</option>
                    <option value="2">Chưa xuất bản</option>
                  </select>
                </div>
              </div>
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình (*)</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <input type="file" onChange={handleFileChange} style={{marginBottom:"5px"}}/>
                  <br />
                  <input type="text" placeholder="Custom Name" style={{width:"280px",height:"35px"}} value={imageName} onChange={handleNameChange} />
                  <br />
                </div>
                <div className="box-footer text-end px-2 py-3">
                  <button type="submit" className="btn btn-success btn-sm text-end">Thêm</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ImageCreate;
