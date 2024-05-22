package com.example.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.api.entity.SearchLog;
import com.example.api.repository.SearchLogRepository;
import com.example.api.service.SearchLogService;

import java.util.Map;

@RestController
@RequestMapping("api/search-log")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class SearchLogController {

    @Autowired
    private SearchLogRepository searchLogRepository;

    @Autowired
    private SearchLogService searchLogService;

    @PostMapping
    public void logSearchQuery(@RequestBody SearchLog searchLog) {
        searchLogRepository.save(searchLog);
    }

    @GetMapping
    public Map<String, Integer> countSearchKeywords() {
        return searchLogService.countSearchKeywords();
    }
}
