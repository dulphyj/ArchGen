import { AfterViewInit, Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-feature-based-diagram',
  imports: [],
  templateUrl: './feature-based-diagram.component.html',
  styleUrl: './feature-based-diagram.component.css'
})
export class FeatureBasedDiagramComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  }

}
