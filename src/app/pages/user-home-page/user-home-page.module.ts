import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { UserHomePageComponent } from './user-home-page.component';

@NgModule({
  declarations: [UserHomePageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: UserHomePageComponent },
      { path: '**', redirectTo: '/user-home' },
    ]),
  ],
  exports: [RouterModule],
})
export class UserHomePageModule {}
