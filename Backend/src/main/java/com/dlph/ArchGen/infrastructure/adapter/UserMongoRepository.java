package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserMongoRepository extends MongoRepository<User, String> {
    Optional<User> findByClerkId(String clerkId);
    void deleteByClerkId(String clerkId);
}
