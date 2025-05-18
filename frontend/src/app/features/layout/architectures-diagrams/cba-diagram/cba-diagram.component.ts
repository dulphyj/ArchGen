import { AfterViewInit, Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-cba-diagram',
  imports: [],
  templateUrl: './cba-diagram.component.html',
  styleUrl: './cba-diagram.component.css'
})
export class CbaDiagramComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  }

}
