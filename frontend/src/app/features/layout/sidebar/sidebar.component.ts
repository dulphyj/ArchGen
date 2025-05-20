import { Component, inject, Input, OnInit, Signal, signal } from '@angular/core';
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ClerkService } from 'ngx-clerk-iliad';
import { AuthService } from '../../../core/services/auth.service';
import { SessionStorageService } from '../../../core/services/session-storage.service';
import { TourMatMenuModule } from 'ngx-ui-tour-md-menu';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule, TourMatMenuModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private auth = inject(AuthService);
  private storage = inject(SessionStorageService);

  isAuthenticated: Signal<boolean> = this.auth.isAuthenticated;

  architectureTypes = Object.values(ArchitectureType);
  type!: ArchitectureType;
  @Input() selectedType: string = '';

  constructor(private router: Router, private clerk: ClerkService) { }

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
