import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '../constants/userRoles';
import { AuthenticationService } from '../services/authentication.service';

@Directive({
  selector: '[rbacAllow]',
})
export class RbacAllowDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthenticationService
  ) {}

  @Input()
  set rbacAllow(allowedRoles: (keyof typeof UserRoles)[]) {}
}
