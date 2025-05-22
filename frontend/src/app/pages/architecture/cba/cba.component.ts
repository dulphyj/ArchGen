import { Component, OnInit } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';
import { CommonModule } from '@angular/common';
import { CbaDiagramComponent } from "../../../features/layout/architectures-diagrams/cba-diagram/cba-diagram.component";
import { FileStructureComponent } from "../../../features/layout/file-structure/file-structure.component";
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-cba',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule, CbaDiagramComponent, FileStructureComponent],
  templateUrl: './cba.component.html',
  styleUrl: './cba.component.css'
})
export class CbaComponent implements OnInit {

  arch = ArchitectureType.CBA;
  template: Template | null = null;
  id: string | null = null;
  title: string = 'Arquitectura CBA';

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const cachKey = `Arquitectura ${this.arch}`;
    const id = `id${this.arch}`;
    this.template = this.localStorage.getItem(cachKey);
    this.id = this.localStorage.getItem(id);
  }
}
