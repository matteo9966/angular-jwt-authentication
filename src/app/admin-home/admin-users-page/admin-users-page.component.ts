import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUserSignup } from 'src/app/core/models/user/user';

@Component({
  selector: 'app-admin-users-page',
  templateUrl: './admin-users-page.component.html',
  styleUrls: ['./admin-users-page.component.scss']
})
export class AdminUsersPageComponent implements OnInit {
  users:IUserSignup[]=[]
  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
   this.users=this.activatedRoute.snapshot.data['users']||[];
  }

}
