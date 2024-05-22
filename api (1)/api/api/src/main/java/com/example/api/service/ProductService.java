package com.example.api.service;

import com.example.api.entity.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductService {

    Product createProduct(Product product);

    Product getProductById(Long id);

    Page<Product> getAllProducts(Pageable pageable);

    Product updateProduct(Product product);

    void deleteProduct(Long id);
    
    List<Product> getProductsByIds(List<Long> productIds);

    Product updateProductQty(Long productId, int qty);

    
}
