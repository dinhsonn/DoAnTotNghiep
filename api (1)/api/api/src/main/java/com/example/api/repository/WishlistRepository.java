package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.User;
import com.example.api.entity.Wishlist;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    Page<Wishlist> findAll(Pageable pageable);
    Wishlist findByProductId(Long productId);
    Wishlist findByUserAndProductId(User user, Long productId); 

}
