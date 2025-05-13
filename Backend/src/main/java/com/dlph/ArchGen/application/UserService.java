package com.dlph.ArchGen.application;

import com.dlph.ArchGen.domain.model.User;
import com.dlph.ArchGen.domain.port.UserRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User save(User user){
        try {
            return userRepository.save(user);
        } catch (DataAccessException e){
            throw new RuntimeException("Error saving User" + e.getMessage(), e);
        }
    }

    public Optional<User> findByClerkId(String clerkId){
        return userRepository.findByClerkId(clerkId);
    }

    public void deleteUserByClerkId(String clerkId){
        try {
            userRepository.deleteUserByClerkId(clerkId);
        } catch (EmptyResultDataAccessException e){
            throw new RuntimeException("Error deleting User");
        }
    }
}
