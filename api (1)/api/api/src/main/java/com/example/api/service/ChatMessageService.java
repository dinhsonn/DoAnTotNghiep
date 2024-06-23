package com.example.api.service;

import com.example.api.entity.ChatMessage;

import java.util.List;

public interface ChatMessageService {
    ChatMessage save(ChatMessage message);

    List<ChatMessage> findByOrderId(Long orderId);
}
