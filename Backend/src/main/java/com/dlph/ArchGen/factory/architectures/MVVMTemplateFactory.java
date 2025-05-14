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
public class MVVMTemplateFactory implements TemplateFactory {
    @Override
    public ArchitectureType getArchitectureType() {
        return ArchitectureType.MVVM;
    }

    @Override
    public Template createTemplate(String name, String clerkId) {
        List<Folder> folders = List.of(
                new Folder("model", "data models or business logic", List.of()),
                new Folder("view", "UI templates (HTML, CSS)", List.of(
                        new Folder("components", "UI components used in views", List.of())
                )),
                new Folder("viewmodel", "connects the model to the view (controller logic, services)", List.of(
                        new Folder("services", "business or API logic", List.of()),
                        new Folder("state", "state management or observables", List.of())
                )),
                new Folder("assets", "images, styles, etc.", List.of()),
                new Folder("shared", "shared components, pipes, directives", List.of())
        );
        try {
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, ArchitectureType.MVVM, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
