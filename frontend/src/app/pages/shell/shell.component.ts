import { Component } from '@angular/core';
import { HeaderComponent } from "../../features/layout/header/header.component";
import { SidebarComponent } from "../../features/layout/sidebar/sidebar.component";
import { MainContentComponent } from "../../features/layout/main-content/main-content.component";
import { FooterComponent } from "../../features/layout/footer/footer.component";

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, SidebarComponent, MainContentComponent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent {

}
