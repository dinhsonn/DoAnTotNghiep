package com.example.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.api.entity.TrashContact;

public interface TrashContactRepository extends JpaRepository<TrashContact, Long> {
}
