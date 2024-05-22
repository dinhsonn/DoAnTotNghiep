package com.example.api.service;

import com.example.api.entity.Order;

import java.util.List;


public interface OrderService {
    Order updateOrder(Order order);

    void addItemToOrder(Long userId, Long productId, String name, String email,
    String phone, String address, int qty, double price,
    String image, String paymentMethod);

    void removeItemFromOrder(Long OrderId, Long productId);

    List<Order> getOrders();

    public Order getOrderById(Long OrderId);

    double calculateOrderTotal();
    
    List<Order> getOrByUserId(Long userId);
    
    void updateOrderQuantity(Long OrderId,Long productId, int qty);

    void updatepaymentMethod(Long OrderId,String paymentMethod);

    public void deleteOrder(Long userId);
    
    public List<Order> getOrdersByUserId(Long userId);

}

