package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.Product;
import com.example.api.service.ProductService;
import com.example.api.repository.ProductRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {

    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        product.setCreatedAt(new Date());

        return productRepository.save(product);
    }

    @Override
    public Product getProductById(Long productId) {
        Optional<Product> optionalProduct = productRepository.findById(productId);
        return optionalProduct.orElse(null); // Trả về null nếu không tìm thấy
    }

    @Override
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    @Override
    public Product updateProduct(Product product) {
        Product existingProduct = productRepository.findById(product.getId()).orElse(null);
        if (existingProduct != null) {
            existingProduct.setName(product.getName());
            existingProduct.setCategoryId(product.getCategoryId());
            existingProduct.setCategoryOption(product.getCategoryOption());
            existingProduct.setCategoryOptionValue(product.getCategoryOptionValue());
            existingProduct.setBrandId(product.getBrandId());
            existingProduct.setPrice(product.getPrice());
            existingProduct.setQty(product.getQty());
            existingProduct.setDescription(product.getDescription());
            existingProduct.setContent(product.getContent());
            existingProduct.setWarranty(product.getWarranty());
            existingProduct.setSpecifications(product.getSpecifications());
            existingProduct.setStatus(product.getStatus());
            existingProduct.setUpdatedAt(new Date()); // Cập nhật ngày cập nhật mới

            return productRepository.save(existingProduct);
        }
        return null;
    }

    @Override
    public void deleteProduct(Long productId) {
        productRepository.deleteById(productId);
    }
    @Override
    public List<Product> getProductsByIds(List<Long> productIds) {
        return productRepository.findAllById(productIds);
    }
    @Override
    public Product updateProductQty(Long productId, int qty) {
        Optional<Product> productOptional = productRepository.findById(productId);
        if (productOptional.isPresent()) {
            Product product = productOptional.get();
            product.setQty(qty);
            return productRepository.save(product);
        } else {
            return null;
        }
    }


}