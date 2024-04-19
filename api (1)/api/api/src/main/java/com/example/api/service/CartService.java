package com.example.api.service;

import com.example.api.entity.Cart;
import java.util.List;

public interface CartService {
    
    void addItemToCart(Long userId, Long productId, int qty, double price,String image,String paymentMethod);
    
    void removeItemFromCart(Long cartId, Long productId);

    List<Cart> getCarts();

    public Cart getCartById(Long cartId);

    double calculateCartTotal();
    
    List<Cart> getCartsByUserId(Long userId);
    
    void deleteCartItems(List<Long> cartItemIds);
    void removeItemsFromCarts(List<Long> cartIds, Long productId);

    void updateCartQuantity(Long cartId,Long productId, int qty);
    void updatepaymentMethod(Long cartId,String paymentMethod);

}
