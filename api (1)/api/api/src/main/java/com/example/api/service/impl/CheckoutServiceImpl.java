package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.Checkout;
import com.example.api.service.CheckoutService;
import com.example.api.repository.CheckoutRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CheckoutServiceImpl implements CheckoutService {

    private CheckoutRepository checkoutRepository;

    @Override
    public Checkout createCheckout(Checkout checkout) {
        return checkoutRepository.save(checkout);
    }

    @Override
    public Checkout getCheckoutById(Long checkoutId) {
        Optional<Checkout> optionalCheckout = checkoutRepository.findById(checkoutId);
        return optionalCheckout.orElse(null);
    }

    @Override
    public Page<Checkout> getAllCheckout(Pageable pageable) {
        return checkoutRepository.findAll(pageable);
    }

    @Override
    public Checkout updateCheckout(Long checkoutId, Checkout updatedCheckout) {
        Checkout existingCheckout = checkoutRepository.findById(checkoutId).orElse(null);
        if (existingCheckout != null) {
            existingCheckout.setUserId(updatedCheckout.getUserId());
            existingCheckout.setCartId(updatedCheckout.getCartId());
            existingCheckout.setTotalAmount(updatedCheckout.getTotalAmount());
            existingCheckout.setPaymentMethod(updatedCheckout.getPaymentMethod());
            existingCheckout.setStatus(updatedCheckout.getStatus());
            existingCheckout.setUpdatedAt(new Date()); // Cập nhật thời gian khi cập nhật
            return checkoutRepository.save(existingCheckout);
        }
        return null;
    }

    @Override
    public void deleteCheckout(Long checkoutId) {
        checkoutRepository.deleteById(checkoutId);
    }
}
