import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userExistsRequest } from '../models/user/userExists.request';
import { userExistsResponse } from '../models/user/userExists.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  urls = {
    verifyEmail: `/api/signup/verify-email`,
  };
  userEmailExists(email: string): Observable<boolean> {
    const headers = new HttpHeaders({
      'skipInterceptor':'true'
    })
    return this.httpClient
      .post<userExistsResponse>(this.urls.verifyEmail, { email },{headers})
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
}
