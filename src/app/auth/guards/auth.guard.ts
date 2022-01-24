import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.checkToken();
  }

  checkToken(): Observable<boolean> {
    // return !!this.amadeusTokenService.getToken();
    return this.authService.getToken().pipe(
      switchMap((token: string) => {
        return token ? of(true): of(false);
      })
    )
  }

}
