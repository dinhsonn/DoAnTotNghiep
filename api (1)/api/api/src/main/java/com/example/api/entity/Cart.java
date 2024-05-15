    package com.example.api.entity;

    import java.util.Date;

import jakarta.persistence.Column;
    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;
    import jakarta.persistence.JoinColumn;
    import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
    import jakarta.persistence.Temporal;
    import jakarta.persistence.TemporalType;
    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.Setter;

    @Entity
    @Table(name = "carts")
    @AllArgsConstructor
    @Getter
    @Setter
    public class Cart {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = false)
        private User user;

        @ManyToOne
        @JoinColumn(name = "product_id", nullable = false)
        private Product product;

        @Column(nullable = false)
        private int qty;

        @Column(nullable = false)
        private String image;

        @Column(nullable = false)
        private double price;

        @Column(nullable = false)
        private int status;
        
        @Temporal(TemporalType.TIMESTAMP)
        @Column(name = "created_at", nullable = false)
        private Date createdAt;

        @Temporal(TemporalType.TIMESTAMP)
        @Column(name = "updated_at")
        private Date updatedAt;

        public Cart() {
            this.createdAt = new Date();
        }
    }

