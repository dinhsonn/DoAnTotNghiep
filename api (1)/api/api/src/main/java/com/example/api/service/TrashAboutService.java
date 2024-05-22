package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.api.entity.TrashAbout;

public interface TrashAboutService {
    TrashAbout createTrashAbout(TrashAbout trashAbout);

    TrashAbout getTrashAboutById(Long trashAboutId);

    Page<TrashAbout> getAllTrashAbouts(Pageable pageable);

    TrashAbout updateTrashAbout(TrashAbout trashAbout);

    void deleteTrashAbout(Long trashAboutId);
}
