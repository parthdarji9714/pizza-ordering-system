import { Component } from '@angular/core';

@Component({
  selector: 'app-pizza-selection',
  templateUrl: './pizza-selection.component.html',
  styleUrls: ['./pizza-selection.component.scss']
})
export class PizzaSelectionComponent {
  pizzaSizes = [
    { name: 'Small', price: 5 },
    { name: 'Medium', price: 7 },
    { name: 'Large', price: 8 },
    { name: 'Extra Large', price: 9 }
  ];

  vegToppings = [
    { name: 'Tomatoes', price: 1.00 },
    { name: 'Onions', price: 0.50 },
    { name: 'Bell pepper', price: 1.00 },
    { name: 'Mushrooms', price: 1.20 },
    { name: 'Pineapple', price: 0.75 }
  ];

  nonVegToppings = [
    { name: 'Sausage', price: 1.00 },
    { name: 'Pepperoni', price: 2.00 },
    { name: 'Barbecue chicken', price: 3.00 }
  ];

  selectedToppings: { [key: string]: { [key: string]: boolean } } = {
    Small: {},
    Medium: {},
    Large: {},
    'Extra Large': {}
  };

  appliedOffers: { description: string, discount: number }[] = [];

  onToppingChange(size: string, topping: string) {
    // Sync topping selections across the UI if necessary
  }

  calculateTotal() {
    let total = 0;
    this.appliedOffers = [];

    Object.keys(this.selectedToppings).forEach(size => {
      const sizeObj = this.pizzaSizes.find(s => s.name === size);
      const toppingCount = Object.keys(this.selectedToppings[size]).filter(t => this.selectedToppings[size][t]).length;

      if (sizeObj && toppingCount > 0) {
        let pizzaTotal = sizeObj.price + Object.keys(this.selectedToppings[size])
          .filter(t => this.selectedToppings[size][t])
          .reduce((acc, curr) => {
            const veg = this.vegToppings.find(v => v.name === curr);
            const nonVeg = this.nonVegToppings.find(nv => nv.name === curr);
            return acc + (veg?.price ?? 0) + (nonVeg?.price ?? 0);
          }, 0);

        // Check for applicable offers
        const offer = this.applyOffer(size, toppingCount, pizzaTotal);
        if (offer) {
          debugger
          this.appliedOffers.push(offer);
          pizzaTotal -= offer.discount;
        }

        total += pizzaTotal;
      }
    });

    return total;
  }

  applyOffer(size: string, toppingCount: number, pizzaTotal: number): { description: string, discount: number } | null {
    if (size === 'Medium' && toppingCount === 2) {
      return { description: 'Offer 1: 1 Medium Pizza with 2 toppings for $5', discount: pizzaTotal - 5 };
    }

    if (size === 'Medium' && toppingCount === 4) {
      const mediumPizzaCount = Object.keys(this.selectedToppings['Medium']).filter(t => this.selectedToppings['Medium'][t]).length;
      if (mediumPizzaCount >= 4) {
        return { description: 'Offer 2: 2 Medium Pizzas with 4 toppings each for $9', discount: pizzaTotal - 9 }; // Assuming half of $9 per pizza
      }
    }

    if (size === 'Large' && toppingCount === 4) {
      return { description: 'Offer 3: 1 Large Pizza with 4 toppings (50% discount)', discount: pizzaTotal * 0.5 };
    }

    return null;
  }

  placeOrder(){
    return null;
  }
}
