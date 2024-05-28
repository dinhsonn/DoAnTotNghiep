package com.example.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.entity.Cart;
import com.example.api.entity.Product;
import com.example.api.entity.User;
import com.example.api.entity.Wishlist;
import com.example.api.repository.WishlistRepository;
import com.example.api.service.ProductService;
import com.example.api.service.UserService;
import com.example.api.service.WishlistService;

import java.util.Date;
import java.util.List;

@Service
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductService productService;
    private final UserService userService;


    @Autowired
    public WishlistServiceImpl(WishlistRepository wishlistRepository, ProductService productService,UserService userService) {
        this.wishlistRepository = wishlistRepository;
        this.productService = productService;
        this.userService = userService;

    }

    @Override
    public void addItemToWishlist(Long userId, Long productId, int qty, double price, String image) {
        User user = userService.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found with id: " + userId);
        }
        Wishlist existingCartItem = wishlistRepository.findByUserAndProductId(user, productId);
        if (existingCartItem != null) {
            existingCartItem.setQty(existingCartItem.getQty() + qty);
            existingCartItem.setUpdatedAt(new Date());
            wishlistRepository.save(existingCartItem);
        } else {
            Wishlist wishlistItem = new Wishlist();
                wishlistItem.setUser(user);
                wishlistItem.setProductId(productId);
                wishlistItem.setProductId(productId);
                wishlistItem.setQty(qty);
                wishlistItem.setPrice(price);
                wishlistItem.setStatus(1);   
                wishlistItem.setImage(image);
                wishlistItem.setCreatedAt(new Date());
        
            wishlistRepository.save(wishlistItem);
        }
}

    @Override
    public void removeItemFromWishlist(Long productId) {
        Product product = productService.getProductById(productId);
        if (product != null) {
            Wishlist wishlistItem = wishlistRepository.findByProductId(productId);
            if (wishlistItem != null) {
                wishlistRepository.delete(wishlistItem);
            }
        }
    }

    @Override
    public List<Wishlist> getWishlistItems() {
        return wishlistRepository.findAll();
    }

}
