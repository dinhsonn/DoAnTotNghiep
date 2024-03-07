package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.Contact;
import com.example.api.service.ContactService;
import com.example.api.repository.ContactRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ContactServiceImpl implements ContactService {

    private ContactRepository contactRepository;

    @Override
    public Contact createContact(Contact contact) {
        contact.setCreatedAt(new Date());
        return contactRepository.save(contact);
    }

    @Override
    public Contact getContactById(Long contactId) {
        Optional<Contact> optionalContact = contactRepository.findById(contactId);
        return optionalContact.orElse(null);
    }

    @Override
    public Page<Contact> getAllContacts(Pageable pageable) {
        return contactRepository.findAll(pageable);
    }

    @Override
    public Contact updateContact(Contact contact) {
        Contact existingContact = contactRepository.findById(contact.getId()).orElse(null);

        if (existingContact != null) {
            existingContact.setUserId(contact.getUserId());
            existingContact.setTitle(contact.getTitle());
            existingContact.setContent(contact.getContent());
            existingContact.setStatus(contact.getStatus());
            existingContact.setCreatedAt(contact.getCreatedAt());
            existingContact.setUpdatedAt(contact.getUpdatedAt());

            Contact updatedContact = contactRepository.save(existingContact);
            return updatedContact;
        } else {
            return null;
        }
    }

    @Override
    public void deleteContact(Long contactId) {
        contactRepository.deleteById(contactId);
    }
}
