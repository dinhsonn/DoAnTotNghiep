package com.example.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.api.entity.SearchLog;
import com.example.api.repository.SearchLogRepository;
import com.example.api.service.SearchLogService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SearchLogServiceImpl implements SearchLogService {

    @Autowired
    private SearchLogRepository searchLogRepository;

    @Override
    public Map<String, Integer> countSearchKeywords() {
        List<SearchLog> searchLogs = searchLogRepository.findAll();
        Map<String, Integer> keywordCountMap = new HashMap<>();

        for (SearchLog log : searchLogs) {
            String query = log.getQuery().toLowerCase(); // Chuyển đổi truy vấn thành chữ thường để loại bỏ sự phân biệt chữ hoa/chữ thường
            keywordCountMap.put(query, keywordCountMap.getOrDefault(query, 0) + 1);
        }

        return keywordCountMap;
    }
}
