import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserHomeComponent } from './user-home/user-home.component';
import { RouterModule } from '@angular/router';
import { GetUserResolverService } from '../core/guards/resolvers/get-user-resolver.service';

@NgModule({
  declarations: [UserHomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: UserHomeComponent,
        resolve: { user: GetUserResolverService },
      },
    ]),
  ],
})
export class UserModule {}
