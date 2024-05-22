package com.example.api.repository;

import com.example.api.entity.TrashBrand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrashBrandRepository extends JpaRepository<TrashBrand, Long> {
}
