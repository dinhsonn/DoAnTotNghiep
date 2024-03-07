package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.api.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findAll(Pageable pageable);
    
}
