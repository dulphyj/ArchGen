import { Component } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';

@Component({
  selector: 'app-cba',
  imports: [DownloadTemplateButtonComponent],
  templateUrl: './cba.component.html',
  styleUrl: './cba.component.css'
})
export class CbaComponent {
  arch = ArchitectureType;
}
