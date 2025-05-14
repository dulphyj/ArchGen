export interface Folder {
    name: string;
    description: string;
    subFolders: Folder[];
}
