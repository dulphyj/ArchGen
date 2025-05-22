import { Component, OnInit } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';
import { CommonModule } from '@angular/common';
import { FileStructureComponent } from "../../../features/layout/file-structure/file-structure.component";
import { MvvmDiagramComponent } from "../../../features/layout/architectures-diagrams/mvvm-diagram/mvvm-diagram.component";
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-mvvm',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule, FileStructureComponent, MvvmDiagramComponent],
  templateUrl: './mvvm.component.html',
  styleUrl: './mvvm.component.css'
})
export class MvvmComponent implements OnInit {
  arch = ArchitectureType.MVVM;
  template: Template | null = null;
  title: string = 'Arquitectura MVVM';

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const cachKey = `Arquitectura ${this.arch}`;
    this.template = this.localStorage.getItem(cachKey);
  }
}
