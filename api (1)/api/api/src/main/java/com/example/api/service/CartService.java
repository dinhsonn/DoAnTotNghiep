package com.example.api.service;

import com.example.api.entity.Cart;
import java.util.List;

public interface CartService {
    
    void addItemToCart(Long userId, Long productId, int qty, double price,String image);
    
    void removeItemFromCart(Long cartId, Long productId);
    
    List<Cart> getCarts();
    
    double calculateCartTotal();
    
    void updateCartQuantity(Long productId, int qty);
}
