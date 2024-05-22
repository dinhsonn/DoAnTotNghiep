package com.example.api.repository;

import com.example.api.entity.TrashCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrashCategoryRepository extends JpaRepository<TrashCategory, Long> {
}
