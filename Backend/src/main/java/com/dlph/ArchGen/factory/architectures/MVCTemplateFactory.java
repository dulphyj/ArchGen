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
        String description = "Arquitectura basada en Modelo-Vista-Controlador para aplicaciones (backend). Organiza la aplicación en capas bien definidas, facilitando la separación de responsabilidades entre la lógica de negocio, la interfaz de usuario y el acceso a datos.";
        List<Folder> folders = List.of(
                new Folder("controller", "maneja las solicitudes web", List.of()),
                new Folder("model", "contiene los modelos o entidades del dominio", List.of()),
                new Folder("service", "lógica de negocio", List.of()),
                new Folder("repository", "capa de acceso a datos", List.of()),
                new Folder("view", "archivos de plantilla (opcional para interfaz web)", List.of())
        );
        try {
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, description,ArchitectureType.MVC, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
