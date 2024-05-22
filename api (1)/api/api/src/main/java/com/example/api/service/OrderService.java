package com.example.api.service;

import com.example.api.entity.Order;

import java.util.List;

public interface OrderService {
    List<Order> getOrdersByUserId(Long userId);
    void addItemToOrder(Long userId, Long productId, String name, String email,
                        String phone, String address, int qty, double price,
                        String image, String paymentMethod);
    void removeItemFromOrder(Long orderId, Long productId);
    List<Order> getOrders();
    double calculateOrderTotal();
    void updateOrderQuantity(Long orderId, int qty);
    Order getOrderById(Long orderId);
    void updatePaymentMethod(Long orderId, String paymentMethod);
    Order updateOrder(Order order);
    void deleteOrder(Long orderId);
}
