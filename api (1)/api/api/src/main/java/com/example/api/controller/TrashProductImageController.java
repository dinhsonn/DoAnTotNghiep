package com.example.api.controller;

import lombok.AllArgsConstructor;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Optional;

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

import com.example.api.entity.TrashProductImage;
import com.example.api.service.TrashProductImageService;

@RestController
@AllArgsConstructor
@RequestMapping("api/trashproductimages")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class TrashProductImageController {

    private TrashProductImageService trashProductImageService;

    @PostMapping
    public ResponseEntity<TrashProductImage> createTrashProductImage(@RequestBody TrashProductImage trashProductImage) {
        trashProductImage.setImage(trashProductImage.getImage());
        TrashProductImage savedTrashProductImage = trashProductImageService.createTrashProductImage(trashProductImage);
        return new ResponseEntity<>(savedTrashProductImage, HttpStatus.CREATED);
    }

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("customName") String customName) {
        try {
            String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
            //String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName = customName;

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
        //String imagePath = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage\\" + imageName;

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
    public ResponseEntity<TrashProductImage> getTrashProductImageById(@PathVariable("id") Long trashProductImageId) {
        Optional<TrashProductImage> trashProductImage = trashProductImageService.getTrashProductImageById(trashProductImageId);
        return trashProductImage.map(image -> new ResponseEntity<>(image, HttpStatus.OK))
                                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping
    public ResponseEntity<Page<TrashProductImage>> getAllTrashProductImages(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "1000") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TrashProductImage> trashProductImages = trashProductImageService.getAllTrashProductImages(pageable);
        return new ResponseEntity<>(trashProductImages, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTrashProductImage(@PathVariable("id") Long trashProductImageId) {
        trashProductImageService.deleteTrashProductImage(trashProductImageId);
        return new ResponseEntity<>("TrashProductImage successfully deleted!", HttpStatus.OK);
    }
        @PutMapping("{id}")
    public ResponseEntity<TrashProductImage> updateTrashProductImage(
            @PathVariable("id") Long trashProductImageId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestBody TrashProductImage trashProductImage) {

        try {
            if (file != null && !file.isEmpty()) {
                // Nếu có file ảnh được cung cấp, thì cập nhật ảnh
                 String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
                //String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

                String originalFilename = file.getOriginalFilename();
                String fileName = originalFilename.substring(0, originalFilename.lastIndexOf('.')) + ".png";

                String filePath = uploadDir + File.separator + fileName;

                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    fos.write(file.getBytes());
                }

                trashProductImage.setImage(fileName);
            }

            trashProductImage.setId(trashProductImageId);
            TrashProductImage updateTrashProductImage = trashProductImageService.updateTrashProductImage(trashProductImage);
            return new ResponseEntity<>(updateTrashProductImage, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
