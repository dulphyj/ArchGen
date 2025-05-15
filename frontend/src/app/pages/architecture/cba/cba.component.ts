import { Component } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';

@Component({
  selector: 'app-cba',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent],
  templateUrl: './cba.component.html',
  styleUrl: './cba.component.css'
})
export class CbaComponent {
  arch = ArchitectureType;
}
