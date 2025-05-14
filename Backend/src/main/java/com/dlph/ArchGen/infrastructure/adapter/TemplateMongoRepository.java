package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.ArchitectureType;
import com.dlph.ArchGen.domain.model.Template;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface TemplateMongoRepository extends MongoRepository<Template, String> {
    List<Template> findByClerkId(String clerkId);
    List<Template> findByClerkIdIsNull();
    Optional<Template> findFirstByTypeAndEditFalseAndClerkIdIsNull(ArchitectureType type);
}
