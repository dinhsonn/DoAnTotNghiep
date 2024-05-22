package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.api.entity.TrashBanner;

@Repository
public interface TrashBannerRepository extends JpaRepository<TrashBanner, Long> {
    // Các phương thức truy vấn đặc biệt có thể được thêm ở đây nếu cần
}
