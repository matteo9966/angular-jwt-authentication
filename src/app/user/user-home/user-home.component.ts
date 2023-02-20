import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/core/models/user/user';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  user:IUser|undefined;


  constructor(private router:Router,private activatedRoute:ActivatedRoute) { 

    this.user = this.activatedRoute.snapshot.data['user']; // aggiunto con il resolve guard

  }

  ngOnInit(): void {
  }

  get id(){
    return this.user?.id|| 'no id'
  }

  get roles(){
    return this.user?.roles || []
  }
  get username(){
    return this.user?.username || 'no username'
  }
  get email(){
    return this.user?.email || 'no email'
  }

}
