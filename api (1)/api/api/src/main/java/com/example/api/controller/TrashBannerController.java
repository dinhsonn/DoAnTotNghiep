package com.example.api.controller;

import lombok.AllArgsConstructor;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.example.api.entity.TrashBanner;
import com.example.api.service.TrashBannerService;

@RestController
@AllArgsConstructor
@RequestMapping("api/trashbanners")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class TrashBannerController {

    private final TrashBannerService trashBannerService;

    @PostMapping
    public ResponseEntity<TrashBanner> createTrashBanner(@RequestBody TrashBanner trashBanner) {
        trashBanner.setImage(trashBanner.getImage());
        TrashBanner savedTrashBanner = trashBannerService.createTrashBanner(trashBanner);
        return new ResponseEntity<>(savedTrashBanner, HttpStatus.CREATED);
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

    @GetMapping("/{id}")
    public ResponseEntity<TrashBanner> getTrashBannerById(@PathVariable("id") Long bannerId) {
        TrashBanner trashBanner = trashBannerService.getTrashBannerById(bannerId);
        if (trashBanner != null) {
            return new ResponseEntity<>(trashBanner, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<TrashBanner>> getAllTrashBanners(Pageable pageable) {
        Page<TrashBanner> trashBanners = trashBannerService.getAllTrashBanners(pageable);
        return new ResponseEntity<>(trashBanners, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TrashBanner> updateTrashBanner(
            @PathVariable("id") Long bannerId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestBody TrashBanner banner) {

        try {
            if (file != null && !file.isEmpty()) {
                String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
                //String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

                String originalFilename = file.getOriginalFilename();
                String fileName = originalFilename.substring(0, originalFilename.lastIndexOf('.')) + ".png";

                String filePath = uploadDir + File.separator + fileName;

                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    fos.write(file.getBytes());
                }

                banner.setImage(fileName);
            }

            banner.setId(bannerId);
            TrashBanner updatedBanner = trashBannerService.updateTrashBanner(banner);
            return new ResponseEntity<>(updatedBanner, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTrashBanner(@PathVariable("id") Long bannerId) {
        trashBannerService.deleteTrashBanner(bannerId);
        return new ResponseEntity<>("Trash Banner successfully deleted!", HttpStatus.OK);
    }
}
