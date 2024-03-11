package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.Menu;

public interface MenuService {
    
    public Page<Menu> getByParentId(Integer position, Menu parent, Pageable pageable);
    public Menu createMenu(Menu menu);
    public Menu getMenuById(Long menuId);
    public Page<Menu> getAllMenus(Pageable pageable);
    public Menu updateMenu(Menu menu);
    public void deleteMenu(Long menuId);

}
