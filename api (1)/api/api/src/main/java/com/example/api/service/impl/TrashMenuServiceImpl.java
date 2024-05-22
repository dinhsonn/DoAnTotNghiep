package com.example.api.service.impl;

import com.example.api.entity.TrashMenu;
import com.example.api.repository.TrashMenuRepository;
import com.example.api.service.TrashMenuService;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class TrashMenuServiceImpl implements TrashMenuService {

    private final TrashMenuRepository trashMenuRepository;

    @Override
    public Page<TrashMenu> getByParentId(Integer position, Long parentId, Pageable pageable) {
        return trashMenuRepository.findByPositionAndParentId(position, parentId, pageable);
    }

    @Override
    public TrashMenu createTrashMenu(TrashMenu trashMenu) {
        return trashMenuRepository.save(trashMenu);
    }

    @Override
    public TrashMenu getTrashMenuById(Long trashMenuId) {
        Optional<TrashMenu> optionalTrashMenu = trashMenuRepository.findById(trashMenuId);
        return optionalTrashMenu.orElse(null);
    }

    @Override
    public Page<TrashMenu> getAllTrashMenus(Pageable pageable) {
        return trashMenuRepository.findAll(pageable);
    }

    @Override
    public TrashMenu updateTrashMenu(TrashMenu trashMenu) {
        TrashMenu existingMenu = trashMenuRepository.findById(trashMenu.getId()).get();
        existingMenu.setName(trashMenu.getName());
        existingMenu.setLink(trashMenu.getLink());
        existingMenu.setParentId(trashMenu.getParentId());
        existingMenu.setType(trashMenu.getType());
        existingMenu.setCreatedAt(trashMenu.getCreatedAt());
        existingMenu.setUpdatedAt(trashMenu.getUpdatedAt());
        existingMenu.setCreatedBy(trashMenu.getCreatedBy());
        existingMenu.setStatus(trashMenu.getStatus());
        existingMenu.setPosition(trashMenu.getPosition());
        TrashMenu updatedMenu = trashMenuRepository.save(existingMenu);
        return updatedMenu;
    }

    @Override
    public void deleteTrashMenu(Long trashMenuId) {
        trashMenuRepository.deleteById(trashMenuId);
    }
}