package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.Contact;

public interface ContactService {
    
    public Contact createContact(Contact contact);
    public Contact getContactById(Long contactId);
    public Page<Contact> getAllContacts(Pageable pageable);
    public Contact updateContact(Contact contact);
    public void deleteContact(Long contactId);
}
