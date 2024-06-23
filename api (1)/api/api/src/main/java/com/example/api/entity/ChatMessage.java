package com.example.api.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "chat_messages")
@Getter
@Setter
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sender;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private Long orderId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false)
    private Date createdAt;

    public ChatMessage() {
        this.createdAt = new Date();
    }

    public ChatMessage(String sender, String content, Long orderId) {
        this.sender = sender;
        this.content = content;
        this.orderId = orderId;
        this.createdAt = new Date();
    }
}
