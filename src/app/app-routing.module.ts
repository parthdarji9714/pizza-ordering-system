import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PizzaSelectionComponent } from './pizza-selection/pizza-selection.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';

const routes: Routes = [
  { path: '', redirectTo: '/pizza-selection', pathMatch: 'full' },
  { path: 'pizza-selection', component: PizzaSelectionComponent },
  { path: 'order-summary', component: OrderSummaryComponent },
  // Add more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
