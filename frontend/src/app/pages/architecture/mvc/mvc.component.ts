import { Component, OnInit } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';
import { CommonModule } from '@angular/common';
import { FileStructureComponent } from "../../../features/layout/file-structure/file-structure.component";
import { MvcDiagramComponent } from "../../../features/layout/architectures-diagrams/mvc-diagram/mvc-diagram.component";
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-mvc',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule, FileStructureComponent, MvcDiagramComponent],
  templateUrl: './mvc.component.html',
  styleUrl: './mvc.component.css'
})
export class MvcComponent implements OnInit {
  arch = ArchitectureType.MVC;
  template: Template | null = null;
  title: string = 'Arquitectura MVC';

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const cachKey = `Arquitectura ${this.arch}`;
    this.template = this.localStorage.getItem(cachKey);
  }
}
