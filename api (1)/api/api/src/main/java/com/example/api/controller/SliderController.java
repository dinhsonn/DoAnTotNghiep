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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.api.entity.Slider;
import com.example.api.service.SliderService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("api/sliders")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class SliderController {

    private SliderService sliderService;

    @PostMapping
    public ResponseEntity<Slider> createSlider(@RequestBody Slider slider) {
        slider.setImage(slider.getImage() + ".png");
        Slider savedSlider = sliderService.createSlider(slider);
        return new ResponseEntity<>(savedSlider, HttpStatus.CREATED);
    }

    @PostMapping("/image")
    public ResponseEntity<String> uploadImage(
            @RequestParam("file") MultipartFile file,
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
        //String imagePath = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage\\" + imageName;
         String imagePath = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage\\" + imageName;

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
    public ResponseEntity<Slider> getSliderById(@PathVariable("id") Long sliderId) {
        Slider slider = sliderService.getSliderById(sliderId);
        if (slider != null) {
            return new ResponseEntity<>(slider, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Slider>> getAllSliders(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Slider> sliders = sliderService.getAllSliders(pageable);
        return new ResponseEntity<>(sliders, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Slider> updateSlider(
            @PathVariable("id") Long sliderId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestBody Slider slider) {

        try {
            if (file != null && !file.isEmpty()) {
                // String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";
                String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

                String originalFilename = file.getOriginalFilename();
                String fileName = originalFilename.substring(0, originalFilename.lastIndexOf('.')) + ".png";

                String filePath = uploadDir + File.separator + fileName;

                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    fos.write(file.getBytes());
                }

                // Cập nhật tên file mới
                slider.setImage(fileName);
            }

            slider.setId(sliderId);
            Slider updateSlider = sliderService.updateSlider(slider);
            return new ResponseEntity<>(updateSlider, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteSlider(@PathVariable("id") Long sliderId) {
        sliderService.deleteSlider(sliderId);
        return new ResponseEntity<>("Slider successfully deleted!", HttpStatus.OK);
    }
}
