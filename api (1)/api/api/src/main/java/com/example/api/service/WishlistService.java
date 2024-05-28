package com.example.api.service;

import java.util.List;


import com.example.api.entity.Wishlist; 

public interface WishlistService { 
    void addItemToWishlist(Long userId, Long productId, int qty, double price,String image);
    void removeItemFromWishlist(Long productId);
    List<Wishlist> getWishlistItems();
}
