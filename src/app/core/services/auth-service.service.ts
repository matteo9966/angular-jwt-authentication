import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, ignoreElements, shareReplay, tap,map } from 'rxjs';
import { ILoginResponse } from '../models/login.response';
import * as moment from 'moment';
import { extractJWTPayload } from '../utils/extract-jwt-payload';
import { API_URLS } from '../API/apiURL';
import { IUser, IUserSignup } from '../models/user/user';

const ANONIMOUS_USER:IUser = {
  username: '',
  email: '',
  id:void 0 //undefined
}

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private base = '/api';
  private SIGNUP_URL = `${this.base}${API_URLS.signup}`
  private LOGIN_URL = `${this.base}${API_URLS.login}`

  private subject = new BehaviorSubject(ANONIMOUS_USER)

  public user$ = this.subject.asObservable().pipe(filter((user)=>!!user.id)) //se non ha id è undefined

  public isLoggedIn$ = this.user$.pipe(map(user=>!!user.id))
  public isLoggedOut$ = this.isLoggedIn$.pipe(map(isLogged=>!isLogged))

  private baseURL = 'http://localhost:9000';
  constructor(private http:HttpClient) { }

  login(codiceUtente:number,password:string){
    const headers = new HttpHeaders({
      'skipInterceptor':'true'
    })
    return this.http.post<ILoginResponse>(`${this.baseURL}/login`,{codiceUtente,password},{headers}).pipe(tap(this.setSession),shareReplay());
  }

  private setSession(authResult:ILoginResponse){
     const expiresAt = moment().add(+authResult.expiresIn,'d');
     localStorage.setItem('id_token',authResult.idToken);
     localStorage.setItem('expires_at',JSON.stringify(expiresAt));



  }

  logout(){
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }

  //FIXME: rimuovi o aggiorna 
  isLoggedIn(){
    const expiration = this.getExpiration();
    if(!expiration) return false;
    return moment().isBefore(expiration);
  }

  isLoggedOut(){
    return !this.isLoggedIn;
  }
  //FIXME: rimuovi o aggiorna
  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    if(!expiration) return;

    const expiresAt = JSON.parse(expiration);
    
    return moment(expiresAt);
}   
 //FIXME:rimuovi o aggiorna
  haveAccess(role:string){
    const token = localStorage.getItem('id_token');
    if(!token) return false;
    const payload = extractJWTPayload(token);
    if(!payload) return false;
    const payloadObj = JSON.parse(payload);
    if(role===payloadObj){
      return true
    }
    return false
  }

  signup(user:IUserSignup){
      return this.http.post<IUser>(this.SIGNUP_URL,user,{headers:{skipInterceptor:"true"}}).pipe(shareReplay(),tap((user)=>{
        this.subject.next(user)
      }))
  }

}
