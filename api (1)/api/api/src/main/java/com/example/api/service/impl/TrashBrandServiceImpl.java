package com.example.api.service.impl;

import com.example.api.entity.TrashBrand;
import com.example.api.repository.TrashBrandRepository;
import com.example.api.service.TrashBrandService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TrashBrandServiceImpl implements TrashBrandService {

    private final TrashBrandRepository trashBrandRepository;

    @Override
    public TrashBrand createTrashBrand(TrashBrand trashBrand) {
        return trashBrandRepository.save(trashBrand);
    }

    @Override
    public TrashBrand getTrashBrandById(Long trashBrandId) {
        Optional<TrashBrand> optionalTrashBrand = trashBrandRepository.findById(trashBrandId);
        return optionalTrashBrand.orElse(null);
    }

    @Override
    public Page<TrashBrand> getAllTrashBrands(Pageable pageable) {
        return trashBrandRepository.findAll(pageable);
    }

    @Override
    public TrashBrand updateTrashBrand(TrashBrand trashBrand) {
        TrashBrand existingTrashBrand = trashBrandRepository.findById(trashBrand.getId()).orElse(null);

        if (existingTrashBrand != null) {
            existingTrashBrand.setName(trashBrand.getName());
            existingTrashBrand.setImage(trashBrand.getImage());
            existingTrashBrand.setSortOrder(trashBrand.getSortOrder());
            existingTrashBrand.setStatus(trashBrand.getStatus());
            existingTrashBrand.setCreatedAt(new Date());
            existingTrashBrand.setDeletedAt(new Date());
            existingTrashBrand.setUpdatedAt(new Date());

            return trashBrandRepository.save(existingTrashBrand);
        } else {
            return null;
        }
    }

    @Override
    public void deleteTrashBrand(Long trashBrandId) {
        trashBrandRepository.deleteById(trashBrandId);
    }
}
