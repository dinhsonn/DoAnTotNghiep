package com.example.api.controller;

import com.example.api.entity.Cart;
import com.example.api.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/carts")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add/{userId}/{productId}/{qty}/{price}/{image}")
    public void addItemToCart(@PathVariable Long userId, @PathVariable Long productId,
                              @PathVariable int qty, @PathVariable double price,@PathVariable String image) {
        cartService.addItemToCart(userId, productId, qty, price,image);
    }
    
    @DeleteMapping("/{cartId}/items/{productId}")
    public void removeItemFromCart(@PathVariable Long cartId, @PathVariable Long productId) {
        cartService.removeItemFromCart(cartId, productId);
    }
    

    @GetMapping("/items")
    public List<Cart> getCarts() {
        return cartService.getCarts();
    }

    @GetMapping("/total")
    public double getCartTotal() {
        return cartService.calculateCartTotal();
    }

    @PutMapping("/update/{productId}/{qty}")
    public void updateCartQuantity(@PathVariable Long productId, @PathVariable int qty) {
        cartService.updateCartQuantity(productId, qty);
    }
}
