import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ViewService } from './core/services/view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-jwt-authentication';
  constructor(private router: Router, private viewService:ViewService) {

    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        console.log(event)
      }
  })

  // router.navigateByUrl('/admin/users')
}

hideLogin(){
  this.viewService.changeShowLogin(false)
}

}
