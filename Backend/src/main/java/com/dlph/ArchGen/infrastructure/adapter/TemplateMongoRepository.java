package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.Template;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TemplateMongoRepository extends MongoRepository<Template, String> {
    List<Template> findByClerkId(String clerkId);
    List<Template> findByClerkIdIsNull();

}
