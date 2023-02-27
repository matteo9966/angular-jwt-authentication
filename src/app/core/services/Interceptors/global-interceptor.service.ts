import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { ViewService } from '../view.service';

@Injectable()
export class GlobalInterceptorService implements HttpInterceptor {
  constructor(private viewService: ViewService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          console.log(error);
          if (error.error instanceof ErrorEvent) {
            console.log('error event error');
            throw error;
          } else {
            this.viewService.changeshowErrorBanner(true);
            this.viewService.bannerErrorMessage$.next(
              `${error.status} - ${error.error} `
            );
          }
        }
        throw error;
      })
    );
  }
}
