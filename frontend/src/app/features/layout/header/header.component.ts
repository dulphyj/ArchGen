import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output, Signal, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  private auth = inject(AuthService);

  @Output() toggleSidebarMobile = new EventEmitter<void>();

  isAuthenticated: Signal<boolean> = this.auth.isAuthenticated;
  userName: Signal<string | null> = this.auth.userName;
  userImage: Signal<string | null> = this.auth.imageUrl;

  logout() {
    this.auth.logout();
  }
  toggleSidebar() {
    this.toggleSidebarMobile.emit();
  }

}
