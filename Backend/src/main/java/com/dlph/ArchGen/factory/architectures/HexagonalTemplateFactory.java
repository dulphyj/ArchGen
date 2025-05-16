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
public class HexagonalTemplateFactory implements TemplateFactory {
    @Override
    public ArchitectureType getArchitectureType() {
        return ArchitectureType.HEXAGONAL;
    }

    @Override
    public Template createTemplate(String name, String clerkId) {
        String description = "Arquitectura hexagonal (backend) que separa la lógica de negocio, los casos de uso y las implementaciones externas mediante puertos y adaptadores. Ideal para proyectos con enfoque en mantenibilidad, pruebas y escalabilidad.";
        List<Folder> folders = List.of(
                new Folder("application", "maneja los casos de uso", List.of()),
                new Folder("domain", "contiene la lógica de negocio", List.of(
                        new Folder("model", "contiene los modelos del dominio", List.of()),
                        new Folder("port", "contiene las interfaces de repositorio (puertos)", List.of())
                )),
                new Folder("infrastructure", "contiene la implementación de los puertos", List.of(
                        new Folder("adapter", "contiene los adaptadores", List.of()),
                        new Folder("rest", "controladores de la API REST", List.of())
                ))
        );

        try{
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, description,ArchitectureType.HEXAGONAL, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
}
