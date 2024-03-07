package com.example.api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.Banner;
import com.example.api.service.BannerService;
import com.example.api.repository.BannerRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BannerServiceImpl implements BannerService {

    private final BannerRepository bannerRepository;

    @Override
    public Banner createBanner(Banner banner) {
        banner.setCreatedAt(new Date());
        return bannerRepository.save(banner);
    }

    @Override
    public Banner getBannerById(Long bannerId) {
        Optional<Banner> optionalBanner = bannerRepository.findById(bannerId);
        return optionalBanner.orElse(null);
    }

    @Override
    public Page<Banner> getAllBanners(Pageable pageable) {
        return bannerRepository.findAll(pageable);
    }

    @Override
    public Banner updateBanner(Banner banner) {
        Banner existingBanner = bannerRepository.findById(banner.getId()).orElse(null);
        if (existingBanner != null) {
            existingBanner.setName(banner.getName());
            existingBanner.setLink(banner.getLink());
            existingBanner.setImage(banner.getImage());
            existingBanner.setSort(banner.getSort());
            existingBanner.setType(banner.getType());
            existingBanner.setStatus(banner.getStatus());
            existingBanner.setUpdatedAt(new Date());
            return bannerRepository.save(existingBanner);
        }
        return null;
    }

    @Override
    public void deleteBanner(Long bannerId) {
        bannerRepository.deleteById(bannerId);
    }
}
