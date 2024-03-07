package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.ProductSale;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductSaleRepository extends JpaRepository<ProductSale, Long> {
    Page<ProductSale> findAll(Pageable pageable);
}
