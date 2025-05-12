package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMongoRepository extends MongoRepository<User, String> {
}
