package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.Topic;

public interface TopicService {
    Topic createTopic(Topic topic);

    Topic getTopicById(Long topicId);

    Page<Topic> getAllTopics(Pageable pageable);

    Topic updateTopic(Topic topic);

    void deleteTopic(Long topicId);
    
}
