package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.CategoryOptionValue;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CategoryOptionValueRepository extends JpaRepository<CategoryOptionValue, Long> {
    Page<CategoryOptionValue> findAll(Pageable pageable);
    Page<CategoryOptionValue> findByOptionId(Long option, Pageable pageable);

}
