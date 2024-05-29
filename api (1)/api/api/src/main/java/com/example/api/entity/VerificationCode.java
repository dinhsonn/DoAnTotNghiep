package com.example.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "verification_codes")
public class VerificationCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private int code;

    public VerificationCode() {}

    public VerificationCode(String email, int code) {
        this.email = email;
        this.code = code;
    }
}
