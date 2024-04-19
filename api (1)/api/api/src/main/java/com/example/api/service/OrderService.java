package com.example.api.service;

import com.example.api.entity.Order;

import java.util.List;


public interface OrderService {

    void addItemToOrder(Long userId, Long productId, int qty, double price,String image,String paymentMethod);
    
    void removeItemFromOrder(Long OrderId, Long productId);

    List<Order> getOrders();

    public Order getOrderById(Long OrderId);

    double calculateOrderTotal();
    
    List<Order> getOrByUserId(Long userId);
    
    void updateOrderQuantity(Long OrderId,Long productId, int qty);

}

