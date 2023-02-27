import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //this request should handle request if token is expired:
    //use a flag like "retry" if i should retry

    const reqClone = req.clone({ headers: req.headers.delete('skip', 'true') });

    return next.handle(reqClone).pipe(
      catchError((err) => {
        if (err.status === 401 && !req.url.includes('login')) {
          return this.handleRefreshToken(req, next);
        }
        return EMPTY;
      })
    );
  }

  handleRefreshToken(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthenticationService); // approfondisci sta cosa
    return authService.refresh().pipe(
      switchMap((resp) => {
        return next.handle(req); // ripeto la richiesta con il sessiontoken fresco
      })
    );
  }
}

//1JWKS  endpoint ?? OBBIETTIVO AVERE UN JWKS entro pomeriggio e sviluppare un mbac
