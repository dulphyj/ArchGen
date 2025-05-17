import { Component, EventEmitter, inject, Input, OnInit, Output, Signal } from '@angular/core';
import { TemplateService } from '../../../core/services/template.service';
import { Template } from '../../../core/models/template.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FolderEditorComponent } from "../folder-editor/folder-editor.component";
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { SessionStorageService } from '../../../core/services/session-storage.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-edit-template-modal',
  imports: [CommonModule, FormsModule, FolderEditorComponent, DownloadTemplateButtonComponent],
  templateUrl: './edit-template-modal.component.html',
  styleUrl: './edit-template-modal.component.css'
})
export class EditTemplateModalComponent implements OnInit {
  private auth = inject(AuthService);
  private storage = inject(SessionStorageService);

  clerkId: string = this.storage.getItem('clerkId');

  @Output() closeModal = new EventEmitter<void>();
  @Input() templateId!: string;
  newTemplateId!: string;

  template!: Template;

  constructor(private tempalteService: TemplateService) { }

  ngOnInit(): void {
    this.getTemplateById();
  }

  getTemplateById() {
    this.tempalteService.getTemplateById(this.templateId).subscribe({
      next: (template) => {
        this.template = template;
      },
      error: (error) => {
        console.error('Error al obtener la plantilla:', error);
      }
    });
  }

  save(): void {
    this.tempalteService.updateTemplate(this.template.id, this.template, this.clerkId).subscribe({
      next: (response) => {
        this.newTemplateId = response.id;
        this.template.name = response.name;
        this.template.description = response.description;
        this.template.type = this.template.type;
        this.template.structure = response.structure;
        console.log("Nueva plantilla creada.")
      },
      error: (error) => {
        console.error('Error al crear nueva plantilla:', error);
      }
    })
  }

  addRootFolder() {
    this.template.structure.folders.push({
      name: '',
      description: '',
      subFolders: []
    });
  }

  removeRootFolder(index: number) {
    this.template.structure.folders.splice(index, 1);
  }

  close(): void {
    this.closeModal.emit();
  }
}
