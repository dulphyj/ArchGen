package com.dlph.ArchGen.infrastructure.rest;

import com.dlph.ArchGen.application.TemplateService;
import com.dlph.ArchGen.domain.model.ArchitectureType;
import com.dlph.ArchGen.domain.model.Template;
import com.dlph.ArchGen.factory.ZipGenerate;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/template")
public class TemplateController {
    private final TemplateService templateService;

    public TemplateController(TemplateService templateService) {
        this.templateService = templateService;
    }

    @PostMapping("/generate")
    public ResponseEntity<Template> generateTemplate(
            @RequestParam ArchitectureType type,
            @RequestParam String name,
            @RequestParam(required = false) String clerkId) {
        if(templateService.findFirstByTypeAndEditFalseAndClerkIdIsNull(type).isPresent()){
            return ResponseEntity.badRequest().build();
        } else {
            Template template = templateService.generateTemplate(type, name, clerkId);
            return ResponseEntity.ok(template);
        }
    }

    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> downloadZip(@PathVariable String id) {
        Template template = templateService.findById(id)
                .orElseThrow(() -> new RuntimeException("Template not found"));

        File file = new File(template.getPath());
        Resource resource = new FileSystemResource(file);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    @PutMapping("/clone/{id}")
    public ResponseEntity<Template> editAndCloneTemplate(
            @PathVariable String id,
            @RequestBody Template updatedTemplate,
            @RequestParam String clerkId) {

        if (clerkId == null || clerkId.isBlank()) {
            return ResponseEntity.badRequest().build();
        }

        return templateService.findById(id)
                .filter(original -> original.getClerkId() == null || !original.getClerkId().equals(clerkId))
                .map(original -> {
                    Template newTemplate = new Template();
                    newTemplate.setName(updatedTemplate.getName());
                    newTemplate.setDescription(updatedTemplate.getDescription());
                    newTemplate.setType(updatedTemplate.getType());
                    newTemplate.setStructure(updatedTemplate.getStructure());
                    newTemplate.setClerkId(clerkId);
                    newTemplate.setEdit(true);
                    try {
                        String ZipPath = ZipGenerate.createZipFile(newTemplate.getStructure().getFolders(), newTemplate.getName()).getAbsolutePath();
                        newTemplate.setPath(ZipPath);
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }


                    Template saved = templateService.save(newTemplate);
                    return ResponseEntity.ok(saved);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/type/{type}")
    public Optional<Template> getTemplateByType(@PathVariable ArchitectureType type) {
        return templateService.findFirstByTypeAndEditFalseAndClerkIdIsNull(type);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Template> getTemplateById(@PathVariable String id) {
        return templateService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{clerkId}")
    public ResponseEntity<List<Template>> getUserTemplates(@PathVariable String clerkId) {
        List<Template> templates = templateService.getUserTemplates(clerkId);
        return ResponseEntity.ok(templates);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<HttpStatus> deleteTemplate(@PathVariable String id){
        templateService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
