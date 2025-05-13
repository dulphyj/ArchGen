package com.dlph.ArchGen.domain.port;

import com.dlph.ArchGen.domain.model.Template;

import java.util.List;
import java.util.Optional;

public interface TemplateRepository {
    Template save(Template template);
    Optional<Template> findById(String id);
    void deleteById(String id);
    List<Template> findByClerkId(String clerkId);
    List<Template> findByClerkIdIsNull();
}
