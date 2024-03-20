package com.novametha.api_personalchef.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.novametha.api_personalchef.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}