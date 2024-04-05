package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.ProductOptionValue;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductOptionValueRepository extends JpaRepository<ProductOptionValue, Long> {
    Page<ProductOptionValue> findAll(Pageable pageable);
    Page<ProductOptionValue> findByOptionId(Long option, Pageable pageable);
}
