import {Component} from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../core/services/auth-service.service';
import { AuthenticationService } from '../core/services/authentication.service';

@Component(
    {
        templateUrl:'./navbar.component.html',
        styleUrls:['./navbar.component.scss'],
        selector:'app-navbar'
    }
)
export  class NavbarComponent {
   showLogin=false; 
   isLoggedIn$!:Observable<boolean>
   isLoggedOut$!:Observable<boolean>
   constructor(private authService:AuthenticationService){
      this.isLoggedIn$ = this.authService.isLoggedIn$;
      this.isLoggedOut$ = this.authService.isLoggedOut$;
   }
   clickAccedi(){
    this.showLogin = !this.showLogin
   }

   clickLogout(){
    this.authService.logout().subscribe();
   }
}