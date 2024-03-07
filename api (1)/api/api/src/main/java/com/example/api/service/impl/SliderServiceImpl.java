package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.Slider;
import com.example.api.service.SliderService;
import com.example.api.repository.SliderRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SliderServiceImpl implements SliderService {

    private final SliderRepository sliderRepository;

    @Override
    public Slider createSlider(Slider slider) {
        slider.setCreatedAt(new Date());
        return sliderRepository.save(slider);
    }

    @Override
    public Slider getSliderById(Long sliderId) {
        Optional<Slider> optionalSlider = sliderRepository.findById(sliderId);
        return optionalSlider.orElse(null);
    }

    @Override
    public Page<Slider> getAllSliders(Pageable pageable){
        return sliderRepository.findAll(pageable);
    }

    @Override
    public Slider updateSlider(Slider slider) {
        Slider existingSlider = sliderRepository.findById(slider.getId()).orElse(null);
        if (existingSlider != null) {
            existingSlider.setName(slider.getName());
            existingSlider.setLink(slider.getLink());
            existingSlider.setSortOrder(slider.getSortOrder());
            existingSlider.setUpdatedAt(new Date());
            existingSlider.setStatus(slider.getStatus());
            existingSlider.setImage(slider.getImage());

            return sliderRepository.save(existingSlider);
        }
        return null;
    }

    @Override
    public void deleteSlider(Long sliderId) {
        sliderRepository.deleteById(sliderId);
    }
}
