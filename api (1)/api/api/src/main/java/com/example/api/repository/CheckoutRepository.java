package com.example.api.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.Checkout;
import com.example.api.entity.Cart;
import com.example.api.entity.User;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Page<Checkout> findAll(Pageable pageable);
    Checkout findByUserIdAndCartId(User user, Cart cart);

}
