package com.example.api.controller;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.api.entity.Menu;
import com.example.api.service.MenuService;

@RestController
@AllArgsConstructor
@RequestMapping("api/menu")
@CrossOrigin(origins = "*", exposedHeaders = "Content-Range")

public class MenuController {

    private MenuService menuService;
    @GetMapping("{position}/{parent_id}")
    public ResponseEntity<Page<Menu>> getByParentId(
            @PathVariable("position") Integer position,
            @PathVariable("parent_id") Menu parent,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Menu> menus = menuService.getByParentId(position, parent, pageable);
        return new ResponseEntity<>(menus, HttpStatus.OK);
    }
 
    @PostMapping
    public ResponseEntity<Menu> createMenu(@RequestBody Menu menu) {
        Menu savedMenu = menuService.createMenu(menu);
  
        return new ResponseEntity<>(savedMenu, HttpStatus.CREATED);
    }


    @GetMapping("{id}")
    public ResponseEntity<Menu> getMenuById(@PathVariable("id") Long menuId) {
        Menu menu = menuService.getMenuById(menuId);
        if (menu != null) {
            return new ResponseEntity<>(menu, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<Menu>> getAllMenus(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "100") int size) {
     
        Pageable pageable = PageRequest.of(page, size);
        Page<Menu> Menus = menuService.getAllMenus(pageable);
        return new ResponseEntity<>(Menus, HttpStatus.OK);
    }

  
    @PutMapping("{id}")

    public ResponseEntity<Menu> updateMenu(@PathVariable("id") Long menuId,
            @RequestBody Menu Menu) {
        Menu.setId(menuId);
        
        Menu updatedMenu = menuService.updateMenu(Menu);
        return new ResponseEntity<>(updatedMenu, HttpStatus.OK);
    }

  
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteMenu(@PathVariable("id") Long menuId) {
        menuService.deleteMenu(menuId);
        return new ResponseEntity<>("Menu successfully deleted!", HttpStatus.OK);
    }
}
