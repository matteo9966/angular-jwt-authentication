import {
  Directive,
  Input,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserRoles } from '../constants/userRoles';
import { IUser } from '../models/user/user';
import { AuthenticationService } from '../services/authentication.service';
import _ from 'lodash';
@Directive({
  selector: '[appRbacAllow]',
})
export class RbacAllowDirective implements OnDestroy {
  allowedRoles: string[] = [];
  user: IUser | undefined;
  subscriptions: Subscription[] = [];
  private allowed: (keyof typeof UserRoles)[] = [];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthenticationService
  ) {
    this.subscriptions.push(
      this.authService.user$.subscribe((user) => {
        this.user = user;
        this.showIfAllowedRoles(user?.roles || []);
      })
    );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  @Input()
  set appRbacAllow(allowedRoles: (keyof typeof UserRoles)[]) {
    this.allowed = allowedRoles;
  }

  showIfAllowedRoles(userRoles: string[]) {
    const show =
      _.intersection(this.allowed || [], this.user?.roles || []).length > 0;
    if (show) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
