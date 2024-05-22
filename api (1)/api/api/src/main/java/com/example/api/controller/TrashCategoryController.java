package com.example.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.TrashCategory;
import com.example.api.service.TrashCategoryService;

@RestController
@AllArgsConstructor
@RequestMapping("api/trashcategories")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class TrashCategoryController {

    private final TrashCategoryService trashCategoryService;

    @PostMapping
    public ResponseEntity<TrashCategory> createTrashCategory(@RequestBody TrashCategory trashCategory) {
        TrashCategory savedTrashCategory = trashCategoryService.createTrashCategory(trashCategory);
        return new ResponseEntity<>(savedTrashCategory, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrashCategory> getTrashCategoryById(@PathVariable("id") Long id) {
        TrashCategory trashCategory = trashCategoryService.getTrashCategoryById(id);
        return trashCategory != null ? new ResponseEntity<>(trashCategory, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public ResponseEntity<Page<TrashCategory>> getAllTrashCategories(Pageable pageable) {
        Page<TrashCategory> trashCategories = trashCategoryService.getAllTrashCategories(pageable);
        return new ResponseEntity<>(trashCategories, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrashCategory> updateTrashCategory(@PathVariable("id") Long id, @RequestBody TrashCategory trashCategory) {
        trashCategory.setId(id);
        TrashCategory updatedTrashCategory = trashCategoryService.updateTrashCategory(trashCategory);
        return updatedTrashCategory != null ? new ResponseEntity<>(updatedTrashCategory, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrashCategory(@PathVariable("id") Long id) {
        trashCategoryService.deleteTrashCategory(id);
        return new ResponseEntity<>("Trash Category successfully deleted!", HttpStatus.OK);
    }
}
