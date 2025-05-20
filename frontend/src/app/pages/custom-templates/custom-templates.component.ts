import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { Template } from '../../core/models/template.model';
import { TemplateService } from '../../core/services/template.service';
import { DownloadTemplateButtonComponent } from "../../shared/components/download-template-button/download-template-button.component";
import { AuthService } from '../../core/services/auth.service';
import { SessionStorageService } from '../../core/services/session-storage.service';
import { ActiveToast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-templates',
  imports: [CommonModule, DownloadTemplateButtonComponent],
  templateUrl: './custom-templates.component.html',
  styleUrl: './custom-templates.component.css'
})
export class CustomTemplatesComponent implements OnInit {
  private auth = inject(AuthService);
  private storage = inject(SessionStorageService);

  isAuthenticated: Signal<boolean> = this.auth.isAuthenticated;
  clerkId: string = this.storage.getItem('clerkId');

  templates: Template[] = [];


  constructor(private tempalteService: TemplateService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserTemplates();
  }

  getUserTemplates() {
    if (this.clerkId) {
      this.tempalteService.getUserTemplates(this.clerkId).subscribe({
        next: (templates) => {
          this.templates = templates;
        },
        error: (error) => {
          console.error('Error al obtener las plantillas:', error);
        }
      });
    }
  }

  deleteTemplate(id: string) {
    this.tempalteService.deleteTemplate(id)
      .subscribe({
        next: () => {
          this.getUserTemplates();
          this.toastr.success('Plantilla eliminada correctamente', "Éxito");
          console.log("Plantilla eliminada")
        }, error: (err) => {
          console.log("Error al eliminar plantilla", err);
          this.toastr.error('Error al eliminar plantilla');
        }
      });
  }
}
