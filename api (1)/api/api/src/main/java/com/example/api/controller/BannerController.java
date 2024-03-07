package com.example.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.api.entity.Banner;
import com.example.api.service.BannerService;

@RestController
@AllArgsConstructor
@RequestMapping("api/banners")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class BannerController {

    private final BannerService bannerService;

    @PostMapping
    public ResponseEntity<Banner> createBanner(@RequestBody Banner banner) {
        Banner savedBanner = bannerService.createBanner(banner);
        return new ResponseEntity<>(savedBanner, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Banner> getBannerById(@PathVariable("id") Long bannerId) {
        Banner banner = bannerService.getBannerById(bannerId);
        if (banner != null) {
            return new ResponseEntity<>(banner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Banner>> getAllBanners(
        @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Banner> banners = bannerService.getAllBanners(pageable);
        return new ResponseEntity<>(banners, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Banner> updateBanner(@PathVariable("id") Long bannerId, @RequestBody Banner banner) {
        banner.setId(bannerId);
        Banner updatedBanner = bannerService.updateBanner(banner);
        if (updatedBanner != null) {
            return new ResponseEntity<>(updatedBanner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBanner(@PathVariable("id") Long bannerId) {
        bannerService.deleteBanner(bannerId);
        return new ResponseEntity<>("Banner successfully deleted!", HttpStatus.OK);
    }
}
