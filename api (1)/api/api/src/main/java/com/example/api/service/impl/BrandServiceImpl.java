package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.Brand;
import com.example.api.service.BrandService;
import com.example.api.repository.BrandRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class BrandServiceImpl implements BrandService {

    private BrandRepository brandRepository;

    @Override
    public Brand createBrand(Brand brand) {
        brand.setCreatedAt(new Date());
        return brandRepository.save(brand);
    }

    @Override
    public Brand getBrandById(Long brandId) {
        Optional<Brand> optionalBrand = brandRepository.findById(brandId);
        return optionalBrand.orElse(null);
    }

    @Override
    public Page<Brand> getAllBrands(Pageable pageable) {
        return brandRepository.findAll(pageable);
    }

    @Override
    public Brand updateBrand(Brand brand) {
        Brand existingBrand = brandRepository.findById(brand.getId()).orElse(null);

        if (existingBrand != null) {
            existingBrand.setName(brand.getName());
            existingBrand.setImage(brand.getImage());
            existingBrand.setSortOrder(brand.getSortOrder());
            existingBrand.setStatus(brand.getStatus());
            existingBrand.setCreatedAt(brand.getCreatedAt());
            existingBrand.setUpdatedAt(brand.getUpdatedAt());

            Brand updatedBrand = brandRepository.save(existingBrand);
            return updatedBrand;
        } else {
            return null;
        }
    }

    @Override
    public void deleteBrand(Long brandId) {
        brandRepository.deleteById(brandId);
    }
}
