import { Component } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';

@Component({
  selector: 'app-mvvm',
  imports: [DownloadTemplateButtonComponent],
  templateUrl: './mvvm.component.html',
  styleUrl: './mvvm.component.css'
})
export class MvvmComponent {

  arch = ArchitectureType;
}
