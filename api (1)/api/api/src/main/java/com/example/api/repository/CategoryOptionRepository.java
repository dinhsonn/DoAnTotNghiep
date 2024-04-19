package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.Category;
import com.example.api.entity.CategoryOption;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryOptionRepository extends JpaRepository<CategoryOption, Long> {
    Page<CategoryOption> findAll(Pageable pageable);
    Page<CategoryOption> findByCategoryId(Category categoryId, Pageable pageable);
}
