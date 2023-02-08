import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CustomerHomeComponent } from "./customer-home.component";
import { CustomerRouterModule } from "./customer.routing";

@NgModule({
    imports:[CommonModule,CustomerRouterModule],
    declarations:[CustomerHomeComponent]
})
export class CustomerModule{}