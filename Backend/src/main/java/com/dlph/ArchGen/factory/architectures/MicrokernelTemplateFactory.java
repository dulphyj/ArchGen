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
        String description = "Arquitectura basada en plugins (backend), diseñada para sistemas extensibles y modulares donde las funcionalidades pueden agregarse como módulos independientes. Ideal para proyectos que requieren escalabilidad y desacoplamiento funcional.";
        List<Folder> folders = List.of(
                new Folder("core", "lógica central de la aplicación", List.of(
                        new Folder("domain", "modelos de dominio y lógica", List.of()),
                        new Folder("service", "servicios centrales", List.of())
                )),
                new Folder("plugins", "módulos plugin", List.of(
                        new Folder("analytics-plugin", "plugin de ejemplo para analíticas", List.of()),
                        new Folder("reporting-plugin", "otro plugin para reportes", List.of())
                )),
                new Folder("infrastructure", "infraestructura de soporte", List.of(
                        new Folder("rest", "controladores de la API REST", List.of()),
                        new Folder("persistence", "implementación del acceso a datos", List.of())
                ))
        );

        try{
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, description,ArchitectureType.MICROKERNEL, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
