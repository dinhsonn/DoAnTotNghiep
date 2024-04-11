package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.Category;
import com.example.api.entity.CategoryOption;

public interface CategoryOptionService {
    CategoryOption createCategoryOption(CategoryOption categoryOption);

    CategoryOption getCategoryOptionById(Long categoryOptionId);

    Page<CategoryOption> getAllCategoryOptions(Pageable pageable);

    CategoryOption updateCategoryOption(CategoryOption categoryOption);

    void deleteCategoryOption(Long categoryOptionId);

    Page<CategoryOption> getCategoryOptionsByCategoryId(Category categoryId, Pageable pageable);

}
