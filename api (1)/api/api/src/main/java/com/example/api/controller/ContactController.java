package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.api.entity.Contact;
import com.example.api.service.ContactService;

@RestController
@AllArgsConstructor
@RequestMapping("api/contact")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class ContactController {

    private ContactService contactService;

    @PostMapping
    public ResponseEntity<Contact> createContact(@RequestBody Contact contact) {
        Contact savedContact = contactService.createContact(contact);
        return new ResponseEntity<>(savedContact, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable("id") Long contactId) {
        Contact contact = contactService.getContactById(contactId);
        if (contact != null) {
            return new ResponseEntity<>(contact, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Contact>> getAllContacts(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Contact> contacts = contactService.getAllContacts(pageable);
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable("id") Long contactId,
            @RequestBody Contact contact) {
        contact.setId(contactId);
        Contact updatedContact = contactService.updateContact(contact);
        return new ResponseEntity<>(updatedContact, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteContact(@PathVariable("id") Long contactId) {
        contactService.deleteContact(contactId);
        return new ResponseEntity<>("Contact successfully deleted!", HttpStatus.OK);
    }
}
