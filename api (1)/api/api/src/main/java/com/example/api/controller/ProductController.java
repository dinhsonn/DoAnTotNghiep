package com.example.api.controller;

import com.example.api.entity.Category;

import com.example.api.entity.CategoryOptionValue;
import com.example.api.entity.Product;
import com.example.api.service.CategoryOptionValueService;
import com.example.api.service.ProductService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class ProductController {

    private ProductService productService;
    @Autowired
    private CategoryOptionValueService categoryOptionValueService;
  

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.createProduct(product);
        return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long productId) {
        Product product = productService.getProductById(productId);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Product>> getAllProducts(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> posts = productService.getAllProducts(pageable);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long productId,
            @RequestBody Product product) {
        product.setId(productId);
        Product updatedProduct = productService.updateProduct(product);
        if (updatedProduct != null) {
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable("id") Long productId) {
        productService.deleteProduct(productId);
        return new ResponseEntity<>("Product successfully deleted!", HttpStatus.OK);
    }

    @PutMapping("/{id}/quantity")
    public ResponseEntity<Product> updateProductQty(@PathVariable("id") Long productId,
            @RequestBody Map<String, Integer> updates) {
        Integer newQty = updates.get("qty");
        if (newQty == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Product updatedProduct = productService.updateProductQty(productId, newQty);
        if (updatedProduct != null) {
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/related/{brandId}")
    public List<Product> getRelatedProducts(@PathVariable Long brandId) {
        return productService.getRelatedProducts(brandId);
    }

    @GetMapping("/byCategoryOptionValue/{categoryOptionValueId}")
    public List<Product> getProductsByCategoryOptionValue(@PathVariable CategoryOptionValue categoryOptionValueId) {
            return productService.getProductsByCategoryOptionValue(categoryOptionValueId);    
    }
    @GetMapping("/byCategory/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable Category categoryId) {
            return productService.getProductsByCategory(categoryId);    
    }


}
