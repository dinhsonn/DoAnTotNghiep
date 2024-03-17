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

import com.example.api.entity.ProductImage;
import com.example.api.service.ProductImageService;

@RestController
@AllArgsConstructor
@RequestMapping("api/productimages")
@CrossOrigin(origins = "http://localhost:3000", exposedHeaders = "Content-Range")
public class ProductImageController {

    private ProductImageService productImageService;

    @PostMapping
    public ResponseEntity<ProductImage> createProductImage(@RequestBody ProductImage productImage) {
        productImage.setImage(productImage.getImage() + ".png");
        ProductImage savedProductImage = productImageService.createProductImage(productImage);
        return new ResponseEntity<>(savedProductImage, HttpStatus.CREATED);
    }

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
            @RequestParam("customName") String customName) {
        try {
            String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

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
        String imagePath = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage\\"
                + imageName;

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
    public ResponseEntity<ProductImage> getProductImageById(@PathVariable("id") Long productImageId) {
        ProductImage productImage = productImageService.getProductImageById(productImageId);
        if (productImage != null) {
            return new ResponseEntity<>(productImage, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<ProductImage>> getAllProductImages(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "1000") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductImage> productImages = productImageService.getAllProductImages(pageable);
        return new ResponseEntity<>(productImages, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductImage> updateProductImage(
            @PathVariable("id") Long productimageId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestBody ProductImage productimage) {

        try {
            if (file != null && !file.isEmpty()) {
                // Nếu có file ảnh được cung cấp, thì cập nhật ảnh
                String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

                String originalFilename = file.getOriginalFilename();
                String fileName = originalFilename.substring(0, originalFilename.lastIndexOf('.')) + ".png";

                String filePath = uploadDir + File.separator + fileName;

                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    fos.write(file.getBytes());
                }

                productimage.setImage(fileName);
            }

            productimage.setId(productimageId);
            ProductImage updateProductImage = productImageService.updateProductImage(productimage);
            return new ResponseEntity<>(updateProductImage, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProductImage(@PathVariable("id") Long productImageId) {
        productImageService.deleteProductImage(productImageId);
        return new ResponseEntity<>("ProductImage successfully deleted!", HttpStatus.OK);
    }

    @GetMapping("/productid/{productId}")
    public ResponseEntity<Page<ProductImage>> getProductImage(
            @PathVariable("productId") Long productId,
            Pageable pageable) {
        Page<ProductImage> productimage = productImageService.getProductImage(productId, pageable);
        return new ResponseEntity<>(productimage, HttpStatus.OK);
    }

}
