package com.dlph.ArchGen.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Template {
    private String id;
    private String name;
    private ArchitectureType type;
    private ProjectStructure structure;
}
