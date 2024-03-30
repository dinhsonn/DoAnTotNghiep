import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PostServices from "../../../services/PostServices";

function PostShow() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    PostServices.getById(id)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin bài viết:", error);
      });
  }, [id]); 

  if (!postData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Chi tiết</h1>
        <div className="row mt-2 align-items-center">
          <div className="col-md-12 text-end">
            <Link to="/post" className="btn btn-primary btn-sm">
              <i className="fa fa-arrow-left"></i> Về danh sách
            </Link>
            <Link to={`/post/edit/${id}`} className="btn btn-success btn-sm">
              <i className="fa fa-edit"></i> Sửa
            </Link>
          </div>
        </div>
      </section>
      <section className="content-body my-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th style={{ width: "180px" }}>Tên trường</th>
              <th>Giá trị</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Id</td>
              <td>{postData.id}</td>
            </tr>
            <tr>
              <td>Tiêu đề</td>
              <td>{postData.name}</td>
            </tr>
            <tr>
              <td>Slug</td>
              <td>{postData.slug}</td>
            </tr>
            <tr>
              <td>Chi tiết</td>
              <td>{postData.detail}</td>
            </tr>
            <div className=   "mb-3">
                    <label htmlFor="image" className="form-label">Ảnh:</label>
                    <img src={`http://localhost:8082/api/posts/image/${postData.image}`} alt={postData.image} width="200px" />
                </div>
            {/* Thêm các trường dữ liệu khác cần hiển thị ở đây */}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default PostShow;
