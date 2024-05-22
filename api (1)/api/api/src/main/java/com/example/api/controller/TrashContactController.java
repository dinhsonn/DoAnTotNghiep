package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.api.entity.TrashContact;
import com.example.api.service.TrashContactService;

@RestController
@AllArgsConstructor
@RequestMapping("api/trashcontact")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class TrashContactController {

    private TrashContactService trashContactService;

    @PostMapping
    public ResponseEntity<TrashContact> createTrashContact(@RequestBody TrashContact trashContact) {
        TrashContact savedTrashContact = trashContactService.createTrashContact(trashContact);
        return new ResponseEntity<>(savedTrashContact, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TrashContact> getTrashContactById(@PathVariable("id") Long trashContactId) {
        TrashContact trashContact = trashContactService.getTrashContactById(trashContactId);
        if (trashContact != null) {
            return new ResponseEntity<>(trashContact, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<TrashContact>> getAllTrashContacts(
        @RequestParam(name = "page", defaultValue = "0") int page,
        @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TrashContact> trashContacts = trashContactService.getAllTrashContacts(pageable);
        return new ResponseEntity<>(trashContacts, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<TrashContact> updateTrashContact(@PathVariable("id") Long trashContactId,
            @RequestBody TrashContact trashContact) {
        trashContact.setId(trashContactId);
        TrashContact updatedTrashContact = trashContactService.updateTrashContact(trashContact);
        return new ResponseEntity<>(updatedTrashContact, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTrashContact(@PathVariable("id") Long trashContactId) {
        trashContactService.deleteTrashContact(trashContactId);
        return new ResponseEntity<>("TrashContact successfully deleted!", HttpStatus.OK);
    }
}
