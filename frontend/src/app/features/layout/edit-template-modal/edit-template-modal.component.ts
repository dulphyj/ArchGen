import { Component, EventEmitter, inject, Input, OnInit, Output, Signal } from '@angular/core';
import { TemplateService } from '../../../core/services/template.service';
import { Template } from '../../../core/models/template.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FolderEditorComponent } from "../folder-editor/folder-editor.component";
import { DownloadTemplateButtonComponent } from "../../../shared/components/download-template-button/download-template-button.component";
import { SessionStorageService } from '../../../core/services/session-storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { ArchitectureType } from '../../../core/models/architecture-type.enum';

@Component({
  selector: 'app-edit-template-modal',
  imports: [CommonModule, FormsModule, FolderEditorComponent, DownloadTemplateButtonComponent],
  templateUrl: './edit-template-modal.component.html',
  styleUrl: './edit-template-modal.component.css'
})
export class EditTemplateModalComponent implements OnInit {

  private storage = inject(SessionStorageService);

  clerkId: string = this.storage.getItem('clerkId');

  @Output() closeModal = new EventEmitter<void>();
  @Input() templateId!: string;
  newTemplateId!: string;

  template!: Template;
  inputValue: string = '';

  constructor(private templateService: TemplateService, private toastr: ToastrService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.getTemplateById();
    this.inputValue = '';
  }

  getTemplateById() {
    for (const type of Object.values(ArchitectureType)) {
      if (this.templateId == this.localStorage.getItem(`id${type}`))
        this.template = this.localStorage.getItem(`Arquitectura ${type}`) as Template;
    }
  }

  save(): void {
    this.templateService.updateTemplate(this.template.id, this.template, this.clerkId).subscribe({
      next: (response) => {
        this.newTemplateId = response.id;
        console.log(this.newTemplateId)
        this.template.name = response.name;
        this.template.description = response.description;
        this.template.type = this.template.type;
        this.template.structure = response.structure;
        console.log("Nueva plantilla creada.")
        this.toastr.success('Plantilla creada exitosamente', 'Éxito')
        this.localStorage.setItem('change', this.newTemplateId)
        console.log("change???????????????", this.localStorage.getItem('change'))
      },
      error: (error) => {
        console.error('Error al crear nueva plantilla:', error);
        this.toastr.error('Error al crear plantilla', 'Error')
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
    this.toastr.info('Has salido del editor de plantillas exitosamente.', 'Información', { timeOut: 3000 });
    setTimeout(() => {
      this.closeModal.emit();
    }, 300)
  }

  onBlur() {
    if (this.inputValue.trim() !== '') {
      this.template.description = this.inputValue;
    }
  }

}
