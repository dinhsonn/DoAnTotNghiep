package com.example.api.service;

import com.example.api.entity.TrashUser;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TrashUserService {

    TrashUser createUser(TrashUser trashUser);

    TrashUser getUserById(Long id);

    Page<TrashUser> getAllUsers(Pageable pageable);

    TrashUser updateUser(TrashUser trashUser);

    void deleteUser(Long id);

    public TrashUser findById(Long id);

    
}
