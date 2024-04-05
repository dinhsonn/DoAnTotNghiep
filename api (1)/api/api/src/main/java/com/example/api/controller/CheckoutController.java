package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.api.entity.Checkout;
import com.example.api.service.CheckoutService;

@RestController 
@RequestMapping("api/checkout") 
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class CheckoutController {

    private final CheckoutService checkoutService;

    
    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }
    @PostMapping
    public ResponseEntity<Checkout> createCheckout(@RequestBody Checkout checkout) {
        Checkout savedOrderDetail = checkoutService.createCheckout(checkout);
        return new ResponseEntity<>(savedOrderDetail, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Checkout> getCheckoutById(@PathVariable("id") Long checkoutId) {
        Checkout checKout = checkoutService.getCheckoutById(checkoutId);
        if (checKout != null) {
            return new ResponseEntity<>(checKout, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Checkout>> getAllCheckout(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Checkout> orderDetails = checkoutService.getAllCheckout(pageable);
        return new ResponseEntity<>(orderDetails, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Checkout> updateCheckout(@PathVariable("id") Long checkoutId,
            @RequestBody Checkout updatedCheckout) {
        Checkout updatedOrderDetail = checkoutService.updateCheckout(checkoutId, updatedCheckout);
        if (updatedOrderDetail != null) {
            return new ResponseEntity<>(updatedOrderDetail, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCheckout(@PathVariable("id") Long checkoutId) {
        checkoutService.deleteCheckout(checkoutId);
        return new ResponseEntity<>("OrderDetail successfully deleted!", HttpStatus.OK);
    }
}
