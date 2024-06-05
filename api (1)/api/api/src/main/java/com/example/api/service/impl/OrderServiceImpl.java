package com.example.api.service.impl;

import com.example.api.entity.Order;
import com.example.api.entity.User;
import com.example.api.repository.OrderRepository;
import com.example.api.service.OrderService;
import com.example.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;

    @Autowired
    public OrderServiceImpl(OrderRepository orderRepository, UserService userService) {
        this.orderRepository = orderRepository;
        this.userService = userService;
    }

    @Override
    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    @Override
    public void addItemToOrder(Long userId, Long productId, String name, String email,
                                String phone, String address, int qty, double price,
                                String image, String paymentMethod) {
        User user = userService.findById(userId);
        if (user == null) {
            throw new RuntimeException("User not found with id: " + userId);
        }

        Order newOrderItem = new Order();
        newOrderItem.setUser(user);
        newOrderItem.setProductId(productId);
        newOrderItem.setName(name);
        newOrderItem.setEmail(email);
        newOrderItem.setPhone(phone);
        newOrderItem.setAddress(address);
        newOrderItem.setQty(qty);
        newOrderItem.setPrice(price);
        newOrderItem.setStatus(1);
        newOrderItem.setImage(image);
        newOrderItem.setPaymentMethod(paymentMethod);
        newOrderItem.setCreatedAt(new Date());
        orderRepository.save(newOrderItem);
    }

    @Override
    public void removeItemFromOrder(Long orderId, Long productId) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            if (order.getProductId().equals(productId)) {
                orderRepository.delete(order);
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
            total += order.getPrice() * order.getQty();
        }
        return total;
    }

    @Transactional
    @Override
    public void updateOrderQuantity(Long orderId, int qty) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setQty(qty);
            orderRepository.save(order);
        } else {
            throw new RuntimeException("Order not found with id: " + orderId);
        }
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    @Override
    public void updatePaymentMethod(Long orderId, String paymentMethod) {
        Optional<Order> optionalOrder = orderRepository.findById(orderId);
        if (optionalOrder.isPresent()) {
            Order order = optionalOrder.get();
            order.setPaymentMethod(paymentMethod);
            orderRepository.save(order);
        } else {
            throw new RuntimeException("Order not found with id: " + orderId);
        }
    }

    @Override
    public Order updateOrder(Order order) {
        Order existingOrder = orderRepository.findById(order.getId()).orElse(null);
        if (existingOrder != null) {
            existingOrder.setStatus(order.getStatus());
            existingOrder.setUpdatedAt(new Date());
            return orderRepository.save(existingOrder);
        }
        return null;
    }

    @Override
    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}