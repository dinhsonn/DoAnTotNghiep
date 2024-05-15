package com.example.api.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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

import com.example.api.entity.TrashProduct;
import com.example.api.service.TrashProductService;

@RestController
@RequestMapping("api/trashproduct") // Change the path to "api/posts"
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")


public class TrashProController {

    private TrashProductService trash;

    public TrashProController(TrashProductService trash) {
        this.trash = trash;
    }

    @PostMapping
    public ResponseEntity<TrashProduct> createProduct(@RequestBody TrashProduct trashproduct) {
        TrashProduct savedProduct = trash.createProduct(trashproduct);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrashProduct> getProductById(@PathVariable("id") Long productId) {
        TrashProduct trashproduct = trash.getProductById(productId);
        if (trashproduct != null) {
            return new ResponseEntity<>(trashproduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<TrashProduct>> getAllProducts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TrashProduct> posts = trash.getAllProducts(pageable);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productId) {
        trash.deleteProduct(productId);
        return new ResponseEntity<>("Product successfully deleted!", HttpStatus.OK);
    }
}
