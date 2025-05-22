import { Injectable, signal } from '@angular/core';
import { ClerkService } from 'ngx-clerk-iliad';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated = signal(false);
  userName = signal<string | null>(null);
  imageUrl = signal<string | null>(null);
  clerkId = signal<string | null>(null);

  constructor(private clerk: ClerkService) {
  }

  loadUser(): void {
    this.clerk.clerk$.pipe(take(1))
    this.clerk.user$.pipe(take(1))
      .subscribe(user => {
        if (user?.id) {
          this.isAuthenticated.set(true);
          this.userName.set(user.username ?? null);
          this.imageUrl.set(user.imageUrl ?? null);
          this.clerkId.set(user.id ?? null);
          sessionStorage.setItem('clerkId', user.id);
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
        sessionStorage.clear();
        localStorage.clear();
      })
  }
}

