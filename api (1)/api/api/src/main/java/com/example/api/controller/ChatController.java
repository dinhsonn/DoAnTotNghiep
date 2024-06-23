package com.example.api.controller;

import com.example.api.entity.ChatMessage;
import com.example.api.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ChatController(ChatMessageService chatMessageService, SimpMessagingTemplate messagingTemplate) {
        this.chatMessageService = chatMessageService;
        this.messagingTemplate = messagingTemplate;
    }

    @PostMapping("/{orderId}")
    public ResponseEntity<ChatMessage> sendMessage(@PathVariable Long orderId, @RequestBody ChatMessage message) {
        message.setOrderId(orderId);
        ChatMessage savedMessage = chatMessageService.save(message);
        // Send message to WebSocket topic "/topic/messages/{orderId}"
        messagingTemplate.convertAndSend("/topic/messages/" + orderId, savedMessage);
        return new ResponseEntity<>(savedMessage, HttpStatus.OK);
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<List<ChatMessage>> getMessages(@PathVariable Long orderId) {
        List<ChatMessage> messages = chatMessageService.findByOrderId(orderId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
