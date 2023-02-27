import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  EMPTY,
  filter,
  map,
  shareReplay,
  tap,
} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IUser, IUserSignup } from '../models/user/user';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login/login.request';
import { LoginResponse } from '../models/login/login.response';
import { Router } from '@angular/router';

const anonimous_USER: IUser = {
  email: '',
  username: '',
  id: '',
  roles: [],
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private BASE = environment.base;
  private SIGNUP_URL = `${this.BASE}${environment.signupURL}`;
  private LOGOUT_URL = `${this.BASE}${environment.logout}`;
  private LOGIN_URL = `${this.BASE}${environment.login}`;
  private USER_URL = `${this.BASE}${environment.user}`;
  private REFRESH_URL = `${this.BASE}${environment.refresh}`;

  private ADMIN_AS_USER_URL = `${this.BASE}${environment.admin}${environment.loginAsUser}`;
  private subject = new BehaviorSubject<IUser | undefined>(anonimous_USER);
  public user$ = this.subject.pipe(filter((user) => Boolean(user)));
  public isLoggedIn$ = this.user$.pipe(map((user) => Boolean(user?.id)));
  public isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

  constructor(private http: HttpClient,private router:Router) {
    this.getUserSession().subscribe((user) => this.subject.next(user));
  }

  signup(user: IUserSignup) {
    return this.http
      .post<IUser>(this.SIGNUP_URL, user, {
        headers: { skip: 'true' },
      })
      .pipe(
        shareReplay(),
        tap((user) => {
          console.log(user);
          this.subject.next(user);
        })
      );
  }
  getUserSession() {
    return this.http
      .get<IUser | undefined>(this.USER_URL, {
        headers: { skip: 'true' },
      })
      .pipe(shareReplay());
  }

  logout() {
    return this.http
      .post(this.LOGOUT_URL, null, { headers: { skip: 'true' } })
      .pipe(
        shareReplay(),
        tap(() => {
          this.subject.next(anonimous_USER); // emetto un utente null
          this.router.navigateByUrl('/home')
        })
      );
  }

  login(loginRequest: LoginRequest) {
    return this.http
      .post<LoginResponse>(this.LOGIN_URL, loginRequest, {
        headers: { skip: 'true' },
      })
      .pipe(
        shareReplay(),
        tap((user) => {
          this.subject.next(user);
        })
      );
  }

  loginAsUser(userEmail: string) {
    return this.http
      .post<LoginResponse>(
        this.ADMIN_AS_USER_URL,
        { email: userEmail },
        {
          headers: { skip: 'true' },
        }
      )
      .pipe(
        shareReplay(),
        tap((user) => {
          this.subject.next(user);
        })
      );
  }

  refresh() {
    const email = this.subject.value?.email;
    return this.http.post(this.REFRESH_URL, { email: email || '' }).pipe(
      tap({
        error: (err) => {
          console.log(err);
        },
      }),
      shareReplay(),
      catchError(() => {
        return EMPTY; // non voglio che fa nulla se c'è un errore
      })
    );
  }

  get username$(){
    return this.user$.pipe(map(user=>user?.username?user.username:"no_username"))
  } 
  get email$(){
    return this.user$.pipe(map(user=>user?.email?user.email:"no_email"))
  }
  get roles$(){
    return this.user$.pipe(map(user=>user?.roles?user.roles:[]))
  }
}
