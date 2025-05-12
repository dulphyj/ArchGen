package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.User;
import com.dlph.ArchGen.domain.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
@AllArgsConstructor
public class UserRepositoryImp implements UserRepository {
    private final UserMongoRepository userMongoRepository;


    @Override
    public User save(User user) {
        return userMongoRepository.save(user);
    }

    @Override
    public Optional<User> findById(String id) {
        return userMongoRepository.findById(id);
    }

    @Override
    public void deleteUser(String id) {
        userMongoRepository.deleteById(id);
    }
}
