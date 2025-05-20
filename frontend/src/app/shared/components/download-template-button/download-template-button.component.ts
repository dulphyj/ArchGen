import { Component, inject, Input, OnChanges, OnInit, Signal, SimpleChanges } from '@angular/core';
import { Template } from '../../../core/models/template.model';
import { TemplateService } from '../../../core/services/template.service';
import { SessionStorageService } from '../../../core/services/session-storage.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-download-template-button',
  imports: [CommonModule],
  templateUrl: './download-template-button.component.html',
  styleUrl: './download-template-button.component.css'
})
export class DownloadTemplateButtonComponent implements OnInit, OnChanges {
  auth = inject(AuthService);

  isAuthenticated: Signal<boolean> = this.auth.isAuthenticated;

  template: Template | null = null;
  isLoading = true;
  @Input() templateId!: string;

  @Input() highlight = false;


  constructor(private templateService: TemplateService, private sessionStorage: SessionStorageService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getTemplate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['templateId'] && changes['templateId'].currentValue) {
      this.getTemplate();
    }
  }

  getTemplate() {
    if (this.templateId) {
      this.templateService.getTemplateById(this.templateId).subscribe({
        next: (template) => {
          this.template = template;
          this.isLoading = false;
        }, error: (err) => {
          console.error('Error fetching template:', err);
          this.isLoading = true;
        }
      });
    }
  }



  downloadTemplate(): void {
    if (this.template?.id) {
      this.toastr.info('Iniciando descarga', 'Descargando', { timeOut: 350, progressBar: true });

      this.templateService.downloadTemplate(this.template.id).subscribe({
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
