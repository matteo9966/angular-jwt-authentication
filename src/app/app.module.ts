import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/services/Interceptors/auth-interceptor.service';
import { SignupModule } from './signup/signup.module';
import { HomeComponent } from './home/home.component';
;
import { RbacAllowDirective } from './core/directives/rbacAllow.directive';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RbacAllowDirective,
    UnauthorizedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({ //TODO non aggiunge questo header per qualche motivo :(
      cookieName:'XSRF-TOKEN',
      headerName:'x-XSRF-TOKEN'
    })
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,multi:true,useClass:AuthInterceptorService,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
