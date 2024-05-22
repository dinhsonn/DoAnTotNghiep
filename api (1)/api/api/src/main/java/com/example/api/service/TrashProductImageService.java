package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.api.entity.TrashProductImage;

import java.util.Optional;

public interface TrashProductImageService {
    TrashProductImage createTrashProductImage(TrashProductImage trashProductImage);
    Optional<TrashProductImage> getTrashProductImageById(Long id);
    Page<TrashProductImage> getAllTrashProductImages(Pageable pageable);
    TrashProductImage updateTrashProductImage(TrashProductImage trashProductImage);
    void deleteTrashProductImage(Long id);
}
