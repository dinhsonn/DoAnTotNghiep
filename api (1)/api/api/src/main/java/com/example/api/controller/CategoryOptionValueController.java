package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.CategoryOptionValue;
import com.example.api.service.CategoryOptionValueService;

@RestController
@AllArgsConstructor
@RequestMapping("api/categoryoptionvalue")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class CategoryOptionValueController {

    private CategoryOptionValueService categoryOptionValueService;

    @PostMapping
    public ResponseEntity<CategoryOptionValue> createCategoryOptionValue(@RequestBody CategoryOptionValue categoryOptionValue) {
        CategoryOptionValue savedCategoryOptionValue = categoryOptionValueService.createCategoryOptionValue(categoryOptionValue);
        return new ResponseEntity<>(savedCategoryOptionValue, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<CategoryOptionValue> getCategoryOptionValueById(@PathVariable("id") Long categoryOptionValueId) {
        CategoryOptionValue categoryOptionValue = categoryOptionValueService.getCategoryOptionValueById(categoryOptionValueId);
        if (categoryOptionValue != null) {
            return new ResponseEntity<>(categoryOptionValue, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<CategoryOptionValue>> getAllCategoryOptionValues(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<CategoryOptionValue> categoryOptionValues = categoryOptionValueService.getAllCategoryOptionValues(pageable);
        return new ResponseEntity<>(categoryOptionValues, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<CategoryOptionValue> updateCategoryOptionValue(@PathVariable("id") Long categoryOptionValueId,
            @RequestBody CategoryOptionValue categoryOptionValue) {
        categoryOptionValue.setId(categoryOptionValueId);
        CategoryOptionValue updatedCategoryOptionValue = categoryOptionValueService.updateCategoryOptionValue(categoryOptionValue);
        return new ResponseEntity<>(updatedCategoryOptionValue, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCategoryOptionValue(@PathVariable("id") Long categoryOptionValueId) {
        categoryOptionValueService.deleteCategoryOptionValue(categoryOptionValueId);
        return new ResponseEntity<>("CategoryOptionValue successfully deleted!", HttpStatus.OK);
    }

    @GetMapping("/option/{option}")
    public ResponseEntity<Page<CategoryOptionValue>> getOptionValuesByOptionCte(@PathVariable Long option,
            Pageable pageable) {
        Page<CategoryOptionValue> productOptionValues = categoryOptionValueService.getOptionValuesByOptionCte(option, pageable);
        return new ResponseEntity<>(productOptionValues, HttpStatus.OK);
    }

}
