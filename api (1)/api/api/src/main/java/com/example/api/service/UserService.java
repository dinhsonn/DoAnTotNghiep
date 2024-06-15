package com.example.api.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.example.api.entity.User;

public interface UserService {

    public User createUser(User user);

    public User getUserById(Long userId);

    public Page<User> getAllUsers(Pageable pageable);

    public User updateUser(User user);

    public void deleteUser(Long userId);

    public User findById(Long id);

    public boolean verifyPassword(Long userId, String oldPassword);

    public User updatePassword(Long userId, String newPassword);
}
