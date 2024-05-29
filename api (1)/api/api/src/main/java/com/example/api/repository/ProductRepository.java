package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.Brand;
import com.example.api.entity.CategoryOptionValue;
import com.example.api.entity.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAll(Pageable pageable);
    List<Product> findByBrandId(Brand brand);
    List<Product> findByCategoryOptionValue(CategoryOptionValue categoryOptionValue);
}
