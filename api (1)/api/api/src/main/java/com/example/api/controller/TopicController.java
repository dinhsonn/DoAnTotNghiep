package com.example.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.Topic; 
import com.example.api.service.TopicService; 
@RestController
@AllArgsConstructor
@RequestMapping("api/topics") 
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")

public class TopicController {

    private TopicService topicService;  

    @PostMapping
    public ResponseEntity<Topic> createTopic(@RequestBody Topic topic) { 
        Topic savedTopic = topicService.createTopic(topic);  
        return new ResponseEntity<>(savedTopic, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Page<Topic>> getAllTopics(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Topic> topics = topicService.getAllTopics(pageable);  
        return new ResponseEntity<>(topics, HttpStatus.OK);
    }
     @GetMapping("{id}")
    public ResponseEntity<Topic> getTopicById(@PathVariable("id") Long topicId) {
        Topic topic = topicService.getTopicById(topicId);
        if (topic != null) {
            return new ResponseEntity<>(topic, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<Topic> updateTopic(@PathVariable("id") Long topicId,
            @RequestBody Topic topic) { 
        Topic updatedTopic = topicService.updateTopic(topic);  
        return new ResponseEntity<>(updatedTopic, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTopic(@PathVariable("id") Long topicId) {  
        topicService.deleteTopic(topicId);  
        return new ResponseEntity<>("Topic successfully deleted!", HttpStatus.OK);
    }
}
