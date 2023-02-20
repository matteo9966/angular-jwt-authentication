import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { IUser } from '../../models/user/user';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GetUserResolverService implements Resolve<IUser|null>{
 
  constructor(private authenticationService:AuthenticationService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IUser|null>  {
    
    return this.authenticationService.getUserSession().pipe(map(user=>{
      if(!user) return null;
      return user
    }))
  }
}
