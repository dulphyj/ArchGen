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
public class FeatureBasedTemplateFactory implements TemplateFactory {
    public ArchitectureType getArchitectureType() {
        return ArchitectureType.FEATURE_BASED;
    }

    public Template createTemplate(String name, String clerkId) {
        List<Folder> folders = List.of(
                new Folder("src", "source folder", List.of(
                        new Folder("app", "root Angular app folder", List.of(
                                new Folder("core", "core services, guards, interceptors, and singleton providers", List.of()),
                                new Folder("shared", "shared reusable components, directives, and pipes", List.of()),
                                new Folder("features", "feature modules like dashboard, generator, auth, etc.", List.of()),
                                new Folder("pages", "pages like Home, About, Contact with routing", List.of())
                        ))
                )),
                new Folder("assets", "static assets like images and icons", List.of()),
                new Folder("environments", "environment-specific configuration files", List.of())
        );
        try {
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, ArchitectureType.FEATURE_BASED, new ProjectStructure(folders), clerkId, zipFile.getPath());
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
