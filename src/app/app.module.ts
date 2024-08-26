import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PizzaSelectionComponent } from './pizza-selection/pizza-selection.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { AppRoutingModule } from './app-routing.module';  // <-- Import AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PizzaSelectionComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
