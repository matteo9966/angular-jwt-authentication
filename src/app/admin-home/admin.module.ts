import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GetAllUsersResolverService } from '../core/guards/resolvers/get-all-users-resolver.service';
import { AdminHomeComponent } from './admin-home.component';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { UsersTableComponent } from './users-table/users-table.component';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminHomeComponent,
        children: [
          {
            path: 'users',
            component: AdminUsersPageComponent,
         
            resolve:{
              users:GetAllUsersResolverService
            }
          },
        ],
      },
    ]),
  ],
  declarations: [
    AdminHomeComponent,
    UsersTableComponent,
    AdminUsersPageComponent,
  ],
  exports: [RouterModule],
  
})
export class AdminModule {}
