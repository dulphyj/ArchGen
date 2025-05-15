import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { EditTemplateModalComponent } from "../../../features/layout/edit-template-modal/edit-template-modal.component";
import { Template } from '../../../core/models/template.model';
import { TemplateService } from '../../../core/services/template.service';
import { SessionStorageService } from '../../../core/services/session-storage.service';

@Component({
  selector: 'app-update-template-button',
  imports: [CommonModule, EditTemplateModalComponent],
  templateUrl: './update-template-button.component.html',
  styleUrl: './update-template-button.component.css'
})
export class UpdateTemplateButtonComponent implements OnInit {

  showEditModal = false;
  isAuthenticated = "123";


  constructor(private sessionStorage: SessionStorageService) { }

  ngOnInit(): void {

  }
  openModal() {
    this.showEditModal = true;
  }

  closeModal() {
    this.showEditModal = false;
  }

}
