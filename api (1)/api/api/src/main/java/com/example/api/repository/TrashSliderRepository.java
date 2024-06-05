package com.example.api.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.entity.TrashSlider;

@Repository
public interface TrashSliderRepository extends JpaRepository<TrashSlider, Long> {
    Page<TrashSlider> findAll(Pageable pageable);
}
