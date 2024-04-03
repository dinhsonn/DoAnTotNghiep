package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.Product;
import com.example.api.entity.ProductOption;
import com.example.api.service.ProductOptionService;

@RestController
@AllArgsConstructor
@RequestMapping("api/productoption")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")

public class ProductOptionController {

    private ProductOptionService productOptionService;

    @PostMapping
    public ResponseEntity<ProductOption> createProductOption(@RequestBody ProductOption productOption) {
        ProductOption savedProductOption = productOptionService.createProductOption(productOption);
        return new ResponseEntity<>(savedProductOption, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductOption> getProductOptionById(@PathVariable("id") Long productoptionId) {
        ProductOption productOption = productOptionService.getProductOptionById(productoptionId);
        if (productOption != null) {
            return new ResponseEntity<>(productOption, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<ProductOption>> getAllProductOptions(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductOption> ProductOptions = productOptionService.getAllProductOptions(pageable);
        return new ResponseEntity<>(ProductOptions, HttpStatus.OK);
    }

    @PutMapping("{id}")

    public ResponseEntity<ProductOption> updateProductOption(@PathVariable("id") Long productoptionId,
            @RequestBody ProductOption ProductOption) {
        ProductOption.setId(productoptionId);
        ProductOption updatedProductOption = productOptionService.updateProductOption(ProductOption);
        return new ResponseEntity<>(updatedProductOption, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProductOption(@PathVariable("id") Long productoptionId) {
        productOptionService.deleteProductOption(productoptionId);
        return new ResponseEntity<>("ProductOption successfully deleted!", HttpStatus.OK);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<Page<ProductOption>> getProductOptionsByProductId(@PathVariable Product productId,
            Pageable pageable) {
        Page<ProductOption> productOptions = productOptionService.getProductOptionsByProductId(productId, pageable);
        return new ResponseEntity<>(productOptions, HttpStatus.OK);
    }
}
