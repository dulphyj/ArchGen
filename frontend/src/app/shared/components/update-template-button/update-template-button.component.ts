import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EditTemplateModalComponent } from "../../../features/layout/edit-template-modal/edit-template-modal.component";
@Component({
  selector: 'app-update-template-button',
  imports: [CommonModule, EditTemplateModalComponent],
  templateUrl: './update-template-button.component.html',
  styleUrl: './update-template-button.component.css'
})
export class UpdateTemplateButtonComponent {
  showEditModal = false;
  isAuthenticated = "123";
  @Input() templateId!: string;

  openModal() {
    this.showEditModal = true;
  }

  closeModal() {
    this.showEditModal = false;
  }

}
