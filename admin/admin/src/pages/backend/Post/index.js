import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostServices from "../../../services/PostServices";
import Pagination from "../../../layouts/LayoutAdmin/Pagination";

function Post() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const response = await PostServices.getAll();
      setPosts(response.data.content);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const removePost = async (id) => {
    try {
      await PostServices.remove(id);
      setPosts(posts.filter(post => post.id !== id));
      console.log("Post deleted successfully");
      alert("Bài viết đã được xóa!");
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const getImgUrl = (imageName) => {
    const endpoint = 'posts';
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter((post) =>
    post.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="content">
      <section className="content-header my-2">
        <h1 className="d-inline">Quản lý bài viết</h1>
        <Link to={"/post/create"} className="btn-add">Thêm mới</Link>
        <div className="row mt-3 align-items-center">
          <div className="col-6">
            <ul className="manager">
              <li><a href="/post">Tất cả ({posts.length})</a></li>
              <li><a href="post_trash.html">Rác (12)</a></li>
            </ul>
          </div>
          <div className="col-6 text-end">
            <input
              type="text"
              className="search d-inline"
              onChange={handleSearch}
              placeholder="Tìm kiếm..."
            />
            <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
        </div>
        <div className="row mt-1 align-items-center">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(filteredPosts.length / productsPerPage)}
            onPageChange={paginate}
          />
        </div>
      </section>
      <section className="content-body my-2">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th className="text-center" style={{width: '30px'}}>
                <input type="checkbox" id="checkboxAll" />
              </th>
              <th className="text-center" style={{width: '130px'}}>Hình ảnh</th>
              <th>Tiêu đề bài viết</th>
              <th>Chi tiết bài viết</th>
              <th>Tên danh mục</th>
              <th>Trạng thái</th>
              <th className="text-center" style={{width: '30px'}}>ID</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.map((post, index) => (
              <tr key={index} className="datarow">
                <td>
                  <input type="checkbox" id={`checkId${index}`} />
                </td>
                <td>
                  <img src={getImgUrl(post.image)} alt={post.image} style={{width: '180px'}}/>
                </td>
                <td>
                  <div className="name">
                    <Link to={`/post/edit/${post.id}`}>{post.name}</Link>
                  </div>
                  <div className="function_style">
                    <Link to={`/post/edit/${post.id}`} className="px-1 text-primary">
                      <i className="fa fa-edit" />
                    </Link>
                    <Link to={`/post/show/${post.id}`} className="px-1 text-info">
                      <i className="fa fa-eye" />
                    </Link>
                    <Link to="#" className="text-danger mx-1" onClick={() => removePost(post.id)}>
                      <i className="fa fa-trash"></i>
                    </Link>
                  </div>
                </td>
                <td>
                  {post.detail.length > 50 ? post.detail.slice(0, 250) + "..." : post.detail}
                </td>
                <td>{post.topicId.name}</td>
                <td>{post.status === 0 ? "Xuất bản" : "Chưa xuất bản"}</td>
                <td className="text-center">{post.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Post;
