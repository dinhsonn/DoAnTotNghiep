package com.example.api.controller;

import com.example.api.entity.TrashBrand;
import com.example.api.service.TrashBrandService;
import lombok.AllArgsConstructor;
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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

@RestController
@AllArgsConstructor
@RequestMapping("api/trashbrands")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class TrashBrandController {

    private final TrashBrandService trashBrandService;

    @PostMapping
    public ResponseEntity<TrashBrand> createTrashBrand(@RequestBody TrashBrand trashBrand) {
        trashBrand.setImage(trashBrand.getImage());
        TrashBrand savedTrashBrand = trashBrandService.createTrashBrand(trashBrand);
        return new ResponseEntity<>(savedTrashBrand, HttpStatus.CREATED);
    }

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file,
                                              @RequestParam("customName") String customName) {
        try {
            String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
            // String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

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
    public ResponseEntity<TrashBrand> getTrashBrandById(@PathVariable("id") Long brandId) {
        TrashBrand trashBrand = trashBrandService.getTrashBrandById(brandId);
        if (trashBrand != null) {
            return new ResponseEntity<>(trashBrand, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<TrashBrand>> getAllTrashBrands(Pageable pageable) {
        Page<TrashBrand> trashBrands = trashBrandService.getAllTrashBrands(pageable);
        return new ResponseEntity<>(trashBrands, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<TrashBrand> updateTrashBrand(
            @PathVariable("id") Long brandId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestBody TrashBrand trashBrand) {

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

                trashBrand.setImage(fileName);
            }

            trashBrand.setId(brandId);
            TrashBrand updatedTrashBrand = trashBrandService.updateTrashBrand(trashBrand);
            return new ResponseEntity<>(updatedTrashBrand, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTrashBrand(@PathVariable("id") Long brandId) {
        trashBrandService.deleteTrashBrand(brandId);
        return new ResponseEntity<>("Brand successfully deleted!", HttpStatus.OK);
    }
}
