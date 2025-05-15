import { Component } from '@angular/core';
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../../core/services/session-storage.service';
import { TemplateService } from '../../../core/services/template.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  architectureTypes = Object.values(ArchitectureType);
  type!: ArchitectureType;

  constructor(private sessionStorage: SessionStorageService, private templateService: TemplateService, private router: Router) { }

  setType(type: ArchitectureType) {
    this.type = type;
    this.templateService.getTemplateByType(type)
      .subscribe({
        next: template => {
          this.sessionStorage.setItem('templateId', template.id);
          this.router.navigate(['/architecture', type]);
        }, error: err => {
          console.error('Error fetching template:', err);
        }
      })
  }
}
