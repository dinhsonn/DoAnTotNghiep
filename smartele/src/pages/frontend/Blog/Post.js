import PostService from "../../../services/PostServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Post() {
  const [posts , setPosts] = useState([]);
  useEffect(() => {
     PostService.getAll()
      .then(response => {
        setPosts(response.data.content);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const getImgUrl = (imageName) => {
    const endpoint = 'posts'; 
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
};
    return ( 
        <>
  <main className="main">
    <div
      className="page-header text-center"
      style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
    >
      <div className="container">
        <h1 className="page-title">
          Blog Listing<span>Blog</span>
        </h1>
      </div>
      {/* End .container */}
    </div>
    {/* End .page-header */}
    <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
      <div className="container">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Blog</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Listing
          </li>
        </ol>
      </div>
      {/* End .container */}
    </nav>
    {/* End .breadcrumb-nav */}
    <div className="page-content">
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
          {posts.map((post,index)=>(
            <article className="entry entry-list">
              <div className="row align-items-center">
                <div className="col-md-5">
                  <figure className="entry-media">
                    <a href="single.html">
                    <img src={getImgUrl(post.image)} alt={post.image} style={{width: '180px'}}/>

                    </a>
                  </figure>
                  {/* End .entry-media */}
                </div>
                {/* End .col-md-5 */}
                <div className="col-md-7">
                  <div className="entry-body">
                    {/* End .entry-meta */}
                    <h2 className="entry-title">
                    <Link to={`/postdetail/${post.id}`} className="px-1 text-primary">
  {post.name}
</Link>
                    </h2>
                    <div className="entry-content">
                      <p>
                      {post.detail}
                      </p>
                      <a href="single.html" className="read-more">
                        Continue Reading
                      </a>
                    </div>
                    {/* End .entry-content */}
                  </div>
                  {/* End .entry-body */}
                </div>
                {/* End .col-md-7 */}
              </div>
              {/* End .row */}
            </article>
          ))}
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item disabled">
                  <a
                    className="page-link page-link-prev"
                    href="#"
                    aria-label="Previous"
                    tabIndex={-1}
                    aria-disabled="true"
                  >
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-left" />
                    </span>
                    Prev
                  </a>
                </li>
                <li className="page-item active" aria-current="page">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a
                    className="page-link page-link-next"
                    href="#"
                    aria-label="Next"
                  >
                    Next{" "}
                    <span aria-hidden="true">
                      <i className="icon-long-arrow-right" />
                    </span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          {/* End .col-lg-9 */}
          <aside className="col-lg-3">
            <div className="sidebar">
              <div className="widget widget-search">
                <h3 className="widget-title">Search</h3>
                {/* End .widget-title */}
                <form action="#">
                  <label htmlFor="ws" className="sr-only">
                    Search in blog
                  </label>
                  <input
                    type="search"
                    className="form-control"
                    name="ws"
                    id="ws"
                    placeholder="Search in blog"
                    required=""
                  />
                  <button type="submit" className="btn">
                    <i className="icon-search" />
                    <span className="sr-only">Search</span>
                  </button>
                </form>
              </div>
              {/* End .widget */}
              <div className="widget widget-cats">
                <h3 className="widget-title">Categories</h3>
                {/* End .widget-title */}
                <ul>
                  <li>
                    <a href="#">
                      Lifestyle<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Shopping<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Fashion<span>1</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Travel<span>3</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      Hobbies<span>2</span>
                    </a>
                  </li>
                </ul>
              </div>
              {/* End .widget */}
              <div className="widget">
                <h3 className="widget-title">Popular Posts</h3>
                {/* End .widget-title */}
                <ul className="posts-list">
                  <li>
                    <figure>
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/post-1.jpg"
                          alt="post"
                        />
                      </a>
                    </figure>
                    <div>
                      <span>Nov 22, 2018</span>
                      <h4>
                        <a href="#">Aliquam tincidunt mauris eurisus.</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/post-2.jpg"
                          alt="post"
                        />
                      </a>
                    </figure>
                    <div>
                      <span>Nov 19, 2018</span>
                      <h4>
                        <a href="#">Cras ornare tristique elit.</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/post-3.jpg"
                          alt="post"
                        />
                      </a>
                    </figure>
                    <div>
                      <span>Nov 12, 2018</span>
                      <h4>
                        <a href="#">Vivamus vestibulum ntulla nec ante.</a>
                      </h4>
                    </div>
                  </li>
                  <li>
                    <figure>
                      <a href="#">
                        <img
                          src="assets/images/blog/sidebar/post-4.jpg"
                          alt="post"
                        />
                      </a>
                    </figure>
                    <div>
                      <span>Nov 25, 2018</span>
                      <h4>
                        <a href="#">Donec quis dui at dolor tempor interdum.</a>
                      </h4>
                    </div>
                  </li>
                </ul>
                {/* End .posts-list */}
              </div>
              {/* End .widget */}
              <div className="widget widget-banner-sidebar">
                <div className="banner-sidebar-title">ad box 280 x 280</div>
                {/* End .ad-title */}
                <div className="banner-sidebar banner-overlay">
                  <a href="#">
                    <img
                      src="assets/images/blog/sidebar/banner.jpg"
                      alt="banner"
                    />
                  </a>
                </div>
                {/* End .banner-ad */}
              </div>
              {/* End .widget */}
              <div className="widget">
                <h3 className="widget-title">Browse Tags</h3>
                {/* End .widget-title */}
                <div className="tagcloud">
                  <a href="#">fashion</a>
                  <a href="#">style</a>
                  <a href="#">women</a>
                  <a href="#">photography</a>
                  <a href="#">travel</a>
                  <a href="#">shopping</a>
                  <a href="#">hobbies</a>
                </div>
                {/* End .tagcloud */}
              </div>
              {/* End .widget */}
              <div className="widget widget-text">
                <h3 className="widget-title">About Blog</h3>
                {/* End .widget-title */}
                <div className="widget-text-content">
                  <p>
                    Vestibulum volutpat, lacus a ultrices sagittis, mi neque
                    euismod dui, pulvinar nunc sapien ornare nisl.
                  </p>
                </div>
                {/* End .widget-text-content */}
              </div>
              {/* End .widget */}
            </div>
            {/* End .sidebar */}
          </aside>
          {/* End .col-lg-3 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </div>
    {/* End .page-content */}
  </main>
  {/* End .main */}
</>

     );
}

export default Post;