package com.dlph.ArchGen.domain.repository;

import com.dlph.ArchGen.domain.model.User;

import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findById(String id);
    void deleteUser(String id);
}
