package com.dlph.ArchGen.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "templates")
@AllArgsConstructor
@NoArgsConstructor
public class Template {
    @Id
    private String id;
    private String name;
    private ArchitectureType type;
    private ProjectStructure structure;
    private String clerkId;
    private String path;
    private boolean edit;
}
