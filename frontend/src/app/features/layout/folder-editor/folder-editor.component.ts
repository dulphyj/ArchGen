import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Folder } from '../../../core/models/folder.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder-editor',
  imports: [FormsModule, CommonModule],
  templateUrl: './folder-editor.component.html',
  styleUrl: './folder-editor.component.css'
})
export class FolderEditorComponent {
  @Input() folder!: Folder;
  @Input() depth: number = 0;
  @Output() delete = new EventEmitter<void>();

  addSubfolder() {
    if (!this.folder.subFolders) {
      this.folder.subFolders = [];
    }
    this.folder.subFolders.push({
      name: '',
      description: '',
      subFolders: []
    });
  }

  removeSelf() {
    this.delete.emit();
  }

}
