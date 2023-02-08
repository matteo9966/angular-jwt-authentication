import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'customer',
    canLoad: [AuthGuard], //solo per fare il load del modulo, una volta autenticato devo fare il canActivate
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./customer/customer.module').then((m) => m.CustomerModule),
  },
  {
    path: 'signup',
    component:SignupComponent
  },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  { path: '**', redirectTo: 'signup' }, // crea un notfound
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
