import { Component } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';

@Component({
  selector: 'app-mvc',
  imports: [DownloadTemplateButtonComponent],
  templateUrl: './mvc.component.html',
  styleUrl: './mvc.component.css'
})
export class MvcComponent {
  arch = ArchitectureType;
}
