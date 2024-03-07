package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.api.entity.Topic;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TopicRepository extends JpaRepository<Topic, Long> {
    Page<Topic> findAll(Pageable pageable);
}
