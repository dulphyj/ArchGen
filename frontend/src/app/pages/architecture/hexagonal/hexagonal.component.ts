import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { ArchitectureType } from '../../../core/models/architecture-type.enum';
import { UpdateTemplateButtonComponent } from "../../../shared/components/update-template-button/update-template-button.component";
import { Template } from '../../../core/models/template.model';
import { TemplateService } from '../../../core/services/template.service';
import { CommonModule } from '@angular/common';
import { FileStructureComponent } from "../../../features/layout/file-structure/file-structure.component";
import { HexagonalDiagramComponent } from "../../../features/layout/architectures-diagrams/hexagonal-diagram/hexagonal-diagram.component";
import { ActivatedRoute } from '@angular/router';
import { TourMatMenuModule } from 'ngx-ui-tour-md-menu';
import { TourControllerService } from '../../../core/services/tour-controller.service';

@Component({
  selector: 'app-hexagonal',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule, FileStructureComponent, HexagonalDiagramComponent, TourMatMenuModule],
  templateUrl: './hexagonal.component.html',
  styleUrl: './hexagonal.component.css'
})
export class HexagonalComponent implements OnInit, AfterViewInit {
  private readonly tourService = inject(TourControllerService);
  arch = ArchitectureType.HEXAGONAL;
  template!: Template;
  title: string = 'Arquitectura Hexagonal';

  highlightButton = false;

  constructor(private tempalteService: TemplateService, private route: ActivatedRoute) { }

  async ngAfterViewInit(): Promise<void> {
    /*if (this.tourService.initTour()) {
      console.log("Esperando a que se rendericen los anchors...");
      await this.waitForAnchors();  // Asegura que los elementos estén presentes
      this.tourService.initializeTour();
      this.tourService.startTour();
      this.tourService.initTour.set(false);
      this.tourService.endTour();
    }*/
  }

  async ngOnInit(): Promise<void> {
    this.getTemplateByArch();
    this.route.queryParams.subscribe(params => {
      this.highlightButton = params['highlightButton'] === 'true';
    });
    if (this.tourService.initTour()) {
      this.tourService.startTour();
      this.tourService.initTour.set(false);
      this.tourService.endTour();
    }
  }

  async getTemplateByArch() {
    this.tempalteService.getTemplateByType(this.arch)
      .subscribe({
        next: template => {
          if (template != null) {
            this.template = template;
          } else {
            this.createTemplate();
          }
        }, error: err => {
          console.log('Error fetching template:', err)
        }
      })
  }
  createTemplate() {
    this.tempalteService.createTemplate(this.arch, `Arquitectura ${this.arch}`, '')
      .subscribe({
        next: template => {
          this.template = template;
        }, error: err => {
          console.log('Error creating template:', err);
        }
      })
  }
}
