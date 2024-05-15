package com.example.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.entity.TrashProduct;

@Repository
public interface TrashProductRepository extends JpaRepository<TrashProduct, Long> {
    Page<TrashProduct> findAll(Pageable pageable);


}

