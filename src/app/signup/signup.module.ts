import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignupIndicationsComponent } from './signup-indications/signup-indications.component';



@NgModule({
  declarations: [
    SignupComponent,
    SignupIndicationsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[SignupComponent]
})
export class SignupModule { }
