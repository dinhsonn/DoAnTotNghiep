package com.example.api.service;

import com.example.api.entity.User;
import com.example.api.entity.VerificationCode;
import com.example.api.repository.UserRepository;
import com.example.api.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class ForgotPasswordService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    private Random random = new Random();

    public void sendVerificationCode(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            int code = random.nextInt(900000) + 100000;
            VerificationCode verificationCode = new VerificationCode(email, code);
            verificationCodeRepository.save(verificationCode);

            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setSubject("Password Reset Verification Code");
            message.setText("Your verification code is: " + code);
            emailSender.send(message);
        }
    }

    public boolean verifyCodeAndResetPassword(String email, int code, String newPassword) {
        Optional<VerificationCode> codeOptional = verificationCodeRepository.findByEmailAndCode(email, code);
        if (codeOptional.isPresent()) {
            User user = userRepository.findByEmail(email).get();
            user.setPassword(newPassword);
            userRepository.save(user);
            verificationCodeRepository.delete(codeOptional.get());
            return true;
        }
        return false;
    }
}
