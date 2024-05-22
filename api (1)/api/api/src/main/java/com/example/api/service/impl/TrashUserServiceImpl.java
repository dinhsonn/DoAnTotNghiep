package com.example.api.service.impl;

import java.util.Date;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.example.api.entity.TrashUser;
import com.example.api.repository.TrashUserRepository;
import com.example.api.service.TrashUserService;

@Service
public class TrashUserServiceImpl implements TrashUserService {
    
    private final TrashUserRepository trashUserRepository;

    public TrashUserServiceImpl(TrashUserRepository trashUserRepository) {
        this.trashUserRepository = trashUserRepository;
    }

    @Override
    public TrashUser createUser(TrashUser trashUser) {
        trashUser.setCreatedAt(new Date());
        return trashUserRepository.save(trashUser);
    }

    @Override
    public TrashUser getUserById(Long userId) {
        Optional<TrashUser> optionalUser = trashUserRepository.findById(userId);
        return optionalUser.orElse(null);
    }

    @Override
    public Page<TrashUser> getAllUsers(Pageable pageable) {
        return trashUserRepository.findAll(pageable);
    }

    @Override
    public TrashUser updateUser(TrashUser trashUser) {
        TrashUser existingUser = trashUserRepository.findById(trashUser.getId()).orElse(null);
        if (existingUser != null) {
            existingUser.setName(trashUser.getName());
            existingUser.setEmail(trashUser.getEmail());
            existingUser.setPhone(trashUser.getPhone());
            existingUser.setSex(trashUser.getSex());
            existingUser.setBirthday(trashUser.getBirthday());
            existingUser.setUsername(trashUser.getUsername());
            existingUser.setPassword(trashUser.getPassword());
            existingUser.setAddress(trashUser.getAddress());
            existingUser.setUpdatedAt(new Date()); // Updated timestamp
            existingUser.setRoles(trashUser.getRoles());
            existingUser.setStatus(trashUser.getStatus());
            TrashUser updatedUser = trashUserRepository.save(existingUser);      
            return updatedUser;
        }
        return null;
    }

    @Override
    public void deleteUser(Long userId) {
        trashUserRepository.deleteById(userId);
    }

    @Override
    public TrashUser findById(Long id) {
        return trashUserRepository.findById(id).orElse(null);
    }
}
