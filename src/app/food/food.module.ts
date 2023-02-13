import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FoodOverviewComponent } from "./food-overview/food-overview.component";
import { FoodRouterModule } from "./food.routing";

@NgModule({
    imports:[FoodRouterModule],
    exports:[FoodOverviewComponent],
    declarations:[FoodOverviewComponent]
})
export class FoodModule{}