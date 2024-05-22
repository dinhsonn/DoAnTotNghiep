package com.example.api.service;

import com.example.api.entity.TrashMenu;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TrashMenuService {

    Page<TrashMenu> getByParentId(Integer position, Long parentId, Pageable pageable);

    TrashMenu createTrashMenu(TrashMenu trashMenu);

    TrashMenu getTrashMenuById(Long trashMenuId);

    Page<TrashMenu> getAllTrashMenus(Pageable pageable);

    TrashMenu updateTrashMenu(TrashMenu trashMenu);

    void deleteTrashMenu(Long trashMenuId);
}
