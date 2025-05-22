import { Component, OnInit } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';
import { CommonModule } from '@angular/common';
import { FileStructureComponent } from "../../../features/layout/file-structure/file-structure.component";
import { MicrokernelDiagramComponent } from "../../../features/layout/architectures-diagrams/microkernel-diagram/microkernel-diagram.component";
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-microkernel',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule, FileStructureComponent, MicrokernelDiagramComponent],
  templateUrl: './microkernel.component.html',
  styleUrl: './microkernel.component.css'
})
export class MicrokernelComponent implements OnInit {
  arch = ArchitectureType.MICROKERNEL;
  template: Template | null = null;
  title: string = 'Arquitectura Microkernel';

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const cachKey = `Arquitectura ${this.arch}`;
    this.template = this.localStorage.getItem(cachKey);
  }
}
