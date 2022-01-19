import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { TokenService } from './amadeus-token.service';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + btoa(environment.AMADEUS_CLIENT_ID + ':' + environment.AMADEUS_CLIENT_SECRET)
  })
};

@Injectable()
export class AuthService {
  redirectUrl = '';

  private static handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'))
  }

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
  ) { }

  refreshToken(): Observable<any> {
    this.tokenService.removeToken();
    let body = `grant_type=client_credentials&client_id=${environment.AMADEUS_CLIENT_ID}&client_secret=${environment.AMADEUS_CLIENT_SECRET}`;

    return this.http.post<any>(environment.apiURL, body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.tokenService.saveToken(res.access_token);
        }),
        catchError(AuthService.handleError)
      );
  }
}
