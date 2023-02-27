import { Injectable,Inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserRoles } from "../constants/userRoles";
import { AuthenticationService } from "../services/authentication.service";


//sto provando a creare un role guard service usando un factory
export class AuthorizationGuard implements CanActivate{
    constructor(
        private admitted_roles:(keyof typeof UserRoles)[],
        @Inject(AuthenticationService) private authenticationService:AuthenticationService,
    ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {


        return true;
    }


}