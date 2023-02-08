import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginModule } from './login/login.module';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/services/Interceptors/auth-interceptor.service';
import { SignupModule } from './signup/signup.module';
// import { SignupComponent } from './signup/signup.component';
// import { CustomerHomeComponent } from './customer-home/customer-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    // SignupComponent,
    // CustomerHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    SignupModule,
    HttpClientModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,multi:true,useClass:AuthInterceptorService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
