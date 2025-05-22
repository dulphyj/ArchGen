import { Component, OnInit } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';
import { CommonModule } from '@angular/common';
import { FileStructureComponent } from "../../../features/layout/file-structure/file-structure.component";
import { FeatureBasedDiagramComponent } from "../../../features/layout/architectures-diagrams/feature-based-diagram/feature-based-diagram.component";
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-feature-based',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule, FileStructureComponent, FeatureBasedDiagramComponent],
  templateUrl: './feature-based.component.html',
  styleUrl: './feature-based.component.css'
})
export class FeatureBasedComponent implements OnInit {
  arch = ArchitectureType.FEATURE_BASED;
  template: Template | null = null;
  title: string = 'Arquitectura FEATURE BASED';

  constructor(private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    const cachKey = `Arquitectura ${this.arch}`;
    this.template = this.localStorage.getItem(cachKey);
  }
}
