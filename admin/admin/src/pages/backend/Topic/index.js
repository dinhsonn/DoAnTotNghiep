import { useEffect, useState } from "react";
import TopicService from "../../../services/TopicServices";
import { Link } from "react-router-dom";

function Topic() {
  const [topics, setTopic] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    parentId: "",
    sortOrder: "",
    status: "0",
  });

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = () => {
    TopicService.getAll()
      .then((response) => {
        setTopic(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const removeProduct = (id) => {
    TopicService.remove(id)
      .then(() => {
        setTopic(topics.filter((topic) => topic.id !== id));
        console.log("Topic deleted successfully");
        alert("Topic đã được xóa!");
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
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
    TopicService.create(formData)
      .then((response) => {
        console.log("Tạo chủ đề thành công:", response.data);
        alert("Thêm chủ đề thành công!");
      })
      .catch((error) => {
        console.error("Lỗi khi tạo mới người dùng:", error);
      });
  };

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Chủ đề bài viết</h1>
        <hr style={{ border: "none" }} />
      </section>
      <section className="content-body my-2">
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>
                  <strong>Tên chủ đề (*)</strong>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Tên chủ để"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Tên đường dẫn (*)</strong>
                </label>
                <input
                  type="text"
                  name="slug"
                  className="form-control"
                  placeholder="Tên đường dẫn"
                  value={formData.slug}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>
                  <strong>Thứ tự (*)</strong>
                </label>
                <input
                  type="text"
                  name="sortOrder"
                  className="form-control"
                  placeholder="Thứ tự"
                  value={formData.sortOrder}
                  onChange={handleChange}
                />
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
                  <option value="1">Xuất bản</option>
                  <option value="2">Chưa xuất bản</option>
                </select>
              </div>
              <div className="mb-3">
                <label>
                  <strong>Danh mục cha</strong>
                </label>
                <select
                  name="parentId"
                  className="form-control"
                  value={formData.parentId}
                  onChange={handleChange}
                >
                  <option value="">None</option>
                  {topics.map((topic) => (
                    <option key={topic.id} value={topic.id}>
                      {topic.name}
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
                  <th>Tên chủ đề</th>
                  <th>Tên slug</th>
                  <th>Danh mục cha</th>
                  <th>Thứ tự</th>
                  <th>Trạng thái</th>
                  <th className="text-center" style={{ width: "30px" }}>
                    ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {topics.map((topic, index) => (
                  <tr className="datarow">
                    <td>
                      <input type="checkbox" id="checkId" />
                    </td>
                    <td>
                      <div className="name">
                        <a>{topic.name}</a>
                      </div>
                      <div className="function_style">
                        <a href="#" className="px-1 text-success">
                          <i className="fa fa-toggle-on"></i>
                        </a>
                        <Link
                          to={`/topic/edit/${topic.id}`}
                          className="px-1 text-primary"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <Link
                          to={`/topic/show/${topic.id}`}
                          className="px-1 text-info"
                        >
                          <i className="fa fa-eye"></i>
                        </Link>
                        <a
                          href="#"
                          className="px-1 text-danger"
                          onClick={() => removeProduct(topic.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </a>
                      </div>
                    </td>
                    <td>{topic.slug}</td>
                    <td>{topics.find(top => top.id === topic.parentId)?.name || 'None'}</td>
                    <td>{topic.sortOrder}</td>
                    <td>{topic.status === 0 ? "Xuất bản": "Chưa xuất bản"}</td>
                    <td className="text-center">1</td>
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

export default Topic;
