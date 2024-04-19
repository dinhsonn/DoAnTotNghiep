package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.Category;
import com.example.api.entity.CategoryOption;
import com.example.api.service.CategoryOptionService;

@RestController
@AllArgsConstructor
@RequestMapping("api/categoryoption")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")

public class CategoryOptionController {

    private CategoryOptionService categoryOptionService;

    @PostMapping
    public ResponseEntity<CategoryOption> createCategoryOption(@RequestBody CategoryOption categoryOption) {
        CategoryOption savedCategoryOption = categoryOptionService.createCategoryOption(categoryOption);
        return new ResponseEntity<>(savedCategoryOption, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryOption> getCategoryOptionById(@PathVariable("id") Long categoryOptionId) {
        CategoryOption categoryOption = categoryOptionService.getCategoryOptionById(categoryOptionId);
        if (categoryOption != null) {
            return new ResponseEntity<>(categoryOption, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<CategoryOption>> getAllCategoryOptions(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CategoryOption> categoryOptions = categoryOptionService.getAllCategoryOptions(pageable);
        return new ResponseEntity<>(categoryOptions, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<CategoryOption> updateCategoryOption(@PathVariable("id") Long categoryOptionId,
            @RequestBody CategoryOption categoryOption) {
        categoryOption.setId(categoryOptionId);
        CategoryOption updatedCategoryOption = categoryOptionService.updateCategoryOption(categoryOption);
        return new ResponseEntity<>(updatedCategoryOption, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCategoryOption(@PathVariable("id") Long categoryOptionId) {
        categoryOptionService.deleteCategoryOption(categoryOptionId);
        return new ResponseEntity<>("CategoryOption successfully deleted!", HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<CategoryOption>> getCategoryOptionsByCategoryId(@PathVariable Category categoryId,
            Pageable pageable) {
        Page<CategoryOption> categoryOptions = categoryOptionService.getCategoryOptionsByCategoryId(categoryId, pageable);
        return new ResponseEntity<>(categoryOptions, HttpStatus.OK);
    }
}
