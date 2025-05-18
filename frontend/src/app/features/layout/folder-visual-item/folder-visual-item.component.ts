import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-folder-visual-item',
  imports: [CommonModule],
  templateUrl: './folder-visual-item.component.html',
  styleUrl: './folder-visual-item.component.css'
})
export class FolderVisualItemComponent {
  @Input() folder: any;
  @Input() depth = 0;
}
