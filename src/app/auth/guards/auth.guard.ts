import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AmadeusTokenService } from '../services/amadeus-token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private amadeusTokenService: AmadeusTokenService,
    private router: Router) {
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
