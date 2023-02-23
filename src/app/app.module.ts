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
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { SharedComponentModule } from './components/shared/SharedComponents.module';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RbacAllowDirective,
    UnauthorizedComponent,
    LoginComponent,
    LoginPageComponent,
    FooterComponent,
    SignupComponent,
    SignupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    HttpClientModule,
    ReactiveFormsModule, //creo un modulo per ciascuna pagina?
    HttpClientXsrfModule.withOptions({
      //TODO non aggiunge questo header per qualche motivo :(
        cookieName: 'XSRF-TOKEN',
        headerName: 'x-XSRF-TOKEN',
      }),
      SharedComponentModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptorService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
