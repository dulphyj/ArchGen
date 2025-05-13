package com.dlph.ArchGen.factory;

import com.dlph.ArchGen.domain.model.ArchitectureType;
import com.dlph.ArchGen.domain.model.Folder;
import com.dlph.ArchGen.domain.model.ProjectStructure;
import com.dlph.ArchGen.domain.model.Template;
import org.springframework.stereotype.Component;


import java.io.File;
import java.util.List;

@Component
public class HexagonalTemplateFactory implements TemplateFactory{
    @Override
    public ArchitectureType getArchitectureType() {
        return ArchitectureType.HEXAGONAL;
    }

    @Override
    public Template createTemplate(String name, String clerkId) {
        List<Folder> folders = List.of(
                new Folder("application", "handles use cases", List.of()),
                new Folder("domain", "contains business logic", List.of(
                        new Folder("model", "contains domain models", List.of()),
                        new Folder("port", "contains repository interfaces", List.of())
                )),
                new Folder("infrastructure", "contains implementation of ports", List.of(
                        new Folder("adapter", "contains adapters", List.of()),
                        new Folder("rest", "REST API Controllers", List.of())
                ))
        );
        try{
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, ArchitectureType.HEXAGONAL, new ProjectStructure(folders), clerkId, zipFile.getPath());
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
