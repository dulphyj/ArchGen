import { inject, Injectable, signal } from '@angular/core';
import { ClerkService } from 'ngx-clerk-iliad';
import { SessionStorageService } from './session-storage.service';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = signal(false);

  constructor(private clerk: ClerkService, private sessionStorage: SessionStorageService) {
  }

  loadUser(): void {
    this.clerk.user$.pipe(take(1))
      .subscribe(user => {
        if (user?.id) {
          this.isAuthenticated.set(true);
          this.sessionStorage.setItem('userName', user.username);
          this.sessionStorage.setItem('clerkId', user.id);
          console.log(`Usuario autenticado: ${user.username}`);
        } else {
          this.isAuthenticated.set(false);
          console.warn("No se encontro usuario")
        }
      })

  }

  logout(): void {
    this.clerk.clerk$.pipe(take(1))
      .subscribe(clerkIns => {
        clerkIns.signOut();
        this.isAuthenticated.set(false);
        this.sessionStorage.removeItem('clerkId');
        this.sessionStorage.removeItem('userName');
      })
  }
}

