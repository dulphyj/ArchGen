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
        String description = "Arquitectura basada en componentes (frontend), ideal para construir aplicaciones modulares, reutilizables y mantenibles en entornos modernos de desarrollo web.";

        List<Folder> folders = List.of(
                new Folder("components", "Componentes UI reutilizables e independientes", List.of(
                        new Folder("common", "Componentes compartidos de UI (botones, tarjetas, etc.)", List.of()),
                        new Folder("layout", "Componentes de diseño como barra de navegación, pie de página", List.of())
                )),
                new Folder("pages", "Páginas principales que agrupan componentes", List.of()),
                new Folder("services", "Lógica para obtener datos o manejar reglas de negocio", List.of()),
                new Folder("state", "Gestión de estado (ej. Redux, NgRx, Pinia)", List.of()),
                new Folder("assets", "Archivos estáticos como imágenes y fuentes", List.of()),
                new Folder("utils", "Funciones auxiliares o utilitarias", List.of()),
                new Folder("styles", "Estilos globales, archivos SCSS", List.of())
        );
        try {
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, description,ArchitectureType.CBA, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
