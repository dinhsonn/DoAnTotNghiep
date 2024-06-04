package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.TrashSlider;

public interface TrashSliderService {
    TrashSlider createTrash(TrashSlider trashSlider);
    TrashSlider getTrashedSliderById(Long id);
    Page<TrashSlider> getAllTrashedSliders(Pageable pageable);
    TrashSlider updateTrashedSlider(TrashSlider trashSlider);
    void deleteTrashedSlider(Long id);
}
