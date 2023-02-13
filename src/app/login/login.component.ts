import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest } from '../core/models/login/login.request';
import { AuthServiceService } from '../core/services/auth-service.service';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  selector:'app-login'
})
export class LoginComponent {
    submitted=false;


  loginRequest:LoginRequest = {
    password:'',
    email:'',
  }
  
  constructor(private router:Router,private authenticationService:AuthenticationService){

  }

  submit(){
    if(!this.loginRequest.password || !this.loginRequest.email){
      console.log('missing password or email')
      return
    } 

    this.authenticationService.login(this.loginRequest).subscribe(()=>{
      this.router.navigateByUrl('/home');
    })

     


  }
}
