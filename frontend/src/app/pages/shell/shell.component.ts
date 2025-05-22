import { Component, HostListener, inject, OnInit, Signal } from '@angular/core';
import { HeaderComponent } from "../../features/layout/header/header.component";
import { SidebarComponent } from "../../features/layout/sidebar/sidebar.component";
import { MainContentComponent } from "../../features/layout/main-content/main-content.component";
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { TemplateService } from '../../core/services/template.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ArchitectureType } from '../../core/models/architecture-type.enum';
import { SessionStorageService } from '../../core/services/session-storage.service';
import { Template } from '../../core/models/template.model';

@Component({
  selector: 'app-shell',
  imports: [HeaderComponent, SidebarComponent, MainContentComponent, CommonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css'
})
export class ShellComponent implements OnInit {
  private auth = inject(AuthService);
  private templateService = inject(TemplateService);
  private localStorage = inject(LocalStorageService);

  sidebarVisible = false;
  isMobile = false;

  @HostListener('window:resize', ['$event'])

  templates: Template[] = [];

  ngOnInit(): void {
    this.auth.loadUser();
    this.onResize();
    this.getTemplatesType();
    this.localStorage.setItem('userTemplates', 0)
    this.localStorage.setItem('change', 0)
  }

  onResize() {
    this.isMobile = window.innerWidth < 768;
    this.sidebarVisible = !this.isMobile;
  }

  getTemplatesType() {
    for (const type of Object.values(ArchitectureType)) {
      const cachKey = `Arquitectura ${type}`;
      const id = `id${type}`
      if (!this.localStorage.getItem(cachKey) && !this.localStorage.getItem(id)) {
        this.templateService.getTemplateByType(type)
          .subscribe({
            next: template => {
              if (template != null) {
                this.localStorage.setItem(cachKey, template)
                this.localStorage.setItem(id, template.id)
              } else {
                this.createTemplate(type, cachKey);
              }
            }, error: err => {
              console.error("Error obteniendo plantilla", err)
            }
          })
      }
    }
  }

  createTemplate(arch: ArchitectureType, name: string) {
    this.templateService.createTemplate(arch, name, '')
      .subscribe({
        next: template => {
          this.localStorage.setItem(name, template)
        }, error: err => {
          console.log('Error creating template:', err);
        }
      })
  }
}
