package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.Category;
import com.example.api.entity.CategoryOption;
import com.example.api.service.CategoryOptionService;
import com.example.api.repository.CategoryOptionRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryOptionServiceImpl implements CategoryOptionService {

    private CategoryOptionRepository categoryOptionRepository;

    @Override
    public CategoryOption createCategoryOption(CategoryOption categoryOption) {
        categoryOption.setCreatedAt(new Date());
        return categoryOptionRepository.save(categoryOption);
    }

    @Override
    public CategoryOption getCategoryOptionById(Long categoryOptionId) {
        Optional<CategoryOption> optionalCategoryOption = categoryOptionRepository.findById(categoryOptionId);
        return optionalCategoryOption.orElse(null);
    }

    @Override
    public Page<CategoryOption> getAllCategoryOptions(Pageable pageable) {
        return categoryOptionRepository.findAll(pageable);
    }

    @Override
    public CategoryOption updateCategoryOption(CategoryOption categoryOption) {
        CategoryOption existingCategoryOption = categoryOptionRepository.findById(categoryOption.getId()).orElse(null);
        if (existingCategoryOption != null) {
            existingCategoryOption.setCategoryId(categoryOption.getCategoryId());
            existingCategoryOption.setName(categoryOption.getName());
            existingCategoryOption.setStatus(categoryOption.getStatus());
            existingCategoryOption.setCreatedAt(categoryOption.getCreatedAt());
            existingCategoryOption.setUpdatedAt(new Date());
            return categoryOptionRepository.save(existingCategoryOption);
        }
        return null;
    }

    @Override
    public void deleteCategoryOption(Long categoryOptionId) {
        categoryOptionRepository.deleteById(categoryOptionId);
    }
    
    @Override
    public Page<CategoryOption> getCategoryOptionsByCategoryId(Category categoryId, Pageable pageable) {
        return categoryOptionRepository.findByCategoryId(categoryId, pageable);
    }

}
