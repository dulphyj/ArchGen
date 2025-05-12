package com.dlph.ArchGen.domain.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Folder {
    private String name;
    private String description;
    private List<Folder> subFolders;
}
