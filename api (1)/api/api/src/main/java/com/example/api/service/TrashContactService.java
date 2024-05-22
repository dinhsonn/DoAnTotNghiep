package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.example.api.entity.TrashContact;

public interface TrashContactService {
    TrashContact createTrashContact(TrashContact trashContact);
    TrashContact getTrashContactById(Long id);
    Page<TrashContact> getAllTrashContacts(Pageable pageable);
    TrashContact updateTrashContact(TrashContact trashContact);
    void deleteTrashContact(Long id);
}
