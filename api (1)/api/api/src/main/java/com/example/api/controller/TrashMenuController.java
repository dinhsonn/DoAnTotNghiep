package com.example.api.controller;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.api.entity.TrashMenu;
import com.example.api.service.TrashMenuService;

import java.util.Date;

@RestController
@AllArgsConstructor
@RequestMapping("api/trash-menu")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")
public class TrashMenuController {

    private TrashMenuService trashMenuService;

    @GetMapping("{position}/{parent_id}")
    public ResponseEntity<Page<TrashMenu>> getByParentId(
            @PathVariable("position") Integer position,
            @PathVariable("parent_id") Long parentId,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TrashMenu> menus = trashMenuService.getByParentId(position, parentId, pageable);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<TrashMenu> createTrashMenu(@RequestBody TrashMenu trashMenu) {
        trashMenu.setCreatedAt(new Date()); // Set createdAt timestamp
        TrashMenu savedTrashMenu = trashMenuService.createTrashMenu(trashMenu);
        return new ResponseEntity<>(savedTrashMenu, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TrashMenu> getTrashMenuById(@PathVariable("id") Long trashMenuId) {
        TrashMenu trashMenu = trashMenuService.getTrashMenuById(trashMenuId);
        if (trashMenu != null) {
            return new ResponseEntity<>(trashMenu, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<TrashMenu>> getAllTrashMenus(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<TrashMenu> trashMenus = trashMenuService.getAllTrashMenus(pageable);
        return new ResponseEntity<>(trashMenus, HttpStatus.OK);
    }

    @PutMapping("{id}")
    public ResponseEntity<TrashMenu> updateTrashMenu(@PathVariable("id") Long trashMenuId,
                                                     @RequestBody TrashMenu trashMenu) {
        trashMenu.setId(trashMenuId);
        TrashMenu updatedTrashMenu = trashMenuService.updateTrashMenu(trashMenu);
        return new ResponseEntity<>(updatedTrashMenu, HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTrashMenu(@PathVariable("id") Long trashMenuId) {
        trashMenuService.deleteTrashMenu(trashMenuId);
        return new ResponseEntity<>("TrashMenu successfully deleted!", HttpStatus.OK);
    }
}
