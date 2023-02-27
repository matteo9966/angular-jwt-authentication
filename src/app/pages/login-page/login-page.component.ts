import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/core/models/login/login.request';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  submitLoginData(data: LoginRequest) {
    this.authenticationService.login(data).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/user-home');
      },
      error: (error) => {
        
      },
      complete: () => {},
    });
  }
}
