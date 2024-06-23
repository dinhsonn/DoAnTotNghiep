package com.example.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.api.entity.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByOrderId(Long orderId);
    List<Report> findByUserId(Long userId);
}
