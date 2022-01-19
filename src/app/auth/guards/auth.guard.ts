import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/amadeus-token.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;

    return this.checkToken(url);
  }

  checkToken(url: string): boolean {
    if (this.tokenService.getToken()) {
      return true;
    }
    this.authService.refreshToken();
    this.authService.redirectUrl = url;

    this.router.navigate(['']).then(_ => false);
    return false;
  }

}
