import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostServices from "../../../services/PostServices";
import TopicServices from "../../../services/TopicServices";
import axios from "axios";

function PostEdit() {
   let { id } = useParams(); // Lấy id của bài viết cần chỉnh sửa từ URL
  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    detail: "",
    topicId: "",
    status: "",
    image: '',
  });
  const [newImage, setNewImage] = useState(null);
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Lấy thông tin của bài viết cần chỉnh sửa từ API và cập nhật vào form
    PostServices.getById(id)
      .then((response) => {
        const postData = response.data;
        setFormData(response.data);
        setImageName(response.data.image.replace('.png', ''));

      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin bài viết:", error);
      });
    TopicServices.getAll()
      .then((response) => {
        setTopics(response.data.content);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy danh sách chủ đề:", error);
      });
  }, [id]); // Thêm id vào dependency array để useEffect chạy lại khi id thay đổi

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
       setMessage('Vui lòng nhập tên tùy chỉnh.');
       return;
   }

   const formDataImage = { ...formData };
   const fileName = imageName.endsWith('.png') ? imageName : imageName + '.png';
   formDataImage.image = fileName;

   try {
       if (newImage) {
           const formDataUpload = new FormData();
           formDataUpload.append('file', file);
           formDataUpload.append('customName', imageName);

           const response = await axios.post('http://localhost:8082/api/post/image', formDataUpload);
           setMessage(response.data);
           setFile(null);
           setImageName('');
       }

       if (newImage) {
         PostServices.update(formData, id)
               .then(response => {
                   console.log("Updated image:", response.data);
                   alert('Ảnh cập nhật thành công!');
               })
               .catch(error => {
                   console.error('Error updating image:', error);
               });
       } else {
         PostServices.update(formDataImage, id)
               .then(response => {
                   console.log("Updated image:", response.data);
                   alert('Ảnh cập nhật thành công!');
               })
               .catch(error => {
                   console.error('Error updating image:', error);
               });
       }
   } catch (error) {
       setMessage('Lỗi khi tải lên ảnh.');
       console.error(error);
   }
};

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Cập nhật bài viết</h1>
        <div className="text-end">
          <Link to={"/post"} className="btn btn-sm btn-success">
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
                  <strong>Tiêu đề bài viết (*)</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Nhập tiêu đề"
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Slug (*)</strong>
                </label>
                <input
                  type="text"
                  name="slug"
                  className="form-control"
                  placeholder="Nhập đường dẫn bài viết"
                  onChange={handleChange}
                  value={formData.slug}
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Chi tiết (*)</strong>
                </label>
                <textarea
                  name="detail"
                  rows="7"
                  className="form-control"
                  placeholder="Nhập chi tiết"
                  onChange={handleChange}
                  value={formData.detail}
                ></textarea>
              </div>
            </div>
            <div className="col-md-3">
              <div className="box-container mt-4 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Đăng</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <p>Chọn trạng thái đăng</p>
                  <select
                    name="status"
                    className="form-select"
                    onChange={handleChange}
                    value={formData.status}
                  >
                    <option value="0">Xuất bản</option>
                    <option value="1">Chưa xuất bản</option>
                  </select>
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Chủ đề (*)</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <select
                    name="topicId"
                    className="form-select"
                    onChange={handleChange}
                    value={formData.topicId}
                  >
                    <option value="">Chọn chủ đề</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
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
                    </div>
              <button type="submit" className="btn btn-success btn-sm mt-3">
                Cập nhật
              </button>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PostEdit;
