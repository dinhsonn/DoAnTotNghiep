package com.example.api.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import com.example.api.entity.Admin;
import com.example.api.service.AdminService;
import com.example.api.repository.AdminRepository;

import java.util.Date;
import java.util.Optional;

@Service
@AllArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;

    @Override
    public Admin createAdmin(Admin admin) {
        admin.setCreatedAt(new Date());
        return adminRepository.save(admin);
    }

    @Override
    public Admin getAdminById(Long adminId) {
        Optional<Admin> optionalAdmin = adminRepository.findById(adminId);
        return optionalAdmin.orElse(null);
    }

    @Override
    public Page<Admin> getAllAdmins(Pageable pageable) {
        return adminRepository.findAll(pageable);
    }

    @Override
    public Admin updateAdmin(Admin admin) {
        Admin existingAdmin = adminRepository.findById(admin.getId()).orElse(null);
        if (existingAdmin != null) {
            existingAdmin.setUsername(admin.getUsername());
            existingAdmin.setPassword(admin.getPassword());
            existingAdmin.setRoles(admin.getRoles());
            existingAdmin.setUpdatedAt(new Date());
            return adminRepository.save(existingAdmin);
        }
        return null;
    }

    @Override
    public void deleteAdmin(Long adminId) {
        adminRepository.deleteById(adminId);
    }
}
