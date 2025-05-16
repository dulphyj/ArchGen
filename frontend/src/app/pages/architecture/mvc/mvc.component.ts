import { Component, OnInit } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';
import { TemplateService } from '../../../core/services/template.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mvc',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule],
  templateUrl: './mvc.component.html',
  styleUrl: './mvc.component.css'
})
export class MvcComponent implements OnInit {
  arch = ArchitectureType.MVC;
  template!: Template;

  constructor(private tempalteService: TemplateService) { }

  ngOnInit(): void {
    this.getTemplateByArch();
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
