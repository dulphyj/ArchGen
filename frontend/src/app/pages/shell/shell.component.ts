import { Component, HostListener, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../features/layout/header/header.component";
import { SidebarComponent } from "../../features/layout/sidebar/sidebar.component";
import { MainContentComponent } from "../../features/layout/main-content/main-content.component";
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, SidebarComponent, MainContentComponent, CommonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit {
  private auth = inject(AuthService);

  sidebarVisible = false;
  isMobile = false;

  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.auth.loadUser();
    this.onResize();
  }

  onResize() {
    this.isMobile = window.innerWidth < 768;
    this.sidebarVisible = !this.isMobile;
  }
}
