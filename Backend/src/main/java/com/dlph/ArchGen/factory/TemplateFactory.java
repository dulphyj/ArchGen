package com.dlph.ArchGen.factory;

import com.dlph.ArchGen.domain.model.ArchitectureType;
import com.dlph.ArchGen.domain.model.Template;

public interface TemplateFactory {
    ArchitectureType getArchitectureType();
    Template createTemplate(String name, String clerkId);
}
