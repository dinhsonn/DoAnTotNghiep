package com.example.api.service.impl;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.Menu;
import com.example.api.service.MenuService;
import com.example.api.repository.MenuRepository;

import java.util.Date;
import java.util.Optional;



@Service
@AllArgsConstructor
public class MenuServiceImpl implements MenuService {

    private MenuRepository menuRepository;

    @Override
    public Menu createMenu(Menu menu) {
                menu.setCreatedAt(new Date());
        return menuRepository.save(menu);
    }

    @Override
    public Menu getMenuById(Long menuId) {
        Optional<Menu> optionalMenu = menuRepository.findById(menuId);
        return optionalMenu.get();
    }

    @Override
    public Page<Menu> getAllMenus(Pageable pageable) {
        return menuRepository.findAll(pageable);
    }

    @Override
    public Menu updateMenu(Menu menu) {
        Menu existingMenu = menuRepository.findById(menu.getId()).get();
        existingMenu.setName(menu.getName());
        existingMenu.setLink(menu.getLink());
        existingMenu.setParentId(menu.getParentId());
        existingMenu.setType(menu.getType());
        existingMenu.setCreatedAt(menu.getCreatedAt());
        existingMenu.setUpdatedAt(menu.getUpdatedAt());
        existingMenu.setCreatedBy(menu.getCreatedBy());
        existingMenu.setStatus(menu.getStatus());
        existingMenu.setPosition(menu.getPosition());
        Menu updatedMenu = menuRepository.save(existingMenu);
        return updatedMenu;
    }

    @Override
    public void deleteMenu(Long menuId) {
        menuRepository.deleteById(menuId);
    }
    @Override
    public Page<Menu> getByParentId(Integer position, Menu parent, Pageable pageable) {
        if (position == null || parent == null) {
            return Page.empty(); 
        }
        return menuRepository.findByPositionAndParentId(position, parent, pageable);
    }
    
}
