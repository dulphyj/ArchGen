package com.dlph.ArchGen.factory;

import com.dlph.ArchGen.domain.model.ArchitectureType;
import com.dlph.ArchGen.domain.model.Template;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class TemplateFactoryProvider {
    private final Map<ArchitectureType, TemplateFactory> factoryMap = new HashMap<>();


    @Autowired
    public TemplateFactoryProvider(List<TemplateFactory> factories) {
        for (TemplateFactory factory : factories) {
            factoryMap.put(factory.getArchitectureType(), factory);
        }
    }

    public Template createTemplate(ArchitectureType architectureType, String name, String clerkId) {
        TemplateFactory factory = factoryMap.get(architectureType);
        if(factory == null) {
            throw new IllegalArgumentException("No factory found for architecture type: " + architectureType);
        }
        return factory.createTemplate(name, clerkId);
    }
}
