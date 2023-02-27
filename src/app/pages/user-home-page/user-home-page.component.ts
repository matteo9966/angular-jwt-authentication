import { Component, OnInit } from '@angular/core';
import { Observable,map } from 'rxjs';
import { IUser } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss']
})
export class UserHomePageComponent implements OnInit {
  user$:Observable<IUser|undefined>
  constructor(private authenticationService:AuthenticationService) { 
    this.user$ = this.authenticationService.user$
  }

  ngOnInit(): void {
  }

  get username$(){
    return this.authenticationService.username$
  } 
  get email$(){
    return this.authenticationService.email$
  }
  get roles$(){
    return this.authenticationService.roles$
  }

}
