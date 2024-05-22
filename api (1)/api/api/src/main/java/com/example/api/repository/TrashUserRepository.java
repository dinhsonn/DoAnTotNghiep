package com.example.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.TrashUser;

public interface TrashUserRepository extends JpaRepository<TrashUser, Long> {

    Page<TrashUser> findAll(Pageable pageable);
    
}
