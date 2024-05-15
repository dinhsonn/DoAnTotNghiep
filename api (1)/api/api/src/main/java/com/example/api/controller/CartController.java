package com.example.api.controller;

import com.example.api.entity.Cart;
import com.example.api.entity.User;
import com.example.api.service.CartService;
import com.example.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class CartController {

    private UserService userService;
    private CartService cartService;
    
    @Autowired
    public CartController(UserService userService, CartService cartService) {
        this.userService = userService;
        this.cartService = cartService;
    }

    @PostMapping("/add/{userId}/{productId}/{qty}/{price}/{image}")
    public void addItemToCart(@PathVariable Long userId, @PathVariable Long productId,
                              @PathVariable int qty, @PathVariable double price,
                              @PathVariable String image) {
        cartService.addItemToCart(userId, productId, qty, price, image);
    }
    
    @DeleteMapping("/{cartId}/items/{productId}")
    public void removeItemFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
        cartService.removeItemFromCart(cartId, productId);
    }
    @DeleteMapping("/items/{productId}")
    public void removeItemsFromCarts(@RequestParam List<Long> cartIds, @PathVariable Long productId) {
        cartService.removeItemsFromCarts(cartIds, productId);
    }
    
    @GetMapping("/items")
    public List<Cart> getCarts() {
        return cartService.getCarts();
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserAndCartsByUserId(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            List<Cart> carts = cartService.getCartsByUserId(userId);
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("carts", carts);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/total")
    public double getCartTotal() {
        return cartService.calculateCartTotal();
    }
    
    @PutMapping("/update/{cartId}/items/{productId}/{qty}")
    public void updateCartQuantity(@PathVariable Long cartId,@PathVariable Long productId, @PathVariable int qty) {
        cartService.updateCartQuantity(cartId,productId, qty);
    } 

}

