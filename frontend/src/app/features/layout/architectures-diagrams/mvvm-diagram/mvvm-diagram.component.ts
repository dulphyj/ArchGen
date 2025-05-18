import { AfterViewInit, Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-mvvm-diagram',
  imports: [],
  templateUrl: './mvvm-diagram.component.html',
  styleUrl: './mvvm-diagram.component.css'
})
export class MvvmDiagramComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  }

}
