import { Injectable } from '@angular/core';

import { BehaviorSubject, scan, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ViewService {
  private showLogin = new BehaviorSubject(false);
  showLogin$ = this.showLogin.asObservable().pipe(tap((change) => {})); //TODO rimuovi nella nuova versione
  showErrorBanner$ = new BehaviorSubject(false);
  bannerErrorMessage$ = new BehaviorSubject('');

  constructor() {}

  changeShowLogin(next: boolean) {
    const currentValue = this.showLogin.value;
    if (currentValue == next) {
      return;
    }
    this.showLogin.next(next);
  }

  changeshowErrorBanner(newState: boolean) {
    this.showErrorBanner$.next(newState);
    if (newState) {
      setTimeout(() => this.showErrorBanner$.next(false), 2000);
    }
  }
}
