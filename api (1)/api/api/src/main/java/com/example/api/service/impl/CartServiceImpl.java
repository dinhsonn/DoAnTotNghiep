package com.example.api.service.impl;

import com.example.api.entity.Cart;
import com.example.api.entity.Product;
import com.example.api.entity.User;
import com.example.api.repository.CartRepository;
import com.example.api.service.CartService;
import com.example.api.service.ProductService;
import com.example.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void addItemToCart(Long userId, Long productId, int qty, double price,String image) {
        // Lấy thông tin user từ userId
        User user = userService.findById(userId);

        // Kiểm tra xem user có tồn tại hay không
        if (user == null) {
            throw new RuntimeException("User not found with id: " + userId);
        }

        Cart cart = new Cart();
        cart.setUser(user);
        cart.setProduct(productService.getProductById(productId));
        cart.setQty(qty);
        cart.setPrice(price);
        cart.setStatus(1); 
        cart.setImage(image);
        cartRepository.save(cart);
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
    public void updateCartQuantity(Long productId, int newQuantity) {
        Product product = productService.getProductById(productId);
        if (product != null) {
            Cart cart = cartRepository.findByProduct(product);
            if (cart != null) {
                cart.setQty(newQuantity);
                cartRepository.save(cart);
            }
        }
    }
}
