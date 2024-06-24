import { Link } from "react-router-dom";
import AboutService from "../../../services/AboutServices";
import { useEffect, useState } from "react";

function About() {
  const [abouts, setAbouts] = useState([]);
  const [aboutLayout1, setAboutLayout1] = useState(null);
  const [aboutLayout2, setAboutLayout2] = useState(null);
  const [aboutLayout3, setAboutLayout3] = useState(null);
  useEffect(() => {
    AboutService.getAll()
      .then((response) => {
        const content = response.data.content;

        const aboutLayout1Data = content.find((item) => item.layout === 1);
        const aboutLayout2Data = content.find((item) => item.layout === 2);
        const aboutLayout3Data = content.find((item) => item.layout === 3);

        setAboutLayout1(aboutLayout1Data);
        setAboutLayout2(aboutLayout2Data);
        setAboutLayout3(aboutLayout3Data);

        const allAbouts = content.filter(
          (item) => item.layout === 1 || item.layout === 2 || item.layout === 3
        );
        setAbouts(allAbouts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <main className="main">
        <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
          <div className="container">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Trang chủ</a>
              </li>
              {/* <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li> */}
              <li className="breadcrumb-item active" aria-current="page">
                Về chúng tôi
              </li>
            </ol>
          </div>
          {/* End .container */}
        </nav>
        {/* End .breadcrumb-nav */}
        <div className="container">
          <div
            className="page-header page-header-big text-center"
            style={{
              backgroundImage: 'url("assets/images/1939.jpg" ',
             
            }}
          >
            <h1 className="page-title text-white">
              Về chúng tôi<span className="text-orage">Who we are</span>
            </h1>
          </div>
          {/* End .page-header */}
        </div>
        {/* End .container */}

        <div className="page-content pb-0">
          <div className="container">
            <div className="row">
              {aboutLayout1 && (
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <h2 className="title">{aboutLayout1.title}</h2>
                  {aboutLayout1.content.split(";").map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                </div>
              )}
              {/* End .col-lg-6 */}
              {aboutLayout2 && (
                <div className="col-lg-6">
                  <h2 className="title">{aboutLayout2.title}</h2>
                  {aboutLayout2.content.split(";").map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}
                </div>
              )}
              {/* End .col-lg-6 */}
            </div>
            {/* End .row */}
            <div className="mb-5" />
            {/* End .mb-4 */}
          </div>
          {/* End .container */}
          <div className="bg-light-2 pt-6 pb-5 mb-6 mb-lg-8">
            <div className="container">
              <div className="row">
                {aboutLayout3 && (
                  <div className="col-lg-5 mb-3 mb-lg-0">
                    <h2 className="title">{aboutLayout3.title}</h2>

                    {aboutLayout3.content.split(";").map((paragraph, index) => (
                      <p key={index}>{paragraph.trim()}</p>
                    ))}

                    <Link
                      to={"/post"}
                      className="btn btn-sm btn-minwidth btn-outline-primary-2"
                    >
                      <span>XEM TIN TỨC CỦA CHÚNG TÔI</span>
                      <i className="icon-long-arrow-right" />
                    </Link>
                  </div>
                )}
                {/* End .col-lg-5 */}
                <div className="col-lg-6 offset-lg-1">
                  <div className="about-images">
                    <img
                      src="assets/images/about/img-1.jpg"
                      alt=""
                      className="about-img-front"
                    />
                    <img
                      src="assets/images/about/img-2.jpg"
                      alt=""
                      className="about-img-back"
                    />
                  </div>
                  {/* End .about-images */}
                </div>
                {/* End .col-lg-6 */}
              </div>
              {/* End .row */}
            </div>
            {/* End .container */}
          </div>
          {/* End .bg-light-2 pt-6 pb-6 */}
       
          {/* End .container */}
          <div className="mb-2" />
          {/* End .mb-2 */}

          {/* End .bg-light-2 pt-5 pb-6 */}
        </div>

        {/* End .page-content */}
      </main>
      {/* End .main */}
    </>
  );
}

export default About;
