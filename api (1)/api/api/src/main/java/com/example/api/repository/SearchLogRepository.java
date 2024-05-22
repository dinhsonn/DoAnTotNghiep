package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.api.entity.SearchLog;

public interface SearchLogRepository extends JpaRepository<SearchLog, Long> {

    @Query("SELECT COUNT(*) FROM SearchLog WHERE query = :keyword")
    Long countByQuery(String keyword);
}
