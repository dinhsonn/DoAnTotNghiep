package com.example.api.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@AllArgsConstructor
@Table(name = "search")
@Getter
@Setter

public class SearchLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String query;

    private LocalDateTime timestamp;

    public SearchLog() {
        this.timestamp = LocalDateTime.now();
    }

    public SearchLog(String query) {
        this.query = query;
        this.timestamp = LocalDateTime.now();
    }

}

