package com.example.api.Paypal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PayPalReponsi extends JpaRepository<paypal, Long> {
    
}
