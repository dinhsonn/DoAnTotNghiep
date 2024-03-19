import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostServices from "../../../services/PostServices";
import TopicServices from "../../../services/TopicServices";
import axios from "axios";
function PostCreate() {
  const [topics, setTopics] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    detail: '',
    image: '',
    topicId: '',
    type: '',
    status: '',
  });
  const [file, setFile] = useState(null);
  const [imageName, setImageName] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    TopicServices.getAll()
      .then((response) => {
        setTopics(response.data.content);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy topic:", error);
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
    if (!file || !imageName) {
      setMessage("Please select a file and provide a custom name.");
      return;
    }

    const formDataPost = { ...formData };
    formDataPost.image = imageName;

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("customName", imageName);

    try {
      const response = await axios.post(
        "http://localhost:8082/api/posts/image", formDataUpload
      );
      setMessage(response.data);
      setFile(null);
      setImageName("");

      // Sau khi tải lên ảnh thành công, thực hiện tạo mới slider
      PostServices.create(formDataPost)
        .then((response) => {
          console.log("Tạo mới post thành công:", response.data);
          alert("Thêm bài viết thành công!");
        })
        .catch((error) => {
          console.error("Lỗi khi tạo mới post:", error);
        });
    } catch (error) {
      setMessage("Failed to upload image.");
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
        <h1 className="d-inline">Thêm bài viết</h1>
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
                    <option value="">Select Product</option>
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="box-container mt-2 bg-white">
                <div className="box-header py-1 px-2 border-bottom">
                  <strong>Hình đại diện</strong>
                </div>
                <div className="box-body p-2 border-bottom">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    style={{ marginBottom: "5px" }}
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Custom Name"
                    style={{ width: "280px", height: "35px" }}
                    value={imageName}
                    onChange={handleNameChange}
                  />
                  <br />
                </div>
                <div className="box-footer text-end px-2 py-3">
                  <button
                    type="submit"
                    className="btn btn-success btn-sm text-end"
                  >
                    Thêm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}

export default PostCreate;
