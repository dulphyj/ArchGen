import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../../features/layout/footer/footer.component";
import { TourControllerService } from '../../core/services/tour-controller.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports: [RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly tourService = inject(TourControllerService)

  constructor(private router: Router, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.tourService.initializeTour();
  }

  goToAComponentAndHighlightButton() {
    this.router.navigate(['/architecture/HEXAGONAL'], { queryParams: { highlightButton: true } });
    this.toastr.info('Presiona el botón de descarga para obtener tu primera plantilla.', 'Descarga tu primera plnatilla', { timeOut: 4000 })
  }

  startTour() {
    this.tourService.initTour.set(true);
    this.router.navigate(['/architecture/HEXAGONAL'])
  }
}
