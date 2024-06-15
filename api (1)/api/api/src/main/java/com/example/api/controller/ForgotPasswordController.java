package com.example.api.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.service.ForgotPasswordService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class ForgotPasswordController {

    @Autowired
    private ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public void forgotPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        forgotPasswordService.sendVerificationCode(email);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        int code = Integer.parseInt(payload.get("code"));
        String newPassword = payload.get("newPassword");
        boolean success = forgotPasswordService.verifyCodeAndResetPassword(email, code, newPassword);

        if (success) {
            return ResponseEntity.ok(Map.of("message", "Mật khẩu đã được đặt lại thành công."));
        } else {
            return ResponseEntity.status(400).body(Map.of("error", "Mã xác nhận không đúng"));
        }
    }
}
