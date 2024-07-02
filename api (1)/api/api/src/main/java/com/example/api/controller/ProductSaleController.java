package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.api.entity.ProductSale;
import com.example.api.service.ProductSaleService;

@RestController
@AllArgsConstructor
@RequestMapping("api/productsale")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class ProductSaleController {

    private ProductSaleService productSaleService;

    @PostMapping
    public ResponseEntity<ProductSale> createProductSale(@RequestBody ProductSale productSale) {
        ProductSale savedProductSale = productSaleService.createProductSale(productSale);
        return new ResponseEntity<>(savedProductSale, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<ProductSale> getProductSaleById(@PathVariable("id") Long productSaleId) {
        ProductSale productSale = productSaleService.getProductSaleById(productSaleId); 
        if (productSale != null) {
            return new ResponseEntity<>(productSale, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<ProductSale>> getAllProductSales(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<ProductSale> productSales = productSaleService.getAllProductSales(pageable);
        return new ResponseEntity<>(productSales, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<ProductSale> updateProductSale(@PathVariable("id") Long productSaleId,
            @RequestBody ProductSale productSale) {
        productSale.setId(productSaleId);
        ProductSale updatedProductSale = productSaleService.updateProductSale(productSale);
        return new ResponseEntity<>(updatedProductSale, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteProductSale(@PathVariable("id") Long productSaleId) {
        productSaleService.deleteProductSale(productSaleId);
        return new ResponseEntity<>("ProductSale successfully deleted!", HttpStatus.OK);
    }
}
