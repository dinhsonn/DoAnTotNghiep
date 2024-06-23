package com.example.api.repository;

import com.example.api.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByOrderId(Long orderId);

    // Các phương thức khác nếu cần thiết
}
