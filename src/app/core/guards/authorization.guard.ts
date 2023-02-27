import { Injectable, Inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { UserRoles } from '../constants/userRoles';
import { AuthenticationService } from '../services/authentication.service';
import _ from 'lodash';

//sto provando a creare un role guard service usando un factory
export class AuthorizationGuard implements CanLoad {
//   constructor(
//     private admitted_roles: (keyof typeof UserRoles)[],
//     @Inject(AuthenticationService)
//     private authenticationService: AuthenticationService,
//     @Inject(Router) private router: Router
//   ) {}
  constructor(
    private admitted_roles: (keyof typeof UserRoles)[],
   
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return this.authenticationService.user$.pipe(
            map((user) => {
              if (_.intersection(user?.roles, this.admitted_roles).length > 0) {
                return true;
              } else {
                return this.router.createUrlTree(['/unauthorized']);
              }
            })
          );
    }
}
