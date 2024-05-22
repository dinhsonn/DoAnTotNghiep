package com.example.api.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.TrashContact;
import com.example.api.repository.TrashContactRepository;
import com.example.api.service.TrashContactService;

import java.util.Optional;

@Service
public class TrashContactServiceImpl implements TrashContactService {

    private final TrashContactRepository trashContactRepository;

    @Autowired
    public TrashContactServiceImpl(TrashContactRepository trashContactRepository) {
        this.trashContactRepository = trashContactRepository;
    }

    @Override
    public TrashContact createTrashContact(TrashContact trashContact) {
        return trashContactRepository.save(trashContact);
    }

    @Override
    public TrashContact getTrashContactById(Long id) {
        Optional<TrashContact> optionalTrashContact = trashContactRepository.findById(id);
        return optionalTrashContact.orElse(null);
    }

    @Override
    public Page<TrashContact> getAllTrashContacts(Pageable pageable) {
        return trashContactRepository.findAll(pageable);
    }

    @Override
    public TrashContact updateTrashContact(TrashContact trashContact) {
        TrashContact existingTrashContact = trashContactRepository.findById(trashContact.getId()).orElse(null);

        if (existingTrashContact != null) {
            existingTrashContact.setName(trashContact.getName());
            existingTrashContact.setEmail(trashContact.getEmail());
            existingTrashContact.setContent(trashContact.getContent());
            existingTrashContact.setPhone(trashContact.getPhone());
            existingTrashContact.setStatus(trashContact.getStatus());
            existingTrashContact.setCreatedAt(trashContact.getCreatedAt());
            existingTrashContact.setUpdatedAt(trashContact.getUpdatedAt());

            TrashContact updatedTrashContact = trashContactRepository.save(existingTrashContact);
            return updatedTrashContact;
        } else {
            return null;
        }
    }

    @Override
    public void deleteTrashContact(Long id) {
        trashContactRepository.deleteById(id);
    }
}
