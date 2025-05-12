package com.dlph.ArchGen.domain.repository;

import com.dlph.ArchGen.domain.model.Template;

import java.util.List;
import java.util.Optional;

public interface TemplateRepository {
    Template save(Template template);
    Optional<Template> findById(String id);
    List<Template> findByUserId(String id);
    void deleteById(String id);
}
