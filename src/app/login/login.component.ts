import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUserLogin } from '../core/models/user/user';
import { AuthServiceService } from '../core/services/auth-service.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  selector:'app-login'
})
export class LoginComponent {
    submitted=false;
  user: IUserLogin = { // two way binding con queste proprietà quindi posso
    codiceUtente: null,
    password: '',
  };
  
  constructor(private authService:AuthServiceService,private router:Router){

  }

  submit(){
    console.log("submitted: ",this.user);
    
    // if(!this.user.codiceUtente || !this.user.password){
    //   return;
    // } 
    this.authService.cookie();
    return
    this.authService.login(+this.user.codiceUtente!,this.user.password).subscribe(result=>{
      this.router.navigate(['/customer/home'])
      console.log('user is logged:',this.authService.isLoggedIn())
       if(this.authService.isLoggedIn()){
      }
    })
  }
}
