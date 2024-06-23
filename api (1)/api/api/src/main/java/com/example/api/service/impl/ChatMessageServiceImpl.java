package com.example.api.service.impl;

import com.example.api.entity.ChatMessage;
import com.example.api.repository.ChatMessageRepository;
import com.example.api.service.ChatMessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService {

    private final ChatMessageRepository chatMessageRepository;

    @Autowired
    public ChatMessageServiceImpl(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    @Override
    public ChatMessage save(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    @Override
    public List<ChatMessage> findByOrderId(Long orderId) {
        return chatMessageRepository.findByOrderId(orderId);
    }
}
