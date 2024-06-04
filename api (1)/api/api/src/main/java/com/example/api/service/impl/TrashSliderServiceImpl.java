package com.example.api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.TrashSlider;
import com.example.api.repository.TrashSliderRepository;
import com.example.api.service.TrashSliderService;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TrashSliderServiceImpl implements TrashSliderService {

    private final TrashSliderRepository trashSliderRepository;

    @Override
    public TrashSlider createTrash(TrashSlider trashSlider) {
        trashSlider.setUpdatedAt(new Date());
        return trashSliderRepository.save(trashSlider);
    }

    @Override
    public TrashSlider getTrashedSliderById(Long id) {
        Optional<TrashSlider> optionalTrashSlider = trashSliderRepository.findById(id);
        return optionalTrashSlider.orElse(null);
    }

    @Override
    public Page<TrashSlider> getAllTrashedSliders(Pageable pageable) {
        return trashSliderRepository.findAll(pageable);
    }

    @Override
    public TrashSlider updateTrashedSlider(TrashSlider trashSlider) {
        TrashSlider existingSlider = trashSliderRepository.findById(trashSlider.getId()).orElse(null);
        if (existingSlider != null) {
            existingSlider.setName(trashSlider.getName());
            existingSlider.setLink(trashSlider.getLink());
            existingSlider.setSortOrder(trashSlider.getSortOrder());
            existingSlider.setUpdatedAt(new Date());
            existingSlider.setStatus(trashSlider.getStatus());
            existingSlider.setImage(trashSlider.getImage());

            return trashSliderRepository.save(existingSlider);
        }
        return null;
    }
    @Override
    public void deleteTrashedSlider(Long id) {
        trashSliderRepository.deleteById(id);
    }
}
