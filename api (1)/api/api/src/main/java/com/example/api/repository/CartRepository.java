package com.example.api.repository;

import com.example.api.entity.Cart;
import com.example.api.entity.Product;
import com.example.api.entity.User;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Page<Cart> findAll(Pageable pageable);
    List<Cart> findAllByProduct(Product product);
    void deleteByProductAndId(Product product, Long id);
    Cart findByUserAndProduct(User user, Product product);
    List<Cart> findByUserId(Long userId);

}
