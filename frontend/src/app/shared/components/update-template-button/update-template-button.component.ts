import { CommonModule } from '@angular/common';
import { Component, inject, Input, Signal } from '@angular/core';
import { EditTemplateModalComponent } from "../../../features/layout/edit-template-modal/edit-template-modal.component";
import { AuthService } from '../../../core/services/auth.service';
import { SessionStorageService } from '../../../core/services/session-storage.service';
@Component({
  selector: 'app-update-template-button',
  imports: [CommonModule, EditTemplateModalComponent],
  templateUrl: './update-template-button.component.html',
  styleUrl: './update-template-button.component.css'
})
export class UpdateTemplateButtonComponent {
  private auth = inject(AuthService);
  private storage = inject(SessionStorageService);

  isAuthenticated: Signal<boolean> = this.auth.isAuthenticated;
  userName: string = this.storage.getItem('userName');

  showEditModal = false;
  @Input() templateId!: string;
  @Input() highlight = false;

  openModal() {
    this.showEditModal = true;
  }

  closeModal() {
    this.showEditModal = false;
  }

}
