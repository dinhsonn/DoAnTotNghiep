package com.example.api.repository;

import com.example.api.entity.Order;
import com.example.api.entity.Product;
import com.example.api.entity.User;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    Page<Order> findAll(Pageable pageable);
    List<Order> findAllByProduct(Product product);
    void deleteByProductAndId(Product product, Long id);
    Order findByUserAndProduct(User user, Product product);
    List<Order> findByUserId(Long userId);
}
