import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CustomerHomeComponent } from "./customer-home.component";

const routes:Routes = [
    {path:'home',component:CustomerHomeComponent},
    {path:'',redirectTo:'home',pathMatch:'exact'},
    {path:'**',redirectTo:'/home'}
]

@NgModule(
    {imports:[RouterModule.forChild(routes)],exports:[RouterModule]}
)
export class CustomerRouterModule{}