import { ProjectStructure } from './project-structure.model';
import { ArchitectureType } from './architecture-type.enum';

export interface Template {
    id: string;
    name: string;
    type: ArchitectureType;
    structure: ProjectStructure;
    clerkId: string | null;
    path: string;
}
