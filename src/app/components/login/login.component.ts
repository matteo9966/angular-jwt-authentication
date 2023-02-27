import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from 'src/app/core/models/login/login.request';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() formData = new EventEmitter<LoginRequest>();
  loginForm:FormGroup
  constructor(private fb:FormBuilder) { 
    this.loginForm = new FormGroup({
      email:this.fb.control('',[Validators.email,Validators.required]),
      password:this.fb.control('',[Validators.required]),
    })
  }

  ngOnInit(): void {
  }


  submit(){
    
    if(this.disabled){
      return
    }
    this.formData.emit(this.loginForm.value as LoginRequest);

  }

  get emailControl(){
    return this.loginForm.get('email') as FormControl
  }
  get passwordControl(){
    return this.loginForm.get('password') as FormControl
  }

  get disabled(){
    return !(this.loginForm.valid && this.emailControl.valid && this.passwordControl.valid)
  }

}
