import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from "../../features/layout/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) { }

  goToAComponentAndHighlightButton() {
    this.router.navigate(['/architecture/HEXAGONAL'], { queryParams: { highlightButton: true } });
  }

}
