import React, { useState, useEffect } from "react";
import BannerService from "../../../services/BannerServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
function Banner() {
  const [banners, setBanners] = useState([]);
  //api này gọi user 
  useEffect(() => {
    BannerService.getAll()
      .then(response => {
        setBanners(response.data.content);
        console.log("data", response.data.content)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const getImgUrl = (imageName) => {
    const endpoint = 'banners';
    return `http://localhost:8082/api/${endpoint}/image/${imageName}`;
  };
  return (
    <div className="col-lg-4">
      <div>
        {banners.map((banner, index) => (
          <div className="banner mb-lg-1 mb-xl-2" key={banner.id} >
            <a href={banner.link} >
            <img  src={getImgUrl(banner.image)} alt="Banner" />
            </a>
            <div className="banner-content">
              <h4 className="banner-subtitle d-lg-none d-xl-block">
                <a href="#">{banner.name}</a>
              </h4>
              <h3 className="banner-title">
                <a href="#">{banner.type}</a>
              </h3>
              <a href="#" className="banner-link">
                Shop Now
                <i className="icon-long-arrow-right" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Banner;
