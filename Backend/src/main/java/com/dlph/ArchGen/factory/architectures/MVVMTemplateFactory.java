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
        String description = "Arquitectura basada en Modelo-Vista-ViewModel para aplicaciones frontend. Promueve una separación clara entre la interfaz de usuario, la lógica de presentación y los modelos de datos, facilitando pruebas y mantenibilidad.";
        List<Folder> folders = List.of(
                new Folder("model", "modelos de datos o lógica de negocio", List.of()),
                new Folder("view", "plantillas de interfaz de usuario (HTML, CSS)", List.of(
                        new Folder("components", "componentes de interfaz utilizados en las vistas", List.of())
                )),
                new Folder("viewmodel", "conecta el modelo con la vista (lógica del controlador, servicios)", List.of(
                        new Folder("services", "lógica de negocio o de conexión con APIs", List.of()),
                        new Folder("state", "gestión del estado o uso de observables", List.of())
                )),
                new Folder("assets", "imágenes, estilos, etc.", List.of()),
                new Folder("shared", "componentes, pipes o directivas reutilizables", List.of())
        );

        try {
            File zipFile = ZipGenerate.createZipFile(folders, name);
            return new Template(null, name, description,ArchitectureType.MVVM, new ProjectStructure(folders), clerkId, zipFile.getPath(), false);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
