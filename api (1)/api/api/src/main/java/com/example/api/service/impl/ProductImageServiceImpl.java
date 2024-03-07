package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.ProductImage;
import com.example.api.service.ProductImageService;
import com.example.api.repository.ProductImageRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductImageServiceImpl implements ProductImageService {

    private ProductImageRepository productImageRepository;

    @Override
    public ProductImage createProductImage(ProductImage productImage) {
        productImage.setCreatedAt(new Date());
        return productImageRepository.save(productImage);
    }

    @Override
    public ProductImage getProductImageById(Long productImageId) {
        Optional<ProductImage> optionalProductImage = productImageRepository.findById(productImageId);
        return optionalProductImage.orElse(null);
    }

    @Override
    public Page<ProductImage> getAllProductImages(Pageable pageable) {
        return productImageRepository.findAll(pageable);
    }

    @Override
    public ProductImage updateProductImage(ProductImage productImage) {
        ProductImage existingProductImage = productImageRepository.findById(productImage.getId()).orElse(null);
        if (existingProductImage != null) {
            existingProductImage.setProductId(productImage.getProductId());
            existingProductImage.setName(productImage.getName());
            existingProductImage.setLink(productImage.getLink());
            existingProductImage.setImage(productImage.getImage());
            existingProductImage.setSortOrder(productImage.getSortOrder());
            existingProductImage.setStatus(productImage.getStatus());
            existingProductImage.setCreatedAt(productImage.getCreatedAt());
            existingProductImage.setUpdatedAt(new Date());
            return productImageRepository.save(existingProductImage);
        }
        return null;
    }

    @Override
    public void deleteProductImage(Long productImageId) {
        productImageRepository.deleteById(productImageId);
    }

    @Override
    public Page<ProductImage> getProductImage(Long productId, Pageable pageable) {
        return productImageRepository.findByProductId_Id(productId, pageable);
    }
}
