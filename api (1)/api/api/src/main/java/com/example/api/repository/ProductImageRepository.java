package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.ProductImage;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
    Page<ProductImage> findAll(Pageable pageable);
    Page<ProductImage> findByProductId(Long productId, Pageable pageable);
}
