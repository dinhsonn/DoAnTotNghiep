package com.example.api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.TrashBanner;
import com.example.api.service.TrashBannerService;
import com.example.api.repository.TrashBannerRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TrashBannerServiceImpl implements TrashBannerService {

    private final TrashBannerRepository trashBannerRepository;

    @Override
    public TrashBanner createTrashBanner(TrashBanner trashBanner) {
        trashBanner.setCreatedAt(new Date());
        return trashBannerRepository.save(trashBanner);
    }

    @Override
    public TrashBanner getTrashBannerById(Long bannerId) {
        Optional<TrashBanner> optionalTrashBanner = trashBannerRepository.findById(bannerId);
        return optionalTrashBanner.orElse(null);
    }

    @Override
    public Page<TrashBanner> getAllTrashBanners(Pageable pageable) {
        return trashBannerRepository.findAll(pageable);
    }

    @Override
    public TrashBanner updateTrashBanner(TrashBanner trashBanner) {
        TrashBanner existingTrashBanner = trashBannerRepository.findById(trashBanner.getId()).orElse(null);
        if (existingTrashBanner != null) {
            existingTrashBanner.setName(trashBanner.getName());
            existingTrashBanner.setLink(trashBanner.getLink());
            existingTrashBanner.setImage(trashBanner.getImage());
            existingTrashBanner.setSort(trashBanner.getSort());
            existingTrashBanner.setType(trashBanner.getType());
            existingTrashBanner.setStatus(trashBanner.getStatus());
            existingTrashBanner.setUpdatedAt(new Date());
            return trashBannerRepository.save(existingTrashBanner);
        }
        return null;
    }

    @Override
    public void deleteTrashBanner(Long bannerId) {
        trashBannerRepository.deleteById(bannerId);
    }
}
