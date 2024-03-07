package com.example.api.controller;

import lombok.AllArgsConstructor;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.Category;
import com.example.api.service.CategoryService;

@RestController
@AllArgsConstructor
@RequestMapping("api/categories")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")

public class CategoryController {

    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        Category savedCategory = categoryService.createCategory(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") Long categoryId) {
        Category category = categoryService.getCategoryById(categoryId);
        if (category != null) {
            return new ResponseEntity<>(category, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Category>> getAllCategorys(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Category> Categories = categoryService.getAllCategories(pageable);
        return new ResponseEntity<>(Categories, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateProduct(@PathVariable("id") Long categoryId,
                                                  @RequestBody Category category) {
        category.setId(categoryId);
        Category updatedCategory = categoryService.updateCategory(category);
        if (updatedCategory != null) {
            return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete Category REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable("id") Long categoryId) {
        categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>("Category successfully deleted!", HttpStatus.OK);
    }
}