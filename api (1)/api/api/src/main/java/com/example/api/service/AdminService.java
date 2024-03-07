package com.example.api.service;

import com.example.api.entity.Admin;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AdminService {
    Admin createAdmin(Admin admin);
    Admin getAdminById(Long adminId);
    Page<Admin> getAllAdmins(Pageable pageable);
    Admin updateAdmin(Admin admin);
    void deleteAdmin(Long adminId);
}
