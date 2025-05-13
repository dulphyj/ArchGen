package com.dlph.ArchGen.factory;

import com.dlph.ArchGen.domain.model.Folder;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipGenerate {

    public static File createZipFile(List<Folder> folders, String templateName) throws Exception {
        Path zipPath = Files.createTempFile(templateName, ".zip");
        try (ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(zipPath.toFile()))) {
            for (Folder folder : folders) {
                addFolderToZip(folder, "",zipOutputStream);
            }
        }
        return zipPath.toFile();
    }

    private static void addFolderToZip(Folder folder, String parentDir, ZipOutputStream zipOutputStream) throws Exception {
        String folderPath = parentDir.isEmpty()? folder.getName(): parentDir + "/" + folder.getName();
        zipOutputStream.putNextEntry(new ZipEntry(folderPath + "/"));
        zipOutputStream.closeEntry();

        for (Folder subFolder : folder.getSubFolders()) {
            addFolderToZip(subFolder, folderPath, zipOutputStream);
        }
    }
}
