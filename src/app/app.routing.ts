import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then((m) => m.FoodModule),
  },
  {
    path: 'signup',
    component: SignupPageComponent,
  },
  {
    path: 'admin',
    canLoad:['adminAuthorizationGuard'],
    loadChildren: () =>
      import('./admin-home/admin.module').then((m) => m.AdminModule),
  },
  { path: 'login', component: LoginPageComponent },

  {
    path: 'user',
    canLoad: ['userAuthorizationGuard'], //uso un injection token che definisco in app.module
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  
  {
    //TODO aggiungere un unauthorizedGuard!
    path: 'user-home',
    loadChildren: () =>
      import('./pages/user-home-page/user-home-page.module').then(
        (m) => m.UserHomePageModule
      ),
  },

  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', redirectTo: '/home' }, // crea un notfound
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
