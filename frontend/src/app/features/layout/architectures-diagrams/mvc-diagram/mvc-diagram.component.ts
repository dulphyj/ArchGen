import { AfterViewInit, Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-mvc-diagram',
  imports: [],
  templateUrl: './mvc-diagram.component.html',
  styleUrl: './mvc-diagram.component.css'
})
export class MvcDiagramComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  }
}
