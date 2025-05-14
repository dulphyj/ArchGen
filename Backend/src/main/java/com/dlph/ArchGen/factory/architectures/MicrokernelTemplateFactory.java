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
public class MicrokernelTemplateFactory implements TemplateFactory {
    @Override
    public ArchitectureType getArchitectureType() {
        return ArchitectureType.MICROKERNEL;
    }

    @Override
    public Template createTemplate(String name, String clerkId) {
        List<Folder> folders = List.of(
                new Folder("core", "application core logic", List.of(
                        new Folder("domain", "domain models and logic", List.of()),
                        new Folder("service", "core services", List.of())
                )),
                new Folder("plugins", "plugin modules", List.of(
                        new Folder("analytics-plugin", "example plugin", List.of()),
                        new Folder("reporting-plugin", "another plugin", List.of())
                )),
                new Folder("infrastructure", "supporting infrastructure", List.of(
                        new Folder("rest", "REST API Controllers", List.of()),
                        new Folder("persistence", "data access implementation", List.of())
                ))
        );
        try{
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, ArchitectureType.MICROKERNEL, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
