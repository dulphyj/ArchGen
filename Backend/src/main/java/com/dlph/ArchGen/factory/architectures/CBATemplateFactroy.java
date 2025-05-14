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
public class CBATemplateFactroy implements TemplateFactory {
    @Override
    public ArchitectureType getArchitectureType() {
        return ArchitectureType.CBA;
    }

    @Override
    public Template createTemplate(String name, String clerkId) {
        List<Folder> folders = List.of(
                new Folder("components", "reusable and independent UI components", List.of(
                        new Folder("common", "shared UI components (buttons, cards, etc.)", List.of()),
                        new Folder("layout", "layout components like navbar, footer", List.of())
                )),
                new Folder("pages", "top-level pages with composed components", List.of()),
                new Folder("services", "logic to fetch data or business rules", List.of()),
                new Folder("state", "state management (e.g., Redux, NgRx, Pinia)", List.of()),
                new Folder("assets", "static files like images, fonts", List.of()),
                new Folder("utils", "helper functions", List.of()),
                new Folder("styles", "global styles, SCSS files", List.of())
        );
        try {
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, ArchitectureType.CBA, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
