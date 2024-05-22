package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.api.entity.TrashBanner;

public interface TrashBannerService {
    
    TrashBanner createTrashBanner(TrashBanner trashBanner);

    TrashBanner getTrashBannerById(Long bannerId);

    Page<TrashBanner> getAllTrashBanners(Pageable pageable);

    TrashBanner updateTrashBanner(TrashBanner trashBanner);

    void deleteTrashBanner(Long bannerId);
}
