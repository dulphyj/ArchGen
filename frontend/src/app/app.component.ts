import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClerkService } from 'ngx-clerk-iliad';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ArchGen';
  constructor(private _clerk: ClerkService) {
    this._clerk.__init({
      publishableKey: 'pk_test_cXVpY2stZWxlcGhhbnQtNTAuY2xlcmsuYWNjb3VudHMuZGV2JA'
    })
    this._clerk.clerk$.subscribe(clerk => {
      if (clerk) {
        console.log('Clerk ha cargado correctamente');
      } else {
        console.error('Clerk no se ha cargado');
      }
    });
  }
}
