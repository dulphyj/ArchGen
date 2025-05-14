import { Component } from '@angular/core';
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  architectureTypes = Object.values(ArchitectureType);
}
