import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./features/layout/header/header.component";
import { SidebarComponent } from "./features/layout/sidebar/sidebar.component";
import { MainContentComponent } from "./features/layout/main-content/main-content.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArchGen';
}
