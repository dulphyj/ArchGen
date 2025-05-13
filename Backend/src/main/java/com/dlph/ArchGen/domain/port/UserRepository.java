package com.dlph.ArchGen.domain.port;

import com.dlph.ArchGen.domain.model.User;

import java.util.Optional;

public interface UserRepository {
    User save(User user);
    Optional<User> findByClerkId(String clerkId);
    void deleteUserByClerkId(String clerkId);
}
