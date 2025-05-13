package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.User;
import com.dlph.ArchGen.domain.port.UserRepository;
import org.springframework.stereotype.Repository;


import java.util.Optional;

@Repository
public class UserRepositoryImp implements UserRepository {
    private final UserMongoRepository userMongoRepository;

    public UserRepositoryImp(UserMongoRepository userMongoRepository) {
        this.userMongoRepository = userMongoRepository;
    }

    @Override
    public User save(User user) {
        return userMongoRepository.save(user);
    }

    @Override
    public Optional<User> findByClerkId(String clerkId) {
        return userMongoRepository.findByClerkId(clerkId);
    }

    @Override
    public void deleteUserByClerkId(String clerkId) {
        userMongoRepository.findByClerkId(clerkId);
    }
}
