package com.example.api.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@Entity
@Table(name = "menu")
public class Menu {
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String link;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Menu parent;

    @Column(nullable = false)
    private String type;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "updated_by",length = 255)
    private Integer updatedBy;

    @Column(nullable = false)
    private Integer status;

    @Column(nullable = false)
    private Integer position;


    public Menu() {
        this.createdAt = new Date();
    }

}
