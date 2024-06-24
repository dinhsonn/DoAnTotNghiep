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

import com.example.api.entity.Post; // Import the Post entity
import com.example.api.service.PostService; // Import the PostService

@RestController
@AllArgsConstructor
@RequestMapping("api/posts") // Change the path to "api/posts"
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class PostController {

    private PostService postService; // Rename the service

    // Create Post REST API
    @PostMapping
    public ResponseEntity<Post> createPost(@RequestBody Post post) { // Rename the method
        post.setImage(post.getImage() + ".png");
        Post savedPost = postService.createPost(post); // Rename the service method
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
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
    public ResponseEntity<Post> getPostById(@PathVariable("id") Long postId) {
        Post post = postService.getPostById(postId);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Post>> getAllPosts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> posts = postService.getAllPosts(pageable);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Post> updatePost(
            @PathVariable("id") Long postId,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @RequestBody Post post) {

        try {
            if (file != null && !file.isEmpty()) {
                //String uploadDir = "C:\\Users\\DELL\\Desktop\\New folder\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

                String uploadDir = "C:\\Users\\MY-PC\\OneDrive\\Máy tính\\DoAnTotNghiep\\api (1)\\api\\src\\main\\resources\\static\\dataImage";

                String originalFilename = file.getOriginalFilename();
                String fileName = originalFilename.substring(0, originalFilename.lastIndexOf('.')) + ".png";

                String filePath = uploadDir + File.separator + fileName;

                try (FileOutputStream fos = new FileOutputStream(filePath)) {
                    fos.write(file.getBytes());
                }

                post.setImage(fileName);
            }

            post.setId(postId);
            Post updatePost = postService.updatePost(post);
            return new ResponseEntity<>(updatePost, HttpStatus.OK);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Delete Post REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deletePost(@PathVariable("id") Long postId) { // Rename the parameter
        postService.deletePost(postId); // Rename the service method
        return new ResponseEntity<>("Post successfully deleted!", HttpStatus.OK);
    }

    //
    @GetMapping("/topic/{topicId}")
    public ResponseEntity<Page<Post>> getPostsByTopicId(
            @PathVariable("topicId") Long topicId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> posts = postService.getPostsByTopicId(topicId, pageable);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }
}
