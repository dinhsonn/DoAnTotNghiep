package com.example.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.api.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Page<Category> findAll(Pageable pageable);
    
}
