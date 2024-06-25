package com.example.api.controller;

import lombok.AllArgsConstructor;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
        banner.setImage(banner.getImage() + ".png");
        Banner savedBanner = bannerService.createBanner(banner);
        return new ResponseEntity<>(savedBanner, HttpStatus.CREATED);
    }
@PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                             @RequestParam("customName") String customName) {
        try {
          //String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
          String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }   
            String fileName = customName + ".png"; 

            String filePath = uploadDir + File.separator + fileName;

            try (FileOutputStream fos = new FileOutputStream(filePath)) {
                fos.write(file.getBytes());
            }

            return ResponseEntity.ok("Image uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image");
        }
    }
@GetMapping("/image/{imageName}")
public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
     String imagePath = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage\\" + imageName;
    // String imagePath = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage\\" + imageName;

    Resource resource = new FileSystemResource(imagePath);

    if (!resource.exists() || !resource.isReadable()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_PNG);

    return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
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
    public ResponseEntity<Banner> updateBanner(
        @PathVariable("id") Long bannerId,
        @RequestParam(value = "file", required = false) MultipartFile file,
        @RequestBody Banner banner) {
        
        try {
            if (file != null && !file.isEmpty()) {
                 String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
              // String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
    
                String originalFilename = file.getOriginalFilename();
                String fileName = originalFilename.substring(0, originalFilename.lastIndexOf('.')) + ".png";
    
                String filePath = uploadDir + File.separator + fileName;
    
                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    fos.write(file.getBytes());
                }
    
                banner.setImage(fileName);
            }
    
            banner.setId(bannerId);
            Banner updatedBanner = bannerService.updateBanner(banner);
            return new ResponseEntity<>(updatedBanner, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBanner(@PathVariable("id") Long bannerId) {
        bannerService.deleteBanner(bannerId);
        return new ResponseEntity<>("Banner successfully deleted!", HttpStatus.OK);
    }
}
