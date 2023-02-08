import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoginComponent } from "./login.component";


//unico modulo che carico già al login tutti gli altri sono lazy loaded
@NgModule({
    declarations:[LoginComponent],
    imports:[CommonModule,FormsModule],
    exports:[LoginComponent]
})
export class LoginModule{}
