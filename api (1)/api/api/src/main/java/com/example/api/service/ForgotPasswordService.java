package com.example.api.service;

import com.example.api.entity.User;
import com.example.api.entity.VerificationCode;
import com.example.api.repository.UserRepository;
import com.example.api.repository.VerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.util.Optional;
import java.util.Random;

@Service
public class ForgotPasswordService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender emailSender;

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private VerificationCodeRepository verificationCodeRepository;

    private Random random = new Random();

    public void sendVerificationCode(String email) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent()) {
            int code = random.nextInt(900000) + 100000;
            VerificationCode verificationCode = new VerificationCode(email, code);
            verificationCodeRepository.save(verificationCode);

            try {
                sendHtmlEmail(email, code);
            } catch (MessagingException e) {
                e.printStackTrace();
            }
        }
    }

    private void sendHtmlEmail(String email, int code) throws MessagingException {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        Context context = new Context();
        context.setVariable("code", code);
        String htmlContent = templateEngine.process("email-template", context);

        helper.setTo(email);
        helper.setSubject("Password Reset Verification Code");
        helper.setText(htmlContent, true);

        emailSender.send(message);
    }

    public boolean verifyCodeAndResetPassword(String email, int code, String newPassword) {
        Optional<VerificationCode> codeOptional = verificationCodeRepository.findByEmailAndCode(email, code);
        if (codeOptional.isPresent()) {
            User user = userRepository.findByEmail(email).get();
            user.setPassword(newPassword);  // Consider hashing the password here
            userRepository.save(user);
            verificationCodeRepository.delete(codeOptional.get());
            return true;
        }
        return false;
    }
}
