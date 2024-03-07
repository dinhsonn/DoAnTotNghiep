package com.example.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.api.entity.Brand;

public interface BrandRepository extends JpaRepository<Brand, Long> {
    Page<Brand> findAll(Pageable pageable);
    
}
