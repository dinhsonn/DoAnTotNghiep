package com.example.api.controller;

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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.api.entity.TrashSlider;
import com.example.api.service.TrashSliderService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/trashsliders")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class TrashSliderController {

    private final TrashSliderService trashSliderService;

    @PostMapping("/image")
public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam("customName") String customName) {
        try {
             String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
           // String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
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

    @PostMapping
    public ResponseEntity<TrashSlider> createTrash(@RequestBody TrashSlider trashSlider) {
        trashSlider.setImage(trashSlider.getImage() + ".png");
        TrashSlider savedSlider = trashSliderService.createTrash(trashSlider);
        return new ResponseEntity<>(savedSlider, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
    public ResponseEntity<TrashSlider> getTrashedSliderById(@PathVariable("id") Long sliderId) {
        TrashSlider trashSlider = trashSliderService.getTrashedSliderById(sliderId);
        if (trashSlider != null) {
            return new ResponseEntity<>(trashSlider, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<TrashSlider>> getAllTrashedSliders(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TrashSlider> trashSliders = trashSliderService.getAllTrashedSliders(pageable);
        return new ResponseEntity<>(trashSliders, HttpStatus.OK);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTrashedSlider(@PathVariable("id") Long sliderId) {
        trashSliderService.deleteTrashedSlider(sliderId);
        return new ResponseEntity<>("Trashed Slider successfully deleted!", HttpStatus.OK);
    }

    @GetMapping("/image/{imageName}")
    public ResponseEntity<byte[]> getTrashedImage(@PathVariable String imageName) throws IOException {
        String imagePath = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage\\" + imageName;

        Resource resource = new FileSystemResource(imagePath);

        if (!resource.exists() || !resource.isReadable()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        byte[] imageBytes = Files.readAllBytes(resource.getFile().toPath());

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);

        return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
    }
}
