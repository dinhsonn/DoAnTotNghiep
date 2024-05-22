package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.TrashCategory;

public interface TrashCategoryService {
    TrashCategory createTrashCategory(TrashCategory trashCategory);
    TrashCategory getTrashCategoryById(Long id);
    Page<TrashCategory> getAllTrashCategories(Pageable pageable);
    TrashCategory updateTrashCategory(TrashCategory trashCategory);
    void deleteTrashCategory(Long id);
}
