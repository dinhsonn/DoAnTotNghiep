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
@AllArgsConstructor
@Table(name = "TrashProduct")
@Getter
@Setter

public class TrashProduct {
        @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category categoryId;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brandId;

    @ManyToOne
    @JoinColumn(name = "category_option", nullable = false)
    private CategoryOption categoryOption;

    @ManyToOne
    @JoinColumn(name = "category_option_value", nullable = false)
    private CategoryOptionValue categoryOptionValue;

    @Column(nullable = false)
    private double price;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int qty;

    @Column(nullable = false)
    private String warranty;

    @Column(nullable = false)
    private String specifications;

    @Column(nullable = false)
    private int status;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    public TrashProduct() {
        this.createdAt = new Date();
    }

    public TrashProduct(String id) {
        this();
        this.id = Long.parseLong(id);
    }

    public TrashProduct(int status) {
        this.status = status;
        this.createdAt = new Date();
    }
    
}
