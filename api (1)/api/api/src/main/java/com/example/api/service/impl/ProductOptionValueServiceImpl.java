package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import com.example.api.entity.ProductOptionValue;
import com.example.api.service.ProductOptionValueService;
import com.example.api.repository.ProductOptionValueRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductOptionValueServiceImpl implements ProductOptionValueService {

    private ProductOptionValueRepository productOptionValueRepository;

    @Override
    public ProductOptionValue createProductOptionValue(ProductOptionValue productOptionValue) {
        productOptionValue.setCreatedAt(new Date());
        return productOptionValueRepository.save(productOptionValue);
    }

    @Override
    public ProductOptionValue getProductOptionValueById(Long productOptionValueId) {
        Optional<ProductOptionValue> optionalProductOptionValue = productOptionValueRepository.findById(productOptionValueId);
        return optionalProductOptionValue.orElse(null);
    }

    @Override
    public Page<ProductOptionValue> getAllProductOptionValues(Pageable pageable) {
        return productOptionValueRepository.findAll(pageable);
    }

    @Override
    public ProductOptionValue updateProductOptionValue(ProductOptionValue productOptionValue) {
        ProductOptionValue existingProductOptionValue = productOptionValueRepository.findById(productOptionValue.getId()).orElse(null);

        if (existingProductOptionValue != null) {
            existingProductOptionValue.setOption(productOptionValue.getOption());
            existingProductOptionValue.setValue(productOptionValue.getValue());
            existingProductOptionValue.setCreatedAt(productOptionValue.getCreatedAt());
            existingProductOptionValue.setUpdatedAt(productOptionValue.getUpdatedAt());

            ProductOptionValue updatedProductOptionValue = productOptionValueRepository.save(existingProductOptionValue);
            return updatedProductOptionValue;
        } else {
            return null;
        }
    }

    @Override
    public void deleteProductOptionValue(Long productOptionValueId) {
        productOptionValueRepository.deleteById(productOptionValueId);
    }

     @Override
    public Page<ProductOptionValue> getOptionValuesByOption(Long option, Pageable pageable) {
        return productOptionValueRepository.findByOptionId(option, pageable);
    }

}
