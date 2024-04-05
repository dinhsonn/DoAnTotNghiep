package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.Product;
import com.example.api.entity.ProductOption;
import com.example.api.service.ProductOptionService;
import com.example.api.repository.ProductOptionRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductOptionServiceImpl implements ProductOptionService {

    private ProductOptionRepository productOptionRepository;

    @Override
    public ProductOption createProductOption(ProductOption productOption) {
        productOption.setCreatedAt(new Date());
        return productOptionRepository.save(productOption);
    }

    @Override
    public ProductOption getProductOptionById(Long productOptionId) {
        Optional<ProductOption> optionalProductOption = productOptionRepository.findById(productOptionId);
        return optionalProductOption.orElse(null);
    }

    @Override
    public Page<ProductOption> getAllProductOptions(Pageable pageable) {
        return productOptionRepository.findAll(pageable);
    }

    @Override
    public ProductOption updateProductOption(ProductOption productOption) {
        ProductOption existingProductOption = productOptionRepository.findById(productOption.getId()).orElse(null);
        if (existingProductOption != null) {
            existingProductOption.setProductId(productOption.getProductId());
            existingProductOption.setName(productOption.getName());
            existingProductOption.setStatus(productOption.getStatus());
            existingProductOption.setCreatedAt(productOption.getCreatedAt());
            existingProductOption.setUpdatedAt(new Date());
            return productOptionRepository.save(existingProductOption);
        }
        return null;
    }

    @Override
    public void deleteProductOption(Long productOptionId) {
        productOptionRepository.deleteById(productOptionId);
    }

    @Override
    public Page<ProductOption> getProductOptionsByProductId(Product productId, Pageable pageable) {
        return productOptionRepository.findByProductId(productId, pageable);
    }
}
