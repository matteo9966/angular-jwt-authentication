import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
    component: SignupComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin-home/admin.module').then((m) => m.AdminModule),
  },

  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },

  { path: 'unauthorized', component: UnauthorizedComponent },

  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  { path: '**', redirectTo: 'signup' }, // crea un notfound
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
