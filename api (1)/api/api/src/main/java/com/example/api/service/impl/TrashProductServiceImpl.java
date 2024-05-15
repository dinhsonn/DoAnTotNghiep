package com.example.api.service.impl;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.TrashProduct;
import com.example.api.repository.TrashProductRepository;
import com.example.api.service.TrashProductService;

@Service
public class TrashProductServiceImpl implements TrashProductService {

    @Autowired
    private TrashProductRepository trashProductRepository;

    @Override
    public TrashProduct createProduct(TrashProduct trashproduct) {
        trashproduct.setCreatedAt(new Date());
        return trashProductRepository.save(trashproduct);
    }

    @Override
    public TrashProduct getProductById(Long id) {
        Optional<TrashProduct> optionalTrashProduct = trashProductRepository.findById(id);
        return optionalTrashProduct.orElse(null);
    }

    @Override
    public Page<TrashProduct> getAllProducts(Pageable pageable) {
        return trashProductRepository.findAll(pageable);
    }

    @Override
    public TrashProduct updateProduct(TrashProduct trashproduct) {
        Optional<TrashProduct> optionalExistingTrashProduct = trashProductRepository.findById(trashproduct.getId());
        if (optionalExistingTrashProduct.isPresent()) {
            TrashProduct existingTrashProduct = optionalExistingTrashProduct.get();
            existingTrashProduct.setName(trashproduct.getName());
            existingTrashProduct.setCategoryId(trashproduct.getCategoryId());
            existingTrashProduct.setCategoryOption(trashproduct.getCategoryOption());
            existingTrashProduct.setCategoryOptionValue(trashproduct.getCategoryOptionValue());
            existingTrashProduct.setBrandId(trashproduct.getBrandId());
            existingTrashProduct.setPrice(trashproduct.getPrice());
            existingTrashProduct.setQty(trashproduct.getQty());
            existingTrashProduct.setDescription(trashproduct.getDescription());
            existingTrashProduct.setContent(trashproduct.getContent());
            existingTrashProduct.setWarranty(trashproduct.getWarranty());
            existingTrashProduct.setSpecifications(trashproduct.getSpecifications());
            existingTrashProduct.setStatus(trashproduct.getStatus());
            existingTrashProduct.setUpdatedAt(new Date()); // Update the 'updatedAt' field
    
            return trashProductRepository.save(existingTrashProduct);
        }
        return null;
    }
    

    @Override
    public void deleteProduct(Long id) {
        trashProductRepository.deleteById(id);
    }

}
