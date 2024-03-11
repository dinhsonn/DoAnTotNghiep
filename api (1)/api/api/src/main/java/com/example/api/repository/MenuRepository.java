package com.example.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.api.entity.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long> {
    Page<Menu> findAll(Pageable pageable);
    Page<Menu> findByPositionAndParentId(Integer position, Menu parent, Pageable pageable);
}
