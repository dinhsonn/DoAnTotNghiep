package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.CategoryOptionValue;

public interface CategoryOptionValueService {
    
    CategoryOptionValue createCategoryOptionValue(CategoryOptionValue categoryOptionValue);

    CategoryOptionValue getCategoryOptionValueById(Long categoryOptionValueId);

    Page<CategoryOptionValue> getAllCategoryOptionValues(Pageable pageable);

    CategoryOptionValue updateCategoryOptionValue(CategoryOptionValue categoryOptionValue);

    void deleteCategoryOptionValue(Long categoryOptionValueId);

    Page<CategoryOptionValue> getOptionValuesByOptionCte(Long option, Pageable pageable);


}
