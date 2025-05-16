import { Component, Input } from '@angular/core';
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  architectureTypes = Object.values(ArchitectureType);
  type!: ArchitectureType;
  @Input() selectedType: string = '';

  constructor(private router: Router) { }

  setType(type: ArchitectureType) {
    this.selectedType = type;
    this.type = type;
    this.router.navigate(['/architecture', type]);
  }

  setNav() {
    this.selectedType = "nav";
    this.router.navigate(['/customtemplates']);
  }
}
