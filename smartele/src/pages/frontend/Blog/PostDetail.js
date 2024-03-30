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
    <figure className="entry-media">
    <img src={getImgUrl(post.image)} alt={post.image} style={{ width: '20%', display: 'block', margin: '0 auto' }} />
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
                {post.detail}
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
      <div className="related-posts">
        <h3 className="title">Related Posts</h3>
        <div
          className="owl-carousel owl-simple"
          data-toggle="owl"
          data-owl-options='{
                          "nav": false, 
                          "dots": true,
                          "margin": 20,
                          "loop": false,
                          "responsive": {
                              "0": {
                                  "items":1
                              },
                              "480": {
                                  "items":2
                              },
                              "768": {
                                  "items":3
                              },
                              "992": {
                                  "items":4
                              }
                          }
                      }'
        >
          <article className="entry entry-grid">
            <figure className="entry-media">
              <a href="single.html">
                <img
                  src="assets/images/blog/grid/3cols/post-1.jpg"
                  alt="image desc"
                />
              </a>
            </figure>
            {/* End .entry-media */}
            <div className="entry-body">
              <div className="entry-meta">
                <a href="#">Nov 22, 2018</a>
                <span className="meta-separator">|</span>
                <a href="#">2 Comments</a>
              </div>
              {/* End .entry-meta */}
              <h2 className="entry-title">
                <a href="single.html">Cras ornare tristique elit.</a>
              </h2>
              {/* End .entry-title */}
              <div className="entry-cats">
                in <a href="#">Lifestyle</a>,<a href="#">Shopping</a>
              </div>
              {/* End .entry-cats */}
            </div>
            {/* End .entry-body */}
          </article>
        </div>
        {/* End .owl-carousel */}
      </div>
    </div>
    
    {/* End .container */}
  </div>
           )}
          </main>

    );
}

export default PostDetail;