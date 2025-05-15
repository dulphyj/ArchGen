import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TemplateService } from '../../../core/services/template.service';
import { SessionStorageService } from '../../../core/services/session-storage.service';
import { Template } from '../../../core/models/template.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FolderEditorComponent } from "../folder-editor/folder-editor.component";

@Component({
  selector: 'app-edit-template-modal',
  imports: [CommonModule, FormsModule, FolderEditorComponent],
  templateUrl: './edit-template-modal.component.html',
  styleUrl: './edit-template-modal.component.css'
})
export class EditTemplateModalComponent implements OnInit {

  @Output() closeModal = new EventEmitter<void>();
  template!: Template;
  id!: string;
  clerkId!: string;

  constructor(private tempalteService: TemplateService, private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    this.id = this.sessionStorage.getItem('templateId')!;
    this.tempalteService.getTemplateById(this.id).subscribe({
      next: (template) => {
        this.template = template;
      },
      error: (error) => {
        console.error('Error al obtener la plantilla:', error);
      }
    });
  }

  close(): void {
    this.closeModal.emit();
  }

  save(): void {
    this.tempalteService.updateTemplate(this.id, this.template, "123").subscribe({
      next: (response) => {
        console.log('Plantilla actualizada:', response.type, "el tipo ", this.template.type, "el id ", this.template.id);
        this.sessionStorage.setItem('templateId', response.id);
        console.log('Plantilla actualizada:', this.sessionStorage.getItem('templateId'));
        this.template.name = response.name;
        this.template.type = this.template.type;
        this.template.structure = response.structure;
        console.log('Plantilla actualizada:', response);
      },
      error: (error) => {
        console.error('Error al actualizar la plantilla:', error);
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

}
