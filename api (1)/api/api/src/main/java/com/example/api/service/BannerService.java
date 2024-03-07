package com.example.api.service;

import com.example.api.entity.Banner;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BannerService {

    Banner createBanner(Banner banner);

    Banner getBannerById(Long bannerId);

    Page<Banner> getAllBanners(Pageable pageable);

    Banner updateBanner(Banner banner);

    void deleteBanner(Long bannerId);
}
