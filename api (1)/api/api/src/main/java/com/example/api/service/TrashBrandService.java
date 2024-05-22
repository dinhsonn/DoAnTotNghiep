package com.example.api.service;

import com.example.api.entity.TrashBrand;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TrashBrandService {

    TrashBrand createTrashBrand(TrashBrand trashBrand);

    TrashBrand getTrashBrandById(Long trashBrandId);

    Page<TrashBrand> getAllTrashBrands(Pageable pageable);

    TrashBrand updateTrashBrand(TrashBrand trashBrand);

    void deleteTrashBrand(Long trashBrandId);
}
