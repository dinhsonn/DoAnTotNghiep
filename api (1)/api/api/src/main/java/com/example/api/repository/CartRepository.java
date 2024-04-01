package com.example.api.repository;

import com.example.api.entity.Cart;
import com.example.api.entity.Product;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Page<Cart> findAll(Pageable pageable);
    Cart findByProduct(Product product);
    void deleteByProductAndId(Product product, Long id);

}
