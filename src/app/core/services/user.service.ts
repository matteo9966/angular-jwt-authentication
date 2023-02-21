import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userExistsRequest } from '../models/user/userExists.request';
import { userExistsResponse } from '../models/user/userExists.response';
import { getAllUsersResponse } from '../models/getAllUsers/getAllUsers.response';
import { IUser } from '../models/user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private BASE = environment.base;
  private GET_ALL_USERS_URL = `${this.BASE}${environment.getAllUsers}`;
  private VERIFY_EMAIL_URL = `${this.BASE}${environment.verifyEmail}`;
  private WHOAMI_URL=`${this.BASE}${environment.whoami}`
  constructor(private httpClient: HttpClient) {}
  userEmailExists(email: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'skipInterceptor':'true'
    })
    return this.httpClient
      .post<userExistsResponse>(this.VERIFY_EMAIL_URL, { email },{headers})
      .pipe(
        tap({
          error: (error) => {
            console.log('error while trying to verify if email exists');
          },
        }),
        // shareReplay(), TODO: come si usa sto share replay??
        map((response) => {
          return response.exists;
        }),
        catchError((error) => of(false))
      );
  }

  getAllUsers() {
    return this.httpClient.get<getAllUsersResponse>(this.GET_ALL_USERS_URL, {
      headers: { skipInterceptor: 'true' },
    });
  }

  whoami(){
    return this.httpClient.get<IUser>(this.WHOAMI_URL)
  }
}
