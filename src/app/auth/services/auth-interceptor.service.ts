import { HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { AmadeusTokenService } from './amadeus-token.service';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptorService {

  constructor(
    private amadeusTokenService: AmadeusTokenService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): any {

    const token = this.amadeusTokenService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    // this.authService.getToken().pipe(
    //   filter((token: string) => token !== undefined),
    //   tap((token: string) => this.setTokenToHeader(token, request))
    // ).subscribe();

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'content-type': 'application/json'
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.error.error);
        return throwError(() => new Error('Error ocurred: ' + error.error.error));
      }));
  }
}
