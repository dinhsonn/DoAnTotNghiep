package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.ProductSale;
import com.example.api.service.ProductSaleService;
import com.example.api.repository.ProductSaleRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductSaleServiceImpl implements ProductSaleService {

    private ProductSaleRepository productSaleRepository;

    @Override
    public ProductSale createProductSale(ProductSale productSale) {
        productSale.setCreatedAt(new Date());
        return productSaleRepository.save(productSale);
    }

    @Override
    public ProductSale getProductSaleById(Long productSaleId) {
        Optional<ProductSale> optionalProductSale = productSaleRepository.findById(productSaleId);
        return optionalProductSale.orElse(null);
    }

    @Override
    public Page<ProductSale> getAllProductSales(Pageable pageable) {
        return productSaleRepository.findAll(pageable);
    }

    @Override
    public ProductSale updateProductSale(ProductSale productSale) {
        ProductSale existingProductSale = productSaleRepository.findById(productSale.getId()).orElse(null);

        if (existingProductSale != null) {
            existingProductSale.setProductId(productSale.getProductId());
            existingProductSale.setSalePrice(productSale.getSalePrice());
            existingProductSale.setQuantitySold(productSale.getQuantitySold());
            existingProductSale.setDateStart(productSale.getDateStart());
            existingProductSale.setDateEnd(productSale.getDateEnd());
            existingProductSale.setStatus(productSale.getStatus());
            existingProductSale.setCreatedAt(productSale.getCreatedAt());
            existingProductSale.setUpdatedAt(productSale.getUpdatedAt());

            ProductSale updatedProductSale = productSaleRepository.save(existingProductSale);
            return updatedProductSale;
        } else {
            return null;
        }
    }

    @Override
    public void deleteProductSale(Long productSaleId) {
        productSaleRepository.deleteById(productSaleId);
    }
}
