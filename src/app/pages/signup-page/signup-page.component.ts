import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserSignup } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { emailExistsAsyncValidator } from 'src/app/core/validators/email-exists.asyncValidator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  ngOnInit(): void {
  }
  constructor(private authenticationService:AuthenticationService,private router:Router){}
  //i dati da mandare al backend
  submitFormData(data:IUserSignup){
    
    this.authenticationService.signup(data).subscribe((user)=>{
      console.log('signup completed:',user);
      this.router.navigateByUrl('/user-home')
    });
  }

}
