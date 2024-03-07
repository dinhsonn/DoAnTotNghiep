package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.ProductOption;

public interface ProductOptionService {
    ProductOption createProductOption(ProductOption productoption);

    ProductOption getProductOptionById(Long productoptionId);

    Page<ProductOption> getAllProductOptions(Pageable pageable);

    ProductOption updateProductOption(ProductOption productoption);

    void deleteProductOption(Long productoptionId);
    
}
