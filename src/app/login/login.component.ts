import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../core/models/login/login.request';
import { AuthServiceService } from '../core/services/auth-service.service';
import { AuthenticationService } from '../core/services/authentication.service';
import { ViewService } from '../core/services/view.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  selector: 'app-login',
})
export class LoginComponent {
  submitted = false;

  loginRequest: LoginRequest = {
    password: '',
    email: '',
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private eRef: ElementRef,
    private viewService: ViewService
  ) {}

  // @HostListener('click', ['$event'])
  // clickout(event: Event) {
  //   if (!this.eRef.nativeElement.contains(event.target)) {
        
  //     this.viewService.changeShowLogin(false); //se sono fuori nascondi, se sto già nascondendo non fare nulla
  //   }else{
  //     this.viewService.changeShowLogin(true);
  //   }
  // }

  submit() {
    if (!this.loginRequest.password || !this.loginRequest.email) {
      console.log('missing password or email');
      return;
    }

    this.authenticationService.login(this.loginRequest).subscribe(() => {
      this.router.navigateByUrl('/home');
      this.viewService.changeShowLogin(false)
    });
  }
}
