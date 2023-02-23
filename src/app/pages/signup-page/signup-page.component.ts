import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserSignup } from 'src/app/core/models/user/user';
import { emailExistsAsyncValidator } from 'src/app/core/validators/email-exists.asyncValidator';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  ngOnInit(): void {
  }

  //i dati da mandare al backend
  submitFormData(data:IUserSignup){
    console.log(data);
  }

}
