import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AmadeusTokenService {

  constructor() {
  }

  getToken(): string | null {
    return localStorage.getItem(environment.tokenKey);
  }

  saveToken(token: string): void {
    localStorage.setItem(environment.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(environment.tokenKey);
  }

}
