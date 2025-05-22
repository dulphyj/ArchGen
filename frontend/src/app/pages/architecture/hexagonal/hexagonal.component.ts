import { Component, inject, OnInit } from '@angular/core';
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
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-hexagonal',
  imports: [DownloadTemplateButtonComponent, UpdateTemplateButtonComponent, CommonModule, FileStructureComponent, HexagonalDiagramComponent, TourMatMenuModule],
  templateUrl: './hexagonal.component.html',
  styleUrl: './hexagonal.component.css'
})
export class HexagonalComponent implements OnInit {
  private readonly tourService = inject(TourControllerService);
  arch = ArchitectureType.HEXAGONAL;
  template: Template | null = null;
  title: string = 'Arquitectura Hexagonal';

  highlightButton = false;
  highlightButtonUpdate = false;

  constructor(private localStorage: LocalStorageService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const cachKey = `Arquitectura ${this.arch}`;
    this.template = this.localStorage.getItem(cachKey);
    this.route.queryParams.subscribe(params => {
      this.highlightButton = params['highlightButton'] === 'true';
      this.highlightButtonUpdate = params['highlightButtonUpdate'] === 'true';
    });
    if (this.tourService.initTour()) {
      this.tourService.startTour();
      this.tourService.initTour.set(false);
      this.tourService.endTour();
    }
  }
}
