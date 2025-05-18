import { AfterViewInit, Component } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-microkernel-diagram',
  imports: [],
  templateUrl: './microkernel-diagram.component.html',
  styleUrl: './microkernel-diagram.component.css'
})
export class MicrokernelDiagramComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      new bootstrap.Tooltip(el);
    });
  }

}
