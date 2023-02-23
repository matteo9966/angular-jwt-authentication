import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { ImputComponentsModule } from './inputComponents/InputComponents.module';

@NgModule({
  imports: [CommonModule, ImputComponentsModule,],
  declarations: [ButtonComponent],
  exports: [ButtonComponent,ImputComponentsModule],
})
export class SharedComponentModule {}
