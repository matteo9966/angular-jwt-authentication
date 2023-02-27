import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RotatingCardComponent } from '../rotating-card/rotating-card.component';
import { ButtonComponent } from './button/button.component';
import { ImputComponentsModule } from './inputComponents/InputComponents.module';

@NgModule({
  imports: [CommonModule, ImputComponentsModule,],
  declarations: [ButtonComponent,RotatingCardComponent],
  exports: [ButtonComponent,ImputComponentsModule,RotatingCardComponent],
})
export class SharedComponentModule {}
