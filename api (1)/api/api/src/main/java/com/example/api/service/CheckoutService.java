package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.Checkout;

public interface CheckoutService {

    Checkout createCheckout(Checkout checkout);

    Checkout getCheckoutById(Long checkoutId);

    Page<Checkout> getAllCheckout(Pageable pageable);

    Checkout updateCheckout(Long checkoutId, Checkout updatedCheckout);

    void deleteCheckout(Long checkoutId);

    Checkout getCheckoutByUserIdAndCartId(Long userId, Long cartId);
}

