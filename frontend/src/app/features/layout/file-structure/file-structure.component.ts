import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FolderVisualItemComponent } from "../folder-visual-item/folder-visual-item.component";
import { CommonModule } from '@angular/common';
import { Folder } from '../../../core/models/folder.model';
import { Template } from '../../../core/models/template.model';
import { TemplateService } from '../../../core/services/template.service';

@Component({
  selector: 'app-file-structure',
  imports: [FolderVisualItemComponent, CommonModule],
  templateUrl: './file-structure.component.html',
  styleUrl: './file-structure.component.css'
})
export class FileStructureComponent implements OnInit {

  @Input() templateId!: string;
  template!: Template;

  constructor(private templateService: TemplateService) { }

  ngOnInit(): void {
    this.getTemplateById();
  }

  getTemplateById() {
    this.templateService.getTemplateById(this.templateId).subscribe({
      next: (template) => {
        this.template = template;
      },
      error: (error) => {
        console.error('Error al obtener la plantilla:', error);
      }
    });
  }

}
