package com.example.api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.TrashCategory;
import com.example.api.repository.TrashCategoryRepository;
import com.example.api.service.TrashCategoryService;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TrashCategoryServiceImpl implements TrashCategoryService {

    private final TrashCategoryRepository trashCategoryRepository;

    @Override
    public TrashCategory createTrashCategory(TrashCategory trashCategory) {
        trashCategory.setCreatedAt(new Date());
        return trashCategoryRepository.save(trashCategory);
    }

    @Override
    public TrashCategory getTrashCategoryById(Long id) {
        Optional<TrashCategory> optionalTrashCategory = trashCategoryRepository.findById(id);
        return optionalTrashCategory.orElse(null);
    }

    @Override
    public Page<TrashCategory> getAllTrashCategories(Pageable pageable) {
        return trashCategoryRepository.findAll(pageable);
    }

    @Override
    public TrashCategory updateTrashCategory(TrashCategory trashCategory) {
        TrashCategory existingTrashCategory = trashCategoryRepository.findById(trashCategory.getId()).orElse(null);

        if (existingTrashCategory != null) {
            existingTrashCategory.setName(trashCategory.getName());
            existingTrashCategory.setParentId(trashCategory.getParentId());
            existingTrashCategory.setSortOrder(trashCategory.getSortOrder());
            existingTrashCategory.setStatus(trashCategory.getStatus());
            existingTrashCategory.setCreatedAt(trashCategory.getCreatedAt());
            existingTrashCategory.setUpdatedAt(new Date());

            return trashCategoryRepository.save(existingTrashCategory);
        } else {
            return null;
        }
    }

    @Override
    public void deleteTrashCategory(Long id) {
        trashCategoryRepository.deleteById(id);
    }
}
