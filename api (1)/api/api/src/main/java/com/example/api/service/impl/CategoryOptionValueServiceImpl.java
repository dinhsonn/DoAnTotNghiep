package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.CategoryOptionValue;
import com.example.api.service.CategoryOptionValueService;
import com.example.api.repository.CategoryOptionValueRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryOptionValueServiceImpl implements CategoryOptionValueService {

    private CategoryOptionValueRepository categoryOptionValueRepository;

    @Override
    public CategoryOptionValue createCategoryOptionValue(CategoryOptionValue categoryOptionValue) {
        categoryOptionValue.setCreatedAt(new Date());
        return categoryOptionValueRepository.save(categoryOptionValue);
    }

    @Override
    public CategoryOptionValue getCategoryOptionValueById(Long categoryOptionValueId) {
        Optional<CategoryOptionValue> optionalCategoryOptionValue = categoryOptionValueRepository.findById(categoryOptionValueId);
        return optionalCategoryOptionValue.orElse(null);
    }

    @Override
    public Page<CategoryOptionValue> getAllCategoryOptionValues(Pageable pageable) {
        return categoryOptionValueRepository.findAll(pageable);
    }

    @Override
    public CategoryOptionValue updateCategoryOptionValue(CategoryOptionValue categoryOptionValue) {
        CategoryOptionValue existingCategoryOptionValue = categoryOptionValueRepository.findById(categoryOptionValue.getId()).orElse(null);

        if (existingCategoryOptionValue != null) {
            existingCategoryOptionValue.setOption(categoryOptionValue.getOption());
            existingCategoryOptionValue.setValue(categoryOptionValue.getValue());
            existingCategoryOptionValue.setCreatedAt(categoryOptionValue.getCreatedAt());
            existingCategoryOptionValue.setUpdatedAt(categoryOptionValue.getUpdatedAt());

            CategoryOptionValue updatedCategoryOptionValue = categoryOptionValueRepository.save(existingCategoryOptionValue);
            return updatedCategoryOptionValue;
        } else {
            return null;
        }
    }

    @Override
    public void deleteCategoryOptionValue(Long categoryOptionValueId) {
        categoryOptionValueRepository.deleteById(categoryOptionValueId);
    }

    @Override
    public Page<CategoryOptionValue> getOptionValuesByOptionCte(Long option, Pageable pageable) {
        return categoryOptionValueRepository.findByOptionId(option, pageable);
    }

}
