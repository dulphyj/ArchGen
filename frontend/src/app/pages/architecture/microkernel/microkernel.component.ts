import { Component } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";

@Component({
  selector: 'app-microkernel',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent],
  templateUrl: './microkernel.component.html',
  styleUrl: './microkernel.component.css'
})
export class MicrokernelComponent {
  arch = ArchitectureType;

}
