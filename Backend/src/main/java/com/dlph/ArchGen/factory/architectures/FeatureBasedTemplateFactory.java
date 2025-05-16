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
        String description = "Arquitectura modular para aplicaciones Angular (frontend), ideal para construir aplicaciones escalables, organizadas por módulos y con una separación clara de responsabilidades.";

        List<Folder> folders = List.of(
                new Folder("src", "carpeta fuente", List.of(
                        new Folder("app", "carpeta principal de la aplicación Angular", List.of(
                                new Folder("core", "servicios centrales, guards, interceptores y proveedores singleton", List.of()),
                                new Folder("shared", "componentes, directivas y pipes reutilizables", List.of()),
                                new Folder("features", "módulos de características como dashboard, generador, autenticación, etc.", List.of()),
                                new Folder("pages", "páginas como Inicio, Acerca de, Contacto con sus rutas", List.of())
                        ))
                )),
                new Folder("assets", "recursos estáticos como imágenes e íconos", List.of()),
                new Folder("environments", "archivos de configuración específicos por entorno", List.of())
        );

        try {
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, description,ArchitectureType.FEATURE_BASED, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
