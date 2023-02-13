import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/guards/authentication.guard';
import { FoodOverviewComponent } from './food-overview/food-overview.component';

const routes: Routes = [
  {
    path: 'overview',
    component: FoodOverviewComponent,
    canActivate:[AuthenticationGuard]
  },
];

@NgModule({ imports: [RouterModule.forChild(routes)], exports: [RouterModule] })
export class FoodRouterModule {}
