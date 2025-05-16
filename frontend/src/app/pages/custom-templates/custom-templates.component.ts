import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Template } from '../../core/models/template.model';
import { TemplateService } from '../../core/services/template.service';
import { SessionStorageService } from '../../core/services/session-storage.service';
import { DownloadTemplateButtonComponent } from "../../shared/components/download-template-button/download-template-button.component";

@Component({
  selector: 'app-custom-templates',
  imports: [CommonModule, DownloadTemplateButtonComponent],
  templateUrl: './custom-templates.component.html',
  styleUrl: './custom-templates.component.css'
})
export class CustomTemplatesComponent implements OnInit {

  templates: Template[] = [];
  clerkId: string = "123";

  constructor(private tempalteService: TemplateService, private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    this.getUserTemplates();
  }

  getUserTemplates() {
    this.tempalteService.getUserTemplates(this.clerkId).subscribe({
      next: (templates) => {
        this.templates = templates;
      },
      error: (error) => {
        console.error('Error al obtener las plantillas:', error);
      }
    });
  }

  deleteTemplate(id: string) {
    this.tempalteService.deleteTemplate(id)
      .subscribe({
        next: () => {
          this.getUserTemplates();
          console.log("Plantilla eliminada")
        }, error: (err) => {
          console.log("Error al eliminar plantilla", err);
        }
      });

  }
}
