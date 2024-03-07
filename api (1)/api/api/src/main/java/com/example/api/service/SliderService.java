package com.example.api.service;



import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.Slider;

public interface SliderService {
    Slider createSlider(Slider slider);

    Slider getSliderById(Long sliderId);

    public Page<Slider> getAllSliders(Pageable pageable);

    Slider updateSlider(Slider slider);

    void deleteSlider(Long sliderId);
}
