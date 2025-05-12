package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.Template;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateMongoRepository extends MongoRepository<Template, String> {
    List<Template> findByUserId(String userId);
}
