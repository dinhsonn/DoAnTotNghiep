package com.example.api.service.impl;

import com.example.api.entity.Cart;
import com.example.api.entity.User;
import com.example.api.repository.CartRepository;
import com.example.api.service.CartService;
import com.example.api.service.ProductService;
import com.example.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, ProductService productService, UserService userService) {
        this.cartRepository = cartRepository;
        this.productService = productService;
        this.userService = userService;
    }

    @Override
    public void addItemToCart(Long userId, Long productId, int qty, double price, String image ) {
        User user = userService.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found with id: " + userId);
        }

        Cart existingCartItem = cartRepository.findByUserAndProduct(user, productService.getProductById(productId));
        if (existingCartItem != null) {
            existingCartItem.setQty(existingCartItem.getQty() + qty);
            existingCartItem.setUpdatedAt(new Date()); // Update updatedAt time
            cartRepository.save(existingCartItem);
        } else {
            Cart newCartItem = new Cart();
            newCartItem.setUser(user);
            newCartItem.setProduct(productService.getProductById(productId));
            newCartItem.setQty(qty);
            newCartItem.setPrice(price);
            newCartItem.setStatus(1);
            newCartItem.setImage(image);
            newCartItem.setCreatedAt(new Date());
            cartRepository.save(newCartItem);
        }
    }


    @Override
    public void removeItemFromCart(Long cartId, Long productId) {
        Optional<Cart> optionalCart = cartRepository.findById(cartId);
        if (optionalCart.isPresent()) {
            Cart cart = optionalCart.get();
            if (cart.getProduct().getId().equals(productId)) {
                cartRepository.deleteByProductAndId(cart.getProduct(), cartId);
            }
        }
    }

    @Override
    public List<Cart> getCarts() {
        return cartRepository.findAll();
    }

    @Override
    public double calculateCartTotal() {
        List<Cart> carts = cartRepository.findAll();
        double total = 0;
        for (Cart cart : carts) {
            total += cart.getProduct().getPrice() * cart.getQty();
        }
        return total;
    }

    @Transactional
    @Override
    public void updateCartQuantity(Long cartId, Long productId, int qty) {
        try {
            Cart cart = cartRepository.findById(cartId).orElse(null);
            if (cart != null) {
                if (cart.getProduct().getId().equals(productId)) {
                    cart.setQty(qty);
                    cartRepository.save(cart);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating cart quantity", e);
        }
    }
    @Override
    public Cart getCartById(Long cartId) {
        Optional<Cart> optionalBrand = cartRepository.findById(cartId);
        return optionalBrand.orElse(null);
    }
    @Override
    public List<Cart> getCartsByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }


    @Override
    public void deleteCartItems(List<Long> cartItemIds) {
        for (Long cartItemId : cartItemIds) {
            cartRepository.deleteById(cartItemId);
        }
    }
    @Override
    public void removeItemsFromCarts(List<Long> cartIds, Long productId) {
        for (Long cartId : cartIds) {
            Optional<Cart> optionalCart = cartRepository.findById(cartId);
            if (optionalCart.isPresent()) {
                Cart cart = optionalCart.get();
                if (cart.getProduct().getId().equals(productId)) {
                    cartRepository.deleteById(cartId);
                }
            }
        }
    }
}
