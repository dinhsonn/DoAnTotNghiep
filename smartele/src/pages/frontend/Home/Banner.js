function Banner() {
    return ( 
        <div className="col-lg-4">
        <div className="intro-banners">
          <div className="banner mb-lg-1 mb-xl-2">
            <a href="#">
              <img
                src="assets/images/demos/demo-3/banners/banner-1.jpg"
                alt="Banner"
              />
            </a>
            <div className="banner-content">
              <h4 className="banner-subtitle d-lg-none d-xl-block">
                <a href="#">Top Product</a>
              </h4>
              {/* End .banner-subtitle */}
              <h3 className="banner-title">
                <a href="#">
                  Edifier <br />
                  Stereo Bluetooth
                </a>
              </h3>
              {/* End .banner-title */}
              <a href="#" className="banner-link">
                Shop Now
                <i className="icon-long-arrow-right" />
              </a>
            </div>
            {/* End .banner-content */}
          </div>
          {/* End .banner */}
          <div className="banner mb-lg-1 mb-xl-2">
            <a href="#">
              <img
                src="assets/images/demos/demo-3/banners/banner-2.jpg"
                alt="Banner"
              />
            </a>
            <div className="banner-content">
              <h4 className="banner-subtitle d-lg-none d-xl-block">
                <a href="#">Clearance</a>
              </h4>
              {/* End .banner-subtitle */}
              <h3 className="banner-title">
                <a href="#">
                  GoPro - Fusion 360 <span>Save $70</span>
                </a>
              </h3>
              {/* End .banner-title */}
              <a href="#" className="banner-link">
                Shop Now
                <i className="icon-long-arrow-right" />
              </a>
            </div>
            {/* End .banner-content */}
          </div>
          {/* End .banner */}
          <div className="banner mb-0">
            <a href="#">
              <img
                src="assets/images/demos/demo-3/banners/banner-3.jpg"
                alt="Banner"
              />
            </a>
            <div className="banner-content">
              <h4 className="banner-subtitle d-lg-none d-xl-block">
                <a href="#">Nổi bật</a>
              </h4>
              {/* End .banner-subtitle */}
              <h3 className="banner-title">
                <a href="#">
                  Apple Watch 4 <span>Our Hottest Deals</span>
                </a>
              </h3>
              {/* End .banner-title */}
              <a href="#" className="banner-link">
                Shop Now
                <i className="icon-long-arrow-right" />
              </a>
            </div>
            {/* End .banner-content */}
          </div>
          {/* End .banner */}
        </div>
        {/* End .intro-banners */}
      </div>
     );
}

export default Banner;