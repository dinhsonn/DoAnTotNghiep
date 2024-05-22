package com.example.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.TrashProductImage;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TrashProductImageRepository extends JpaRepository<TrashProductImage, Long> {
        Page<TrashProductImage> findAll(Pageable pageable);

}
