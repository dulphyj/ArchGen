import { AfterViewInit, Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-hexagonal-diagram',
  imports: [],
  templateUrl: './hexagonal-diagram.component.html',
  styleUrl: './hexagonal-diagram.component.css'
})
export class HexagonalDiagramComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  }

}
