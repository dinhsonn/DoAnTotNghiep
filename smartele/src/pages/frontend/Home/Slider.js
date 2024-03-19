import React, { useEffect, useState } from "react";
import SliderService from "../../../services/SliderServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Slider() {
  const [slider, setSlider] = useState(null);
  const [currentSortOrder, setCurrentSortOrder] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextSortOrder = currentSortOrder === 4 ? 1 : currentSortOrder + 1;
      setCurrentSortOrder(nextSortOrder);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearInterval(interval);
  }, [currentSortOrder]);

  useEffect(() => {
    fetchSlider(currentSortOrder);
  }, [currentSortOrder]);

  const fetchSlider = (sortOrder) => {
    SliderService.getAll()
      .then(response => {
        const sliders = response.data.content;
        const currentSlider = sliders.find(slider => slider.sortOrder === sortOrder);
        setSlider(currentSlider);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleNextSlide = () => {
    const nextSortOrder = currentSortOrder === 4 ? 1 : currentSortOrder + 1;
    setCurrentSortOrder(nextSortOrder);
  };

  const handlePreviousSlide = () => {
    const previousSortOrder = currentSortOrder === 1 ? 4 : currentSortOrder - 1;
    setCurrentSortOrder(previousSortOrder);
  };

  return (
    <div style={{ position: "relative" }}>
        {slider && (
          <div>
            <figure style={{ width: "100%", height: "400px", overflow: "hidden" }}>
              <a href={slider.link}>
                <picture style={{ width: "100%", height: "100%", objectFit: "cover" }}>
                  <img src={`http://localhost:8082/api/sliders/image/${slider.image}`} alt={slider.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </picture>
              </a>
            </figure>
            <div className="intro-content">
              <h3 className="intro-subtitle text-primary">{slider.name}</h3>
              <a href={slider.link} className="btn btn-primary btn-round">
                <span>Click Here</span>
              </a>
            </div>
          </div>
        )}
        <div style={{ position: "absolute", left: "10px", top: "50%", cursor: "pointer" }} onClick={handlePreviousSlide}>
          <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: "24px" }} />
        </div>
        <div style={{ position: "absolute", right: "10px", top: "50%", cursor: "pointer" }} onClick={handleNextSlide}>
          <FontAwesomeIcon icon={faChevronRight} style={{ fontSize: "24px" }} />
        </div>
    </div>
  );
}

export default Slider;
