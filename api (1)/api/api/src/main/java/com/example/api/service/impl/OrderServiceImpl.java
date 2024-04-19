package com.example.api.service.impl;

import com.example.api.entity.Order;
import com.example.api.entity.User;
import com.example.api.repository.OrderRepository;
import com.example.api.service.OrderService;
import com.example.api.service.ProductService;
import com.example.api.service.UserService;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ProductService productService;
    private final UserService userService;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, ProductService productService, UserService userService) {
        this.orderRepository = orderRepository;
        this.productService = productService;
        this.userService = userService;
    }

    @Override
    public void addItemToOrder(Long userId, Long productId, int qty, double price, String image, String paymentMethod) {
        User user = userService.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found with id: " + userId);
        }
    
        // Tạo một đơn hàng mới mỗi khi thêm sản phẩm
        Order newOrderItem = new Order();
        newOrderItem.setUser(user);
        newOrderItem.setProduct(productService.getProductById(productId));
        newOrderItem.setQty(qty);
        newOrderItem.setPrice(price);
        newOrderItem.setStatus(1);
        newOrderItem.setImage(image);
        newOrderItem.setPaymentMethod(paymentMethod);
        newOrderItem.setCreatedAt(new Date()); // Set createdAt time
        orderRepository.save(newOrderItem);
    }
    
    


    @Override
    public void removeItemFromOrder(Long OrderId, Long productId) {
        Optional<Order> optionalOrder = orderRepository.findById(OrderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getProduct().getId().equals(productId)) {
                orderRepository.deleteByProductAndId(order.getProduct(), OrderId);
            }
        }
    }

    @Override
    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    @Override
    public double calculateOrderTotal() {
        List<Order> orders = orderRepository.findAll();
        double total = 0;
        for (Order order : orders) {
            total += order.getProduct().getPrice() * order.getQty();
        }
        return total;
    }

    @Transactional
    @Override
    public void updateOrderQuantity(Long OrderId, Long productId, int qty) {
        try {
            Order order = orderRepository.findById(OrderId).orElse(null);
            if (order != null) {
                if (order.getProduct().getId().equals(productId)) {
                    order.setQty(qty);
                    orderRepository.save(order);
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error updating Order quantity", e);
        }
    }
    @Override
    public Order getOrderById(Long OrderId) {
        Optional<Order> optionalBrand = orderRepository.findById(OrderId);
        return optionalBrand.orElse(null);
    }
    @Override
    public List<Order> getOrByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
    
}