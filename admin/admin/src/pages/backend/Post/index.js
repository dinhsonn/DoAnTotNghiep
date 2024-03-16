import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostServices from "../../../services/PostServices";
function Post() {
   const [posts , setPosts] = useState([]);
   useEffect(() => {
      PostServices.getAll()
       .then(response => {
         setPosts(response.data.content);
       })
       .catch(error => {
         console.error('Error fetching data:', error);
       });
   }, []);
   const removePost = (id) => {
      PostServices.remove(id)
        .then(() => {
         setPosts(posts.filter(post => post.id !== id));
          console.log("Post deleted successfully");
          alert("Bài viết đã được xóa!")
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    };
    //image
    const getImgUrl = (imageName) => {
      const endpoint = 'posts'; 
      return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
    return (   
    <div className="content">
    <section className="content-header my-2">
       <h1 className="d-inline">Quản lý bài viết</h1>
       <Link to={"/post/create"} className="btn-add">Thêm mới</Link>
       <div className="row mt-3 align-items-center">
          <div className="col-6">
             <ul className="manager">
                <li><a href="post_index.html">Tất cả (123)</a></li>
                <li><a href="#">Xuất bản (12)</a></li>
                <li><a href="post_trash.html">Rác (12)</a></li>
             </ul>
          </div>
          <div className="col-6 text-end">
             <input type="text" className="search d-inline" />
             <button className="d-inline btnsearch">Tìm kiếm</button>
          </div>
       </div>
       <div className="row mt-1 align-items-center">
          <div className="col-md-8">
             <select name="" className="d-inline me-1">
                <option value="">Hành động</option>
                <option value="">Bỏ vào thùng rác</option>
             </select>
             <button className="btnapply">Áp dụng</button>
             <select name="" className="d-inline me-1">
                <option value="">Chủ đề</option>
             </select>
             <button className="btnfilter">Lọc</button>
          </div>
          <div className="col-md-4 text-end">
             <nav aria-label="Page navigation example">
                <ul className="pagination pagination-sm justify-content-end">
                   <li className="page-item disabled">
                      <a className="page-link">&laquo;</a>
                   </li>
                   <li className="page-item"><a className="page-link" href="#">1</a></li>
                   <li className="page-item"><a className="page-link" href="#">2</a></li>
                   <li className="page-item"><a className="page-link" href="#">3</a></li>
                   <li className="page-item">
                      <a className="page-link" href="#">&raquo;</a>
                   </li>
                </ul>
             </nav>
          </div>
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
            {posts.map((post,index)=>(
             <tr className="datarow">
                <td>
                   <input type="checkbox" id="checkId" />
                </td>
                <td>
                <img src={getImgUrl(post.image)} alt={post.image} style={{width: '180px'}}/>
                </td>
                <td>
                   <div className="name">
                      <a>
                         {post.name}
                      </a>
                   </div>
                   <div className="function_style">
                      <a href="#" className="text-success mx-1">
                         <i className="fa fa-toggle-on"></i>
                      </a>
                      <a href="post_edit.html" className="text-primary mx-1">
                         <i className="fa fa-edit"></i>
                      </a>
                      <a href="post_show.html" className="text-info mx-1">
                         <i className="fa fa-eye"></i>
                      </a>
                      <Link to="#" className="text-danger mx-1" onClick={() => removePost(post.id)}>
                             <i className="fa fa-trash"></i>
                          </Link>
                   </div>
                </td>
                <td>{post.detail}</td>
                <td>{post.topicId}</td>
                <td>{post.status}</td>
                <td className="text-center">{post.id}</td>
             </tr>
            ))}
          </tbody>
       </table>

    </section>
 </div> );
}

export default Post;