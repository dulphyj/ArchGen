import { Component } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';

@Component({
  selector: 'app-hexagonal',
  imports: [DownloadTemplateButtonComponent],
  templateUrl: './hexagonal.component.html',
  styleUrl: './hexagonal.component.css'
})
export class HexagonalComponent {
  arch = ArchitectureType;

}
