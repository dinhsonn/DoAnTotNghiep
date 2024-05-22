package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.TrashAbout;
import com.example.api.service.TrashAboutService;

@RestController
@AllArgsConstructor
@RequestMapping("api/trashabout")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class TrashAboutController {

    private final TrashAboutService trashAboutService;

    @PostMapping
    public ResponseEntity<TrashAbout> createTrashAbout(@RequestBody TrashAbout trashAbout) {
        TrashAbout savedTrashAbout = trashAboutService.createTrashAbout(trashAbout);
        return new ResponseEntity<>(savedTrashAbout, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TrashAbout> getTrashAboutById(@PathVariable("id") Long trashAboutId) {
        TrashAbout trashAbout = trashAboutService.getTrashAboutById(trashAboutId);
        if (trashAbout != null) {
            return new ResponseEntity<>(trashAbout, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<TrashAbout>> getAllTrashAbouts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TrashAbout> trashAbouts = trashAboutService.getAllTrashAbouts(pageable);
        return new ResponseEntity<>(trashAbouts, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<TrashAbout> updateTrashAbout(
            @PathVariable("id") Long trashAboutId,
            @RequestBody TrashAbout trashAbout) {
        
        trashAbout.setId(trashAboutId);
        TrashAbout updatedTrashAbout = trashAboutService.updateTrashAbout(trashAbout);
        if (updatedTrashAbout != null) {
            return new ResponseEntity<>(updatedTrashAbout, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTrashAbout(@PathVariable("id") Long trashAboutId) {
        trashAboutService.deleteTrashAbout(trashAboutId);
        return new ResponseEntity<>("TrashAbout successfully deleted!", HttpStatus.OK);
    }
}
