import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  shareReplay,
  tap,
} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginResponse } from '../models/login.response';
import * as moment from 'moment';
import { extractJWTPayload } from '../utils/extract-jwt-payload';
import { API_URLS } from '../API/apiURL';
import { IUser, IUserSignup } from '../models/user/user';
import { environment } from 'src/environments/environment';
import { LoginRequest } from '../models/login/login.request';
import { LoginResponse } from '../models/login/login.response';
import { getAllUsersResponse } from '../models/getAllUsers/getAllUsers.response';

const anonimous_USER: IUser = {
  email: '',
  username: '',
  id: '',
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

  private ADMIN_AS_USER_URL = `${this.BASE}${environment.admin}${environment.admin}`;
  private subject = new BehaviorSubject<IUser | undefined>(anonimous_USER);
  public user$ = this.subject.pipe(filter((user) => Boolean(user)));
  public isLoggedIn$ = this.user$.pipe(map((user) => Boolean(user?.id)));
  public isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));

  constructor(private http: HttpClient) {
    this.getUserSession().subscribe((user) => this.subject.next(user));
  }

  signup(user: IUserSignup) {
    return this.http
      .post<IUser>(this.SIGNUP_URL, user, {
        headers: { skipInterceptor: 'true' },
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
        headers: { skipInterceptor: 'true' },
      })
      .pipe(shareReplay());
  }

  logout() {
    return this.http
      .post(this.LOGOUT_URL, null, { headers: { skipInterceptor: 'true' } })
      .pipe(
        shareReplay(),
        tap(() => {
          this.subject.next(anonimous_USER); // emetto un utente nullo
        })
      );
  }

  login(loginRequest: LoginRequest) {
    return this.http
      .post<LoginResponse>(this.LOGIN_URL, loginRequest, {
        headers: { skipInterceptor: 'true' },
      })
      .pipe(
        shareReplay(),
        tap((user) => {
          this.subject.next(user);
        })
      );
  }

  loginAsUser(userEmail: string) {
    return this.http.post<LoginResponse>(
      this.ADMIN_AS_USER_URL,
      { email: userEmail },
      {
        headers: { skipInterceptor: 'true' },
      }
    );
  }


}
