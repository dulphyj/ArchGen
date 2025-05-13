package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.Template;
import com.dlph.ArchGen.domain.port.TemplateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class TemplateRepositoryImp implements TemplateRepository {
    private final TemplateMongoRepository templateMongoRepository;

    public TemplateRepositoryImp(TemplateMongoRepository templateMongoRepository) {
        this.templateMongoRepository = templateMongoRepository;
    }

    @Override
    public Template save(Template template) {
        return templateMongoRepository.save(template);
    }

    @Override
    public Optional<Template> findById(String id) {
        return templateMongoRepository.findById(id);
    }

    @Override
    public void deleteById(String id) {
        templateMongoRepository.deleteById(id);
    }

    @Override
    public List<Template> findByClerkId(String clerkId) {
        return templateMongoRepository.findByClerkId(clerkId);
    }

    @Override
    public List<Template> findByClerkIdIsNull() {
        return templateMongoRepository.findByClerkIdIsNull();
    }
}
