package com.example.api.controller;

import lombok.AllArgsConstructor;

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

import com.example.api.entity.Brand;
import com.example.api.service.BrandService;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;


@RestController
@AllArgsConstructor
@RequestMapping("api/brand")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")

public class BrandController {

    private BrandService brandService;

   
    @PostMapping
    public ResponseEntity<Brand> createBrand(@RequestBody Brand brand) {
        brand.setImage(brand.getImage() + ".png");
        Brand savedBrand = brandService.createBrand(brand);
        return new ResponseEntity<>(savedBrand, HttpStatus.CREATED);
    }
@PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                             @RequestParam("customName") String customName) {
        try {
            String uploadDir = "src/main/resources/static/dataImage";

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
    String imagePath = "src/main/resources/static/dataImage" + imageName;

    Resource resource = new FileSystemResource(imagePath);

    if (!resource.exists() || !resource.isReadable()) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.IMAGE_PNG);

    return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
}



    @GetMapping("{id}")
    public ResponseEntity<Brand> getbrandById(@PathVariable("id") Long brandId) {
        Brand brand = brandService.getBrandById(brandId);
        if (brand != null) {
            return new ResponseEntity<>(brand, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping
    public ResponseEntity<Page<Brand>> getAllBrands(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Brand> Brands = brandService.getAllBrands(pageable);
        return new ResponseEntity<>(Brands, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Brand> updateBrand(
        @PathVariable("id") Long brandId,
        @RequestParam(value = "file", required = false) MultipartFile file,
        @RequestBody Brand brand) {
        
        try {
            if (file != null && !file.isEmpty()) {
                String originalFilename = file.getOriginalFilename();
                String uploadDir = "src/main/resources/static/dataImage";
                String fileName = originalFilename.substring(0, originalFilename.lastIndexOf('.')) + ".png";

                String filePath = uploadDir + File.separator + fileName;
    
                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    fos.write(file.getBytes());
                }

                brand.setImage(fileName);
            }

            brand.setId(brandId);
            Brand updatedBrand = brandService.updateBrand(brand);
            return new ResponseEntity<>(updatedBrand, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBrand(@PathVariable("id") Long brandId) {
        brandService.deleteBrand(brandId);
        return new ResponseEntity<>("Brand successfully deleted!", HttpStatus.OK);
    }
}
