package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.TrashAbout;
import com.example.api.service.TrashAboutService;
import com.example.api.repository.TrashAboutRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TrashAboutServiceImpl implements TrashAboutService {

    private final TrashAboutRepository trashAboutRepository;

    @Override
    public TrashAbout createTrashAbout(TrashAbout trashAbout) {
        trashAbout.setCreatedAt(new Date());
        return trashAboutRepository.save(trashAbout);
    }

    @Override
    public TrashAbout getTrashAboutById(Long trashAboutId) {
        Optional<TrashAbout> optionalTrashAbout = trashAboutRepository.findById(trashAboutId);
        return optionalTrashAbout.orElse(null);
    }

    @Override
    public Page<TrashAbout> getAllTrashAbouts(Pageable pageable) {
        return trashAboutRepository.findAll(pageable);
    }

    @Override
    public TrashAbout updateTrashAbout(TrashAbout trashAbout) {
        TrashAbout existingTrashAbout = trashAboutRepository.findById(trashAbout.getId()).orElse(null);
        if (existingTrashAbout != null) {
            existingTrashAbout.setTitle(trashAbout.getTitle());
            existingTrashAbout.setContent(trashAbout.getContent());
            existingTrashAbout.setStatus(trashAbout.getStatus());
            existingTrashAbout.setDeletedAt(new Date());
            existingTrashAbout.setUpdatedAt(new Date());
            return trashAboutRepository.save(existingTrashAbout);
        }
        return null;
    }

    @Override
    public void deleteTrashAbout(Long trashAboutId) {
        trashAboutRepository.deleteById(trashAboutId);
    }
}
