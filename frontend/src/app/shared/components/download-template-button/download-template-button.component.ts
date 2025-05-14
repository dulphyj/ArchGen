import { Component, Input, OnInit } from '@angular/core';
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { Template } from '../../../core/models/template.model';
import { TemplateService } from '../../../core/services/template.service';

@Component({
  selector: 'app-download-template-button',
  imports: [],
  templateUrl: './download-template-button.component.html',
  styleUrl: './download-template-button.component.css'
})
export class DownloadTemplateButtonComponent implements OnInit {

  @Input() type!: ArchitectureType;
  template: Template | null = null;
  isLoading = true;

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.templateService.getTemplateByType(this.type).subscribe({
      next: (template) => {
        this.template = template;
        this.isLoading = false;
      }, error: (err) => {
        console.error('Error fetching template:', err);
        this.isLoading = false;
      }
    })
  }

  downloadTemplate(): void {
    if (this.template?.id) {
      this.templateService.downloadTemplate(this.template.id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${this.template?.name}.zip`;
          a.click();
          window.URL.revokeObjectURL(url);
        }, error: (err) => {
          console.error('Error downloading template:', err);
        }
      })
    }
  }
}
