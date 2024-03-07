package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.About;
import com.example.api.service.AboutService;

@RestController
@AllArgsConstructor
@RequestMapping("api/about")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class AboutController {

    private final AboutService aboutService;

    @PostMapping
    public ResponseEntity<About> createAbout(@RequestBody About about) {
        About savedAbout = aboutService.createAbout(about);
        return new ResponseEntity<>(savedAbout, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<About> getAboutById(@PathVariable("id") Long aboutId) {
        About about = aboutService.getAboutById(aboutId);
        if (about != null) {
            return new ResponseEntity<>(about, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<About>> getAllAbouts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<About> abouts = aboutService.getAllAbouts(pageable);
        return new ResponseEntity<>(abouts, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<About> updateAbout(
            @PathVariable("id") Long aboutId,
            @RequestBody About about) {
        
        about.setId(aboutId);
        About updatedAbout = aboutService.updateAbout(about);
        if (updatedAbout != null) {
            return new ResponseEntity<>(updatedAbout, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteAbout(@PathVariable("id") Long aboutId) {
        aboutService.deleteAbout(aboutId);
        return new ResponseEntity<>("About successfully deleted!", HttpStatus.OK);
    }
}
