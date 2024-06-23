import React, { useEffect, useState } from "react";
import SliderService from "../../../services/SliderServices";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

function Slider() {
  const [sliders, setSliders] = useState([]);
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);

  useEffect(() => {
    fetchSliders();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSliderIndex]);

  const fetchSliders = () => {
    SliderService.getAll()
      .then(response => {
        const fetchedSliders = response.data.content;
        setSliders(fetchedSliders);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleNextSlide = () => {
    const nextIndex = (currentSliderIndex + 1) % sliders.length;
    setCurrentSliderIndex(nextIndex);
  };

  const handlePreviousSlide = () => {
    const previousIndex = (currentSliderIndex - 1 + sliders.length) % sliders.length;
    setCurrentSliderIndex(previousIndex);
  };

  const currentSlider = sliders[currentSliderIndex];

  return (
    <div style={{ position: "relative" }}>
        {currentSlider && (
          <div>
            <figure style={{ width: "100%", height: "400px", overflow: "hidden" }}>
              <a>
                <picture style={{ width: "100%", height: "100%", objectFit: "cover" }}>
                  <img src={`http://localhost:8082/api/sliders/image/${currentSlider.image}`} alt={currentSlider.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </picture>
              </a>
            </figure>
            <div className="intro-content">
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
