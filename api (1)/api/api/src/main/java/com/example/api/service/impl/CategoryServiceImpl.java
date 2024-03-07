package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.Category;
import com.example.api.service.CategoryService;
import com.example.api.repository.CategoryRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Category category) {
        category.setCreatedAt(new Date());
        return categoryRepository.save(category);
    }

    @Override
    public Category getCategoryById(Long categoryId) {
        Optional<Category> optionalCategory = categoryRepository.findById(categoryId);
        return optionalCategory.orElse(null);
    }

    @Override
    public Page<Category> getAllCategories(Pageable pageable) {
        return categoryRepository.findAll(pageable);
    }

    @Override
    public Category updateCategory(Category category) {
        Category existingCategory = categoryRepository.findById(category.getId()).orElse(null);

        if (existingCategory != null) {
            existingCategory.setName(category.getName());
            existingCategory.setParentId(category.getParentId());
            existingCategory.setSortOrder(category.getSortOrder());
            existingCategory.setStatus(category.getStatus());
            existingCategory.setCreatedAt(category.getCreatedAt());
            existingCategory.setUpdatedAt(category.getUpdatedAt());

            Category updatedCategory = categoryRepository.save(existingCategory);
            return updatedCategory;
        } else {
            return null;
        }
    }

    @Override
    public void deleteCategory(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }
}
