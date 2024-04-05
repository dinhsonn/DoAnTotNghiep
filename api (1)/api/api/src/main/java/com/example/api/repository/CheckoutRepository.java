package com.example.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.Checkout;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Page<Checkout> findAll(Pageable pageable);
}
