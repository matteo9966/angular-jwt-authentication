import { Injectable } from '@angular/core';

import { BehaviorSubject, scan ,tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private showLogin=new BehaviorSubject(false);
  showLogin$ = this.showLogin.asObservable().pipe(tap((change)=>{console.log('change',change)}))
  constructor() { }

   changeShowLogin(next:boolean){
    const currentValue = this.showLogin.value;
    if(currentValue==next ){
      return
    }
    this.showLogin.next(next);
   }



}
