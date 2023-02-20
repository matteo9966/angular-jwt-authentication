import { Component, OnDestroy } from '@angular/core';
import { Observable} from 'rxjs';
import { AuthenticationService } from '../core/services/authentication.service';
import { ViewService } from '../core/services/view.service';

@Component({
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  selector: 'app-navbar',
})
export class NavbarComponent implements OnDestroy {
  showLogin = false;
  showLogin$: Observable<boolean>;
  isLoggedIn$!: Observable<boolean>;
  isLoggedOut$!: Observable<boolean>;
  stillAlive = true;
  
  constructor(
    private authService: AuthenticationService,
    private viewService: ViewService
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.isLoggedOut$ = this.authService.isLoggedOut$;
    this.showLogin$ = this.viewService.showLogin$;
    // this.showLogin$
    //   .pipe(takeWhile(() => this.stillAlive))
    //   .subscribe((show) => (this.showLogin = show));
  }
  ngOnDestroy(): void {
    this.stillAlive = false;
  }

  clickAccedi() {
    this.viewService.changeShowLogin(true);
  }

  clickLogout() {
    this.authService.logout().subscribe();
  }
}
