package com.example.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.TrashAbout;

public interface TrashAboutRepository extends JpaRepository<TrashAbout, Long> {

    Page<TrashAbout> findAll(Pageable pageable);
    
}
