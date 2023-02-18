import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserSignup } from 'src/app/core/models/user/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss']
})
export class AdminUsersPageComponent implements OnInit {
  users:IUserSignup[]=[]
  inputEmail="";
  
  constructor(private activatedRoute:ActivatedRoute,private authenticationService:AuthenticationService,private router:Router ) { }

  ngOnInit(): void {
   this.users=this.activatedRoute.snapshot.data['users']||[];
  }

  onSubmit(){
    if(!this.inputEmail)return
  this.authenticationService.loginAsUser(this.inputEmail).subscribe((response)=>{
    this.router.navigateByUrl('/home')
  })

  }



}
