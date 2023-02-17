import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IUserSignup } from '../core/models/user/user';
import { UserService } from '../core/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  users$: Observable<IUserSignup[]>;
  private users = new BehaviorSubject<IUserSignup[]>([]);

  constructor(private usersService: UserService) {
    this.users$ = this.users.asObservable();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe((users) => {
      this.users.next(users.users);
    });
  }
}
