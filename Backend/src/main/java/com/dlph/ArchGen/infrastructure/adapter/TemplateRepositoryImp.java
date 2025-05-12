package com.dlph.ArchGen.infrastructure.adapter;

import com.dlph.ArchGen.domain.model.Template;
import com.dlph.ArchGen.domain.repository.TemplateRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
@AllArgsConstructor
public class TemplateRepositoryImp implements TemplateRepository {
    private final TemplateMongoRepository templateMongoRepository;

    @Override
    public Template save(Template template) {
        return templateMongoRepository.save(template);
    }

    @Override
    public Optional<Template> findById(String id) {
        return templateMongoRepository.findById(id);
    }

    @Override
    public List<Template> findByUserId(String id) {
        return templateMongoRepository.findByUserId(id);
    }

    @Override
    public void deleteById(String id) {
        templateMongoRepository.deleteById(id);
    }
}
