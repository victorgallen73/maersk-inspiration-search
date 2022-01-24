import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, delayWhen, Observable, repeat, ReplaySubject, tap, throwError, timer } from 'rxjs';
import { AmadeusToken } from '../models/amadeus-token';
import { AmadeusTokenService } from './amadeus-token.service';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    // Authorization: 'Basic ' + btoa(environment.AMADEUS_CLIENT_ID + ':' + environment.AMADEUS_CLIENT_SECRET)
  })
};

@Injectable(
  { providedIn: "root"
})
export class AuthService {

  accessToken$: ReplaySubject<string> = new ReplaySubject<string>(1);

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
    private amadeusTokenService: AmadeusTokenService,
  ) {
    // get token from API
    this.refreshToken().subscribe();
  }

  getToken(): Observable<string> {
    return this.accessToken$.asObservable();
  }

  private refreshToken(): Observable<any> {
    this.amadeusTokenService.removeToken();
    let body = `grant_type=client_credentials&client_id=${environment.AMADEUS_CLIENT_ID}&client_secret=${environment.AMADEUS_CLIENT_SECRET}`;
    return this.http.post<any>(environment.apiURL + '/security/oauth2/token', body, HTTP_OPTIONS)
      .pipe(
        tap(res => {
          this.amadeusTokenService.saveToken(res.access_token);
          this.accessToken$.next(res.access_token);
        }),
        delayWhen((token: AmadeusToken) => timer(token.expires_in * 1000)),
        repeat(),
        catchError(AuthService.handleError)
      );
  }
}
