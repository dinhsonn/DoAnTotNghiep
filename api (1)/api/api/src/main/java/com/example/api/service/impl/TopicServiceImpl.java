package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.Topic;
import com.example.api.service.TopicService;
import com.example.api.repository.TopicRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TopicServiceImpl implements TopicService {

    private TopicRepository topicRepository;

    @Override
    public Topic createTopic(Topic topic) {
        topic.setCreatedAt(new Date());
        return topicRepository.save(topic);
    }

    @Override
    public Topic getTopicById(Long topicId) {
        Optional<Topic> optionalTopic = topicRepository.findById(topicId);
        return optionalTopic.orElse(null);
    }

    @Override
    public Page<Topic> getAllTopics(Pageable pageable) {
        return topicRepository.findAll(pageable);
    }

    @Override
    public Topic updateTopic(Topic topic) {
        Topic existingTopic = topicRepository.findById(topic.getId()).orElse(null);
        if (existingTopic != null) {
            existingTopic.setName(topic.getName());
            existingTopic.setSlug(topic.getSlug());
            existingTopic.setParentId(topic.getParentId());
            existingTopic.setSortOrder(topic.getSortOrder());
            existingTopic.setStatus(topic.getStatus());
            existingTopic.setCreatedAt(topic.getCreatedAt());
            existingTopic.setUpdatedAt(topic.getUpdatedAt());
            return topicRepository.save(existingTopic);
        }
        return null;
    }

    @Override
    public void deleteTopic(Long topicId) {
        topicRepository.deleteById(topicId);
    }
}
