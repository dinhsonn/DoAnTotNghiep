import PostService from "../../../services/PostServices";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function PostDetail() {

  const { id } = useParams();
  const [post, setPostData] = useState(null);

  useEffect(() => {
    PostService.getById(id)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi lấy thông tin bài viết:", error);
      });
  }, [id]); 
  const getImgUrl = (imageName) => {
    const endpoint = 'posts'; 
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
};
    return (  
        <main className="main">
  <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
    <div className="container">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="/">Home</a>
        </li>
        <li className="breadcrumb-item">
          <a href="#">Blog</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Fullwidth
        </li>
      </ol>
    </div>
    {/* End .container */}
  </nav>
  {post && (
  <div className="page-content">
    <figure>
    <img src={getImgUrl(post.image)} alt={post.image} style={{ width: '30%', display: 'block', margin: '0 auto' }} />
    </figure>
    <div className="container">
      <article className="entry single-entry entry-fullwidth">
        <div className="row">
          <div className="col-lg-11">
            <div className="entry-body">
              <div className="entry-meta">
              </div>
              <h2 className="entry-title entry-title-big">
                {post.name}
              </h2>
              <div className="entry-content editor-content">
                <p>
                {post.detail.split(';').map((line, index) => (
                        <p key={index}>
                          {line.trim()}
                          {index < post.detail.split(';').length - 1 && <br />}
                        </p>
                      ))}
                </p>
              </div>
              <div className="entry-footer row no-gutters">
                <div className="col">
                  <div className="entry-tags">
                    <span>Tags:</span> <a href="#">photography</a>{" "}
                    <a href="#">style</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 
      </article>
      {/* End .pager-nav */}

    </div>
    
    {/* End .container */}
  </div>
           )}
          </main>

    );
}

export default PostDetail;