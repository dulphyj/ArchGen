import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, value);
  }
  getItem(key: string): any {
    return sessionStorage.getItem(key);

  }
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
