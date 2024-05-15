package com.example.api.service;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.TrashProduct;

public interface TrashProductService {
    TrashProduct createProduct(TrashProduct trashproduct);

    TrashProduct getProductById(Long id);

    Page<TrashProduct> getAllProducts(Pageable pageable);

    TrashProduct updateProduct(TrashProduct trashproduct);

    void deleteProduct(Long id);
}
