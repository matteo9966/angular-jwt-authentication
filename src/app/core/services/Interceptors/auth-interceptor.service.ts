import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { AuthServiceService } from '../auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authentication:AuthServiceService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

  
    const skip = req.headers.has('skipInterceptor')
    if(skip){
      const requestClone = req.clone();
      requestClone.headers.delete('skipInterceptor')
      return next.handle(requestClone)
    }

    const idToken = localStorage.getItem('id_token');

    //FIXME: ho cambiato la logica vedi SKIPINTERCEPTOR
    //posso intercettare anche in base all'url
    if(!req.url.toLowerCase().includes('login')){
      //tutte le richieste oltre a quelle di login devono avere l'utente autenticato
      if(!this.authentication.isLoggedIn()){
        console.log('non sei loggato, non ti faccio fare la richiesta ! ');
        return EMPTY // annulla la richiesta
      }
    }

    if (!idToken) {
      return next.handle(req);
    }

    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${idToken}`),//anche headers è immutabile 
    });
  

    return next.handle(cloned).pipe(
      catchError(err=>{
        
        //todo : se il token è scaduto fai il refresh del token
        if(!"todo: token ancora valido e non scaduto"){
           this.handleRefreshToken(req,next);
        }

        return throwError(err);
      })
    );
  }

  handleRefreshToken(    
    req: HttpRequest<any>,
    next: HttpHandler){
     
  }
}

//1JWKS  endpoint ?? OBBIETTIVO AVERE UN JWKS entro pomeriggio e sviluppare un mbac