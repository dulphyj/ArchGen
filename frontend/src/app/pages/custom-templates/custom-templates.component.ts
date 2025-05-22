import { CommonModule } from '@angular/common';
import { Component, inject, OnChanges, OnInit, Signal, SimpleChanges } from '@angular/core';
import { Template } from '../../core/models/template.model';
import { TemplateService } from '../../core/services/template.service';
import { DownloadTemplateButtonComponent } from "../../shared/components/download-template-button/download-template-button.component";
import { AuthService } from '../../core/services/auth.service';
import { SessionStorageService } from '../../core/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';

@Component({
  selector: 'app-custom-templates',
  imports: [CommonModule, DownloadTemplateButtonComponent],
  templateUrl: './custom-templates.component.html',
  styleUrl: './custom-templates.component.css'
})
export class CustomTemplatesComponent implements OnInit {
  private auth = inject(AuthService);
  private localStorage = inject(LocalStorageService)

  isAuthenticated: Signal<boolean> = this.auth.isAuthenticated;
  clerkId: string | null = sessionStorage.getItem('clerkId');

  templates: Template[] = [];
  nameTemplate!: string;

  isDeleted: boolean = false;

  constructor(private tempalteService: TemplateService, private toastr: ToastrService, private router: Router) { }
  ngOnInit(): void {
    this.getUserTemplates();
  }

  getUserTemplates() {
    let stored = this.localStorage.getItem('templates');
    if (this.isDeleted || !stored || this.localStorage.getItem('userTemplates') != this.localStorage.getItem('change')) {
      this.isDeleted = false
      let change = this.localStorage.getItem('change')
      this.localStorage.setItem('userTemplates', change)
      if (this.clerkId) {
        this.tempalteService.getUserTemplates(this.clerkId).subscribe({
          next: (templates: Template[]) => {
            this.templates = templates;
            this.localStorage.setItem('templates', templates)
          },
          error: (error) => {
            console.error('Error al obtener las plantillas:', error);
          }
        });
      }
    } else {
      this.templates = this.localStorage.getItem('templates') as Template[]
    }
  }

  deleteTemplate(id: string, name: string) {
    this.isDeleted = true;
    this.tempalteService.deleteTemplate(id)
      .subscribe({
        next: () => {
          this.getUserTemplates();
          this.toastr.success(`Plantilla ${name} eliminada correctamente`, "Éxito", { timeOut: 600 });
          console.log("Plantilla eliminada")
        }, error: (err) => {
          console.log("Error al eliminar plantilla", err);
          this.toastr.error('Error al eliminar plantilla');
        }
      });
  }

  startEditing() {
    this.router.navigate(['/architecture/HEXAGONAL'], { queryParams: { highlightButtonUpdate: true } });
    this.toastr.info('Haz clic en el botón de edición para crear tu primera plantilla personalizada.', 'Crea y personaliza tu primera plantilla', { timeOut: 4000 })
  }
}
