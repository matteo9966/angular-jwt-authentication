import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authenticationService:AuthenticationService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const roles =Array.from( route.data['roles'] || []) //ricevo i roles a cui posso accedere da questo array 
     
    return this.authenticationService.user$.pipe(map(user=>{
      if(_.intersection(user?.roles||[],roles).length>0){
        return true
      }else{
        return this.router.parseUrl('/unauthorized');
      }
    }))
    
  }
  
}
