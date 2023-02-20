import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GetAllUsersResolverService } from '../core/guards/resolvers/get-all-users-resolver.service';
import { RoleGuard } from '../core/guards/role.guard';
import { AdminHomeComponent } from './admin-home.component';
import { AdminUsersPageComponent } from './admin-users-page/admin-users-page.component';
import { UsersTableComponent } from './users-table/users-table.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: AdminHomeComponent,
        children: [
          {
            path: 'users',
            component: AdminUsersPageComponent,
            canActivate:[RoleGuard],
            data:{roles:['ADMIN']},
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
