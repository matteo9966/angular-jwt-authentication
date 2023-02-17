import { Component, NgModule, OnInit } from '@angular/core';
import { GetAllUsersResolverService } from '../core/guards/resolvers/get-all-users-resolver.service';
import { AuthenticationService } from '../core/services/authentication.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {

  constructor(private authenticationService:AuthenticationService, private userResolver:GetAllUsersResolverService) { }

  ngOnInit(): void {
  }

  

}

