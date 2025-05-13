package com.dlph.ArchGen.application;

import com.dlph.ArchGen.domain.model.ArchitectureType;
import com.dlph.ArchGen.domain.model.Template;
import com.dlph.ArchGen.domain.port.TemplateRepository;
import com.dlph.ArchGen.factory.TemplateFactoryProvider;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TemplateService {
    private final TemplateRepository templateRepository;
    private final TemplateFactoryProvider templateFactory;

    public TemplateService(TemplateRepository templateRepository, TemplateFactoryProvider templateFactory) {
        this.templateRepository = templateRepository;
        this.templateFactory = templateFactory;
    }

    public Template save(Template template){
        return templateRepository.save(template);
    }

    public Optional<Template> findById(String id){
        return templateRepository.findById(id);
    }

    public void deleteById(String id){
        templateRepository.deleteById(id);
    }

    public Template generateTemplate(ArchitectureType type, String name, String clerkId) {
        Template template = templateFactory.createTemplate(type, name, clerkId);
        return templateRepository.save(template);
    }

    public List<Template> getAllPublicTemplates() {
        return templateRepository.findByClerkIdIsNull();
    }

    public List<Template> getUserTemplates(String clerkId) {
        return templateRepository.findByClerkId(clerkId);
    }
}
