import { Component } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';

@Component({
  selector: 'app-feature-based',
  imports: [DownloadTemplateButtonComponent],
  templateUrl: './feature-based.component.html',
  styleUrl: './feature-based.component.css'
})
export class FeatureBasedComponent {
  arch = ArchitectureType;

}
