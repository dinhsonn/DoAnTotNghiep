package com.example.api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.TrashProductImage;
import com.example.api.repository.TrashProductImageRepository;
import com.example.api.service.TrashProductImageService;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TrashProductImageServiceImpl implements TrashProductImageService {

    private final TrashProductImageRepository trashProductImageRepository;

    @Override
    public TrashProductImage createTrashProductImage(TrashProductImage trashProductImage) {
        trashProductImage.setCreatedAt(new Date());
        return trashProductImageRepository.save(trashProductImage);
    }

    @Override
    public Optional<TrashProductImage> getTrashProductImageById(Long id) {
        return trashProductImageRepository.findById(id);
    }

    @Override
    public Page<TrashProductImage> getAllTrashProductImages(Pageable pageable) {
        return trashProductImageRepository.findAll(pageable);
    }

    @Override
    public TrashProductImage updateTrashProductImage(TrashProductImage trashProductImage) {
        Optional<TrashProductImage> existingTrashProductImageOpt = trashProductImageRepository.findById(trashProductImage.getId());
        if (existingTrashProductImageOpt.isPresent()) {
            TrashProductImage existingTrashProductImage = existingTrashProductImageOpt.get();
            existingTrashProductImage.setProductId(trashProductImage.getProductId());
            existingTrashProductImage.setName(trashProductImage.getName());
            existingTrashProductImage.setImage(trashProductImage.getImage());
            existingTrashProductImage.setSortOrder(trashProductImage.getSortOrder());
            existingTrashProductImage.setLink(trashProductImage.getLink());
            existingTrashProductImage.setStatus(trashProductImage.getStatus());
            existingTrashProductImage.setCreatedAt(trashProductImage.getCreatedAt());
            existingTrashProductImage.setUpdatedAt(new Date());
            return trashProductImageRepository.save(existingTrashProductImage);
        }
        return null;
    }

    @Override
    public void deleteTrashProductImage(Long id) {
        trashProductImageRepository.deleteById(id);
    }
}
