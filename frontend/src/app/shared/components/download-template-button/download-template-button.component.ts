import { Component, inject, Input, OnChanges, OnInit, Signal, SimpleChanges } from '@angular/core';
import { Template } from '../../../core/models/template.model';
import { TemplateService } from '../../../core/services/template.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ArchitectureType } from '../../../core/models/architecture-type.enum';

@Component({
  selector: 'app-download-template-button',
  imports: [CommonModule],
  templateUrl: './download-template-button.component.html',
  styleUrl: './download-template-button.component.css'
})
export class DownloadTemplateButtonComponent implements OnChanges {
  auth = inject(AuthService);

  isAuthenticated: Signal<boolean> = this.auth.isAuthenticated;

  template: Template | null = null;
  isLoading = true;
  @Input() templateId: string | null = null;
  @Input() highlight = false;


  constructor(private templateService: TemplateService, private toastr: ToastrService, private localStorage: LocalStorageService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['templateId'] && changes['templateId'].currentValue) {
      if (this.templateId != null)
        this.isLoading = false
    }
  }

  getTemplate() {
    if (this.templateId) {
      let isTrue = true;
      for (const type of Object.values(ArchitectureType)) {
        if (this.templateId == this.localStorage.getItem(`id${type}`)) {
          this.template = this.localStorage.getItem(`Arquitectura ${type}`);
          isTrue = false;
        }
      }
      if (isTrue) {
        this.templateService.getTemplateById(this.templateId)
          .subscribe({
            next: template => {
              this.template = template;
            }, error: e => {
              console.log("Error al obtener plantilla")
            }
          })
      }
    }
  }



  downloadTemplate(): void {
    this.getTemplate();
    if (this.templateId) {
      this.toastr.info('Iniciando descarga', 'Descargando', { timeOut: 350, progressBar: true });

      this.templateService.downloadTemplate(this.templateId).subscribe({
        next: (blob) => {
          setTimeout(() => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${this.template?.name}.zip`;
            a.click();
            window.URL.revokeObjectURL(url);
            this.toastr.success('Descarga exitosa', 'Éxito');
          }, 350);
        },
        error: (err) => {
          console.error('Error downloading template:', err);
          this.toastr.error('No se pudo descargar el template', 'Error');
        }
      });
    }
  }

}
