import { Component, OnInit } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';
import { TemplateService } from '../../../core/services/template.service';
import { CommonModule } from '@angular/common';
import { FileStructureComponent } from "../../../features/layout/file-structure/file-structure.component";
import { HexagonalDiagramComponent } from "../../../features/layout/architectures-diagrams/hexagonal-diagram/hexagonal-diagram.component";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hexagonal',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule, FileStructureComponent, HexagonalDiagramComponent],
  templateUrl: './hexagonal.component.html',
  styleUrl: './hexagonal.component.css'
})
export class HexagonalComponent implements OnInit {
  arch = ArchitectureType.HEXAGONAL;
  template!: Template;
  title: string = 'Arquitectura Hexagonal';

  highlightButton = false;

  constructor(private tempalteService: TemplateService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTemplateByArch();
    this.route.queryParams.subscribe(params => {
      this.highlightButton = params['highlightButton'] === 'true';
    });
  }

  getTemplateByArch() {
    this.tempalteService.getTemplateByType(this.arch)
      .subscribe({
        next: template => {
          if (template != null) {
            this.template = template;
          } else {
            this.createTemplate();
          }
        }, error: err => {
          console.log('Error fetching template:', err)
        }
      })
  }
  createTemplate() {
    this.tempalteService.createTemplate(this.arch, `Arquitectura ${this.arch}`, '')
      .subscribe({
        next: template => {
          this.template = template;
        }, error: err => {
          console.log('Error creating template:', err);
        }
      })
  }
}
