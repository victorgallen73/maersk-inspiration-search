import {ErrorHandler, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Issues } from '../models/issue';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(
      private _snackBar: MatSnackBar,
      private errorHandler: ErrorHandler,
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      console.log("Passed through the interceptor in request");

        return next.handle(request)
            .pipe(
              map(res => {
                console.log("Passed through the interceptor in response");
                return res
              }),
              catchError((error: HttpErrorResponse) => this.handleHttpError(error))
            )
    }

    private handleHttpError(error: HttpErrorResponse): Observable<any> {
      let message = '';
      const errors: Issues = error.error.errors;

      errors.forEach(error => {
        message = message === '' ?
          error.title + ': ' + error.detail :
          message + ' ** ' + error.title + ': ' + error.detail
      });

      // TODO: Catch differently the errors using a switch
      // switch (error.status) {
      //   case 400:
      //     message = 'ERROR_HANDLER.BAD_REQUEST';
      //     break;
      //   case 404:
      //     message = 'ERROR_HANDLER.NOT_FOUND';
      //     break;
      //   case 500:
      //     message = 'ERROR_HANDLER.CONFLICT';
      //     break;
      //   default:
      //     message = 'ERROR_HANDLER.UNDEFINED';
      // }

      this._snackBar.open(message, 'CLOSE',);
      this.errorHandler.handleError(error);
      throw error;
    }

}
