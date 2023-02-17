import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { AdminModule } from 'src/app/admin-home/admin.module';
import { IUserSignup } from '../../models/user/user';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class GetAllUsersResolverService
  implements Resolve<IUserSignup[] | null>
{
  constructor(private userService: UserService,private router:Router) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IUserSignup[] | null> {

    //deve restituirmi una promessa
    return this.userService.getAllUsers().pipe(
      map((users) => {
        if (!users) {
          this.router.navigateByUrl('/admin')
          console.log('no users')
          return null;
        }
        return users.users;
      })
    );
  }
}
