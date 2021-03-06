package com.example.cs564.dao;

import com.example.cs564.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Direct Access Object to users table
 * utilize Spring JPA's built-in functionalities
 */

@Repository
public interface UserRepo extends JpaRepository<UserEntity, Long> {
    public UserEntity findByEmail(String email);
}
