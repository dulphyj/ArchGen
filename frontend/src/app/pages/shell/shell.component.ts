import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../features/layout/header/header.component";
import { SidebarComponent } from "../../features/layout/sidebar/sidebar.component";
import { MainContentComponent } from "../../features/layout/main-content/main-content.component";
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, SidebarComponent, MainContentComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit {

  private auth = inject(AuthService);

  ngOnInit(): void {
    this.auth.loadUser();
  }
}
