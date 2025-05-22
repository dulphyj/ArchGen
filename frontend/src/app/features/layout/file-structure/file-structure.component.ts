import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FolderVisualItemComponent } from "../folder-visual-item/folder-visual-item.component";
import { CommonModule } from '@angular/common';
import { Template } from '../../../core/models/template.model';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ArchitectureType } from '../../../core/models/architecture-type.enum';

@Component({
  selector: 'app-file-structure',
  imports: [FolderVisualItemComponent, CommonModule],
  templateUrl: './file-structure.component.html',
  styleUrl: './file-structure.component.css'
})
export class FileStructureComponent implements OnInit {

  @Input() templateId!: string;
  template: Template | null = null;

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    for (const type of Object.values(ArchitectureType)) {
      if (this.templateId == this.localStorage.getItem(`id${type}`))
        this.template = this.localStorage.getItem(`Arquitectura ${type}`)
    }
  }

}
