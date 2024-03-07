package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.api.entity.About;

public interface AboutService {
    About createAbout(About about);

    About getAboutById(Long aboutId);

    Page<About> getAllAbouts(Pageable pageable);

    About updateAbout(About about);

    void deleteAbout(Long aboutId);
}
