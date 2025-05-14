package com.dlph.ArchGen.factory.architectures;

import com.dlph.ArchGen.domain.model.ArchitectureType;
import com.dlph.ArchGen.domain.model.Folder;
import com.dlph.ArchGen.domain.model.ProjectStructure;
import com.dlph.ArchGen.domain.model.Template;
import com.dlph.ArchGen.factory.TemplateFactory;
import com.dlph.ArchGen.factory.ZipGenerate;
import org.springframework.stereotype.Component;

import java.io.File;
import java.util.List;

@Component
public class MVCTemplateFactory implements TemplateFactory {
    @Override
    public ArchitectureType getArchitectureType() {
        return ArchitectureType.MVC;
    }

    @Override
    public Template createTemplate(String name, String clerkId) {
        List<Folder> folders = List.of(
                new Folder("controller", "handles web requests", List.of()),
                new Folder("model", "contains domain models or entities", List.of()),
                new Folder("service", "business logic", List.of()),
                new Folder("repository", "data access layer", List.of()),
                new Folder("view", "template files (optional for web UI)", List.of())
        );
        try {
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, ArchitectureType.MVC, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
