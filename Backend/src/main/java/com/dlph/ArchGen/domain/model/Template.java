package com.dlph.ArchGen.domain.model;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;



@Data
@AllArgsConstructor
@NoArgsConstructor
public class Template {
    //@Id
    private String id;
    @NotNull
    private String name;
    @NotNull
    private ArchitectureType type;
    private ProjectStructure structure;
}
