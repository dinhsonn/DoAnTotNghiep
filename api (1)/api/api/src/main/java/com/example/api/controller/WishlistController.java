package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.Wishlist;
import com.example.api.service.WishlistService;

import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class WishlistController {

    private final WishlistService wishlistService;

    @Autowired
    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/add/{userId}/{productId}/{qty}/{price}/{image}")    public void addItemToWishlist(@PathVariable Long userId, @PathVariable Long productId,
    @PathVariable int qty, @PathVariable double price,
    @PathVariable String image){
        wishlistService.addItemToWishlist(userId, productId, qty, price, image);
    }

    @DeleteMapping("/remove/{productId}")
    public void removeItemFromWishlist(@PathVariable Long productId) {
        wishlistService.removeItemFromWishlist(productId);
    }

    @GetMapping("/items")
    public List<Wishlist> getWishlistItems() {
        return wishlistService.getWishlistItems();
    }

}
