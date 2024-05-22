package com.example.api.controller;

import com.example.api.entity.Order;
import com.example.api.entity.User;
import com.example.api.service.OrderService;
import com.example.api.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/orders")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class OrderController {

    private UserService userService;
    private OrderService orderService;
    
    @Autowired
    public OrderController(UserService userService, OrderService orderService) {
        this.userService = userService;
        this.orderService = orderService;
    }

    @PostMapping("/add/{userId}/{productId}/{name}/{email}/{phone}/{address}/{qty}/{price}/{image}/{paymentMethod}")
    public void addItemOrder(@PathVariable Long userId, @PathVariable Long productId,
                             @PathVariable String name, @PathVariable String email,
                             @PathVariable String phone, @PathVariable String address,
                             @PathVariable int qty, @PathVariable double price,
                             @PathVariable String image, @PathVariable String paymentMethod) {
        orderService.addItemToOrder(userId, productId, name, email, phone, address, qty, price, image, paymentMethod);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return new ResponseEntity<>("Order successfully deleted!", HttpStatus.OK);
    }
    @DeleteMapping("/{OrderId}/items/{productId}")
    public void removeItemFromOrder(@PathVariable Long OrderId, @PathVariable Long productId) {
        orderService.removeItemFromOrder(OrderId, productId);
    }
    @GetMapping("/items")
    public List<Order> getOrders() {
        return orderService.getOrders();
    }
    
    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserAndOrdersByUserId(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            List<Order> Orders = orderService.getOrByUserId(userId);
            Map<String, Object> response = new HashMap<>();
            response.put("user", user);
            response.put("Orders", Orders);
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/total")
    public double getOrderTotal() {
        return orderService.calculateOrderTotal();
    }
    
    @PutMapping("/update/{OrderId}/items/{productId}/{qty}")
    public void updateOrderQuantity(@PathVariable Long OrderId,@PathVariable Long productId, @PathVariable int qty) {
        orderService.updateOrderQuantity(OrderId,productId, qty);
    }
    @PutMapping("/update/{OrderId}/items/{paymentMethod}")
    public void updatepaymentMethod(@PathVariable Long OrderId,@PathVariable String paymentMethod) {
        orderService.updatepaymentMethod(OrderId,paymentMethod);
    }
    @PutMapping("{id}")
    public ResponseEntity<Order> updateOrder(
            @PathVariable("id") Long OrderId,
            @RequestBody Order order) {
        
                order.setId(OrderId);
        Order updateOrder = orderService.updateOrder(order);
        if (updateOrder != null) {
            return new ResponseEntity<>(updateOrder, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping("/{id}/status/{status}")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable Long id, @PathVariable int status) {
        Order order = orderService.getOrderById(id);
        if (order != null) {
            order.setStatus(status);
            Order updatedOrder = orderService.updateOrder(order);
            return ResponseEntity.ok(updatedOrder);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
