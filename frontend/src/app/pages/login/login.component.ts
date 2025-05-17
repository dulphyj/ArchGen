import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClerkSignInComponent } from 'ngx-clerk-iliad';


@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, ClerkSignInComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
}
