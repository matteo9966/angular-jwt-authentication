import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';
import { NavbarComponent } from './navbar/navbar.component';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { AuthInterceptorService } from './core/services/Interceptors/auth-interceptor.service';
import { SignupModule } from './signup/signup.module';
import { HomeComponent } from './home/home.component';
import { RbacAllowDirective } from './core/directives/rbacAllow.directive';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthenticationService } from './core/services/authentication.service';
import { Router } from '@angular/router';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { ErrorBannerComponent } from './error-banner/error-banner.component';
import { ShowErrorDirective } from './core/directives/show-error.directive';
import { GlobalInterceptorService } from './core/services/Interceptors/global-interceptor.service';

const authorizationGuardFactoryUser = (
  authService: AuthenticationService,
  router: Router
) => {
  return new AuthorizationGuard(['USER'], authService, router);
};
const authorizationGuardFactoryAdmin = (
  authService: AuthenticationService,
  router: Router
) => {
  return new AuthorizationGuard(['ADMIN'], authService, router);
};
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RbacAllowDirective,
    UnauthorizedComponent,
    ErrorBannerComponent,
    ShowErrorDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      //TODO non aggiunge questo header per qualche motivo :(
      cookieName: 'XSRF-TOKEN',
      headerName: 'x-XSRF-TOKEN',
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptorService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: GlobalInterceptorService,
    },
    {
      provide: 'userAuthorizationGuard',
      useFactory: authorizationGuardFactoryUser,
      deps: [AuthenticationService, Router],
    },
    {
      provide: 'adminAuthorizationGuard',
      useFactory: authorizationGuardFactoryAdmin,
      deps: [AuthenticationService, Router],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
