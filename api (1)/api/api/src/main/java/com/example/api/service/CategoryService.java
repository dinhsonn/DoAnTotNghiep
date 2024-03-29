package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.Category;

public interface CategoryService {
    
    public Category createCategory(Category category);
    public Category getCategoryById(Long categoryId);
    public Page<Category> getAllCategories(Pageable pageable);
    public Category updateCategory(Category category);
    public void deleteCategory(Long categoryId);
}
