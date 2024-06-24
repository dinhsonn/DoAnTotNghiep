import PostService from "../../../services/PostServices";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Post() {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);


  useEffect(() => {
    PostService.getAll()
      .then((response) => {
        setPosts(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    PostService.getAllTopic()
      .then((response) => {
        setTopics(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getImgUrl = (imageName) => {
    const endpoint = "posts";
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };

  // Tính toán các bài viết cho trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const filteredPosts = selectedTopic
  ? posts.filter(post =>
      (post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.detail.toLowerCase().includes(searchTerm.toLowerCase())) &&
      post.topicId.id === selectedTopic
    )
  : posts.filter(post =>
      post.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.detail.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  

  // Tạo danh sách các số trang
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const handleSearch = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };
  const handleTopicClick = (topicId) => {
    setSelectedTopic(topicId === selectedTopic ? null : topicId);
  };
  const topicCounts = topics.reduce((acc, topic) => {
    acc[topic.id] = posts.filter(post => post.topicId.id === topic.id).length;
    return acc;
  }, {});
  
  return (
    <>
      <main className="main">
        <div
          className="page-header text-center"
          style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
        >
          <div className="container">
            <h1 className="page-title">
              Danh sách bài viết
            </h1>
          </div>
          {/* End .container */}
        </div>
        {/* End .page-header */}
        <nav aria-label="breadcrumb" className="breadcrumb-nav mb-3">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Bài viết</a>
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
                {currentPosts.map((post, index) => (
                  <article key={index} className="entry entry-list">
                    <div className="row align-items-center">
                      <div className="col-md-5">
                        <figure className="entry-media">
                          <Link to={`/postdetail/${post.id}`}>
                            <img
                              src={getImgUrl(post.image)}
                              alt={post.image}
                              style={{ width: "380px" }}
                            />
                          </Link>
                        </figure>
                        {/* End .entry-media */}
                      </div>
                      {/* End .col-md-5 */}
                      <div className="col-md-7">
                        <div className="entry-body">
                          {/* End .entry-meta */}
                          <h2 className="entry-title">
                            <Link
                              to={`/postdetail/${post.id}`}
                              className="px-1 text-primary"
                            >
                              {post.name}
                            </Link>
                          </h2>
                          <div className="entry-content">
                            <p>
                              {post.detail.length > 50
                                ? post.detail.slice(0, 250) + "..."
                                : post.detail}
                            </p>
                            <Link to={`/postdetail/${post.id}`}>
                              Continue Reading
                            </Link>
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
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <a
                        className="page-link page-link-prev"
                        href="#"
                        aria-label="Previous"
                        tabIndex={-1}
                        aria-disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <span aria-hidden="true">
                          <i className="icon-long-arrow-left" />
                        </span>
                        Prev
                      </a>
                    </li>
                    {pageNumbers.map(number => (
                      <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <a className="page-link" href="#" onClick={() => setCurrentPage(number)}>
                          {number}
                        </a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === pageNumbers.length ? 'disabled' : ''}`}>
                      <a
                        className="page-link page-link-next"
                        href="#"
                        aria-label="Next"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        aria-disabled={currentPage === pageNumbers.length}
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
              <aside className="col-lg-3" >
                <div className="sidebar">
                  <div className="widget widget-search">
                    <h3 className="widget-title">Tìm kiếm</h3>
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
                        placeholder="Tìm kiếm bài viết"
                        required=""
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button type="submit" className="btn">
                        <i className="icon-search" />
                        <span className="sr-only">Search</span>
                      </button>
                    </form>
                  </div>
                  {/* End .widget */}
                  <div className="widget widget-cats">
                    <h3 className="widget-title">Chủ đề bài viết</h3>
                    {/* End .widget-title */}
                    <ul>
                    {topics.map((topic, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            className={selectedTopic === topic.id ? "active" : ""}
                            onClick={() => handleTopicClick(topic.id)}
                          >
                            {topic.name}
                            <span>{topicCounts[topic.id]}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

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
